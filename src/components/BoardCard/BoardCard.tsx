import { BackgroundWrapper } from 'components/common/BackgroundWrapper';
import CardHeader from 'components/CardHeader';
import { FC } from 'react';
import { IBoardItem } from 'types/Board';
import { Paper } from '@mui/material';
import { getBoardPageUrl } from 'helpers/getBoardPageUrl';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface BoardItemProps {
  board: IBoardItem;
  handleDeleteBoard: (boardId: string) => void;
  handleRenameBoard: (title: string, boardId: string) => void;
}

const CardWrapper = styled(Paper)`
  min-height: 6rem;
  width: 270px;
  cursor: pointer;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const BoardCard: FC<BoardItemProps> = ({ board, handleDeleteBoard, handleRenameBoard }) => {
  const navigate = useNavigate();

  return (
    <CardWrapper elevation={12} onClick={() => navigate(getBoardPageUrl(board.id))}>
      <CardHeader
        padding="0.5rem 1rem"
        cardTitle={board.title}
        handleDelete={() => handleDeleteBoard(board.id)}
        handleUpdate={(title) => handleRenameBoard(title, board.id)}
      />
      <BackgroundWrapper bg={board.background} />
    </CardWrapper>
  );
};

export default BoardCard;
