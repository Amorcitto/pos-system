// src/pages/dashboard/HomeDashboard.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { MdWarningAmber, MdInventory } from "react-icons/md";

const HomeDashboard = () => {
  const { role } = useAuth();

  interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
  }

  const [lowStock, setLowStock] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      const low = products.filter((p) => p.stock < 5);
      setLowStock(low);
      setTotalProducts(products.length);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-semibold mb-6 text-blue-700">Retail PoS Admin Dashboard</h1>

      {role === "admin" && (
        <>
          {/* Metrics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded shadow-sm flex items-center">
              <MdInventory className="text-blue-600 text-3xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-lg font-bold text-blue-800">{totalProducts}</p>
              </div>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow-sm flex items-center">
              <MdWarningAmber className="text-yellow-600 text-3xl mr-3" />
              <div>
                <p className="text-sm text-gray-700">Low Stock Items</p>
                <p className="text-lg font-bold text-yellow-800">{lowStock.length}</p>
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          {lowStock.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-lg shadow-inner">
              <h2 className="text-lg font-semibold text-yellow-700 mb-2">⚠️ Low Stock Alert</h2>
              <ul className="list-disc list-inside text-sm text-yellow-900">
                {lowStock.map((item) => (
                  <li key={item.id}>
                    {item.name} — <span className="font-semibold">{item.stock}</span> left
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomeDashboard;
