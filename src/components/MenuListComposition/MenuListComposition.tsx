import { FC, useRef, useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface MenuListCompositionProps {
  handleDelete: () => void;
  handleRename: () => void;
}

const MenuListComposition: FC<MenuListCompositionProps> = ({ handleDelete, handleRename }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row" spacing={2} onClick={(e) => e.stopPropagation()}>
      <IconButton ref={anchorRef} onClick={handleToggle}>
        <MoreVertIcon />
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} placement="auto" transition>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open}>
                  <MenuItem
                    onClick={() => {
                      handleRename();
                    }}
                  >
                    Rename
                  </MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
};

export default MenuListComposition;
