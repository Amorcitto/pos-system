import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-xl font-semibold">Retail PoS</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/products" className="hover:underline">
              Products
            </Link>
            <Link to="/cart" className="hover:underline">
              Cart
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        Retail PoS &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Layout;
