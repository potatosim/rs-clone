import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, FC, ReactElement, ReactNode, useState } from 'react';

export const ThemeContext = createContext({});

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
  

  return <ThemeProvider theme={lightMode}>{children}</ThemeProvider>;
};

export default ThemeChanger;
