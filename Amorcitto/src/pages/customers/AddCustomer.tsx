// src/pages/customers/AddCustomer.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { addCustomer } from "../../utils/firestore";

const AddCustomer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
  });
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
  const [points, setPoints] = useState<number>(0);
  const [notification, setNotification] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCustomer({
        ...form,
        loyaltyPoints: useLoyaltyPoints ? points : 0,
      });
      setNotification({ type: "success", message: "Customer added!" });
      setTimeout(() => navigate("/admin/products"), 1000);
    } catch (err) {
      setNotification({ type: "error", message: "Failed to add customer" });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <Typography variant="h5" className="mb-4">
        ➕ Add New Customer
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField name="name" label="Full Name" fullWidth required value={form.name} onChange={handleChange} />
        <TextField select name="gender" label="Gender" fullWidth required value={form.gender} onChange={handleChange}>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
        <TextField
          name="dob"
          type="date"
          label="Date of Birth"
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          value={form.dob}
          onChange={handleChange}
        />
        <TextField name="phone" label="Phone Number" fullWidth required value={form.phone} onChange={handleChange} />
        <TextField name="email" type="email" label="Email" fullWidth value={form.email} onChange={handleChange} />

        <FormControlLabel
          control={
            <Checkbox checked={useLoyaltyPoints} onChange={() => setUseLoyaltyPoints(!useLoyaltyPoints)} />
          }
          label="Track Loyalty Points"
        />
        {useLoyaltyPoints && (
          <TextField
            label="Initial Points"
            type="number"
            fullWidth
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        )}

        <Button variant="contained" fullWidth type="submit">
          Add Customer
        </Button>
      </form>

      <Snackbar open={!!notification} autoHideDuration={3000} onClose={() => setNotification(null)}>
        {notification && <Alert severity={notification.type}>{notification.message}</Alert>}
      </Snackbar>
    </div>
  );
};

export default AddCustomer;
