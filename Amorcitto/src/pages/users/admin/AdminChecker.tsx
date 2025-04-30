// src/pages/users/admin/AdminChecker.tsx
import { useAuth } from "../../../store/AuthContext";

const AdminChecker = () => {
  const { user, role } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500">Not Logged In</h1>
        <p className="mt-2 text-gray-700">Please login first to access this page.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Hello, {user.email}</h1>
      {role === "admin" ? (
        <p className="text-2xl text-green-600">✅ You are Admin</p>
      ) : (
        <p className="text-2xl text-yellow-500">👨‍💼 You are Cashier</p>
      )}
    </div>
  );
};

export default AdminChecker;
