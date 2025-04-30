// File: src/components/adminroute.tsx
// This component checks if the user is logged in and has admin privileges.
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <h1 className="text-center mt-10 text-red-600 text-xl">Access Denied: Admins Only</h1>;
  }

  return <>{children}</>;
};


export default AdminRoute;
