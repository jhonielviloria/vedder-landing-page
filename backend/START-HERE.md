# 🚀 START HERE - Vedder Backend Deployment

## 👋 Welcome!

This folder contains everything you need to deploy your Vedder backend to AWS EC2.

---

## 📚 Which File Should I Read?

### **New to Deployment? START HERE:**
1. 📖 **[FILES-CREATED.md](./FILES-CREATED.md)** - Overview of all files
2. 📖 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete step-by-step guide
3. ✅ **[DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)** - Track your progress

### **Quick Reference:**
- 📖 **[README-DEPLOYMENT.md](./README-DEPLOYMENT.md)** - Quick start guide

---

## 🎯 3-Minute Quick Start

### What You Need:
- AWS Account
- Ubuntu 22.04 EC2 Instance
- SSH Key (.pem file)

### Deploy in 3 Steps:

#### Step 1: Launch EC2 & Connect
```bash
# Launch Ubuntu 22.04 instance
# Download .pem file
# Connect via SSH:
ssh -i "vedder-web-server-key.pem" ec2-user@ec2-13-54-20-163.ap-southeast-2.compute.amazonaws.com

```

#### Step 2: Run Quick Deploy
```bash
# Upload or clone your code
git clone https://github.com/jhonielviloria/vedder-landing-page.git
cd vedder-landing-page/backend

# Run quick deploy
chmod +x quick-deploy.sh
./quick-deploy.sh
```

#### Step 3: Configure & Start
```bash
# Create environment file
nano .env
# (Add your database credentials)

# Start application
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd

# Configure Nginx (follow prompts)
```

**Done! Your backend is now running on EC2! 🎉**

---

## 📋 All Deployment Files

### 📖 Documentation Files (Read These)
1. **DEPLOYMENT.md** - Complete deployment guide
2. **README-DEPLOYMENT.md** - Quick reference
3. **FILES-CREATED.md** - File overview
4. **DEPLOYMENT-CHECKLIST.md** - Progress tracker
5. **START-HERE.md** - This file

### 🔧 Configuration Files (Use These)
6. **ecosystem.config.js** - PM2 configuration
7. **nginx.conf** - Web server configuration
8. **logrotate.conf** - Log management
9. **.env.production** - Environment template
10. **.gitignore** - Git ignore rules

### 🛠️ Script Files (Run These)
11. **quick-deploy.sh** - One-command setup
12. **setup-ec2.sh** - Manual server setup
13. **deploy.sh** - Update deployment
14. **backup-db.sh** - Database backup
15. **health-check.sh** - Health monitoring

---

## 🗺️ Deployment Roadmap

```
┌─────────────────────────────────────────────────┐
│  Step 1: AWS Setup                              │
│  • Launch EC2 Instance                          │
│  • Configure Security Groups                    │
│  • Download SSH Key                             │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  Step 2: Initial Server Setup                   │
│  • Run quick-deploy.sh OR setup-ec2.sh         │
│  • Install Node.js, PM2, Nginx                  │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  Step 3: Deploy Application                     │
│  • Upload/clone code                            │
│  • Create .env file                             │
│  • Install dependencies                         │
│  • Start with PM2                               │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  Step 4: Configure Web Server                   │
│  • Setup Nginx reverse proxy                    │
│  • Configure SSL (optional)                     │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  Step 5: Setup Monitoring                       │
│  • Configure health checks                      │
│  • Setup database backups                       │
│  • Configure log rotation                       │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  Step 6: Test & Verify                          │
│  • Test API endpoints                           │
│  • Connect frontend                             │
│  • Monitor for 24 hours                         │
└─────────────────────────────────────────────────┘
```

---

## 🆘 Common Questions

### Q: Is this my first deployment?
**A:** Read **DEPLOYMENT.md** from start to finish.

### Q: I just want to update my code?
**A:** Run `./deploy.sh` on your EC2 server.

### Q: Something broke, how do I fix it?
**A:** Check DEPLOYMENT.md "Troubleshooting" section.

### Q: How do I check if my app is running?
**A:** Run `pm2 list` on your EC2 server.

### Q: Where are my logs?
**A:** Run `pm2 logs vedder-backend` or check `logs/` folder.

### Q: How do I restart my app?
**A:** Run `pm2 restart vedder-backend`.

---

## 🎓 Learning Path

### Beginner (Never deployed before):
1. Read **DEPLOYMENT.md** completely
2. Follow **DEPLOYMENT-CHECKLIST.md**
3. Use **quick-deploy.sh** for automation

### Intermediate (Deployed before):
1. Skim **README-DEPLOYMENT.md**
2. Use **quick-deploy.sh**
3. Configure manually if needed

### Advanced (Know what you're doing):
1. Review **FILES-CREATED.md**
2. Cherry-pick what you need
3. Customize configs

---

## 📞 Need Help?

### Check These First:
1. **PM2 logs:** `pm2 logs vedder-backend --lines 100`
2. **Nginx logs:** `sudo tail -f /var/log/nginx/error.log`
3. **Application logs:** `tail -f logs/out.log`

### Common Issues:
- **Can't SSH:** Check security group, verify .pem file permissions
- **App won't start:** Check .env file, verify database connection
- **502 Bad Gateway:** Check if PM2 app is running: `pm2 list`
- **Database error:** Verify credentials in .env

---

## ✅ Quick Health Check

Run these commands to verify everything:

```bash
# 1. Check PM2 is running
pm2 list

# 2. Check app health
curl http://localhost:3000/api/health

# 3. Check Nginx
sudo systemctl status nginx

# 4. Check logs for errors
pm2 logs vedder-backend --lines 20 --err

# 5. Check disk space
df -h

# All good? You're ready to go! 🎉
```

---

## 🎯 Time Estimates

- **First-time deployment:** 1-2 hours
- **With quick-deploy script:** 30-45 minutes
- **Update deployment:** 5-10 minutes
- **SSL setup:** 10-15 minutes

---

## 📦 What You Get

After completing deployment:
- ✅ Backend running 24/7 on AWS
- ✅ Auto-restart on crash
- ✅ Nginx reverse proxy
- ✅ SSL/HTTPS (optional)
- ✅ Automated backups
- ✅ Health monitoring
- ✅ Log rotation
- ✅ Easy update process

---

## 🚀 Ready to Deploy?

### Your Next Steps:
1. ✅ Read **[DEPLOYMENT.md](./DEPLOYMENT.md)**
2. ✅ Print **[DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)**
3. ✅ Launch your EC2 instance
4. ✅ Follow the guide step-by-step
5. ✅ Check off items as you complete them

---

## 💡 Pro Tips

1. **Use Elastic IP** - Your EC2 IP won't change on restart
2. **Enable CloudWatch** - Monitor your instance
3. **Setup Alarms** - Get notified of issues
4. **Test Locally First** - Make sure everything works
5. **Keep Backups** - Run backup-db.sh regularly
6. **Monitor Logs** - Check logs daily at first
7. **Update Regularly** - Keep packages up to date

---

## 🎉 You're All Set!

Everything you need is in this folder. Start with **DEPLOYMENT.md** and follow along!

**Good luck with your deployment! 🚀**

---

*Questions? Check DEPLOYMENT.md troubleshooting section or review the logs!*
