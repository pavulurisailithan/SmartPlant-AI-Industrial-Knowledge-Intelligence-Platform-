import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USERS = {
  admin: { id: 1, username: 'admin', name: 'Admin User', role: 'ADMIN', email: 'admin@smartplant.com', password: 'admin123' },
  engineer: { id: 2, username: 'engineer', name: 'Field Engineer', role: 'ENGINEER', email: 'engineer@smartplant.com', password: 'eng123' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('smartplant_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (username, password) => {
    const found = DEMO_USERS[username];
    if (!found || found.password !== password) {
      throw new Error('Invalid credentials');
    }
    const { password: _, ...userData } = found;
    localStorage.setItem('smartplant_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('smartplant_user');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
