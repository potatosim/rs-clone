import { Badge, IconButton } from '@mui/material';
import React, { FC } from 'react';
import LanguageIcon from '@mui/icons-material/Language';

interface LanguageButtonProps {
  language: string;
  onClick: () => void;
}

const LanguageButton: FC<LanguageButtonProps> = ({ language, onClick }) => {
  return (
    <Badge color="secondary" badgeContent={language.toUpperCase()}>
      <IconButton onClick={onClick} color="secondary">
        <LanguageIcon />
      </IconButton>
    </Badge>
  );
};

export default LanguageButton;
