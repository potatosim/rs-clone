import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface ICreateBoardButton {
  onClick: () => void;
}

const CreateBoardButton = ({ onClick }: ICreateBoardButton) => {
  return (
    <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} elevation={12}>
      <ListItemButton
        onClick={onClick}
        sx={{ maxWidth: '270px', borderRadius: '4px', height: '100%' }}
      >
        <ListItemIcon>
          <CreateNewFolderOutlinedIcon color="primary" sx={{ width: '50px', height: '50px' }} />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="h6">Create New Board</Typography>} />
      </ListItemButton>
    </Paper>
  );
};

export default CreateBoardButton;
