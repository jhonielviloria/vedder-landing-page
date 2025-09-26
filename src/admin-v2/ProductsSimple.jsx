import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

export default function ProductsSimple() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        console.log('Fetched products:', data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log('ProductsSimple render - loading:', loading, 'error:', error, 'products count:', products.length);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Products ({products.length})</Typography>
      <Box>
        {products.map(product => (
          <Box key={product.id} sx={{ p: 2, border: '1px solid #ccc', mb: 1 }}>
            <Typography variant="h6">{product.name}</Typography>
            <Typography>Price: ${product.price}</Typography>
            <Typography>Stock: {product.stock}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}