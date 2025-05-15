// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";
import { MdPointOfSale } from "react-icons/md";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-6 py-12">
      
      {/* Header */}
      <div className="text-center">
        <MdPointOfSale className="text-6xl text-white mb-4 animate-pulse" />
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">AmorCitto Retail POS 💼</h1>
        <p className="text-lg max-w-xl mx-auto opacity-90">
          Simplify sales, manage inventory, and enhance customer experience with our powerful and easy-to-use point of sale system.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-8 space-x-4">
        <Link to="/login">
          <button className="bg-white text-blue-700 font-medium px-6 py-3 rounded-md hover:bg-blue-100 transition duration-300 shadow">
            Login
          </button>
        </Link>
        <Link to="/products">
          <button className="bg-transparent border border-white px-6 py-3 rounded-md hover:bg-white hover:text-blue-800 transition duration-300 shadow">
            Browse Products
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-200 opacity-70">
        © {new Date().getFullYear()} AmorCitto Retail POS. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
