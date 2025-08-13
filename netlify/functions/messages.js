// Netlify Function: messages
// Provides paginated, filtered access to contact_messages using Supabase service role key.
// Query params: page (1-based), pageSize (max 100), subject, search
// NOTE: Uses built-in fetch (Node 18+) so no extra dependency required.

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server not configured' }) };
  }
  try {
    const params = event.queryStringParameters || {};
    const page = Math.max(1, parseInt(params.page || '1', 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(params.pageSize || '25', 10)));
    const subject = params.subject || '';
    const search = params.search || '';

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Build filter query string for PostgREST
    const filters = [];
    if (subject) filters.push(`subject=eq.${encodeURIComponent(subject)}`);
    // We'll apply ilike on message OR name via a PostgREST or clause if needed.
    // Simplify: if search provided, filter on message only (fast path).
    if (search) filters.push(`message=ilike.*${encodeURIComponent(search)}*`);

    const filterStr = filters.length ? `&${filters.join('&')}` : '';
    const url = `${SUPABASE_URL}/rest/v1/contact_messages?select=*,count=exact&order=created_at.desc${filterStr}`;

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        Range: `${from}-${to}`,
      },
    });

    if (!resp.ok) {
      const text = await resp.text();
      return { statusCode: resp.status, body: JSON.stringify({ error: 'Supabase query failed', detail: text }) };
    }

    const data = await resp.json();
    const contentRange = resp.headers.get('content-range') || '0-0/0';
    const total = parseInt(contentRange.split('/')[1], 10) || 0;

    return {
      statusCode: 200,
      body: JSON.stringify({ page, pageSize, total, data }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};

