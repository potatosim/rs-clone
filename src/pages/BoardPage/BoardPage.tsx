import { Box, Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { AppRoutes } from 'enum/AppRoutes';
import { useBoard } from 'hooks/boardHooks/useBoard';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import BoardColumn from 'components/BoardColumn';
import styled from '@emotion/styled';
import CreateColumnForm from 'components/CreateColumnForm';
import { useState } from 'react';
import { useColumns } from 'hooks/columnHooks/useColumns';
import ModalLoader from 'components/common/ModalLoader';
import { BackgroundWrapper } from 'components/common/BackgroundWrapper';

const ColumnsWrapper = styled('div')<{ columnsCount?: number }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  column-gap: 1rem;
  justify-content: flex-start;
  max-width: 100%;
  overflow-x: ${({ columnsCount }) =>
    columnsCount && columnsCount * 200 > window.innerWidth - 200 ? 'scroll' : 'auto'};
`;

const BoardPage = () => {
  const { boardId } = useParams();
  const { board, boardLoading } = useBoard(boardId!);
  const { columns, columnsLoading } = useColumns(board?.columns);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isLoading = boardLoading || columnsLoading;

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '2rem',
          height: '100vh',
        }}
      >
        <Paper sx={{ display: 'flex', padding: '0.5rem', columnGap: '1rem' }}>
          <Button onClick={() => navigate(AppRoutes.Boards)} variant="contained" size="small">
            Back to the boards
          </Button>
          <Typography variant="h4" fontWeight="600" textTransform="capitalize">
            {board?.title}
          </Typography>
        </Paper>
        <ColumnsWrapper columnsCount={columns.length}>
          {columns?.map(({ id }) => (
            <BoardColumn boardId={boardId!} columnId={id} key={id} />
          ))}

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ minWidth: '200px', padding: '1rem' }}
            onClick={handleOpen}
          >
            Add Column
          </Button>
        </ColumnsWrapper>
        <CreateColumnForm boardId={boardId!} handleClose={handleClose} isModalOpen={isOpen} />
        {board && <BackgroundWrapper bg={board!.background} fullSize />}
        <ModalLoader isOpen={isLoading} />
      </Box>
    </>
  );
};

export default BoardPage;
