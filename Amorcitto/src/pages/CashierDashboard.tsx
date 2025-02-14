import React, { useEffect, useState } from "react";
import { getProducts, recordSale } from "../utils/firestore";
import { Button, Select, MenuItem, TextField, CircularProgress, Alert, Snackbar } from "@mui/material";

const CashierDashboard = () => {
  const [products, setProducts] = useState<{ id: string; name: string; price: number; stock: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setNotification({ type: "error", message: "Failed to load products" }))
      .finally(() => setLoading(false));
  }, []);

  const handleSale = async () => {
    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return setNotification({ type: "error", message: "Product not found!" });

    if (quantity > product.stock) {
      return setNotification({ type: "error", message: "Not enough stock!" });
    }

    try {
      await recordSale(product.id, product.name, product.price, quantity, product.stock);
      setNotification({ type: "success", message: "Sale recorded successfully!" });
      setQuantity(1);
      getProducts().then(setProducts);
    } catch (error: any) {
      setNotification({ type: "error", message: error.message });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Cashier Dashboard</h1>

      {/* Show loading spinner while fetching data */}
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          {/* Product Selection */}
          <Select
            fullWidth
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            displayEmpty
            className="mb-4"
          >
            <MenuItem value="">Select Product</MenuItem>
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name} - ${product.price} ({product.stock} in stock)
              </MenuItem>
            ))}
          </Select>

          {/* Quantity Input */}
          <TextField
            fullWidth
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            inputProps={{ min: 1 }}
            className="mb-4"
          />

          {/* Sell Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSale}
            disabled={!selectedProduct || quantity < 1}
          >
            Sell
          </Button>
        </>
      )}

      {/* Notification Snackbar */}
      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {notification && <Alert severity={notification.type}>{notification.message}</Alert>}
      </Snackbar>
    </div>
  );
};

export default CashierDashboard;
