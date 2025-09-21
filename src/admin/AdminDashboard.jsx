import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-slate-500 text-sm">Overview of platform activity.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <SkeletonCard label="Products" />
        <SkeletonCard label="Messages" />
        <SkeletonCard label="Orders" />
        <SkeletonCard label="Revenue" />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Activity</h2>
        <p className="text-sm text-slate-500">More detailed analytics will appear here once stats hook is connected.</p>
      </div>
    </div>
  );
}

function SkeletonCard({ label }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col">
      <div className="text-xs font-medium tracking-wide text-slate-500 uppercase mb-3">{label}</div>
      <div className="h-7 w-24 rounded bg-slate-200 animate-pulse mb-2" />
      <div className="h-3 w-32 rounded bg-slate-100 animate-pulse" />
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_30%_20%,#6366f1,transparent_60%)]" />
    </div>
  );
}
