import { addDoc, arrayUnion, collection, doc, writeBatch } from 'firebase/firestore';
import { useContext } from 'react';

import { Collections } from 'enum/Collection';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { IBoardItem } from 'types/Board';
import { UserContext } from 'components/RequireAuth';
import { IUserItem } from 'types/User';
import { usersConverter } from 'helpers/converters';

export const useAddBoard = () => {
  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const handleAddBoard = async (board: Omit<IBoardItem, 'id'>) => {
    const batch = writeBatch(firestore);
    const allowedUsers = [...board.allowedUsers, user.id];
    const boardBody = { ...board, allowedUsers };

    const addedBoard = await addDoc(collection(firestore, Collections.Boards), boardBody);
    allowedUsers.map((allowedUser) => {
      const userRef = doc(firestore, Collections.Users, allowedUser).withConverter(usersConverter);
      batch.update<IUserItem>(userRef, {
        boards: arrayUnion(addedBoard.id),
      });
    });

    await batch.commit();
  };

  return handleAddBoard;
};
