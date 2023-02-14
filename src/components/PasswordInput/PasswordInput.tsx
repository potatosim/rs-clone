import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface PasswordInputProps {
  value: string;
  setValue: (value: string) => void;
  error: boolean;
  errorMessage: string;
}

const PasswordInput = ({ error, errorMessage, setValue, value }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField
      size="small"
      required
      value={value}
      label="Password"
      error={error}
      helperText={error && errorMessage}
      type={isVisible ? 'text' : 'password'}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        ),
      }}
    />
  );
};

export default PasswordInput;
