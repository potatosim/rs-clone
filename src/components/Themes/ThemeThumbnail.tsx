import { Box, Button, Paper, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FC } from 'react';

interface ThumbnailProps {
  name: string;
  primary: string;
  secondary: string;
}

const ThemeThumbnail: FC<ThumbnailProps> = ({ name, primary, secondary }) => {
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
        {name}
      </Typography>
      <Box sx={{ border: '1px solid black', m: '0 15px 15px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            height: '40px',
            backgroundColor: primary,
          }}
        >
          <MenuIcon sx={{ m: '1rem' }} />
          <Typography variant="h6">
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '75%',
              height: '70%',
              m: ' 5px auto 10px',
              backgroundColor: 'background.paper',
            }}
          >
            <Typography variant="h5" sx={{ m: '10px' }}>
              Secondary Background
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: secondary }}>
              Secondary Color
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ThemeThumbnail;
