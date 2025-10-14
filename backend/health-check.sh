#!/bin/bash

# Health check script - monitors the application status
# Add to crontab: */5 * * * * /home/ubuntu/vedder-backend/health-check.sh

APP_NAME="vedder-backend"
HEALTH_URL="http://localhost:3000/api/health"
LOG_FILE="/home/ubuntu/vedder-backend/logs/health-check.log"

# Check if app is running in PM2
PM2_STATUS=$(pm2 jlist | grep -c "\"name\":\"$APP_NAME\"")

if [ $PM2_STATUS -eq 0 ]; then
    echo "[$(date)] ERROR: $APP_NAME is not running in PM2! Attempting to start..." >> $LOG_FILE
    cd /home/ubuntu/vedder-backend
    pm2 start ecosystem.config.js
    pm2 save
    exit 1
fi

# Check health endpoint
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $HTTP_CODE -eq 200 ]; then
    echo "[$(date)] OK: Health check passed (HTTP $HTTP_CODE)" >> $LOG_FILE
else
    echo "[$(date)] ERROR: Health check failed (HTTP $HTTP_CODE)! Restarting app..." >> $LOG_FILE
    pm2 restart $APP_NAME
fi
