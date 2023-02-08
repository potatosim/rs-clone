import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ITaskItem } from 'types/Task';

interface TaskCardProps {
  task: ITaskItem;
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  return (
    <Draggable draggableId={task.id} index={task.order}>
      {({ draggableProps, innerRef, dragHandleProps }) => (
        <Paper
          sx={{ padding: '0.5rem 1rem' }}
          elevation={8}
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
        >
          <Typography>{task.title}</Typography>
        </Paper>
      )}
    </Draggable>
  );
};

export default React.memo(TaskCard);
