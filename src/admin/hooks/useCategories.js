import { useState, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const useCategories = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/api/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (categoryData) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create category');
      }
      await refresh();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  }, [refresh]);

  const updateCategory = useCallback(async (id, categoryData) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update category');
      }
      await refresh();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  }, [refresh]);

  const deleteCategory = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete category');
      }
      await refresh();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [refresh]);

  return {
    items,
    loading,
    error,
    saving,
    refresh,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};