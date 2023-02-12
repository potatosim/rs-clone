import { Box, Button, Container, CssBaseline, Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
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
  const [curTheme, setTheme] = useState(lightMode);
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const { userThemes, userLoading } = useGetUserThemes();

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
      <PageContentWrapper>
        <Link to={AppRoutes.AllThemes}>
          <IconButton color="default">
            <ThemesIcon />
          </IconButton>
        </Link>
        <Button onClick={handleChangeTheme}>
          {isLightTheme ? <DarkModeIcon /> : <LightModeIcon />}
        </Button>
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
    </ThemeProvider>
  );
};

export default UserThemes;
