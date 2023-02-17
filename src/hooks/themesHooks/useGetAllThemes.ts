import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { collection } from 'firebase/firestore';
import { themeConverter } from 'helpers/converters';
import { useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ITheme } from 'types/Theme';

export const useGetAllThemes = () => {
  const { firestore } = useContext(FirebaseContext);
  
  const [allThemes, allThemesLoader] = useCollectionData<ITheme>(
    collection(firestore, Collections.Themes).withConverter(themeConverter),
  );

  return { allThemes, allThemesLoader };
};
