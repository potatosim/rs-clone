import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { HistoryItem } from 'types/HistoryItem';

interface HistoryProps {
  history: HistoryItem[];
}

const getStringByAction = (historyItem: HistoryItem) => {
  switch (historyItem.action) {
    case 'created':
      return (
        <>
          <strong>{historyItem.initiator}</strong> just create a task
        </>
      );
    case 'statusChanged':
      return (
        <>
          <strong>{historyItem.initiator}</strong>
          changed task status from <strong>{historyItem.from}</strong> to
          <strong>{historyItem.to}</strong>
        </>
      );
    case 'titleChanged':
      return (
        <>
          <strong>{historyItem.initiator}</strong>
          changed task title from <strong>{historyItem.from}</strong> to{' '}
          <strong>{historyItem.to}</strong>
        </>
      );
    case 'priorityChanged':
      return (
        <>
          <strong>{historyItem.initiator}</strong>
          changed task priority from <strong>{historyItem.from}</strong> to{' '}
          <strong>{historyItem.to}</strong>
        </>
      );
    case 'sizeChanged':
      return (
        <>
          <strong>{historyItem.initiator}</strong>
          changed task size from <strong>{historyItem.from}</strong> to{' '}
          <strong>{historyItem.to}</strong>
        </>
      );
    default:
      return '' as never;
  }
};

const History: FC<HistoryProps> = ({ history }) => {
  return (
    <Box>
      {history.reverse().map((historyItem) => (
        <Box
          key={historyItem.time + historyItem.action}
          display="flex"
          justifyContent="space-between"
        >
          <Typography display="flex" columnGap="4px" key={historyItem.time + 1}>
            {getStringByAction(historyItem)}
          </Typography>
          <Typography key={historyItem.time + 2} variant="caption">
            {historyItem.time.split(',').reverse().join(',')}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default History;
