import { Typography } from '@mui/material';

import { UserContext } from 'components/RequireAuth';

import React, { useContext } from 'react';

import { useParams } from 'react-router-dom';
import { useGetUser } from 'hooks/userHooks/useGetUser';

import CurrentAccount from 'components/CurrentAccount';
import AnotherAccount from 'components/AnotherAccount';

const AccountPage = () => {
  const { user } = useContext(UserContext);

  const { accountId } = useParams();
  const { userFromFirestore } = useGetUser(accountId!);

  if (accountId === user.id) {
    return <CurrentAccount />;
  }

  if (userFromFirestore) {
    return <AnotherAccount anotherUser={userFromFirestore}></AnotherAccount>;
  } else {
    return <Typography>There is no such user</Typography>;
  }
};

export default AccountPage;
