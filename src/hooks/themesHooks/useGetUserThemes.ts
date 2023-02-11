import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { doc } from 'firebase/firestore';
import { userConverter } from 'helpers/converters';
import { useContext } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useGetAllThemes } from './useGetAllThemes';

export const useGetUserThemes = () => {
  const { firestore } = useContext(FirebaseContext);
  const { allThemes } = useGetAllThemes();

  const [user, userLoading] = useDocumentData(
    doc(firestore, Collections.Users, 'dtkL6o320t70FceVT0QA').withConverter(userConverter),
  );

  const availableThemes = user?.availableThemes!;

  const userThemes = allThemes?.filter((theme) => availableThemes.some((id) => id === theme.id));

  return { userThemes, userLoading };
};
