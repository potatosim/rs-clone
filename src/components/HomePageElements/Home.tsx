import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import taskBoardImg from 'static/images/taskBoardMain.png';
import devImgOne from 'static/images/teamMemberOne.png';
import devImgTwo from 'static/images/teamMemberTwo.png';
import devImgThree from 'static/images/teamMemberThree.png';

const testAnimation = {
  hidden: {
    x: -200,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};
const cardsAnimation = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

export const SectionOne = () => {
  return (
    <Box
      initial="hidden"
      whileInView="visible"
      component={motion.div}
      sx={{ display: 'flex', gap: 20, width: '80%', marginTop: 30 }}
    >
      <Box>
        <Typography
          variants={testAnimation}
          custom={1}
          component={motion.div}
          variant="h3"
          color="primary"
        >
          Meet the best way to boost your productivity with easy and powerful tool
        </Typography>
        <Button
          component={motion.div}
          variants={testAnimation}
          custom={5}
          variant="contained"
          sx={{ padding: '10px 20px', marginTop: '20px' }}
        >
          Get Started
        </Button>
      </Box>
      <Card sx={{ minWidth: 600, height: 400 }}>
        <CardMedia image={taskBoardImg} sx={{ width: '100%', height: '100%' }} />
      </Card>
    </Box>
  );
};
export const SectionTwo = () => {
  return (
    <Box
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.4 }}
      component={motion.div}
      sx={{ display: 'flex', justifyContent: 'space-between', columnGap: 20, marginTop: 40 }}
    >
      <Card
        sx={{ width: 200, height: 200 }}
        custom={1}
        component={motion.div}
        variants={cardsAnimation}
      >
        <CardMedia image={devImgOne} sx={{ width: '100%', height: '100%' }} />
      </Card>

      <Card
        sx={{ width: 200, height: 200 }}
        custom={2}
        component={motion.div}
        variants={cardsAnimation}
      >
        <CardMedia image={devImgTwo} sx={{ width: '100%', height: '100%' }} />
      </Card>

      <Card
        sx={{ width: 200, height: 200 }}
        custom={3}
        component={motion.div}
        variants={cardsAnimation}
      >
        <CardMedia image={devImgThree} sx={{ width: '100%', height: '100%' }} />
      </Card>
    </Box>
  );
};
