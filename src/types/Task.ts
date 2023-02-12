import { HistoryItem } from './HistoryItem';

export interface ITaskItem {
  id: string;
  title: string;
  description: string;
  order: number;
  columnId: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  size: 'X-Large' | 'Large' | 'Medium' | 'Small' | 'Tiny';
  history: HistoryItem[];
}
