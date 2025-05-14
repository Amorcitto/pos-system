// src/pages/users/cashier/CashierDashboard.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/AuthContext";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CashierDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" className="mb-4 text-blue-600 font-bold">
          👋 Hello, {user?.email}
        </Typography>
        <Typography className="text-gray-600 mb-8">
          Welcome to your cashier dashboard. Start a sale, view receipts, or check product stock.
        </Typography>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="shadow">
            <CardContent className="flex items-center justify-between">
              <div>
                <Typography variant="h6">Start Sale</Typography>
                <Typography variant="body2" className="text-gray-500">
                  Proceed to the POS terminal
                </Typography>
              </div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                onClick={() => navigate("/cashier")}
              >
                Open POS
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="shadow">
            <CardContent className="flex items-center justify-between">
              <div>
                <Typography variant="h6">View Products</Typography>
                <Typography variant="body2" className="text-gray-500">
                  Browse all available items
                </Typography>
              </div>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/products")}
              >
                Products
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CashierDashboard;
