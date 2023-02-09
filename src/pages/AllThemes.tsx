import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import { AppRoutes } from 'enum/AppRoutes';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemesIcon from '@mui/icons-material/InsertPhoto';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  collection,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import CommunityThemeCard from 'components/UserThemes/CommunityThemeCard';
import { ITheme } from 'types/ITheme';

interface NewTheme extends ITheme {
  id: string;
}

const themeConverter: FirestoreDataConverter<NewTheme> = {
  toFirestore(theme: WithFieldValue<NewTheme>): DocumentData {
    return { name: theme.name, primary: theme.primary, secondary: theme.secondary };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): NewTheme {
    const data = snapshot.data(options);
    console.log('data', data);
    return {
      ...data,
      id: snapshot.id,
    } as NewTheme;
  },
};

const AllThemes = () => {
  const { firestore } = useContext(FirebaseContext);

  useEffect(() => {}, []);

  const ref = collection(firestore, 'themes').withConverter(themeConverter);

  const [themes, loading, error] = useCollectionData(ref);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Link to={AppRoutes.UserThemes}>
            <IconButton color="inherit">
              <ThemesIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Typography align="center" variant="h3" sx={{ m: '1rem' }}>
        Community Themes
      </Typography>
      <Container maxWidth={false}>
        {themes?.length ? (
          <Grid container spacing={2}>
            {themes.reverse().map((theme) => (
              <Grid item xs={3}>
                <CommunityThemeCard
                  name={theme.name}
                  primary={theme.primary}
                  secondary={theme.secondary}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h2">Themes not found</Typography>
        )}
      </Container>
    </Box>
  );
};

export default AllThemes;
