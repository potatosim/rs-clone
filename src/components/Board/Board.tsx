import { Box, Paper, Typography } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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

const BoardWrapper = styled(Box)`
  flex: 1 1 auto;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  width: 80%;
  overflow: hidden;
  padding-left: 2rem;
  row-gap: 2rem;
`;

const BoardHeader = styled(Paper)`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  column-gap: 3rem;
`;

const ScrollableWrapper = styled('div')<{ columnsCount?: number }>`
  flex: 1 1 auto;

  overflow-x: ${({ columnsCount }) =>
    columnsCount && columnsCount * 200 > window.innerWidth - 200 ? 'scroll' : 'auto'};
`;

const ColumnsWrapper = styled('div')`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  column-gap: 1rem;
  width: max-content;
`;

const Board = ({ background, columns, title, id }: IBoardItem) => {
  const { columnsItems, columnsLoading, updateOrder, handleDeleteColumn, handleRenameColumn } =
    useColumns(id);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  if (!columnsItems) {
    return null;
  }

  return (
    <BoardWrapper>
      <BoardHeader elevation={12}>
        <Button onClick={() => navigate(AppRoutes.Boards)} variant="contained" size="small">
          Back to the boards
        </Button>
        <Typography variant="h4" fontWeight="600" textTransform="capitalize">
          {title}
        </Typography>
        <Button
          sx={{ minWidth: 150 }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Column
        </Button>
      </BoardHeader>
      <ScrollableWrapper columnsCount={columns.length}>
        <DragDropContext onDragEnd={updateOrder}>
          <Droppable type={DnDTypes.Column} direction="horizontal" droppableId={id}>
            {({ droppableProps, innerRef, placeholder }) => (
              <ColumnsWrapper ref={innerRef} {...droppableProps}>
                {sortByOrder(columnsItems).map((column) => (
                  <Column
                    handleDeleteColumn={handleDeleteColumn}
                    handleRenameColumn={handleRenameColumn}
                    column={column}
                    key={column.id}
                  />
                ))}
                {placeholder}
              </ColumnsWrapper>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollableWrapper>
      <CreateColumnForm
        columnLength={columns.length}
        boardId={id}
        handleClose={handleClose}
        isModalOpen={isOpen}
      />
      <BackgroundWrapper bg={background} fullSize />
      <ModalLoader isOpen={columnsLoading} />
    </BoardWrapper>
  );
};

export default Board;
