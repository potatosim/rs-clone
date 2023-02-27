import { Box, Paper, TextField } from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
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

const LoginPage = () => {
  const navigate = useNavigate();
  const { firestore, auth } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Inputs,
    TranslationNameSpaces.Typography,
  ]);

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
        <Typography>Login to your account</Typography>
        <TextField
          size="small"
          color="secondary"
          label={translate(InputsTranslationKeys.EMailAddress, {
            ns: TranslationNameSpaces.Inputs,
          })}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          size="small"
          color="secondary"
          label={translate(InputsTranslationKeys.Password, {
            ns: TranslationNameSpaces.Inputs,
          })}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button variant="contained" color="secondary" onClick={handleLogin}>
          {translate(ButtonTranslationKeys.Enter)}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleSignInWithGoogle}>
          <GoogleIcon sx={{ marginRight: '15px' }}></GoogleIcon>
          {translate(ButtonTranslationKeys.LoginWithGoogle)}
        </Button>
        <Typography sx={{ marginTop: '15px' }}>
          {translate(TypographyTranslationKeys.DontHaveAccount, {
            ns: TranslationNameSpaces.Typography,
          })}
        </Typography>
        <Button color="secondary" component={Link} to={AppRoutes.SignUpPage}>
          {translate(ButtonTranslationKeys.SignUp)}
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginPage;
