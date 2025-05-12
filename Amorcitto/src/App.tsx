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

const App = () => (
  <Router>
    <AuthProvider>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Redirect base "/" to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

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

        {/* Sales Report (Admin) */}
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

        {/* Admin - Manage Products */}
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

        {/* Admin - Add Product */}
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

        {/* Public - View Products */}
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
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
