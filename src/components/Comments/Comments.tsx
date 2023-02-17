import { Avatar, Box, Typography } from '@mui/material';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { doc } from 'firebase/firestore';
import { usersConverter } from 'helpers/converters';
import { FC, useContext } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
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

  if (!user || loading) {
    return null;
  }

  const { avatar } = user;

  return (
    <Box sx={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}>
      <Avatar src={avatar} />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography>{message}</Typography>
        <Typography variant="caption">{createdAt.split(',').reverse().join(',')}</Typography>
      </Box>
    </Box>
  );
};

const Comments: FC<CommentProps> = ({ comments }) => {
  if (comments.length) {
    return (
      <Box
        sx={{
          padding: '1rem',
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
    <Box padding="1rem">
      <Typography>No comments yet</Typography>
    </Box>
  );
};

export default Comments;
