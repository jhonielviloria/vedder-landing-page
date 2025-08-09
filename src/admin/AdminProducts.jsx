import React from 'react';
import { supabase, supabaseEnabled } from '../lib/supabase';

export default function AdminProducts() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState({ type: '', text: '' });
  const [form, setForm] = React.useState({ id: null, name: '', description: '', category: '', price: '', stock: '', image_url: '' });

  const fetchProducts = async () => {
    if (!supabaseEnabled) return setLoading(false);
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  React.useEffect(() => { fetchProducts(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    if (!supabaseEnabled) {
      setMessage({ type: 'error', text: 'Supabase is not configured.' });
      return;
    }

    // Validate
    const price = Number(form.price);
    const stock = Number.isFinite(Number(form.stock)) ? Number(form.stock) : 0;
    if (!form.name.trim()) return setMessage({ type: 'error', text: 'Name is required.' });
    if (!Number.isFinite(price) || price < 0) return setMessage({ type: 'error', text: 'Price must be a valid number ≥ 0.' });
    if (!Number.isInteger(stock) || stock < 0) return setMessage({ type: 'error', text: 'Stock must be an integer ≥ 0.' });

    const payload = {
      name: form.name.trim(),
      description: form.description?.trim() || null,
      category: form.category?.trim() || null,
      price,
      stock,
      image_url: form.image_url?.trim() || null,
    };

    setSaving(true);
    try {
      let resp;
      if (form.id) {
        resp = await supabase.from('products').update(payload).eq('id', form.id).select('*').single();
      } else {
        resp = await supabase.from('products').insert(payload).select('*').single();
      }
      if (resp.error) {
        console.error('Supabase error:', resp.error);
        setMessage({ type: 'error', text: resp.error.message });
      } else {
        setMessage({ type: 'success', text: form.id ? 'Product updated.' : 'Product added.' });
        setForm({ id: null, name: '', description: '', category: '', price: '', stock: '', image_url: '' });
        await fetchProducts();
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Unexpected error. See console for details.' });
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (p) => setForm({ id: p.id, name: p.name, description: p.description || '', category: p.category || '', price: p.price, stock: p.stock, image_url: p.image_url || '' });
  const onDelete = async (id) => { if (!supabaseEnabled) return; await supabase.from('products').delete().eq('id', id); fetchProducts(); };

  return (
    <div>
      <h1>Products</h1>
      {!supabaseEnabled && (
        <p style={{ color: '#b91c1c' }}>
          Supabase isn’t configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local and restart.
        </p>
      )}
      {message.text && (
        <p style={{ color: message.type === 'error' ? '#b91c1c' : '#15803d' }}>{message.text}</p>
      )}
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.5rem', maxWidth: 540 }}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <input placeholder="Category (optional)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input placeholder="Image URL (optional)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        </div>
        <textarea rows={3} placeholder="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <input type="number" step="0.01" min="0" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <input type="number" min="0" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
        </div>
        <button className="btn" type="submit" disabled={saving}>
          {saving ? 'Saving…' : (form.id ? 'Update' : 'Add')} Product
        </button>
      </form>

      {loading ? <p>Loading…</p> : (
        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Image</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>${p.price?.toFixed ? p.price.toFixed(2) : p.price}</td>
                <td>{p.stock}</td>
                <td>{p.image_url ? <img src={p.image_url} alt={p.name} style={{ width: 48, height: 48, objectFit: 'cover' }} /> : '-'}</td>
                <td>
                  <button onClick={() => onEdit(p)}>Edit</button>
                  <button onClick={() => onDelete(p.id)} style={{ marginLeft: 8, color: '#b91c1c' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
