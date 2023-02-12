import { Box, Button, Card, Paper } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { handlerDeleteUserTheme } from 'handlers/handlerDeleteUserTheme';
import { FC, useContext, useState } from 'react';
import { ITheme } from 'types/Theme';
import ThemeEditor from './ThemeEditor';

const ThemeCard: FC<ITheme> = (props) => {
  const { firestore } = useContext(FirebaseContext);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card raised={true} sx={{ p: '15px' }}>
      <Typography variant="h5" align="center">
        {props.name}
      </Typography>
      <Paper
        sx={{
          height: '150px',
          background: `linear-gradient(180deg, ${props.primary} 50%, ${props.secondary} 50%)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', m: '20px auto 10px' }}>
        <ButtonGroup fullWidth={true}>
          <Button variant="contained">Apply</Button>
          <Button variant="contained" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          {isEditing && <ThemeEditor {...props} setIsEditing={setIsEditing} />}
          <Button
            variant="contained"
            onClick={() => {
              handlerDeleteUserTheme(firestore, props.id);
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
