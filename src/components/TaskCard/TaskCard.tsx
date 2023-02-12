import { Box, Chip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconWrapper from 'components/common/IconWrapper';
import { priorityItems } from 'components/PrioritySelect/PrioritySelect';
import { sizeItems } from 'components/SizeSelect/SizeSelect';
import { Queries } from 'enum/Queries';
import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSearchParams } from 'react-router-dom';
import { ITaskItem } from 'types/Task';

interface TaskCardProps {
  task: ITaskItem;
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const [query, setQuery] = useSearchParams();

  const handleSetQuery = () => {
    query.set(Queries.Task, task.id);
    setQuery(query);
  };

  const currentPriority = priorityItems.find((item) => item.priority === task.priority);

  const currentSize = sizeItems.find((item) => item.size === task.size);

  return (
    <Draggable draggableId={task.id} index={task.order}>
      {({ draggableProps, innerRef, dragHandleProps }) => (
        <Paper
          onClick={handleSetQuery}
          sx={{ padding: '0.5rem 1rem', display: 'flex', flexDirection: 'column', rowGap: '5px' }}
          elevation={8}
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
        >
          <Typography fontWeight={600}>{task.title}</Typography>
          <Box display="flex" columnGap="5px">
            {currentPriority && (
              // <Box
              //   sx={{
              //     display: 'flex',
              //     borderRadius: '5px',
              //     columnGap: '4px',

              //     border: `solid 1px ${currentPriority.color}`,
              //   }}
              // >
              //   {currentPriority.symbol} <Typography>{currentPriority.priority}</Typography>
              // </Box>
              <Chip
                variant="outlined"
                icon={<IconWrapper children={currentPriority.symbol} />}
                label={currentPriority.priority}
              />
            )}
            {currentSize && (
              <Chip
                variant="outlined"
                icon={<IconWrapper children={currentSize.symbol} />}
                label={currentSize.size}
              />
            )}
          </Box>
        </Paper>
      )}
    </Draggable>
  );
};

export default React.memo(TaskCard);
