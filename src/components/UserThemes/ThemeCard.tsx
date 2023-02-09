import { Box, Button, Card, Paper } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

const ThemeCard = () => {
  return (
    <Card raised={true} sx={{ p: '15px' }}>
      <Typography variant="h5" align="center">
        New Theme
      </Typography>
      <Paper
        sx={{
          height: '150px',
          background: 'linear-gradient(180deg, #f5a506 50%, #8f1be3 50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', m: '20px auto 10px' }}>
        <ButtonGroup fullWidth={true}>
          <Button variant="contained">Apply</Button>
          <Button variant="contained">Edit</Button>
          <Button variant="contained">Delete</Button>
        </ButtonGroup>
      </Box>
    </Card>
  );
};

export default ThemeCard;
