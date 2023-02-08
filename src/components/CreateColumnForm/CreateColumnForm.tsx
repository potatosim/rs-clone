import React, { FC, useState } from 'react';

import Button from '@mui/material/Button';
import { FormWrapper } from 'components/common/FormWrapper';
import { ModalWrapper } from 'components/common/ModalWrapper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAddColumn } from 'hooks/columnHooks/useAddColumn';

interface CreateColumnFormProps {
  boardId: string;
  isModalOpen: boolean;
  handleClose: () => void;
}

const CreateColumnForm: FC<CreateColumnFormProps> = ({ isModalOpen, handleClose, boardId }) => {
  const [columnTitle, setColumnTitle] = useState<string>('');
  const addColumn = useAddColumn(columnTitle, boardId);

  const handleCreateColumn = async () => {
    await addColumn();
    handleClose();
  };

  return (
    <ModalWrapper open={isModalOpen} onClose={handleClose}>
      <FormWrapper>
        <Typography>Add new column</Typography>
        <TextField
          value={columnTitle}
          required
          label="Title of the column"
          onChange={(e) => setColumnTitle(e.target.value)}
          size="small"
        />

        <Button
          disabled={!columnTitle.trim().length}
          variant="outlined"
          type="submit"
          onClick={handleCreateColumn}
        >
          Add
        </Button>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default CreateColumnForm;
