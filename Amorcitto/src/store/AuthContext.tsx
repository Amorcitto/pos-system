import React, { createContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  role: 'admin' | 'cashier';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, role: 'admin' | 'cashier') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, role: 'admin' | 'cashier') => {
    setUser({ username, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
