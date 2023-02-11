import NotFoundPage from 'pages/NotFoundPage';
import BoardPage from 'pages/BoardPage';
import BoardsPage from 'pages/BoardsPage';
import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import Layout from 'layout/Layout';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import AccountPage from 'pages/AccountPage';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { useAuthState } from 'react-firebase-hooks/auth';

const AppRouter = () => {
  const navigate = useNavigate();
  const auth = React.useContext(FirebaseContext).auth;
  const [user, loading, error] = useAuthState(auth);

  return user ? (
    <Routes>
      <Route path={AppRoutes.Home} element={<Layout />}>
        <Route index element={<div>Hello, World</div>} />
        <Route path={AppRoutes.NotFoundPage} element={<NotFoundPage />} />
        <Route path={AppRoutes.Boards} element={<BoardsPage />} />
        <Route path={AppRoutes.Board} element={<BoardPage />} />
        <Route path={AppRoutes.LoginPage} element={<LoginPage />} />
        <Route path={AppRoutes.SignUpPage} element={<SignUpPage />} />
        <Route path={AppRoutes.AccountPage} element={<AccountPage />} />
      </Route>
    </Routes>
  ) : (
    <Routes>
      <Route path={AppRoutes.Home} element={<Layout />}>
        <Route index element={<div>Hello, World</div>} />
        <Route path={AppRoutes.NotFoundPage} element={<NotFoundPage />} />
        <Route path={AppRoutes.LoginPage} element={<LoginPage />} />
        <Route path={AppRoutes.SignUpPage} element={<SignUpPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
