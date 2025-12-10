# 🚀 Guía paso a paso: Deploy de PREXCOL en Render

## ✅ Pre-requisitos completados

- [x] Código en GitHub: `https://github.com/santi18melo/experticie`
- [x] Frontend desplegado en Netlify: `https://prexcol.netlify.app`
- [x] `psycopg2-binary` en requirements.txt
- [x] `render.yaml` configurado
- [x] `Procfile` configurado

---

## 📋 PASO 1: Crear cuenta en Render

1. Ve a: **https://render.com**
2. Click en **"Get Started"** o **"Sign Up"**
3. Selecciona **"Sign up with GitHub"** (recomendado)
4. Autoriza a Render para acceder a tus repositorios

---

## 📋 PASO 2: Crear un nuevo Web Service

1. En el dashboard de Render, click en **"New +"** (arriba a la derecha)
2. Selecciona **"Web Service"**
3. Conecta tu repositorio:
   - Si no aparece, click en **"Configure account"** y da acceso a `experticie`
   - Busca y selecciona el repositorio **`santi18melo/experticie`**
4. Click en **"Connect"**

---

## 📋 PASO 3: Configurar el Web Service

### Configuración básica:

| Campo | Valor |
|-------|-------|
| **Name** | `prexcol-backend` (o el nombre que prefieras) |
| **Region** | `Oregon (US West)` (o el más cercano a Colombia) |
| **Branch** | `main` |
| **Root Directory** | *(dejar vacío)* |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn --chdir backend wsgi:application` |

### Plan:
- Selecciona **"Free"** (0$/mes)
- Click en **"Advanced"** para configurar variables de entorno

---

## 📋 PASO 4: Configurar Variables de Entorno

Click en **"Add Environment Variable"** para cada una:

### Variables obligatorias:

| Key | Value | Notas |
|-----|-------|-------|
| `PYTHON_VERSION` | `3.11.9` | Versión de Python |
| `SECRET_KEY` | `[GENERAR NUEVA]` | Ver instrucción abajo ⬇️ |
| `DEBUG` | `False` | Siempre False en producción |
| `ALLOWED_HOSTS` | `prexcol-backend.onrender.com,prexcol.netlify.app` | Ajusta con tu URL real |
| `CORS_ALLOWED_ORIGINS` | `https://prexcol.netlify.app` | URL del frontend |
| `CSRF_TRUSTED_ORIGINS` | `https://prexcol.netlify.app` | URL del frontend |
| `FRONTEND_URL` | `https://prexcol.netlify.app` | URL del frontend |

### Variables opcionales (Email):

| Key | Value |
|-----|-------|
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USE_TLS` | `True` |
| `EMAIL_HOST_USER` | `tu-email@gmail.com` |
| `EMAIL_HOST_PASSWORD` | `tu-app-password` |

---

### 🔐 Generar SECRET_KEY seguro

Ejecuta este comando en tu terminal local:

```powershell
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copia el resultado y úsalo como `SECRET_KEY`.

---

## 📋 PASO 5: Añadir Base de Datos PostgreSQL

1. Antes de hacer el deploy, en la misma pantalla, busca la sección **"Add Database"**
2. Click en **"New PostgreSQL Database"**
3. Configuración:
   - **Name:** `prexcol-db`
   - **Database:** `prexcol`
   - **User:** `prexcol_user`
   - **Region:** El mismo que el web service
   - **Plan:** Free
4. Click en **"Create Database"**

Render creará automáticamente la variable `DATABASE_URL` y la añadirá al web service.

---

## 📋 PASO 6: Crear el Web Service

1. Revisa que todas las variables estén correctas
2. Click en **"Create Web Service"** (abajo)
3. Render comenzará a construir y desplegar:
   - 📦 Installing dependencies...
   - 🔨 Building...
   - 🚀 Deploying...
   - ⏱️ Esto puede tomar 5-10 minutos

---

## 📋 PASO 7: Verificar el Deploy

Una vez que el deploy termine (estado: **Live** 🟢):

1. Copia la URL del servicio (ej: `https://prexcol-backend.onrender.com`)
2. Abre en el navegador: `https://prexcol-backend.onrender.com/api/`
3. Deberías ver: `{"message": "API funcionando"}`

---

## 📋 PASO 8: Ejecutar migraciones (primera vez)

Render ejecuta migraciones automáticamente gracias al `Procfile`, pero si quieres verificar:

1. En el dashboard de Render, ve a tu web service
2. Click en **"Shell"** (en el menú lateral)
3. Ejecuta:
   ```bash
   cd backend
   python manage.py migrate
   python manage.py createsuperuser
   ```

---

## 📋 PASO 9: Actualizar Netlify con la URL del backend

1. Ve a: **https://app.netlify.com/sites/prexcol**
2. **Site configuration** → **Environment variables**
3. Edita la variable `VITE_API_URL`:
   - **Value:** `https://prexcol-backend.onrender.com/api` (tu URL real)
4. **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

---

## 📋 PASO 10: Actualizar CORS en Render

Si Netlify te dio una URL diferente a `prexcol.netlify.app`:

1. En Render, ve a **Environment**
2. Actualiza:
   - `CORS_ALLOWED_ORIGINS`
   - `CSRF_TRUSTED_ORIGINS`
   - `ALLOWED_HOSTS`
3. Click en **"Save Changes"**
4. Render redesplegará automáticamente

---

## ✅ Verificación final

1. **Backend funciona:**
   - `https://prexcol-backend.onrender.com/api/` → `{"message": "API funcionando"}`
   - `https://prexcol-backend.onrender.com/admin/` → Panel de admin de Django

2. **Frontend funciona:**
   - `https://prexcol.netlify.app/` → Página de inicio
   - Intenta registrarte → Debería funcionar sin errores CORS

3. **Base de datos funciona:**
   - Los usuarios/productos que crees se guardan en PostgreSQL

---

## 🎉 ¡Listo! Tu aplicación está en producción

**URLs finales:**
- **Frontend:** https://prexcol.netlify.app
- **Backend API:** https://prexcol-backend.onrender.com/api/
- **Admin Panel:** https://prexcol-backend.onrender.com/admin/

---

## 🐛 Solución de problemas comunes

### Error: "Application failed to start"
- Verifica los logs en Render → **Logs**
- Asegúrate de que `SECRET_KEY` esté configurado
- Verifica que `DATABASE_URL` esté presente

### Error: "relation does not exist"
- Las migraciones no se ejecutaron
- Ve a Shell y ejecuta: `python backend/manage.py migrate`

### Error CORS en el frontend
- Verifica `CORS_ALLOWED_ORIGINS` en Render
- Debe coincidir exactamente con la URL de Netlify (con `https://`)

### El servicio se duerme después de 15 minutos
- Es normal en el plan Free de Render
- La primera petición después de dormir tomará ~30 segundos
- Considera el plan Starter ($7/mes) si necesitas que esté siempre activo

---

**📞 Si tienes algún problema, revisa los logs en Render o pregúntame.**
