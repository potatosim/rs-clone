import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { IBoardItem } from 'types/Board';
import { IColumnItem } from 'types/Column';
import { ITaskItem } from 'types/Task';
import { IUserItem } from 'types/User';
import { ITheme } from 'types/Theme';

export const boardsConverter: FirestoreDataConverter<IBoardItem> = {
  toFirestore(board: WithFieldValue<IBoardItem>): DocumentData {
    return board;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): IBoardItem {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id } as IBoardItem;
  },
};

export const columnsConverter: FirestoreDataConverter<IColumnItem> = {
  toFirestore(board: WithFieldValue<IColumnItem>): DocumentData {
    return board;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): IColumnItem {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id } as IColumnItem;
  },
};

export const tasksConverter: FirestoreDataConverter<ITaskItem> = {
  toFirestore(board: WithFieldValue<ITaskItem>): DocumentData {
    return board;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ITaskItem {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id } as ITaskItem;
  },
};

export const usersConverter: FirestoreDataConverter<IUserItem> = {
  toFirestore(board: WithFieldValue<IUserItem>): DocumentData {
    return board;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): IUserItem {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id } as IUserItem;
  },
};

export const themeConverter: FirestoreDataConverter<ITheme> = {
  toFirestore(theme: WithFieldValue<ITheme>): DocumentData {
    return theme;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ITheme {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id } as ITheme;
  },
};
