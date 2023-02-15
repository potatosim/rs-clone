import { BackgroundType } from 'types/Background';
import { addDoc, arrayUnion, collection, doc, writeBatch } from 'firebase/firestore';
import { MutableRefObject, useContext } from 'react';

import { Collections } from 'enum/Collection';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { IBoardItem } from 'types/Board';
import { UserContext } from 'components/RequireAuth';

export const useAddBoard = ({
  title,
  backgroundType,
  colorRef,
  fileUrl,
  userIds,
}: {
  title: string;
  backgroundType: BackgroundType;
  colorRef: MutableRefObject<HTMLInputElement | null>;
  fileUrl: string;
  userIds: string[];
}) => {
  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const handleAddBoard = async () => {
    const batch = writeBatch(firestore);
    const allowedUsers = [...userIds, user.id];
    const boardBody: IBoardItem = {
      id: '',
      title,
      allowedUsers,
      columns: [],
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

    const addedBoard = await addDoc(collection(firestore, Collections.Boards), boardBody);
    allowedUsers.map((allowedUser) => {
      const userRef = doc(firestore, Collections.Users, allowedUser);
      batch.update(userRef, {
        boards: arrayUnion(addedBoard.id),
      });
    });

    await batch.commit();
  };

  return handleAddBoard;
};
