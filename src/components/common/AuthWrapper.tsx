import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const AuthWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
  width: '350px',

  // boxShadow: '5px 5px 5px 5px gray',
  borderRadius: '15px',
  padding: '10px 20px',
}));
