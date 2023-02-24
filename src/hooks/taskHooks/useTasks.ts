import { tasksConverter } from 'helpers/converters';
import { Collections } from 'enum/Collection';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { query, collection, where } from 'firebase/firestore';
import { useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { sortByOrder } from 'helpers/sortByOrder';

export const useTasks = (columnId: string) => {
  const { firestore } = useContext(FirebaseContext);

  const [tasks, loading] = useCollectionData(
    query(
      collection(firestore, Collections.Tasks).withConverter(tasksConverter),
      where('columnId', '==', columnId),
    ),
  );

  return {
    tasks: sortByOrder(tasks),
    tasksLoading: loading,
  };
};
