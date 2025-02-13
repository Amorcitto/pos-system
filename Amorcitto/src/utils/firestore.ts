import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

// Add a product with stock quantity
export const addProduct = async (name: string, price: number, stock: number) => {
  await addDoc(collection(db, "products"), { name, price, stock });
};

// Update stock when an item is sold
export const updateStock = async (productId: string, newStock: number) => {
  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, { stock: newStock });
};

// Fetch all products
export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
