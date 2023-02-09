import { Background } from './Background';

export interface IBoardItem {
  title: string;
  allowedUsers: string[];
  columns: string[];
  background: Background;
  id: string;
}
