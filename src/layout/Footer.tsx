import React from 'react';
import { Box, Toolbar } from '@mui/material';
import RsLogo from 'static/images/rss.svg';
import styled from '@emotion/styled';
import PopUpGitHub from 'components/PopUpGitHub';
import { useTheme } from '@mui/material/styles';

const FooterWrapper = styled(Box)(() => ({
  display: 'flex',
}));

const StyledLogo = styled('img')<{ mode: 'light' | 'dark' }>(({ mode }) => ({
  maxWidth: 100,
  filter: mode === 'dark' ? 'invert(180)' : 'invert(0)',
}));
const Footer = () => {
  const theme = useTheme();
  return (
    <FooterWrapper>
      <Toolbar sx={{ width: '100%', justifyContent: 'space-between', alignContent: 'center' }}>
        <StyledLogo mode={theme.palette.mode} src={RsLogo} />
        <PopUpGitHub />
      </Toolbar>
    </FooterWrapper>
  );
};

export default Footer;
