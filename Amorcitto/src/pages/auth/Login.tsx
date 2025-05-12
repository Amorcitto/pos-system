// src/pages/auth/Login.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const Login = () => {
  const { login, user, role } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  useEffect(() => {
    if (user) {
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "cashier") {
        navigate("/cashier-dashboard");
      }
    }
  }, [user, role, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      setWelcomeOpen(true);
    } catch (err) {
      setError("Invalid login credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-6 w-full max-w-sm">
        <CardContent>
          <Typography variant="h5" className="mb-4 text-center">
            Login
          </Typography>
          {error && <Typography className="text-red-500">{error}</Typography>}
          <form onSubmit={handleLogin} className="space-y-4">
            <TextField
              label="Email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={welcomeOpen}
        autoHideDuration={3000}
        onClose={() => setWelcomeOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Welcome! Redirecting...</Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
