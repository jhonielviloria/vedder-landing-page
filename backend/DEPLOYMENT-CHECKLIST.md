# 📋 AWS EC2 Deployment Checklist

Use this checklist to track your deployment progress.

## Pre-Deployment
- [ ] AWS account created
- [ ] Have domain name (optional)
- [ ] Downloaded SSH key (.pem file)
- [ ] Code pushed to GitHub
- [ ] Database credentials ready (RDS or local)

---

## AWS Setup
- [ ] EC2 instance launched (Ubuntu 22.04)
- [ ] Security group configured:
  - [ ] Port 22 (SSH) - Your IP
  - [ ] Port 80 (HTTP) - Anywhere
  - [ ] Port 443 (HTTPS) - Anywhere
  - [ ] Port 3000 (Node.js) - Anywhere
- [ ] Elastic IP assigned (recommended)
- [ ] Can connect via SSH

---

## Server Setup
- [ ] Connected to EC2 via SSH
- [ ] Ran `quick-deploy.sh` or `setup-ec2.sh`
- [ ] Node.js installed (check: `node --version`)
- [ ] PM2 installed (check: `pm2 --version`)
- [ ] Nginx installed (check: `nginx -v`)
- [ ] Git installed (check: `git --version`)
- [ ] UFW firewall enabled

---

## Application Deployment
- [ ] Code cloned/uploaded to `/home/ubuntu/vedder-backend`
- [ ] Created `.env` file with correct credentials
- [ ] Dependencies installed (`npm install --production`)
- [ ] Tested app manually (`node server.js`)
- [ ] Started with PM2 (`pm2 start ecosystem.config.js`)
- [ ] PM2 shows app running (`pm2 list`)
- [ ] PM2 startup configured (`pm2 startup systemd`)
- [ ] PM2 configuration saved (`pm2 save`)

---

## Nginx Configuration
- [ ] Created nginx config: `/etc/nginx/sites-available/vedder-backend`
- [ ] Updated `server_name` with domain or IP
- [ ] Created symbolic link to sites-enabled
- [ ] Tested nginx config (`sudo nginx -t`)
- [ ] Restarted nginx (`sudo systemctl restart nginx`)
- [ ] Nginx status is active (`sudo systemctl status nginx`)

---

## SSL Certificate (Optional but Recommended)
- [ ] Domain DNS points to EC2 IP
- [ ] Certbot installed
- [ ] SSL certificate obtained (`sudo certbot --nginx`)
- [ ] Auto-renewal tested (`sudo certbot renew --dry-run`)

---

## Monitoring & Backups
- [ ] `health-check.sh` made executable
- [ ] Health check added to crontab (every 5 minutes)
- [ ] `backup-db.sh` updated with credentials
- [ ] Backup script made executable
- [ ] Backup added to crontab (daily at 2 AM)
- [ ] Log rotation configured (`/etc/logrotate.d/vedder-backend`)
- [ ] Backup directory created (`/home/ubuntu/backups`)

---

## Testing
- [ ] Health check works: `curl http://localhost:3000/api/health`
- [ ] API accessible via EC2 IP: `curl http://YOUR-EC2-IP/api/health`
- [ ] Database connection works (check logs: `pm2 logs`)
- [ ] All API endpoints tested
- [ ] CORS working with frontend
- [ ] SSL certificate working (if configured)

---

## Frontend Integration
- [ ] Updated `.env.production` in React project
- [ ] Set `REACT_APP_API_URL` to production backend URL
- [ ] Updated API calls to use production URL
- [ ] Frontend deployed and tested
- [ ] Frontend can fetch data from backend
- [ ] No CORS errors in browser console

---

## Security
- [ ] UFW firewall enabled and configured
- [ ] SSH key properly secured (400 permissions)
- [ ] `.env` file has correct permissions (600)
- [ ] Database not publicly accessible
- [ ] Security group rules follow least privilege
- [ ] Strong database password used
- [ ] JWT secret is random and strong

---

## Documentation
- [ ] EC2 IP address documented
- [ ] Database credentials stored securely
- [ ] SSH key location documented
- [ ] Domain/DNS settings documented
- [ ] Deployment process documented for team

---

## Post-Deployment Monitoring (First 24 Hours)
- [ ] Check logs every few hours: `pm2 logs vedder-backend`
- [ ] Monitor CPU/Memory: `pm2 monit`
- [ ] Verify health checks are running: `tail -f logs/health-check.log`
- [ ] Check for errors: `pm2 logs vedder-backend --err`
- [ ] Verify backups are being created
- [ ] Test all features in production

---

## Future Updates
- [ ] Update process documented
- [ ] `deploy.sh` tested and working
- [ ] Team knows how to deploy updates
- [ ] Rollback plan documented

---

## Optional Enhancements
- [ ] CloudWatch monitoring configured
- [ ] CloudWatch alarms set up
- [ ] S3 bucket for backups configured
- [ ] Auto-scaling group configured (for high traffic)
- [ ] Load balancer configured (for multiple instances)
- [ ] CI/CD pipeline setup (GitHub Actions)
- [ ] Database RDS with Multi-AZ (high availability)

---

## ✅ Deployment Complete!

Date Deployed: _______________

EC2 IP Address: _______________

Domain: _______________

Backend URL: _______________

Deployed By: _______________

---

## 🔧 Quick Commands Reference

```bash
# SSH to server
ssh -i "your-key.pem" ubuntu@YOUR-EC2-IP

# PM2 Commands
pm2 list
pm2 logs vedder-backend
pm2 restart vedder-backend
pm2 monit

# Nginx Commands
sudo systemctl status nginx
sudo systemctl restart nginx
sudo nginx -t

# Check logs
tail -f /home/ubuntu/vedder-backend/logs/out.log
tail -f /var/log/nginx/error.log

# Deploy updates
cd /home/ubuntu/vedder-backend
./deploy.sh
```

---

**Print this checklist and check off items as you complete them!**
