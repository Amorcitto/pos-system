import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./store/AuthContext";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/Products";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { role } = useAuth();
  return role === "admin" ? children : <Navigate to="/products" />;
};

export const AppRoutes = () => (
  <>
    <Route path="/products" element={<ProductList />} />
    <Route path="/add-product" element={<AdminRoute><AddProduct /></AdminRoute>} />
  </>
);
