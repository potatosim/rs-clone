import { Avatar, Box, styled, Typography } from '@mui/material';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { AppRoutes } from 'enum/AppRoutes';
import { Collections } from 'enum/Collection';
import { doc } from 'firebase/firestore';
import { usersConverter } from 'helpers/converters';
import React, { FC, useContext } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import { HistoryItem } from 'types/HistoryItem';
import { IUserItem } from 'types/User';

interface HistoryProps {
  history: HistoryItem[];
}

export const HistoryWrapper = styled(Box)`
  padding: 1rem;
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
  margin-top: 2;
  max-height: 300px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const HistoryItemEl = (historyItem: HistoryItem) => {
  const { firestore } = useContext(FirebaseContext);
  const [user, loading] = useDocumentData<IUserItem>(
    doc(firestore, Collections.Users, historyItem.initiator).withConverter(usersConverter),
  );
  const navigate = useNavigate();

  if (!user || loading) {
    return null;
  }

  const { avatar } = user;

  const title = getTitleByAction(historyItem, user);

  return (
    <Box sx={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}>
      <Avatar
        onClick={() => {
          navigate(AppRoutes.AccountPage.replace(':accountId', historyItem.initiator));
        }}
        sx={{ cursor: 'pointer' }}
        src={avatar}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography>{title}</Typography>
        <Typography variant="caption">{historyItem.time.split(',').reverse().join(',')}</Typography>
      </Box>
    </Box>
  );
};

const getTitleByAction = (historyItem: HistoryItem, user: IUserItem) => {
  switch (historyItem.action) {
    case 'created':
      return (
        <>
          <strong>{user.login}</strong> created a task
        </>
      );
    case 'statusChanged':
      return (
        <>
          <strong>{user.login}</strong> changed task status from <strong>{historyItem.from}</strong>{' '}
          to <strong>{historyItem.to}</strong>
        </>
      );
    case 'titleChanged':
      return (
        <>
          <strong>{user.login}</strong> changed task title from <strong>{historyItem.from}</strong>{' '}
          to <strong>{historyItem.to}</strong>
        </>
      );
    case 'descriptionChanged':
      return (
        <>
          <strong>{user.login}</strong> changed task description
        </>
      );
    case 'priorityChanged':
      return (
        <>
          <strong>{user.login}</strong> changed task priority from{' '}
          <strong> {historyItem.from} </strong>to<strong> {historyItem.to} </strong>
        </>
      );
    case 'sizeChanged':
      return (
        <>
          <strong>{user.login}</strong> changed task size from <strong>{historyItem.from}</strong>{' '}
          to <strong>{historyItem.to}</strong>
        </>
      );
    case 'assigneeChanged':
      return (
        <>
          <strong>{user.login}</strong> changed the assignee to <strong>{historyItem.to}</strong>
        </>
      );
    default:
      return '' as never;
  }
};

const History: FC<HistoryProps> = ({ history }) => {
  return (
    <HistoryWrapper>
      {history.reverse().map((historyItem) => (
        <Box
          key={historyItem.time + historyItem.action}
          display="flex"
          justifyContent="space-between"
        >
          <HistoryItemEl {...historyItem} />
        </Box>
      ))}
    </HistoryWrapper>
  );
};

export default History;
