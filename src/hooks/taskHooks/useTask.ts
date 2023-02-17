import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Collections } from 'enum/Collection';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { arrayRemove, doc, updateDoc, writeBatch, arrayUnion } from 'firebase/firestore';
import { useContext } from 'react';
import { ITaskItem } from 'types/Task';
import { columnsConverter, tasksConverter } from 'helpers/converters';
import { getDocumentsByMatchedKey } from 'helpers/getDocumentsWithId';
import { HistoryItem } from 'types/HistoryItem';
import { IColumnItem } from 'types/Column';
import { UserContext } from 'components/RequireAuth';

export const useTask = (taskId: string, columns: IColumnItem[]) => {
  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const [task, loading] = useDocumentData<ITaskItem>(
    doc(firestore, Collections.Tasks, taskId).withConverter(tasksConverter),
  );

  const handleUpdateDescription = async (taskDescription: string) => {
    if (task) {
      await updateDoc<ITaskItem>(
        doc(firestore, Collections.Tasks, task.id).withConverter(tasksConverter),
        {
          description: taskDescription,
          history: arrayUnion({
            initiator: user.id,
            action: 'descriptionChanged',
            time: new Date().toLocaleString(),
          } as HistoryItem),
        },
      );
    }
  };

  const handleUpdateTaskTitle = async (taskTitle: string, id: string) => {
    if (task) {
      await updateDoc<ITaskItem>(
        doc(firestore, Collections.Tasks, id).withConverter(tasksConverter),
        {
          title: taskTitle,
          history: arrayUnion({
            initiator: user.id,
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
      const targetTask = doc(firestore, Collections.Tasks, task.id).withConverter(tasksConverter);
      const previousColumnRef = doc(firestore, Collections.Columns, task.columnId).withConverter(
        columnsConverter,
      );
      const newColumnRef = doc(firestore, Collections.Columns, columnId).withConverter(
        columnsConverter,
      );
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

      batch.update<IColumnItem>(previousColumnRef, {
        tasks: arrayRemove(task.id),
      });

      batch.update<IColumnItem>(newColumnRef, {
        tasks: arrayUnion(task.id),
      });

      const updatedPrevious = previousColumnTasks.filter((taskItem) => taskItem.id !== task.id);

      updatedPrevious.map((taskItem, id) => {
        const taskRef = doc(firestore, Collections.Tasks, taskItem.id).withConverter(
          tasksConverter,
        );
        batch.update<ITaskItem>(taskRef, {
          order: id,
        });
      });

      batch.update<ITaskItem>(targetTask, {
        order: newColumnTasks.length,
        history: arrayUnion({
          initiator: user.id,
          action: 'statusChanged',
          from: prevColumn?.title,
          to: newColumn?.title,
          time: new Date().toLocaleString(),
        } as HistoryItem),
        columnId,
      });

      await batch.commit();
    }
  };

  const handleChangePriority = async (priority: ITaskItem['priority'], id: string) => {
    await updateDoc<ITaskItem>(
      doc(firestore, Collections.Tasks, id).withConverter(tasksConverter),
      {
        priority,
        history: arrayUnion({
          initiator: user.id,
          action: 'priorityChanged',
          from: task?.priority,
          to: priority,
          time: new Date().toLocaleString(),
        } as HistoryItem),
      },
    );
  };

  const handleChangeSize = async (size: ITaskItem['size'], id: string) => {
    await updateDoc<ITaskItem>(
      doc(firestore, Collections.Tasks, id).withConverter(tasksConverter),
      {
        size,
        history: arrayUnion({
          initiator: user.id,
          action: 'sizeChanged',
          from: task?.size,
          to: size,
          time: new Date().toLocaleString(),
        } as HistoryItem),
      },
    );
  };

  const handleAddComment = async (message: string) => {
    if (task) {
      await updateDoc<ITaskItem>(
        doc(firestore, Collections.Tasks, task.id).withConverter(tasksConverter),
        {
          comments: arrayUnion({
            author: user.id,
            message: message,
            createdAt: new Date().toLocaleString(),
          }),
        },
      );
    }
  };

  const handleDeleteTask = async () => {
    if (task) {
      const targetColumnTasks = await getDocumentsByMatchedKey({
        firestore,
        collectionName: Collections.Tasks,
        converter: tasksConverter,
        keyName: 'columnId',
        targetId: task.columnId,
      });
      const batch = writeBatch(firestore);

      batch.delete(doc(firestore, Collections.Tasks, task.id));

      batch.update<IColumnItem>(
        doc(firestore, Collections.Columns, task.columnId).withConverter(columnsConverter),
        {
          tasks: arrayRemove(task.id),
        },
      );

      const updatedColumn = targetColumnTasks.filter((taskItem) => taskItem.id !== task.id);

      updatedColumn.map((taskItem, id) => {
        const taskRef = doc(firestore, Collections.Tasks, taskItem.id).withConverter(
          tasksConverter,
        );
        batch.update<ITaskItem>(taskRef, {
          order: id,
        });
      });

      await batch.commit();
    }
  };

  return {
    task,
    loading,
    handleUpdateTaskTitle,
    handleUpdateDescription,
    handleChangeTaskColumn,
    handleChangePriority,
    handleChangeSize,
    handleDeleteTask,
    handleAddComment,
  };
};
