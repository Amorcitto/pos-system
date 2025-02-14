import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./store/AuthContext";
import AddProduct from "./pages/AddProducts";
import ProductList from "./pages/Products";
import CashierDashboard from "./pages/CashierDashboard";
import SalesReport from "./pages/SalesReport";
import Home from "./pages/Home";
import { Button } from "@mui/material";
import Dashboard from "./pages/Dashboard";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user) {
    console.log("Redirecting to login - User not found");
    return <h1>Unauthorized! Please log in.</h1>; // Debugging
  }
  return children;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { role } = useAuth();
  if (role !== "admin") {
    console.log("Access denied - Not an admin");
    return <h1>Access Denied! Admins only.</h1>; // Debugging
  }
  return children;
};

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="products" element={<ProductList />} />
    <Route path="/add-product" element={<AdminRoute><AddProduct /></AdminRoute>} />
    <Route path="/cashier" element={<ProtectedRoute><CashierDashboard /></ProtectedRoute>} />
    <Route path="/sales-report" element={<AdminRoute><SalesReport /></AdminRoute>} />
    <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
  </Routes>
);
