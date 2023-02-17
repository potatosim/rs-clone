import { Priorities } from 'enum/Priorities';
import { Sizes } from 'enum/Sizes';
import { ICommentItem } from './CommentItem';
import { HistoryItem } from './HistoryItem';

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
  comments: ICommentItem[];
  assignee: string | null;
}
