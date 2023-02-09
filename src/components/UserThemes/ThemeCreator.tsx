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
import { addDoc, collection } from 'firebase/firestore';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';

interface ThemeCreatorProps {
  setIsCreating: (value: boolean) => void;
}

const ThemeCreator: FC<ThemeCreatorProps> = ({ setIsCreating }) => {
  const { firestore } = useContext(FirebaseContext);
  const [name, setName] = useState<string>('New Theme');
  const [primary, setPrimary] = useState<string>('#9E9E9E');
  const [secondary, setSecondary] = useState<string>('#9E9E9E');

  const addTheme = async () => {
    try {
      setIsCreating(false);
      const docTheme = await addDoc(collection(firestore, 'themes'), {
        name: name,
        primary: primary,
        secondary: secondary,
      });
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1',
        top: '0',
        left: '0',
        background: 'rgba(158, 158, 158, 0.7)',
      }}
    >
      <Paper
        elevation={24}
        sx={{
          position: 'fixed',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          maxWidth: '1100px',
          width: '100%',
          height: '75vh',
          m: '25px',
          border: '10px solid grey',
        }}
      >
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
        </Box>
        <Divider orientation="vertical" sx={{ backgroundColor: 'grey', width: '4px' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '600px',
            width: '100%',
            flexGrow: '10',
          }}
        >
          <ThemeThumbnail name={name} primary={primary} secondary={secondary} />
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
        </Box>
      </Paper>
    </Box>
  );
};

export default ThemeCreator;
