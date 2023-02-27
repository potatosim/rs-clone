import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Divider } from '@mui/material';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppRoutes } from 'enum/AppRoutes';
import { Link } from 'react-router-dom';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonTranslationKeys, TranslationNameSpaces } from 'enum/Translations';
import { getUserPage } from 'helpers/getUserPage';

const UserMenu = () => {
  const { auth, user } = useContext(FirebaseContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { t: translate } = useTranslation(TranslationNameSpaces.Buttons);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutAndClose = () => {
    auth.signOut();
    handleClose();
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
        <Avatar src={user?.avatar} />
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
        <MenuItem onClick={handleClose} component={Link} to={getUserPage(user?.id)}>
          <ManageAccountsIcon sx={{ paddingRight: '10px' }} />
          {translate(ButtonTranslationKeys.MyAccount)}
        </MenuItem>
        <MenuItem onClick={logOutAndClose}>
          <LogoutIcon sx={{ paddingRight: '10px' }} />
          {translate(ButtonTranslationKeys.Logout)}
        </MenuItem>
        <Divider variant="middle" />
        <MenuItem onClick={handleClose} component={Link} to={AppRoutes.UserThemes}>
          <BurstModeIcon sx={{ paddingRight: '10px' }} />
          {translate(ButtonTranslationKeys.MyThemes)}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
