#!/bin/bash

# Go to Webapp Directory
cd /opt/csye6225/webapp/

# Log env file
cat .env || { echo "No .env file found to log"; exit 1;}

# Load env
source .env

# Set up db & user
sudo -u postgres psql -c "CREATE DATABASE app_db;"
sudo -u postgres psql -c "CREATE USER app_user WITH PASSWORD 'password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE app_db TO app_user;"
sudo sed -i.bak 's/ident/md5/g' /var/lib/pgsql/data/pg_hba.conf || { echo "Failed to update pg_hba.conf"; exit 1;}
sudo systemctl restart postgresql