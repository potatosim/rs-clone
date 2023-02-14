import GitHubIcon from '@mui/icons-material/GitHub';
import { Fab, Box, ButtonBase, ImageListItem, Toolbar } from '@mui/material';
import Link from '@mui/material/Link';
import RsLogo from 'static/images/rss.svg';
import styled from '@emotion/styled';
import SlideFromContainer from 'components/PopUpGitHub';

const FooterWrapper = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const Footer = () => {
  return (
    <FooterWrapper>
      <Toolbar>
        <ImageListItem sx={{ width: 100 }}>
          <img src={RsLogo} />
        </ImageListItem>
        <Box sx={{ textAlign: 'center' }}>
          <ButtonBase
            centerRipple
            sx={{
              transform: 'none',
              transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            }}
          >
            <Fab>
              <GitHubIcon></GitHubIcon>
            </Fab>
          </ButtonBase>
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
        <SlideFromContainer></SlideFromContainer>
      </Toolbar>
    </FooterWrapper>
  );
};

export default Footer;
