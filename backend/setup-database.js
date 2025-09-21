import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  acquireTimeout: 60000,
  timeout: 60000
};

async function createTables() {
  let connection;
  
  try {
    console.log('🔌 Connecting to AWS RDS MySQL database...');
    console.log(`📍 Host: ${dbConfig.host}`);
    console.log(`📊 Database: ${dbConfig.database}`);
    
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL database successfully!');

    // Create products table
    console.log('📋 Creating products table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        stock INT DEFAULT 0,
        image_url TEXT,
        description TEXT,
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Products table created/verified successfully');

    // Create contact_messages table
    console.log('📋 Creating contact_messages table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Contact messages table created/verified successfully');

    // Check if tables exist and show count
    const [productResult] = await connection.execute('SELECT COUNT(*) as count FROM products');
    const [messageResult] = await connection.execute('SELECT COUNT(*) as count FROM contact_messages');
    
    console.log(`📊 Current data:`);
    console.log(`   - Products: ${productResult[0].count} records`);
    console.log(`   - Messages: ${messageResult[0].count} records`);

    // Add some sample products if table is empty
    if (productResult[0].count === 0) {
      console.log('🌱 Adding sample products...');
      await connection.execute(`
        INSERT INTO products (name, price, stock, image_url, description, category) VALUES
        ('Sample Product 1', 29.99, 100, 'https://via.placeholder.com/300x300', 'This is a sample product for testing', 'Electronics'),
        ('Sample Product 2', 49.99, 50, 'https://via.placeholder.com/300x300', 'Another sample product', 'Accessories'),
        ('Sample Product 3', 19.99, 75, 'https://via.placeholder.com/300x300', 'Third sample product', 'Home')
      `);
      console.log('✅ Sample products added successfully');
    }

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Start your backend server: cd backend && npm run dev');
    console.log('   2. Start your frontend: npm run dev');
    console.log('   3. Visit your admin panel to manage products');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Connection refused. Please check:');
      console.error('   - Your AWS RDS instance is running');
      console.error('   - Security groups allow connections on port 3306');
      console.error('   - Your VPC settings are correct');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('💡 Access denied. Please check:');
      console.error('   - Your database username and password');
      console.error('   - The user has proper permissions');
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the setup
createTables();