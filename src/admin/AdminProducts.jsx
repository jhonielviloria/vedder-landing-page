import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React from 'react';

import { getProducts, createProduct, updateProduct, deleteProduct } from '../lib/mysql';

import { getProducts, createProduct, updateProduct, deleteProduct } from '../lib/mysql';

export default function AdminProducts() {

  const [products, setProducts] = useState([]);import { getProducts, createProduct, updateProduct, deleteProduct } from '../lib/mysql';

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');export default function AdminProducts() {



  useEffect(() => {  const [products, setProducts] = useState([]);import { getProducts, createProduct, updateProduct, deleteProduct } from '../lib/mysql';import { mysql, mysqlEnabled } from '../  const onEdit = (p) => setForm({ id: p.id, name: p.name, description: p.description || '', category: p.category || '', price: p.price, stock: p.stock, image_url: p.image_url || '' });

    fetchProducts();

  }, []);  const [loading, setLoading] = useState(true);



  const fetchProducts = async () => {  const [error, setError] = useState('');const AdminProducts = () => {

    try {

      setLoading(true);  const [form, setForm] = useState({

      const data = await getProducts();

      setProducts(data || []);    id: null,  const [products, setProducts] = useState([]);  const onDelete = async (id) => { if (!mysqlEnabled) return; await mysql.deleteProduct(id); fetchProducts(); };

      setError('');

    } catch (err) {    name: '',

      console.error('Error fetching products:', err);

      setError('Failed to fetch products. Please check your connection.');    price: '',  const [loading, setLoading] = useState(true);

      setProducts([]);

    } finally {    stock: '',

      setLoading(false);

    }    image_url: '',  const [error, setError] = useState(null);const AdminProducts = () => {

  };

    description: '',

  if (loading) {

    return (    category: ''  const [form, setForm] = useState({

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-4">Product Management</h2>  });

        <div className="flex justify-center items-center py-8">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>    id: null,  const [products, setProducts] = useState([]);  return (

        </div>

      </div>  useEffect(() => {

    );

  }    fetchProducts();    name: '',



  return (  }, []);

    <div className="p-6">

      <div className="flex justify-between items-center mb-6">    price: 0,  const [loading, setLoading] = useState(true);    <div>

        <h2 className="text-2xl font-bold">Product Management</h2>

        <button  const fetchProducts = async () => {

          onClick={fetchProducts}

          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"    try {    stock: 0,

        >

          Refresh      setLoading(true);

        </button>

      </div>      const data = await getProducts();    image_url: '',  const [error, setError] = useState(null);      <h1>Products</h1>



      {error && (      setProducts(data || []);

        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">

          <strong>Error:</strong> {error}      setError('');    description: '',

        </div>

      )}    } catch (err) {



      {/* Products List */}      console.error('Error fetching products:', err);    category: ''  const [form, setForm] = useState({      {!mysqlEnabled && (

      <div className="bg-white shadow rounded-lg">

        <div className="px-6 py-4 border-b border-gray-200">      setError('Failed to fetch products. Please check your connection.');

          <h3 className="text-lg font-medium">Products ({products.length})</h3>

        </div>      setProducts([]);  });

        <div className="overflow-x-auto">

          <table className="min-w-full divide-y divide-gray-200">    } finally {

            <thead className="bg-gray-50">

              <tr>      setLoading(false);    id: null,        <p style={{ color: '#b91c1c' }}>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>    }

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>  };  useEffect(() => {

              </tr>

            </thead>

            <tbody className="bg-white divide-y divide-gray-200">

              {products.map((product) => (  const handleSubmit = async (e) => {    fetchProducts();    name: '',          MySQL backend isn't configured or running. Add VITE_API_BASE_URL to .env.local and ensure backend server is running.

                <tr key={product.id}>

                  <td className="px-6 py-4 whitespace-nowrap">    e.preventDefault();

                    <div className="flex items-center">

                      {product.image_url && (    try {  }, []);

                        <img 

                          className="h-10 w-10 rounded object-cover mr-4"       const productData = {

                          src={product.image_url} 

                          alt={product.name}        ...form,    price: 0,        </p>

                          onError={(e) => {

                            e.target.style.display = 'none';        price: parseFloat(form.price) || 0,

                          }}

                        />        stock: parseInt(form.stock) || 0  const fetchProducts = async () => {

                      )}

                      <div>      };

                        <div className="text-sm font-medium text-gray-900">{product.name}</div>

                        <div className="text-sm text-gray-500">{product.description}</div>    try {    stock: 0,      )}

                      </div>

                    </div>      if (form.id) {

                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">        await updateProduct(form.id, productData);      setLoading(true);

                    {product.category || '-'}

                  </td>      } else {

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">

                    ${product.price}        await createProduct(productData);      const data = await getProducts();    image_url: '',

                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">      }

                    {product.stock}

                  </td>            setProducts(data || []);

                </tr>

              ))}      setForm({

            </tbody>

          </table>        id: null,      setError(null);    description: '',export default function AdminProducts() {

          {products.length === 0 && (

            <div className="text-center py-8 text-gray-500">        name: '',

              No products found.

            </div>        price: '',    } catch (err) {

          )}

        </div>        stock: '',

      </div>

    </div>        image_url: '',      console.error('Error fetching products:', err);    category: ''  const [products, setProducts] = React.useState([]);

  );

}        description: '',

        category: ''      setError('Failed to fetch products. Please check your connection.');

      });

            setProducts([]);  });  const [loading, setLoading] = React.useState(true);

      fetchProducts();

      setError('');    } finally {

    } catch (err) {

      console.error('Error saving product:', err);      setLoading(false);  const [saving, setSaving] = React.useState(false);

      setError('Failed to save product');

    }    }

  };

  };  useEffect(() => {  const [message, setMessage] = React.useState({ type: '', text: '' });

  const handleEdit = (product) => {

    setForm({

      id: product.id,

      name: product.name || '',  const handleSubmit = async (e) => {    fetchProducts();  const [form, setForm] = React.useState({ id: null, name: '', description: '', category: '', price: '', stock: '', image_url: '' });

      price: product.price?.toString() || '',

      stock: product.stock?.toString() || '',    e.preventDefault();

      image_url: product.image_url || '',

      description: product.description || '',    try {  }, []);

      category: product.category || ''

    });      if (form.id) {

  };

        await updateProduct(form.id, form);  const fetchProducts = async () => {

  const handleDelete = async (id) => {

    if (window.confirm('Are you sure you want to delete this product?')) {      } else {

      try {

        await deleteProduct(id);        await createProduct(form);  const fetchProducts = async () => {    if (!mysqlEnabled) return setLoading(false);

        fetchProducts();

        setError('');      }

      } catch (err) {

        console.error('Error deleting product:', err);          try {    setLoading(true);

        setError('Failed to delete product');

      }      setForm({

    }

  };        id: null,      setLoading(true);    const { data, error } = await mysql.getProducts();



  const resetForm = () => {        name: '',

    setForm({

      id: null,        price: 0,      const data = await getProducts();    if (!error) setProducts(data || []);

      name: '',

      price: '',        stock: 0,

      stock: '',

      image_url: '',        image_url: '',      setProducts(data || []);    setLoading(false);

      description: '',

      category: ''        description: '',

    });

  };        category: ''      setError(null);  };



  if (loading) {      });

    return (

      <div className="p-6">          } catch (err) {

        <h2 className="text-2xl font-bold mb-4">Product Management</h2>

        <div className="flex justify-center items-center py-8">      fetchProducts();

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>

        </div>    } catch (err) {      console.error('Error fetching products:', err);  React.useEffect(() => { fetchProducts(); }, []);

      </div>

    );      console.error('Error saving product:', err);

  }

      setError('Failed to save product');      setError('Failed to fetch products. Please check your connection.');

  return (

    <div className="p-6">    }

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">Product Management</h2>  };      setProducts([]);  const onSubmit = async (e) => {

        <button

          onClick={fetchProducts}

          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"

        >  const handleEdit = (product) => {    } finally {    e.preventDefault();

          Refresh

        </button>    setForm({

      </div>

      id: product.id,      setLoading(false);    setMessage({ type: '', text: '' });

      {error && (

        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">      name: product.name,

          <strong>Error:</strong> {error}

        </div>      price: product.price,    }    if (!mysqlEnabled) {

      )}

      stock: product.stock,

      {/* Product Form */}

      <div className="bg-white shadow rounded-lg p-6 mb-6">      image_url: product.image_url || '',  };      setMessage({ type: 'error', text: 'MySQL backend is not configured or running.' });

        <h3 className="text-lg font-medium mb-4">

          {form.id ? 'Edit Product' : 'Add New Product'}      description: product.description || '',

        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">      category: product.category || ''      return;

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>    });

              <label className="block text-sm font-medium text-gray-700">Name</label>

              <input  };  const handleSubmit = async (e) => {    }

                type="text"

                value={form.name}

                onChange={(e) => setForm({ ...form, name: e.target.value })}

                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"  const handleDelete = async (id) => {    e.preventDefault();

                required

              />    if (window.confirm('Are you sure you want to delete this product?')) {

            </div>

            <div>      try {    try {    // Validate

              <label className="block text-sm font-medium text-gray-700">Category</label>

              <select        await deleteProduct(id);

                value={form.category}

                onChange={(e) => setForm({ ...form, category: e.target.value })}        fetchProducts();      if (form.id) {    const price = Number(form.price);

                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"

              >      } catch (err) {

                <option value="">Select Category</option>

                <option value="Smart Home">Smart Home</option>        console.error('Error deleting product:', err);        await updateProduct(form.id, form);    const stock = Number.isFinite(Number(form.stock)) ? Number(form.stock) : 0;

                <option value="Industrial">Industrial</option>

                <option value="Eco-Friendly">Eco-Friendly</option>        setError('Failed to delete product');

                <option value="Commercial">Commercial</option>

                <option value="Home & Garden">Home & Garden</option>      }      } else {    if (!form.name.trim()) return setMessage({ type: 'error', text: 'Name is required.' });

                <option value="Medical">Medical</option>

              </select>    }

            </div>

            <div>  };        await createProduct(form);    if (!Number.isFinite(price) || price < 0) return setMessage({ type: 'error', text: 'Price must be a valid number ≥ 0.' });

              <label className="block text-sm font-medium text-gray-700">Price</label>

              <input

                type="number"

                step="0.01"  const resetForm = () => {      }    if (!Number.isInteger(stock) || stock < 0) return setMessage({ type: 'error', text: 'Stock must be an integer ≥ 0.' });

                value={form.price}

                onChange={(e) => setForm({ ...form, price: e.target.value })}    setForm({

                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"

                required      id: null,      

              />

            </div>      name: '',

            <div>

              <label className="block text-sm font-medium text-gray-700">Stock</label>      price: 0,      setForm({    const payload = {

              <input

                type="number"      stock: 0,

                value={form.stock}

                onChange={(e) => setForm({ ...form, stock: e.target.value })}      image_url: '',        id: null,      name: form.name.trim(),

                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"

                required      description: '',

              />

            </div>      category: ''        name: '',      description: form.description?.trim() || null,

          </div>

          <div>    });

            <label className="block text-sm font-medium text-gray-700">Image URL</label>

            <input  };        price: 0,      category: form.category?.trim() || null,

              type="url"

              value={form.image_url}

              onChange={(e) => setForm({ ...form, image_url: e.target.value })}

              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"  if (loading) {        stock: 0,      price,

            />

          </div>    return (

          <div>

            <label className="block text-sm font-medium text-gray-700">Description</label>      <div className="p-6">        image_url: '',      stock,

            <textarea

              value={form.description}        <h2 className="text-2xl font-bold mb-4">Product Management</h2>

              onChange={(e) => setForm({ ...form, description: e.target.value })}

              rows={3}        <div className="flex justify-center items-center py-8">        description: '',      image_url: form.image_url?.trim() || null,

              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"

            />          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>

          </div>

          <div className="flex gap-2">        </div>        category: ''    };

            <button

              type="submit"      </div>

              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"

            >    );      });

              {form.id ? 'Update Product' : 'Add Product'}

            </button>  }

            {form.id && (

              <button          setSaving(true);

                type="button"

                onClick={resetForm}  return (

                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"

              >    <div className="p-6">      fetchProducts();    try {

                Cancel

              </button>      <div className="flex justify-between items-center mb-6">

            )}

          </div>        <h2 className="text-2xl font-bold">Product Management</h2>    } catch (err) {      let resp;

        </form>

      </div>        <button



      {/* Products List */}          onClick={fetchProducts}      console.error('Error saving product:', err);      if (form.id) {

      <div className="bg-white shadow rounded-lg">

        <div className="px-6 py-4 border-b border-gray-200">          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"

          <h3 className="text-lg font-medium">Products ({products.length})</h3>

        </div>        >      setError('Failed to save product');        resp = await mysql.updateProduct(form.id, payload);

        <div className="overflow-x-auto">

          <table className="min-w-full divide-y divide-gray-200">          Refresh

            <thead className="bg-gray-50">

              <tr>        </button>    }      } else {

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>      </div>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>  };        resp = await mysql.createProduct(payload);

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>

              </tr>      {error && (

            </thead>

            <tbody className="bg-white divide-y divide-gray-200">        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">      }

              {products.map((product) => (

                <tr key={product.id}>          <strong>Error:</strong> {error}

                  <td className="px-6 py-4 whitespace-nowrap">

                    <div className="flex items-center">        </div>  const handleEdit = (product) => {      if (resp.error) {

                      {product.image_url && (

                        <img       )}

                          className="h-10 w-10 rounded object-cover mr-4" 

                          src={product.image_url}     setForm({        console.error('MySQL error:', resp.error);

                          alt={product.name}

                          onError={(e) => {      {/* Product Form */}

                            e.target.style.display = 'none';

                          }}      <div className="bg-white shadow rounded-lg p-6 mb-6">      id: product.id,        setMessage({ type: 'error', text: resp.error });

                        />

                      )}        <h3 className="text-lg font-medium mb-4">

                      <div>

                        <div className="text-sm font-medium text-gray-900">{product.name}</div>          {form.id ? 'Edit Product' : 'Add New Product'}      name: product.name,      } else {

                        <div className="text-sm text-gray-500">{product.description}</div>

                      </div>        </h3>

                    </div>

                  </td>        <form onSubmit={handleSubmit} className="space-y-4">      price: product.price,        setMessage({ type: 'success', text: form.id ? 'Product updated.' : 'Product added.' });

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">

                    {product.category || '-'}          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">            <div>      stock: product.stock,        setForm({ id: null, name: '', description: '', category: '', price: '', stock: '', image_url: '' });

                    ${product.price}

                  </td>              <label className="block text-sm font-medium text-gray-700">Name</label>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">

                    {product.stock}              <input      image_url: product.image_url || '',        await fetchProducts();

                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">                type="text"

                    <button

                      onClick={() => handleEdit(product)}                value={form.name}      description: product.description || '',      }

                      className="text-indigo-600 hover:text-indigo-900 mr-3"

                    >                onChange={(e) => setForm({ ...form, name: e.target.value })}

                      Edit

                    </button>                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"      category: product.category || ''    } catch (err) {

                    <button

                      onClick={() => handleDelete(product.id)}                required

                      className="text-red-600 hover:text-red-900"

                    >              />    });      console.error(err);

                      Delete

                    </button>            </div>

                  </td>

                </tr>            <div>  };      setMessage({ type: 'error', text: 'Unexpected error. See console for details.' });

              ))}

            </tbody>              <label className="block text-sm font-medium text-gray-700">Category</label>

          </table>

          {products.length === 0 && (              <select    } finally {

            <div className="text-center py-8 text-gray-500">

              No products found. Add your first product above.                value={form.category}

            </div>

          )}                onChange={(e) => setForm({ ...form, category: e.target.value })}  const handleDelete = async (id) => {      setSaving(false);

        </div>

      </div>                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"

    </div>

  );              >    if (window.confirm('Are you sure you want to delete this product?')) {    }

}
                <option value="">Select Category</option>

                <option value="Smart Home">Smart Home</option>      try {  };

                <option value="Industrial">Industrial</option>

                <option value="Eco-Friendly">Eco-Friendly</option>        await deleteProduct(id);

                <option value="Commercial">Commercial</option>

                <option value="Home & Garden">Home & Garden</option>        fetchProducts();  const onEdit = (p) => setForm({ id: p.id, name: p.name, description: p.description || '', category: p.category || '', price: p.price, stock: p.stock, image_url: p.image_url || '' });

                <option value="Medical">Medical</option>

              </select>      } catch (err) {  const onDelete = async (id) => { if (!supabaseEnabled) return; await supabase.from('products').delete().eq('id', id); fetchProducts(); };

            </div>

            <div>        console.error('Error deleting product:', err);

              <label className="block text-sm font-medium text-gray-700">Price</label>

              <input        setError('Failed to delete product');  return (

                type="number"

                step="0.01"      }    <div>

                value={form.price}

                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}    }      <h1>Products</h1>

                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"

                required  };      {!supabaseEnabled && (

              />

            </div>        <p style={{ color: '#b91c1c' }}>

            <div>

              <label className="block text-sm font-medium text-gray-700">Stock</label>  const resetForm = () => {          Supabase isn’t configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local and restart.

              <input

                type="number"    setForm({        </p>

                value={form.stock}

                onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}      id: null,      )}

                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"

                required      name: '',      {message.text && (

              />

            </div>      price: 0,        <p style={{ color: message.type === 'error' ? '#b91c1c' : '#15803d' }}>{message.text}</p>

          </div>

          <div>      stock: 0,      )}

            <label className="block text-sm font-medium text-gray-700">Image URL</label>

            <input      image_url: '',      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.5rem', maxWidth: 540 }}>

              type="url"

              value={form.image_url}      description: '',        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

              onChange={(e) => setForm({ ...form, image_url: e.target.value })}

              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"      category: ''        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>

            />

          </div>    });          <input placeholder="Category (optional)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />

          <div>

            <label className="block text-sm font-medium text-gray-700">Description</label>  };          <input placeholder="Image URL (optional)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />

            <textarea

              value={form.description}        </div>

              onChange={(e) => setForm({ ...form, description: e.target.value })}

              rows={3}  if (loading) {        <textarea rows={3} placeholder="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"

            />    return (        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>

          </div>

          <div className="flex gap-2">      <div className="p-6">          <input type="number" step="0.01" min="0" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />

            <button

              type="submit"        <h2 className="text-2xl font-bold mb-4">Product Management</h2>          <input type="number" min="0" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />

              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"

            >        <div className="flex justify-center items-center py-8">        </div>

              {form.id ? 'Update Product' : 'Add Product'}

            </button>          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>        <button className="btn" type="submit" disabled={saving}>

            {form.id && (

              <button        </div>          {saving ? 'Saving…' : (form.id ? 'Update' : 'Add')} Product

                type="button"

                onClick={resetForm}      </div>        </button>

                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"

              >    );      </form>

                Cancel

              </button>  }

            )}

          </div>      {loading ? <p>Loading…</p> : (

        </form>

      </div>  return (        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>



      {/* Products List */}    <div className="p-6">          <thead>

      <div className="bg-white shadow rounded-lg">

        <div className="px-6 py-4 border-b border-gray-200">      <div className="flex justify-between items-center mb-6">            <tr>

          <h3 className="text-lg font-medium">Products ({products.length})</h3>

        </div>        <h2 className="text-2xl font-bold">Product Management</h2>              <th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Image</th><th>Actions</th>

        <div className="overflow-x-auto">

          <table className="min-w-full divide-y divide-gray-200">        <button            </tr>

            <thead className="bg-gray-50">

              <tr>          onClick={fetchProducts}          </thead>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"          <tbody>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>        >            {products.map(p => (

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>

              </tr>          Refresh              <tr key={p.id}>

            </thead>

            <tbody className="bg-white divide-y divide-gray-200">        </button>                <td>{p.id}</td>

              {products.map((product) => (

                <tr key={product.id}>      </div>                <td>{p.name}</td>

                  <td className="px-6 py-4 whitespace-nowrap">

                    <div className="flex items-center">                <td>${p.price?.toFixed ? p.price.toFixed(2) : p.price}</td>

                      {product.image_url && (

                        <img className="h-10 w-10 rounded object-cover mr-4" src={product.image_url} alt={product.name} />      {error && (                <td>{p.stock}</td>

                      )}

                      <div>        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">                <td>{p.image_url ? <img src={p.image_url} alt={p.name} style={{ width: 48, height: 48, objectFit: 'cover' }} /> : '-'}</td>

                        <div className="text-sm font-medium text-gray-900">{product.name}</div>

                        <div className="text-sm text-gray-500">{product.description}</div>          <strong>Error:</strong> {error}                <td>

                      </div>

                    </div>        </div>                  <button onClick={() => onEdit(p)}>Edit</button>

                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">      )}                  <button onClick={() => onDelete(p.id)} style={{ marginLeft: 8, color: '#b91c1c' }}>Delete</button>

                    {product.category || '-'}

                  </td>                </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">

                    ${product.price}      {/* Product Form */}              </tr>

                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">      <div className="bg-white shadow rounded-lg p-6 mb-6">            ))}

                    {product.stock}

                  </td>        <h3 className="text-lg font-medium mb-4">          </tbody>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">

                    <button          {form.id ? 'Edit Product' : 'Add New Product'}        </table>

                      onClick={() => handleEdit(product)}

                      className="text-indigo-600 hover:text-indigo-900 mr-3"        </h3>      )}

                    >

                      Edit        <form onSubmit={handleSubmit} className="space-y-4">    </div>

                    </button>

                    <button          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  );

                      onClick={() => handleDelete(product.id)}

                      className="text-red-600 hover:text-red-900"            <div>}

                    >

                      Delete              <label className="block text-sm font-medium text-gray-700">Name</label>

                    </button>              <input

                  </td>                type="text"

                </tr>                value={form.name}

              ))}                onChange={(e) => setForm({ ...form, name: e.target.value })}

            </tbody>                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"

          </table>                required

          {products.length === 0 && (              />

            <div className="text-center py-8 text-gray-500">            </div>

              No products found. Add your first product above.            <div>

            </div>              <label className="block text-sm font-medium text-gray-700">Category</label>

          )}              <input

        </div>                type="text"

      </div>                value={form.category}

    </div>                onChange={(e) => setForm({ ...form, category: e.target.value })}

  );                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"

};              />

            </div>

export default AdminProducts;            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {form.id ? 'Update Product' : 'Add Product'}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Products List */}
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
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {product.image_url && (
                        <img className="h-10 w-10 rounded object-cover mr-4" src={product.image_url} alt={product.name} />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No products found. Add your first product above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;