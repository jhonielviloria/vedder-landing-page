import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import { fetchAdminStats } from '../services/adminService';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data, error: apiErr } = await fetchAdminStats();
        if (apiErr) throw new Error(apiErr);
        setStats(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">Products</Typography>
            <Typography variant="h5">{stats.products}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">Messages</Typography>
            <Typography variant="h5">{stats.messages}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">Orders</Typography>
            <Typography variant="h5">{stats.orders || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">Timestamp</Typography>
            <Typography variant="subtitle2">{new Date(stats.timestamp).toLocaleString()}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}