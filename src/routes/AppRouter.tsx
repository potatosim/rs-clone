import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import Layout from 'layout/Layout';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={AppRoutes.Home} element={<Layout />}>
        <Route index element={<div>Hello, World</div>} />
        <Route path={AppRoutes.NotFoundPage} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
