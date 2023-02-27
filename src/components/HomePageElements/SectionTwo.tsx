import { Grid, Typography } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import { TranslationNameSpaces, TypographyTranslationKeys } from 'enum/Translations';

import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useContrastText } from 'hooks/useContrastText';
import { useTranslation } from 'react-i18next';

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
  padding: '2rem',
}));

const FeatureWrapper = ({
  delay,
  children,
}: {
  delay: number;
  children: ReactNode | ReactElement;
}) => {
  return (
    <Grid
      item
      component={motion.div}
      variants={elementAnimation}
      custom={delay}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.main',
        borderRadius: {
          sm: '0 20px 20px 0',
          xs: '0',
        },
      }}
    >
      {children}
    </Grid>
  );
};

const Description = ({ description }: { description: string }) => {
  const { getContrastColor } = useContrastText();

  return (
    <FeatureDescription
      sx={{
        fontSize: {
          lg: 50,
          md: 30,
          sm: 15,
          xs: 25,
        },
        color: getContrastColor(),
      }}
    >
      {description}
    </FeatureDescription>
  );
};

export const SectionTwo = () => {
  const { getContrastColor } = useContrastText();

  const { t: translate } = useTranslation(TranslationNameSpaces.Typography);

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
            sm: '0',
            xs: '50%',
          },
          borderTopLeftRadius: {
            sm: '20px',
          },
          borderBottomLeftRadius: {
            sm: '20px',
          },
          textAlign: 'center',
          bgcolor: 'primary.main',
          p: 4,
        }}
        variants={featureQuestionAnimation}
      >
        <Typography
          sx={{
            fontSize: {
              lg: 50,
              md: 30,
              sm: 15,
              xs: 25,
            },
            color: getContrastColor(),
          }}
        >
          {translate(TypographyTranslationKeys.SectionTwoText, {
            ns: TranslationNameSpaces.Typography,
          })}
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
        <FeatureWrapper delay={3}>
          <Description
            description={translate(TypographyTranslationKeys.SectionTwoAdditionItems, {
              ns: TranslationNameSpaces.Typography,
            })}
          />
        </FeatureWrapper>
        <FeatureWrapper delay={6}>
          <Description
            description={translate(TypographyTranslationKeys.SectionTwoTask, {
              ns: TranslationNameSpaces.Typography,
            })}
          />
        </FeatureWrapper>
        <FeatureWrapper delay={9}>
          <Description
            description={translate(TypographyTranslationKeys.SectionTwoThemes, {
              ns: TranslationNameSpaces.Typography,
            })}
          />
        </FeatureWrapper>
      </Grid>
    </Grid>
  );
};
