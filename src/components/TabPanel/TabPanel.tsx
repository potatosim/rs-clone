import { Box } from '@mui/material';
import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      <Box>{children}</Box>
    </div>
  );
};

export default TabPanel;
