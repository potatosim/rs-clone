import styled from '@emotion/styled';
import { Modal } from '@mui/material';

export const ModalWrapper = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 0rem;
  }
`;
