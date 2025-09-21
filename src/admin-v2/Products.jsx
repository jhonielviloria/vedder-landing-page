import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useProducts } from '../admin/hooks/useProducts';

export default function Products() {
  const { items, loading, error, saving, refresh, createProduct, updateProduct, deleteProduct } = useProducts();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ id: null, name: '', category: '', price: '', stock: '', image_url: '', description: '' });

  useEffect(() => { refresh(); }, [refresh]);

  const handleOpen = (row) => {
    if (row) setForm({ id: row.id, name: row.name, category: row.category, price: row.price, stock: row.stock, image_url: row.image_url || '', description: row.description || '' });
    else setForm({ id: null, name: '', category: '', price: '', stock: '', image_url: '', description: '' });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    const { id, ...data } = form;
    if (id) await updateProduct(id, data);
    else await createProduct(data);
    handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) await deleteProduct(id);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150, flex:1 },
    { field: 'category', headerName: 'Category', width: 120 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'stock', headerName: 'Stock', width: 100 },
    { field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => (
        <>
          <Button size="small" onClick={()=>handleOpen(params.row)}>Edit</Button>
          <Button size="small" color="error" onClick={()=>handleDelete(params.id)}>Delete</Button>
        </>
      )
    }
  ];

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" onClick={()=>handleOpen()}>Add Product</Button>
      </Box>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid rows={items} columns={columns} pageSize={10} rowsPerPageOptions={[10]} disableSelectionOnClick autoHeight />
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{form.id ? 'Edit' : 'New'} Product</DialogTitle>
        <DialogContent dividers>
          <TextField margin="dense" name="name" label="Name" value={form.name} onChange={handleChange} fullWidth />
          <TextField margin="dense" name="category" label="Category" value={form.category} onChange={handleChange} fullWidth />
          <TextField margin="dense" name="price" label="Price" type="number" value={form.price} onChange={handleChange} fullWidth />
          <TextField margin="dense" name="stock" label="Stock" type="number" value={form.stock} onChange={handleChange} fullWidth />
          <TextField margin="dense" name="image_url" label="Image URL" value={form.image_url} onChange={handleChange} fullWidth />
          <TextField margin="dense" name="description" label="Description" value={form.description} onChange={handleChange} fullWidth multiline rows={3} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}