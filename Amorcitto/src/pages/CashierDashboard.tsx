import React, { useEffect, useState } from "react";
import { getProducts, recordSale } from "../utils/firestore";

const CashierDashboard = () => {
  const [products, setProducts] = useState<{ id: string; name: string; price: number; stock: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleSale = async () => {
    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return alert("Product not found");

    try {
      await recordSale(product.id, product.name, product.price, quantity, product.stock);
      alert("Sale recorded!");
      setQuantity(1);
      getProducts().then(setProducts);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Cashier Dashboard</h1>
      <select onChange={(e) => setSelectedProduct(e.target.value)} value={selectedProduct}>
        <option value="">Select Product</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} - ${product.price} ({product.stock} in stock)
          </option>
        ))}
      </select>
      <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min="1" required />
      <button onClick={handleSale}>Sell</button>
    </div>
  );
};

export default CashierDashboard;
