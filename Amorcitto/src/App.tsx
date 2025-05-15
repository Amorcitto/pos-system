// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";

// Guards
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/adminroute";
import CashierRoute from "./components/CashierRoute";

// Layout
import Layout from "./components/Layout";

// Pages
import Login from "./pages/auth/Login";
import LandingPage from "./pages/LandingPage";
import HomeDashboard from "./pages/dashboard/HomeDashboard";
import CashierDashboard from "./pages/users/cashier/CashierDashboard";
import CashierPOS from "./pages/users/cashier/CashierPos";
import ReceiptPage from "./pages/ReceiptPage";
import SalesReport from "./pages/sales/SalesReport";
import ManageProducts from "./pages/users/admin/ManageProducts";
import AddProduct from "./pages/users/admin/AddProduct";
import Products from "./pages/products/Products";
import AddCustomer from "./pages/customers/AddCustomer";
import CustomersList from "./pages/customers/CustomersList";
import ProcessReturn from "./pages/returns/ProcessReturns";
import LoyaltyStats from "./pages/customers/Loyaltystats";
import SettingsPage from "./pages/settings/SettingsPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <Router>
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Layout><Products /></Layout>} />

        {/* Admin Routes */}
        <Route path="/dashboard" element={<AdminRoute><Layout><HomeDashboard /></Layout></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><Layout><ManageProducts /></Layout></AdminRoute>} />
        <Route path="/admin/add-product" element={<AdminRoute><Layout><AddProduct /></Layout></AdminRoute>} />
        <Route path="/admin/add-customer" element={<AdminRoute><Layout><AddCustomer /></Layout></AdminRoute>} />
        <Route path="/admin/customers" element={<AdminRoute><Layout><CustomersList /></Layout></AdminRoute>} />
        <Route path="/admin/loyalty" element={<AdminRoute><Layout><LoyaltyStats /></Layout></AdminRoute>} />
        <Route path="/sales-report" element={<AdminRoute><Layout><SalesReport /></Layout></AdminRoute>} />
        <Route path="admin/settings" element={<AdminRoute><Layout><SettingsPage /></Layout></AdminRoute>} />

        {/* Cashier Routes */}
        <Route path="/cashier" element={<CashierRoute><Layout><CashierPOS /></Layout></CashierRoute>} />
        <Route path="/cashier-dashboard" element={<CashierRoute><Layout><CashierDashboard /></Layout></CashierRoute>} />

        {/* Shared/Protected */}
        <Route path="/receipt" element={<ProtectedRoute><Layout><ReceiptPage /></Layout></ProtectedRoute>} />
        <Route path="/returns" element={<ProtectedRoute><Layout><ProcessReturn /></Layout></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
