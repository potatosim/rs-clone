import { Button, FormLabel, Tab, Tabs, TextField } from '@mui/material';
import React, { ChangeEvent, FC, useRef, useState } from 'react';

import { BackgroundType } from 'types/Background';
import TabPanel from 'components/TabPanel/TabPanel';
import UploadIcon from '@mui/icons-material/Upload';
import styled from '@emotion/styled';
import { useAddBoard } from 'hooks/boardHooks/useAddBoard';
import { ModalWrapper } from 'components/common/ModalWrapper';
import { FormWrapper } from 'components/common/FormWrapper';

const StyledTab = styled(Tab)`
  font-weight: 600;
  font-size: 1rem;
`;

const UploadButton = styled(Button)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadLabel = styled(FormLabel)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  color: inherit;
`;

interface CreateBoardFormProps {
  isModalOpen: boolean;
  handleClose: () => void;
}

const CreateBoardForm: FC<CreateBoardFormProps> = ({ isModalOpen, handleClose }) => {
  const [title, setTitle] = useState<string>('');
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('color');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [file, setFile] = useState<FileList | null>(null);
  const colorRef = useRef<HTMLInputElement | null>(null);

  const handleAddBoard = useAddBoard({
    title,
    backgroundType,
    colorRef,
    file,
    isPrivate,
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
    <ModalWrapper open={isModalOpen} onClose={handleClose}>
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
          <UploadButton variant="contained" startIcon={<UploadIcon />}>
            Upload
            <UploadLabel>
              <TextField
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files)}
                sx={{ display: 'none' }}
              />
            </UploadLabel>
          </UploadButton>
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
