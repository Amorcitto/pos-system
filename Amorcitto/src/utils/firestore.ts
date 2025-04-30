// src/utils/firestore.ts

import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";

// Get all products
export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// update product
export const updateProduct = async (id: string, data: any) => {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, data);
};
// Record sale and update stock
export const recordSale = async (
  productId: string,
  name: string,
  price: number,
  quantity: number,
  stock: number
) => {
  if (quantity > stock) throw new Error("Not enough stock!");

  await addDoc(collection(db, "sales"), {
    productId,
    name,
    price,
    quantity,
    total: price * quantity,
    timestamp: new Date(),
  });

  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, { stock: stock - quantity });
};
