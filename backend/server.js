import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool, testConnection, initializeTables } from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
const corsOptions = {
  origin: [
    'https://vedder.netlify.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://13.54.20.163'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Products endpoints
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.id ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, price, stock, image_url, description, category_id, show_on_main_page } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO products (name, price, stock, image_url, description, category_id, show_on_main_page) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, price, stock || 0, image_url, description, category_id, show_on_main_page !== undefined ? show_on_main_page : true]
    );
    
    const [newProduct] = await pool.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ?
    `, [result.insertId]);
    res.status(201).json(newProduct[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
  const { name, price, stock, image_url, description, category_id, show_on_main_page } = req.body;
    
    await pool.execute(
      'UPDATE products SET name = ?, price = ?, stock = ?, image_url = ?, description = ?, category_id = ?, show_on_main_page = ? WHERE id = ?',
      [name, price, stock, image_url, description, category_id, show_on_main_page !== undefined ? show_on_main_page : true, id]
    );
    
    const [updatedProduct] = await pool.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ?
    `, [id]);
    res.json(updatedProduct[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Categories endpoints
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories ORDER BY name');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name, description } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description || null]
    );
    res.status(201).json({ id: result.insertId, name, description });
  } catch (error) {
    console.error('Error creating category:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Category name already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create category' });
    }
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    await pool.execute(
      'UPDATE categories SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, description || null, id]
    );
    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Category name already exists' });
    } else {
      res.status(500).json({ error: 'Failed to update category' });
    }
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Check if any products are using this category
    const [products] = await pool.execute('SELECT COUNT(*) as count FROM products WHERE category_id = ?', [id]);
    if (products[0].count > 0) {
      return res.status(400).json({ error: 'Cannot delete category that is being used by products' });
    }
    
    await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Contact messages endpoints
app.post('/api/contact-messages', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Message sent successfully' 
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

app.get('/api/contact-messages', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    
    const [rows] = await pool.execute(
      'SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    
    const [countResult] = await pool.execute('SELECT COUNT(*) as total FROM contact_messages');
    const total = countResult[0].total;
    
    res.json({
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Admin stats endpoint (lightweight aggregate counts)
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [[{ productCount }]] = await pool.query('SELECT COUNT(*) AS productCount FROM products');
    const [[{ messageCount }]] = await pool.query('SELECT COUNT(*) AS messageCount FROM contact_messages');
    res.json({
      products: productCount,
      messages: messageCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Start server
async function startServer() {
  // Test database connection
  const dbConnected = await testConnection();
  if (!dbConnected) {
    console.error('❌ Cannot start server without database connection');
    process.exit(1);
  }
  
  // Initialize database tables
  await initializeTables();
  
  // Start listening
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  });
}

startServer();