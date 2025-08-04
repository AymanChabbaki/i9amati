import { createContext, useContext, useState, useEffect } from 'react';

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
    // Check for stored auth data on mount
    const storedUser = localStorage.getItem('iqamati_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password, role) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on role
    const mockUser = {
      id: '1',
      name: role === 'owner' ? 'Fatima Al-Rashid' : 
            role === 'agent' ? 'Ahmed Hassan' : 'Sarah Younes',
      email,
      role,
      unit: role === 'owner' ? 'A101' : undefined,
      ownershipShare: role === 'owner' ? 12.5 : undefined,
      initials: role === 'owner' ? 'FA' : 
                role === 'agent' ? 'AH' : 'SY'
    };

    setUser(mockUser);
    localStorage.setItem('iqamati_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('iqamati_user');
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
