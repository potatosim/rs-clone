import { Box, Button, Card, Paper } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteFromHolders } from 'helpers/deleteFromHolders';
import { FC, useContext, useState } from 'react';
import { ITheme } from 'types/Theme';
import ThemeEditor from './ThemeEditor';
import { UserContext } from 'components/RequireAuth';
import { usersConverter } from 'helpers/converters';
import { IUserItem } from 'types/User';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IThemeItem extends ITheme {
  status: 'userTheme' | 'communityTheme';
}

const ThemeItem: FC<IThemeItem> = (props) => {
  const { firestore } = useContext(FirebaseContext);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext);

  const handlerAddTheme = async () => {
    if (user && props.holders.every((uid) => uid !== user.id)) {
      updateDoc(doc(firestore, Collections.Themes, props.id), {
        holders: arrayUnion(user.id),
      });
    }
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
        {props.status === 'userTheme' ? (
          <ButtonGroup fullWidth={true}>
            <Button
              variant="contained"
              onClick={() => {
                updateDoc<IUserItem>(
                  doc(firestore, Collections.Users, user.id).withConverter(usersConverter),
                  {
                    currentTheme: props.id,
                  },
                );
              }}
            >
              Apply
            </Button>
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
        ) : (
          <Button
            variant="contained"
            onClick={handlerAddTheme}
            sx={{ maxWidth: '120px', width: '100%' }}
          >
            Add
          </Button>
        )}
      </Box>
      <ToastContainer position="top-center" />
    </Card>
  );
};

export default ThemeItem;
