import {
  Box,
  Paper,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FC } from 'react';

const ThemeThumbnail: FC = ({}) => {
  return (
    <Box
      sx={{
        maxWidth: '600px',
        width: '100%',
        background: '#9E9E9E',
        borderRadius: '5px',
        p: '5px',
      }}
    >
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        Theme name
      </Typography>
      <Box sx={{ border: '1px solid black', m: '0 15px 15px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            height: '40px',
            backgroundColor: 'primary.main',
          }}
        >
          <MenuIcon />
          <Typography variant="h6" sx={{ ml: '0.5rem' }}>
            Logo
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '400px',
            height: '300px',
            backgroundColor: 'background.default',
          }}
        >
          <Typography variant="h4" sx={{ m: '5px 10px' }}>
            Primary Background
          </Typography>
          <Paper
            square
            elevation={12}
            sx={{
              width: '75%',
              height: '70%',
              m: ' 5px auto 10px',
              backgroundColor: 'background.paper',
            }}
          >
            <Typography variant="h5" sx={{ m: '10px' }}>
              Secondary Background
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ThemeThumbnail;
