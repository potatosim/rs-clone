import { Box, IconButton, Typography, Container, Grid } from '@mui/material';
import { AppRoutes } from 'enum/AppRoutes';
import { Link } from 'react-router-dom';
import ThemesIcon from '@mui/icons-material/InsertPhoto';
import CommunityThemeCard from 'components/UserThemes/CommunityThemeCard';
import styled from '@emotion/styled';
import { useGetPublicThemes } from 'hooks/themesHooks/useGetPublicThemes';

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
      <Link to={AppRoutes.UserThemes}>
        <IconButton color="inherit">
          <ThemesIcon />
        </IconButton>
      </Link>
      <Typography align="center" variant="h3" sx={{ m: '1rem' }}>
        Community Themes
      </Typography>
      <Container maxWidth={false}>
        {publicThemes?.length ? (
          <Grid container spacing={2}>
            {publicThemes.map((theme) => (
              <Grid key={theme.id} item xs={3}>
                <CommunityThemeCard {...theme} />
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
