# MySQL Migration Guide

## ✅ Completed Steps

1. **Environment Variables Updated** - `.env.local` now uses MySQL configuration
2. **MySQL Client Library Created** - `src/lib/mysql.js` for frontend API calls  
3. **Express.js Backend Created** - Complete MySQL backend server in `/backend` folder
4. **Frontend Components Updated** - Products, Contact, AdminProducts partially updated

## 🚀 Next Steps to Complete Migration

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure MySQL Database
1. **Install MySQL Server** (if not already installed)
2. **Create Database**:
   ```sql
   CREATE DATABASE vedder_landing_page;
   ```
3. **Update backend/.env** with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=vedder_landing_page
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   ```

### Step 3: Start Backend Server
```bash
cd backend
npm run dev
```
The server will automatically create the required tables on first run.

### Step 4: Update Frontend Environment
Update your main `.env.local` file:
```
VITE_API_BASE_URL=http://localhost:3001/api
```

### Step 5: Fix Remaining Files
1. **Complete AdminMessages.jsx** - File needs to be recreated (currently corrupted)
2. **Remove Supabase dependencies**:
   ```bash
   npm uninstall @supabase/supabase-js
   ```

## 📊 Database Schema

The backend automatically creates these tables:

### Products Table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  image_url TEXT,
  description TEXT,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 API Endpoints

- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/contact-messages` - Get contact messages (paginated)
- `POST /api/contact-messages` - Create contact message

## 🚨 Known Issues to Fix

1. **AdminMessages.jsx** - File corrupted during migration, needs recreation
2. **Netlify Functions** - Need to be updated or removed (messages.js)
3. **Package.json** - Remove Supabase dependency

## ✅ Working Features After Migration

- ✅ Products display (with fallback)
- ✅ Contact form submission
- ✅ Admin products management
- ❌ Admin messages viewing (needs fix)

## 🔄 Rollback Plan

If you need to rollback to Supabase:
1. Restore original `.env.local` with Supabase credentials
2. Run: `npm install @supabase/supabase-js`
3. Restore `src/lib/supabase.js`
4. Revert component imports back to supabase