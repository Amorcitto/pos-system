// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/HomeDashboard";
import CashierPOS from "./pages/users/cashier/CashierPos";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import ReceiptPage from "./pages/ReceiptPage";
import SalesReport from "./pages/sales/SalesReport";
import AdminRoute from "./components/adminroute";
import CashierRoute from "./components/CashierRoute";
import ManageProducts from "./pages/users/admin/ManageProducts";
import Products from "./pages/products/Products";
import Layout from "./components/Layout";
import HomeDashboard from "./pages/dashboard/HomeDashboard";

const App = () => (
  <Router>
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<AdminRoute><Dashboard /></AdminRoute>}
          />
          <Route
            path="/cashier"
            element={<CashierRoute><CashierPOS /></CashierRoute>}
          />
          <Route
            path="/receipt"
            element={<ProtectedRoute><ReceiptPage /></ProtectedRoute>}
          />
          <Route
            path="/sales-report"
            element={<ProtectedRoute><SalesReport /></ProtectedRoute>}
          />
          <Route
            path="/admin/products"
            element={<AdminRoute><ManageProducts /></AdminRoute>}
          />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </AuthProvider>
  </Router>
);

export default App;
