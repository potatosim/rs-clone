import {
  Accordion,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from '@mui/material';
import { FC, useContext, useState } from 'react';
import ThemeThumbnail from './ThemeThumbnail';
import ArrowIcon from '@mui/icons-material/ExpandMore';
import { doc, updateDoc } from 'firebase/firestore';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { IThemeUser } from 'types/ThemeUser';
import { userConverter } from 'helpers/converters';
import styled from '@emotion/styled';
import { Collections } from 'enum/Collection';
import { ITheme } from 'types/Theme';

interface ThemeCreatorProps extends ITheme {
  setIsEditing(value: boolean): void;
}

const ModalWrapper = styled(Box)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: 0;
  left: 0;
  background: rgba(158, 158, 158, 0.7);
`;

const ModalContentWrapper = styled(Paper)`
  position: fixed;
  display: flex;
  align-items: start;
  justify-content: space-between;
  max-width: 1100px;
  width: 100%;
  height: 75vh;
  margin: 25px;
  border: 10px solid grey;
`;

const ThumbnailWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  width: 100%;
  flex-grow: 10;
`;

const ThemeCreator: FC<ThemeCreatorProps> = ({ id, name, primary, secondary, setIsEditing }) => {
  const { firestore } = useContext(FirebaseContext);
  const [newName, setNewName] = useState<string>(name);
  const [newPrimary, setNewPrimary] = useState<string>(primary);
  const [newSecondary, setNewSecondary] = useState<string>(secondary);

  const [user, loading] = useDocumentData<IThemeUser>(
    doc(firestore, Collections.Users, 'dtkL6o320t70FceVT0QA').withConverter(userConverter),
  );

  const editTheme = async () => {
    if (user) {
      setIsEditing(false);
      updateDoc(doc(firestore, Collections.Themes, id), {
        name: newName,
        primary: newPrimary,
        secondary: newSecondary,
      });
    }
  };

  return (
    <ModalWrapper>
      <ModalContentWrapper elevation={24}>
        <Box sx={{ maxWidth: '500px', width: '100%', flexShrink: '10' }}>
          <Accordion disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">Name</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="Name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                sx={{ width: '250px', mb: '20px' }}
              />
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
          <Accordion disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">Primary Color</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="primary"
                type="color"
                value={newPrimary}
                onChange={(e) => setNewPrimary(e.target.value)}
                sx={{ width: '250px', mb: '20px' }}
              />
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
          <Accordion square disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">Secondary Color</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="secondary"
                type="color"
                value={newSecondary}
                onChange={(e) => setNewSecondary(e.target.value)}
                sx={{ width: '250px' }}
              />
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
        </Box>
        <Divider orientation="vertical" sx={{ backgroundColor: 'grey', width: '4px' }} />
        <ThumbnailWrapper>
          <ThemeThumbnail name={newName} primary={newPrimary} secondary={newSecondary} />
          <Box sx={{ mt: '1rem' }}>
            <Button
              variant="contained"
              sx={{ width: '100px', mr: '1rem' }}
              onClick={() => editTheme()}
            >
              Create
            </Button>
            <Button variant="contained" sx={{ width: '100px' }} onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Box>
        </ThumbnailWrapper>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

export default ThemeCreator;
