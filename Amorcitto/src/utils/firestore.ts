import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// Get all products
export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update product
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
  stock: number,
  customerId?: string,
  applyLoyalty: boolean = false,
) => {
  if (quantity > stock) throw new Error("Not enough stock!");

  const total = price * quantity;

  await addDoc(collection(db, "sales"), {
    productId,
    name,
    price,
    quantity,
    total,
    timestamp: new Date(),
    customerId: customerId || null,
  });

  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, { stock: stock - quantity });

  if (customerId) {
    const customerRef = doc(db, "customers", customerId);
    const customerDoc = await getDoc(customerRef);
    if (customerDoc.exists()) {
      const customerData = customerDoc.data();
      const loyaltyPoints = applyLoyalty ? Math.floor(total / 10) : 0;
      await updateDoc(customerRef, {
        loyaltyPoints: (customerData.loyaltyPoints || 0) + loyaltyPoints,
      });
    }
  }
};

// Add a new customer
export const addCustomer = async (data: {
  name: string;
  gender: string;
  dob: string;
  phone: string;
  email: string;
  loyaltyPoints?: number;
}) => {
  await addDoc(collection(db, "customers"), {
    ...data,
    customerId: uuidv4(),
    loyaltyPoints: data.loyaltyPoints ?? 0,
    createdAt: new Date(),
  });
};

// Get all customers
export const getCustomers = async () => {
  const snapshot = await getDocs(collection(db, "customers"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
