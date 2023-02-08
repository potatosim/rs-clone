import { Collections } from 'enum/Collection';
import { collection, Firestore, getDocs, query, where } from 'firebase/firestore';

import { tasksConverter } from './converters';
import { sortByOrder } from './sortByOrder';

export const getTasksArray = async (firestore: Firestore, columnId: string) => {
  const taskDocs = await getDocs(
    query(
      collection(firestore, Collections.Tasks).withConverter(tasksConverter),
      where('columnId', '==', columnId),
    ),
  );
  const data = taskDocs.docs.map((task) => ({ ...task.data() }));

  return sortByOrder(data);
};
