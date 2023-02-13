import { Box, TextField } from '@mui/material';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { AppRoutes } from 'enum/AppRoutes';
import Button from '@mui/material/Button';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import GoogleIcon from '@mui/icons-material/Google';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import React from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = React.useContext(FirebaseContext).auth;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signInWithEmailAndPassword, user] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  React.useEffect(() => {
    if (user) {
      navigate(AppRoutes.Boards);
    }
  }, [user]);

  return (
    <Grid
      container
      sx={{ height: 'window.innerHeight -50', alignItems: 'center', justifyContent: 'center' }}
    >
      <Grid
        p={5}
        sx={{
          boxShadow: '4px 4px 4px 4px gray',
          textAlign: 'center',
          direction: 'column',
          borderRadius: '15px',
        }}
      >
        <Box
          component="form"
          sx={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <Typography>Login in to your account</Typography>
          <TextField
            label="E-mail adress"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" onClick={() => signInWithEmailAndPassword(email, password)}>
            Enter
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          or
          <Button variant="outlined" onClick={() => signInWithGoogle()}>
            <GoogleIcon sx={{ marginRight: '15px' }}></GoogleIcon>
            Login with Google
          </Button>
        </Box>
        <Typography sx={{ marginTop: '15px' }}>
          Do not have an account? <br />
          <Link to={AppRoutes.SignUpPage}> SignUp for free!</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
