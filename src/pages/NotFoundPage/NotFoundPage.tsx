import { Box, Button, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import ghostImg from 'static/images/ghost.png';
import styled from '@emotion/styled';

const HoverEffect = keyframes`
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(15px);
  }
`;

const ContentWrapper = styled(Box)(() => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const MessageWrapper = styled(Box)(() => ({}));
const NotFoundPage = () => {
  return (
    <>
      <ContentWrapper>
        <MessageWrapper>
          <Typography>Error 404</Typography>
          <Typography variant="h6">
            Sorry, we can't find that page. Don't worry though, everything is still awesome!
          </Typography>
          <Button sx={{ marginTop: 5 }} variant="contained" component={Link} to="/">
            Go Home
          </Button>
        </MessageWrapper>

        <Box sx={{ animation: `${HoverEffect} 2s ease-in-out infinite alternate` }}>
          <img src={ghostImg} />
        </Box>
      </ContentWrapper>
    </>
  );
};

export default NotFoundPage;
