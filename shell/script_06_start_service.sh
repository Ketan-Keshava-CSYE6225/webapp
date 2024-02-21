#!/bin/bash

# Move systemd file to etc
sudo cp /tmp/webapp.service /etc/systemd/system/

# Provide access
sudo chown csye6225:csye6225 /etc/systemd/system/webapp.service
sudo chmod 750 /etc/systemd/system/webapp.service
sudo chown -R csye6225:csye6225 /opt/csye6225/
sudo chmod -R 750 /opt/csye6225/webapp

# Start the service
sudo systemctl daemon-reload
sudo systemctl enable webapp
sudo systemctl start webapp
sudo systemctl status webapp

# Install rsyslog for audit logs
sudo yum install -y rsyslog
sudo systemctl daemon-reload
