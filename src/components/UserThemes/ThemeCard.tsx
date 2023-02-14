import { Box, Button, Card, Paper } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteUserTheme } from 'helpers/deleteUserTheme';
import { FC, useContext, useState } from 'react';
import { ITheme } from 'types/Theme';
import ThemeEditor from './ThemeEditor';
import { toast, ToastContainer } from 'react-toastify';
import { ThemeContext } from 'components/ThemeChanger/ThemeChanger';
import 'react-toastify/dist/ReactToastify.css';

const user: string = 'dtkL6o320t70FceVT0QA';

const ThemeCard: FC<ITheme> = (props) => {
  const { firestore } = useContext(FirebaseContext);
  const [isEditing, setIsEditing] = useState(false);

  // TODO: add Delete for a regular user and for the creator
  const deleteTheme = () => {
    deleteDoc(doc(firestore, Collections.Themes, props.id));
    deleteUserTheme(firestore, props.id);
  };

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
          <Button
            variant="contained"
            onClick={() => {
              if (user === props.creator) {
                setIsEditing(true);
              } else {
                toast.warn('You cannot edit the themes of another user');
              }
            }}
          >
            Edit
          </Button>
          {isEditing && <ThemeEditor {...props} setIsEditing={setIsEditing} />}
          <Button
            variant="contained"
            onClick={() => {
              if (user === props.creator) {
                deleteTheme();
              } else {
                deleteUserTheme(firestore, props.id);
              }
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Box>
      <ToastContainer position="top-center" />
    </Card>
  );
};

export default ThemeCard;
