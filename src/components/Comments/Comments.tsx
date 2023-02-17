import { Box, Typography } from '@mui/material';
import { HistoryItemEl } from 'components/History/History';
import React, { FC } from 'react';
import { CommentItem } from 'types/CommentItem';

export interface CommentProps {
  comments: CommentItem[];
}

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
          <HistoryItemEl
            avatar={comment.author.avatar}
            date={comment.createdAt}
            title={<strong style={{ overflowWrap: 'break-word' }}>{comment.message}</strong>}
          />
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
