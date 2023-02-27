import React from 'react';
import { Box, Toolbar } from '@mui/material';
import RsLogo from 'static/images/rss.svg';
import styled from '@emotion/styled';
import PopUpGitHub from 'components/PopUpGitHub';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

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
        <Box component={Link} target="_blank" to="https://rs.school/js/">
          <StyledLogo mode={theme.palette.mode} src={RsLogo} />
        </Box>
        Created in 2023
        <PopUpGitHub />
      </Toolbar>
    </FooterWrapper>
  );
};

export default Footer;
