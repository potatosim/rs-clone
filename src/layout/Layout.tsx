import { Box } from '@mui/material';
import Footer from 'layout/Footer';
import Header from 'layout/Header';
import Main from 'layout/Main';
import { Outlet } from 'react-router-dom';
import React from 'react';
import styled from '@emotion/styled';
import CssBaseline from '@mui/material/CssBaseline';

const LayoutWrapper = styled(Box)(() => ({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  overflow: 'hidden',
}));

const TopContentWrapper = styled(Box)`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <CssBaseline />
      <TopContentWrapper>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </TopContentWrapper>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
