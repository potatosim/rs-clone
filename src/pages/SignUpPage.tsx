import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { TextField, Typography, Button } from '@mui/material';
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
import {
  ButtonTranslationKeys,
  InputsTranslationKeys,
  TranslationNameSpaces,
  TypographyTranslationKeys,
} from 'enum/Translations';
import { useTranslation } from 'react-i18next';
import Collapse from '@mui/material/Collapse/Collapse';
import Avatar from '@mui/material/Avatar/Avatar';

enum FirebaseErrors {
  Password = 'auth/weak-password',
  Email = 'auth/email-already-in-use',
  InCorrectEmail = 'auth/invalid-email',
}

const SignUpPage = () => {
  const { auth, firestore, user } = useContext(FirebaseContext);
  const [createUserWithEmailAndPassword, createdUser, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [avatar, setAvatar] = useState('');

  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Inputs,
    TranslationNameSpaces.Typography,
  ]);

  const isButtonDisabled = loginError || !login || !email || !password;

  useEffect(() => {
    handleCreateUserRecord();
  }, [createdUser]);

  useEffect(() => {
    if (error) {
      if (error.code === FirebaseErrors.Email || error.code === FirebaseErrors.InCorrectEmail) {
        setIsEmailError(true);
      }
      if (error.code === FirebaseErrors.Password) {
        setIsPasswordError(true);
      }
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      navigate(AppRoutes.Boards);
    }
  }, [user]);

  const handleCreateUserRecord = async () => {
    if (createdUser) {
      await updateProfile({
        photoURL: avatar,
        displayName: login,
      });

      await setDoc(doc(firestore, Collections.Users, createdUser.user.uid), {
        boards: [],
        avatar,
        login: login.toLowerCase(),
        currentTheme: DefaultThemes.DefaultLight,
      });
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

  return (
    <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', rowGap: '2rem' }} elevation={12}>
      <Typography>
        {translate(TypographyTranslationKeys.CreateAccount, {
          ns: TranslationNameSpaces.Typography,
        })}
      </Typography>
      <TextField
        color="secondary"
        required
        size="small"
        value={email}
        label={translate(InputsTranslationKeys.EMailAddress, {
          ns: TranslationNameSpaces.Inputs,
        })}
        error={isEmailError}
        helperText={
          isEmailError &&
          translate(TypographyTranslationKeys.EmailTaken, {
            ns: TranslationNameSpaces.Typography,
          })
        }
        type="email"
        onChange={(e) => {
          if (isEmailError) {
            setIsEmailError(false);
          }
          setEmail(e.target.value);
        }}
      />
      <PasswordInput
        error={isPasswordError}
        errorMessage={translate(TypographyTranslationKeys.WeakPassword, {
          ns: TranslationNameSpaces.Typography,
        })}
        value={password}
        setValue={(value) => {
          if (isPasswordError) {
            setIsPasswordError(false);
          }
          setPassword(value);
        }}
      />
      <TextField
        color="secondary"
        label={translate(ButtonTranslationKeys.Login, {
          ns: TranslationNameSpaces.Buttons,
        })}
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
        helperText={
          loginError &&
          translate(TypographyTranslationKeys.LoginTaken, {
            ns: TranslationNameSpaces.Typography,
          })
        }
        onBlur={handleCheckLogin}
      />
      <UploadButton getFileUrl={setAvatar} />
      <Collapse in={!!avatar} sx={{ margin: '0 auto' }}>
        <Avatar sx={{ width: '4rem', height: '4rem' }} src={avatar} />
      </Collapse>
      <Button
        color="secondary"
        disabled={isButtonDisabled}
        variant="contained"
        onClick={handleCreateUser}
      >
        {translate(ButtonTranslationKeys.Register)}
      </Button>
      <ModalLoader isOpen={loading || (!!createdUser && !user)} />
    </Paper>
  );
};

export default SignUpPage;
