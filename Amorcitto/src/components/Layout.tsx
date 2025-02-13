import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between">
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
        <div>
          {auth?.user ? (
            <>
              <span className="mr-4">{auth.user.displayName}</span>
              <button onClick={auth.logout} className="bg-red-500 px-3 py-1 rounded">
                Logout
              </button>
            </>
          ) : (
            <button onClick={auth?.login} className="bg-green-500 px-3 py-1 rounded">
              Login
            </button>
          )}
        </div>
      </nav>
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
};

export default Layout;
