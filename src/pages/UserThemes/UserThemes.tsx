import { Box, Button, Container, CssBaseline, Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import ThemeCreator from 'components/UserThemes/ThemeCreator';
import ThemeCard from 'components/UserThemes/ThemeCard';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import ThemesIcon from '@mui/icons-material/InsertPhoto';
import styled from '@emotion/styled';
import { useGetUserThemes } from 'hooks/themesHooks/useGetUserThemes';

const PageContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const UserThemes = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { userThemes } = useGetUserThemes();

  //TODO:
  // Theme should change when user logIn and logOut
  // add button for link to AllThemes
  // Themes sorting
  // 2 base themes
  // add new theme template - CreateBoardButton component
  // dark and light modes
  // refactor code and components
  // add more params for ThemeCreator and ThemeEditor

  return (
    <PageContentWrapper>
      <CssBaseline />
      <Link to={AppRoutes.AllThemes}>
        <IconButton color="default">
          <ThemesIcon />
        </IconButton>
      </Link>
      <Typography variant="h3" sx={{ m: '1rem' }}>
        Available Themes
      </Typography>
      <Button variant="contained" sx={{ m: '1rem' }} onClick={() => setIsCreating(true)}>
        Create new theme
      </Button>
      {isCreating && <ThemeCreator setIsCreating={setIsCreating} />}
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          {userThemes?.map((theme) => {
            return (
              <Grid key={theme.id} item xs={3}>
                <ThemeCard {...theme} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </PageContentWrapper>
  );
};

export default UserThemes;
