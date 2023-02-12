import React from 'react';
import NotFoundPage from 'pages/NotFoundPage';
import BoardPage from 'pages/BoardPage';
import BoardsPage from 'pages/BoardsPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import Layout from 'layout/Layout';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import AccountPage from 'pages/AccountPage';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { Outlet } from 'react-router-dom';

// import RequireAuth from 'helpers/RequireAuth';

const RequireAuth = () => {
  const navigate = useNavigate();
  const { auth } = React.useContext(FirebaseContext);
  const [user, loading] = useAuthState(auth);
  React.useEffect(() => {
    if (!user) {
      navigate(AppRoutes.LoginPage);
    }
  }, [user]);

  if (loading) {
    return <CircularProgress />;
  }
  return <Outlet />;
};

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
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
