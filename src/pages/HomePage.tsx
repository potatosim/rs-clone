// import Button from '@mui/material/Button';
// import { motion, useScroll } from 'framer-motion';
// import { Box, Card, CardMedia, Typography } from '@mui/material';
// import taskBoardImg from 'static/images/taskBoardMain.png';
import { Box } from '@mui/material';
import { SectionOne, SectionTwo } from 'components/HomePageElements/Home';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SectionOne />
      <SectionTwo />
    </Box>
  );
};

export default Home;
