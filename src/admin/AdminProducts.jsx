import React from 'react';
import { supabase, supabaseEnabled } from '../lib/supabase';

export default function AdminProducts() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [form, setForm] = React.useState({ id: null, name: '', price: '', stock: '', image_url: '' });

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
    if (!supabaseEnabled) return;
    const payload = { name: form.name, price: Number(form.price), stock: Number(form.stock), image_url: form.image_url };
    if (form.id) {
      await supabase.from('products').update(payload).eq('id', form.id);
    } else {
      await supabase.from('products').insert(payload);
    }
    setForm({ id: null, name: '', price: '', stock: '', image_url: '' });
    fetchProducts();
  };

  const onEdit = (p) => setForm({ id: p.id, name: p.name, price: p.price, stock: p.stock, image_url: p.image_url || '' });
  const onDelete = async (id) => { if (!supabaseEnabled) return; await supabase.from('products').delete().eq('id', id); fetchProducts(); };

  return (
    <div>
      <h1>Products</h1>
      {!supabaseEnabled && (
        <p style={{ color: '#b91c1c' }}>
          Supabase isn’t configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local and restart.
        </p>
      )}
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.5rem', maxWidth: 420 }}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
        <input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        <button className="btn" type="submit">{form.id ? 'Update' : 'Add'} Product</button>
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
