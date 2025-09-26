import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  connectTimeout: 10000,
  // Enable TCP keep-alive to avoid dropped connections
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Test connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    return false;
  }
}

// Initialize database tables
async function initializeTables() {
  try {
    // Create categories table first
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Insert default categories if table is empty
    const [categoryRows] = await pool.execute('SELECT COUNT(*) as count FROM categories');
    if (categoryRows[0].count === 0) {
      await pool.execute(`
        INSERT INTO categories (name, description) VALUES 
        ('Smart Home', 'Smart waste management solutions'),
        ('Industrial', 'Heavy-duty commercial waste equipment'),
        ('Eco-Friendly', 'Environmentally conscious waste solutions'),
        ('Home & Garden', 'Household waste management products'),
        ('Commercial', 'Business and commercial waste solutions'),
        ('Medical', 'Healthcare waste management products')
      `);
    }

    // Create products table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        stock INT DEFAULT 0,
        image_url TEXT,
        description TEXT,
        category VARCHAR(100),
        category_id INT,
        show_on_main_page BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `);

    // Add columns for existing tables
    try {
      await pool.execute(`
        ALTER TABLE products 
        ADD COLUMN show_on_main_page BOOLEAN DEFAULT TRUE
      `);
    } catch (error) {
      // Column already exists, ignore error
      if (!error.message.includes('Duplicate column name')) {
        console.warn('Note: show_on_main_page column may already exist');
      }
    }

    try {
      await pool.execute(`
        ALTER TABLE products 
        ADD COLUMN category_id INT,
        ADD FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      `);
    } catch (error) {
      // Column already exists, ignore error
      if (!error.message.includes('Duplicate column name')) {
        console.warn('Note: category_id column may already exist');
      }
    }

    // Create contact_messages table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Error initializing tables:', error);
  }
}

export { pool, testConnection, initializeTables };