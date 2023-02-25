import { Box, Collapse } from '@mui/material';
import React, { FC, ReactElement, ReactNode } from 'react';

interface CustomCollapseProps {
  isOpen: boolean;
  children: ReactElement | ReactNode;
}

const CustomCollapse: FC<CustomCollapseProps> = ({ isOpen, children }) => {
  return (
    <Collapse orientation="horizontal" in={isOpen}>
      <Box
        sx={{
          maxHeight: 600,
          overflowY: 'scroll',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 1,
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
      </Box>
    </Collapse>
  );
};

export default CustomCollapse;
