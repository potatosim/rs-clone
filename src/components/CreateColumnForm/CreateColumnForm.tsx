import React, { FC, useState } from 'react';

import Button from '@mui/material/Button';
import { FormWrapper } from 'components/common/FormWrapper';
import { ModalWrapper } from 'components/common/ModalWrapper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAddColumn } from 'hooks/columnHooks/useAddColumn';
import { useTranslation } from 'react-i18next';
import {
  ButtonTranslationKeys,
  InputsTranslationKeys,
  TranslationNameSpaces,
  TypographyTranslationKeys,
} from 'enum/Translations';

interface CreateColumnFormProps {
  boardId: string;
  isModalOpen: boolean;
  handleClose: () => void;
  columnLength: number;
}

const CreateColumnForm: FC<CreateColumnFormProps> = ({
  isModalOpen,
  handleClose,
  boardId,
  columnLength,
}) => {
  const [columnTitle, setColumnTitle] = useState<string>('');
  const addColumn = useAddColumn(columnTitle, boardId, columnLength);

  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Inputs,
    TranslationNameSpaces.Typography,
  ]);

  const handleCreateColumn = async () => {
    handleClose();
    setColumnTitle('');
    await addColumn();
  };

  return (
    <ModalWrapper open={isModalOpen} onClose={handleClose}>
      <FormWrapper>
        <Typography>
          {translate(TypographyTranslationKeys.AddNewColumn, {
            ns: TranslationNameSpaces.Typography,
          })}
        </Typography>
        <TextField
          color="secondary"
          value={columnTitle}
          required
          label={translate(InputsTranslationKeys.TitleOfTheColumn, {
            ns: TranslationNameSpaces.Inputs,
          })}
          onChange={(e) => setColumnTitle(e.target.value)}
          size="small"
        />

        <Button
          color="secondary"
          disabled={!columnTitle.trim().length}
          variant="outlined"
          type="submit"
          onClick={handleCreateColumn}
        >
          {translate(ButtonTranslationKeys.Add, { ns: TranslationNameSpaces.Buttons })}
        </Button>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default CreateColumnForm;
