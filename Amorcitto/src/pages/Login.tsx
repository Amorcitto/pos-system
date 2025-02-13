import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'admin' | 'cashier'>('cashier');
  const navigate = useNavigate();

  const handleLogin = () => {
    login(username, role);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as 'admin' | 'cashier')}
        className="border p-2 mb-2"
      >
        <option value="admin">Admin</option>
        <option value="cashier">Cashier</option>
      </select>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
