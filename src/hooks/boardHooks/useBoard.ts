import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { doc } from 'firebase/firestore';
import { boardsConverter } from 'helpers/converters';
import { useContext } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { IBoardItem } from 'types/Board';

export const useBoard = (id: string) => {
  const { firestore } = useContext(FirebaseContext);

  const [board, boardLoading] = useDocumentData<IBoardItem>(
    doc(firestore, Collections.Boards, id).withConverter(boardsConverter),
  );

  return { board, boardLoading };
};
