#!/bin/bash

# Vedder Backend Deployment Script
# This script automates the deployment process

echo "============================================"
echo "   Vedder Backend Deployment Started"
echo "============================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="/home/ubuntu/vedder-backend"
APP_NAME="vedder-backend"
BRANCH="main"

echo -e "${YELLOW}Step 1: Navigating to application directory...${NC}"
cd $APP_DIR || exit 1

echo -e "${YELLOW}Step 2: Stashing local changes (if any)...${NC}"
git stash

echo -e "${YELLOW}Step 3: Pulling latest code from $BRANCH branch...${NC}"
git pull origin $BRANCH

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to pull latest code!${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 4: Installing dependencies...${NC}"
npm install --production

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install dependencies!${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 5: Running database migrations (if any)...${NC}"
# Uncomment if you have migrations
# npm run migrate

echo -e "${YELLOW}Step 6: Restarting application with PM2...${NC}"
pm2 restart $APP_NAME

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to restart application!${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 7: Saving PM2 configuration...${NC}"
pm2 save

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}   Deployment Completed Successfully!${NC}"
echo -e "${GREEN}============================================${NC}"

# Show application status
echo -e "\n${YELLOW}Application Status:${NC}"
pm2 list

# Show recent logs
echo -e "\n${YELLOW}Recent Logs:${NC}"
pm2 logs $APP_NAME --lines 20 --nostream
