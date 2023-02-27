import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import { useContext, useEffect, useState } from 'react';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { Collections } from 'enum/Collection';
import ModalLoader from 'components/common/ModalLoader';
import Paper from '@mui/material/Paper/Paper';
import PasswordInput from 'components/PasswordInput';
import UploadButton from 'components/UploadButton/UploadButton';
import { DefaultThemes } from 'enum/DefaultThemes';

enum FirebaseErrors {
  Password = 'auth/weak-password',
  Email = 'auth/email-already-in-use',
}

enum RegisterSteps {
  EmailPassword = 'EmailPassword',
  UserInfo = 'UserInfo',
}

const SignUpPage = () => {
  const { auth, firestore } = useContext(FirebaseContext);
  const [createUserWithEmailAndPassword, createdUser, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [registerStep, setRegisterStep] = useState<RegisterSteps>(RegisterSteps.EmailPassword);

  const isButtonDisabled = loginError || !login || !email || !password;
  const isEmailError = error?.code === FirebaseErrors.Email;
  const isPasswordError = error?.code === FirebaseErrors.Password;

  useEffect(() => {
    handleCreateUserRecord();
  }, [createdUser]);

  const handleCreateUserRecord = async () => {
    if (createdUser) {
      await updateProfile({
        photoURL: avatar,
        displayName: login,
      });
      const { user } = createdUser;
      await setDoc(doc(firestore, Collections.Users, user.uid), {
        boards: [],
        avatar,
        login: login.toLowerCase(),
        currentTheme: DefaultThemes.DefaultLight,
      });

      navigate(AppRoutes.Boards);
    }
  };

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

  const renderStep = () => {
    switch (registerStep) {
      case RegisterSteps.EmailPassword:
        return (
          <>
            <TextField
              required
              size="small"
              value={email}
              label="E-mail address"
              error={isEmailError}
              helperText={isEmailError && 'Email is already taken'}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              error={isPasswordError}
              errorMessage="Password is too weak"
              value={password}
              setValue={setPassword}
            />
            <Button variant="contained" onClick={() => setRegisterStep(RegisterSteps.UserInfo)}>
              Next
            </Button>
          </>
        );
      case RegisterSteps.UserInfo:
        return (
          <>
            <TextField
              label="Login"
              required
              value={login}
              size="small"
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
            <UploadButton getFileUrl={setAvatar} />
            <Button onClick={() => setRegisterStep(RegisterSteps.EmailPassword)}>Back</Button>
            <Button disabled={isButtonDisabled} variant="contained" onClick={handleCreateUser}>
              Register
            </Button>
          </>
        );
    }
  };

  return (
    <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', rowGap: '2rem' }} elevation={12}>
      <Box>
        <Typography variant="h4"> Hello, Welcome!</Typography>
      </Box>
      <Typography>Create your free account </Typography>
      {renderStep()}
      <ModalLoader isOpen={loading} />
    </Paper>
  );
};

export default SignUpPage;
