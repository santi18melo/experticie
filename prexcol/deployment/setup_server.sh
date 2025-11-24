#!/bin/bash
# PREXCOL Backend - Initial Server Setup Script
# Run this script ONCE on a fresh Ubuntu server to prepare it for PREXCOL
#
# Usage: sudo bash setup_server.sh

set -e  # Exit on error

echo "========================================="
echo "PREXCOL Backend - Server Setup"
echo "========================================="

# Configuration
PROJECT_DIR="/opt/prexcol-backend"
USER="prexcol"
GROUP="prexcol"
REPO_URL="https://github.com/your-org/prexcol-backend.git"  # Replace with actual repo
PYTHON_VERSION="3.11"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_error() { echo -e "${RED}✗ $1${NC}"; }
print_info() { echo -e "${YELLOW}ℹ $1${NC}"; }

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Step 1: Update system
print_info "Updating system packages..."
apt-get update
apt-get upgrade -y
print_success "System updated"

# Step 2: Install dependencies
print_info "Installing system dependencies..."
apt-get install -y \
    python$PYTHON_VERSION \
    python$PYTHON_VERSION-venv \
    python3-pip \
    git \
    nginx \
    postgresql \
    postgresql-contrib \
    libpq-dev \
    build-essential \
    curl \
    certbot \
    python3-certbot-nginx
print_success "Dependencies installed"

# Step 3: Create user and group
print_info "Creating application user..."
if ! id "$USER" &>/dev/null; then
    useradd --system --create-home --shell /bin/bash $USER
    print_success "User '$USER' created"
else
    print_info "User '$USER' already exists"
fi

# Step 4: Create project directory
print_info "Creating project directory..."
mkdir -p $PROJECT_DIR
chown $USER:$GROUP $PROJECT_DIR
print_success "Project directory created"

# Step 5: Clone repository
print_info "Cloning repository..."
if [ ! -d "$PROJECT_DIR/.git" ]; then
    sudo -u $USER git clone $REPO_URL $PROJECT_DIR
    print_success "Repository cloned"
else
    print_info "Repository already exists"
fi

# Step 6: Create virtual environment
print_info "Creating Python virtual environment..."
sudo -u $USER python$PYTHON_VERSION -m venv $PROJECT_DIR/venv
print_success "Virtual environment created"

# Step 7: Install Python dependencies
print_info "Installing Python packages..."
sudo -u $USER $PROJECT_DIR/venv/bin/pip install --upgrade pip
sudo -u $USER $PROJECT_DIR/venv/bin/pip install -r $PROJECT_DIR/requirements.txt
print_success "Python packages installed"

# Step 8: Create necessary directories
print_info "Creating application directories..."
mkdir -p $PROJECT_DIR/staticfiles
mkdir -p $PROJECT_DIR/media
mkdir -p /var/log/prexcol
chown -R $USER:$GROUP $PROJECT_DIR/staticfiles
chown -R $USER:$GROUP $PROJECT_DIR/media
chown -R $USER:$GROUP /var/log/prexcol
print_success "Directories created"

# Step 9: Setup PostgreSQL
print_info "Configuring PostgreSQL..."
read -p "Enter database name [prexcol_db]: " DB_NAME
DB_NAME=${DB_NAME:-prexcol_db}
read -p "Enter database user [prexcol_user]: " DB_USER
DB_USER=${DB_USER:-prexcol_user}
read -sp "Enter database password: " DB_PASS
echo

sudo -u postgres psql <<EOF
CREATE DATABASE $DB_NAME;
CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';
ALTER ROLE $DB_USER SET client_encoding TO 'utf8';
ALTER ROLE $DB_USER SET default_transaction_isolation TO 'read committed';
ALTER ROLE $DB_USER SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOF
print_success "PostgreSQL configured"

# Step 10: Create .env file
print_info "Creating environment file..."
cat > $PROJECT_DIR/.env <<EOF
SECRET_KEY=$(openssl rand -base64 50)
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://$DB_USER:$DB_PASS@localhost:5432/$DB_NAME
CORS_ALLOWED_ORIGINS=http://localhost
EOF
chown $USER:$GROUP $PROJECT_DIR/.env
chmod 600 $PROJECT_DIR/.env
print_success "Environment file created"

# Step 11: Run initial migrations
print_info "Running database migrations..."
cd $PROJECT_DIR/backend
sudo -u $USER $PROJECT_DIR/venv/bin/python manage.py migrate
print_success "Migrations completed"

# Step 12: Collect static files
print_info "Collecting static files..."
sudo -u $USER $PROJECT_DIR/venv/bin/python manage.py collectstatic --noinput
print_success "Static files collected"

# Step 13: Create superuser
print_info "Creating Django superuser..."
echo "You will be prompted to create an admin account:"
sudo -u $USER $PROJECT_DIR/venv/bin/python manage.py createsuperuser
print_success "Superuser created"

# Step 14: Install systemd service
print_info "Installing systemd service..."
cp $PROJECT_DIR/deployment/prexcol.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable prexcol
systemctl start prexcol
print_success "Systemd service installed and started"

# Step 15: Configure Nginx
print_info "Configuring Nginx..."
cp $PROJECT_DIR/deployment/prexcol.nginx /etc/nginx/sites-available/prexcol
ln -sf /etc/nginx/sites-available/prexcol /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
print_success "Nginx configured and restarted"

# Step 16: Configure firewall
print_info "Configuring firewall..."
ufw allow 'Nginx Full'
ufw allow 'OpenSSH'
ufw --force enable
print_success "Firewall configured"

# Final summary
echo ""
echo "========================================="
echo "Setup Complete!"
echo "========================================="
echo "Project Directory: $PROJECT_DIR"
echo "Database: $DB_NAME"
echo "Database User: $DB_USER"
echo ""
echo "Next steps:"
echo "1. Update .env file with production values"
echo "2. Configure domain in /etc/nginx/sites-available/prexcol"
echo "3. Setup SSL with: sudo certbot --nginx -d api.prexcol.com"
echo "4. Test the application: curl http://localhost/api/"
echo ""
echo "View logs with:"
echo "  sudo journalctl -u prexcol -f"
echo "  sudo tail -f /var/log/nginx/prexcol_error.log"
