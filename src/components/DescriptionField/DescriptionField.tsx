import { Button, styled, TextareaAutosize } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTranslation } from 'react-i18next';
import {
  ButtonTranslationKeys,
  InputsTranslationKeys,
  TranslationNameSpaces,
} from 'enum/Translations';

interface DescriptionFieldProps {
  taskDescription: string;
  onSubmit: (description: string) => void;
}

export const TextArea = styled(TextareaAutosize)`
  resize: none;
  height: 50px;
  border-radius: 5px;
  color: ${({ theme }) => theme.palette.getContrastText(theme.palette.background.paper)};
  background-color: ${({ theme }) => theme.palette.background.paper};
  outline: none;
  border-color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 1rem;
  padding: 0.5rem;
`;

const DescriptionField: FC<DescriptionFieldProps> = ({ taskDescription, onSubmit }) => {
  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Inputs,
  ]);

  const [description, setDescription] = useState<string>(
    taskDescription ||
      `${translate(InputsTranslationKeys.NoDescriptionProvided, {
        ns: TranslationNameSpaces.Inputs,
      })}`,
  );

  useEffect(() => {
    if (taskDescription && taskDescription !== description) {
      setDescription(taskDescription);
    }
  }, [taskDescription]);
  const [isEditMode, setIsEditMode] = useState(false);

  const renderDescription = () => {
    return isEditMode ? (
      <Box sx={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
        <TextArea
          value={description}
          maxRows={3}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ButtonGroup sx={{ alignSelf: 'flex-end' }} variant="text">
          <Button
            color="secondary"
            disabled={description === taskDescription || description === ''}
            onClick={() => {
              setIsEditMode(false);
              onSubmit(description);
            }}
          >
            {translate(ButtonTranslationKeys.AcceptChanges)}
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setIsEditMode(false);
              setDescription(
                taskDescription ||
                  `${translate(InputsTranslationKeys.NoDescriptionProvided, {
                    ns: TranslationNameSpaces.Inputs,
                  })}`,
              );
            }}
          >
            {translate(ButtonTranslationKeys.Close)}
          </Button>
        </ButtonGroup>
      </Box>
    ) : (
      <Box onClick={() => setIsEditMode(true)} sx={{ cursor: 'pointer', padding: '1rem 0' }}>
        <Typography
          fontStyle={taskDescription ? 'normal' : 'italic'}
          sx={{
            height: 100,
            overflowY: 'scroll',
            wordWrap: 'wrap',
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {description}
        </Typography>
      </Box>
    );
  };

  return (
    <Box display="flex" flexDirection="column" rowGap="1rem">
      {renderDescription()}
    </Box>
  );
};

export default DescriptionField;
