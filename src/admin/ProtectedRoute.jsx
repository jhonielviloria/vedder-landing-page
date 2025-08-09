import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = React.useState(undefined);
  React.useEffect(() => {
    // If Firebase isn't configured, treat as unauthenticated
    if (!auth || auth._unconfigured) {
      setUser(null);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => unsub && unsub();
  }, []);

  if (user === undefined) return <div style={{ padding: 16 }}>Loading…</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return children ? children : <Outlet />;
}
