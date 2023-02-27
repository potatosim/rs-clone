import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { InputsTranslationKeys, TranslationNameSpaces } from 'enum/Translations';

interface PasswordInputProps {
  value: string;
  setValue: (value: string) => void;
  error: boolean;
  errorMessage: string;
}

const PasswordInput = ({ error, errorMessage, setValue, value }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const { t: translate } = useTranslation(TranslationNameSpaces.Inputs);

  return (
    <TextField
      color="secondary"
      size="small"
      required
      value={value}
      label={translate(InputsTranslationKeys.Password, {
        ns: TranslationNameSpaces.Inputs,
      })}
      error={error}
      helperText={error && errorMessage}
      type={isVisible ? 'text' : 'password'}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <IconButton color="secondary" onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        ),
      }}
    />
  );
};

export default PasswordInput;
