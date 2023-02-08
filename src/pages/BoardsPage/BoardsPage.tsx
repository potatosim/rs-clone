import { Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

import BoardCard from 'components/BoardCard';
import CreateBoardButton from 'components/CreateBoardButton';
import CreateBoardForm from 'components/CreateBoardForm';
import { useBoards } from 'hooks/boardHooks/useBoards';

const BoardsPage = () => {
  const { boards, loading } = useBoards();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCreateBoard = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
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
      {boards?.map(({ id, background, title }) => (
        <BoardCard key={id} background={background} title={title} id={id} />
      ))}
      <CreateBoardButton onClick={handleCreateBoard} />
      <CreateBoardForm handleClose={handleCloseModal} isModalOpen={isModalOpen} />
    </Box>
  );
};

export default BoardsPage;
