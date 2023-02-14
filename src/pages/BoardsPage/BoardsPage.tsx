import { Box, CircularProgress } from '@mui/material';
import { useState } from 'react';

import BoardCard from 'components/BoardCard';
import CreateBoardButton from 'components/CreateBoardButton';
import CreateBoardForm from 'components/CreateBoardForm';
import { useBoards } from 'hooks/boardHooks/useBoards';

const BoardsPage = () => {
  const { boards, loading, handleDeleteBoard, handleRenameBoard } = useBoards();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCreateBoard = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading || !boards) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          handleDeleteBoard={handleDeleteBoard}
          handleRenameBoard={handleRenameBoard}
        />
      ))}
      <CreateBoardButton onClick={handleCreateBoard} />
      <CreateBoardForm handleClose={handleCloseModal} isModalOpen={isModalOpen} />
    </Box>
  );
};

export default BoardsPage;
