import React, { useContext } from 'react';
import { AppBar, Button, ButtonGroup, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import UserMenu from 'components/UserMenu';

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
        <Typography>RS-Clone</Typography>
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
                {/* <Button onClick={() => auth.signOut()}>Logout</Button> */}
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
