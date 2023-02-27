import { Box, Button, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import ghostImg from 'static/images/ghost.png';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import {
  ButtonTranslationKeys,
  TranslationNameSpaces,
  TypographyTranslationKeys,
} from 'enum/Translations';

const HoverEffect = keyframes`
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(15px);
  }
`;

const ContentWrapper = styled(Box)(() => ({
  flex: '1 1 auto',
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const MessageWrapper = styled(Box)(() => ({
  padding: '2rem',
}));
const NotFoundPage = () => {
  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Typography,
  ]);

  return (
    <ContentWrapper>
      <MessageWrapper>
        <Typography>
          {translate(TypographyTranslationKeys.Error404, {
            ns: TranslationNameSpaces.Typography,
          })}
        </Typography>
        <Typography variant="h6">
          {translate(TypographyTranslationKeys.PageNotFound, {
            ns: TranslationNameSpaces.Typography,
          })}
        </Typography>
        <Button sx={{ marginTop: 5 }} variant="contained" component={Link} to="/">
          {translate(ButtonTranslationKeys.GoHome)}
        </Button>
      </MessageWrapper>
      <Box
        sx={{ animation: `${HoverEffect} 2s ease-in-out infinite alternate`, maxWidth: '400px' }}
      >
        <img style={{ width: '100%' }} src={ghostImg} />
      </Box>
    </ContentWrapper>
  );
};

export default NotFoundPage;
