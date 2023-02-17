import { Priorities } from 'enum/Priorities';
import { Sizes } from 'enum/Sizes';
import { CommentItem } from './CommentItem';
import { HistoryItem } from './HistoryItem';
import { IUserItem } from './User';

export interface ITaskItem {
  id: string;
  title: string;
  description: string;
  order: number;
  columnId: string;
  boardId: string;
  priority: Priorities;
  size: Sizes;
  history: HistoryItem[];
  comments: CommentItem[];
  assignee: IUserItem | null;
}
