import { motion } from 'framer-motion';
import { Box, Card, Typography, CardContent } from '@mui/material';
import { TeamOne, TeamTwo, TeamThree } from 'static';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
  const myColor = theme.palette.primary.main;

  return (
    <Box
      sx={{
        marginTop: {
          lg: 20,
          sm: 10,
          xs: 5,
        },
        marginBottom: 2,
      }}
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
        sx={{
          fontSize: {
            lg: '3rem',
            sm: '2rem',
            xs: '1.5rem',
          },
          textAlign: 'center',
        }}
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
          marginTop: 5,
        }}
      >
        <Card
          sx={{
            width: {
              lg: 200,
              xs: 120,
            },
            height: 'min-content',
          }}
          custom={3}
          component={motion.div}
          variants={cardsAnimation}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontSize: {
                  lg: '1.5rem',
                  md: '1.5rem',
                  sm: '1rem',
                  xs: '1rem',
                },
              }}
            >
              Hanna Yemelyanova
            </Typography>
          </CardContent>

          <TeamTwo fill={myColor} />
        </Card>
        <Card
          sx={{
            width: {
              lg: 200,
              xs: 120,
            },
            height: 'min-content',
          }}
          custom={2}
          component={motion.div}
          variants={cardsAnimation}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontSize: {
                  lg: '1.5rem',
                  md: '1.5rem',
                  sm: '1rem',
                  xs: '1rem',
                },
              }}
            >
              Knyazev Leontiy
            </Typography>
          </CardContent>

          <TeamOne fill={myColor} />
        </Card>

        <Card
          sx={{
            width: {
              lg: 200,
              xs: 120,
            },
            height: 'min-content',
          }}
          custom={4}
          component={motion.div}
          variants={cardsAnimation}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontSize: {
                  lg: '1.5rem',
                  md: '1.5rem',
                  sm: '1rem',
                  xs: '1rem',
                },
              }}
            >
              Maksim <br /> Gorin
            </Typography>
          </CardContent>

          <TeamThree fill={myColor} />
        </Card>
      </Box>
    </Box>
  );
};
