import { motion } from 'framer-motion';
import { Box, Card, Typography, CardContent } from '@mui/material';
import { TeamOne, TeamTwo, TeamThree } from 'static';

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

export const SectionThree = () => {
  return (
    <Box
      sx={{ marginTop: 20 }}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      component={motion.div}
    >
      <Typography
        custom={1}
        component={motion.div}
        variants={cardsAnimation}
        color="primary"
        variant="h3"
      >
        Created by the best team on the web:
      </Typography>
      <Box
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.5 }}
        component={motion.div}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          columnGap: 10,
          marginTop: 5,
        }}
      >
        <Card
          sx={{ width: 200, height: 'min-content' }}
          custom={3}
          component={motion.div}
          variants={cardsAnimation}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Hanna Yemelyanova
            </Typography>
          </CardContent>

          <TeamOne />
        </Card>
        <Card
          sx={{ width: 200, height: 'min-content' }}
          custom={2}
          component={motion.div}
          variants={cardsAnimation}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Knyazev Leontiy
            </Typography>
          </CardContent>

          <TeamTwo />
        </Card>

        <Card
          sx={{ width: 200, height: 'min-content' }}
          custom={4}
          component={motion.div}
          variants={cardsAnimation}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Maksim <br /> Gorin
            </Typography>
          </CardContent>

          <TeamThree />
        </Card>
      </Box>
    </Box>
  );
};
