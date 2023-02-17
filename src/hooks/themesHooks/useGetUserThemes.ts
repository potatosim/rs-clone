import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { UserContext } from 'components/RequireAuth';
import { collection, query, where } from 'firebase/firestore';
import { themeConverter } from 'helpers/converters';
import { useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const useGetUserThemes = () => {
  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const [userThemes] = useCollectionData(
    query(
      collection(firestore, 'themes').withConverter(themeConverter),
      where('holders', 'array-contains-any', [user.id]),
    ),
  );
  return { userThemes };
};
