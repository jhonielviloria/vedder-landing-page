# 🚀 AWS EC2 Deployment Guide - Vedder Backend

This guide provides step-by-step instructions for deploying the Vedder backend to AWS EC2.

## 📋 Prerequisites

- AWS Account with EC2 access
- Domain name (optional but recommended)
- SSH client (Git Bash, PowerShell, or terminal)
- Basic knowledge of Linux commands

## 🔧 Files Overview

| File | Purpose |
|------|---------|
| `setup-ec2.sh` | Initial EC2 server setup script |
| `ecosystem.config.js` | PM2 configuration for process management |
| `deploy.sh` | Automated deployment script |
| `nginx.conf` | Nginx reverse proxy configuration |
| `logrotate.conf` | Log rotation configuration |
| `backup-db.sh` | Database backup script |
| `health-check.sh` | Application health monitoring script |
| `.env.production` | Production environment variables template |

---

## 📝 Step-by-Step Deployment

### Step 1: Launch EC2 Instance

1. **Login to AWS Console** → Navigate to EC2
2. **Click "Launch Instance"**
3. **Configure Instance:**
   ```
   Name: vedder-backend-server
   AMI: Ubuntu Server 22.04 LTS (Free Tier Eligible)
   Instance Type: t2.micro (free tier) or t2.small
   Key Pair: Create new → Download .pem file (SAVE THIS!)
   ```

4. **Configure Security Group:**
   - Click "Edit" next to Network Settings
   - Add the following rules:

   | Type | Protocol | Port | Source |
   |------|----------|------|--------|
   | SSH | TCP | 22 | My IP (Your IP) |
   | HTTP | TCP | 80 | Anywhere (0.0.0.0/0) |
   | HTTPS | TCP | 443 | Anywhere (0.0.0.0/0) |
   | Custom TCP | TCP | 3000 | Anywhere (0.0.0.0/0) |

5. **Storage:** 8-20 GB (gp3 or gp2)
6. **Launch Instance**

### Step 2: Connect to EC2

**On Windows (Git Bash or PowerShell):**
```bash
# Navigate to where your .pem file is saved
cd ~/Downloads

# Set correct permissions (Git Bash)
chmod 400 vedder-web-server-key.pem

# Connect to EC2
ssh -i "vedder-web-server-key.pem" ec2-user@ec2-13-54-20-163.ap-southeast-2.compute.amazonaws.com

# Example:
# ssh -i "vedder-backend.pem" ubuntu@13.239.123.45
```

**Find your EC2 Public IP:**
- AWS Console → EC2 → Instances → Select your instance
- Copy "Public IPv4 address"

### Step 3: Initial Server Setup

Once connected to EC2, run the setup script:

```bash
# Download the setup script
curl -o setup-ec2.sh https://raw.githubusercontent.com/yourusername/vedder-landing-page/main/backend/setup-ec2.sh

# Or create it manually
nano setup-ec2.sh
# (paste the content from setup-ec2.sh file)

# Make it executable
chmod +x setup-ec2.sh

# Run the setup
./setup-ec2.sh
```

This script will install:
- ✅ Node.js 20.x LTS
- ✅ PM2 (Process Manager)
- ✅ Nginx (Reverse Proxy)
- ✅ MySQL Client
- ✅ Git
- ✅ Firewall (UFW)

### Step 4: Deploy Your Code

**Option A: Using Git (Recommended)**
```bash
# Navigate to app directory
cd /home/ubuntu/vedder-backend

# Clone your repository
git clone https://github.com/jhonielviloria/vedder-landing-page.git .

# Or if using a specific branch
git clone -b main https://github.com/jhonielviloria/vedder-landing-page.git .

# Navigate to backend folder
cd backend
mv * ../
cd ..
rm -rf backend
```

**Option B: Upload from Local Machine**
```bash
# On your local machine (from project root)
cd c:\Users\jhoni\Projects\react\vedder_landing_page\backend

# Upload to EC2
scp -i "path/to/vedder-backend.pem" -r ./* ubuntu@YOUR-EC2-IP:/home/ubuntu/vedder-backend/
```

### Step 5: Configure Environment

```bash
cd /home/ubuntu/vedder-backend

# Create production environment file
nano .env
```

**Add your environment variables:**
```env
# Database (use your AWS RDS endpoint)
DB_HOST=your-rds-endpoint.rds.amazonaws.com
DB_PORT=3306
DB_NAME=vedder_sanitary
DB_USER=admin
DB_PASSWORD=your_secure_password

# Server
PORT=3000
NODE_ENV=production

# CORS
FRONTEND_URL=https://yourdomain.com

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your_generated_secret_key_here
```

**Save:** `Ctrl+X` → `Y` → `Enter`

### Step 6: Install Dependencies

```bash
cd /home/ubuntu/vedder-backend

# Install production dependencies
npm install --production

# Verify installation
ls -la node_modules
```

### Step 7: Test the Application

```bash
# Test run the server
node server.js

# You should see output like:
# "Database connection pool created successfully"
# "Server running on port 3000"

# If it works, stop it with: Ctrl+C
```

### Step 8: Setup PM2

```bash
# Start application with PM2
pm2 start ecosystem.config.js

# Check status
pm2 list

# View logs
pm2 logs vedder-backend --lines 50

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup systemd

# Copy and run the command it outputs (it will look like):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

**PM2 Quick Commands:**
```bash
pm2 list                    # List all processes
pm2 logs vedder-backend     # View logs
pm2 restart vedder-backend  # Restart app
pm2 stop vedder-backend     # Stop app
pm2 monit                   # Monitor resources
pm2 flush                   # Clear logs
```

### Step 9: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/vedder-backend
```

