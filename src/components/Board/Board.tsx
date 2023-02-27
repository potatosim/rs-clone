import { Box, ButtonGroup, Paper, Typography } from '@mui/material';
import { ButtonTranslationKeys, TranslationNameSpaces } from 'enum/Translations';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import AddIcon from '@mui/icons-material/Add';
import { BackgroundWrapper } from 'components/common/BackgroundWrapper';
import Button from '@mui/material/Button';
import Column from 'components/Column';
import CreateColumnForm from 'components/CreateColumnForm';
import { DnDTypes } from 'enum/DnDTypes';
import EditBoardButton from './EditBoardButton';
import { IBoardItem } from 'types/Board';
import ModalLoader from 'components/common/ModalLoader';
import { Queries } from 'enum/Queries';
import TaskItem from 'components/TaskItem';
import { sortByOrder } from 'helpers/sortByOrder';
import styled from '@emotion/styled';
import { useColumns } from 'hooks/columnHooks/useColumns';
import useQueryParam from 'hooks/useQueryParam';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const BoardWrapper = styled(Box)`
  position: relative;
  width: 100%;
  flex: 1 1 auto;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  row-gap: 2rem;
`;

const BoardHeader = styled(Paper)`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  justify-content: space-between;
  border-radius: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    row-gap: 1rem;
  }
`;

const ScrollableWrapper = styled('div')<{ columnsCount?: number }>`
  flex: 1 1 auto;

  overflow-x: ${({ columnsCount }) =>
    columnsCount && columnsCount * 200 > window.innerWidth - 200 ? 'scroll' : 'auto'};
`;

const ColumnsWrapper = styled('div')`
  display: flex;
  padding: 2rem;
  align-items: flex-start;
  justify-content: flex-start;
  column-gap: 1rem;
  width: max-content;
`;

const Board = (board: IBoardItem) => {
  const { background, columns, title, id } = board;
  const { columnsItems, columnsLoading, updateOrder, handleDeleteColumn, handleRenameColumn } =
    useColumns(id);
  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false);

  const taskQuery = useQueryParam(Queries.Task);

  const { t: translate } = useTranslation(TranslationNameSpaces.Buttons);

  const handleOpen = () => setIsCreateColumnOpen(true);

  const handleClose = () => setIsCreateColumnOpen(false);

  if (!columnsItems) {
    return null;
  }

  return (
    <BoardWrapper>
      <BoardHeader elevation={12}>
        <Typography variant="h4" fontWeight="600" textTransform="capitalize">
          {title}
        </Typography>
        <ButtonGroup>
          <EditBoardButton board={board} />
          <Button
            color="secondary"
            sx={{ minWidth: 150 }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            {translate(ButtonTranslationKeys.AddColumn)}
          </Button>
        </ButtonGroup>
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
      {isCreateColumnOpen && (
        <CreateColumnForm
          columnLength={columns.length}
          boardId={id}
          handleClose={handleClose}
          isModalOpen={isCreateColumnOpen}
        />
      )}
      <BackgroundWrapper bg={background} fullSize />
      <ModalLoader isOpen={columnsLoading} />
      {!!taskQuery && (
        <TaskItem boardId={id} columns={columnsItems} taskId={taskQuery} isTaskOpen={!!taskQuery} />
      )}
    </BoardWrapper>
  );
};

export default Board;
