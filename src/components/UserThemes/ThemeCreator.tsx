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
import React, { FC, useContext, useState } from 'react';
import ThemeThumbnail from './ThemeThumbnail';
import ArrowIcon from '@mui/icons-material/ExpandMore';
import { addDoc, collection } from 'firebase/firestore';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { isNamespaceImport } from 'typescript';

interface ThemeCreatorProps {
  setIsCreating: (value: boolean) => void;
}

const ThemeCreator: FC<ThemeCreatorProps> = ({ setIsCreating }) => {
  const { firestore } = useContext(FirebaseContext);
  const [name, setName] = useState<string>('');
  const [primary, setPrimary] = useState<string>('#9E9E9E');
  const [secondary, setSecondary] = useState<string>('#9E9E9E');

  const addTheme = async () => {
    try {
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
    <Paper
      elevation={24}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        maxWidth: '1200px',
        width: '100%',
        m: '25px',
        p: '15px',
      }}
    >
      <Box
        sx={{ maxWidth: '400px', width: '100%', border: '1px solid black', borderRadius: '5px' }}
      >
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
        <Divider />
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
        <Divider />
        <Accordion disableGutters={true}>
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
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '600px',
          width: '100%',
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
          <Button variant="contained" sx={{ width: '100px' }} onClick={() => setIsCreating(false)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ThemeCreator;
