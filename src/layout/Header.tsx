import React, { useContext } from 'react';
import { AppBar, Button, ButtonGroup, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
  const [activePage, setActivePage] = useState(0);
  const { auth } = useContext(FirebaseContext);
  const [user] = useAuthState(auth);

  return (
    <AppBar position="static">
      <Toolbar sx={{ position: 'relative' }}>
        <Typography>RS-Clone</Typography>
        <Tabs
          sx={{ marginLeft: 'auto' }}
          textColor="inherit"
          indicatorColor="primary"
          value={activePage}
          onChange={(e, val) => setActivePage(val)}
        >
          <Tab label="Home" component={Link} to={AppRoutes.Home} />
          {user && <Tab label="Boards" component={Link} to={AppRoutes.Boards} />}
        </Tabs>
        <ButtonGroup variant="text" color="inherit" sx={{ marginLeft: 'auto' }}>
          <>
            {user ? (
              <>
                <Avatar src={user.photoURL!} />
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
