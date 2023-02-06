import { Modal, CircularProgress } from '@mui/material';
import React from 'react';

interface ModalLoaderProps {
  isOpen: boolean;
}

const ModalLoader = ({ isOpen }: ModalLoaderProps) => {
  return (
    <Modal open={isOpen} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress size={100} sx={{ outline: 'none' }} />
    </Modal>
  );
};

export default ModalLoader;
