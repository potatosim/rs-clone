import { Avatar, Box, styled, Typography } from '@mui/material';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { TranslationNameSpaces } from 'enum/Translations';
import { doc } from 'firebase/firestore';
import { usersConverter } from 'helpers/converters';
import { getUserPage } from 'helpers/getUserPage';
import { TFunction } from 'i18next';
import { FC, useContext } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Trans, useTranslation } from 'react-i18next';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { HistoryItem } from 'types/HistoryItem';
import { IUserItem } from 'types/User';

interface HistoryProps {
  history: HistoryItem[];
}

export const HistoryWrapper = styled(Box)`
  padding: 1rem;
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
  margin-top: 2;
  max-height: 300px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const HistoryItemEl = (historyItem: HistoryItem) => {
  const { t } = useTranslation([TranslationNameSpaces.History, TranslationNameSpaces.Typography]);

  const { firestore } = useContext(FirebaseContext);
  const [user, loading] = useDocumentData<IUserItem>(
    doc(firestore, Collections.Users, historyItem.initiator).withConverter(usersConverter),
  );
  const navigate = useNavigate();

  if (!user || loading) {
    return null;
  }

  const { avatar } = user;

  const title = getTitleByAction(historyItem, user, t, navigate);

  return (
    <Box sx={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}>
      <Avatar
        onClick={() => {
          navigate(getUserPage(historyItem.initiator));
        }}
        sx={{ cursor: 'pointer' }}
        src={avatar}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography>{title}</Typography>
        <Typography variant="caption">{historyItem.time.split(',').reverse().join(',')}</Typography>
      </Box>
    </Box>
  );
};

const getTitleByAction = (
  historyItem: HistoryItem,
  user: IUserItem,
  translate: TFunction,
  navigate: NavigateFunction,
) => {
  switch (historyItem.action) {
    case 'created':
      return <Trans i18nKey={'created'} t={translate} values={{ login: user.login }} />;
    case 'statusChanged':
      return (
        <Trans
          i18nKey={'statusChanged'}
          t={translate}
          values={{
            login: user.login,
            from: translate(historyItem.from.toLowerCase(), {
              ns: TranslationNameSpaces.Typography,
            }),
            to: translate(historyItem.to.toLowerCase(), { ns: TranslationNameSpaces.Typography }),
          }}
        />
      );
    case 'titleChanged':
      return (
        <Trans
          i18nKey={'titleChanged'}
          t={translate}
          values={{
            login: user.login,
            from: translate(historyItem.from.toLowerCase(), {
              ns: TranslationNameSpaces.Typography,
            }),
            to: translate(historyItem.to.toLowerCase(), { ns: TranslationNameSpaces.Typography }),
          }}
        />
      );
    case 'descriptionChanged':
      return <Trans i18nKey={'descriptionChanged'} t={translate} values={{ login: user.login }} />;
    case 'priorityChanged':
      return (
        <Trans
          i18nKey={'priorityChanged'}
          t={translate}
          values={{
            login: user.login,
            from: translate(historyItem.from.toLowerCase(), {
              ns: TranslationNameSpaces.Typography,
            }),
            to: translate(historyItem.to.toLowerCase(), { ns: TranslationNameSpaces.Typography }),
          }}
        />
      );
    case 'sizeChanged':
      return (
        <Trans
          i18nKey={'sizeChanged'}
          t={translate}
          values={{
            login: user.login,
            from: translate(historyItem.from.toLowerCase(), {
              ns: TranslationNameSpaces.Typography,
            }),
            to: translate(historyItem.to.toLowerCase(), { ns: TranslationNameSpaces.Typography }),
          }}
        />
      );
    case 'assigneeChanged':
      return (
        <Trans
          i18nKey={'assigneeChanged'}
          t={translate}
          values={{
            login: user.login,
            to: historyItem.to,
          }}
          components={{
            nav: (
              <Typography
                fontWeight={600}
                component="span"
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(getUserPage(historyItem.assigneeId))}
              />
            ),
          }}
        />
      );
    default:
      return '' as never;
  }
};

const History: FC<HistoryProps> = ({ history }) => {
  return (
    <HistoryWrapper>
      {history.reverse().map((historyItem) => (
        <Box
          key={historyItem.time + historyItem.action}
          display="flex"
          justifyContent="space-between"
        >
          <HistoryItemEl {...historyItem} />
        </Box>
      ))}
    </HistoryWrapper>
  );
};

export default History;
