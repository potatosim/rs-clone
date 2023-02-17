import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import BoardForm from 'components/Board/BoardForm/BoardForm';
import { useAddBoard } from 'hooks/boardHooks/useAddBoard';

const CreateBoardButton = () => {
  const addBoard = useAddBoard();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCreateBoard = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Paper
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '180px' }}
      elevation={12}
    >
      <ListItemButton
        onClick={handleCreateBoard}
        sx={{ maxWidth: '270px', borderRadius: '4px', height: '100%' }}
      >
        <ListItemIcon>
          <CreateNewFolderOutlinedIcon color="primary" sx={{ width: '50px', height: '50px' }} />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="h6">Create New Board</Typography>} />
      </ListItemButton>
      {isModalOpen && (
        <BoardForm
          buttonTitle="Create"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          handleSubmit={addBoard}
        />
      )}
    </Paper>
  );
};

export default CreateBoardButton;
