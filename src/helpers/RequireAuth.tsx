import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppRoutes } from 'enum/AppRoutes';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

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

export default RequireAuth;
