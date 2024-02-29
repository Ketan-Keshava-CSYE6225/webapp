#!/bin/bash

# Set up db & user
# sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"
# sudo -u postgres psql -c "CREATE USER $DB_USERNAME WITH PASSWORD '$DB_PASSWORD';"
# sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USERNAME;"
# sudo sed -i.bak 's/ident/md5/g' /var/lib/pgsql/data/pg_hba.conf || { echo "Failed to update pg_hba.conf"; exit 1;}
# sudo systemctl restart postgresql
