import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';

export const useAddColumn = (title: string, boardId: string, length: number) => {
  const { firestore } = useContext(FirebaseContext);

  const handleAddColumn = async () => {
    const column = await addDoc(collection(firestore, Collections.Columns), {
      title,
      order: length,
      tasks: [],
    });

    await updateDoc(doc(firestore, Collections.Boards, boardId), {
      columns: arrayUnion(column.id),
    });
  };

  return handleAddColumn;
};
