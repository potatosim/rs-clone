import React from 'react';
import { Box, ImageListItem, Toolbar } from '@mui/material';
import RsLogo from 'static/images/rss.svg';
import styled from '@emotion/styled';
import PopUpGitHub from 'components/PopUpGitHub';

const FooterWrapper = styled(Box)(() => ({
  display: 'flex',
}));

const Footer = () => {
  return (
    <FooterWrapper>
      <Toolbar sx={{ width: '100%', justifyContent: 'space-between', alignContent: 'center' }}>
        <ImageListItem sx={{ width: 100 }}>
          <img src={RsLogo} />
        </ImageListItem>
        <Box sx={{ textAlign: 'center' }}>
          <PopUpGitHub />
        </Box>
      </Toolbar>
    </FooterWrapper>
  );
};

export default Footer;
