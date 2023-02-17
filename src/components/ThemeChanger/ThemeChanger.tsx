import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { createChangedTheme } from 'helpers/createChangedTheme';
import { useGetAllThemes } from 'hooks/themesHooks/useGetAllThemes';
import { FC, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';

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
  const { firestore, auth } = useContext(FirebaseContext);
  const [currentTheme, setCurrentTheme] = useState(lightMode);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const obj = createChangedTheme(firestore, user.uid).then((data) =>
          setCurrentTheme(data),
        );
      }
      console.log(user?.uid);
    });
  }, []);

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default ThemeChanger;
