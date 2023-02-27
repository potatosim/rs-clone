import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { collection, query, where } from 'firebase/firestore';
import { themeConverter } from 'helpers/converters';
import { useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ITheme } from 'types/Theme';

export const useGetPublicThemes = () => {
  const { firestore } = useContext(FirebaseContext);

  const [publicThemes, publicThemesLoader] = useCollectionData<ITheme>(
    query(
      collection(firestore, Collections.Themes).withConverter(themeConverter),
      where('isPublic', '==', true),
    ),
  );

  return { publicThemes, publicThemesLoader };
};
