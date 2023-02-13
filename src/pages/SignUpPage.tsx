import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Box, TextField, Typography, Button } from '@mui/material';
import { AuthWrapper } from 'components/common/AuthWrapper';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import { useContext, useEffect, useState } from 'react';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { Collections } from 'enum/Collection';
import ModalLoader from 'components/common/ModalLoader';

// enum FirebaseErrors {
//   Password = 'auth/weak-password',
//   Email = 'auth/email-already-in-use',
// }

const SignUpPage = () => {
  const { auth, firestore } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [createUserWithEmailAndPassword, createdUser, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();

  const handleCreateUserRecord = async () => {
    if (createdUser) {
      const { user } = createdUser;
      await setDoc(doc(firestore, Collections.Users, user.uid), {
        avatar: '',
        boards: [],
        themes: [],
        login: login.toLowerCase(),
      });
      navigate(AppRoutes.Boards);
    }
  };

  useEffect(() => {
    handleCreateUserRecord();
  }, [createdUser]);

  useEffect(() => {
    if (error) {
      // TODO add error handling
    }
  }, [error]);

  const handleCreateUser = async () => {
    await createUserWithEmailAndPassword(email, password);
  };

  const handleCheckLogin = async () => {
    const usersWithLogin = await getDocs(
      query(collection(firestore, Collections.Users), where('login', '==', login.toLowerCase())),
    );

    if (usersWithLogin.docs.length) {
      setLoginError(true);
    }
  };

  const isButtonDisabled = loginError || !login || !email || !password;

  return (
    <AuthWrapper
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}
    >
      <Box>
        <Typography variant="h4"> Hello, Welcome!</Typography>
      </Box>
      <Typography>Create your free account </Typography>
      <TextField
        required
        value={email}
        label="E-mail address"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Login"
        required
        value={login}
        onChange={(e) => {
          if (loginError) {
            setLoginError(false);
          }
          setLogin(e.target.value.trim());
        }}
        error={loginError}
        helperText={loginError && 'Login is already busy'}
        onBlur={handleCheckLogin}
      />
      <TextField
        required
        value={password}
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={isButtonDisabled} variant="contained" onClick={handleCreateUser}>
        Register
      </Button>
      <ModalLoader isOpen={loading} />
    </AuthWrapper>
  );
};

export default SignUpPage;
