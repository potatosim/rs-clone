import { TextField, Tabs, Button, Tab, styled, Box } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import BoardCard from 'components/BoardCard';
import BoardUserSelect from 'components/BoardUserSelect';
import { FormWrapper } from 'components/common/FormWrapper';
import { ModalWrapper } from 'components/common/ModalWrapper';
import TabPanel from 'components/TabPanel/TabPanel';
import UploadButton from 'components/UploadButton/UploadButton';
import {
  ButtonTranslationKeys,
  InputsTranslationKeys,
  TranslationNameSpaces,
} from 'enum/Translations';
import React, { useState } from 'react';
import { TwitterPicker } from 'react-color';
import { useTranslation } from 'react-i18next';
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

  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Inputs,
  ]);

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
      <Box
        sx={{
          display: 'flex',
          columnGap: '2rem',
          alignItems: 'center',
        }}
      >
        <FormWrapper sx={{ minHeight: 400 }}>
          <TextField
            color="secondary"
            fullWidth
            value={title}
            required
            label={translate(InputsTranslationKeys.TitleOfTheBoard, {
              ns: TranslationNameSpaces.Inputs,
            })}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
          />

          <Tabs textColor="secondary" value={backgroundType} onChange={handleChangeBackgroundType}>
            <StyledTab value={'color'} label={translate(ButtonTranslationKeys.Color)} />
            <StyledTab value={'image'} label={translate(ButtonTranslationKeys.Image)} />
          </Tabs>
          <TabPanel index="color" value={backgroundType}>
            <TwitterPicker color={color} onChangeComplete={(c) => setColor(c.hex)} />
          </TabPanel>
          <TabPanel index="image" value={backgroundType}>
            <UploadButton getFileUrl={setFileUrl} />
          </TabPanel>
          <BoardUserSelect userIds={userIds} setUserIds={setUserIds} />
          <Button
            color="secondary"
            disabled={!title.trim()}
            variant="outlined"
            type="submit"
            onClick={handleClick}
          >
            {buttonTitle}
          </Button>
        </FormWrapper>
        <Collapse
          sx={{ pointerEvents: 'none', '@media (max-width: 768px)': { minWidth: '350px' } }}
          orientation="horizontal"
          in={!!title}
        >
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
