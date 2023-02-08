import './firebase';

import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import React, { FC, ReactElement, ReactNode, createContext } from 'react';

const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();

interface IFirebaseContext {
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
}

export const FirebaseContext = createContext<IFirebaseContext>({
  auth,
  firestore,
  storage,
});

interface FirebaseProviderProps {
  children: ReactNode | ReactElement;
}

const FirebaseProvider: FC<FirebaseProviderProps> = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, firestore, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
