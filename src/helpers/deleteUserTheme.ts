import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { arrayRemove, doc, Firestore, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';

export const deleteUserTheme = (firestore: Firestore, id: string) => {
  updateDoc(doc(firestore, Collections.Users, 'dtkL6o320t70FceVT0QA'), {
    availableThemes: arrayRemove(id),
  });
};
