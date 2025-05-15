// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";

// Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/adminroute";
import CashierRoute from "./components/CashierRoute";

// Layout
import Layout from "./components/Layout";

// Pages
import Login from "./pages/auth/Login";
import HomeDashboard from "./pages/dashboard/HomeDashboard";
import CashierPOS from "./pages/users/cashier/CashierPos";
import ReceiptPage from "./pages/ReceiptPage";
import SalesReport from "./pages/sales/SalesReport";
import ManageProducts from "./pages/users/admin/ManageProducts";
import AddProduct from "./pages/users/admin/AddProduct";
import Products from "./pages/products/Products";
import NotFound from "./pages/NotFound";
import CashierDashboard from "./pages/users/cashier/CashierDashboard";
import AddCustomer from "./pages/customers/AddCustomer";
import CustomersList from "./pages/customers/CustomersList";
import LandingPage from "./pages/LandingPage";
import ProcessReturn from "./pages/returns/ProcessReturns";

import SettingsPage from "./pages/settings/SettingsPage";

const App = () => (
  <Router>
    <AuthProvider>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Redirect base to landing page */}
        <Route path="/" element={<Navigate to="/landing" />} />

        {/* Landing page */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Layout>
                <HomeDashboard />
              </Layout>
            </AdminRoute>
          }
        />

        {/* Cashier POS */}
        <Route
          path="/cashier"
          element={
            <CashierRoute>
              <Layout>
                <CashierPOS />
              </Layout>
            </CashierRoute>
          }
        />

        {/* Cashier Dashboard */}
        <Route
          path="/cashier-dashboard"
          element={
            <CashierRoute>
              <Layout>
                <CashierDashboard />
              </Layout>
            </CashierRoute>
          }
        />

        {/* Receipt Page */}
        <Route
          path="/receipt"
          element={
            <ProtectedRoute>
              <Layout>
                <ReceiptPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Sales Report */}
        <Route
          path="/sales-report"
          element={
            <AdminRoute>
              <Layout>
                <SalesReport />
              </Layout>
            </AdminRoute>
          }
        />

        {/* Product Management */}
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <Layout>
                <ManageProducts />
              </Layout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <Layout>
                <AddProduct />
              </Layout>
            </AdminRoute>
          }
        />

        {/* Add customer */}
        <Route
          path="/admin/add-customer"
          element={
            <AdminRoute>
              <Layout>
                <AddCustomer />
              </Layout>
            </AdminRoute>
          }
        />

        {/* Public Products */}
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />

        {/* Customers List */}
        <Route
          path="/admin/customers"
          element={
            <AdminRoute>
              <Layout>
                <CustomersList />
              </Layout>
            </AdminRoute>
          }
        />

        {/* Process Returns */}
        <Route
          path="/returns"
          element={
            <protectedRoute>
              <Layout>
                <ProcessReturn />
              </Layout>
            </protectedRoute>
          }
        />

        {/* Settings Page */}
        <Route
          path="/settings"
          element={
            <AdminRoute>
              <Layout>
                <SettingsPage />
              </Layout>
            </AdminRoute>
          }
        />

        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
