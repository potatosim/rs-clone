import { Paper, Typography } from '@mui/material';
import { priorityItems } from 'components/PrioritySelect/PrioritySelect';
import { sizeItems } from 'components/SizeSelect/SizeSelect';
import { getBoardPageUrl } from 'helpers/getBoardPageUrl';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITaskItem } from 'types/Task';

interface TaskCardAccountProps {
  task: ITaskItem;
}

const TaskCardAccount: FC<TaskCardAccountProps> = ({ task }) => {
  const navigate = useNavigate();

  const currentPriority = priorityItems.find((item) => item.priority === task.priority);

  const currentSize = sizeItems.find((item) => item.size === task.size);

  return (
    <Paper
      elevation={12}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        width: '150px',
        cursor: 'pointer',
      }}
      onClick={() => navigate(getBoardPageUrl(task.boardId) + `?task=${task.id}`)}
    >
      <Typography
        variant="h5"
        fontWeight={500}
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {task.title}
      </Typography>
      <Typography>
        {currentPriority?.symbol}
        {task.priority}
      </Typography>
      <Typography>
        {currentSize?.symbol}
        {task.size}
      </Typography>
    </Paper>
  );
};

export default TaskCardAccount;
