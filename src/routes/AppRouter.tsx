import NotFoundPage from 'pages/NotFoundPage';
import BoardPage from 'pages/BoardPage';
import BoardsPage from 'pages/BoardsPage';
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
        <Route path={AppRoutes.Boards} element={<BoardsPage />} />
        <Route path={AppRoutes.Board} element={<BoardPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
