import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Divider } from '@mui/material';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppRoutes } from 'enum/AppRoutes';
import { Link } from 'react-router-dom';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const UserMenu = () => {
  function LogOutandClose() {
    auth.signOut();
    handleClose();
  }
  const { auth } = React.useContext(FirebaseContext);
  const [user] = useAuthState(auth);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {user ? <Avatar src={user.photoURL!} /> : <Avatar>no image</Avatar>}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar src={user?.photoURL!} sx={{ marginRight: '10px' }}></Avatar>
          {user?.displayName}
        </MenuItem>
        <Divider variant="middle" />
        <MenuItem onClick={handleClose} component={Link} to={AppRoutes.AccountPage}>
          <ManageAccountsIcon sx={{ paddingRight: '10px' }} />
          My account
        </MenuItem>
        <MenuItem onClick={LogOutandClose}>
          <LogoutIcon sx={{ paddingRight: '10px' }} />
          Logout
        </MenuItem>
        <Divider variant="middle" />
        <MenuItem onClick={handleClose}>
          <DarkModeIcon sx={{ paddingRight: '10px' }} />
          Dark mode
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
