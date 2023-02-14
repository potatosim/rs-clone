import React, { createContext, useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppRoutes } from 'enum/AppRoutes';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { IUserItem } from 'types/User';
import { doc, getDoc } from 'firebase/firestore';
import { Collections } from 'enum/Collection';

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
  const [userRecord, setUserRecord] = useState<IUserItem | null>(null);

  const getUserRecord = async () => {
    if (user) {
      const record = await getDoc(doc(firestore, Collections.Users, user.uid));

      setUserRecord({ ...record.data(), id: user.uid } as IUserItem);
    }
  };

  useEffect(() => {
    if (!user && !loading) {
      navigate(AppRoutes.LoginPage);
    } else {
      getUserRecord();
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
