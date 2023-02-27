import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const BoardCardHeader = styled(Box)<{ justify?: 'between' | 'start'; padding?: string }>`
  max-width: 100%;
  padding: ${({ padding }) => padding || ''};
  display: flex;
  justify-content: ${({ justify }) => (justify === 'start' ? 'flex-start' : 'space-between')};
  align-items: center;
  column-gap: 0.5rem;
  background-color: transparent;
`;
