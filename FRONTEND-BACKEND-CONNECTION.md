# Frontend to Backend Connection Setup

## ✅ Changes Made

### 1. Environment Variables Created
- **`.env`** - Development environment
- **`.env.production`** - Production environment (Netlify)

Both files contain:
```env
VITE_API_BASE_URL=http://13.54.20.163:3000/api
```

### 2. Backend CORS Updated
Updated `backend/server.js` to allow requests from:
- ✅ `https://vedder.netlify.app` (Your Netlify frontend)
- ✅ `http://localhost:5173` (Local development)
- ✅ `http://localhost:3000` (Alternative local)
- ✅ `http://13.54.20.163` (Direct EC2 access)

### 3. MySQL Client Updated
Added console logging to `src/lib/mysql.js` for easier debugging.

---

## 🚀 Next Steps

### Step 1: Update Backend on EC2

SSH into your EC2 instance and update the server:

```bash
# Connect to EC2
ssh -i "vedder-web-server-key.pem" ec2-user@ec2-13-54-20-163.ap-southeast-2.compute.amazonaws.com

# Navigate to backend directory
cd /home/ec2-user/vedder-backend

# Pull latest changes or upload new server.js
# If using git:
git pull origin main

# Or manually upload the updated server.js using SCP from local machine:
# scp -i "vedder-web-server-key.pem" server.js ec2-user@ec2-13-54-20-163.ap-southeast-2.compute.amazonaws.com:/home/ec2-user/vedder-backend/

# Restart PM2
pm2 restart vedder-backend

# Check logs
pm2 logs vedder-backend --lines 50
```

### Step 2: Test Backend API

From your local machine:
```bash
# Test health endpoint
curl http://13.54.20.163:3000/api/health

# Test products endpoint
curl http://13.54.20.163:3000/api/products
```

### Step 3: Test Frontend Locally

```bash
# In your project root
npm run dev

# Open http://localhost:5173
# Check browser console for API calls
# You should see: "MySQL Client initialized with base URL: http://13.54.20.163:3000/api"
```

### Step 4: Deploy to Netlify

#### Option A: Automatic Deployment (if connected to GitHub)
```bash
git add .
git commit -m "Update frontend to use EC2 backend"
git push origin main
```
Netlify will automatically redeploy.

#### Option B: Manual Deployment
```bash
# Build the project
npm run build

# The build files will be in the 'dist' folder
# Upload to Netlify:
# - Go to Netlify dashboard
# - Drag and drop the 'dist' folder to deploy
```

#### Option C: Netlify CLI
```bash
# Install Netlify CLI if not installed
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

---

## 🔧 Troubleshooting

### Issue: CORS Errors

**Check:**
1. Backend CORS settings in `server.js`
2. Make sure PM2 restarted after changes: `pm2 restart vedder-backend`
3. Check PM2 logs: `pm2 logs vedder-backend`

### Issue: Connection Refused

**Check:**
1. EC2 Security Group allows inbound traffic on port 3000
2. Backend is running: `pm2 list`
3. Test locally on EC2: `curl http://localhost:3000/api/health`

### Issue: Frontend not connecting

**Check:**
1. Browser console for errors (F12)
2. Verify .env file is being read: Check console logs
3. Clear browser cache and reload
4. Check Network tab in browser DevTools

---

## 🔐 EC2 Security Group Settings

Make sure your EC2 security group has these inbound rules:

| Type | Port | Source | Purpose |
|------|------|--------|---------|
| SSH | 22 | Your IP | SSH access |
| Custom TCP | 3000 | 0.0.0.0/0 | Backend API |
| HTTP | 80 | 0.0.0.0/0 | Future Nginx |
| HTTPS | 443 | 0.0.0.0/0 | Future SSL |

---

## 📝 Environment Variables Reference

### Local Development (.env)
```env
VITE_API_BASE_URL=http://13.54.20.163:3000/api
```

### Netlify Environment Variables

Go to Netlify Dashboard → Site Settings → Environment Variables

Add:
- **Key:** `VITE_API_BASE_URL`
- **Value:** `http://13.54.20.163:3000/api`

---

## ✅ Verification Checklist

- [ ] Backend updated with new CORS settings
- [ ] PM2 restarted on EC2
- [ ] Health endpoint works: `curl http://13.54.20.163:3000/api/health`
- [ ] Products endpoint works: `curl http://13.54.20.163:3000/api/products`
- [ ] Frontend .env files created
- [ ] Frontend tested locally (check console logs)
- [ ] No CORS errors in browser console
- [ ] Frontend deployed to Netlify
- [ ] Netlify environment variable added
- [ ] Production frontend connects to backend

---

## 🎯 Testing Endpoints

```bash
# Health Check
curl http://13.54.20.163:3000/api/health

# Get Products
curl http://13.54.20.163:3000/api/products

# Get Categories
curl http://13.54.20.163:3000/api/categories

# Get Messages
curl http://13.54.20.163:3000/api/messages
```

---

## 🚀 Ready to Deploy!

1. ✅ Update backend on EC2 with new `server.js`
2. ✅ Restart PM2
3. ✅ Test API endpoints
4. ✅ Test frontend locally
5. ✅ Deploy to Netlify
6. ✅ Add environment variable in Netlify
7. ✅ Test production frontend

---

**Your backend is at:** `http://13.54.20.163:3000/api`  
**Your frontend is at:** `https://vedder.netlify.app`

Good luck! 🎉
