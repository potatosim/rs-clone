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
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemesIcon from '@mui/icons-material/InsertPhoto';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import CommonThemeCard from 'components/UserThemes/CommonThemeCard';
import { ITheme } from 'types/ITheme';

const AllThemes = () => {
  const { firestore } = useContext(FirebaseContext);
  const [themes] = useCollectionData(collection(firestore, 'themes'));

  let temp = themes ? themes[0] : {};
  //????????????????????????????????????????? почему не деструктурируется в пропсы?

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
      <Typography variant="h3" sx={{ m: '1rem' }}>
        Available themes
      </Typography>
      <Container maxWidth={false}>
        <CommonThemeCard name={temp.name} primary={temp.primary} secondary={temp.secondary} />
        {/* {themes?.length ? (
          <Grid container spacing={2}>
            {themes.map((theme) => {
              <Grid item xs={3}></Grid>;
            })}
          </Grid>
        ) : (
          <Typography variant="h2">Themes not found</Typography>
        )} */}
      </Container>
    </Box>
  );
};

export default AllThemes;
