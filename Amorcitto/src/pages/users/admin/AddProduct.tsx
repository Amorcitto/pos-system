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
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        stock: Number(stock),
      });
      setNotification({ type: "success", message: "Product added successfully" });
      setTimeout(() => navigate("/admin/products"), 1000);
    } catch (error: any) {
      console.error(error);
      setNotification({ type: "error", message: "Failed to add product" });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <Typography variant="h5" className="mb-4">➕ Add New Product</Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField label="Product Name" fullWidth required value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Price" type="number" fullWidth required value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <TextField label="Stock" type="number" fullWidth required value={stock} onChange={(e) => setStock(Number(e.target.value))} />
        <Button type="submit" variant="contained" fullWidth>Add Product</Button>
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
