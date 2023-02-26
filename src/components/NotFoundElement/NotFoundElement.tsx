import { Box, Button, Paper, Typography } from '@mui/material';
import React, { FC } from 'react';
import WarningIcon from '@mui/icons-material/Warning';

interface NotFoundElementProps {
  notification: string;
  buttonText: string;
  onClick: () => void;
}

const NotFoundElement: FC<NotFoundElementProps> = ({ notification, buttonText, onClick }) => {
  return (
    <Paper
      elevation={12}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        rowGap: '2rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: '1rem',
        }}
      >
        <WarningIcon></WarningIcon>
        <Typography variant="h4">{notification}</Typography>
      </Box>
      <Button color="secondary" variant="contained" onClick={onClick}>
        {buttonText}
      </Button>
    </Paper>
  );
};

export default NotFoundElement;
