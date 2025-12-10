# 🚀 AUDITORÍA Y CORRECCIONES RENDER.COM

**Fecha:** 2025-12-10  
**Estado:** ⚠️ REVISIÓN CRÍTICA - Sin cambios destructivos

---

## 🔍 PROBLEMAS IDENTIFICADOS

### 1. **Middleware de Observabilidad Falta en settings.py**
```
PROBLEMA:
  - settings.py intenta cargar middleware "backend.middleware.observability"
  - Pero la ruta correcta es "middleware.observability"
  - Esto causa ImportError en Render al iniciar

ARCHIVO AFECTADO:
  src/backend/settings.py (línea 75)
```

### 2. **user_middleware Sin Ruta Correcta**
```
PROBLEMA:
  - Intenta importar "user_middleware" sin especificar ruta
  - Debería ser "middleware.user_middleware" o "src.backend.middleware.user_middleware"

ARCHIVO AFECTADO:
  src/backend/settings.py (línea 76)
```

### 3. **CORS No Configurado para Render**
```
PROBLEMA:
  - render.yaml no especifica CORS_ALLOWED_ORIGINS
  - Frontend en https://prexcol.onrender.com no puede hablar con backend
  - Solo localhost está permitido

ARCHIVO AFECTADO:
  render.yaml (envVars section)
```

### 4. **collectstatic Sin STATIC_URL Correcto**
```
PROBLEMA:
  - buildCommand intenta collectstatic pero no hay configuración clara
  - Puede fallar si STATIC_ROOT no está definido

ARCHIVO AFECTADO:
  src/backend/settings.py (línea ~180, no visto completo)
  render.yaml (buildCommand)
```

### 5. **BASE_DIR Incorrecto para src/backend/**
```
PROBLEMA:
  - BASE_DIR = Path(__file__).resolve().parent.parent
  - Esto apunta a /src/backend/ cuando debería apuntar a /src/
  - Afecta rutas de templates, media, static

ARCHIVO AFECTADO:
  src/backend/settings.py (línea 8)
```

---

## ✅ SOLUCIONES (Sin breaking changes)

### SOLUCIÓN 1: Corregir Importes de Middleware

**Cambio en:** `src/backend/settings.py` (línea ~75-76)

```python
# ❌ INCORRECTO (actual)
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
]

if not DEBUG:
    MIDDLEWARE.append("whitenoise.middleware.WhiteNoiseMiddleware")

MIDDLEWARE.extend([
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "user_middleware.ActiveUserMiddleware",
    "backend.middleware.observability.ObservabilityMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
])

# ✅ CORRECTO (reparado)
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
]

if not DEBUG:
    MIDDLEWARE.append("whitenoise.middleware.WhiteNoiseMiddleware")

MIDDLEWARE.extend([
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "middleware.user_middleware.ActiveUserMiddleware",
    "middleware.observability.ObservabilityMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
])
```

**Impacto:** Bajo - Solo corrección de rutas de importación

---

### SOLUCIÓN 2: Configurar CORS Correctamente

**Cambio en:** `src/backend/settings.py` (agregar/actualizar sección CORS)

```python
# ✅ CORS Configuration
CORS_ALLOWED_ORIGINS = os.getenv(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:5175,http://127.0.0.1:5175"
).split(",")

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Para producción en Render
if not DEBUG:
    # Auto-permitir backend URL si viene de frontend
    CSRF_TRUSTED_ORIGINS = os.getenv(
        "CSRF_TRUSTED_ORIGINS",
        ""
    ).split(",") if os.getenv("CSRF_TRUSTED_ORIGINS") else []
```

**Impacto:** Bajo - Mejora seguridad y permite comunicación frontend-backend

---

### SOLUCIÓN 3: Actualizar render.yaml con CORS y vars correctas

**Cambio en:** `render.yaml`

