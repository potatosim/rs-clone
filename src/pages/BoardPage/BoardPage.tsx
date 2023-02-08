import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import React from 'react';
import { useBoard } from 'hooks/boardHooks/useBoard';

import Board from 'components/Board';

const BoardPage = () => {
  const { boardId } = useParams();
  const { board, boardLoading } = useBoard(boardId!);

  if (!board || boardLoading) {
    // TODO make this shit beautiful
    return <CircularProgress />;
  }

  return <Board {...board} />;
};

export default React.memo(BoardPage);
