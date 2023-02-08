import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { query, collection, where, documentId, getDocs } from 'firebase/firestore';
import { useContext, useState, useEffect } from 'react';
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

    const docs = columnItems.docs.map((columnDoc) => ({
      ...columnDoc.data(),
      id: columnDoc.id,
    })) as IColumnItem[];

    setColumns(docs);

    setIsLoading(false);
  };

  useEffect(() => {
    if (columnIds && columnIds.length) {
      getColumns();
    }
  }, [columnIds]);

  return {
    columns,
    columnsLoading: isLoading,
  };
};
