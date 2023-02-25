import { Box, TextareaAutosize, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import Comments from 'components/Comments';
import { CommentProps } from 'components/Comments/Comments';
import React, { FC, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

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
      <Box display="flex" alignItems="center" columnGap="1rem">
        <TextareaAutosize
          style={{
            resize: 'none',
            padding: '0.5rem',
            borderRadius: '5px',
            height: '50px',
            width: '90%',
            fontSize: '1rem',
            outline: 'none',
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter some text..."
          maxRows={2}
        />

        <Tooltip title="Send a comment">
          <span>
            <IconButton
              color="info"
              disabled={!text.trim().length}
              size="large"
              onClick={handleComment}
            >
              <SendIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
      <Comments comments={comments} />
    </Box>
  );
};

export default CommentsTab;
