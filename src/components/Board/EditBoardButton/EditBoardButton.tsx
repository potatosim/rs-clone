import { Button } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import BoardForm from 'components/Board/BoardForm';
import { IBoardItem } from 'types/Board';
import { useUpdateBoard } from 'hooks/boardHooks/useUpdateBoard';

interface EditBoardButtonProps {
  board: IBoardItem;
}

const EditBoardButton = ({ board }: EditBoardButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateBoard = useUpdateBoard();

  return (
    <>
      <Button color="secondary" onClick={() => setIsModalOpen(true)} startIcon={<EditIcon />}>
        Edit
      </Button>
      {isModalOpen && (
        <BoardForm
          board={board}
          buttonTitle="Save Changes"
          handleSubmit={(newBoard) => updateBoard(board, newBoard)}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default EditBoardButton;
