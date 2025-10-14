#!/bin/bash

# Quick Start Script for EC2 Deployment
# This combines all steps into one script for first-time setup

echo "============================================"
echo "   Vedder Backend - Quick Deploy"
echo "============================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    echo -e "${RED}Please do not run as root. Run as ubuntu user.${NC}"
    exit 1
fi

# Configuration
APP_DIR="/home/ubuntu/vedder-backend"
REPO_URL="https://github.com/jhonielviloria/vedder-landing-page.git"

echo -e "${BLUE}This script will:${NC}"
echo "1. Update system packages"
echo "2. Install Node.js, PM2, Nginx, Git"
echo "3. Clone your repository"
echo "4. Install dependencies"
echo "5. Setup PM2"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

echo -e "${YELLOW}[1/8] Updating system...${NC}"
sudo apt update && sudo apt upgrade -y

echo -e "${YELLOW}[2/8] Installing Node.js...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo -e "${YELLOW}[3/8] Installing PM2...${NC}"
sudo npm install -g pm2

echo -e "${YELLOW}[4/8] Installing Nginx...${NC}"
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

echo -e "${YELLOW}[5/8] Installing Git...${NC}"
sudo apt install git -y

echo -e "${YELLOW}[6/8] Cloning repository...${NC}"
if [ -d "$APP_DIR" ]; then
    echo "Directory exists. Removing..."
    rm -rf $APP_DIR
fi
git clone $REPO_URL $APP_DIR
cd $APP_DIR/backend
mv * ../
cd ..
rm -rf backend

echo -e "${YELLOW}[7/8] Installing dependencies...${NC}"
npm install --production

echo -e "${YELLOW}[8/8] Setting up directories...${NC}"
mkdir -p logs
mkdir -p /home/ubuntu/backups

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}   Initial Setup Complete!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Create .env file:"
echo "   ${YELLOW}nano $APP_DIR/.env${NC}"
echo ""
echo "2. Start the application:"
echo "   ${YELLOW}cd $APP_DIR${NC}"
echo "   ${YELLOW}pm2 start ecosystem.config.js${NC}"
echo "   ${YELLOW}pm2 save${NC}"
echo "   ${YELLOW}pm2 startup systemd${NC}"
echo ""
echo "3. Configure Nginx:"
echo "   ${YELLOW}sudo nano /etc/nginx/sites-available/vedder-backend${NC}"
echo "   (Copy content from nginx.conf)"
echo ""
echo "4. Enable site:"
echo "   ${YELLOW}sudo ln -s /etc/nginx/sites-available/vedder-backend /etc/nginx/sites-enabled/${NC}"
echo "   ${YELLOW}sudo nginx -t${NC}"
echo "   ${YELLOW}sudo systemctl restart nginx${NC}"
echo ""
echo "5. Setup SSL (if you have a domain):"
echo "   ${YELLOW}sudo apt install certbot python3-certbot-nginx -y${NC}"
echo "   ${YELLOW}sudo certbot --nginx -d api.yourdomain.com${NC}"
