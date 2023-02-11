import React from 'react';
// import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { useSignInWithGoogle, useSignInWithGithub } from 'react-firebase-hooks/auth';
import { Box, FormControl, Link, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
// import SignUpPage from './SignUpPage';
// import { FormWrapper } from 'components/common/FormWrapper';
// import { InputUnstyled } from '@mui/base';
import styled from '@emotion/styled';
// import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';

const LoginPage = () => {
  // const navigate = useNavigate();
  const auth = React.useContext(FirebaseContext).auth;
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithGitHub] = useSignInWithGithub(auth);
  // const goHome = () => {
  //   navigate('/');
  // };

  return (
    <Grid
      container
      sx={{ height: 'window.innerHeight -50', alignItems: 'center', justifyContent: 'center' }}
    >
      <Grid
        p={5}
        sx={{
          width: '400px',
          boxShadow: '4px 4px 4px 4px gray',
          textAlign: 'center',
          direction: 'column',
        }}
      >
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography>Login in to your account</Typography>
          {/* <di2v> */}
          <TextField label="Enter e-mail adress" type="email" />
          <Button type="submit" variant="contained">
            Continue
          </Button>
          {/* </div> */}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          or
          <Button variant="outlined" onClick={() => signInWithGoogle()}>
            Google
          </Button>
          <Button variant="outlined" onClick={() => signInWithGitHub()}>
            GitHub
          </Button>
        </Box>
        <Typography>
          Does`t have an account? <Link href={AppRoutes.SignUpPage}>SinUp for free!</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
