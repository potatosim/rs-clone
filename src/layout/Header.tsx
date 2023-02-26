import React, { useContext } from 'react';
import { AppBar, Button, Stack, Toolbar, Card, CardMedia, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import UserMenu from 'components/UserMenu';
import Logo from 'static/images/logo.png';

const Header = () => {
  const { user } = useContext(FirebaseContext);

  return (
    <AppBar position="static">
      <Toolbar sx={{ position: 'relative' }}>
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
        <Stack direction="row" sx={{ marginLeft: 'auto', background: '#FF0', borderRadius: 2 }}>
          <Button component={Link} to={AppRoutes.Home} sx={{ color: '#000' }}>
            Home
          </Button>
          {user && (
            <Button component={Link} to={AppRoutes.Boards} sx={{ color: '#000' }}>
              Boards
            </Button>
          )}
        </Stack>

        <ButtonGroup variant="text" sx={{ marginLeft: 'auto' }}>
          <>
            <Button variant="outlined">Lang</Button>
            {user ? (
              <>
                <UserMenu />
              </>
            ) : (
              <Button
                component={Link}
                to={AppRoutes.LoginPage}
                sx={{ background: '#FF0', borderRadius: 2, color: '#000' }}
              >
                Login
              </Button>
            )}
          </>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
