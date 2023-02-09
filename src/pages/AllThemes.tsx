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
import { ITheme } from 'types/Theme';

const themeConverter: FirestoreDataConverter<ITheme> = {
  toFirestore(theme: WithFieldValue<ITheme>): DocumentData {
    return { name: theme.name, primary: theme.primary, secondary: theme.secondary };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ITheme {
    const data = snapshot.data(options);
    console.log('data', data);
    return {
      ...data,
      id: snapshot.id,
    } as ITheme;
  },
};

const AllThemes = () => {
  const { firestore } = useContext(FirebaseContext);
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
              <Grid key={theme.id} item xs={3}>
                <CommunityThemeCard
                  {...theme}
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
