import './firebase';

import { Auth, getAuth } from 'firebase/auth';
import { doc, Firestore, getDoc, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { FC, ReactElement, ReactNode, createContext, useState, useEffect } from 'react';
import { IUserItem } from 'types/User';
import { Collections } from 'enum/Collection';
import { usersConverter } from 'helpers/converters';

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
  const [user, setUser] = useState<IUserItem | null>(null);

  const getUser = async () => {
    if (auth.currentUser) {
      const usrDoc = await getDoc<IUserItem>(
        doc(firestore, Collections.Users, auth.currentUser.uid).withConverter(usersConverter),
      );
      const usr = await usrDoc.data();
      if (usr) {
        setUser(usr);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      getUser();
    });
  }, []);
  return (
    <FirebaseContext.Provider value={{ auth, firestore, storage, user }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
