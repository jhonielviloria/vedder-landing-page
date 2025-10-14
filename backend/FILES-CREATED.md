# ✅ AWS EC2 Deployment Files - Created Successfully

All necessary files for deploying your Vedder backend to AWS EC2 have been created!

## 📦 Files Created (11 files)

### 1. **DEPLOYMENT.md** ⭐ START HERE
   - Complete step-by-step deployment guide
   - Covers everything from launching EC2 to SSL setup
   - Includes troubleshooting and testing sections
   - **📍 Action:** Read this first for full understanding

### 2. **README-DEPLOYMENT.md**
   - Quick reference guide
   - Overview of all deployment files
   - Quick start commands
   - **📍 Action:** Use as quick reference during deployment

### 3. **quick-deploy.sh** 🚀
   - One-command setup for new EC2 instances
   - Automates entire initial setup
   - **📍 Action:** Run this first on new EC2 instance
   ```bash
   ./quick-deploy.sh
   ```

### 4. **setup-ec2.sh**
   - Manual initial server setup script
   - Installs Node.js, PM2, Nginx, Git
   - Alternative to quick-deploy.sh
   - **📍 Action:** Optional - use if you prefer step-by-step

### 5. **ecosystem.config.js** ⚙️
   - PM2 process manager configuration
   - Cluster mode with auto-restart
   - Log configuration
   - **📍 Action:** Used by PM2 to start your app
   ```bash
   pm2 start ecosystem.config.js
   ```

### 6. **deploy.sh** 🔄
   - Automated deployment script for updates
   - Pulls latest code, installs deps, restarts app
   - **📍 Action:** Run this when you update your code
   ```bash
   ./deploy.sh
   ```

### 7. **nginx.conf** 🌐
   - Nginx reverse proxy configuration
   - Forwards requests from port 80/443 to 3000
   - Security headers included
   - **📍 Action:** Copy to /etc/nginx/sites-available/
   ```bash
   sudo nano /etc/nginx/sites-available/vedder-backend
   # (paste content and update domain)
   ```

### 8. **logrotate.conf** 📋
   - Automatic log rotation configuration
   - Keeps last 14 days of logs
   - Prevents disk space issues
   - **📍 Action:** Copy to /etc/logrotate.d/
   ```bash
   sudo cp logrotate.conf /etc/logrotate.d/vedder-backend
   ```

### 9. **backup-db.sh** 💾
   - Automated database backup script
   - Daily backups with 7-day retention
   - Compresses backups to save space
   - **📍 Action:** Setup in crontab for daily execution
   ```bash
   crontab -e
   # Add: 0 2 * * * /home/ubuntu/vedder-backend/backup-db.sh
   ```

### 10. **health-check.sh** 🏥
   - Application health monitoring script
   - Auto-restarts if app is down
   - Logs all health checks
   - **📍 Action:** Setup in crontab for 5-minute checks
   ```bash
   crontab -e
   # Add: */5 * * * * /home/ubuntu/vedder-backend/health-check.sh
   ```

### 11. **.env.production** 🔐
   - Production environment variables template
   - Database credentials, JWT secrets, etc.
   - **📍 Action:** Copy and update with real credentials
   ```bash
   cp .env.production .env
   nano .env  # Update with real values
   ```

### 12. **.gitignore**
   - Prevents sensitive files from being committed
   - Excludes logs, node_modules, .env files
   - **📍 Action:** Automatically used by Git

---

## 🎯 Quick Deployment Steps

### Step 1: Launch EC2 Instance
- Ubuntu 22.04 LTS
- t2.micro or t2.small
- Security Group: Ports 22, 80, 443, 3000

### Step 2: Connect to EC2
```bash
ssh -i "your-key.pem" ubuntu@YOUR-EC2-IP
```

### Step 3: Upload Deployment Files
**Option A - Using Git (Recommended):**
```bash
git clone https://github.com/jhonielviloria/vedder-landing-page.git
cd vedder-landing-page/backend
```

**Option B - Using SCP:**
```bash
# On your local machine
cd c:\Users\jhoni\Projects\react\vedder_landing_page\backend
scp -i "your-key.pem" -r ./* ubuntu@YOUR-EC2-IP:/home/ubuntu/vedder-backend/
```

### Step 4: Run Quick Deploy
```bash
cd /home/ubuntu/vedder-backend
chmod +x quick-deploy.sh
./quick-deploy.sh
```

