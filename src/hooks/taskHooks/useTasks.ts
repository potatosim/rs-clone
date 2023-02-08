import { Collections } from 'enum/Collection';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { getDoc, doc } from 'firebase/firestore';
import { useContext, useState, useEffect } from 'react';
import { ITaskItem } from 'types/Task';

export const useTasks = (taskIds?: string[]) => {
  const { firestore } = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<ITaskItem[]>([]);

  const getTasks = async () => {
    setIsLoading(true);

    const taskDocs = await Promise.all(
      taskIds!.map((taskId) => getDoc(doc(firestore, Collections.Tasks, taskId))),
    );
    const data = taskDocs.map((task) => ({ ...task.data(), id: task.id })) as ITaskItem[];

    setTasks(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (taskIds && taskIds.length) {
      getTasks();
    }
  }, [taskIds]);

  return {
    tasks,
    tasksLoading: isLoading,
  };
};
