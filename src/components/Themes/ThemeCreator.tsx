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
  ButtonGroup,
} from '@mui/material';
import React, { FC, useState } from 'react';
import ThemeThumbnail from './ThemeThumbnail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ThemeCreatorProps {
  setIsCreating: (value: boolean) => void;
}

const ThemeCreator: FC<ThemeCreatorProps> = ({ setIsCreating }) => {
  const [name, setName] = useState('');
  const [primary, setPrimary] = useState('#000000');
  const [secondary, setSecondary] = useState('#000000');

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
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Name</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField label="Name" type="text" sx={{ width: '250px', mb: '20px' }} />
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion disableGutters={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Primary Color</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField label="primary" type="color" sx={{ width: '250px', mb: '20px' }} />
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion disableGutters={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Secondary Color</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField label="secondary" type="color" sx={{ width: '250px' }} />
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
        <ThemeThumbnail />
        <Box sx={{ mt: '1rem' }}>
          <Button variant="contained" sx={{ width: '100px', mr: '1rem' }}>
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
