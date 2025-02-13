import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './pages/Products';
import Login from './pages/Login';
import { AuthContext } from './store/AuthContext';

const ProtectedRoute = ({ element, role }: { element: React.ReactNode; role: 'admin' | 'cashier' }) => {
  const { user } = useContext(AuthContext);
  return user && user.role === role ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<ProductList />} role="admin" />} />
      </Routes>
    </Router>
  );
};

export default App;
