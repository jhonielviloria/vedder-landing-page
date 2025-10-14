#!/bin/bash

# EC2 Initial Setup Script
# Run this script once after launching a new EC2 instance

echo "============================================"
echo "   EC2 Server Initial Setup"
echo "============================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Step 1: Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

echo -e "${YELLOW}Step 2: Installing Node.js 20.x LTS...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo -e "${YELLOW}Step 3: Verifying Node.js installation...${NC}"
node --version
npm --version

echo -e "${YELLOW}Step 4: Installing PM2 globally...${NC}"
sudo npm install -g pm2

echo -e "${YELLOW}Step 5: Installing Nginx...${NC}"
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

echo -e "${YELLOW}Step 6: Installing MySQL Client (optional, if not using RDS)...${NC}"
sudo apt install mysql-client -y

echo -e "${YELLOW}Step 7: Setting up Firewall (UFW)...${NC}"
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo -e "${YELLOW}Step 8: Creating application directory...${NC}"
sudo mkdir -p /home/ubuntu/vedder-backend
sudo chown -R ubuntu:ubuntu /home/ubuntu/vedder-backend

echo -e "${YELLOW}Step 9: Creating logs directory...${NC}"
mkdir -p /home/ubuntu/vedder-backend/logs

echo -e "${YELLOW}Step 10: Installing Git...${NC}"
sudo apt install git -y

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}   Initial Setup Completed!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Clone your repository: cd /home/ubuntu/vedder-backend && git clone <your-repo-url> ."
echo "2. Create .env file: nano /home/ubuntu/vedder-backend/.env"
echo "3. Install dependencies: npm install --production"
echo "4. Start with PM2: pm2 start ecosystem.config.js"
echo "5. Configure Nginx reverse proxy"
echo "6. Setup SSL certificate with Certbot"
