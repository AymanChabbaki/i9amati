
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Check for stored auth data and token on mount
    const storedUser = localStorage.getItem('iqamati_user');
    const storedToken = localStorage.getItem('iqamati_token');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { token, user } = res.data;
  // No role check, login is based on email/password only
      setUser(user);
      localStorage.setItem('iqamati_user', JSON.stringify(user));
      localStorage.setItem('iqamati_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('iqamati_user');
    localStorage.removeItem('iqamati_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
