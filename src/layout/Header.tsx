import { useContext } from 'react';
import { AppBar, Button, Toolbar, Card, CardMedia, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import UserMenu from 'components/UserMenu';
import Logo from 'static/images/logo.png';
import { useTranslation } from 'react-i18next';
import { ButtonTranslationKeys, TranslationNameSpaces } from 'enum/Translations';
import Box from '@mui/material/Box';
import LanguageButton from 'components/LanguageButton';

const Header = () => {
  const { user } = useContext(FirebaseContext);

  const { t: translate, i18n } = useTranslation(TranslationNameSpaces.Buttons);

  const changeLanguageHandler = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            minWidth: '116px',
            height: '40px',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <CardMedia
            image={Logo}
            sx={{ width: '100%', height: '100%' }}
            component={Link}
            to={AppRoutes.Home}
          />
        </Card>
        {user && (
          <ButtonGroup color="secondary">
            <Button component={Link} to={AppRoutes.Boards}>
              {translate(ButtonTranslationKeys.Boards)}
            </Button>
          </ButtonGroup>
        )}

        <Box display="flex" alignItems="center" columnGap="1rem">
          <>
            <LanguageButton
              language={i18n.language}
              onClick={
                i18n.language === 'en'
                  ? () => changeLanguageHandler('ru')
                  : () => changeLanguageHandler('en')
              }
            />

            {user ? (
              <UserMenu />
            ) : (
              <Button color="secondary" component={Link} to={AppRoutes.LoginPage}>
                {translate(ButtonTranslationKeys.Login)}
              </Button>
            )}
          </>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
