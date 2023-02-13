import { Button, Tab, Tabs, TextField } from '@mui/material';
import React, { FC, useRef, useState } from 'react';

import { BackgroundType } from 'types/Background';
import TabPanel from 'components/TabPanel/TabPanel';
import styled from '@emotion/styled';
import { useAddBoard } from 'hooks/boardHooks/useAddBoard';
import { ModalWrapper } from 'components/common/ModalWrapper';
import { FormWrapper } from 'components/common/FormWrapper';
import UploadButton from 'components/UploadButton/UploadButton';

const StyledTab = styled(Tab)`
  font-weight: 600;
  font-size: 1rem;
`;

interface CreateBoardFormProps {
  isModalOpen: boolean;
  handleClose: () => void;
}

const CreateBoardForm: FC<CreateBoardFormProps> = ({ isModalOpen, handleClose }) => {
  const [title, setTitle] = useState<string>('');
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('color');
  // TODO add private functionality
  // const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>('');
  const colorRef = useRef<HTMLInputElement | null>(null);

  const handleAddBoard = useAddBoard({
    title,
    backgroundType,
    colorRef,
    fileUrl,
    // isPrivate,
  });

  const handleChangeBackgroundType = (
    event: React.SyntheticEvent<Element, Event>,
    value: BackgroundType,
  ) => {
    setBackgroundType(value);
  };

  const handleCreate = async () => {
    await handleAddBoard();
    setTitle('');
    handleClose();
  };

  return (
    <ModalWrapper keepMounted={false} open={isModalOpen} onClose={handleClose}>
      <FormWrapper>
        <TextField
          value={title}
          required
          label="Title of the board"
          onChange={(e) => setTitle(e.target.value)}
          size="small"
        />

        <Tabs value={backgroundType} onChange={handleChangeBackgroundType}>
          <StyledTab value={'color'} label={'Color'} />
          <StyledTab value={'image'} label={'Image'} />
        </Tabs>
        <TabPanel index="color" value={backgroundType}>
          <TextField
            inputRef={colorRef}
            label="Background Color"
            type="color"
            variant="filled"
            sx={{ minWidth: '200px' }}
          />
        </TabPanel>
        <TabPanel index="image" value={backgroundType}>
          <UploadButton getFileUrl={setFileUrl} />
        </TabPanel>
        <Button
          disabled={!title.trim().length}
          variant="outlined"
          type="submit"
          onClick={handleCreate}
        >
          Create a new board
        </Button>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default CreateBoardForm;
