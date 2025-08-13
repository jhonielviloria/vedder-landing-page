import React from 'react';
import { supabaseEnabled } from '../lib/supabase';

export default function AdminMessages() {
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [pageSize] = React.useState(25);
  const [subjectFilter, setSubjectFilter] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [refreshToken, setRefreshToken] = React.useState(0);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
      if (subjectFilter) params.set('subject', subjectFilter);
      if (search.trim()) params.set('search', search.trim());
      const url = `/.netlify/functions/messages?${params.toString()}`;
      const resp = await fetch(url, { headers: { 'Accept': 'application/json' } });
      let text = await resp.text();
      let json;
      try { json = JSON.parse(text); } catch { throw new Error(`Unexpected response (status ${resp.status}). Body starts: ${text.slice(0,80)}`); }
      if (!resp.ok) throw new Error(json.error || 'Failed to load');
      setMessages(json.data || []);
      setTotal(json.total || 0);
    } catch (err) {
      setError(err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { fetchMessages(); /* eslint-disable-next-line */ }, [page, subjectFilter, refreshToken]);

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMessages();
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div>
      <h1>Messages</h1>
      {!supabaseEnabled && (
        <p style={{ color: '#b91c1c' }}>Client Supabase env not set. Server function may still return results if deployed.</p>
      )}
      <form onSubmit={onSearch} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '1rem 0' }}>
        <select value={subjectFilter} onChange={(e) => { setSubjectFilter(e.target.value); setPage(1); }}>
          <option value="">All Subjects</option>
          <option value="bin-quote">Sanitary Bin Quote</option>
          <option value="bin-rental">Bin Rental Inquiry</option>
          <option value="service-quote">Service Quote Request</option>
          <option value="maintenance">Maintenance & Support</option>
          <option value="partnership">Partnership Opportunity</option>
          <option value="general-inquiry">General Inquiry</option>
        </select>
        <input
          placeholder="Search message text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: '1 1 220px' }}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={() => { setSearch(''); setSubjectFilter(''); setPage(1); setRefreshToken(v => v + 1); }}>Reset</button>
      </form>
      {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
      {loading ? <p>Loading…</p> : (
        <>
          <p style={{ fontSize: 12, color: '#475569' }}>Showing {messages.length} of {total} (page {page} / {totalPages})</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '6px 8px', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                <th style={{ padding: '6px 8px', borderBottom: '1px solid #e2e8f0' }}>Name</th>
                <th style={{ padding: '6px 8px', borderBottom: '1px solid #e2e8f0' }}>Email</th>
                <th style={{ padding: '6px 8px', borderBottom: '1px solid #e2e8f0' }}>Subject</th>
                <th style={{ padding: '6px 8px', borderBottom: '1px solid #e2e8f0' }}>Message</th>
                <th style={{ padding: '6px 8px', borderBottom: '1px solid #e2e8f0' }}>Meta</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '6px 8px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{new Date(m.created_at).toLocaleString()}</td>
                  <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>{m.name}</td>
                  <td style={{ padding: '6px 8px', verticalAlign: 'top' }}><a href={`mailto:${m.email}`}>{m.email}</a></td>
                  <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>{m.subject}</td>
                  <td style={{ padding: '6px 8px', verticalAlign: 'top', maxWidth: 380 }}>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>{m.message}</div>
                  </td>
                  <td style={{ padding: '6px 8px', verticalAlign: 'top', fontSize: 11, color: '#475569' }}>
                    {m.ip_address && <div>IP: {m.ip_address}</div>}
                    {m.page_url && <div style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }} title={m.page_url}>Page</div>}
                    {m.user_agent && <details style={{ marginTop: 4 }}><summary>UA</summary><div style={{ maxWidth: 200, whiteSpace: 'normal' }}>{m.user_agent}</div></details>}
                  </td>
                </tr>
              ))}
              {!messages.length && (
                <tr><td colSpan={6} style={{ padding: 16, textAlign: 'center', color: '#64748b' }}>No messages found.</td></tr>
              )}
            </tbody>
          </table>
          <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
            <span style={{ fontSize: 12 }}>Page {page} / {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
            <button onClick={() => setRefreshToken(v => v + 1)}>Reload</button>
          </div>
        </>
      )}
    </div>
  );
}
