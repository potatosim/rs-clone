import { CircularProgress } from '@mui/material';
import React from 'react';
import { ModalWrapper } from './ModalWrapper';

interface ModalLoaderProps {
  isOpen: boolean;
}

const ModalLoader = ({ isOpen }: ModalLoaderProps) => {
  return (
    <ModalWrapper open={isOpen}>
      <CircularProgress size={100} sx={{ outline: 'none' }} />
    </ModalWrapper>
  );
};

export default ModalLoader;
