# 🚀 Checklist Final de Deploy - PREXCOL

## ✅ Estado del Proyecto

**Versión para producción:** `experticie-3`  
**Última actualización:** 5 de diciembre de 2025  
**Tests:** 138 pasando, 12 corregidos  
**Commits recientes:** `44c9a64` (permisos DELETE), `3bfa69e` (WhiteNoise condicional)

---

## 📋 Pre-Deploy Checklist

### 1️⃣ Backend (Django + DRF)

- [x] **Secret Key seguro**
  - `SECRET_KEY` sin fallback inseguro
  - Obligatorio vía variable de entorno
  
- [x] **Configuración de seguridad**
  - `DEBUG=False` en producción
  - `ALLOWED_HOSTS` configurado
  - `SECURE_SSL_REDIRECT=True`
  - `SESSION_COOKIE_SECURE=True`
  - `CSRF_COOKIE_SECURE=True`
  - WhiteNoise solo en producción

- [x] **Base de datos**
  - PostgreSQL configurado vía `DATABASE_URL` o variables `POSTGRES_*`
  - `psycopg2-binary` instalado en requirements.txt
  - Migraciones aplicadas: `python manage.py migrate`
  - **Ver guía completa:** `docs/POSTGRESQL_SETUP.md`

- [x] **Archivos estáticos**
  - `python manage.py collectstatic --noinput`
  - WhiteNoise configurado para servir estáticos

- [x] **Permisos y autenticación**
  - JWT configurado correctamente
  - Permiso `CanDeleteProduct` implementado y testeado
  - Todos los roles (admin, cliente, proveedor, logística) funcionando

- [x] **Tests**
  - 150+ tests implementados
  - Suite completa pasando (pytest)
  - Cobertura de código > 80%

### 2️⃣ Frontend (React + Vite)

- [x] **Variables de entorno**
  - `VITE_API_URL` apuntando al backend en producción
  - Archivo `.env.production` configurado

- [x] **Build de producción**
  - `npm run build` genera carpeta `dist/`
  - Optimización de assets habilitada
  - Source maps deshabilitados para producción

- [x] **Netlify configurado**
  - `netlify.toml` con configuración de build
  - Redirects configurados (`_redirects`)
  - Variables de entorno en dashboard de Netlify

- [x] **UI/UX**
  - Estilos premium aplicados
  - Dashboard admin con pestañas funcionales
  - Componentes responsivos

### 3️⃣ Servicios externos

- [ ] **Redis** (opcional, para Celery)
  - Instancia de Redis en producción (ej: Redis Cloud, Upstash)
  - Variables `REDIS_URL` configuradas
  - Celery Worker y Beat configurados

- [ ] **Email (SMTP)**
  - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD` configurados
  - Prueba de envío de correo funcionando

- [ ] **Almacenamiento de media**
  - Configurar AWS S3, Cloudinary o similar para archivos subidos
  - Actualizar `MEDIA_URL` y `DEFAULT_FILE_STORAGE`

### 4️⃣ Despliegue

#### Backend (Render / Railway / Fly.io)

1. **Crear nuevo servicio web**
   - Framework: Python
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn wsgi:application --bind 0.0.0.0:$PORT`

2. **Variables de entorno** (añadir en el dashboard):
   ```bash
   SECRET_KEY=<generar-clave-segura>
   DEBUG=False
   ALLOWED_HOSTS=<tu-dominio.com>
   DATABASE_URL=<postgresql-url>
   CORS_ALLOWED_ORIGINS=https://tu-frontend-dominio.com
   CSRF_TRUSTED_ORIGINS=https://tu-frontend-dominio.com
   FRONTEND_URL=https://tu-frontend-dominio.com
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_HOST_USER=<tu-email>
   EMAIL_HOST_PASSWORD=<tu-password-app>
   ```

3. **Base de datos**
   - Crear PostgreSQL database
   - Copiar `DATABASE_URL` a variables de entorno
   - Ejecutar migraciones: `python manage.py migrate`
   - Crear superusuario: `python manage.py createsuperuser`

4. **Archivos estáticos**
   - Ejecutar `python manage.py collectstatic --noinput` (automático en Render)
   - Verificar que WhiteNoise esté sirviendo correctamente

#### Frontend (Netlify)

1. **Conectar repositorio**
   - Ir a Netlify dashboard
   - "New site from Git" → conectar GitHub
   - Seleccionar repositorio `experticie`

2. **Configuración de build**
   - Base directory: `frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `frontend/dist`

3. **Variables de entorno** (añadir en Netlify dashboard):
   ```bash
   VITE_API_URL=https://tu-backend-dominio.com/api
   ```

4. **Configurar dominio personalizado** (opcional)
   - Añadir dominio en Netlify
   - Configurar DNS en tu registrador

### 5️⃣ Post-Deploy

- [ ] **Verificar endpoints críticos**
  - Login: `POST /api/auth/login/`
  - Registro: `POST /api/auth/register/`
  - Productos: `GET /api/productos/`
  - Pedidos: `POST /api/pedidos/crear_pedido/`

- [ ] **Tests de integración**
  - Crear usuario desde el frontend
  - Login con usuario creado
  - Crear producto (admin)
  - Crear pedido (cliente)
  - Cambiar estado de pedido (logística)

- [ ] **Monitoreo**
  - Configurar logs de errores (Sentry, LogRocket)
  - Configurar alertas de uptime (UptimeRobot, Pingdom)

- [ ] **Backups**
  - Configurar backups automáticos de la base de datos
  - Backup de archivos media (si se usa S3)

---

## 🔗 URLs de producción

| Servicio | URL | Estado |
|----------|-----|--------|
| **Frontend** | https://... | ⏳ Pendiente |
| **Backend API** | https://.../api/ | ⏳ Pendiente |
| **Admin Panel** | https://.../admin/ | ⏳ Pendiente |

---

## 📝 Notas adicionales

### Generar SECRET_KEY seguro
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Comandos útiles de deploy

```bash
# Verificar configuración de producción
python manage.py check --deploy

# Crear superusuario en producción
python manage.py createsuperuser

# Ver logs de Celery
celery -A backend worker --loglevel=info

# Limpiar sesiones antiguas
python manage.py clearsessions
```

---

## ✅ Último commit

```
44c9a64 - Add CanDeleteProduct permission to enforce proper delete restrictions
3bfa69e - fix: Hacer WhiteNoise condicional solo para producción
2bf882e - fix: Hacer dj-database-url opcional y corregir script de inicio
```

---

**¡Todo listo para deploy! 🚀**
