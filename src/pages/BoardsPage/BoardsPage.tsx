import { Box, CircularProgress } from '@mui/material';

import BoardCard from 'components/BoardCard';
import CreateBoardButton from 'components/CreateBoardButton';
import { useBoards } from 'hooks/boardHooks/useBoards';

const BoardsPage = () => {
  const { boards, loading, handleDeleteBoard, handleRenameBoard } = useBoards();

  if (loading || !boards) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        p: 4,
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
      <CreateBoardButton />
    </Box>
  );
};

export default BoardsPage;
