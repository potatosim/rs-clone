import { IUserItem } from './User';

export type CommentItem = {
  author: IUserItem;
  message: string;
  createdAt: string;
};
