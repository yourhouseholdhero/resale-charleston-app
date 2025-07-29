import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const addItemToDatabase = async (itemData) => {
  const itemsRef = collection(db, 'items');
  await addDoc(itemsRef, itemData);
};

export const fetchOwners = async () => {
  const snapshot = await getDocs(collection(db, 'owners'));
  return snapshot.docs.map(doc => doc.data().name);
};

export const fetchRooms = async () => {
  const snapshot = await getDocs(collection(db, 'rooms'));
  return snapshot.docs.map(doc => doc.data().name);
};
