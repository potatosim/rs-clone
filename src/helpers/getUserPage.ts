import { AppRoutes } from 'enum/AppRoutes';

export const getUserPage = (userId?: string) =>
  AppRoutes.AccountPage.replace(':accountId', userId || '');
