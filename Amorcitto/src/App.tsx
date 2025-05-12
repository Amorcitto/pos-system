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

const App = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </AdminRoute>
          }
        />

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
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />

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
