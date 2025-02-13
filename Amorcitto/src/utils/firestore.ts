import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const addProduct = async (name: string, price: number) => {
  await addDoc(collection(db, "products"), { name, price });
};

export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
