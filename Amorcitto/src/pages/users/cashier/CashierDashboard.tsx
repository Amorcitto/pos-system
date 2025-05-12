// src/pages/users/cashier/CashierDashboard.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../../../store/AuthContext";

const CashierDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👋 Welcome, {user?.email}</h1>
      <p className="mb-6 text-gray-700">
        You are logged in as <strong>Cashier</strong>. You can now process sales.
      </p>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/cashier")}
      >
        Go to POS Terminal
      </Button>
    </div>
  );
};

export default CashierDashboard;
