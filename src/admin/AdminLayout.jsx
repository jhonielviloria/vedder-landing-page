import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-slate-100 via-slate-50 to-white text-slate-800">
      <Sidebar collapsed={collapsed} onToggle={()=>setCollapsed(c=>!c)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onToggleSidebar={()=>setCollapsed(c=>!c)} />
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 lg:py-10 lg:px-10">
          <Outlet />
        </main>
        <footer className="mt-auto text-center text-[11px] py-4 text-slate-400 select-none">&copy; {new Date().getFullYear()} Admin Panel</footer>
      </div>
    </div>
  );
}

