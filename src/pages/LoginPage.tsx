import { Box, TextField } from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { AppRoutes } from 'enum/AppRoutes';
import Button from '@mui/material/Button';
import { Collections } from 'enum/Collection';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import GoogleIcon from '@mui/icons-material/Google';
import Grid from '@mui/material/Grid';
import { IUserItem } from 'types/User';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { usersConverter } from 'helpers/converters';
import { DefaultThemes } from 'enum/DefaultThemes';

const LoginPage = () => {
  const navigate = useNavigate();
  const { firestore, auth } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleLogin = async () => {
    await signInWithEmailAndPassword(email, password);
    navigate(AppRoutes.Boards);
  };

  const handleSignInWithGoogle = async () => {
    const googleAccount = await signInWithGoogle();
    if (googleAccount) {
      const userGoogle = await getDoc<IUserItem>(
        doc(firestore, Collections.Users, googleAccount.user.uid).withConverter(usersConverter),
      );

      if (!userGoogle.data()) {
        await setDoc(doc(firestore, Collections.Users, googleAccount.user.uid), {
          avatar: googleAccount.user.photoURL,
          boards: [],
          login: googleAccount.user.displayName,
          currentTheme: DefaultThemes.DefaultLight,
        });
      }
      navigate(AppRoutes.Boards);
    }
  };

  return (
    <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
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
          <Typography>Login to your account</Typography>
          <TextField
            label="E-mail address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button variant="contained" color="secondary" onClick={handleLogin}>
            Enter
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          or
          <Button variant="outlined" color="secondary" onClick={handleSignInWithGoogle}>
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
