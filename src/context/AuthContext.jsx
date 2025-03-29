import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem('isAuthenticated');
      if (storedAuth === 'true') {
        // Mock user data
        setUser({
          name: 'FAST Student',
          email: 'student@fast.edu.pk',
          department: 'Artificial Intelligence'
        });
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Mock auth - in real app, this would call an API
        if (email === 'student@fast.edu.pk' && password === 'password123') {
          const userData = {
            name: 'FAST Student',
            email: 'student@fast.edu.pk',
            department: 'Artificial Intelligence'
          };
          
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', 'true');
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        loading,
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
