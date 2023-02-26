import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { Grid, Typography } from '@mui/material';
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
    <Grid
      container
      spacing={10}
      initial="hidden"
      whileInView="visible"
      component={motion.div}
      sx={{
        width: { lg: '80%', xs: '100%' },
        marginTop: {
          lg: 10,
          sm: 5,
          xs: 0,
        },
        paddingLeft: 0,
        paddingBottom: {
          lg: 40,
          md: 25,
          sm: 15,
          xs: 5,
        },
        justifyContent: 'center',
      }}
    >
      <Grid item xs={10} sm={6} xl={6}>
        <Typography
          variants={sectionAnimation}
          custom={1}
          component={motion.div}
          variant="h2"
          color="primary"
          sx={{
            fontSize: {
              lg: 50,
              md: 30,
              sm: 15,
              xs: 25,
            },
          }}
        >
          Meet the best way to boost your productivity with easy and powerful tool
        </Typography>
        <Button
          component={motion.div}
          variants={sectionAnimation}
          custom={5}
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
      </Grid>
      <Grid item xs={10} sm={6} xl={6}>
        <img src={taskBoardImg} style={{ width: '100%' }} />
      </Grid>
    </Grid>
  );
};
