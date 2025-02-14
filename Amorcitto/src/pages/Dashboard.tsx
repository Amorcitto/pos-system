import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [recentSales, setRecentSales] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
            navigate("/login");
        }
        });
    return () => unsubscribe();
    }, [navigate]);

    return <div>Welcome to Dashboard</div>;
    
    const fetchData = async () => {
      const productsSnap = await getDocs(collection(db, "products"));
      const salesSnap = await getDocs(collection(db, "sales"));

      const products = productsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sales = salesSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTotalProducts(products.length);
      setRecentSales(sales.slice(-5));
      setLowStock(products.filter((product) => product.stock < 5));
    };

    fetchData();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card>
          <CardContent>
            <Typography variant="h6">Total Products</Typography>
            <Typography variant="h4">{totalProducts}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Recent Sales</Typography>
            <ul>
              {recentSales.map((sale, index) => (
                <li key={index}>
                  {sale.name} - {sale.quantity} pcs
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Low Stock</Typography>
            <ul>
              {lowStock.map((product, index) => (
                <li key={index}>
                  {product.name} - {product.stock} left
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
