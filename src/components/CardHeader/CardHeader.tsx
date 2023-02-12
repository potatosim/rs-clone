import { Typography } from '@mui/material';
import MenuListComposition from 'components/MenuListComposition';
import { useState } from 'react';

import { BoardCardHeader } from 'components/common/BoardHeaderWrapper';
import RenameTextField from 'components/RenameTextField/RenameTextField';

interface CardHeaderProps {
  cardTitle: string;
  handleUpdate: (title: string) => void;
  handleDelete: () => void;
  padding?: string;
}

const CardHeader = ({ cardTitle, handleDelete, handleUpdate, padding }: CardHeaderProps) => {
  const [isChangeTitle, setIsChangeTitle] = useState(false);

  const handleOpenRename = () => {
    setIsChangeTitle(true);
  };

  const handleClose = () => {
    setIsChangeTitle(false);
  };

  const handleSubmit = (value: string) => {
    setIsChangeTitle(false);
    handleUpdate(value);
  };

  if (isChangeTitle) {
    return (
      <RenameTextField
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        padding={padding}
        initialTitle={cardTitle}
      />
    );
  }

  return (
    <BoardCardHeader padding={padding}>
      <Typography
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        variant="h5"
        fontWeight={600}
        sx={{ textTransform: 'capitalize' }}
      >
        {cardTitle}
      </Typography>
      <MenuListComposition handleDelete={handleDelete} handleRename={handleOpenRename} />
    </BoardCardHeader>
  );
};

export default CardHeader;
