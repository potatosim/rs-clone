import { Box, Button, Card, Paper } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { ITheme } from 'types/ITheme';



const ThemeCard: FC<ITheme> = ({name, primary, secondary}) => {
  return (
    <Card raised={true} sx={{ p: '15px' }}>
      <Typography variant="h5" align="center">
        Any name
      </Typography>
      <Paper
        sx={{
          height: '150px',
          background: 'linear-gradient(180deg, #3f51b5 50%, #f50057 50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', m: '20px auto 10px' }}>
        <ButtonGroup fullWidth={true}>
          <Button variant="contained">Add to My Themes</Button>
        </ButtonGroup>
      </Box>
    </Card>
  );
};

export default ThemeCard;
