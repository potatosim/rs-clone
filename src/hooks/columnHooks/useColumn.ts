import { Collections } from 'enum/Collection';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { IColumnItem } from 'types/Column';
import { columnsConverter } from 'helpers/converters';
import { doc } from 'firebase/firestore';
import { useContext } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export const useColumn = (columnId: string) => {
  const { firestore } = useContext(FirebaseContext);
  const [column, columnLoading] = useDocumentData<IColumnItem>(
    doc(firestore, Collections.Columns, columnId).withConverter(columnsConverter),
  );

  return {
    column,
    columnLoading,
  };
};
