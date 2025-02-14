import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white p-6 text-center">
        <h1 className="text-4xl font-bold">Welcome to RetailShop</h1>
        <p className="text-lg mt-2">Your one-stop shop for quality products</p>
      </header>

      {/* CTA Buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        <Link to="/products">
          <Button variant="contained" color="primary">
            View Products
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="outlined" color="secondary">
            Admin Login
          </Button>
        </Link>
      </div>

      {/* Features Section */}
      <section className="mt-10 px-4 text-center">
        <h2 className="text-2xl font-bold">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">Quality Products</h3>
            <p>We offer top-notch quality on all our items.</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">Fast Delivery</h3>
            <p>Get your orders delivered within hours.</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">Secure Payments</h3>
            <p>Pay easily via M-Pesa, credit cards, and more.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} RetailShop. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
