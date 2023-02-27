import { doc, Firestore, getDoc } from 'firebase/firestore';
import { ITheme } from 'types/Theme';
import { themeConverter } from './converters';
import { generateTheme } from './generateTheme';

export const createChangedTheme = async (firestore: Firestore, id: string) => {
  const userQuery = await getDoc(doc(firestore, 'users', id));
  const themeId: string = userQuery.data()?.currentTheme!;
  const themeQuery = await getDoc<ITheme>(doc(firestore, 'themes', themeId).withConverter(themeConverter));
  const themeObj = themeQuery.data()!;
  const newTheme = generateTheme(themeObj);
  return newTheme;
};
