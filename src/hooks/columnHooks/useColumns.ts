import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';

import { Collections } from 'enum/Collection';
import { DnDTypes } from 'enum/DnDTypes';
import { DropResult } from 'react-beautiful-dnd';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { ITaskItem } from 'types/Task';
import { columnsConverter } from 'helpers/converters';
import { getTasksArray } from 'helpers/getTasksArray';
import { reorderArray } from 'helpers/reorderArray';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useContext } from 'react';

export const useColumns = (columnIds: string[], boardId: string) => {
  const { firestore } = useContext(FirebaseContext);
  const [columns, loading] = useCollectionData(
    query(
      collection(firestore, Collections.Columns).withConverter(columnsConverter),
      where('boardId', '==', boardId),
    ),
  );

  const updateOrder = async (dropResult: DropResult) => {
    if (columns) {
      const { destination, source, type } = dropResult;

      if (type === DnDTypes.Task) {
        return updateTaskOrder(dropResult);
      }

      if (!destination || destination.index === source.index) {
        return;
      }

      const batch = writeBatch(firestore);

      const reorderedColumns = reorderArray(columns, source.index, destination.index).map(
        (item, id) => ({ ...item, order: id }),
      );

      reorderedColumns.map((column, id) => {
        const columnRef = doc(firestore, Collections.Columns, column.id);
        batch.update(columnRef, {
          order: id,
        });
      });

      await batch.commit();
    }
  };

  const updateTaskOrder = async (dropResult: DropResult) => {
    if (columns) {
      const { destination, source, draggableId } = dropResult;

      if (
        !destination ||
        (destination.index === source.index && source.droppableId === destination.droppableId)
      ) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        const currentColumn = columns.find((column) => column.id === destination.droppableId);
        const batch = writeBatch(firestore);

        if (currentColumn && currentColumn.tasks.length) {
          const tasks = await getTasksArray(firestore, source.droppableId);

          const reorderedTasks = reorderArray(tasks, source.index, destination.index).map(
            (item, id) => ({ ...item, order: id }),
          );

          reorderedTasks.map((task, id) => {
            const taskRef = doc(firestore, Collections.Tasks, task.id);
            batch.update(taskRef, {
              order: id,
            });
          });

          await batch.commit();
        }
      } else {
        const sourceColumnRef = doc(firestore, Collections.Columns, source.droppableId);
        const destinationColumnRef = doc(firestore, Collections.Columns, destination.droppableId);
        const targetTaskRef = doc(firestore, Collections.Tasks, draggableId);

        const sourceTasks = await getTasksArray(firestore, source.droppableId);
        const destinationTasks = await getTasksArray(firestore, destination.droppableId);
        const batch = writeBatch(firestore);

        sourceTasks
          .filter((task) => task.id !== draggableId)
          .map((task, id) => {
            const taskRef = doc(firestore, Collections.Tasks, task.id);
            batch.update(taskRef, {
              order: id,
            });
          });

        batch.update(sourceColumnRef, {
          tasks: arrayRemove(draggableId),
        });

        destinationTasks.splice(destination.index, 0, {
          columnId: destination.droppableId,
          id: draggableId,
          order: destination.index,
        } as ITaskItem);

        destinationTasks.map((task, id) => {
          const taskRef = doc(firestore, Collections.Tasks, task.id);
          batch.update(taskRef, {
            order: id,
          });
        });

        batch.update(targetTaskRef, {
          columnId: destination.droppableId,
          order: destination.index,
        });

        batch.update(destinationColumnRef, {
          tasks: arrayUnion(draggableId),
        });

        await batch.commit();
      }
    }
  };

  return {
    columnsItems: columns,
    columnsLoading: loading,
    updateOrder,
  };
};
