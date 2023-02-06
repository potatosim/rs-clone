import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, ImageListItem, Toolbar } from '@mui/material';
import Link from '@mui/material/Link';
import RsLogo from 'static/images/rss.svg';
import styled from '@emotion/styled';

const FooterWrapper = styled(Box)(() => ({
  width: '100%',
  // background: 'gray',
  display: 'flex',
  justifyContent: 'center',
}));

const footer = () => {
  return (
    <FooterWrapper>
      <Toolbar>
        <ImageListItem sx={{ width: 100 }}>
          <img src={RsLogo} />
        </ImageListItem>
        <Box sx={{ textAlign: 'center' }}>
          <Link href="https://github.com/leon-kn.png" target="_blank" color="inherit">
            <GitHubIcon></GitHubIcon>
          </Link>
          <Link href="https://github.com/potatosim" target="_blank" color="inherit">
            <GitHubIcon></GitHubIcon>
          </Link>
          <Link href="https://github.com/grinmak" target="_blank" color="inherit">
            <GitHubIcon></GitHubIcon>
          </Link>
        </Box>
      </Toolbar>
    </FooterWrapper>
  );
};

export default footer;
