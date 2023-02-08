import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { IBoardItem } from 'types/Board';
import { IColumnItem } from 'types/Column';

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