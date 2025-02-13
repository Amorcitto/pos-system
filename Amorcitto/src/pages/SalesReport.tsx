import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const SalesReport = () => {
  const [sales, setSales] = useState<{ id: string; name: string; price: number; quantity: number; total: number; timestamp: string }[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      const snapshot = await getDocs(collection(db, "sales"));
      setSales(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchSales();
  }, []);

  return (
    <div className="container">
      <h1>Sales Report</h1>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.name} - {sale.quantity} pcs - ${sale.total} - {new Date(sale.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesReport;
