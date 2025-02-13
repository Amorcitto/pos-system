import React, { useState } from "react";
import { addProduct } from "../utils/firestore";
import { useAuth } from "../store/AuthContext";

const AddProduct = () => {
  const { role } = useAuth();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role !== "admin") {
      alert("Only admins can add products!");
      return;
    }
    await addProduct(name, parseFloat(price), parseInt(stock));
    alert("Product added!");
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
