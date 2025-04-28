import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid login credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-6 w-full max-w-sm">
        <CardContent>
          <Typography variant="h5" className="mb-4 text-center">Login</Typography>
          {error && <Typography className="text-red-500">{error}</Typography>}
          <form onSubmit={handleLogin} className="space-y-4">
            <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" variant="contained" fullWidth>Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
