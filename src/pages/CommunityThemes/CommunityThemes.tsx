import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { AppRoutes } from 'enum/AppRoutes';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useGetPublicThemes } from 'hooks/themesHooks/useGetPublicThemes';
import ThemeItem from 'components/UserThemes/ThemeItem';
import { sortByThemeName } from 'helpers/sortByThemeName';
import { useTranslation } from 'react-i18next';
import { ButtonTranslationKeys, TranslationNameSpaces } from 'enum/Translations';

const PageContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

const CommunityThemes = () => {
  const { publicThemes } = useGetPublicThemes();

  const { t: translate } = useTranslation(TranslationNameSpaces.Buttons);

  return (
    <PageContentWrapper>
      <Typography align="center" variant="h3" sx={{ m: '2rem' }}>
        {translate(ButtonTranslationKeys.CommunityThemes)}
      </Typography>
      <Link to={AppRoutes.UserThemes} style={{ textDecoration: 'none', marginBottom: '2rem' }}>
        <Button variant="contained" color="secondary" sx={{ m: '0.5rem' }}>
          {translate(ButtonTranslationKeys.MyThemes)}
        </Button>
      </Link>
      <Container maxWidth={false}>
        {publicThemes?.length ? (
          <Grid container spacing={2}>
            {sortByThemeName(publicThemes).map((theme) => (
              <Grid key={theme.id} item xs={12} sm={6} md={4} lg={3}>
                <ThemeItem {...theme} status={'communityTheme'} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h4" align="center">
            Themes not found
          </Typography>
        )}
      </Container>
    </PageContentWrapper>
  );
};

export default CommunityThemes;
