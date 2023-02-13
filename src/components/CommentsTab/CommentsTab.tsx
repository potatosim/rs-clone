import { Textarea } from '@mui/joy';
import { Box, Button, FormControl } from '@mui/material';
import Comments, { CommentProps } from 'components/Comments/Comments';
import React, { FC, useState } from 'react';

interface CommentsTabProps extends CommentProps {
  handleAddComment: (message: string) => void;
}

const CommentsTab: FC<CommentsTabProps> = ({ comments, handleAddComment }) => {
  const [text, setText] = useState('');

  const handleComment = async () => {
    setText('');
    await handleAddComment(text);
  };
  return (
    <Box>
      <FormControl sx={{ display: 'flex' }}>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter some text"
          maxRows={2}
          endDecorator={
            <Box
              sx={{
                display: 'flex',
                borderTop: '1px solid',
                borderColor: 'divider',
                flex: 'auto',
              }}
            >
              <Button onClick={handleComment}>Leave a comment</Button>
            </Box>
          }
          sx={{
            width: '100%',
          }}
        />
      </FormControl>
      <Comments comments={comments} />
    </Box>
  );
};

export default CommentsTab;
