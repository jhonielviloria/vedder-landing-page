import React from 'react';
import { mysql, mysqlEnabled } from '../lib/mysql';

const EMPTY = { id: null, name: '', category: '', price: '', stock: '', image_url: '', description: '' };

export default function AdminProducts() {
  const [products, setProducts] = React.useState([]);
  const [form, setForm] = React.useState(EMPTY);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');
  const [notice, setNotice] = React.useState('');

  const load = async () => {
    if (!mysqlEnabled || !mysql) {
      setLoading(false);
      setError('MySQL backend not configured. Add VITE_API_BASE_URL to .env.local and restart.');
      return;
    }
    try {
      setLoading(true); setError('');
      const { data, error: apiErr } = await mysql.getProducts();
      if (apiErr) throw new Error(apiErr);
      setProducts(data || []);
    } catch (e) {
      console.error(e);
      setError(e.message || 'Failed to load products');
      setProducts([]);
    } finally { setLoading(false); }
  };

  React.useEffect(() => { load(); }, []);

  const reset = () => { setForm(EMPTY); setNotice(''); };
  const onEdit = (p) => setForm({ id: p.id, name: p.name || '', category: p.category || '', price: p.price?.toString() || '', stock: p.stock?.toString() || '', image_url: p.image_url || '', description: p.description || '' });

  const validate = () => {
    if (!form.name.trim()) return 'Name required';
    if (form.price === '' || isNaN(Number(form.price)) || Number(form.price) < 0) return 'Price must be >= 0';
    if (form.stock === '' || isNaN(parseInt(form.stock)) || parseInt(form.stock) < 0) return 'Stock must be >= 0';
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!mysqlEnabled || !mysql) return setError('Backend not configured');
    const vErr = validate(); if (vErr) return setNotice(vErr);
    try {
      setSaving(true); setError(''); setNotice('');
      const payload = {
        name: form.name.trim(),
        category: form.category || null,
        price: Number(form.price),
        stock: parseInt(form.stock) || 0,
        image_url: form.image_url?.trim() || null,
        description: form.description?.trim() || null
      };
      const resp = form.id ? await mysql.updateProduct(form.id, payload) : await mysql.createProduct(payload);
      if (resp.error) throw new Error(resp.error);
      await load();
      setNotice(form.id ? 'Product updated.' : 'Product added.');
      reset();
    } catch (e2) {
      console.error(e2); setError(e2.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const onDelete = async (id) => {
    if (!mysqlEnabled || !mysql) return;
    if (!window.confirm('Delete this product?')) return;
    try {
      setSaving(true); setError('');
      const { error: apiErr } = await mysql.deleteProduct(id);
      if (apiErr) throw new Error(apiErr);
      if (form.id === id) reset();
      await load();
    } catch (e) {
      console.error(e); setError(e.message || 'Delete failed');
    } finally { setSaving(false); }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Product Management</h2>
        <div className="flex justify-center py-8"><div className="animate-spin h-12 w-12 rounded-full border-b-2 border-blue-600" /></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button onClick={load} disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60">Refresh</button>
      </div>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"><strong>Error:</strong> {error}</div>}
      {notice && !error && <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded mb-4">{notice}</div>}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">{form.id ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="">Select Category</option>
                <option value="Smart Home">Smart Home</option>
                <option value="Industrial">Industrial</option>
                <option value="Eco-Friendly">Eco-Friendly</option>
                <option value="Commercial">Commercial</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Medical">Medical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="https://example.com/image.jpg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60">{saving ? 'Saving…' : (form.id ? 'Update Product' : 'Add Product')}</button>
            {form.id && <button type="button" onClick={reset} disabled={saving} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Products ({products.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(p => (
                <tr key={p.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {p.image_url && <img src={p.image_url} alt={p.name} className="h-10 w-10 rounded object-cover mr-4" onError={(e)=>{e.target.style.display='none';}} />}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{p.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{p.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.category || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${p.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => onEdit(p)} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                    <button onClick={() => onDelete(p.id)} disabled={saving} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <div className="text-center py-8 text-gray-500">No products found. Add your first product above.</div>}
        </div>
      </div>
    </div>
  );
}