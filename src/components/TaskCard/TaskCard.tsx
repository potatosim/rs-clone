import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardHeader from 'components/CardHeader';
import React, { FC } from 'react';

interface TaskCardProps {
  title: string;
  description: string;
}

const TaskCard: FC<TaskCardProps> = ({ title }) => {
  return (
    <Paper sx={{ padding: '0.5rem 1rem', cursor: 'grab' }} elevation={8}>
      <Typography>{title}</Typography>
    </Paper>
  );
};

export default TaskCard;
