import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { HistoryItem } from 'types/HistoryItem';

interface HistoryProps {
  history: HistoryItem[];
}

interface HistoryItemElProps {
  title: React.ReactElement;
  date: string;
}

const HistoryItemEl = ({ title, date }: HistoryItemElProps) => {
  return (
    <Box sx={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}>
      <Box
        sx={{ borderRadius: '50%', overflow: 'hidden', bgcolor: 'red', width: 36, height: 36 }}
      />
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
              <strong>{historyItem.initiator}</strong> just create a task
            </>
          }
          date={historyItem.time}
        />
      );
    case 'statusChanged':
      return (
        <HistoryItemEl
          title={
            <>
              <strong>{historyItem.initiator}</strong> changed task status from{' '}
              <strong>{historyItem.from}</strong> to
              <strong>{historyItem.to}</strong>
            </>
          }
          date={historyItem.time}
        />
      );
    case 'titleChanged':
      return (
        <HistoryItemEl
          title={
            <>
              <strong>{historyItem.initiator}</strong> changed task title from{' '}
              <strong>{historyItem.from}</strong> to <strong>{historyItem.to}</strong>
            </>
          }
          date={historyItem.time}
        />
      );
    case 'priorityChanged':
      return (
        <HistoryItemEl
          title={
            <>
              <strong>{historyItem.initiator}</strong> changed task priority from
              <strong> {historyItem.from} </strong>to<strong> {historyItem.to} </strong>
            </>
          }
          date={historyItem.time}
        />
      );
    case 'sizeChanged':
      return (
        <HistoryItemEl
          title={
            <>
              <strong>{historyItem.initiator}</strong> changed task size from{' '}
              <strong>{historyItem.from}</strong> to <strong>{historyItem.to}</strong>
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
    <Box sx={{ display: 'flex', rowGap: '0.5rem', flexDirection: 'column', mt: 2 }}>
      {history.reverse().map((historyItem) => (
        <Box
          key={historyItem.time + historyItem.action}
          display="flex"
          justifyContent="space-between"
        >
          {getStringByAction(historyItem)}
        </Box>
      ))}
    </Box>
  );
};

export default History;
