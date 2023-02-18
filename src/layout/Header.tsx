import React, { useContext } from 'react';
import {
  AppBar,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Card,
  CardMedia,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import UserMenu from 'components/UserMenu';
import Logo from 'static/images/logo.png';

const Header = () => {
  const [activePage, setActivePage] = useState(0);
  const { auth } = useContext(FirebaseContext);
  const [user] = useAuthState(auth);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActivePage(newValue);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ position: 'relative' }}>
        {/* <Typography>RS-Clone</Typography> */}
        <Card
          sx={{
            // position: 'absolute',
            width: '200px',
            height: '70px',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <CardMedia image={Logo} sx={{ width: '100%', height: '100%' }} />
        </Card>
        <Tabs
          sx={{ marginLeft: 'auto' }}
          value={activePage}
          textColor="secondary"
          indicatorColor="secondary"
          onChange={handleChange}
        >
          <Tab label="Home" component={Link} to={AppRoutes.Home} />
          {user && <Tab label="Boards" component={Link} to={AppRoutes.Boards} />}
        </Tabs>
        <ButtonGroup variant="text" color="inherit" sx={{ marginLeft: 'auto' }}>
          <>
            {user ? (
              <>
                <UserMenu />
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
