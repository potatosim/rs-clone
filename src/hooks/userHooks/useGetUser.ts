import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { doc } from 'firebase/firestore';
import { usersConverter } from 'helpers/converters';
import { useContext } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { IUserItem } from 'types/User';

export const useGetUser = (id: string) => {
  const { firestore } = useContext(FirebaseContext);

  const [userFromFirestore, userLoading] = useDocumentData<IUserItem>(
    doc(firestore, Collections.Users, id).withConverter(usersConverter),
  );

  return { userFromFirestore, userLoading };
};
