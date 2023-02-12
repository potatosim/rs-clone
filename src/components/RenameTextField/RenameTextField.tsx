import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

import { BoardCardHeader } from 'components/common/BoardHeaderWrapper';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface RenameTextFieldProps {
  initialTitle: string;
  handleSubmit: (value: string) => void;
  handleClose: () => void;
  justify?: 'between' | 'start';
  padding?: string;
}

const RenameTextField = ({
  padding,
  justify,
  initialTitle,
  handleSubmit,
  handleClose,
}: RenameTextFieldProps) => {
  const [title, setTitle] = useState(initialTitle);

  const isButtonDisabled = initialTitle === title || !title.trim().length;

  return (
    <BoardCardHeader justify={justify} padding={padding} onClick={(e) => e.stopPropagation()}>
      <TextField
        label="Title"
        size="small"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton disabled={isButtonDisabled} onClick={() => handleSubmit(title)}>
              <CheckCircleIcon color={isButtonDisabled ? 'disabled' : 'success'} />
            </IconButton>
          ),
        }}
      />
      <IconButton onClick={handleClose}>
        <CancelIcon color="error" />
      </IconButton>
    </BoardCardHeader>
  );
};

export default RenameTextField;
