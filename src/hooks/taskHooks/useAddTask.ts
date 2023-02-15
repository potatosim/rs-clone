import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { UserContext } from 'components/RequireAuth';
import { Collections } from 'enum/Collection';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { tasksConverter } from 'helpers/converters';
import { useContext } from 'react';
import { ITaskItem } from 'types/Task';

export const useAddTask = (
  columnId: string,
  task: Omit<ITaskItem, 'id' | 'history' | 'comments' | 'assignee'>,
) => {
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
            initiator: user,
            time: new Date().toLocaleString(),
          },
        ],
        comments: [],
      },
    );

    await updateDoc(doc(firestore, Collections.Columns, columnId), {
      tasks: arrayUnion(addedTask.id),
    });
  };

  return handleAddTask;
};
