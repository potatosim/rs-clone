import { Box, Button, Card, Paper } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { userConverter } from 'helpers/converters';
import { FC, useContext } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { ITheme } from 'types/Theme';

const CommunityThemeCard: FC<ITheme> = ({ id, name, primary, secondary }) => {
  const { firestore } = useContext(FirebaseContext);
  const [user, userLoading] = useDocumentData(
    doc(firestore, Collections.Users, 'dtkL6o320t70FceVT0QA').withConverter(userConverter),
  );
  const availableThemes = user?.availableThemes!;

  const handleAddTheme = async () => {
    if (!availableThemes.some((theme) => theme === id) && user) {
      updateDoc(doc(firestore, Collections.Users, user.id), {
        availableThemes: arrayUnion(id),
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
        <ButtonGroup fullWidth={true}>
          <Button variant="contained" onClick={handleAddTheme}>
            Add to My Themes
          </Button>
        </ButtonGroup>
      </Box>
    </Card>
  );
};

export default CommunityThemeCard;
