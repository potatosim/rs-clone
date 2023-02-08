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

const ColumnsWrapper = styled('div')`
  position: relative;
  display: flex;
  align-items: flex-start;
  column-gap: 1rem;
  justify-content: flex-start;
`;

const BoardPage = () => {
  const { boardId } = useParams();
  const { board, boardLoading } = useBoard(boardId!);
  const { columns, columnsLoading } = useColumns(board?.columns);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  if (!board || boardLoading || columnsLoading) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '2rem',
      }}
    >
      <Paper sx={{ display: 'flex', padding: '0.5rem', columnGap: '1rem' }}>
        <Button onClick={() => navigate(AppRoutes.Boards)} variant="contained" size="small">
          Back to the boards
        </Button>
        <Typography variant="h5" fontWeight="600" textTransform="capitalize">
          {board?.title}
        </Typography>
      </Paper>
      <ColumnsWrapper>
        {columns?.map(({ id }) => (
          <BoardColumn columnId={id} key={id} />
        ))}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ padding: '1rem 4rem' }}
          onClick={handleOpen}
        >
          Add Column
        </Button>
      </ColumnsWrapper>
      <CreateColumnForm boardId={boardId!} handleClose={handleClose} isModalOpen={isOpen} />
    </Box>
  );
};

export default BoardPage;
