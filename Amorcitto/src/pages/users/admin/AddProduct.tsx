// src/pages/users/admin/AddProduct.tsx
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [notification, setNotification] = useState<null | { type: "success" | "error"; message: string }>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName || Number(price) <= 0 || Number(stock) < 0) {
      return setNotification({ type: "error", message: "Please enter valid product details." });
    }

    try {
      setSubmitting(true);
      await addDoc(collection(db, "products"), {
        name: trimmedName,
        price: Number(price),
        stock: Number(stock),
      });

      setNotification({ type: "success", message: "✅ Product added successfully!" });
      setName("");
      setPrice("");
      setStock("");

      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    } catch (error) {
      console.error(error);
      setNotification({ type: "error", message: "❌ Failed to add product." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <Typography variant="h5" className="mb-4">➕ Add New Product</Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField label="Product Name" fullWidth required value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Price" type="number" fullWidth required value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <TextField label="Stock" type="number" fullWidth required value={stock} onChange={(e) => setStock(Number(e.target.value))} />
        <Button type="submit" variant="contained" fullWidth disabled={submitting}>
          {submitting ? "Adding..." : "Add Product"}
        </Button>
      </form>

      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {notification && (
          <Alert severity={notification.type}>{notification.message}</Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default AddProduct;
