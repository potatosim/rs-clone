import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { doc, getDoc } from 'firebase/firestore';
import { themeConverter } from 'helpers/converters';
import { defaultDark, defaultLight, isDefaultTheme } from 'helpers/defaultThemes';
import { generateTheme } from 'helpers/generateTheme';
import { FC, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';

interface ThemeProviderProps {
  children: ReactNode | ReactElement;
}

const lightMode = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#d219cf',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
});

const defaultThemes = {
  defaultDark: generateTheme(defaultDark),
  defaultLight: generateTheme(defaultLight),
};

const ThemeChanger: FC<ThemeProviderProps> = ({ children }) => {
  const { firestore, user } = useContext(FirebaseContext);
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);

  const getCurrentTheme = async () => {
    if (user && user.currentTheme) {
      if (isDefaultTheme(user.currentTheme)) {
        return setCurrentTheme(defaultThemes[user.currentTheme as keyof typeof defaultThemes]);
      }
      const newTheme = await getDoc(
        doc(firestore, Collections.Themes, user.currentTheme).withConverter(themeConverter),
      );
      const newThemeObj = newTheme.data();
      if (newThemeObj) {
        const createdTheme = generateTheme(newThemeObj);
        setCurrentTheme(createdTheme);
      }
    } else {
      setCurrentTheme(lightMode);
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
