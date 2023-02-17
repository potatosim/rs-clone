import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  query,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

import { Collections } from 'enum/Collection';
import { DnDTypes } from 'enum/DnDTypes';
import { DropResult } from 'react-beautiful-dnd';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { ITaskItem } from 'types/Task';
import { boardsConverter, columnsConverter, tasksConverter } from 'helpers/converters';
import { reorderArray } from 'helpers/reorderArray';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useContext } from 'react';
import { deleteDocuments } from 'helpers/deleteDocuments';
import { getDocumentsByMatchedKey } from 'helpers/getDocumentsWithId';
import { IColumnItem } from 'types/Column';
import { UserContext } from 'components/RequireAuth';
import { IBoardItem } from 'types/Board';

export const useColumns = (boardId: string) => {
  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const deleteDocumentsFrom = deleteDocuments(firestore);
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
        const columnRef = doc(firestore, Collections.Columns, column.id).withConverter(
          columnsConverter,
        );
        batch.update<IColumnItem>(columnRef, {
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
          const tasks = await getDocumentsByMatchedKey({
            firestore,
            collectionName: Collections.Tasks,
            converter: tasksConverter,
            keyName: 'columnId',
            targetId: currentColumn.id,
          });

          const reorderedTasks = reorderArray(tasks, source.index, destination.index).map(
            (item, id) => ({ ...item, order: id }),
          );

          reorderedTasks.map((task, id) => {
            const taskRef = doc(firestore, Collections.Tasks, task.id).withConverter(
              tasksConverter,
            );
            batch.update<ITaskItem>(taskRef, {
              order: id,
            });
          });

          await batch.commit();
        }
      } else {
        const sourceColumnRef = doc(
          firestore,
          Collections.Columns,
          source.droppableId,
        ).withConverter(columnsConverter);
        const destinationColumnRef = doc(
          firestore,
          Collections.Columns,
          destination.droppableId,
        ).withConverter(columnsConverter);
        const targetTaskRef = doc(firestore, Collections.Tasks, draggableId).withConverter(
          tasksConverter,
        );
        const prevColumn = columns.find((col) => col.id === source.droppableId);
        const newColumn = columns.find((col) => col.id === destination.droppableId);

        const sourceTasks = await getDocumentsByMatchedKey({
          firestore,
          collectionName: Collections.Tasks,
          converter: tasksConverter,
          keyName: 'columnId',
          targetId: source.droppableId,
        });
        const destinationTasks = await getDocumentsByMatchedKey({
          firestore,
          collectionName: Collections.Tasks,
          converter: tasksConverter,
          keyName: 'columnId',
          targetId: destination.droppableId,
        });

        const batch = writeBatch(firestore);

        sourceTasks
          .filter((task) => task.id !== draggableId)
          .map((task, id) => {
            const taskRef = doc(firestore, Collections.Tasks, task.id).withConverter(
              tasksConverter,
            );
            batch.update<ITaskItem>(taskRef, {
              order: id,
            });
          });

        batch.update<IColumnItem>(sourceColumnRef, {
          tasks: arrayRemove(draggableId),
        });

        destinationTasks.splice(destination.index, 0, {
          columnId: destination.droppableId,
          id: draggableId,
          order: destination.index,
        } as ITaskItem);

        destinationTasks.map((task, id) => {
          const taskRef = doc(firestore, Collections.Tasks, task.id).withConverter(tasksConverter);
          batch.update<ITaskItem>(taskRef, {
            order: id,
          });
        });

        batch.update<ITaskItem>(targetTaskRef, {
          columnId: destination.droppableId,
          order: destination.index,
          history: arrayUnion({
            initiator: user.id,
            action: 'statusChanged',
            from: prevColumn?.title,
            to: newColumn?.title,
            time: new Date().toLocaleString(),
          }),
        });

        batch.update<IColumnItem>(destinationColumnRef, {
          tasks: arrayUnion(draggableId),
        });

        await batch.commit();
      }
    }
  };

  const handleDeleteColumn = async (columnId: string) => {
    if (columns) {
      const targetColumn = columns.find((column) => column.id === columnId);

      if (targetColumn) {
        const batch = writeBatch(firestore);
        batch.delete(doc(firestore, Collections.Columns, columnId));

        batch.update<IBoardItem>(
          doc(firestore, Collections.Boards, boardId).withConverter(boardsConverter),
          {
            columns: arrayRemove(columnId),
          },
        );

        columns
          .filter((column) => column.id !== columnId)
          .map((column, id) => {
            const columnRef = doc(firestore, Collections.Columns, column.id).withConverter(
              columnsConverter,
            );
            batch.update<IColumnItem>(columnRef, {
              order: id,
            });
          });

        deleteDocumentsFrom(batch, Collections.Tasks, targetColumn.tasks);

        await batch.commit();
      }
    }
  };

  const handleRenameColumn = async (title: string, columnId: string) => {
    await updateDoc<IColumnItem>(
      doc(firestore, Collections.Columns, columnId).withConverter(columnsConverter),
      {
        title,
      },
    );
  };

  return {
    columnsItems: columns,
    columnsLoading: loading,
    updateOrder,
    handleDeleteColumn,
    handleRenameColumn,
  };
};
