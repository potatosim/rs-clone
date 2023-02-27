import { Box, Button, ButtonGroup, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import styled from '@emotion/styled';
import { useGetUserThemes } from 'hooks/themesHooks/useGetUserThemes';
import ThemeCard from 'components/ThemeCard';
import ThemeCreator from 'components/Theme';
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
      <ButtonGroup sx={{ display: 'flex', alignItems: 'center', m: '1rem auto 3rem' }}>
        <Button variant="contained" color="secondary">
          <Link to={AppRoutes.AllThemes} style={{ textDecoration: 'none', color: 'inherit' }}>
            {translate(ButtonTranslationKeys.CommunityThemes, {
              ns: TranslationNameSpaces.Buttons,
            })}
          </Link>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setIsCreating(true)}>
          {translate(ButtonTranslationKeys.CreateNewTheme, {
            ns: TranslationNameSpaces.Buttons,
          })}
        </Button>
      </ButtonGroup>
      {isCreating && <ThemeCreator setIsCreating={setIsCreating} />}
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          {[defaultLight, defaultDark, ...(sortByThemeName(userThemes) || [])].map((theme) => {
            return (
              <Grid key={theme.id} item xs={12} sm={6} md={4} lg={3}>
                <ThemeCard {...theme} status={'userTheme'} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </PageContentWrapper>
  );
};

export default UserThemes;
