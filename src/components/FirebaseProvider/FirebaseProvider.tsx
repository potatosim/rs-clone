import './firebase';

import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import React, { FC, ReactElement, ReactNode, createContext } from 'react';

const auth = getAuth();
const firestore = getFirestore();

interface IFirebaseContext {
  auth: Auth;
  firestore: Firestore;
}

export const FirebaseContext = createContext<IFirebaseContext>({
  auth,
  firestore,
});

interface FirebaseProviderProps {
  children: ReactNode | ReactElement;
}

const FirebaseProvider: FC<FirebaseProviderProps> = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, firestore }}>{children}</FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
