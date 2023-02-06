import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { FC, useContext } from 'react';
import { Background } from 'types/Background';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Collections } from 'enum/Collection';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import { BackgroundWrapper } from 'components/common/BackgroundWrapper';
import CardHeader from 'components/CardHeader';

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

const BoardCard: FC<BoardItemProps> = ({ id, title, background }) => {
  const { firestore } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteDoc(doc(firestore, Collections.Boards, id));
  };

  const handleUpdateTitle = async (boardTitle: string) => {
    await updateDoc(doc(firestore, Collections.Boards, id), {
      title: boardTitle,
    });
  };

  return (
    <CardWrapper elevation={12} onClick={() => navigate(AppRoutes.Board.replace(':boardId', id))}>
      <CardHeader
        padding="0.5rem 1rem"
        cardTitle={title}
        handleDelete={handleDelete}
        handleUpdate={handleUpdateTitle}
      />
      <BackgroundWrapper bg={background} />
    </CardWrapper>
  );
};

export default BoardCard;
