import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAdmin } from './AdminContext';

export default function Sidebar({ collapsed, onToggle }) {
  const { logout } = useAdmin();
  return (
    <aside className={`h-screen sticky top-0 bg-slate-900 text-slate-200 flex flex-col transition-all duration-300 ${collapsed? 'w-16' : 'w-60'} shrink-0 shadow-lg shadow-slate-900/20`}>
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className={`text-lg font-semibold tracking-wide whitespace-nowrap transition-opacity ${collapsed? 'opacity-0 pointer-events-none':'opacity-100'}`}>Admin Panel</h2>
        <button onClick={onToggle} title="Toggle" className="text-slate-400 hover:text-white text-xs font-mono">{collapsed? '>>':'<<'}</button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1 text-sm">
        <SideLink to="/admin" end collapsed={collapsed}>Dashboard</SideLink>
        <SideLink to="/admin/products" collapsed={collapsed}>Products</SideLink>
        <SideLink to="/admin/messages" collapsed={collapsed}>Messages</SideLink>
        <SideLink to="/admin/orders" collapsed={collapsed}>Orders</SideLink>
      </nav>
      <div className="p-3 border-t border-slate-800">
        <button onClick={logout} className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:brightness-110 text-white text-xs font-medium px-3 py-2 rounded shadow">{collapsed? 'Out':'Logout'}</button>
      </div>
    </aside>
  );
}

function SideLink({ to, children, collapsed, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `group flex items-center gap-2 px-3 py-2 rounded-md font-medium tracking-wide transition-colors
        ${isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'}
        ${collapsed? 'justify-center':''}`
      }
    >
      <span className={`text-xs uppercase ${collapsed? 'text-[10px]':''}`}>{children}</span>
    </NavLink>
  );
}
