import { Box, Tooltip } from '@mui/material';
import {
  ButtonTranslationKeys,
  InputsTranslationKeys,
  TranslationNameSpaces,
} from 'enum/Translations';
import React, { FC, useState } from 'react';

import { CommentProps } from 'components/Comments/Comments';
import Comments from 'components/Comments';
import IconButton from '@mui/material/IconButton/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { TextArea } from 'components/DescriptionField/DescriptionField';
import { useTranslation } from 'react-i18next';

interface CommentsTabProps extends CommentProps {
  handleAddComment: (message: string) => void;
}

const CommentsTab: FC<CommentsTabProps> = ({ comments, handleAddComment }) => {
  const [text, setText] = useState('');

  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Inputs,
  ]);

  const handleComment = async () => {
    setText('');
    await handleAddComment(text);
  };
  return (
    <Box padding="1rem">
      <Box display="flex" alignItems="center" columnGap="1rem">
        <TextArea
          style={{
            height: '50px',
            width: '90%',
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            translate(InputsTranslationKeys.EnterSomeText, {
              ns: TranslationNameSpaces.Inputs,
            }) as string
          }
          maxRows={2}
        />

        <Tooltip title={translate(ButtonTranslationKeys.SendAComment)}>
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
