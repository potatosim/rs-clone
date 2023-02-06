import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormWrapper } from 'components/common/FormWrapper';
import { ModalWrapper } from 'components/common/ModalWrapper';
import { useAddTask } from 'hooks/taskHooks/useAddTask';
import React, { FC, useState } from 'react';

interface CreateTaskFormProps {
  isModalOpen: boolean;
  handleClose: () => void;
  columnId: string;
}

const CreateTaskForm: FC<CreateTaskFormProps> = ({ isModalOpen, handleClose, columnId }) => {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const addTask = useAddTask(columnId, { description: taskDescription, title: taskTitle });

  const handleCreateTask = async () => {
    await addTask();
    handleClose();
  };

  return (
    <ModalWrapper open={isModalOpen} onClose={handleClose}>
      <FormWrapper>
        <Typography>Add new task</Typography>
        <TextField
          value={taskTitle}
          required
          label="Title of the task"
          onChange={(e) => setTaskTitle(e.target.value)}
          size="small"
        />
        <TextField
          value={taskDescription}
          label="Description"
          onChange={(e) => setTaskDescription(e.target.value)}
          size="small"
        />

        <Button
          disabled={!taskTitle.trim().length}
          variant="outlined"
          type="submit"
          onClick={handleCreateTask}
        >
          Add
        </Button>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default CreateTaskForm;
