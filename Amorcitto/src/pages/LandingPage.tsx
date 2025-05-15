import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center px-6">
        <h1 className="text-5xl font-bold mb-6">Welcome to AmorCitto Retail POS 💼</h1>
        <p className="text-lg mb-6">Streamline your retail experience with our powerful point of sale system. Manage inventory, track sales, and empower your team.</p>
        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-white text-blue-600 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300">Login</button>
          </Link>
          <Link to="/products">
            <button className="bg-transparent border border-white px-6 py-2 rounded hover:bg-white hover:text-blue-600 transition duration-300">Get Started</button>
          </Link>
        </div>
      </div>
    );
  };
  
  export default LandingPage;
  