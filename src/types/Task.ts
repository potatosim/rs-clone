import { Priorities } from 'enum/Priorities';
import { Sizes } from 'enum/Sizes';
import { CommentItem } from './CommentItem';
import { HistoryItem } from './HistoryItem';

export interface ITaskItem {
  id: string;
  title: string;
  description: string;
  order: number;
  columnId: string;
  priority: Priorities;
  size: Sizes;
  history: HistoryItem[];
  comments: CommentItem[];
}
