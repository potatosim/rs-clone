import { Paper, styled } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import { BackgroundWrapper } from 'components/common/BackgroundWrapper';
import { AppRoutes } from 'enum/AppRoutes';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBoardItem } from 'types/Board';

interface BoardCardAccountProps {
  board: IBoardItem;
}

const CardWrapper = styled(Paper)`
  position: relative;
  min-height: 6rem;
  width: 150px;
  cursor: pointer;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const BoardCardAccount: FC<BoardCardAccountProps> = ({ board }) => {
  const navigate = useNavigate();

  return (
    <CardWrapper
      elevation={12}
      onClick={() => navigate(AppRoutes.Board.replace(':boardId', board.id))}
    >
      <Paper sx={{ maxHeight: '40px' }}>
        <Typography
          padding="0 0.5rem"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {board.title}
        </Typography>
      </Paper>
      <BackgroundWrapper bg={board.background} />
    </CardWrapper>
  );
};

export default BoardCardAccount;
