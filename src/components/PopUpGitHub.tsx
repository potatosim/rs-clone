import * as React from 'react';

import { Avatar, Fab } from '@mui/material';

import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import Grow from '@mui/material/Grow';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const GitLinksWrapper = styled(Box)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const GitLinks = styled(Grow)`
  position: absolute;
  bottom: 50px;
`;

const IconOne = () => {
  return (
    <Avatar
      src="https://github.com/leon-kn.png"
      component={Link}
      to="https://github.com/leon-kn"
      target="_blank"
      rel="noopener"
    />
  );
};

const IconTwo = () => {
  return (
    <Avatar
      src="https://github.com/potatosim.png"
      component={Link}
      to="https://github.com/potatosim"
      target="_blank"
      rel="noopener"
    />
  );
};

const IconThree = () => {
  return (
    <Avatar
      src="https://github.com/grinmak.png"
      component={Link}
      to="https://github.com/grinmak"
      target="_blank"
      rel="noopener"
    />
  );
};

const PopUpGitHub = () => {
  const [clicked, setClicked] = React.useState(false);

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  return (
    <Fab color="primary" onClick={handleClick}>
      <GitHubIcon sx={{ fontSize: '40px' }}></GitHubIcon>
      <GitLinksWrapper>
        <GitLinks
          in={clicked}
          style={{ transform: clicked ? 'translateX(-50%)' : '' }}
          {...(clicked ? { timeout: 1000 } : {})}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
            <IconOne />
            <IconTwo />
            <IconThree />
          </Box>
        </GitLinks>
      </GitLinksWrapper>
    </Fab>
  );
};

export default PopUpGitHub;