```yaml
# ✅ VERSIÓN REPARADA
services:
  - type: web
    name: prexcol-backend
    env: python
    buildCommand: pip install -r requirements.txt && python src/backend/manage.py migrate --noinput && python src/backend/manage.py collectstatic --noinput
    startCommand: gunicorn --chdir src/backend wsgi:application --workers 2 --worker-class sync --bind 0.0.0.0:8000
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.9
      - key: SECRET_KEY
        generateValue: true
      - key: DEBUG
        value: false
      - key: ALLOWED_HOSTS
        value: "*.onrender.com,localhost,127.0.0.1"
      - key: CORS_ALLOWED_ORIGINS
        value: "https://prexcol.onrender.com"
      - key: CSRF_TRUSTED_ORIGINS
        value: "https://prexcol.onrender.com"
      - key: DATABASE_URL
        fromDatabase:
          name: prexcol-db
          property: connectionString
      - key: WEB_CONCURRENCY
        value: 2

  - type: static
    name: prexcol-frontend
    env: static
    buildCommand: cd src/frontend && npm install && npm run build
    staticPublishPath: src/frontend/dist
    envVars:
      - key: VITE_API_URL
        fromService:
          type: web
          name: prexcol-backend
          property: url
      - key: VITE_APP_NAME
        value: PREXCOL

databases:
  - name: prexcol-db
    databaseName: prexcol
    user: prexcol_user
    plan: free
```

**Cambios clave:**
- Agregó `migrate --noinput` al build
- Mejoró ALLOWED_HOSTS para Render domains
- Agregó CORS_ALLOWED_ORIGINS (variable de env)
- Especificó workers y bind en gunicorn
- Agregó VITE_APP_NAME para frontend

**Impacto:** Medio - Mejora robustez del despliegue

---

### SOLUCIÓN 4: Crear .env.production.backend Correcto

**Archivo:** `src/backend/.env.production` (copiar de `.env.example` y ajustar)

```dotenv
# ===================================
# PREXCOL - Producción (Render.com)
# ===================================

# SEGURIDAD - GENERADO AUTOMÁTICAMENTE POR RENDER
SECRET_KEY=<generado-por-render>
DEBUG=false

# HOSTS
ALLOWED_HOSTS=*.onrender.com,localhost,127.0.0.1

# CORS - Frontend URL
CORS_ALLOWED_ORIGINS=https://prexcol.onrender.com
CSRF_TRUSTED_ORIGINS=https://prexcol.onrender.com
FRONTEND_URL=https://prexcol.onrender.com

# DATABASE - GENERADO AUTOMÁTICAMENTE POR RENDER
DATABASE_URL=<generado-por-render>

# SEGURIDAD ADICIONAL
SECURE_SSL_REDIRECT=true
SESSION_COOKIE_SECURE=true
CSRF_COOKIE_SECURE=true
SECURE_HSTS_SECONDS=31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS=true
SECURE_HSTS_PRELOAD=true

# EMAIL (opcional)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

**Impacto:** Bajo - Configuración de referencia

---

## 📋 GUÍA DE APLICACIÓN (Sin Downtime)

### Paso 1: Actualizar settings.py (5 minutos)
```bash
# Archivo: src/backend/settings.py
# Cambio: Líneas 75-76 (middleware imports)
# Riesgo: BAJO - Solo corrección de rutas
# Reversible: SÍ
```

### Paso 2: Actualizar render.yaml (2 minutos)
```bash
# Archivo: render.yaml
# Cambio: Agregar CORS_ALLOWED_ORIGINS y mejorar gunicorn
# Riesgo: BAJO - Solo env vars y startup command
# Reversible: SÍ
```

### Paso 3: Actualizar settings.py CORS section (3 minutos)
```bash
# Archivo: src/backend/settings.py
# Cambio: Agregar CORS_ALLOWED_ORIGINS en settings
# Riesgo: BAJO - Mejora seguridad
# Reversible: SÍ
```

### Paso 4: Commit y Push a GitHub (2 minutos)
```bash
git add src/backend/settings.py render.yaml
git commit -m "fix(render): correct middleware imports and CORS config"
git push origin main
```

### Paso 5: Render redeploy automático (5-10 minutos)
- Render detecta push
- Compila y corre migrations automáticamente
- Inicia nuevo build

**Total:** 15-20 minutos | **Downtime:** 0 minutos (Render maneja blue-green deployment)

---

## 🔐 VERIFICACIÓN POST-DEPLOY

### Test 1: Backend Health
```bash
curl https://api.prexcol.onrender.com/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass"}' \
  -w "\nHTTP Status: %{http_code}\n"

