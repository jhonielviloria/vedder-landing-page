import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

async function addSampleProducts() {
  let connection;
  
  try {
    console.log('🔌 Connecting to MySQL database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected successfully!');

    // Clear existing sample data
    console.log('🧹 Clearing existing products...');
    await connection.execute('DELETE FROM products');
    console.log('✅ Existing products cleared');

    // Add comprehensive sample products for Vedder landing page
    console.log('🌱 Adding sample products...');
    
    const sampleProducts = [
      {
        name: 'Premium Smart Waste Bin',
        price: 249.99,
        stock: 50,
        image_url: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop',
        description: 'Smart waste management solution with automatic sorting and compaction. Features touch-free operation and real-time monitoring.',
        category: 'Smart Home'
      },
      {
        name: 'Industrial Waste Compactor',
        price: 1299.99,
        stock: 25,
        image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
        description: 'Heavy-duty commercial waste compactor for businesses. Reduces waste volume by up to 80% and includes safety features.',
        category: 'Industrial'
      },
      {
        name: 'Eco-Friendly Recycling Station',
        price: 389.99,
        stock: 75,
        image_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=400&fit=crop',
        description: 'Multi-compartment recycling station made from recycled materials. Perfect for offices and public spaces.',
        category: 'Eco-Friendly'
      },
      {
        name: 'Touchless Sensor Bin',
        price: 89.99,
        stock: 120,
        image_url: 'https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=400&h=400&fit=crop',
        description: 'Hygienic touchless waste bin with motion sensor technology. Ideal for kitchens and bathrooms.',
        category: 'Smart Home'
      },
      {
        name: 'Commercial Dumpster 6-Yard',
        price: 899.99,
        stock: 15,
        image_url: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=400&fit=crop',
        description: 'Heavy-duty 6-yard commercial dumpster with reinforced steel construction and weatherproof lid.',
        category: 'Commercial'
      },
      {
        name: 'Compost Tumbler Pro',
        price: 199.99,
        stock: 60,
        image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
        description: 'Dual-chamber composting tumbler for efficient organic waste processing. Creates nutrient-rich compost in 6-8 weeks.',
        category: 'Eco-Friendly'
      },
      {
        name: 'Pedal Bin Deluxe 30L',
        price: 45.99,
        stock: 200,
        image_url: 'https://images.unsplash.com/photo-1571139833286-750349bd6d6d?w=400&h=400&fit=crop',
        description: 'Stylish 30-liter pedal bin with soft-close lid and removable inner bucket. Available in multiple colors.',
        category: 'Home & Garden'
      },
      {
        name: 'Medical Waste Container',
        price: 159.99,
        stock: 40,
        image_url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop',
        description: 'Biohazard-safe medical waste container with secure locking mechanism. Meets all health regulations.',
        category: 'Medical'
      },
      {
        name: 'Solar-Powered Compactor',
        price: 2499.99,
        stock: 8,
        image_url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop',
        description: 'Revolutionary solar-powered waste compactor for outdoor use. Reduces collection frequency by 80%.',
        category: 'Industrial'
      },
      {
        name: 'Kitchen Counter Bin',
        price: 24.99,
        stock: 150,
        image_url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
        description: 'Compact counter-top bin perfect for food scraps and small waste. Features charcoal filter for odor control.',
        category: 'Home & Garden'
      },
      {
        name: 'Wheelie Bin 240L',
        price: 79.99,
        stock: 100,
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        description: 'Standard 240-liter wheelie bin with durable wheels and secure lid. Weather-resistant and easy to maneuver.',
        category: 'Commercial'
      },
      {
        name: 'Designer Bathroom Bin',
        price: 34.99,
        stock: 80,
        image_url: 'https://images.unsplash.com/photo-1564540574859-0dfb63293365?w=400&h=400&fit=crop',
        description: 'Elegant bathroom waste bin with bamboo finish and soft-close lid. Complements modern bathroom decor.',
        category: 'Home & Garden'
      }
    ];

    for (const product of sampleProducts) {
      await connection.execute(
        'INSERT INTO products (name, price, stock, image_url, description, category) VALUES (?, ?, ?, ?, ?, ?)',
        [product.name, product.price, product.stock, product.image_url, product.description, product.category]
      );
    }

    console.log(`✅ Successfully added ${sampleProducts.length} sample products!`);

    // Show summary
    const [result] = await connection.execute('SELECT category, COUNT(*) as count FROM products GROUP BY category');
    console.log('\n📊 Products by category:');
    result.forEach(row => {
      console.log(`   - ${row.category}: ${row.count} products`);
    });

    const [totalResult] = await connection.execute('SELECT COUNT(*) as total FROM products');
    console.log(`\n🎯 Total products in database: ${totalResult[0].total}`);

    console.log('\n🎉 Sample products added successfully!');
    console.log('🔗 You can now:');
    console.log('   1. Start your backend server: npm run dev');
    console.log('   2. View products on your website');
    console.log('   3. Manage products through the admin panel');

  } catch (error) {
    console.error('❌ Error adding sample products:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the script
addSampleProducts();