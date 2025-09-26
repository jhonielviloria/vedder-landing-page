import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useProducts } from '../admin/hooks/useProducts';

export default function Products() {
  const { items, loading, error, refresh } = useProducts();

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 4 }}>
        Error loading products: {error}
      </Typography>
    );
  }

  const rows = Array.isArray(items) ? items : [];
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'stock', headerName: 'Stock', width: 100 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Products
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
