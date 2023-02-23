import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { UserContext } from 'components/RequireAuth';
import { collection, query, where } from 'firebase/firestore';
import { themeConverter } from 'helpers/converters';
import { createDefaultThemes } from 'helpers/createDefaultThemes';
import { useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const useGetDefaultThemes = () => {
  const { firestore } = useContext(FirebaseContext);
  const [defaultThemes] = useCollectionData(
    query(
      collection(firestore, 'themes').withConverter(themeConverter),
      where('creator', '==', 'system'),
    ),
  );
  if (defaultThemes && defaultThemes!.length === 0) {
    createDefaultThemes(firestore);
  }
  return { defaultThemes };
};
