import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';

const sectionAnimation = {
  hidden: {
    x: -200,
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

export const SectionTwo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '80%',
        columnGap: '20px',
        marginLeft: 'auto',
      }}
    >
      <Box
        viewport={{ amount: 0.2, once: true }}
        initial="hidden"
        whileInView="visible"
        component={motion.div}
        sx={{
          width: '350px',
          borderRadius: '50% 25% 25% 50% / 0% 50% 50% 0%',
          borderTopLeftRadius: '30px',
          borderBottomLeftRadius: '30px',
          textAlign: 'center',
          padding: '15px 30px 15px 15px',
          bgcolor: 'primary.main',
        }}
        variants={sectionAnimation}
      >
        <Typography variant="h2" color="#FFF">
          What are the <br /> key features <br /> of a <br />
          PRO-Boards app?
        </Typography>
      </Box>
      <Box
        viewport={{ amount: 0.8, once: true }}
        initial="hidden"
        whileInView="visible"
        component={motion.div}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
          flexGrow: '1',
        }}
      >
        <Box
          component={motion.div}
          variants={elementAnimation}
          custom={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '33.3%',
            bgcolor: 'primary.main',
            maxWidth: '60%',
            borderRadius: '20px',
          }}
        >
          <Typography sx={{ textAlign: 'center' }} variant="h3" color="#FFF">
            Easily addition and editing items
          </Typography>
        </Box>
        <Box
          component={motion.div}
          variants={elementAnimation}
          custom={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '33.3%',
            bgcolor: 'primary.main',
            maxWidth: '60%',
            borderRadius: '20px',
          }}
        >
          <Typography sx={{ textAlign: 'center' }} variant="h3" color="#FFF">
            Task labels and tags for better organization
          </Typography>
        </Box>
        <Box
          component={motion.div}
          variants={elementAnimation}
          custom={9}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '33.3%',
            bgcolor: 'primary.main',
            maxWidth: '60%',
            borderRadius: '20px',
          }}
        >
          <Typography sx={{ textAlign: 'center' }} variant="h3" color="#FFF">
            Customizable themes and community themes library
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
