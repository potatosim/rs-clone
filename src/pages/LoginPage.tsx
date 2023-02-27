import { Box, Paper, TextField } from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { AppRoutes } from 'enum/AppRoutes';
import Button from '@mui/material/Button';
import { Collections } from 'enum/Collection';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import GoogleIcon from '@mui/icons-material/Google';
import { IUserItem } from 'types/User';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { usersConverter } from 'helpers/converters';
import { DefaultThemes } from 'enum/DefaultThemes';
import { useTranslation } from 'react-i18next';
import {
  ButtonTranslationKeys,
  InputsTranslationKeys,
  TranslationNameSpaces,
  TypographyTranslationKeys,
} from 'enum/Translations';
import PasswordInput from 'components/PasswordInput';
import { FirebaseErrors } from 'enum/FirebaseErrors';

const LoginPage = () => {
  const navigate = useNavigate();
  const { firestore, auth, user } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [signInWithEmailAndPassword, , , error] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      navigate(AppRoutes.Boards);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      if (error.code === FirebaseErrors.Email || error.code === FirebaseErrors.InCorrectEmail) {
        setIsEmailError(true);
      }
      if (error.code === FirebaseErrors.WrongPassword) {
        setIsPasswordError(true);
      }
    }
  }, [error]);

  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Inputs,
    TranslationNameSpaces.Typography,
  ]);

  const handleLogin = async () => {
    await signInWithEmailAndPassword(email, password);
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
    <Paper
      sx={{
        p: 4,
      }}
      elevation={12}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          rowGap: '1rem',
        }}
      >
        <Typography>
          {translate(TypographyTranslationKeys.LoginToAccount, {
            ns: TranslationNameSpaces.Typography,
          })}
        </Typography>
        <TextField
          size="small"
          color="secondary"
          required
          label={translate(InputsTranslationKeys.EMailAddress, {
            ns: TranslationNameSpaces.Inputs,
          })}
          type="email"
          onChange={(e) => {
            if (isEmailError) {
              setIsEmailError(false);
            }
            setEmail(e.target.value);
          }}
          value={email}
          fullWidth
          error={isEmailError}
          helperText={
            isEmailError &&
            translate(TypographyTranslationKeys.IncorrectEmail, {
              ns: TranslationNameSpaces.Typography,
            })
          }
        />
        <PasswordInput
          value={password}
          setValue={(value) => {
            if (isPasswordError) {
              setIsPasswordError(false);
            }
            setPassword(value);
          }}
          error={isPasswordError}
          errorMessage={translate(TypographyTranslationKeys.WrongPassword, {
            ns: TranslationNameSpaces.Typography,
          })}
        />
        <Button fullWidth variant="contained" color="secondary" onClick={handleLogin}>
          {translate(ButtonTranslationKeys.Enter)}
        </Button>
        <Button fullWidth variant="contained" color="secondary" onClick={handleSignInWithGoogle}>
          <GoogleIcon sx={{ marginRight: '15px' }}></GoogleIcon>
          {translate(ButtonTranslationKeys.LoginWithGoogle)}
        </Button>
        <Typography sx={{ marginTop: '15px' }}>
          {translate(TypographyTranslationKeys.DontHaveAccount, {
            ns: TranslationNameSpaces.Typography,
          })}
        </Typography>
        <Button variant="contained" color="secondary" component={Link} to={AppRoutes.SignUpPage}>
          {translate(ButtonTranslationKeys.SignUp)}
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginPage;
