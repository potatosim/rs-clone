import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import { Collections } from 'enum/Collection';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import {
  arrayRemove,
  doc,
  updateDoc,
  writeBatch,
  arrayUnion,
  getDoc,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';
import { useContext } from 'react';
import { ITaskItem } from 'types/Task';
import { tasksConverter } from 'helpers/converters';
import { getDocumentsByMatchedKey } from 'helpers/getDocumentsWithId';
import { HistoryItem } from 'types/HistoryItem';
import { IColumnItem } from 'types/Column';

export const useTask = (taskId: string, columns: IColumnItem[]) => {
  const { firestore } = useContext(FirebaseContext);

  const [task, loading] = useDocumentData<ITaskItem>(
    doc(firestore, Collections.Tasks, taskId).withConverter(tasksConverter),
  );

  const handleUpdateTaskTitle = async (taskTitle: string, id: string) => {
    if (task) {
      await updateDoc<ITaskItem>(
        doc(firestore, Collections.Tasks, id).withConverter(tasksConverter),
        {
          title: taskTitle,
          history: arrayUnion({
            initiator: 'User',
            action: 'titleChanged',
            from: task.title,
            to: taskTitle,
            time: new Date().toLocaleString(),
          } as HistoryItem),
        },
      );
    }
  };

  const handleChangeTaskColumn = async (columnId: string) => {
    if (task) {
      const targetTask = doc(firestore, Collections.Tasks, task.id);
      const previousColumnRef = doc(firestore, Collections.Columns, task.columnId);
      const newColumnRef = doc(firestore, Collections.Columns, columnId);
      const prevColumn = columns.find((col) => col.id === task.columnId);
      const newColumn = columns.find((col) => col.id === columnId);

      //TODO think how we can improve logic below
      const previousColumnTasks = await getDocumentsByMatchedKey({
        firestore,
        collectionName: Collections.Tasks,
        converter: tasksConverter,
        keyName: 'columnId',
        targetId: task.columnId,
      });
      const newColumnTasks = await getDocumentsByMatchedKey({
        firestore,
        collectionName: Collections.Tasks,
        converter: tasksConverter,
        keyName: 'columnId',
        targetId: columnId,
      });

      const batch = writeBatch(firestore);

      batch.update(previousColumnRef, {
        tasks: arrayRemove(task.id),
      });

      batch.update(newColumnRef, {
        tasks: arrayUnion(task.id),
      });

      const updatedPrevious = previousColumnTasks.filter((taskItem) => taskItem.id !== task.id);

      updatedPrevious.map((taskItem, id) => {
        const taskRef = doc(firestore, Collections.Tasks, taskItem.id);
        batch.update(taskRef, {
          order: id,
        });
      });

      batch.update(targetTask, {
        order: newColumnTasks.length,
        history: arrayUnion({
          initiator: 'User',
          action: 'statusChanged',
          from: prevColumn?.title,
          to: newColumn?.title,
          time: new Date().toLocaleString(),
        }),
        columnId,
      });

      await batch.commit();
    }
  };

  const handleChangePriority = async (priority: string, id: string) => {
    await updateDoc(doc(firestore, Collections.Tasks, id), {
      priority,
      history: arrayUnion({
        initiator: 'User',
        action: 'priorityChanged',
        from: task?.priority,
        to: priority,
        time: new Date().toLocaleString(),
      }),
    });
  };

  const handleChangeSize = async (size: string, id: string) => {
    await updateDoc(doc(firestore, Collections.Tasks, id), {
      size,
      history: arrayUnion({
        initiator: 'User',
        action: 'sizeChanged',
        from: task?.size,
        to: size,
        time: new Date().toLocaleString(),
      }),
    });
  };

  return {
    task,
    loading,
    handleUpdateTaskTitle,
    handleChangeTaskColumn,
    handleChangePriority,
    handleChangeSize,
  };
};