// src/pages/dashboard/HomeDashboard.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const HomeDashboard = () => {
  const { role } = useAuth();

  interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    [key: string]: any; // Allow any other properties
  }
  const [lowStock, setLowStock] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsSnap = await getDocs(collection(db, "products"));
      const products = productsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const low = products.filter((p: any) => p.stock < 5);
      setLowStock(low);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome to Retail PoS Dashboard</h1>

      {role === "admin" && lowStock.length > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-6 rounded">
          <p className="font-bold">⚠️ Low Stock Alert!</p>
          <ul className="list-disc list-inside text-sm">
            {lowStock.map((item, idx) => (
              <li key={idx}>
                {item.name} - only {item.stock} left
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomeDashboard;
