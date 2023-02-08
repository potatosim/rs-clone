import { Draggable, Droppable } from 'react-beautiful-dnd';
import React, { FC, useContext, useState } from 'react';
import { arrayRemove, doc, updateDoc, writeBatch } from 'firebase/firestore';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button/Button';
import CardHeader from 'components/CardHeader';
import { Collections } from 'enum/Collection';
import CreateTaskForm from 'components/CreateTaskForm/CreateTaskForm';
import { DnDTypes } from 'enum/DnDTypes';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { IColumnItem } from 'types/Column';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TaskCard from 'components/TaskCard';
import { sortByOrder } from 'helpers/sortByOrder';
import { useTasks } from 'hooks/taskHooks/useTasks';

import styled from '@emotion/styled';

interface BoardColumnProps {
  column: IColumnItem;
  boardId: string;
}

const ColumnWrapper = styled(Paper)`
  padding: 1rem 2rem;
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: lightgray;
  row-gap: 1rem;
`;

const Column: FC<BoardColumnProps> = ({ boardId, column }) => {
  const { firestore } = useContext(FirebaseContext);
  const { tasks } = useTasks(column.id);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleDeleteColumn = async () => {
    // TODO: check deleting of tasks according to its column
    const batch = writeBatch(firestore);
    batch.delete(doc(firestore, Collections.Columns, column.id));

    batch.update(doc(firestore, Collections.Boards, boardId), {
      columns: arrayRemove(column.id),
    });

    column.tasks.map((task) => {
      const taskRef = doc(firestore, Collections.Tasks, task);
      batch.delete(taskRef);
    });

    await batch.commit();
  };

  const handleUpdateTitle = async (title: string) => {
    await updateDoc(doc(firestore, Collections.Columns, column.id), {
      title,
    });
  };

  if (!tasks) {
    // TODO here spinner
    return null;
  }

  return (
    <Draggable draggableId={column.id} index={column.order}>
      {({ draggableProps, innerRef, dragHandleProps }) => (
        <ColumnWrapper ref={innerRef} {...draggableProps} {...dragHandleProps} elevation={8}>
          <CardHeader
            cardTitle={column.title}
            handleDelete={handleDeleteColumn}
            handleUpdate={handleUpdateTitle}
          />
          <Droppable type={DnDTypes.Task} droppableId={column.id}>
            {({ droppableProps, innerRef: columnRef, placeholder }) => (
              <Stack spacing={2} sx={{ width: '100%' }} ref={columnRef} {...droppableProps}>
                {sortByOrder(tasks).map((task) => (
                  <TaskCard task={task} key={task.id} />
                ))}
                {placeholder}
              </Stack>
            )}
          </Droppable>
          <Button sx={{ padding: '1rem 2rem' }} onClick={handleOpen} startIcon={<AddIcon />}>
            Add task
          </Button>
          <CreateTaskForm
            taskLength={tasks.length}
            columnId={column.id}
            handleClose={handleClose}
            isModalOpen={isOpen}
          />
        </ColumnWrapper>
      )}
    </Draggable>
  );
};

export default React.memo(Column);
