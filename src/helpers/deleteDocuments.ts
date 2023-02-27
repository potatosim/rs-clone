import { Collections } from 'enum/Collection';
import { doc, Firestore, WriteBatch } from 'firebase/firestore';

export const deleteDocuments = (firestore: Firestore) => {
  return (batch: WriteBatch, collectionName: Collections, documents: string[]) => {
    documents.map((document) => {
      const docRef = doc(firestore, collectionName, document);
      batch.delete(docRef);
    });
  };
};
