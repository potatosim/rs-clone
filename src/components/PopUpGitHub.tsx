import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { ButtonBase, Fab, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const iconOne = (
  <Link href="https://github.com/leon-kn.png" target="_blank" color="inherit">
    <GitHubIcon></GitHubIcon>
  </Link>
);
const iconTwo = (
  <Link href="https://github.com/potatosim" target="_blank" color="inherit">
    <GitHubIcon></GitHubIcon>
  </Link>
);
const iconThree = (
  <Link href="https://github.com/grinmak" target="_blank" color="inherit">
    <GitHubIcon></GitHubIcon>
  </Link>
);

const PopUpGitHub = () => {
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <ButtonBase onClick={handleChange}>
      <Fab ref={containerRef} onClick={handleChange}>
        <Box sx={{ width: 200 }}>
          <Slide direction="down" in={checked} container={containerRef.current}>
            <>
              {iconOne}
              {iconTwo}
              {iconThree}
            </>
          </Slide>
        </Box>
      </Fab>
    </ButtonBase>
  );
};

export default PopUpGitHub;
