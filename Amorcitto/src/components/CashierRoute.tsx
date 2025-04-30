// src/components/CashierRoute.tsx
import { useAuth } from "../store/AuthContext";
import { Navigate } from "react-router-dom";

const CashierRoute = ({ children }: { children: JSX.Element }) => {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "cashier") {
    return <h1 className="text-center text-red-500 mt-10">❌ Access Denied! Cashiers only.</h1>;
  }

  return children;
};

export default CashierRoute;
