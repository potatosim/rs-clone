import { Box, Collapse, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, ReactElement, ReactNode } from 'react';

interface CustomCollapseProps {
  isOpen: boolean;
  children: ReactElement | ReactNode;
  orientation?: 'vertical' | 'horizontal';
}

const CustomCollapse: FC<CustomCollapseProps> = ({
  isOpen,
  children,
  orientation = 'horizontal',
}) => {
  const theme = useTheme();
  const mediaQuery = useMediaQuery(theme.breakpoints.down(768));
  return (
    <Collapse orientation={orientation} in={isOpen}>
      <Box
        sx={{
          maxHeight: 600,
          overflow: 'scroll',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: mediaQuery ? 'row' : 'column',
            flexWrap: 'wrap',
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
