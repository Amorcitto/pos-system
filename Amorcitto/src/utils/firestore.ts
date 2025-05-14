// src/utils/firestore.ts

import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

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
// Add  New Customer
export const addCustomer = async (data: {
  name: string;
  gender: string;
  dob: string;
  phone: string;
  email: string;
  loyaltyPoints?: number;
}) => {
  await addDoc(collection(db, "Customers"),{
    ...data,
    customerId: uuidv4(),
    loyaltyPoints: data.loyaltyPoints ?? 0,
    createdAt: new Date(),
  });
};
// Get All Customers
export const getCustomers = async () => {
  const snapshot =await getDocs(collection(db, "customers"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}))
};
