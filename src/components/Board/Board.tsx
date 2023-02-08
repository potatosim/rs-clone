import { Box, Paper, Typography } from '@mui/material';
import { DragDropContext, Droppable, DroppableProvidedProps } from 'react-beautiful-dnd';

import AddIcon from '@mui/icons-material/Add';
import { AppRoutes } from 'enum/AppRoutes';
import { BackgroundWrapper } from 'components/common/BackgroundWrapper';
import Button from '@mui/material/Button';
import Column from 'components/Column';
import CreateColumnForm from 'components/CreateColumnForm';
import { DnDTypes } from 'enum/DnDTypes';
import { IBoardItem } from 'types/Board';
import ModalLoader from 'components/common/ModalLoader';
import { sortByOrder } from 'helpers/sortByOrder';
import styled from '@emotion/styled';
import { useColumns } from 'hooks/columnHooks/useColumns';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ColumnsWrapper = styled('div')<{ columnsCount?: number } & DroppableProvidedProps>`
  position: relative;
  display: flex;
  align-items: flex-start;
  column-gap: 1rem;
  justify-content: flex-start;
  max-width: 100%;
  overflow-x: ${({ columnsCount }) =>
    columnsCount && columnsCount * 200 > window.innerWidth - 200 ? 'scroll' : 'auto'};
`;

const Board = ({ background, columns, title, id }: IBoardItem) => {
  const { columnsItems, columnsLoading, updateOrder } = useColumns(columns, id);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  if (!columnsItems) {
    return null;
  }

  return (
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
          {title}
        </Typography>
      </Paper>
      <DragDropContext onDragEnd={updateOrder}>
        <Droppable type={DnDTypes.Column} direction="horizontal" droppableId={id}>
          {({ droppableProps, innerRef, placeholder }) => (
            <ColumnsWrapper ref={innerRef} {...droppableProps} columnsCount={columns.length}>
              {sortByOrder(columnsItems).map((column) => (
                <Column boardId={id} column={column} key={column.id} />
              ))}
              {placeholder}
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ minWidth: '200px', padding: '1rem' }}
                onClick={handleOpen}
              >
                Add Column
              </Button>
            </ColumnsWrapper>
          )}
        </Droppable>
      </DragDropContext>
      <CreateColumnForm
        columnLength={columns.length}
        boardId={id}
        handleClose={handleClose}
        isModalOpen={isOpen}
      />
      <BackgroundWrapper bg={background} fullSize />
      <ModalLoader isOpen={columnsLoading} />
    </Box>
  );
};

export default Board;
