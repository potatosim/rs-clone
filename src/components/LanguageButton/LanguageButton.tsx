import { Badge, IconButton } from '@mui/material';
import React, { FC } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

const LanguageButton: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguageHandler = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('ru');
    } else {
      i18n.changeLanguage('en');
    }
  };

  return (
    <Badge color="secondary" badgeContent={i18n.language.toUpperCase()}>
      <IconButton onClick={changeLanguageHandler} color="secondary">
        <LanguageIcon />
      </IconButton>
    </Badge>
  );
};

export default LanguageButton;
