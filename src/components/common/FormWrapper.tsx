import styled from '@emotion/styled';
import { Paper } from '@mui/material';

export const FormWrapper = styled(Paper)`
  display: flex;
  width: 420px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  row-gap: 1rem;

  @media (max-width: 768px) {
    width: 350px;
  }
`;
