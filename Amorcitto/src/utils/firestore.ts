import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Fetch all products from Firestore
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Record a sale and update stock
export const recordSale = async (productId: string, name: string, price: number, quantity: number, stock: number) => {
  if (quantity > stock) {
    throw new Error("Not enough stock available!");
  }

  // Add sale record
  await addDoc(collection(db, "sales"), {
    productId,
    name,
    price,
    quantity,
    total: price * quantity,
    timestamp: new Date(),
  });

  // Update stock (ensure updateStock is defined in firestore.ts)
  await updateStock(productId, stock - quantity);
};

// Add a new product
export const addProduct = async (product: { name: string; price: number; stock: number }) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Product added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
};
