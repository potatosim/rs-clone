import { Box } from '@mui/material';
import React, { FC } from 'react';

interface IconWrapperProps {
  children: React.ReactNode;
}

const IconWrapper: FC<IconWrapperProps> = ({ children }) => {
  return <Box sx={{}}>{children}</Box>;
};

export default IconWrapper;
