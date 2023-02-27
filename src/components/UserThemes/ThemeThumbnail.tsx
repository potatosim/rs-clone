import {
  AppBar,
  Box,
  Button,
  Paper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FC } from 'react';
import { generateTheme } from 'helpers/generateTheme';
import { ITheme } from 'types/Theme';
import { useTranslation } from 'react-i18next';
import {
  ButtonTranslationKeys,
  TranslationNameSpaces,
  TypographyTranslationKeys,
} from 'enum/Translations';

interface ThumbnailProps {
  name: string;
  primary: string;
  secondary: string;
  mode: 'light' | 'dark';
}

const ThemeThumbnail: FC<ThumbnailProps> = ({ name, primary, secondary, mode }) => {
  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Typography,
  ]);

  return (
    <Box
      sx={{
        maxWidth: '600px',
        width: '100%',
        p: '5px',
      }}
    >
      <Typography variant="h5" sx={{ textAlign: 'center', m: '1rem auto' }}>
        {name}
      </Typography>
      <Box sx={{ border: '4px solid black', borderRadius: '5px', m: '0 15px 15px' }}>
        <ThemeProvider theme={generateTheme({ primary, secondary, mode } as ITheme)}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <MenuIcon />
              <Typography variant="h6" sx={{ ml: '1rem' }}>
                {translate(TypographyTranslationKeys.Logo, {
                  ns: TranslationNameSpaces.Typography,
                })}
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '400px',
              height: '300px',
            }}
          >
            <Paper
              square
              elevation={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <Typography variant="h5" sx={{ mt: '25px' }}>
                {translate(TypographyTranslationKeys.SecondaryBackground, {
                  ns: TranslationNameSpaces.Typography,
                })}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ maxWidth: '200px', m: '25px auto' }}
              >
                {translate(ButtonTranslationKeys.SecondaryColor)}
              </Button>
              <TextField label="Field" color="primary" sx={{ m: '1rem auto' }} />
            </Paper>
          </Box>
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default ThemeThumbnail;
