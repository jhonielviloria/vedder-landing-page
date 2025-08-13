import React from 'react';

const stats = [
  { value: '53+ yrs', label: 'Industry Experience' },
  { value: '1,200+', label: 'Sites Serviced' },
  { value: '98%+', label: 'Client Retention' },
  { value: '24/7', label: 'Responsive Support' }
];

const pillars = [
  {
    title: 'Compliance & Safety First',
    body: 'We stay ahead of Australian hygiene regulations so your facilities are always audit‑ready and protected.'
  },
  {
    title: 'Sustainable Stewardship',
    body: 'Lower-impact consumables, efficient routing and waste minimisation built into every service plan.'
  },
  {
    title: 'Tailored Programs',
    body: 'No generic bundles – we assess traffic, risk zones and budgets to deploy only what delivers value.'
  },
  {
    title: 'Proactive Reliability',
    body: 'Scheduled service consistency with rapid escalation paths and transparent communication.'
  }
];

export default function Trust() {
  return (
    <section id="trust" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-14 text-center">
          <span className="inline-block text-xs tracking-wider font-semibold uppercase text-emerald-600 bg-emerald-50 rounded-full px-3 py-1 mb-4">Why Facilities Choose Us</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Operational hygiene you don’t have to chase</h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">We combine decades of specialised sanitary service experience with responsive support and sustainable practice – delivering consistent, compliant outcomes at scale.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-4 mb-12">
          {stats.map(s => (
            <div key={s.label} className="text-center md:text-left">
              <div className="text-2xl font-bold text-slate-900">{s.value}</div>
              <div className="mt-1 text-sm font-medium text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {pillars.map(p => (
            <div key={p.title} className="p-6 rounded-xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