### Step 5: Configure Environment
```bash
cp .env.production .env
nano .env
# Update with your database credentials
```

### Step 6: Start Application
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd
# Run the command it outputs
```

### Step 7: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/vedder-backend
# Paste content from nginx.conf
# Update server_name with your domain

sudo ln -s /etc/nginx/sites-available/vedder-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 8: Setup SSL (Optional but Recommended)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.yourdomain.com
```

### Step 9: Setup Monitoring
```bash
chmod +x health-check.sh backup-db.sh
crontab -e
# Add these lines:
# */5 * * * * /home/ubuntu/vedder-backend/health-check.sh
# 0 2 * * * /home/ubuntu/vedder-backend/backup-db.sh
```

### Step 10: Test Everything
```bash
# Test API health
curl http://localhost:3000/api/health

# Check PM2 status
pm2 list

# Check logs
pm2 logs vedder-backend --lines 50
```

---

## 📂 File Locations on EC2

```
/home/ubuntu/vedder-backend/
├── server.js                    # Your main server file
├── database.js                  # Database connection
├── package.json                 # Dependencies
├── ecosystem.config.js          # PM2 config ✅
├── deploy.sh                    # Deployment script ✅
├── health-check.sh              # Health monitoring ✅
├── backup-db.sh                 # Backup script ✅
├── .env                         # Environment variables ✅
├── logs/                        # Application logs
│   ├── out.log
│   └── err.log
└── node_modules/                # Dependencies

/etc/nginx/sites-available/
└── vedder-backend              # Nginx config ✅

/etc/logrotate.d/
└── vedder-backend              # Log rotation ✅

/home/ubuntu/backups/
└── vedder_backup_*.sql.gz      # Database backups
```

---

## 🔍 How to Use Each File

### For Initial Setup:
1. ✅ Read **DEPLOYMENT.md**
2. ✅ Run **quick-deploy.sh** OR **setup-ec2.sh**
3. ✅ Configure **.env** (copy from .env.production)
4. ✅ Start with **ecosystem.config.js**
5. ✅ Setup **nginx.conf**

### For Daily Operations:
- Use **deploy.sh** for updates
- Monitor with `pm2 logs`
- **health-check.sh** runs automatically
- **backup-db.sh** runs automatically

### For Maintenance:
- Check **logs/** directory
- Review **/home/ubuntu/backups/**
- Use **logrotate.conf** for log management

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Can SSH into EC2: `ssh -i key.pem ubuntu@IP`
- [ ] Node.js installed: `node --version`
- [ ] PM2 installed: `pm2 --version`
- [ ] App is running: `pm2 list`
- [ ] Health check passes: `curl http://localhost:3000/api/health`
- [ ] Nginx is running: `sudo systemctl status nginx`
- [ ] Can access via browser: `http://YOUR-EC2-IP/api/health`
- [ ] SSL works (if configured): `https://api.yourdomain.com/api/health`
- [ ] Logs are being created: `ls -la logs/`
- [ ] Cron jobs setup: `crontab -l`
- [ ] Frontend can connect to backend

---

## 🚀 Next Steps

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add deployment files"
   git push origin main
   ```

2. **Test locally** before deploying:
   ```bash
   npm start
   # Visit http://localhost:3000/api/health
   ```

3. **Deploy to EC2** following DEPLOYMENT.md

4. **Update Frontend** to use production API URL

5. **Monitor for 24 hours** to ensure stability

---

## 📞 Need Help?

1. **Check logs first:**
   ```bash
   pm2 logs vedder-backend --lines 100
   ```

2. **Review DEPLOYMENT.md** troubleshooting section

3. **Verify all files are executable:**
   ```bash
   chmod +x *.sh
   ```

4. **Test each component individually:**
   - Database: `mysql -h HOST -u USER -p`
   - Node app: `node server.js`
   - PM2: `pm2 list`
   - Nginx: `sudo nginx -t`

---

## 🎉 Success!

All deployment files are ready! You now have:
- ✅ Complete deployment documentation
- ✅ Automated setup scripts
- ✅ Production-ready configurations
- ✅ Monitoring and backup scripts
- ✅ Everything needed for a professional deployment

**Start with DEPLOYMENT.md and follow along!**

---

**Good luck with your deployment! 🚀**
