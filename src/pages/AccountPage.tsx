import { useNavigate, useParams } from 'react-router-dom';

import AnotherAccount from 'components/AnotherAccount';
import { CircularProgress } from '@mui/material';
import CurrentAccount from 'components/CurrentAccount';
import NotFoundElement from 'components/NotFoundElement';
import { UserContext } from 'components/RequireAuth';
import { getUserPage } from 'helpers/getUserPage';
import { useContext } from 'react';
import { useGetUser } from 'hooks/userHooks/useGetUser';
import { useTranslation } from 'react-i18next';
import {
  ButtonTranslationKeys,
  TranslationNameSpaces,
  TypographyTranslationKeys,
} from 'enum/Translations';

const AccountPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { t: translate } = useTranslation([
    TranslationNameSpaces.Typography,
    TranslationNameSpaces.Buttons,
  ]);

  const { accountId } = useParams();
  const { userFromFirestore, userLoading } = useGetUser(accountId!);

  if (userLoading) {
    return <CircularProgress />;
  }

  if (accountId === user.id) {
    return <CurrentAccount />;
  }

  if (userFromFirestore) {
    return <AnotherAccount anotherUser={userFromFirestore} />;
  }

  return (
    <NotFoundElement
      buttonText={translate(ButtonTranslationKeys.ToMyAccount, {
        ns: TranslationNameSpaces.Buttons,
      })}
      notification={translate(TypographyTranslationKeys.UserExist, {
        ns: TranslationNameSpaces.Typography,
      })}
      onClick={() => {
        navigate(getUserPage(user.id));
      }}
    />
  );
};

export default AccountPage;
