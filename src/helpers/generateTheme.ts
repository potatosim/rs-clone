import { createTheme } from '@mui/material';
import { ITheme } from 'types/Theme';

export const generateTheme = (obj: ITheme) => {
  const newTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: obj.primary,
      },
      secondary: {
        main: obj.secondary,
      },
    },
  });
  return newTheme;
};
