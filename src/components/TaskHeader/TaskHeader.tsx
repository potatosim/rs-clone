import styled from '@emotion/styled';
import { Box, ButtonGroup, IconButton, Tooltip, Typography } from '@mui/material';
import { FC, useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import RenameTextField from 'components/RenameTextField/RenameTextField';
import { useTranslation } from 'react-i18next';
import { ButtonTranslationKeys, TranslationNameSpaces } from 'enum/Translations';

const StyledCardHeader = styled(Box)`
  grid-area: 1 / 1 / 2 / 5;
  border-bottom: 2px solid lightgray;
  min-height: 76px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

interface TaskHeaderProps {
  taskTitle: string;
  taskId: string;
  handleClose: () => void;
  handleUpdateTitle: (title: string, id: string) => void;
}

const TaskHeader: FC<TaskHeaderProps> = ({ taskTitle, taskId, handleClose, handleUpdateTitle }) => {
  const [isChangeTitle, setIsChangeTitle] = useState(false);

  const { t: translate } = useTranslation(TranslationNameSpaces.Buttons);

  const handleRename = () => {
    setIsChangeTitle(true);
  };

  const handleCloseRename = () => {
    setIsChangeTitle(false);
  };

  const handleSubmit = (value: string) => {
    setIsChangeTitle(false);
    handleUpdateTitle(value, taskId);
  };

  return (
    <StyledCardHeader>
      {isChangeTitle ? (
        <RenameTextField
          justify="start"
          handleClose={handleCloseRename}
          initialTitle={taskTitle}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Typography variant="h4">{taskTitle}</Typography>
      )}
      <ButtonGroup>
        <Tooltip title={translate(ButtonTranslationKeys.ChangeTaskTitle)}>
          <IconButton onClick={handleRename}>
            <ModeEditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={translate(ButtonTranslationKeys.Close)}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </StyledCardHeader>
  );
};

export default TaskHeader;
