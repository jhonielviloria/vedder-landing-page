#!/bin/bash

# Database backup script for Vedder Backend
# Add to crontab: 0 2 * * * /home/ubuntu/vedder-backend/backup-db.sh

# Configuration
BACKUP_DIR="/home/ubuntu/backups"
DB_NAME="vedder_sanitary"
DB_USER="admin"
DB_HOST="your-rds-endpoint.rds.amazonaws.com"
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/vedder_backup_$DATE.sql.gz"
RETENTION_DAYS=7

# Load environment variables
export $(grep -v '^#' /home/ubuntu/vedder-backend/.env | xargs)

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Perform backup
echo "Starting database backup at $(date)"
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME | gzip > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "Backup completed successfully: $BACKUP_FILE"
    
    # Remove old backups
    find $BACKUP_DIR -name "vedder_backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
    echo "Old backups removed (older than $RETENTION_DAYS days)"
else
    echo "Backup failed!"
    exit 1
fi

# Optional: Upload to S3 (uncomment if using)
# aws s3 cp $BACKUP_FILE s3://your-bucket-name/backups/

echo "Backup process completed at $(date)"
