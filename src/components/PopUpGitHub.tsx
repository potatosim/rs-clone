import * as React from 'react';
import Box from '@mui/material/Box';

import { Avatar, ButtonBase, Fab } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import styled from '@emotion/styled';
import Grow from '@mui/material/Grow';
import { Link } from 'react-router-dom';

const GitLinksWrapper = styled(Box)(() => ({
  position: 'relative',
}));

const GitLinks = styled(Grow)(() => ({
  position: 'absolute',
  bottom: '40px',
  left: '5px',
}));

const iconOne = () => {
  return (
    <Avatar
      src="https://github.com/leon-kn.png"
      component={Link}
      to="https://github.com/leon-kn"
      target="_blank"
      rel="noopener"
    ></Avatar>
  );
};
const iconTwo = () => {
  return (
    <Avatar
      src="https://github.com/potatosim.png"
      component={Link}
      to="https://github.com/potatosim"
      target="_blank"
      rel="noopener"
    ></Avatar>
  );
};
const iconThree = () => {
  return (
    <Avatar
      src="https://github.com/grinmak.png"
      component={Link}
      to="https://github.com/grinmak"
      target="_blank"
      rel="noopener"
    ></Avatar>
  );
};

const PopUpGitHub = () => {
  const containerRef = React.useRef(null);
  const [clicked, setCliked] = React.useState(false);

  const handleClick = () => {
    setCliked((prev) => !prev);
  };

  return (
    <ButtonBase centerRipple onClick={handleClick} ref={containerRef}>
      <GitLinksWrapper>
        <GitLinks in={clicked} style={{}} {...(clicked ? { timeout: 1000 } : {})}>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
            <>
              {iconOne()}
              {iconTwo()}
              {iconThree()}
            </>
          </Box>
        </GitLinks>
      </GitLinksWrapper>
      <Fab color="primary">
        <GitHubIcon sx={{ fontSize: '40px' }}></GitHubIcon>
      </Fab>
    </ButtonBase>
  );
};

export default PopUpGitHub;
