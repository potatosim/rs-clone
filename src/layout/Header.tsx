import { AppBar, Button, ButtonGroup, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
const Header = () => {
  const [activePage, setActivePage] = useState(0);

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
          <Tab label="Home"></Tab>
          <Tab label="Something else"></Tab>
          <Tab label="About"></Tab>
        </Tabs>
        <ButtonGroup variant="text" color="inherit" sx={{ marginLeft: 'auto' }}>
          <Avatar></Avatar>
          <Button>Sign Up</Button>
          <Button>Log In</Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
