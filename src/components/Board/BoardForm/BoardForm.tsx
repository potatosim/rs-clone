import { TextField, Tabs, Button, Tab, styled, Box } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import BoardCard from 'components/BoardCard';
import BoardUserSelect from 'components/BoardUserSelect';
import { FormWrapper } from 'components/common/FormWrapper';
import { ModalWrapper } from 'components/common/ModalWrapper';
import TabPanel from 'components/TabPanel/TabPanel';
import UploadButton from 'components/UploadButton/UploadButton';
import React, { useState } from 'react';
import { TwitterPicker } from 'react-color';
import { BackgroundType } from 'types/Background';
import { IBoardItem } from 'types/Board';

const StyledTab = styled(Tab)`
  font-weight: 600;
  font-size: 1rem;
`;

interface BoardFormProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (board: Omit<IBoardItem, 'id'>) => void;
  buttonTitle: string;
  board?: IBoardItem;
}

const BoardForm = ({ isOpen, handleSubmit, onClose, buttonTitle, board }: BoardFormProps) => {
  const [title, setTitle] = useState<string>(board?.title || '');
  const [backgroundType, setBackgroundType] = useState<BackgroundType>(
    board?.background.type || 'color',
  );
  const [fileUrl, setFileUrl] = useState<string>(
    board && board.background.type === 'image' ? board.background.source : '',
  );
  const [userIds, setUserIds] = useState<string[]>(board?.allowedUsers || []);
  const [color, setColor] = useState(
    board && board.background.type === 'color' ? board.background.source : '#ffffff',
  );

  const handleChangeBackgroundType = (
    event: React.SyntheticEvent<Element, Event>,
    value: BackgroundType,
  ) => {
    setBackgroundType(value);
  };

  const handleClick = async () => {
    const boardBody: Omit<IBoardItem, 'id'> = {
      columns: board ? board.columns : [],
      allowedUsers: [...userIds],
      background: {
        type: backgroundType,
        source: backgroundType === 'image' ? fileUrl : color,
      },
      title,
    };

    await handleSubmit(boardBody);

    onClose();
  };

  return (
    <ModalWrapper keepMounted={false} open={isOpen} onClose={onClose}>
      <Box sx={{ display: 'flex', columnGap: '2rem', alignItems: 'center' }}>
        <FormWrapper sx={{ minHeight: 400 }}>
          <TextField
            fullWidth
            value={title}
            required
            label="Title of the board"
            onChange={(e) => setTitle(e.target.value)}
            size="small"
          />

          <Tabs value={backgroundType} textColor="secondary" onChange={handleChangeBackgroundType}>
            <StyledTab value={'color'} label={'Color'} />
            <StyledTab value={'image'} label={'Image'} />
          </Tabs>
          <TabPanel index="color" value={backgroundType}>
            <TwitterPicker color={color} onChangeComplete={(c) => setColor(c.hex)} />
          </TabPanel>
          <TabPanel index="image" value={backgroundType}>
            <UploadButton getFileUrl={setFileUrl} />
          </TabPanel>
          <BoardUserSelect userIds={userIds} setUserIds={setUserIds} />
          <Button disabled={!title.trim()} variant="outlined" type="submit" onClick={handleClick}>
            {buttonTitle}
          </Button>
        </FormWrapper>
        <Collapse sx={{ pointerEvents: 'none' }} orientation="horizontal" in={!!title}>
          <BoardCard
            board={{
              title,
              columns: [],
              background: {
                type: backgroundType,
                source: backgroundType === 'image' ? fileUrl : color,
              },
              id: '',
              allowedUsers: [],
            }}
            handleDeleteBoard={() => {}}
            handleRenameBoard={() => {}}
          />
        </Collapse>
      </Box>
    </ModalWrapper>
  );
};

export default BoardForm;
