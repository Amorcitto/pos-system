// src/pages/users/cashier/CashierPOS.tsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, getCustomers, recordSale } from "../../../utils/firestore";
import {
  Select, MenuItem, TextField, Button, Card, CardContent, Typography,
  Snackbar, Alert, Checkbox, FormControlLabel, RadioGroup, FormControl,
  FormControlLabel as RadioControlLabel, Radio
} from "@mui/material";
import { auth, db } from "../../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface Customer {
  id: string;
  name: string;
  customerId: string;
  loyaltyPoints: number;
}

const CashierPOS = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [usePoints, setUsePoints] = useState(false);

  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState(0);

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    getProducts().then(setProducts).catch(() =>
      setNotification({ type: "error", message: "Failed to load products" })
    );
    getCustomers().then(setCustomers);
  }, []);

  const handleCustomerChange = (id: string) => {
    const selected = customers.find(c => c.customerId === id) || null;
    setSelectedCustomerId(id);
    setSelectedCustomer(selected);
    setUsePoints(false);
  };

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
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }

    setSelectedProductId("");
    setQuantity(1);
  };

  const calculateDiscountAmount = (total: number) => {
    if (discountType === "percentage") {
      return Math.min((discountValue / 100) * total, total);
    } else {
      return Math.min(discountValue, total);
    }
  };

  const handleCheckout = async () => {
    const totalBefore = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const loyaltyDiscount = usePoints && selectedCustomer ? selectedCustomer.loyaltyPoints * 0.1 : 0;
    const discountAmount = calculateDiscountAmount(totalBefore - loyaltyDiscount);
    const totalAfter = Math.max(totalBefore - loyaltyDiscount - discountAmount, 0);

    try {
      for (const item of cart) {
        await recordSale(
          item.id,
          item.name,
          item.price,
          item.quantity,
          item.stock,
          selectedCustomerId || null,
          usePoints
        );
      }

      if (selectedCustomerId && usePoints && selectedCustomer) {
        const customerRef = doc(db, "customers", selectedCustomer.id);
        await updateDoc(customerRef, { loyaltyPoints: 0 });
      }

      const receiptData = {
        customerId: selectedCustomerId || "N/A",
        cashier: auth.currentUser?.email || "Unknown",
        date: new Date().toISOString(),
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: totalBefore,
        loyaltyApplied: loyaltyDiscount,
        discountApplied: discountAmount,
        total: totalAfter,
      };

      setCart([]);
      setUsePoints(false);
      setDiscountValue(0);
      setNotification({ type: "success", message: "Checkout successful!" });
      getProducts().then(setProducts);
      navigate("/receipt", { state: { receipt: receiptData } });
    } catch (err: any) {
      setNotification({ type: "error", message: err.message });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <Typography variant="h5" className="mb-4">🛒 Cashier Terminal</Typography>

      <Select
        fullWidth
        displayEmpty
        value={selectedCustomerId}
        onChange={(e) => handleCustomerChange(e.target.value)}
        className="mb-4"
      >
        <MenuItem value="">Walk-in Customer</MenuItem>
        {customers.map((cust) => (
          <MenuItem key={cust.id} value={cust.customerId}>
            {cust.name}
          </MenuItem>
        ))}
      </Select>

      {selectedCustomer && selectedCustomer.loyaltyPoints > 0 && (
        <FormControlLabel
          control={<Checkbox checked={usePoints} onChange={() => setUsePoints(!usePoints)} />}
          label={`Use ${selectedCustomer.loyaltyPoints} Points (Worth $${(selectedCustomer.loyaltyPoints * 0.1).toFixed(2)})`}
          className="mb-2"
        />
      )}

      <Select
        fullWidth
        displayEmpty
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
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
        value={quantity}
        inputProps={{ min: 1 }}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="mb-4"
      />

      <FormControl component="fieldset" className="mb-2">
        <Typography variant="subtitle1" className="mb-1">Apply Discount:</Typography>
        <RadioGroup
          row
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed")}
        >
          <RadioControlLabel value="percentage" control={<Radio />} label="%" />
          <RadioControlLabel value="fixed" control={<Radio />} label="Fixed" />
        </RadioGroup>
      </FormControl>

      <TextField
        label={`Discount ${discountType === "percentage" ? "(%)" : "(KES)"}`}
        type="number"
        fullWidth
        value={discountValue}
        onChange={(e) => setDiscountValue(Number(e.target.value))}
        className="mb-4"
      />

      <Button variant="contained" fullWidth onClick={handleAddToCart}>
        Add to Cart
      </Button>

      {cart.length > 0 && (
        <Card className="mt-6">
          <CardContent>
            <Typography variant="h6">🧾 Cart</Typography>
            <ul className="mt-2 space-y-2">
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.quantity} pcs = ${item.price * item.quantity}
                </li>
              ))}
            </ul>

            <Typography className="mt-4">Subtotal: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</Typography>
            {usePoints && selectedCustomer && (
              <Typography className="text-green-600">Loyalty Discount: -${(selectedCustomer.loyaltyPoints * 0.1).toFixed(2)}</Typography>
            )}
            {discountValue > 0 && (
              <Typography className="text-red-600">
                Discount: -${calculateDiscountAmount(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) - (usePoints && selectedCustomer ? selectedCustomer.loyaltyPoints * 0.1 : 0)).toFixed(2)}
              </Typography>
            )}
            <Typography className="font-bold mt-1">
              Total: ${Math.max(
                cart.reduce((sum, item) => sum + item.price * item.quantity, 0) -
                (usePoints && selectedCustomer ? selectedCustomer.loyaltyPoints * 0.1 : 0) -
                calculateDiscountAmount(
                  cart.reduce((sum, item) => sum + item.price * item.quantity, 0) -
                  (usePoints && selectedCustomer ? selectedCustomer.loyaltyPoints * 0.1 : 0)
                ), 0
              ).toFixed(2)}
            </Typography>

            <Button variant="contained" color="primary" fullWidth className="mt-4" onClick={handleCheckout}>
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
