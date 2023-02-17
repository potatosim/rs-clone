import { Textarea } from '@mui/joy';
import { Box, Button, FormControl } from '@mui/material';
import Comments from 'components/Comments';
import { CommentProps } from 'components/Comments/Comments';
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
    <Box padding="1rem">
      <FormControl fullWidth>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter some text..."
          maxRows={1}
          endDecorator={
            <Box
              sx={{
                display: 'flex',
                borderTop: '1px solid',
                borderColor: 'divider',
                flex: 'auto',
              }}
            >
              <Button
                sx={{ ml: 'auto', mt: '1rem' }}
                disabled={!text.trim().length}
                variant="contained"
                onClick={handleComment}
              >
                Send
              </Button>
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
