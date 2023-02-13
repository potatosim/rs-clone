import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { ITaskItem } from 'types/Task';

export const useAddTask = (
  columnId: string,
  task: Omit<ITaskItem, 'id' | 'history' | 'comments'>,
) => {
  const { firestore } = useContext(FirebaseContext);

  const handleAddTask = async () => {
    const addedTask = await addDoc(collection(firestore, Collections.Tasks), {
      ...task,
      history: [
        {
          action: 'created',
          initiator: 'User',
          time: new Date().toLocaleString(),
        },
      ],
      comments: [],
    });

    await updateDoc(doc(firestore, Collections.Columns, columnId), {
      tasks: arrayUnion(addedTask.id),
    });
  };

  return handleAddTask;
};
