import { Box, Button, Card, Paper } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { handlerDeleteUserTheme } from 'handlers/handlerDeleteUserTheme';
import { FC, useContext } from 'react';
import { ITheme } from 'types/Theme';

const ThemeCard: FC<ITheme> = ({ id, name, primary, secondary }) => {
  const { firestore } = useContext(FirebaseContext);

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
          <Button
            variant="contained"
            onClick={() => {
              console.log('start');
              handlerDeleteUserTheme(firestore, id);
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Box>
    </Card>
  );
};

export default ThemeCard;
