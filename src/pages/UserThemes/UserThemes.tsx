import { Box, Button, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import styled from '@emotion/styled';
import { useGetUserThemes } from 'hooks/themesHooks/useGetUserThemes';
import ThemeItem from 'components/UserThemes/ThemeItem';
import ThemeCreator from 'components/UserThemes/ThemeCreator';
import { useGetDefaultThemes } from 'hooks/themesHooks/useGetDefaultThemes';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { themeConverter } from 'helpers/converters';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { UserContext } from 'components/RequireAuth';
import { ITheme } from 'types/Theme';
import { createDefaultThemes } from 'helpers/createDefaultThemes';

const PageContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const UserThemes = () => {
  const { firestore, user } = useContext(FirebaseContext);
  const [isCreating, setIsCreating] = useState(false);
  const { userThemes } = useGetUserThemes();
  const { defaultThemes } = useGetDefaultThemes();

  //TODO:
  // Themes sorting
  // refactor code and components
  // add more params for ThemeCreator and ThemeEditor

  return (
    <PageContentWrapper>
      <CssBaseline />
      <Typography variant="h3" sx={{ m: '1rem' }}>
        Available Themes
      </Typography>
      <Link to={AppRoutes.AllThemes} style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={{ m: '0.5rem' }}>
          Community themes
        </Button>
      </Link>
      <Button variant="contained" sx={{ m: '1rem auto 2rem' }} onClick={() => setIsCreating(true)}>
        Create new theme
      </Button>
      {isCreating && <ThemeCreator setIsCreating={setIsCreating} />}
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          {defaultThemes?.map((theme) => {
            return (
              <Grid key={theme.id} item xs={3}>
                <ThemeItem {...theme} status={'default'} />
              </Grid>
            );
          })}
          {userThemes?.map((theme) => {
            return (
              <Grid key={theme.id} item xs={3}>
                <ThemeItem {...theme} status={'userTheme'} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </PageContentWrapper>
  );
};

export default UserThemes;
