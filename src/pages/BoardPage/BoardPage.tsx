import Board from 'components/Board';
import { CircularProgress } from '@mui/material';
import React, { useContext } from 'react';
import { useBoard } from 'hooks/boardHooks/useBoard';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from 'components/RequireAuth';
import { AppRoutes } from 'enum/AppRoutes';
import NotFoundElement from 'components/NotFoundElement';
import { useTranslation } from 'react-i18next';
import {
  ButtonTranslationKeys,
  TranslationNameSpaces,
  TypographyTranslationKeys,
} from 'enum/Translations';

const BoardPage = () => {
  const { boardId } = useParams();
  const { board, boardLoading } = useBoard(boardId!);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Typography,
  ]);

  if (boardLoading) {
    // TODO make this shit beautiful
    return <CircularProgress />;
  }

  if (!board) {
    return (
      <NotFoundElement
        buttonText={translate(ButtonTranslationKeys.ToMyBoards)}
        notification={translate(TypographyTranslationKeys.BoardExist, {
          ns: TranslationNameSpaces.Typography,
        })}
        onClick={() => {
          navigate(AppRoutes.Boards);
        }}
      ></NotFoundElement>
    );
  }

  if (!board.allowedUsers.some((allowedUser) => allowedUser === user.id)) {
    return (
      <NotFoundElement
        buttonText={translate(ButtonTranslationKeys.ToMyBoards)}
        notification={translate(TypographyTranslationKeys.PermissionToBoard, {
          ns: TranslationNameSpaces.Typography,
        })}
        onClick={() => {
          navigate(AppRoutes.Boards);
        }}
      ></NotFoundElement>
    );
  } else {
    return <Board {...board} />;
  }
};

export default React.memo(BoardPage);
