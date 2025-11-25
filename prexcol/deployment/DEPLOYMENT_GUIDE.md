# 🚀 PREXCOL Backend - Production Deployment Guide

Complete step-by-step guide for deploying the PREXCOL backend to a production Linux server.

---

## 📋 Prerequisites

### Server Requirements
- **OS**: Ubuntu 22.04 LTS (recommended) or  20.04 LTS
- **RAM**: Minimum 2GB, recommended 4GB+
- **Storage**: Minimum 20GB
- **CPU**: 2+ cores recommended
- **Network**: Public IP address and domain name

### Local Requirements
- SSH access to the server
- Git repository with PREXCOL code
- Domain name configured (DNS A record pointing to server IP)

---

## 🔧 Initial Server Setup

### Step 1: Connect to Server

```bash
ssh root@your-server-ip
```

### Step 2: Run Automated Setup Script

```bash
# Upload the setup script
scp deployment/setup_server.sh root@your-server-ip:/tmp/

# Connect and run
ssh root@your-server-ip
cd /tmp
chmod +x setup_server.sh
sudo bash setup_server.sh
```

The script will:
- ✅ Install Python, PostgreSQL, Nginx, Certbot
- ✅ Create `prexcol` user and project directory
- ✅ Clone repository
- ✅ Create virtual environment
- ✅ Install dependencies
- ✅ Setup PostgreSQL database
- ✅ Run migrations
- ✅ Configure systemd service
- ✅ Configure Nginx

---

## 🔐 Configure Environment Variables

### Step 3: Update .env File

```bash
sudo nano /opt/prexcol-backend/.env
```

Update the following critical values:

```env
# Generate new secret key
SECRET_KEY=$(openssl rand -base64 50)

# Your domain
ALLOWED_HOSTS=api.prexcol.com,prexcol.com

# Database (already configured by setup script)
DATABASE_URL=postgresql://prexcol_user:password@localhost:5432/prexcol_db

# CORS - Add your frontend domains
CORS_ALLOWED_ORIGINS=https://prexcol.com,https://www.prexcol.com

# Email configuration
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-specific-password
```

---

## 🌐 Configure Domain and SSL

### Step 4: Update Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/prexcol
```

Replace `api.prexcol.com` with your actual domain.

### Step 5: Setup SSL Certificate

```bash
sudo certbot --nginx -d api.prexcol.com
```

Follow the prompts to install SSL certificate.

---

## 🗄️ Database Configuration

### Step 6: Verify Database

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Check database
\l prexcol_db
\du prexcol_user
\q
```

### Step 7: Run Migrations

```bash
cd /opt/prexcol-backend/backend
sudo -u prexcol /opt/prexcol-backend/venv/bin/python manage.py migrate
```

### Step 8: Create Superuser

```bash
sudo -u prexcol /opt/prexcol-backend/venv/bin/python manage.py createsuperuser
```

---

## 🎨 Collect Static Files

### Step 9: Run collectstatic

```bash
cd /opt/prexcol-backend/backend
sudo -u prexcol /opt/prexcol-backend/venv/bin/python manage.py collectstatic --noinput
```

---

## 🚀 Start Services

### Step 10: Start Gunicorn

```bash
sudo systemctl start prexcol
sudo systemctl enable prexcol
sudo systemctl status prexcol
```

### Step 11: Restart Nginx

```bash
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
sudo systemctl status nginx
```

---

## 🔒 Security Hardening

### Step 12: Run Security Script

```bash
cd /opt/prexcol-backend/deployment
chmod +x security_setup.sh
sudo bash security_setup.sh
```

This will:
- ✅ Configure SSL auto-renewal
- ✅ Harden SSH (disable root login)
- ✅ Setup fail2ban
- ✅ Enable automatic security updates
- ✅ Configure firewall (UFW)
- ✅ Secure file permissions

---

## ✅ Verification

### Step 13: Test Endpoints

```bash
# Health check
curl https://api.prexcol.com/health/

# API root
curl https://api.prexcol.com/api/

# Test authentication
curl -X POST https://api.prexcol.com/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","nombre":"Test","rol":"cliente"}'
```

### Step 14: Run Verification Script

```bash
cd /opt/prexcol-backend/backend
sudo -u prexcol /opt/prexcol-backend/venv/bin/python verify_rf_coverage.py
```

Expected output:
```
✅ RF1 (Registro): OK
✅ RF2 (Login): OK
✅ RF3 (Logout): OK
✅ RF4 (Gestión Productos): OK
✅ RF5 (Visualización Pública): OK
✅ RF6 (Creación Pedidos): OK
✅ RF7 (Consulta Pedidos): OK
✅ RF8 (Gestión Pagos): OK
✅ RF9 (Notificaciones): OK
✅ RF10 (Seguridad): OK
```

---

## 📊 Monitoring & Logs

### View Logs

```bash
# Gunicorn logs
sudo journalctl -u prexcol -f

# Nginx access logs
sudo tail -f /var/log/nginx/prexcol_access.log

# Nginx error logs
sudo tail -f /var/log/nginx/prexcol_error.log

# Application logs
sudo tail -f /var/log/prexcol/django.log
```

### Service Management

```bash
# Restart application
sudo systemctl restart prexcol

# Reload Nginx (without downtime)
sudo systemctl reload nginx

# Check service status
sudo systemctl status prexcol nginx
```

---

## 🔄 Deployment Updates

### For Future Updates

Use the automated deployment script:

```bash
cd /opt/prexcol-backend/deployment
sudo bash deploy.sh
```

This will:
- ✅ Pull latest code
- ✅ Install new dependencies
- ✅ Run migrations
- ✅ Collect static files
- ✅ Restart Gunicorn
- ✅ Reload Nginx

---

## 🐛 Troubleshooting

### Common Issues

**1. Gunicorn won't start**
```bash
# Check logs
sudo journalctl -u prexcol -n 50

# Test manually
cd /opt/prexcol-backend/backend
sudo -u prexcol /opt/prexcol-backend/venv/bin/gunicorn --bind 0.0.0.0:8000 wsgi:application
```

**2. 502 Bad Gateway**
```bash
# Check if Gunicorn is running
sudo systemctl status prexcol

# Check Nginx error logs
sudo tail -f /var/log/nginx/prexcol_error.log
```

**3. Static files not loading**
```bash
# Re-collect static files
cd /opt/prexcol-backend/backend
sudo -u prexcol /opt/prexcol-backend/venv/bin/python manage.py collectstatic --noinput

# Check Nginx configuration
sudo nginx -t
```

**4. Database connection error**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Test connection
sudo -u postgres psql -c "SELECT 1"

# Check .env file
cat /opt/prexcol-backend/.env | grep DATABASE_URL
```

---

## 📞 Support

For issues or questions:
- Check logs first
- Review this documentation
- Contact: admin@prexcol.com

---

## 🎉 Deployment Checklist

- [ ] Server setup completed
- [ ] Environment variables configured
- [ ] Domain DNS configured
- [ ] SSL certificate installed
- [ ] Database migrations run
- [ ] Superuser created
- [ ] Static files collected
- [ ] Gunicorn service running
- [ ] Nginx configured and running
- [ ] Security hardening applied
- [ ] All endpoints tested
- [ ] RF1-RF10 verification passed
- [ ] Monitoring configured
- [ ] Backup strategy in place

**✅ Once all items are checked, your PREXCOL backend is production-ready!**
