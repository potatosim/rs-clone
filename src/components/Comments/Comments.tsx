import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { CommentItem } from 'types/CommentItem';

export interface CommentProps {
  comments: CommentItem[];
}

const Comments: FC<CommentProps> = ({ comments }) => {
  if (comments.length) {
    return (
      <Box>
        {comments.map((comment) => (
          <Box key={comment.createdAt}>
            <Typography>
              {comment.author} {comment.message} at {comment.createdAt}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return (
    <Box>
      <Typography>No comments yet</Typography>
    </Box>
  );
};

export default Comments;
