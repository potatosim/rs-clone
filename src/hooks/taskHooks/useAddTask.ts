import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { UserContext } from 'components/RequireAuth';
import { Collections } from 'enum/Collection';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { columnsConverter, tasksConverter } from 'helpers/converters';
import { getCurrentDate } from 'helpers/getCurrentDateInFormat';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { IColumnItem } from 'types/Column';
import { ITaskItem } from 'types/Task';

export const useAddTask = (
  columnId: string,
  task: Omit<ITaskItem, 'id' | 'history' | 'comments' | 'assignee' | 'boardId'>,
) => {
  const { boardId } = useParams();
  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const handleAddTask = async () => {
    const addedTask = await addDoc<Omit<ITaskItem, 'id'>>(
      collection(firestore, Collections.Tasks).withConverter(tasksConverter),
      {
        ...task,
        assignee: null,
        history: [
          {
            action: 'created',
            initiator: user.id,
            time: getCurrentDate(),
          },
        ],
        comments: [],
        boardId: boardId!,
      },
    );

    await updateDoc<IColumnItem>(
      doc(firestore, Collections.Columns, columnId).withConverter(columnsConverter),
      {
        tasks: arrayUnion(addedTask.id),
      },
    );
  };

  return handleAddTask;
};
