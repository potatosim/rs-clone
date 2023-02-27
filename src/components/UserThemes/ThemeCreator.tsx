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
  FormControlLabel,
  Checkbox,
  Switch,
} from '@mui/material';
import { FC, useContext, useState } from 'react';
import ThemeThumbnail from './ThemeThumbnail';
import ArrowIcon from '@mui/icons-material/ExpandMore';
import { addDoc, collection } from 'firebase/firestore';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import styled from '@emotion/styled';
import { UserContext } from 'components/RequireAuth';

interface ThemeCreatorProps {
  setIsCreating: (value: boolean) => void;
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

const ThemeCreator: FC<ThemeCreatorProps> = ({ setIsCreating }) => {
  const { firestore } = useContext(FirebaseContext);
  const [name, setName] = useState<string>('New Theme');
  const [primary, setPrimary] = useState<string>('#9E9E9E');
  const [secondary, setSecondary] = useState<string>('#9E9E9E');
  const [checked, setChecked] = useState<boolean>(false);
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const { user } = useContext(UserContext);

  const addTheme = async () => {
    if (user) {
      setIsCreating(false);
      await addDoc(collection(firestore, 'themes'), {
        creator: user.id,
        name: name,
        primary: primary,
        secondary: secondary,
        isPublic: checked,
        holders: [user.id],
        mode,
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={primary}
                onChange={(e) => setPrimary(e.target.value)}
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
                value={secondary}
                onChange={(e) => setSecondary(e.target.value)}
                sx={{ width: '250px' }}
              />
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
          <Accordion square disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">Privacy</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel
                control={<Checkbox checked={checked} />}
                onChange={() => {
                  if (checked) {
                    setChecked(false);
                  } else {
                    setChecked(true);
                  }
                }}
                label="Add to community themes"
              />
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
          <Accordion square disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">Mode</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Light</Typography>
              <Switch
                onChange={(e) => {
                  if (e.target.checked) {
                    setMode('dark');
                  } else {
                    setMode('light');
                  }
                }}
              />
              <Typography>Dark</Typography>
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
        </Box>
        <Divider orientation="vertical" sx={{ backgroundColor: 'grey', width: '4px' }} />
        <ThumbnailWrapper>
          <ThemeThumbnail name={name} primary={primary} secondary={secondary} mode={mode} />
          <Box sx={{ mt: '1rem' }}>
            <Button
              variant="contained"
              sx={{ width: '100px', mr: '1rem' }}
              onClick={() => addTheme()}
            >
              Create
            </Button>
            <Button
              variant="contained"
              sx={{ width: '100px' }}
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
          </Box>
        </ThumbnailWrapper>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

export default ThemeCreator;
