import {
  AppBar,
  Box,
  Button,
  Paper,
  TextField,
  Theme,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FC, useEffect, useState } from 'react';
import { generateTheme } from 'helpers/generateTheme';
import { ITheme } from 'types/Theme';

interface ThumbnailProps {
  name: string;
  primary: string;
  secondary: string;
  mode: 'light' | 'dark';
}

const ThemeThumbnail: FC<ThumbnailProps> = ({ name, primary, secondary, mode }) => {
  return (
    <Box
      sx={{
        maxWidth: '600px',
        width: '100%',
        p: '5px',
      }}
    >
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        {name}
      </Typography>
      <Box sx={{ border: '4px solid black', borderRadius: '5px', m: '0 15px 15px' }}>
        <ThemeProvider theme={generateTheme({ primary, secondary, mode } as ITheme)}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <MenuIcon />
              <Typography variant="h6" sx={{ ml: '1rem' }}>
                Logo
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '400px',
              height: '300px',
              
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
              }}
            >
              <Typography variant="h5" sx={{ m: '10px' }}>
                Secondary Background
              </Typography>
              <Button variant="contained" color="secondary" sx={{ maxWidth: '200px' }}>
                Secondary Color
              </Button>
              <TextField label="Field" color="primary" sx={{ m: '1rem auto' }} />
            </Paper>
          </Box>
          {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            height: '40px',
            backgroundColor: primary,
          }}
        >
          <MenuIcon sx={{ m: '1rem' }} />
          <Typography variant="h6">Logo</Typography>
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
        </Box> */}
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default ThemeThumbnail;
