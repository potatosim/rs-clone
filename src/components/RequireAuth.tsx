import React, { createContext, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppRoutes } from 'enum/AppRoutes';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { IUserItem } from 'types/User';
import { doc } from 'firebase/firestore';
import { Collections } from 'enum/Collection';
import { usersConverter } from 'helpers/converters';
import { useDocumentData } from 'react-firebase-hooks/firestore';

interface IUserContext {
  user: IUserItem;
}

export const UserContext = createContext<IUserContext>({
  user: {} as IUserItem,
});

const RequireAuth = () => {
  const navigate = useNavigate();
  const { auth, firestore } = useContext(FirebaseContext);
  const [user, loading] = useAuthState(auth);
  const [userRecord] = useDocumentData<IUserItem>(
    doc(firestore, Collections.Users, user?.uid || 'userId').withConverter(usersConverter),
  );

  useEffect(() => {
    if (!user && !loading) {
      navigate(AppRoutes.LoginPage);
    }
  }, [user, loading]);

  if (loading || !userRecord) {
    return <CircularProgress />;
  }

  return (
    <UserContext.Provider
      value={{
        user: userRecord,
      }}
    >
      <Outlet />
    </UserContext.Provider>
  );
};

export default RequireAuth;
