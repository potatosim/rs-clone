import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { UserContext } from 'components/RequireAuth';
import { Collections } from 'enum/Collection';
import { collection, doc, query, updateDoc, where, writeBatch } from 'firebase/firestore';
import { boardsConverter, columnsConverter } from 'helpers/converters';
import { deleteDocuments } from 'helpers/deleteDocuments';
import { getDocumentsByMatchedKey } from 'helpers/getDocumentsWithId';
import { useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IBoardItem } from 'types/Board';

export const useBoards = () => {
  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const [boards, loading] = useCollectionData<IBoardItem>(
    query(
      collection(firestore, Collections.Boards).withConverter(boardsConverter),
      where('allowedUsers', 'array-contains', user.id),
    ),
  );

  const deleteDocumentsFrom = deleteDocuments(firestore);

  const handleDeleteBoard = async (boardId: string) => {
    if (boards) {
      const targetBoard = boards.find((board) => board.id === boardId);

      if (targetBoard) {
        const boardRef = doc(firestore, Collections.Boards, targetBoard.id);
        const batch = writeBatch(firestore);

        const columns = await getDocumentsByMatchedKey({
          firestore,
          collectionName: Collections.Columns,
          converter: columnsConverter,
          keyName: 'boardId',
          targetId: boardId,
        });

        columns.map((column) => deleteDocumentsFrom(batch, Collections.Tasks, column.tasks));
        deleteDocumentsFrom(batch, Collections.Columns, targetBoard.columns);

        batch.delete(boardRef);

        await batch.commit();
      }
    }
  };

  const handleRenameBoard = async (boardTitle: string, boardId: string) => {
    await updateDoc(doc(firestore, Collections.Boards, boardId), {
      title: boardTitle,
    });
  };

  return {
    boards,
    loading,
    handleDeleteBoard,
    handleRenameBoard,
  };
};
