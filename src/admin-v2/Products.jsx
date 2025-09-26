import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useProducts } from '../admin/hooks/useProducts';
import { useCategories } from '../admin/hooks/useCategories';

const EMPTY_FORM = {
  id: null,
  name: '',
  category_id: '',
  price: '',
  stock: '',
  image_url: '',
  description: '',
  show_on_main_page: true,
};

export default function Products() {
  const { items, loading, error, saving, refresh, createProduct, updateProduct, deleteProduct } = useProducts();
  const { items: categories, loading: categoriesLoading, error: categoriesError, refresh: refreshCategories } = useCategories();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  useEffect(() => {
    refresh();
    refreshCategories();
  }, [refresh, refreshCategories]);

  const handleOpen = useCallback((row) => {
    if (row) {
      setForm({
        id: row.id,
        name: row.name || '',
        category_id: row.category_id || '',
        price: row.price || '',
        stock: row.stock || '',
        image_url: row.image_url || '',
        description: row.description || '',
        show_on_main_page: Boolean(row.show_on_main_page),
      });
    } else {
      setForm({ ...EMPTY_FORM });
    }
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setForm({ ...EMPTY_FORM });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    // Ensure category_id is a valid integer or null to satisfy FK
    const selectedCategory = categories.find(cat => cat.id === form.category_id);
    const payload = {
      name: form.name,
      price: form.price,
      stock: form.stock,
      image_url: form.image_url,
      description: form.description,
      show_on_main_page: form.show_on_main_page,
      category: selectedCategory ? selectedCategory.name : null,
      category_id: form.category_id ? Number(form.category_id) : null,
    };
    if (form.id) {
      await updateProduct(form.id, payload);
    } else {
      await createProduct(payload);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await deleteProduct(id);
    }
  };

  const rows = useMemo(() => items || [], [items]);
  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'category_name', headerName: 'Category', width: 150 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'stock', headerName: 'Stock', width: 100 },
    {
      field: 'show_on_main_page', headerName: 'Main Page', width: 120,
      renderCell: ({ value }) => <Checkbox checked={Boolean(value)} disabled size="small" />
    },
    {
      field: 'actions', headerName: 'Actions', width: 160, sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" variant="outlined" onClick={() => handleOpen(row)}>Edit</Button>
          <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(row.id)}>Delete</Button>
        </Box>
      )
    }
  ], [handleOpen, handleDelete]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" sx={{ p: 3 }}>Error: {error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>Add Product</Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        pageSize={10}
        disableRowSelectionOnClick
        loading={loading}
      />

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{form.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Name" value={form.name} onChange={handleChange} fullWidth margin="dense" required />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select name="category_id" value={form.category_id} onChange={handleChange} label="Category">
              <MenuItem value=""><em>None</em></MenuItem>
              {categories.map(cat => <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField name="price" label="Price" type="number" value={form.price} onChange={handleChange} fullWidth margin="dense" />
          <TextField name="stock" label="Stock" type="number" value={form.stock} onChange={handleChange} fullWidth margin="dense" />
          <TextField name="image_url" label="Image URL" value={form.image_url} onChange={handleChange} fullWidth margin="dense" />
          <TextField name="description" label="Description" value={form.description} onChange={handleChange} fullWidth margin="dense" multiline rows={3} />
          <FormControlLabel control={<Checkbox name="show_on_main_page" checked={form.show_on_main_page} onChange={handleChange} />} label="Show on main page" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={saving}>{saving ? 'Saving...' : form.id ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
