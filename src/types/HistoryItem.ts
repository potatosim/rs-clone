import { IUserItem } from './User';

export type HistoryItem =
  | HistoryCreated
  | HistoryStatusChanged
  | HistoryPriorityChanged
  | HistorySizeChanged
  | HistoryTitleChanged
  | HistoryAssigneeChanged
  | HistoryDescriptionChanged;

type HistoryCreated = {
  initiator: IUserItem;
  action: 'created';
  time: string;
};

type UpdateHistoryItem = {
  initiator: IUserItem;
  time: string;
  from: string;
  to: string;
};

type HistoryStatusChanged = {
  action: 'statusChanged';
} & UpdateHistoryItem;

type HistoryPriorityChanged = {
  action: 'priorityChanged';
} & UpdateHistoryItem;

type HistorySizeChanged = {
  action: 'sizeChanged';
} & UpdateHistoryItem;

type HistoryTitleChanged = {
  action: 'titleChanged';
} & UpdateHistoryItem;

type HistoryDescriptionChanged = {
  action: 'descriptionChanged';
} & UpdateHistoryItem;

type HistoryAssigneeChanged = {
  action: 'assigneeChanged';
} & UpdateHistoryItem;
