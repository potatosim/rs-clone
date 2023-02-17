import './firebase';

import { Auth, getAuth } from 'firebase/auth';
import { doc, Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { FC, ReactElement, ReactNode, createContext } from 'react';
import { IUserItem } from 'types/User';
import { Collections } from 'enum/Collection';
import { usersConverter } from 'helpers/converters';
import { useDocumentData } from 'react-firebase-hooks/firestore';

const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();

interface IFirebaseContext {
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
  user: IUserItem | null;
}

export const FirebaseContext = createContext<IFirebaseContext>({
  auth,
  firestore,
  storage,
  user: null,
});

interface FirebaseProviderProps {
  children: ReactNode | ReactElement;
}

const FirebaseProvider: FC<FirebaseProviderProps> = ({ children }) => {
  const [user] = useDocumentData<IUserItem>(
    doc(firestore, Collections.Users, auth?.currentUser?.uid || 'userId').withConverter(
      usersConverter,
    ),
  );

  return (
    <FirebaseContext.Provider value={{ auth, firestore, storage, user: user || null }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
