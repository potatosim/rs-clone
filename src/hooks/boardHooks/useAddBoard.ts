import { BackgroundType } from 'types/Background';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { MutableRefObject, useContext } from 'react';

import { Collections } from 'enum/Collection';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { IBoardItem } from 'types/Board';

export const useAddBoard = ({
  title,
  // isPrivate,
  backgroundType,
  colorRef,
  file,
}: {
  title: string;
  // isPrivate: boolean;
  backgroundType: BackgroundType;
  colorRef: MutableRefObject<HTMLInputElement | null>;
  file: FileList | null;
}) => {
  const { firestore, storage } = useContext(FirebaseContext);

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

    if (backgroundType === 'image' && file) {
      const imageName = file[0].name + '_' + Date.now().toString();
      await uploadBytes(ref(storage, imageName), file[0]);

      const url = await getDownloadURL(ref(storage, imageName));

      boardBody.background = {
        ...boardBody.background,
        source: url,
      };
    }

    await addDoc(collection(firestore, Collections.Boards), boardBody);
  };

  return handleAddBoard;
};
