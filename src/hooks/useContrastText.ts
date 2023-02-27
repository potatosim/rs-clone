import { useTheme } from '@mui/material';

export const useContrastText = () => {
  const theme = useTheme();

  return {
    getContrastColor: () => theme.palette.getContrastText(theme.palette.primary.main),
    primaryColor: theme.palette.primary.main,
    secondaryColor: theme.palette.secondary.main,
  };
};
