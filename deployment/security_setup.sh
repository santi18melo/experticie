#!/bin/bash
# PREXCOL Backend - Security Configuration Script
# Run this script to harden security on the production server
#
# Usage: sudo bash security_setup.sh

set -e

echo "========================================="
echo "PREXCOL Backend - Security Setup"
echo "========================================="

PROJECT_DIR="/opt/prexcol-backend"
DOMAIN="api.prexcol.com"  # Change to your actual domain

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_info() { echo -e "${YELLOW}ℹ $1${NC}"; }

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root (use sudo)"
    exit 1
fi

# Step 1: Setup SSL with Let's Encrypt
print_info "Setting up SSL certificate with Let's Encrypt..."
read -p "Enter your email for Let's Encrypt: " EMAIL
read -p "Enter your domain (e.g., api.prexcol.com): " DOMAIN

certbot --nginx \
    --non-interactive \
    --agree-tos \
    --email $EMAIL \
    -d $DOMAIN \
    --redirect

print_success "SSL certificate installed"

# Step 2: Auto-renewal setup
print_info "Configuring automatic SSL renewal..."
cat > /etc/cron.d/certbot-renew <<EOF
0 3 * * * root certbot renew --quiet --post-hook "systemctl reload nginx"
EOF
print_success "Auto-renewal configured"

# Step 3: Secure file permissions
print_info "Setting secure file permissions..."
chown -R prexcol:prexcol $PROJECT_DIR
chmod -R 755 $PROJECT_DIR
chmod 600 $PROJECT_DIR/.env
chmod 600 $PROJECT_DIR/backend/settings.py
print_success "File permissions secured"

# Step 4: Configure SSH
print_info "Hardening SSH configuration..."
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/X11Forwarding yes/X11Forwarding no/' /etc/ssh/sshd_config
systemctl restart ssh
print_success "SSH hardened"

# Step 5: Setup fail2ban
print_info "Installing and configuring fail2ban..."
apt-get install -y fail2ban

cat > /etc/fail2ban/jail.local <<EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/prexcol_error.log

[nginx-noscript]
enabled = true
filter = nginx-noscript
logpath = /var/log/nginx/prexcol_access.log
EOF

systemctl enable fail2ban
systemctl restart fail2ban
print_success "fail2ban configured"

# Step 6: Setup automatic security updates
print_info "Enabling automatic security updates..."
apt-get install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
print_success "Automatic updates enabled"

# Step 7: Configure PostgreSQL security
print_info "Securing PostgreSQL..."
sudo -u postgres psql <<EOF
ALTER SYSTEM SET password_encryption = 'scram-sha-256';
SELECT pg_reload_conf();
EOF
print_success "PostgreSQL secured"

# Step 8: Setup log rotation
print_info "Configuring log rotation..."
cat > /etc/logrotate.d/prexcol <<EOF
/var/log/prexcol/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 prexcol prexcol
    sharedscripts
    postrotate
        systemctl reload prexcol > /dev/null 2>&1 || true
    endscript
}
EOF
print_success "Log rotation configured"

# Step 9: Firewall final configuration
print_info "Finalizing firewall rules..."
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
print_success "Firewall configured"

# Step 10: Test security
print_info "Running security tests..."
echo ""
echo "SSL Test:"
echo "  Visit: https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
echo ""
echo "Headers Test:"
curl -I https://$DOMAIN 2>/dev/null | grep -E 'Strict-Transport-Security|X-Frame-Options|X-Content-Type-Options'
echo ""

# Final summary
echo "========================================="
echo "Security Setup Complete!"
echo "========================================="
echo "✓ SSL certificate installed"
echo "✓ Auto-renewal configured"
echo "✓ File permissions secured"
echo "✓ SSH hardened"
echo "✓ fail2ban installed"
echo "✓ Automatic updates enabled"
echo "✓ PostgreSQL secured"
echo "✓ Log rotation configured"
echo "✓ Firewall enabled"
echo ""
echo "Additional recommendations:"
echo "1. Setup monitoring (e.g., Sentry, New Relic)"
echo "2. Configure database backups"
echo "3. Enable two-factor authentication for admin accounts"
echo "4. Regularly update dependencies"
echo "5. Monitor logs: sudo journalctl -u prexcol -f"
