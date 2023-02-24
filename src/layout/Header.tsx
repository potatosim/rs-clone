import React, { useContext, useState } from 'react';
import { AppBar, Button, Stack, Toolbar, Card, CardMedia, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import UserMenu from 'components/UserMenu';
import Logo from 'static/images/logo.png';
import { UserContext } from 'components/RequireAuth';

const Header = () => {
  const [activePage, setActivePage] = useState(0);
  const { auth, user } = useContext(FirebaseContext);

  return (
    <AppBar position="static">
      <Toolbar sx={{ position: 'relative' }}>
        <Card
          sx={{
            minWidth: '160px',
            height: '55px',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <CardMedia
            image={Logo}
            sx={{ width: '90%', height: '90%' }}
            component={Link}
            to={AppRoutes.Home}
          />
        </Card>
        <Stack direction="row" sx={{ marginLeft: 'auto' }}>
          <Button color="secondary" component={Link} to={AppRoutes.Home}>
            Home
          </Button>
          {user && (
            <Button color="secondary" component={Link} to={AppRoutes.Boards}>
              Boards
            </Button>
          )}
        </Stack>

        <ButtonGroup variant="text" sx={{ marginLeft: 'auto' }}>
          <>
            {user ? (
              <>
                <UserMenu />
                <Avatar src={user.avatar} />
                <Button onClick={() => auth.signOut()}>Logout</Button>
              </>
            ) : (
              <Button component={Link} to={AppRoutes.LoginPage}>
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
