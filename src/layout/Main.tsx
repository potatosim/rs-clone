import styled from '@emotion/styled';
import React, { FC } from 'react';
import ComponentWithChildren from 'types/ComponentWithChildren';

const StyledMain = styled('main')(() => ({
  flex: '1 1 auto',
  paddingTop: '64px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

const Main: FC<ComponentWithChildren> = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default Main;
