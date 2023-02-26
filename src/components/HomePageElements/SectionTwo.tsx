import { motion } from 'framer-motion';
import { Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';

const featureQuestionAnimation = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const elementAnimation = {
  hidden: {
    x: 200,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

const FeatureDescription = styled(Typography)(() => ({
  textAlign: 'center',
  padding: '5%  10%',
}));

export const SectionTwo = () => {
  return (
    <Grid //main wrapper
      justifyContent="center"
      container
      direction="row"
      sx={{
        width: '80%',
        columnGap: '30px',
        rowGap: {
          xs: '30px',
        },
      }}
    >
      <Grid //question wrapper
        item
        lg={3}
        md={2}
        sm={2}
        xs={9}
        viewport={{ amount: 0.7, once: true }}
        initial="hidden"
        whileInView="visible"
        component={motion.div}
        sx={{
          aspectRatio: '1 / 1 ',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: {
            lg: '50% 25% 25% 50% / 0% 50% 50% 0%',
            sm: '50% 25% 25% 50% / 0% 50% 50% 0%',
            xs: '50%',
          },
          borderTopLeftRadius: {
            lg: '30px',
            sm: '30px',
          },
          borderBottomLeftRadius: {
            lg: '30px',
            sm: '30px',
          },
          textAlign: 'center',
          bgcolor: 'primary.main',
        }}
        variants={featureQuestionAnimation}
      >
        <Typography
          variant="h2"
          color="#FFF"
          sx={{
            fontSize: {
              lg: 50,
              md: 30,
              sm: 15,
              xs: 25,
            },
            padding: {
              lg: '10% 15%',
              sm: '15% 20%',
            },
          }}
        >
          What are the <br /> key features <br /> of a <br />
          PRO-Boards app?
        </Typography>
      </Grid>
      <Grid //features wrapper
        item
        lg={8}
        sm={7}
        xs={11}
        viewport={{ amount: 0.8, once: true }}
        initial="hidden"
        whileInView="visible"
        component={motion.div}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
        }}
      >
        <Grid //first feature
          item
          component={motion.div}
          variants={elementAnimation}
          custom={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '33.3%',
            bgcolor: 'primary.main',
            borderRadius: '20px',
          }}
        >
          <FeatureDescription
            variant="h3"
            // color="#FFF"
            sx={{
              fontSize: {
                lg: 50,
                md: 30,
                sm: 15,
                xs: 25,
              },
            }}
          >
            Easily addition and editing items
          </FeatureDescription>
        </Grid>
        <Grid //second feature
          item
          component={motion.div}
          variants={elementAnimation}
          custom={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '33.3%',
            bgcolor: 'primary.main',
            borderRadius: '20px',
          }}
        >
          <FeatureDescription
            variant="h3"
            // color="#FFF"
            sx={{
              fontSize: {
                lg: 50,
                md: 30,
                sm: 15,
                xs: 25,
              },
            }}
          >
            Task labels and tags for better organization
          </FeatureDescription>
        </Grid>
        <Grid //third feature
          item
          component={motion.div}
          variants={elementAnimation}
          custom={9}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '33.3%',
            bgcolor: 'primary.main',
            borderRadius: '20px',
          }}
        >
          <FeatureDescription
            variant="h3"
            // color="#FFF"
            sx={{
              fontSize: {
                lg: 50,
                md: 30,
                sm: 15,
                xs: 25,
              },
            }}
          >
            Customizable themes and community themes library
          </FeatureDescription>
        </Grid>
      </Grid>
    </Grid>
  );
};
