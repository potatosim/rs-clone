import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import taskBoardImg from 'static/images/taskBoardMain.png';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';

const sectionAnimation = {
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

export const SectionOne = () => {
  const { auth } = useContext(FirebaseContext);
  const [user] = useAuthState(auth);

  return (
    <Box
      initial="hidden"
      whileInView="visible"
      component={motion.div}
      sx={{ display: 'flex', columnGap: 20, width: '80%' }}
    >
      <Box>
        <Typography
          variants={sectionAnimation}
          custom={1}
          component={motion.div}
          variant="h2"
          color="primary"
        >
          Meet the best way to boost your productivity with easy and powerful tool
        </Typography>
        <Button
          component={motion.div}
          variants={sectionAnimation}
          custom={2}
          variant="contained"
          sx={{ padding: '10px 20px', marginTop: '20px' }}
        >
          <Typography
            color="inherit"
            sx={{ textDecoration: 'none' }}
            component={Link}
            to={user ? AppRoutes.Boards : AppRoutes.LoginPage}
          >
            Get Started
          </Typography>
        </Button>
      </Box>
      <Card sx={{ minWidth: 600, height: 400 }}>
        <CardMedia image={taskBoardImg} sx={{ width: '100%', height: '100%' }} />
      </Card>
    </Box>
  );
};
