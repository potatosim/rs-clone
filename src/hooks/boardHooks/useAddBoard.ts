import { BackgroundType } from 'types/Background';
import { addDoc, collection } from 'firebase/firestore';
import { MutableRefObject, useContext } from 'react';

import { Collections } from 'enum/Collection';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { IBoardItem } from 'types/Board';

export const useAddBoard = ({
  title,
  // isPrivate,
  backgroundType,
  colorRef,
  fileUrl,
}: {
  title: string;
  // isPrivate: boolean;
  backgroundType: BackgroundType;
  colorRef: MutableRefObject<HTMLInputElement | null>;
  fileUrl: string;
}) => {
  const { firestore } = useContext(FirebaseContext);

  const handleAddBoard = async () => {
    const boardBody: IBoardItem = {
      id: '',
      title,
      allowedUsers: [],
      columns: [],
      // private: isPrivate,
      background: {
        type: backgroundType,
        source: '#ffffff',
      },
    };

    if (backgroundType === 'color' && colorRef.current) {
      boardBody.background = {
        ...boardBody.background,
        source: colorRef.current.value,
      };
    }

    if (backgroundType === 'image' && fileUrl) {
      boardBody.background = {
        ...boardBody.background,
        source: fileUrl,
      };
    }

    await addDoc(collection(firestore, Collections.Boards), boardBody);
  };

  return handleAddBoard;
};
