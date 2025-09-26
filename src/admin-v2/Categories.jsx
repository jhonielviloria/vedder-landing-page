import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCategories } from '../admin/hooks/useCategories';

export default function Categories() {
  const { items, loading, error, saving, refresh, createCategory, updateCategory, deleteCategory } = useCategories();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ id: null, name: '', description: '' });

  useEffect(() => { refresh(); }, [refresh]);

  const handleOpen = (row) => {
    if (row) setForm({ 
      id: row.id, 
      name: row.name, 
      description: row.description || ''
    });
    else setForm({ id: null, name: '', description: '' });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const { id, ...data } = form;
      if (id) await updateCategory(id, data);
      else await createCategory(data);
      handleClose();
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
      } catch (error) {
        // Error is handled by the hook
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200, flex: 1 },
    { field: 'description', headerName: 'Description', width: 300, flex: 2 },
    { 
      field: 'created_at', 
      headerName: 'Created', 
      width: 150,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 120, 
      renderCell: (params) => (
        <Box>
          <IconButton size="small" onClick={() => handleOpen(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDelete(params.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Categories</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>Add Category</Button>
      </Box>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid 
          rows={items} 
          columns={columns} 
          pageSize={10} 
          rowsPerPageOptions={[10]} 
          disableSelectionOnClick 
          autoHeight 
        />
      </div>
      
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{form.id ? 'Edit' : 'New'} Category</DialogTitle>
        <DialogContent dividers>
          <TextField 
            margin="dense" 
            name="name" 
            label="Category Name" 
            value={form.name} 
            onChange={handleChange} 
            fullWidth 
            required
          />
          <TextField 
            margin="dense" 
            name="description" 
            label="Description" 
            value={form.description} 
            onChange={handleChange} 
            fullWidth 
            multiline 
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={saving || !form.name.trim()}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}