import { AppRoutes } from 'enum/AppRoutes';

export const getBoardPageUrl = (boardId?: string) =>
  AppRoutes.Board.replace(':boardId', boardId || '');
