import { arrayRemove, arrayUnion, doc, writeBatch } from 'firebase/firestore';
import { useContext } from 'react';

import { Collections } from 'enum/Collection';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { IBoardItem } from 'types/Board';
import { getDocumentsByMatchedKey } from 'helpers/getDocumentsWithId';
import { boardsConverter, tasksConverter, usersConverter } from 'helpers/converters';
import { IUserItem } from 'types/User';
import { ITaskItem } from 'types/Task';

export const useUpdateBoard = () => {
  const { firestore } = useContext(FirebaseContext);

  const handleUpdateBoard = async (oldBoard: IBoardItem, newBoard: Omit<IBoardItem, 'id'>) => {
    const batch = writeBatch(firestore);

    const boardTasks = await getDocumentsByMatchedKey({
      firestore,
      collectionName: Collections.Tasks,
      converter: tasksConverter,
      keyName: 'boardId',
      targetId: oldBoard.id,
    });

    const usersToRemove = oldBoard.allowedUsers.filter(
      (userId) => !newBoard.allowedUsers.includes(userId),
    );
    const usersToUnion = newBoard.allowedUsers.filter(
      (userId) => !oldBoard.allowedUsers.includes(userId),
    );

    batch.update<IBoardItem>(
      doc(firestore, Collections.Boards, oldBoard.id).withConverter(boardsConverter),
      newBoard,
    );

    boardTasks.map((taskItem) => {
      if (taskItem.assignee && usersToRemove.includes(taskItem.assignee)) {
        batch.update<ITaskItem>(
          doc(firestore, Collections.Tasks, taskItem.id).withConverter(tasksConverter),
          {
            assignee: null,
          },
        );
      }
    });

    usersToRemove.map((allowedUser) => {
      const userRef = doc(firestore, Collections.Users, allowedUser).withConverter(usersConverter);
      batch.update<IUserItem>(userRef, {
        boards: arrayRemove(oldBoard.id),
      });
    });

    usersToUnion.map((allowedUser) => {
      const userRef = doc(firestore, Collections.Users, allowedUser).withConverter(usersConverter);
      batch.update<IUserItem>(userRef, {
        boards: arrayUnion(oldBoard.id),
      });
    });

    await batch.commit();
  };

  return handleUpdateBoard;
};
