import React, { FC, useContext, useState } from 'react';

import Button from '@mui/material/Button/Button';
import Paper from '@mui/material/Paper';
import { useTasks } from 'hooks/taskHooks/useTasks';
import { useColumn } from 'hooks/columnHooks/useColumn';
import Stack from '@mui/material/Stack';
import TaskCard from 'components/TaskCard';
import CreateTaskForm from 'components/CreateTaskForm/CreateTaskForm';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import AddIcon from '@mui/icons-material/Add';
import CardHeader from 'components/CardHeader';
import Skeleton from '@mui/material/Skeleton';

interface BoardColumnProps {
  columnId: string;
  boardId: string;
}

const BoardColumn: FC<BoardColumnProps> = ({ columnId, boardId }) => {
  const { firestore } = useContext(FirebaseContext);
  const { column } = useColumn(columnId);
  const { tasks } = useTasks(column?.tasks);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleDeleteColumn = async () => {
    await deleteDoc(doc(firestore, Collections.Columns, columnId));
    await updateDoc(doc(firestore, Collections.Boards, boardId), {
      columns: arrayRemove(columnId),
    });
  };

  if (!column) {
    return <Skeleton variant="rectangular" width={270} height={150} />;
  }

  const handleUpdateTitle = async (title: string) => {
    await updateDoc(doc(firestore, Collections.Columns, columnId), {
      title,
    });
  };

  return (
    <Paper
      sx={{
        padding: '1rem 2rem',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'lightgray',
        rowGap: '1rem',
      }}
      elevation={8}
    >
      <CardHeader
        divider
        cardTitle={column.title}
        handleDelete={handleDeleteColumn}
        handleUpdate={handleUpdateTitle}
      />
      <Stack spacing={2} sx={{ width: '100%' }}>
        {tasks.map((task) => (
          <TaskCard description={task.description} title={task.title} key={task.id} />
        ))}
      </Stack>
      <Button sx={{ padding: '1rem 2rem' }} onClick={handleOpen} startIcon={<AddIcon />}>
        Add task
      </Button>
      <CreateTaskForm columnId={columnId} handleClose={handleClose} isModalOpen={isOpen} />
    </Paper>
  );
};

export default React.memo(BoardColumn);
