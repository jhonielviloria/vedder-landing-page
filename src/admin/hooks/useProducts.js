import React from 'react';
import { fetchAllProducts, createProductSvc, updateProductSvc, deleteProductSvc } from '../services/productService';

export function useProducts() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  const refresh = React.useCallback(async () => {
    try {
      setLoading(true); setError('');
      const { data, error: apiErr } = await fetchAllProducts();
      if (apiErr) throw new Error(apiErr);
      setItems(data || []);
    } catch (e) {
      setError(e.message || 'Failed to load products');
      setItems([]);
    } finally { setLoading(false); }
  }, []);

  const createProduct = React.useCallback(async (payload) => {
    setSaving(true); setError('');
    try {
      const { error: apiErr } = await createProductSvc(payload);
      if (apiErr) throw new Error(apiErr);
      await refresh();
    } catch (e) { setError(e.message || 'Create failed'); } finally { setSaving(false); }
  }, [refresh]);

  const updateProduct = React.useCallback(async (id, payload) => {
    setSaving(true); setError('');
    try {
      const { error: apiErr } = await updateProductSvc(id, payload);
      if (apiErr) throw new Error(apiErr);
      await refresh();
    } catch (e) { setError(e.message || 'Update failed'); } finally { setSaving(false); }
  }, [refresh]);

  const deleteProduct = React.useCallback(async (id) => {
    setSaving(true); setError('');
    try {
      const { error: apiErr } = await deleteProductSvc(id);
      if (apiErr) throw new Error(apiErr);
      await refresh();
    } catch (e) { setError(e.message || 'Delete failed'); } finally { setSaving(false); }
  }, [refresh]);

  return { items, loading, error, saving, refresh, createProduct, updateProduct, deleteProduct };
}
