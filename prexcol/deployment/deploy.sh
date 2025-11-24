#!/bin/bash
# PREXCOL Backend - Deployment Script
# Run this script on the production server to deploy/update the application
#
# Usage: sudo bash deploy.sh

set -e  # Exit on error

echo "========================================="
echo "PREXCOL Backend Deployment Script"
echo "========================================="

# Configuration
PROJECT_DIR="/opt/prexcol-backend"
VENV_DIR="$PROJECT_DIR/venv"
REPO_URL="https://github.com/your-org/prexcol-backend.git"  # Replace with actual repo
BRANCH="main"
USER="prexcol"
GROUP="prexcol"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Step 1: Pull latest code
print_info "Pulling latest code from $BRANCH branch..."
cd $PROJECT_DIR
sudo -u $USER git fetch origin
sudo -u $USER git checkout $BRANCH
sudo -u $USER git pull origin $BRANCH
print_success "Code updated"

# Step 2: Activate virtual environment and install dependencies
print_info "Installing/updating dependencies..."
sudo -u $USER $VENV_DIR/bin/pip install --upgrade pip
sudo -u $USER $VENV_DIR/bin/pip install -r requirements.txt
print_success "Dependencies installed"

# Step 3: Run migrations
print_info "Running database migrations..."
cd $PROJECT_DIR/backend
sudo -u $USER $VENV_DIR/bin/python manage.py migrate --noinput
print_success "Migrations completed"

# Step 4: Collect static files
print_info "Collecting static files..."
sudo -u $USER $VENV_DIR/bin/python manage.py collectstatic --noinput --clear
print_success "Static files collected"

# Step 5: Check for errors
print_info "Running Django system checks..."
sudo -u $USER $VENV_DIR/bin/python manage.py check --deploy
print_success "System checks passed"

# Step 6: Restart Gunicorn service
print_info "Restarting Gunicorn service..."
systemctl restart prexcol
systemctl status prexcol --no-pager
print_success "Gunicorn restarted"

# Step 7: Reload Nginx
print_info "Reloading Nginx..."
nginx -t  # Test configuration first
systemctl reload nginx
print_success "Nginx reloaded"

# Step 8: Display service status
echo ""
echo "========================================="
echo "Deployment Summary"
echo "========================================="
echo "Project Directory: $PROJECT_DIR"
echo "Current Branch: $(cd $PROJECT_DIR && git branch --show-current)"
echo "Latest Commit: $(cd $PROJECT_DIR && git log -1 --pretty=format:'%h - %s (%cr)')"
echo ""
echo "Service Status:"
systemctl is-active --quiet prexcol && echo "  Gunicorn: ✓ Running" || echo "  Gunicorn: ✗ Not Running"
systemctl is-active --quiet nginx && echo "  Nginx: ✓ Running" || echo "  Nginx: ✗ Not Running"
echo ""
print_success "Deployment completed successfully!"
echo ""
echo "View logs with:"
echo "  sudo journalctl -u prexcol -f"
echo "  sudo tail -f /var/log/nginx/prexcol_error.log"
