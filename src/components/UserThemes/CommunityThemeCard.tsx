import { Box, Button, Card, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { UserContext } from 'components/RequireAuth';
import { Collections } from 'enum/Collection';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { FC, useContext } from 'react';
import { ITheme } from 'types/Theme';

const CommunityThemeCard: FC<ITheme> = ({ id, name, primary, secondary, holders }) => {
  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const handlerAddTheme = async () => {
    if (user && holders.every((uid) => uid !== user.id)) {
      updateDoc(doc(firestore, Collections.Themes, id), {
        holders: arrayUnion(user.id),
      });
    }
  };

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
        <Button
          variant="contained"
          onClick={handlerAddTheme}
          sx={{ width: '100%', maxWidth: '100px' }}
        >
          Add
        </Button>
      </Box>
    </Card>
  );
};

export default CommunityThemeCard;
