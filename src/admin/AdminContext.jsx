import React from 'react';

// Simple admin auth context (placeholder for future real auth)
// Stores a boolean flag in localStorage under 'adminAuth'
export const AdminContext = React.createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => localStorage.getItem('adminAuth') === 'true');

  const login = React.useCallback(() => {
    localStorage.setItem('adminAuth', 'true');
    setIsAuthenticated(true);
  }, []);

  const logout = React.useCallback(() => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  }, []);

  const value = React.useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout]);
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  return React.useContext(AdminContext);
}
