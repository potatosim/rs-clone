import React from 'react';
import { AppBar, Button, ButtonGroup, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
  const [activePage, setActivePage] = useState(0);
  const auth = React.useContext(FirebaseContext).auth;
  const [user, loading, error] = useAuthState(auth);

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
          {user ? (
            <>
              <Tab label="Home" component={Link} to={AppRoutes.Home}></Tab>
              <Tab label="Something else"></Tab>
              <Tab label="About" component={Link} to="#"></Tab>
              <Tab label="Borders" component={Link} to={AppRoutes.Boards}></Tab>
            </>
          ) : (
            <>
              <Tab label="Home" component={Link} to={AppRoutes.Home}></Tab>
              <Tab label="Something else"></Tab>
              <Tab label="About"></Tab>
            </>
          )}
        </Tabs>
        <ButtonGroup variant="text" color="inherit" sx={{ marginLeft: 'auto' }}>
          <>
            {user?.photoURL ? (
              <>
                <Avatar src={user.photoURL} />
                <Button onClick={() => auth.signOut()}>Logout</Button>
              </>
            ) : (
              <>
                {/* <Button component={Link} to={AppRoutes.SignUpPage}>
                  Sign Up
                </Button> */}
                <Button component={Link} to={AppRoutes.LoginPage}>
                  SignUp
                </Button>
              </>
            )}
          </>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
