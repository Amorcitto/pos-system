import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

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

  // Update stock
  await updateStock(productId, stock - quantity);
};
