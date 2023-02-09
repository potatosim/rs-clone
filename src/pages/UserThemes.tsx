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
import {
  collection,
  addDoc,
  getDocs,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import ThemeCreator from 'components/UserThemes/ThemeCreator';
import ThemeCard from 'components/UserThemes/ThemeCard';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import ThemesIcon from '@mui/icons-material/InsertPhoto';
import { ITheme } from 'types/Theme';
import { IThemeUser } from 'types/ThemeUser';

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

const themeConverter: FirestoreDataConverter<ITheme> = {
  toFirestore(theme: WithFieldValue<ITheme>): DocumentData {
    return { name: theme.name, primary: theme.primary, secondary: theme.secondary };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ITheme {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
    } as ITheme;
  },
};

const userConverter: FirestoreDataConverter<IThemeUser> = {
  toFirestore(themeUser: WithFieldValue<IThemeUser>): DocumentData {
    return {
      name: themeUser.name,
      currentTheme: themeUser.currentTheme,
      availableThemes: themeUser.availableThemes,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): IThemeUser {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
    } as IThemeUser;
  },
};

const UserThemes = () => {
  const { firestore } = useContext(FirebaseContext);
  const [curTheme, setTheme] = useState(lightMode);
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const userRef = collection(firestore, 'users').withConverter(userConverter);
  const [user, loading] = useCollectionData(userRef);

  const themesRef = collection(firestore, 'themes').withConverter(themeConverter);
  const [communityThemes] = useCollectionData(themesRef);

  const availableThemes = user ? user[0].availableThemes : [];

  const userThemes = communityThemes?.filter((theme) =>
    availableThemes.some((id) => id === theme.id),
  );

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
            {userThemes?.reverse().map((theme) => {
              return (
                <Grid key={theme.id} item xs={3}>
                  <ThemeCard {...theme} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default UserThemes;