**Paste the nginx.conf content (update with your domain):**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;  # Change to your domain or EC2 IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Enable the site:**
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/vedder-backend /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# If test passes, restart Nginx
sudo systemctl restart nginx

# Check Nginx status
sudo systemctl status nginx
```

### Step 10: Test Your API

```bash
# From EC2
curl http://localhost:3000/api/health

# From your local machine (replace with your EC2 IP)
curl http://YOUR-EC2-IP/api/health

# Should return: {"status":"OK","timestamp":"..."}
```

### Step 11: Setup SSL Certificate (HTTPS)

**Prerequisites:** Your domain must point to your EC2 IP

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d api.yourdomain.com

# Follow the prompts:
# Email: your@email.com
# Agree to terms: Y
# Share email: N
# Redirect HTTP to HTTPS: 2 (Yes - Recommended)

# Test auto-renewal
sudo certbot renew --dry-run
```

### Step 12: Setup Automated Deployment

```bash
# Make deploy script executable
chmod +x /home/ubuntu/vedder-backend/deploy.sh

# Test deployment
./deploy.sh
```

**To deploy updates in the future:**
```bash
ssh -i "vedder-backend.pem" ubuntu@YOUR-EC2-IP
cd /home/ubuntu/vedder-backend
./deploy.sh
```

### Step 13: Setup Monitoring & Backups

**Health Check Script:**
```bash
# Make executable
chmod +x /home/ubuntu/vedder-backend/health-check.sh

# Add to crontab (runs every 5 minutes)
crontab -e

# Add this line:
*/5 * * * * /home/ubuntu/vedder-backend/health-check.sh
```

**Database Backup Script:**
```bash
# Update backup-db.sh with your database credentials
nano /home/ubuntu/vedder-backend/backup-db.sh

# Make executable
chmod +x /home/ubuntu/vedder-backend/backup-db.sh

# Add to crontab (runs daily at 2 AM)
crontab -e

# Add this line:
0 2 * * * /home/ubuntu/vedder-backend/backup-db.sh
```

**Log Rotation:**
```bash
# Copy logrotate configuration
sudo cp /home/ubuntu/vedder-backend/logrotate.conf /etc/logrotate.d/vedder-backend

# Test log rotation
sudo logrotate -f /etc/logrotate.d/vedder-backend
```

---

## 🔗 Connect Frontend to Backend

### Update Frontend Configuration

In your React project, update the API URL:

**`.env.production` (create in React root):**
```env
REACT_APP_API_URL=https://api.yourdomain.com
```

**`src/lib/mysql.js`:**
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const mysql = {
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    return response.json();
  },
  // ... other methods
};
```

---

## 🧪 Testing Checklist

- [ ] Server is running: `pm2 list`
- [ ] Health check passes: `curl http://localhost:3000/api/health`
- [ ] Nginx is working: `curl http://YOUR-EC2-IP/api/health`
- [ ] Database connection works: Check logs with `pm2 logs`
- [ ] SSL certificate installed (if using domain)
- [ ] Frontend can connect to backend
- [ ] CORS is configured correctly
- [ ] Firewall is enabled: `sudo ufw status`

---

## 🚨 Troubleshooting

### Application won't start
```bash
# Check logs
pm2 logs vedder-backend --lines 100

# Check if port 3000 is in use
sudo lsof -i :3000

# Restart PM2
pm2 restart vedder-backend
```

### Can't connect from outside
```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check security group in AWS Console
# Ensure port 80/443 is open to 0.0.0.0/0
```

### Database connection issues
```bash
# Test database connection
mysql -h YOUR-RDS-ENDPOINT -u admin -p

# Check .env file
cat /home/ubuntu/vedder-backend/.env

# Verify RDS security group allows connections from EC2
```

### 502 Bad Gateway
```bash
# Application is not running
pm2 list
pm2 restart vedder-backend

# Check if app is listening on port 3000
netstat -tulpn | grep 3000
```

---

## 📊 Monitoring

**View Real-time Logs:**
```bash
pm2 logs vedder-backend
```

**Monitor Resources:**
```bash
pm2 monit
```

**Check Disk Space:**
```bash
df -h
```

**Check Memory:**
```bash
free -h
```

**Check Processes:**
```bash
htop
```

---

## 🔄 Update Workflow

When you make changes to your code:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```

2. **Deploy to EC2:**
   ```bash
   ssh -i "vedder-backend.pem" ubuntu@YOUR-EC2-IP
   cd /home/ubuntu/vedder-backend
   ./deploy.sh
   ```

---

## 📞 Support

For issues or questions:
- Check logs: `pm2 logs vedder-backend`
- Review this guide
- Check AWS EC2 console for instance health
- Review Security Groups and Network ACLs

---

## ✅ Production Checklist

- [ ] EC2 instance launched and accessible
- [ ] Security groups configured correctly
- [ ] Node.js and npm installed
- [ ] PM2 installed and configured
- [ ] Application code deployed
- [ ] Environment variables set
- [ ] Database connection tested
- [ ] PM2 running application
- [ ] Nginx configured as reverse proxy
- [ ] SSL certificate installed (for HTTPS)
- [ ] Firewall (UFW) enabled
- [ ] Health checks configured
- [ ] Log rotation configured
- [ ] Backup script configured
- [ ] Frontend connected to backend API
- [ ] Monitoring setup (PM2/CloudWatch)

---

**🎉 Congratulations! Your backend is now deployed on AWS EC2!**
