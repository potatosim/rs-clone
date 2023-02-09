import { Box, Button, Card, Paper } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { ITheme } from 'types/Theme';

const ThemeCard: FC<ITheme> = ({ name, primary, secondary }) => {
  return (
    <Card raised={true} sx={{ p: '15px' }}>
      <Typography variant="h5" align="center">
        {name}
      </Typography>
      <Paper
        sx={{
          height: '150px',
          background: `linear-gradient(180deg, ${primary} 50%, ${secondary} 50%)`,
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
