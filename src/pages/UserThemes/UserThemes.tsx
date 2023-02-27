import { Box, Button, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import styled from '@emotion/styled';
import { useGetUserThemes } from 'hooks/themesHooks/useGetUserThemes';
import ThemeItem from 'components/UserThemes/ThemeItem';
import ThemeCreator from 'components/UserThemes/ThemeCreator';
import { defaultDark, defaultLight } from 'helpers/defaultThemes';
import { sortByThemeName } from 'helpers/sortByThemeName';
import { useTranslation } from 'react-i18next';
import {
  ButtonTranslationKeys,
  TranslationNameSpaces,
  TypographyTranslationKeys,
} from 'enum/Translations';

const PageContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

const UserThemes = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { userThemes } = useGetUserThemes();
  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Typography,
  ]);

  return (
    <PageContentWrapper>
      <CssBaseline />
      <Typography variant="h3" align="center" sx={{ m: '1rem' }}>
        {translate(TypographyTranslationKeys.AvailableThemes, {
          ns: TranslationNameSpaces.Typography,
        })}
      </Typography>
      <Link to={AppRoutes.AllThemes} style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="secondary" sx={{ m: '0.5rem' }}>
          {translate(ButtonTranslationKeys.CommunityThemes, { ns: TranslationNameSpaces.Buttons })}
        </Button>
      </Link>
      <Button
        variant="contained"
        color="secondary"
        sx={{ m: '1rem auto 2rem' }}
        onClick={() => setIsCreating(true)}
      >
        {translate(ButtonTranslationKeys.CreateNewTheme, {
          ns: TranslationNameSpaces.Buttons,
        })}
      </Button>
      {isCreating && <ThemeCreator setIsCreating={setIsCreating} />}
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          {[defaultLight, defaultDark, ...(sortByThemeName(userThemes) || [])].map((theme) => {
            return (
              <Grid key={theme.id} item xs={12} sm={6} md={4} lg={3}>
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
