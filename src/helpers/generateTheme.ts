import { createTheme } from '@mui/material';
import { ITheme } from 'types/Theme';

export const generateTheme = ({ primary, secondary, mode }: ITheme) => {
  const newTheme = createTheme({
    palette: {
      mode,
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
    },
  });
  return newTheme;
};
