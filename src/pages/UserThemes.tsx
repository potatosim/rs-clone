import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Paper,
  Button,
  CssBaseline,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { createTheme, ThemeProvider } from '@mui/material/styles';

enum Colors {
  primary = '#bf9c0f',
  secondary = '#f22230',
}

// const customTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#61dafb',
//     },
//     secondary: {
//       main: '#da61bf',
//     },
//   },
// });

// const defaultTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#db921d',
//     },
//     secondary: {
//       main: '#e647ec',
//     },
//   },
// });

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
  const [curTheme, setTheme] = useState(lightMode);
  const [isLightTheme, setIsLightTheme] = useState(true);

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
      <Box>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
              Logo
            </Typography>
            <IconButton color="inherit" onClick={handleChangeTheme}>
              {isLightTheme ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Paper
          elevation={24}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItem: 'center',
            maxWidth: '1000px',
            width: '100%',
            height: '500px',
            m: '50px auto',
            p: '20px',
          }}
        >
          <Typography variant="h3" sx={{ alignSelf: 'center', mt: '2rem' }}>
            My themes
          </Typography>
          <Button variant="contained" sx={{ m: '2rem auto' }}>
            Create new theme
          </Button>
          <Typography variant="h5" sx={{ alignSelf: 'center', mb: '2rem' }}>
            Available themes
          </Typography>
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
                  background: 'linear-gradient(180deg, #e84848 50%, #47e4ec 50%)',
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
                  background: 'linear-gradient(180deg, #a918d9 50%, rgba(138,208,22,1) 50%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button variant="contained">Apply</Button>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
        <Box sx={{ height: '300px' }}></Box>
      </Box>
    </ThemeProvider>
  );
};

export default TestPage;
