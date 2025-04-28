// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-4">Oops! Page not found.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back Home
      </Link>
    </div>
  );
};

export default NotFound;
