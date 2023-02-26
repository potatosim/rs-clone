import { UserContext } from 'components/RequireAuth';
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUser } from 'hooks/userHooks/useGetUser';

import CurrentAccount from 'components/CurrentAccount';
import AnotherAccount from 'components/AnotherAccount';
import NotFoundElement from 'components/NotFoundElement';
import { AppRoutes } from 'enum/AppRoutes';
import { CircularProgress } from '@mui/material';

const AccountPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const { accountId } = useParams();
  const { userFromFirestore, userLoading } = useGetUser(accountId!);

  if (userLoading) {
    return <CircularProgress />;
  }

  if (accountId === user.id) {
    return <CurrentAccount />;
  }

  if (userFromFirestore) {
    return <AnotherAccount anotherUser={userFromFirestore} />;
  }

  return (
    <NotFoundElement
      buttonText="to my account"
      notification="Such user doesn't exist"
      onClick={() => {
        navigate(AppRoutes.AccountPage.replace(':accountId', user?.id || ''));
      }}
    />
  );
};

export default AccountPage;
