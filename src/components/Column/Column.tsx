import { Draggable, Droppable } from 'react-beautiful-dnd';
import React, { FC, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button/Button';
import CardHeader from 'components/CardHeader';
import CreateTaskForm from 'components/CreateTaskForm';
import { DnDTypes } from 'enum/DnDTypes';
import { IColumnItem } from 'types/Column';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TaskCard from 'components/TaskCard';
import { useTasks } from 'hooks/taskHooks/useTasks';

import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { ButtonTranslationKeys, TranslationNameSpaces } from 'enum/Translations';

interface BoardColumnProps {
  column: IColumnItem;
  handleDeleteColumn: (columnId: string) => void;
  handleRenameColumn: (title: string, columnId: string) => void;
}

const ColumnWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const ScrollableColumnWrapper = styled('div')`
  padding: 1rem;
  max-height: 500px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Column: FC<BoardColumnProps> = ({ column, handleDeleteColumn, handleRenameColumn }) => {
  const { tasks } = useTasks(column.id);
  const [isOpen, setIsOpen] = useState(false);

  const { t: translate } = useTranslation(TranslationNameSpaces.Buttons);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  if (!tasks) {
    // TODO here spinner
    return null;
  }

  return (
    <Draggable draggableId={column.id} index={column.order}>
      {({ draggableProps, innerRef, dragHandleProps }) => (
        <ColumnWrapper ref={innerRef} {...draggableProps} {...dragHandleProps} elevation={8}>
          <CardHeader
            padding="1rem"
            cardTitle={column.title}
            handleDelete={() => handleDeleteColumn(column.id)}
            handleUpdate={(title) => handleRenameColumn(title, column.id)}
          />
          <ScrollableColumnWrapper>
            <Droppable type={DnDTypes.Task} droppableId={column.id}>
              {({ droppableProps, innerRef: columnRef, placeholder }) => (
                <Stack
                  spacing={2}
                  sx={{ width: '100%', minHeight: 80 }}
                  ref={columnRef}
                  {...droppableProps}
                >
                  {tasks.map((task) => (
                    <TaskCard task={task} key={task.id} />
                  ))}
                  {placeholder}
                </Stack>
              )}
            </Droppable>
          </ScrollableColumnWrapper>
          <Button color="secondary" onClick={handleOpen} startIcon={<AddIcon />}>
            {translate(ButtonTranslationKeys.AddTask)}
          </Button>
          {isOpen && (
            <CreateTaskForm
              taskLength={tasks.length}
              columnId={column.id}
              handleClose={handleClose}
              isModalOpen={isOpen}
            />
          )}
        </ColumnWrapper>
      )}
    </Draggable>
  );
};

export default React.memo(Column);
