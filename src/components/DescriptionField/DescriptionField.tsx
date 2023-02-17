import { Button, TextareaAutosize } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';

interface DescriptionFieldProps {
  taskDescription: string;
  onSubmit: (description: string) => void;
}

const DescriptionField: FC<DescriptionFieldProps> = ({ taskDescription, onSubmit }) => {
  const [description, setDescription] = useState<string>(
    taskDescription || 'No description provided',
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
        <TextareaAutosize
          style={{ resize: 'none', height: '50px', borderRadius: '5px' }}
          value={description}
          maxRows={3}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ButtonGroup sx={{ alignSelf: 'flex-end' }} variant="text">
          <Button
            disabled={description === taskDescription || description === ''}
            onClick={() => {
              setIsEditMode(false);
              onSubmit(description);
            }}
          >
            Accept changes
          </Button>
          <Button
            onClick={() => {
              setIsEditMode(false);
              setDescription(taskDescription || 'No description provided');
            }}
          >
            Close
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
