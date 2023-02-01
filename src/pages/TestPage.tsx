import { AppBar, Toolbar, IconButton, Typography, Box, Paper, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const TestPage = () => {
  const [curTheme, setTheme] = useState(lightTheme);
  const [isLightTheme, setIsLightTheme] = useState(true);

  const handleChangeTheme = () => {
    if (isLightTheme) {
      setTheme(darkTheme);
      setIsLightTheme(false);
    } else {
      setTheme(lightTheme);
      setIsLightTheme(true);
    }
  };

  return (
    <ThemeProvider theme={curTheme}>
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
              {isLightTheme ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Paper
          elevation={24}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItem: 'center',
            width: '700px',
            height: '500px',
            m: '50px auto',
          }}
        >
          <Button variant="contained" sx={{ width: '150px', margin: 'auto' }}>
            Button
          </Button>
        </Paper>
        <Box sx={{ height: '300px' }}></Box>
      </Box>
    </ThemeProvider>
  );
};

export default TestPage;
