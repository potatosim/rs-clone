import { Avatar, Box, styled, Typography } from '@mui/material';
import React, { FC } from 'react';
import { HistoryItem } from 'types/HistoryItem';

interface HistoryProps {
  history: HistoryItem[];
}

interface HistoryItemElProps {
  title: React.ReactElement;
  date: string;
  avatar: string;
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

export const HistoryItemEl = ({ title, date, avatar }: HistoryItemElProps) => {
  return (
    <Box sx={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}>
      <Avatar src={avatar} />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography>{title}</Typography>
        <Typography variant="caption">{date.split(',').reverse().join(',')}</Typography>
      </Box>
    </Box>
  );
};

const getStringByAction = (historyItem: HistoryItem) => {
  switch (historyItem.action) {
    case 'created':
      return (
        <HistoryItemEl
          title={
            <>
              <strong>{historyItem.initiator.login}</strong> created a task
            </>
          }
          date={historyItem.time}
          avatar={historyItem.initiator.avatar}
        />
      );
    case 'statusChanged':
      return (
        <HistoryItemEl
          avatar={historyItem.initiator.avatar}
          title={
            <>
              <strong>{historyItem.initiator.login}</strong> changed task status from{' '}
              <strong>{historyItem.from}</strong> to <strong>{historyItem.to}</strong>
            </>
          }
          date={historyItem.time}
        />
      );
    case 'titleChanged':
      return (
        <HistoryItemEl
          avatar={historyItem.initiator.avatar}
          title={
            <>
              <strong>{historyItem.initiator.login}</strong> changed task title from{' '}
              <strong>{historyItem.from}</strong> to <strong>{historyItem.to}</strong>
            </>
          }
          date={historyItem.time}
        />
      );
    case 'descriptionChanged':
      return (
        <HistoryItemEl
          avatar={historyItem.initiator.avatar}
          title={
            <>
              <strong>{historyItem.initiator.login}</strong> changed task description
            </>
          }
          date={historyItem.time}
        />
      );
    case 'priorityChanged':
      return (
        <HistoryItemEl
          avatar={historyItem.initiator.avatar}
          title={
            <>
              <strong>{historyItem.initiator.login}</strong> changed task priority from{' '}
              <strong> {historyItem.from} </strong>to<strong> {historyItem.to} </strong>
            </>
          }
          date={historyItem.time}
        />
      );
    case 'sizeChanged':
      return (
        <HistoryItemEl
          avatar={historyItem.initiator.avatar}
          title={
            <>
              <strong>{historyItem.initiator.login}</strong> changed task size from{' '}
              <strong>{historyItem.from}</strong> to <strong>{historyItem.to}</strong>
            </>
          }
          date={historyItem.time}
        />
      );
    case 'assigneeChanged':
      return (
        <HistoryItemEl
          avatar={historyItem.initiator.avatar}
          title={
            <>
              <strong>{historyItem.initiator.login}</strong> changed the assignee to{' '}
              <strong>{historyItem.to}</strong>
            </>
          }
          date={historyItem.time}
        />
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
          {getStringByAction(historyItem)}
        </Box>
      ))}
    </HistoryWrapper>
  );
};

export default History;
