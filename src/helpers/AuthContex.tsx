// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from 'firebase/auth';
import { createContext, useContext } from 'react';
// import auth from 'components/FirebaseProvider/firebase';

// const UserContext = createContext('');

// export const AuthContextProvider = ({ children }) => {
//   const createUser = (email: any, password: any) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   return <UserContext.Provider value={createUser}>{children}</UserContext.Provider>;
// };

// export const UserAuth = () => {
//   return useContext(UserContext);
// };
export const Context = createContext(null);
export const nothing = () => {};
