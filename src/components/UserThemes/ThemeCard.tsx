import { Box, Button, Card, Paper } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteFromHolders } from 'helpers/deleteFromHolders';
import { FC, useContext, useState } from 'react';
import { ITheme } from 'types/Theme';
import ThemeEditor from './ThemeEditor';
import { UserContext } from 'components/RequireAuth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThemeCard: FC<ITheme> = (props) => {
  const { firestore } = useContext(FirebaseContext);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext);

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
              if (user.id === props.creator) {
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
              if (user.id === props.creator) {
                deleteDoc(doc(firestore, Collections.Themes, props.id));
              } else {
                deleteFromHolders(firestore, props.id, user.id);
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