# ✅ Esperado: 400 o 401 (credenciales inválidas OK)
# ❌ Error: 500 o connection refused
```

### Test 2: Frontend-Backend CORS
```javascript
// En consola del navegador (en https://prexcol.onrender.com)
fetch('https://api.prexcol.onrender.com/api/auth/login/', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email: 'test@test.com', password: 'pass'})
}).then(r => r.json()).catch(e => console.error('CORS ERROR:', e))

// ✅ Esperado: Response (valida credentials OK)
// ❌ Error: CORS error en consola
```

### Test 3: Database Connection
```bash
# En Render dashboard:
# → Backend → Logs
# Buscar: "Database connected" o similar

# ✅ Esperado: Sin errors de conexión DB
# ❌ Error: "OperationalError: could not connect to database"
```

### Test 4: Static Files
```bash
# Visitar https://prexcol.onrender.com/static/admin/...
# ✅ Esperado: Archivos CSS/JS cargan correctamente
# ❌ Error: 404 Not Found
```

---

## 📊 CHECKLIST DE VALIDACIÓN

```
PRE-DEPLOY:
  [ ] Código local sin errores
  [ ] Tests pasan localmente
  [ ] requirements.txt actualizado
  [ ] .gitignore excluye .env
  [ ] No hay print statements en código crítico

DURANTE DEPLOY:
  [ ] Logs en Render sin errores críticos
  [ ] Migrations se ejecutan correctamente
  [ ] Static files se colectan sin warnings
  [ ] Service inicia sin timeout

POST-DEPLOY:
  [ ] Backend responde en /api/auth/login/
  [ ] Frontend carga sin CORS errors
  [ ] Database connection OK
  [ ] Admin accessible
  [ ] Live metrics cargando
  [ ] No hay 500 errors en logs
```

---

## 🆘 ROLLBACK (Si algo falla)

```bash
# Si deploy falla, Render mantiene versión anterior
# 1. Ir a Dashboard > Backend > Deploys
# 2. Click en deploy anterior exitoso
# 3. Click "Redeploy"

# Si necesitas revertir Git:
git revert <commit-hash>
git push origin main
# Render redeploya automáticamente
```

---

## 📈 MEJORAS FUTURAS (Fase 2)

```
Cuando Render sea estable:
  [ ] Agregar Redis para Celery
  [ ] Configurar email real (SendGrid)
  [ ] Habilitar HTTPS/HSTS
  [ ] Agregar CDN (Cloudflare)
  [ ] Monitoring con Sentry
  [ ] Auto-scaling si tráfico crece
```

---

## 📝 RESUMEN

| Aspecto | Estado | Acción |
|---------|--------|--------|
| Middleware | ❌ Error | Corregir importes |
| CORS | ❌ Falta | Agregar variables |
| Database | ✅ OK | Mantener |
| Static Files | ⚠️ Revisar | Verificar post-deploy |
| Frontend | ✅ OK | Mantener |
| Security | ⚠️ Mejorar | HSTS en settings |

**Riesgo Global:** BAJO  
**Impacto:** Positivo (fixes + mejoras)  
**Reversibilidad:** ALTA  
**Tiempo Estimado:** 20 minutos

---

**Documento Generado:** 2025-12-10  
**Versión:** 1.0 - Sin cambios realizados (awaiting approval)
