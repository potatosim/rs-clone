import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FC, useContext, useState } from 'react';
import { Background } from 'types/Background';
import MenuListComposition from 'components/MenuListComposition';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Collections } from 'enum/Collection';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import { BackgroundWrapper } from 'components/common/BackgroundWrapper';

interface BoardItemProps {
  id: string;
  title: string;
  background: Background;
}

const CardWrapper = styled(Paper)`
  min-height: 6rem;
  width: 15%;
  min-width: 270px;
  cursor: pointer;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const CardHeader = styled(Paper)`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 0.5rem;
  background-color: transparent;
`;

const BoardCard: FC<BoardItemProps> = ({ id, title, background }) => {
  const { firestore } = useContext(FirebaseContext);
  const [newTitle, setNewTitle] = useState(title);
  const [isChangeTitle, setIsChangeTitle] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (docId: string) => {
    await deleteDoc(doc(firestore, Collections.Boards, docId));
  };

  const handleRename = () => {
    setIsChangeTitle(true);
  };

  const handleCloseRename = () => {
    setIsChangeTitle(false);
    setNewTitle(title);
  };

  const handleUpdateTitle = async () => {
    setIsChangeTitle(false);

    await updateDoc(doc(firestore, Collections.Boards, id), {
      title: newTitle,
    });
  };

  const isButtonDisabled = newTitle === title || !newTitle.trim().length;

  const renderHeader = () => {
    if (isChangeTitle) {
      return (
        <>
          <TextField
            size="small"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton disabled={isButtonDisabled} onClick={handleUpdateTitle}>
                  <CheckCircleIcon color={isButtonDisabled ? 'disabled' : 'success'} />
                </IconButton>
              ),
            }}
          />
          <IconButton onClick={handleCloseRename}>
            <CancelIcon color="error" />
          </IconButton>
        </>
      );
    }
    return (
      <>
        <Typography>{title}</Typography>
        <MenuListComposition
          handleRenameClick={handleRename}
          handleDeleteBoard={() => handleDelete(id)}
        />
      </>
    );
  };

  return (
    <CardWrapper elevation={12} onClick={() => navigate(AppRoutes.Board.replace(':boardId', id))}>
      <CardHeader
        elevation={12}
        onClick={(e) => {
          if (isChangeTitle) {
            e.stopPropagation();
          }
        }}
      >
        {renderHeader()}
      </CardHeader>
      <BackgroundWrapper bg={background} />
    </CardWrapper>
  );
};

export default BoardCard;
