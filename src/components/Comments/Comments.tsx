import { Avatar, Box, Typography } from '@mui/material';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { TranslationNameSpaces, TypographyTranslationKeys } from 'enum/Translations';
import { doc } from 'firebase/firestore';
import { usersConverter } from 'helpers/converters';
import { getUserPage } from 'helpers/getUserPage';
import { FC, useContext } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ICommentItem } from 'types/CommentItem';
import { IUserItem } from 'types/User';

export interface CommentProps {
  comments: ICommentItem[];
}

export const CommentItem = ({ author, createdAt, message }: ICommentItem) => {
  const { firestore } = useContext(FirebaseContext);
  const [user, loading] = useDocumentData<IUserItem>(
    doc(firestore, Collections.Users, author).withConverter(usersConverter),
  );

  const navigate = useNavigate();

  if (!user || loading) {
    return null;
  }

  const { avatar } = user;

  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: '1rem',
        alignItems: 'center',
        border: '1px solid lightgrey',
        borderRadius: '5px',
        padding: '0.5rem',
        width: '100%',
        alignSelf: 'flex-start',
      }}
    >
      <Avatar
        onClick={() => {
          navigate(getUserPage(author));
        }}
        sx={{ cursor: 'pointer' }}
        src={avatar}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography>{message}</Typography>
        <Typography variant="caption">{createdAt.split(',').reverse().join(',')}</Typography>
      </Box>
    </Box>
  );
};

const Comments: FC<CommentProps> = ({ comments }) => {
  const { t: translate } = useTranslation(TranslationNameSpaces.Typography);
  if (comments.length) {
    return (
      <Box
        sx={{
          padding: '1rem 0',
          display: 'flex',
          rowGap: '1rem',
          flexDirection: 'column',
          maxHeight: '200px',
          overflowY: 'scroll',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {comments.map((comment) => (
          <CommentItem key={comment.createdAt + comment.author} {...comment} />
        ))}
      </Box>
    );
  }
  return (
    <Box padding="1rem 0">
      <Typography>
        {translate(TypographyTranslationKeys.NoCommentsYet, {
          ns: TranslationNameSpaces.Typography,
        })}
      </Typography>
    </Box>
  );
};

export default Comments;
