import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import React from 'react';
import { useBoard } from 'hooks/boardHooks/useBoard';

import Board from 'components/Board';

const BoardPage = () => {
  const { boardId } = useParams();
  const { board, boardLoading } = useBoard(boardId!);

  if (boardLoading) {
    // TODO make this shit beautiful
    return <CircularProgress />;
  }

  if (!board) {
    return <div>Not found</div>;
  }

  return <Board {...board} />;
};

export default React.memo(BoardPage);
