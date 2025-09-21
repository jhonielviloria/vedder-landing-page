import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from './AdminContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdmin();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children || <Outlet />;
}

