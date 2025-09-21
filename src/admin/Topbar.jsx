import React from 'react';

export default function Topbar({ onToggleSidebar }) {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(()=>{
    const id = setInterval(()=>setNow(new Date()), 10000);
    return ()=>clearInterval(id);
  },[]);
  return (
    <header className="h-14 backdrop-blur border-b bg-white/70 flex items-center justify-between px-4 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded border border-slate-300 text-slate-600 hover:bg-slate-100" aria-label="Toggle navigation">≡</button>
        <h1 className="text-xl font-bold tracking-tight">Admin Management</h1>
      </div>
      <div className="text-[11px] font-medium text-slate-500 tabular-nums">{now.toLocaleString()}</div>
    </header>
  );
}
