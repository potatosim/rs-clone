import NotFoundPage from 'pages/NotFoundPage/notFoundPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Hello, World</div>} />
      <Route path={AppRoutes.NotFoundPage} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
