import { motion } from 'framer-motion';
import { Box, Card, Typography, CardContent } from '@mui/material';
import { TeamOne, TeamTwo, TeamThree } from 'static';
import { useTranslation } from 'react-i18next';
import { TranslationNameSpaces, TypographyTranslationKeys } from 'enum/Translations';
import { useContrastText } from 'hooks/useContrastText';

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

const DeveloperCard = ({
  firstName,
  lastName,
  delay,
  icon,
}: {
  icon: React.ReactElement | React.ReactNode;
  delay: number;
  firstName: string;
  lastName: string;
}) => {
  return (
    <Card
      sx={{
        width: {
          lg: 200,
          md: 170,
          sm: 150,
          xs: '33%',
        },
        height: 'min-content',
      }}
      custom={delay}
      component={motion.div}
      variants={cardsAnimation}
    >
      <CardContent sx={{ paddingLeft: 1 }}>
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
          {firstName}
          <br />
          {lastName}
        </Typography>
      </CardContent>

      {icon}
    </Card>
  );
};

export const SectionThree = () => {
  const { t: translate } = useTranslation(TranslationNameSpaces.Typography);
  const { primaryColor } = useContrastText();
  return (
    <Box
      sx={{
        marginTop: {
          lg: 20,
          md: 10,
          sm: 10,
          xs: 5,
        },
        marginBottom: 2,
        width: '80%',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2, once: true }}
      component={motion.div}
    >
      <Typography
        custom={1}
        component={motion.div}
        variants={cardsAnimation}
        sx={{
          fontSize: {
            lg: '3rem',
            sm: '2rem',
            xs: '1.5rem',
          },
          textAlign: 'center',
        }}
      >
        {translate(TypographyTranslationKeys.CreatedByTeam, {
          ns: TranslationNameSpaces.Typography,
        })}
      </Typography>
      <Box
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.5 }}
        component={motion.div}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 5,
          columnGap: {
            lg: '10%',
            xs: '2%',
          },
        }}
      >
        <DeveloperCard
          delay={3}
          firstName={translate(TypographyTranslationKeys.Hanna, {
            ns: TranslationNameSpaces.Typography,
          })}
          lastName={translate(TypographyTranslationKeys.Yemelyanova, {
            ns: TranslationNameSpaces.Typography,
          })}
          icon={<TeamTwo fill={primaryColor} />}
        />
        <DeveloperCard
          delay={2}
          firstName={translate(TypographyTranslationKeys.Leon, {
            ns: TranslationNameSpaces.Typography,
          })}
          lastName={translate(TypographyTranslationKeys.Knyazev, {
            ns: TranslationNameSpaces.Typography,
          })}
          icon={<TeamOne fill={primaryColor} />}
        />
        <DeveloperCard
          delay={4}
          firstName={translate(TypographyTranslationKeys.Maksim, {
            ns: TranslationNameSpaces.Typography,
          })}
          lastName={translate(TypographyTranslationKeys.Gorin, {
            ns: TranslationNameSpaces.Typography,
          })}
          icon={<TeamThree fill={primaryColor} />}
        />
      </Box>
    </Box>
  );
};
