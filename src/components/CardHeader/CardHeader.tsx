import { TextField, IconButton, Typography, Box } from '@mui/material';
import MenuListComposition from 'components/MenuListComposition';
import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styled from '@emotion/styled';

interface CardHeaderProps {
  cardTitle: string;
  handleUpdate: (title: string) => void;
  handleDelete: () => void;
  padding?: string;
  divider?: boolean;
}

const BoardCardHeader = styled(Box)<{ padding?: string; divider?: boolean }>`
  max-width: 100%;
  padding: ${({ padding }) => padding || ''};
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 0.5rem;
  background-color: transparent;
  border-bottom: ${({ divider }) => (divider && '4px solid blue') || ''};
`;

const CardHeader = ({
  cardTitle,
  handleDelete,
  handleUpdate,
  padding,
  divider = false,
}: CardHeaderProps) => {
  const [isChangeTitle, setIsChangeTitle] = useState(false);

  const [title, setTitle] = useState(cardTitle);

  const handleRename = () => {
    setIsChangeTitle(true);
  };

  const handleCloseRename = () => {
    setIsChangeTitle(false);
  };

  const isButtonDisabled = cardTitle === title || !title.trim().length;

  if (isChangeTitle) {
    return (
      <BoardCardHeader divider={divider} padding={padding} onClick={(e) => e.stopPropagation()}>
        <TextField
          label="Title"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton
                disabled={isButtonDisabled}
                onClick={() => {
                  setIsChangeTitle(false);
                  handleUpdate(title);
                }}
              >
                <CheckCircleIcon color={isButtonDisabled ? 'disabled' : 'success'} />
              </IconButton>
            ),
          }}
        />
        <IconButton onClick={handleCloseRename}>
          <CancelIcon color="error" />
        </IconButton>
      </BoardCardHeader>
    );
  }

  return (
    <BoardCardHeader divider={divider} padding={padding}>
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
      <MenuListComposition handleDelete={handleDelete} handleRename={handleRename} />
    </BoardCardHeader>
  );
};

export default CardHeader;
