import { Collections } from 'enum/Collection';
import {
  Firestore,
  getDocs,
  query,
  collection,
  where,
  FirestoreDataConverter,
} from 'firebase/firestore';
import { sortByOrder } from './sortByOrder';

export const getDocumentsByMatchedKey = async <T extends { order: number }>({
  collectionName,
  firestore,
  targetId,
  converter,
  keyName,
}: {
  firestore: Firestore;
  collectionName: Collections;
  keyName: 'columnId' | 'boardId';
  targetId: string;
  converter: FirestoreDataConverter<T>;
}) => {
  const taskDocs = await getDocs(
    query(
      collection(firestore, collectionName).withConverter(converter),
      where(keyName, '==', targetId),
    ),
  );
  const data = taskDocs.docs.map((task) => ({ ...task.data() }));

  return sortByOrder(data);
};
