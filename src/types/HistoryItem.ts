export type HistoryItem =
  | HistoryCreated
  | HistoryStatusChanged
  | HistoryPriorityChanged
  | HistorySizeChanged
  | HistoryTitleChanged
  | HistoryAssigneeChanged
  | HistoryDescriptionChanged;

type HistoryCreated = {
  initiator: string;
  action: 'created';
  time: string;
};

type UpdateHistoryItem = {
  initiator: string;
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
  assigneeId: string;
} & UpdateHistoryItem;
