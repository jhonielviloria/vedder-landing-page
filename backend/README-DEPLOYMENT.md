# 🚀 Vedder Backend - AWS EC2 Deployment Files

Complete deployment automation for deploying Vedder backend to AWS EC2.

## 📁 Deployment Files

| File | Description |
|------|-------------|
| **DEPLOYMENT.md** | Complete step-by-step deployment guide |
| **quick-deploy.sh** | One-command setup script for new EC2 instances |
| **setup-ec2.sh** | Initial server setup (Node.js, PM2, Nginx, etc.) |
| **ecosystem.config.js** | PM2 process manager configuration |
| **deploy.sh** | Automated deployment script for updates |
| **nginx.conf** | Nginx reverse proxy configuration |
| **logrotate.conf** | Log rotation configuration |
| **backup-db.sh** | Automated database backup script |
| **health-check.sh** | Application health monitoring script |
| **.env.production** | Production environment variables template |
| **.gitignore** | Git ignore rules for deployment files |

---

## 🎯 Quick Start

### For First-Time Deployment:

1. **Launch EC2 Instance** (Ubuntu 22.04 LTS)
2. **Connect via SSH:**
   ```bash
   ssh -i "your-key.pem" ubuntu@YOUR-EC2-IP
   ```
3. **Run Quick Deploy:**
   ```bash
   curl -o quick-deploy.sh https://raw.githubusercontent.com/jhonielviloria/vedder-landing-page/main/backend/quick-deploy.sh
   chmod +x quick-deploy.sh
   ./quick-deploy.sh
   ```

4. **Configure Environment:**
   ```bash
   cd /home/ubuntu/vedder-backend
   nano .env
   ```

5. **Start Application:**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup systemd
   ```

📖 **For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## 🔄 For Updates/Redeployment:

```bash
ssh -i "your-key.pem" ubuntu@YOUR-EC2-IP
cd /home/ubuntu/vedder-backend
./deploy.sh
```

---

## 📋 Prerequisites

- AWS Account with EC2 access
- Ubuntu 22.04 LTS EC2 instance
- SSH key pair (.pem file)
- Basic Linux command knowledge
- (Optional) Domain name for SSL

---

## 🛠️ What Gets Installed

- **Node.js 20.x LTS** - JavaScript runtime
- **PM2** - Process manager for Node.js
- **Nginx** - Reverse proxy server
- **Git** - Version control
- **MySQL Client** - Database client tools
- **UFW** - Firewall
- **Certbot** - SSL certificate manager (optional)

---

## 🔐 Security Configuration

### EC2 Security Group Rules:

| Type | Port | Source | Purpose |
|------|------|--------|---------|
| SSH | 22 | Your IP | SSH access |
| HTTP | 80 | 0.0.0.0/0 | Web traffic |
| HTTPS | 443 | 0.0.0.0/0 | Secure web traffic |
| Custom TCP | 3000 | 0.0.0.0/0 | Node.js app (temp) |

**Note:** After Nginx is configured, you can remove port 3000 from security group.

---

## 📊 Monitoring & Maintenance

### PM2 Commands:
```bash
pm2 list                    # List all processes
pm2 logs vedder-backend     # View logs
pm2 restart vedder-backend  # Restart app
pm2 stop vedder-backend     # Stop app
pm2 monit                   # Monitor resources
```

### Nginx Commands:
```bash
sudo systemctl status nginx    # Check status
sudo systemctl restart nginx   # Restart
sudo nginx -t                  # Test config
```

### View Logs:
```bash
# Application logs
pm2 logs vedder-backend --lines 100

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

---

## 🔄 CI/CD Pipeline (Optional)

For automated deployments with GitHub Actions, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to EC2

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_KEY }}
          script: |
            cd /home/ubuntu/vedder-backend
            ./deploy.sh
```

---

## 📞 Troubleshooting

### Application won't start:
```bash
pm2 logs vedder-backend --lines 100
```

### Can't connect from browser:
```bash
sudo systemctl status nginx
curl http://localhost:3000/api/health
```

### Database connection issues:
```bash
cat .env
# Verify database credentials
```

### Port already in use:
```bash
sudo lsof -i :3000
pm2 delete all
pm2 start ecosystem.config.js
```

---

## 🌐 Environment Variables

Required in `.env`:

```env
# Database (AWS RDS or Local)
DB_HOST=your-database-endpoint.rds.amazonaws.com
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
JWT_SECRET=your_random_secret_key
```

---

## 🎯 Deployment Checklist

- [ ] EC2 instance launched (Ubuntu 22.04)
- [ ] Security group configured (ports 22, 80, 443, 3000)
- [ ] SSH key downloaded and secured
- [ ] Connected to EC2 via SSH
- [ ] Ran setup script (`setup-ec2.sh` or `quick-deploy.sh`)
- [ ] Created `.env` file with correct credentials
- [ ] Installed dependencies (`npm install`)
- [ ] Started with PM2 (`pm2 start ecosystem.config.js`)
- [ ] Configured Nginx reverse proxy
- [ ] SSL certificate installed (if using domain)
- [ ] Firewall enabled (`sudo ufw enable`)
- [ ] Health checks configured
- [ ] Backup script configured
- [ ] Frontend connected to backend API
- [ ] Tested all API endpoints

---

## 📚 Additional Resources

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment guide
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt / Certbot](https://certbot.eff.org/)

---

## 💡 Tips

1. **Use Elastic IP** - Prevent IP changes on instance restart
2. **Enable CloudWatch** - Monitor instance metrics
3. **Setup Alarms** - Get notified of issues
4. **Regular Backups** - Run `backup-db.sh` daily
5. **Keep Updated** - Regularly update packages
6. **Use RDS** - For production database (more reliable)
7. **Load Balancer** - For high traffic (multiple instances)

---

## 🤝 Support

For issues:
1. Check logs: `pm2 logs vedder-backend`
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md)
3. Check AWS EC2 console
4. Verify security groups
5. Test locally first

---

## 📝 License

This deployment configuration is part of the Vedder Landing Page project.

---

**Made with ❤️ for easy deployment**
