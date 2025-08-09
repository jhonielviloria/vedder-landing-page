import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function AdminLayout() {
  const navigate = useNavigate();
  const onLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <h2>Admin</h2>
        <nav>
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/products">Products</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
        </nav>
        <button className="btn" onClick={onLogout}>Logout</button>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
      <style jsx>{`
        .admin { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
        .admin-sidebar { background: #0f172a; color: white; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; }
        .admin-sidebar a { color: #cbd5e1; text-decoration: none; display: block; padding: 0.5rem 0; }
        .admin-sidebar a.active { color: #fff; font-weight: 700; }
        .admin-content { padding: 1.5rem; }
        .btn { background: #ef4444; color: white; border: none; padding: 0.5rem 0.75rem; border-radius: 6px; cursor: pointer; }
      `}</style>
    </div>
  );
}
