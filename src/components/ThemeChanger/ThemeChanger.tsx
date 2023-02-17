import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { themeConverter } from 'helpers/converters';
import { createChangedTheme } from 'helpers/createChangedTheme';
import { generateTheme } from 'helpers/generateTheme';
import {
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { IUserItem } from 'types/User';

interface ThemeProviderProps {
  children: ReactNode | ReactElement;
}

enum Colors {
  primary = '#f5a506',
  secondary = '#8f1be3',
}

const lightMode = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
});

const ThemeChanger: FC<ThemeProviderProps> = ({ children }) => {
  const { firestore, user } = useContext(FirebaseContext);
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [themeId, setThemeId] = useState('');

  const getCurrentTheme = async () => {
    if (user && user.currentTheme && user.currentTheme !== themeId) {
      const newTheme = await getDoc(
        doc(firestore, Collections.Themes, user.currentTheme).withConverter(themeConverter),
      );
      const newThemeObj = newTheme.data();
      if (newThemeObj) {
        const createdTheme = generateTheme(newThemeObj);
        setCurrentTheme(createdTheme);
        setThemeId(user.currentTheme);
      }
    } else {
      setCurrentTheme(lightMode);
      setThemeId('');
    }
  };

  useEffect(() => {
    getCurrentTheme();
  }, [user]);

  if (!currentTheme) {
    return null;
  }
  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default ThemeChanger;
