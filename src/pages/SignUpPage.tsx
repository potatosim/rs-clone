import * as React from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Box, TextField, Typography, Button } from '@mui/material';
import { AuthWrapper } from 'components/common/AuthWrapper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';

const SignUpPage = () => {
  const auth = React.useContext(FirebaseContext).auth;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate(AppRoutes.Boards);
  }, [user]);

  return (
    <AuthWrapper
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}
    >
      <Box
        sx={
          {
            // background: 'linear-gradient(to bottom, #1B779A, #AAD41E)',
          }
        }
      >
        <h1> Hello, Wellcome!</h1>
      </Box>
      <Typography>Create your free account </Typography>
      <TextField
        label="E-mail adress"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        sx={{ width: 'inherit' }}
      />
      <TextField
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        sx={{ width: 'inherit' }}
      />
      <Button
        sx={{ width: 'inherit' }}
        variant="contained"
        onClick={() => createUserWithEmailAndPassword(email, password)}
      >
        Register
      </Button>
    </AuthWrapper>
  );
};

export default SignUpPage;
