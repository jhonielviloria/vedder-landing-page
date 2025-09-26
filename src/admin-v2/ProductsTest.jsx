import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ProductsTest() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Products Test Page</Typography>
      <Typography>This is a test page to see if the routing works.</Typography>
    </Box>
  );
}