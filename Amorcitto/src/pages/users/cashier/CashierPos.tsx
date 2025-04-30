// src/pages/users/cashier/CashierPOS.tsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, recordSale } from "../../../utils/firestore";
import {
  Select,
  MenuItem,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { auth } from "../../../firebaseConfig";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

const CashierPOS = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() =>
        setNotification({ type: "error", message: "Failed to load products" })
      );
  }, []);

  const handleAddToCart = () => {
    const product = products.find((p) => p.id === selectedProductId);
    if (!product) return;

    if (quantity > product.stock) {
      setNotification({ type: "error", message: "Not enough stock!" });
      return;
    }

    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }

    setSelectedProductId("");
    setQuantity(1);
  };

  const handleCheckout = async () => {
    try {
      for (const item of cart) {
        await recordSale(
          item.id,
          item.name,
          item.price,
          item.quantity,
          item.stock
        );
      }
      setCart([]);
      setNotification({ type: "success", message: "Checkout successful!" });
      getProducts().then(setProducts);
    } catch (err: any) {
      setNotification({ type: "error", message: err.message });
    }
    const receiptData = {
      cashier: auth.currentUser?.displayName || "Unknown",
      date: new Date().toISOString(),
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
    navigate("/receipt", { state: { receipt: receiptData } });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <Typography variant="h5" className="mb-4">
        Cashier Terminal
      </Typography>

      <Select
        fullWidth
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
        displayEmpty
        className="mb-4"
      >
        <MenuItem value="">Select Product</MenuItem>
        {products.map((product) => (
          <MenuItem key={product.id} value={product.id}>
            {product.name} - ${product.price} ({product.stock} left)
          </MenuItem>
        ))}
      </Select>

      <TextField
        label="Quantity"
        type="number"
        fullWidth
        inputProps={{ min: 1 }}
        className="mb-4"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <Button variant="contained" fullWidth onClick={handleAddToCart}>
        Add to Cart
      </Button>

      {/* Cart View */}
      {cart.length > 0 && (
        <Card className="mt-6">
          <CardContent>
            <Typography variant="h6">Cart</Typography>
            <ul className="mt-2 space-y-2">
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.quantity} pcs = $
                  {item.price * item.quantity}
                </li>
              ))}
            </ul>
            <Typography variant="subtitle1" className="mt-4 font-semibold">
              Total: $
              {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </CardContent>
        </Card>
      )}

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

export default CashierPOS;
