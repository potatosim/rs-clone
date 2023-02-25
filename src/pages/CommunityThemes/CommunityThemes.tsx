import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { AppRoutes } from 'enum/AppRoutes';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useGetPublicThemes } from 'hooks/themesHooks/useGetPublicThemes';
import ThemeItem from 'components/UserThemes/ThemeItem';
import { sortByThemeName } from 'helpers/sortByThemeName';

const PageContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CommunityThemes = () => {
  const { publicThemes } = useGetPublicThemes();

  return (
    <PageContentWrapper>
      <Typography align="center" variant="h3" sx={{ m: '1rem' }}>
        Community Themes
      </Typography>
      <Link to={AppRoutes.UserThemes} style={{ textDecoration: 'none', marginBottom: '2rem' }}>
        <Button variant="contained" color="secondary" sx={{ m: '0.5rem' }}>
          My Themes
        </Button>
      </Link>
      <Container maxWidth={false}>
        {publicThemes?.length ? (
          <Grid container spacing={2}>
            {sortByThemeName(publicThemes).map((theme) => (
              <Grid key={theme.id} item xs={3}>
                <ThemeItem {...theme} status={'communityTheme'} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h2">Themes not found</Typography>
        )}
      </Container>
    </PageContentWrapper>
  );
};

export default CommunityThemes;
