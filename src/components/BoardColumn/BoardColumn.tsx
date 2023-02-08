import React, { FC, useState } from 'react';

import Button from '@mui/material/Button/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTasks } from 'hooks/taskHooks/useTasks';
import { useColumn } from 'hooks/columnHooks/useColumn';
import { CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import TaskCard from 'components/TaskCard';
import CreateTaskForm from 'components/CreateTaskModal/CreateTaskForm';

interface BoardColumnProps {
  columnId: string;
}

const BoardColumn: FC<BoardColumnProps> = ({ columnId }) => {
  const { column, columnLoading } = useColumn(columnId);
  const { tasks, tasksLoading } = useTasks(column?.tasks);
  const [isOpen, setIsOpen] = useState(false);

  const loading = columnLoading || tasksLoading;

  if (loading) {
    return <CircularProgress />;
  }
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Paper
      sx={{ padding: '1rem 2rem', minWidth: '200px', display: 'flex', flexDirection: 'column' }}
      elevation={8}
    >
      <Typography sx={{ mb: '1rem' }} textAlign="center" variant="h5" fontWeight={600}>
        {column?.title}
      </Typography>
      <Stack spacing={2}>
        {tasks.map((task) => (
          <TaskCard description={task.description} title={task.title} key={task.id} />
        ))}
      </Stack>
      <Button sx={{ padding: '1rem 2rem' }} onClick={handleOpen}>
        Add task
      </Button>
      <CreateTaskForm columnId={columnId} handleClose={handleClose} isModalOpen={isOpen} />
    </Paper>
  );
};

export default BoardColumn;
