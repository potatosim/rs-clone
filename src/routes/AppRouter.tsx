import React from 'react';
import NotFoundPage from 'pages/NotFoundPage';
import BoardPage from 'pages/BoardPage';
import BoardsPage from 'pages/BoardsPage';
import { AppRoutes } from 'enum/AppRoutes';
import AllThemes from 'pages/CommunityThemes/CommunityThemes';
import UserThemes from 'pages/UserThemes/UserThemes';
import { Route, Routes } from 'react-router-dom';
import Layout from 'layout/Layout';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import AccountPage from 'pages/AccountPage';
import RequireAuth from 'components/RequireAuth';
import Home from 'pages/HomePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={AppRoutes.Home} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={AppRoutes.NotFoundPage} element={<NotFoundPage />} />
        <Route path={AppRoutes.SignUpPage} element={<SignUpPage />} />
        <Route path={AppRoutes.LoginPage} element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path={AppRoutes.Boards} element={<BoardsPage />} />
          <Route path={AppRoutes.Board} element={<BoardPage />} />
          <Route path={AppRoutes.AccountPage} element={<AccountPage />} />
          <Route path={AppRoutes.UserThemes} element={<UserThemes />} />
          <Route path={AppRoutes.AllThemes} element={<AllThemes />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
