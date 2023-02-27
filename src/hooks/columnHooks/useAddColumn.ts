import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { boardsConverter } from 'helpers/converters';
import { useContext } from 'react';
import { IBoardItem } from 'types/Board';

export const useAddColumn = (title: string, boardId: string, length: number) => {
  const { firestore } = useContext(FirebaseContext);

  const handleAddColumn = async () => {
    const column = await addDoc(collection(firestore, Collections.Columns), {
      title,
      order: length,
      tasks: [],
      boardId,
    });

    await updateDoc<IBoardItem>(
      doc(firestore, Collections.Boards, boardId).withConverter(boardsConverter),
      {
        columns: arrayUnion(column.id),
      },
    );
  };

  return handleAddColumn;
};
