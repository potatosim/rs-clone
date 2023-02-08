import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { collection } from 'firebase/firestore';
import { boardsConverter } from 'helpers/converters';
import { useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IBoardItem } from 'types/Board';

export const useBoards = () => {
  const { firestore } = useContext(FirebaseContext);
  const [boards, loading] = useCollectionData<IBoardItem>(
    collection(firestore, Collections.Boards).withConverter(boardsConverter),
  );

  return {
    boards,
    loading,
  };
};
