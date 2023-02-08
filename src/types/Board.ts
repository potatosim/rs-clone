import { Background } from './Background';

export interface IBoardItem {
  title: string;
  allowedUsers: string[];
  columns: string[];
  private: boolean;
  background: Background;
  id: string;
}
