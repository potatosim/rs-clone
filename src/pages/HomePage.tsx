import { Box } from '@mui/material';
import { SectionOne } from 'components/HomePageElements/SectionOne';
import { SectionTwo } from 'components/HomePageElements/SectionTwo';
import { SectionThree } from 'components/HomePageElements/SectionThree';

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
      <SectionThree />
    </Box>
  );
};

export default Home;
