import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import CurrentTheme from 'components/Themes/ThemeThumbnail';
import ThemeCreator from 'components/Themes/ThemeCreator';

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

const darkMode = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
});

const TestPage = () => {
  const { firestore } = useContext(FirebaseContext);
  const [curTheme, setTheme] = useState(lightMode);
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const handleChangeTheme = () => {
    if (isLightTheme) {
      setTheme(darkMode);
      setIsLightTheme(false);
    } else {
      setTheme(lightMode);
      setIsLightTheme(true);
    }
  };

  return (
    <ThemeProvider theme={curTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={handleChangeTheme}>
            {isLightTheme ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: '0 20px 20px' }}
      >
        <Typography variant="h3" sx={{ m: '1rem' }}>
          Available themes
        </Typography>
        {isCreating ? (
          <ThemeCreator setIsCreating={setIsCreating} />
        ) : (
          <Button variant="contained" sx={{ m: '1rem' }} onClick={() => setIsCreating(true)}>
            Create new theme
          </Button>
        )}
        <Grid container spacing={0} columns={4}>
          <Grid xs={1}>
            <Paper
              sx={{
                height: '150px',
                background: 'linear-gradient(180deg, #3f51b5 50%, #f50057 50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button variant="contained">Apply</Button>
            </Paper>
          </Grid>
          <Grid xs={1}>
            <Paper
              sx={{
                height: '150px',
                background: 'linear-gradient(180deg, #d91818 50%, #12a71e 50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button variant="contained">Apply</Button>
            </Paper>
          </Grid>
          <Grid xs={1}>
            <Paper
              sx={{
                height: '150px',
                background:
                  'linear-gradient(180deg, rgba(237,204,32,1) 50%, rgba(138,208,22,1) 50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button variant="contained">Apply</Button>
            </Paper>
          </Grid>
          <Grid xs={1}>
            <Paper
              sx={{
                height: '150px',
                background: 'linear-gradient(180deg, #a918d9 50%, #12a6a7 50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button variant="contained">Apply</Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default TestPage;
