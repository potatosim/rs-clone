import { FC, useState } from 'react';

import Button from '@mui/material/Button';
import { FormWrapper } from 'components/common/FormWrapper';
import { ModalWrapper } from 'components/common/ModalWrapper';
import { Priorities } from 'enum/Priorities';
import PrioritySelect from 'components/PrioritySelect';
import SizeSelect from 'components/SizeSelect';
import { Sizes } from 'enum/Sizes';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAddTask } from 'hooks/taskHooks/useAddTask';
import { Box } from '@mui/material';

interface CreateTaskFormProps {
  isModalOpen: boolean;
  handleClose: () => void;
  columnId: string;
  taskLength: number;
}

const CreateTaskForm: FC<CreateTaskFormProps> = ({
  isModalOpen,
  handleClose,
  columnId,
  taskLength,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [priority, setPriority] = useState<Priorities>(Priorities.Medium);
  const [size, setSize] = useState<Sizes>(Sizes.Medium);

  const addTask = useAddTask(columnId, {
    description: taskDescription,
    title: taskTitle,
    order: taskLength,
    priority,
    size,
    columnId,
  });

  const handleCreateTask = async () => {
    handleClose();
    await addTask();
    setPriority(Priorities.Medium);
    setSize(Sizes.Medium);
    setTaskTitle('');
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
          fullWidth
        />
        <TextField
          value={taskDescription}
          label="Description"
          onChange={(e) => setTaskDescription(e.target.value)}
          size="small"
          fullWidth
        />
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', rowGap: '1rem' }}
        >
          <PrioritySelect
            currentPriority={priority}
            onPriorityChange={(e) => {
              setPriority(e.target.value as Priorities);
            }}
          />
          <SizeSelect
            currentSize={size}
            onSizeChange={(e) => {
              setSize(e.target.value as Sizes);
            }}
          />
        </Box>
        <Button
          disabled={!taskTitle.trim().length}
          variant="contained"
          type="submit"
          onClick={handleCreateTask}
          fullWidth
        >
          Add
        </Button>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default CreateTaskForm;
