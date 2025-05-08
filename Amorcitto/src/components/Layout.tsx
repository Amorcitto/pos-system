import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Retail PoS</h1>

        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/products" className="hover:underline">Products</Link>

          {auth.user && auth.role === "admin" && (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/admin/products" className="hover:underline">Manage</Link>
              <Link to="/sales-report" className="hover:underline">Sales</Link>
            </>
          )}

          {auth.user && auth.role === "cashier" && (
            <Link to="/cashier" className="hover:underline">Cashier</Link>
          )}
        </div>

        <div>
          {auth.user ? (
            <>
              <span className="mr-4">{auth.user.email}</span>
              <button onClick={auth.logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-green-500 px-3 py-1 rounded">Login</button>
            </Link>
          )}
        </div>
      </nav>

      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
