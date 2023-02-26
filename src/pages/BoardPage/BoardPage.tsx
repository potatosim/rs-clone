import Board from 'components/Board';
import { CircularProgress } from '@mui/material';
import React, { useContext } from 'react';
import { useBoard } from 'hooks/boardHooks/useBoard';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from 'components/RequireAuth';
import { AppRoutes } from 'enum/AppRoutes';
import NotFoundElement from 'components/NotFoundElement';

const BoardPage = () => {
  const { boardId } = useParams();
  const { board, boardLoading } = useBoard(boardId!);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (boardLoading) {
    // TODO make this shit beautiful
    return <CircularProgress />;
  }

  if (!board) {
    return <div>Not found</div>;
  }

  if (!board.allowedUsers.some((allowedUser) => allowedUser === user.id)) {
    return (
      <NotFoundElement
        buttonText="to my boards"
        notification="You don't have permission to access this board"
        onClick={() => {
          navigate(AppRoutes.Boards);
        }}
      ></NotFoundElement>
    );
  } else {
    return <Board {...board} />;
  }
};

export default React.memo(BoardPage);
