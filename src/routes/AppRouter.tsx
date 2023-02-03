import React from 'react';
import NotFoundPage from 'pages/NotFoundPage';
import BoardPage from 'pages/BoardPage';
import BoardsPage from 'pages/BoardsPage';
import { AppRoutes } from 'enum/AppRoutes';
import TestPage from 'pages/UserThemes';
import { Route, Routes } from 'react-router-dom';
import Layout from 'layout/Layout';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import AccountPage from 'pages/AccountPage';
import RequireAuth from 'components/RequireAuth';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={AppRoutes.Home} element={<Layout />}>
        <Route index element={<div>Hello, World</div>} />
        <Route path={AppRoutes.NotFoundPage} element={<NotFoundPage />} />
        <Route path={AppRoutes.SignUpPage} element={<SignUpPage />} />
        <Route path={AppRoutes.LoginPage} element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path={AppRoutes.Boards} element={<BoardsPage />} />
          <Route path={AppRoutes.Board} element={<BoardPage />} />
          <Route path={AppRoutes.AccountPage} element={<AccountPage />} />
          <Route path={AppRoutes.UserThemes} element={<TestPage />} />
          <Route path={AppRoutes.AllThemes} element={<TestPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
