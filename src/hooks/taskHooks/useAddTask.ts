import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { tasksConverter } from 'helpers/converters';
import { useContext } from 'react';
import { ITaskItem } from 'types/Task';

export const useAddTask = (
  columnId: string,
  task: Omit<ITaskItem, 'id' | 'history' | 'size' | 'priority'>,
) => {
  const { firestore } = useContext(FirebaseContext);

  const handleAddTask = async () => {
    const addedTask = await addDoc<ITaskItem>(
      collection(firestore, Collections.Tasks).withConverter(tasksConverter),
      {
        ...task,
        id: '',
        priority: 'Medium',
        size: 'Medium',
        history: [
          {
            action: 'created',
            initiator: 'User',
            time: new Date().toLocaleString(),
          },
        ],
      },
    );

    await updateDoc(doc(firestore, Collections.Columns, columnId), {
      tasks: arrayUnion(addedTask.id),
    });
  };

  return handleAddTask;
};
