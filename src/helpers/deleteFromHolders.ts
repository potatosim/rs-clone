import { UserContext } from 'components/RequireAuth';
import { Collections } from 'enum/Collection';
import { arrayRemove, doc, Firestore, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';

export const deleteFromHolders = (firestore: Firestore, id: string, uid: string) => {
  updateDoc(doc(firestore, Collections.Themes, id), {
    holders: arrayRemove(uid),
  });
};
