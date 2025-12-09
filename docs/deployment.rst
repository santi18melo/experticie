Guía de Despliegue
==================

Esta guía describe cómo desplegar PREXCOL en producción.

Requisitos de Producción
-------------------------

Infraestructura Mínima
~~~~~~~~~~~~~~~~~~~~~~

- **Servidor Backend**: 1 vCPU, 1GB RAM
- **Base de Datos**: PostgreSQL 14+
- **Cache**: Redis 7+
- **CDN**: Para archivos estáticos
- **SSL/TLS**: Certificado válido

Variables de Entorno
~~~~~~~~~~~~~~~~~~~~

Configurar las siguientes variables en producción:

.. code-block:: bash

    # Django
    SECRET_KEY=<clave-secreta-segura>
    DEBUG=False
    ALLOWED_HOSTS=tudominio.com,www.tudominio.com
    
    # Database
    DATABASE_URL=postgresql://user:pass@host:5432/dbname
    
    # Redis
    REDIS_URL=redis://host:6379/0
    
    # Frontend
    FRONTEND_URL=https://tudominio.com
    
    # Email (opcional)
    EMAIL_HOST=smtp.gmail.com
    EMAIL_PORT=587
    EMAIL_USE_TLS=True
    EMAIL_HOST_USER=tu-email@gmail.com
    EMAIL_HOST_PASSWORD=tu-password

Despliegue en Render
---------------------

Backend
~~~~~~~

1. **Crear cuenta en Render**: https://render.com

2. **Crear servicio Web**:
   - Conectar repositorio GitHub
   - Seleccionar rama: ``main``
   - Build Command: ``pip install -r requirements.txt``
   - Start Command: ``gunicorn --config src/backend/gunicorn.conf.py backend.wsgi:application``

3. **Configurar variables de entorno** en Render Dashboard

4. **Crear base de datos PostgreSQL**:
   - En Render Dashboard, crear PostgreSQL
   - Copiar ``DATABASE_URL``
   - Agregar a variables de entorno del servicio

5. **Ejecutar migraciones**:
   - En Render Shell: ``python src/backend/manage.py migrate``
   - Crear superusuario: ``python src/backend/manage.py createsuperuser``

Frontend (Netlify)
~~~~~~~~~~~~~~~~~~

1. **Crear cuenta en Netlify**: https://netlify.com

2. **Conectar repositorio**:
   - New site from Git
   - Seleccionar repositorio
   - Branch: ``main``

3. **Configurar build**:
   - Base directory: ``src/frontend``
   - Build command: ``npm run build``
   - Publish directory: ``src/frontend/build``

4. **Variables de entorno**:
   - ``REACT_APP_API_URL``: URL del backend en Render

5. **Configurar dominio personalizado** (opcional)

Despliegue en Railway
----------------------

Backend Completo
~~~~~~~~~~~~~~~~

1. **Crear cuenta en Railway**: https://railway.app

2. **Nuevo proyecto desde GitHub**:
   - Conectar repositorio
   - Railway detectará automáticamente Django

3. **Agregar PostgreSQL**:
   - Add service → Database → PostgreSQL
   - Railway generará ``DATABASE_URL`` automáticamente

4. **Agregar Redis**:
   - Add service → Database → Redis
   - Railway generará ``REDIS_URL`` automáticamente

5. **Configurar variables de entorno**:
   - Ir a Variables
   - Agregar todas las variables necesarias

6. **Deploy**:
   - Railway desplegará automáticamente
   - Ver logs para verificar

Despliegue Manual (VPS)
------------------------

Preparación del Servidor
~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

    # Actualizar sistema
    sudo apt update && sudo apt upgrade -y
    
    # Instalar dependencias
    sudo apt install python3.11 python3-pip python3-venv
    sudo apt install postgresql postgresql-contrib
    sudo apt install redis-server
    sudo apt install nginx
    sudo apt install supervisor

Configurar PostgreSQL
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

    # Crear usuario y base de datos
    sudo -u postgres psql
    
    CREATE DATABASE prexcol_db;
    CREATE USER prexcol_user WITH PASSWORD 'password-seguro';
    ALTER ROLE prexcol_user SET client_encoding TO 'utf8';
    ALTER ROLE prexcol_user SET default_transaction_isolation TO 'read committed';
    ALTER ROLE prexcol_user SET timezone TO 'UTC';
    GRANT ALL PRIVILEGES ON DATABASE prexcol_db TO prexcol_user;
    \q

Configurar Backend
~~~~~~~~~~~~~~~~~~

.. code-block:: bash

    # Clonar repositorio
    cd /var/www
    git clone https://github.com/santi18melo/experticie.git prexcol
    cd prexcol
    
    # Crear entorno virtual
    python3 -m venv .venv
    source .venv/bin/activate
    
    # Instalar dependencias
    pip install -r requirements.txt
    
    # Configurar .env
    cp .env.example .env
    nano .env  # Editar con valores de producción
    
    # Ejecutar migraciones
    cd src/backend
    python manage.py migrate
    python manage.py collectstatic --noinput
    python manage.py createsuperuser

Configurar Gunicorn
~~~~~~~~~~~~~~~~~~~

Crear archivo ``/etc/supervisor/conf.d/prexcol.conf``:

.. code-block:: ini

    [program:prexcol]
    directory=/var/www/prexcol/src/backend
    command=/var/www/prexcol/.venv/bin/gunicorn --config gunicorn.conf.py backend.wsgi:application
    user=www-data
    autostart=true
    autorestart=true
    redirect_stderr=true
    stdout_logfile=/var/log/prexcol/gunicorn.log

