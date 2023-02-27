import { Paper, styled } from '@mui/material';

import { BackgroundWrapper } from 'components/common/BackgroundWrapper';
import { FC } from 'react';
import { IBoardItem } from 'types/Board';
import Typography from '@mui/material/Typography/Typography';
import { getBoardPageUrl } from 'helpers/getBoardPageUrl';
import { useNavigate } from 'react-router-dom';

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
    <CardWrapper elevation={12} onClick={() => navigate(getBoardPageUrl(board.id))}>
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
