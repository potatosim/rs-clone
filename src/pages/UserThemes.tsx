import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import ThemeCreator from 'components/UserThemes/ThemeCreator';
import ThemeCard from 'components/UserThemes/ThemeCard';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import ThemesIcon from '@mui/icons-material/InsertPhoto';

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

const UserThemes = () => {
  const { firestore } = useContext(FirebaseContext);
  const [curTheme, setTheme] = useState(lightMode);
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [users] = useCollectionData(collection(firestore, 'users'));

  const availableThemes = users ? users[0].themes : {};

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
          <Link to={AppRoutes.AllThemes}>
            <IconButton color="default">
              <ThemesIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          m: '0 20px 20px',
          height: '200vh',
        }}
      >
        <Typography variant="h3" sx={{ m: '1rem' }}>
          Available Themes
        </Typography>
        <Button variant="contained" sx={{ m: '1rem' }} onClick={() => setIsCreating(true)}>
          Create new theme
        </Button>
        {isCreating && <ThemeCreator setIsCreating={setIsCreating} />}
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <ThemeCard />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default UserThemes;
