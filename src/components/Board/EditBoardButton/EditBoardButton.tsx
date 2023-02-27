import { Button } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import BoardForm from 'components/Board/BoardForm';
import { IBoardItem } from 'types/Board';
import { useUpdateBoard } from 'hooks/boardHooks/useUpdateBoard';
import { ButtonTranslationKeys, TranslationNameSpaces } from 'enum/Translations';
import { useTranslation } from 'react-i18next';

interface EditBoardButtonProps {
  board: IBoardItem;
}

const EditBoardButton = ({ board }: EditBoardButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateBoard = useUpdateBoard();

  const { t: translate } = useTranslation(TranslationNameSpaces.Buttons);

  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => setIsModalOpen(true)}
        startIcon={<EditIcon />}
      >
        {translate(ButtonTranslationKeys.Edit)}
      </Button>
      {isModalOpen && (
        <BoardForm
          board={board}
          buttonTitle={translate(ButtonTranslationKeys.SaveChanges)}
          handleSubmit={(newBoard) => updateBoard(board, newBoard)}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default EditBoardButton;
