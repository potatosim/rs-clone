import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { query, collection, where, documentId, getDocs, doc, updateDoc } from 'firebase/firestore';
import { reorderArray } from 'helpers/reorderArray';
import { useContext, useState, useEffect } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { IColumnItem } from 'types/Column';

export const useColumns = (columnIds?: string[]) => {
  const { firestore } = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState<IColumnItem[]>([]);

  const getColumns = async () => {
    setIsLoading(true);
    const columnItems = await getDocs(
      query(collection(firestore, Collections.Columns), where(documentId(), 'in', columnIds)),
    );

    const docs = (
      columnItems.docs.map((columnDoc) => ({
        ...columnDoc.data(),
        id: columnDoc.id,
      })) as IColumnItem[]
    ).sort((a, b) => a.order - b.order);

    setColumns(docs);

    setIsLoading(false);
  };

  const updateOrder = async ({ destination, source }: DropResult) => {
    if (!destination || destination.index === source.index) {
      return;
    }

    setIsLoading(true);

    const reorderedColumns = reorderArray(columns, source.index, destination.index);

    setColumns(reorderedColumns);

    await Promise.all(
      reorderedColumns.map((column, id) =>
        updateDoc(doc(firestore, Collections.Columns, column.id), {
          order: id,
        }),
      ),
    );

    setIsLoading(false);
  };

  useEffect(() => {
    if (columnIds && columnIds.length) {
      getColumns();
    } else {
      setColumns([]);
    }
  }, [columnIds]);

  return {
    columns,
    columnsLoading: isLoading,
    updateOrder,
  };
};