Configurar Celery
~~~~~~~~~~~~~~~~~

Crear archivo ``/etc/supervisor/conf.d/prexcol-celery.conf``:

.. code-block:: ini

    [program:prexcol-celery]
    directory=/var/www/prexcol/src/backend
    command=/var/www/prexcol/.venv/bin/celery -A backend worker -l info
    user=www-data
    autostart=true
    autorestart=true
    redirect_stderr=true
    stdout_logfile=/var/log/prexcol/celery.log

Configurar Nginx
~~~~~~~~~~~~~~~~

Crear archivo ``/etc/nginx/sites-available/prexcol``:

.. code-block:: nginx

    server {
        listen 80;
        server_name tudominio.com www.tudominio.com;
        
        client_max_body_size 10M;
        
        location /static/ {
            alias /var/www/prexcol/src/backend/staticfiles/;
        }
        
        location /media/ {
            alias /var/www/prexcol/src/backend/media/;
        }
        
        location / {
            proxy_pass http://127.0.0.1:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

Habilitar sitio:

.. code-block:: bash

    sudo ln -s /etc/nginx/sites-available/prexcol /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx

Configurar SSL con Let's Encrypt
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

    # Instalar Certbot
    sudo apt install certbot python3-certbot-nginx
    
    # Obtener certificado
    sudo certbot --nginx -d tudominio.com -d www.tudominio.com
    
    # Renovación automática
    sudo certbot renew --dry-run

Iniciar Servicios
~~~~~~~~~~~~~~~~~

.. code-block:: bash

    # Recargar Supervisor
    sudo supervisorctl reread
    sudo supervisorctl update
    sudo supervisorctl start prexcol
    sudo supervisorctl start prexcol-celery
    
    # Verificar estado
    sudo supervisorctl status

Monitoreo y Mantenimiento
--------------------------

Logs
~~~~

.. code-block:: bash

    # Logs de Gunicorn
    tail -f /var/log/prexcol/gunicorn.log
    
    # Logs de Celery
    tail -f /var/log/prexcol/celery.log
    
    # Logs de Nginx
    tail -f /var/log/nginx/access.log
    tail -f /var/log/nginx/error.log

Backups
~~~~~~~

**Base de Datos:**

.. code-block:: bash

    # Backup
    pg_dump -U prexcol_user prexcol_db > backup_$(date +%Y%m%d).sql
    
    # Restore
    psql -U prexcol_user prexcol_db < backup_20250101.sql

**Archivos Media:**

.. code-block:: bash

    # Backup
    tar -czf media_backup_$(date +%Y%m%d).tar.gz /var/www/prexcol/src/backend/media/
    
    # Restore
    tar -xzf media_backup_20250101.tar.gz -C /

Actualizaciones
~~~~~~~~~~~~~~~

.. code-block:: bash

    # Ir al directorio del proyecto
    cd /var/www/prexcol
    
    # Activar entorno virtual
    source .venv/bin/activate
    
    # Pull cambios
    git pull origin main
    
    # Actualizar dependencias
    pip install -r requirements.txt --upgrade
    
    # Ejecutar migraciones
    cd src/backend
    python manage.py migrate
    python manage.py collectstatic --noinput
    
    # Reiniciar servicios
    sudo supervisorctl restart prexcol
    sudo supervisorctl restart prexcol-celery

Optimización
------------

Cache
~~~~~

Configurar Redis para cache de Django:

.. code-block:: python

    # settings.py
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.redis.RedisCache',
            'LOCATION': os.getenv('REDIS_URL'),
        }
    }

CDN
~~~

Usar Cloudflare o AWS CloudFront para:

- Archivos estáticos
- Imágenes de productos
- Assets del frontend

Compresión
~~~~~~~~~~

Habilitar compresión en Nginx:

.. code-block:: nginx

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss;

Seguridad
---------

Checklist de Seguridad
~~~~~~~~~~~~~~~~~~~~~~

- ✅ DEBUG=False en producción
- ✅ SECRET_KEY único y seguro
- ✅ ALLOWED_HOSTS configurado
- ✅ HTTPS habilitado
- ✅ CORS configurado correctamente
- ✅ Rate limiting activo
- ✅ Firewall configurado
- ✅ Backups automáticos
- ✅ Logs monitoreados
- ✅ Dependencias actualizadas

Firewall
~~~~~~~~

.. code-block:: bash

    # UFW (Ubuntu)
    sudo ufw allow 22/tcp    # SSH
    sudo ufw allow 80/tcp    # HTTP
    sudo ufw allow 443/tcp   # HTTPS
    sudo ufw enable

Solución de Problemas
---------------------

Error 502 Bad Gateway
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

    # Verificar que Gunicorn está corriendo
    sudo supervisorctl status prexcol
    
    # Ver logs
    tail -f /var/log/prexcol/gunicorn.log

Error de Base de Datos
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

    # Verificar PostgreSQL
    sudo systemctl status postgresql
    
    # Verificar conexión
    psql -U prexcol_user -d prexcol_db -h localhost

Archivos Estáticos No Cargan
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

    # Recolectar archivos estáticos
    python manage.py collectstatic --noinput
    
    # Verificar permisos
    sudo chown -R www-data:www-data /var/www/prexcol/src/backend/staticfiles/

Recursos Adicionales
--------------------

- `Render Docs <https://render.com/docs>`_
- `Netlify Docs <https://docs.netlify.com/>`_
- `Railway Docs <https://docs.railway.app/>`_
- `Django Deployment Checklist <https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/>`_
- `Nginx Docs <https://nginx.org/en/docs/>`_
