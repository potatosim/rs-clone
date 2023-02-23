import { Firestore, addDoc, collection } from 'firebase/firestore';

export const createDefaultThemes = async (firestore: Firestore) => {
  addDoc(collection(firestore, 'themes'), {
    creator: 'system',
    name: 'Light Theme',
    primary: '#1976d2',
    secondary: '#9c27b0',
    isPublic: false,
    holders: [],
  });
  addDoc(collection(firestore, 'themes'), {
    creator: 'system',
    name: 'Dark Theme',
    primary: '#1976d2',
    secondary: '#9c27b0',
    isPublic: false,
    holders: [],
  });
};
