# 🚀 INSTRUCCIONES PARA ACTUALIZAR RENDER

## ❌ PROBLEMA ACTUAL

El error en Render:
```
bash: line 1: cd: backend: No such file or directory
```

**Causa**: El comando configurado en el Dashboard de Render está usando `backend` en lugar de `src/backend`.

---

## ✅ SOLUCIÓN RÁPIDA (2 minutos)

### Paso 1: Ir al Dashboard de Render
1. Abrir https://dashboard.render.com
2. Seleccionar el servicio `prexcol-backend`

### Paso 2: Actualizar el Start Command
1. Click en **"Settings"** en el menú lateral
2. Scroll hasta **"Start Command"**
3. **REEMPLAZAR** el comando actual con:
   ```bash
   gunicorn --chdir src/backend wsgi:application --workers 2 --worker-class sync --bind 0.0.0.0:$PORT --log-file - --access-logfile - --error-logfile -
   ```
4. Click en **"Save Changes"**

### Paso 3: Actualizar el Build Command (si es necesario)
1. En la misma página de Settings
2. Scroll hasta **"Build Command"**
3. Verificar que sea:
   ```bash
   pip install -r requirements.txt && python src/backend/manage.py migrate --noinput && python src/backend/manage.py collectstatic --noinput
   ```
4. Si es diferente, actualizar y hacer click en **"Save Changes"**

### Paso 4: Hacer Manual Deploy
1. Click en **"Manual Deploy"** en la parte superior
2. Seleccionar **"Deploy latest commit"**
3. Click en **"Deploy"**

---

## 🎯 SOLUCIÓN ALTERNATIVA (Usar Blueprint)

Si prefieres usar la configuración automática:

### Opción A: Recrear el servicio
1. **Eliminar** el servicio actual `prexcol-backend`
2. Click en **"New +"** → **"Blueprint"**
3. Conectar el repositorio `santi18melo/experticie`
4. Render detectará automáticamente `render.yaml`
5. Click en **"Apply"**

### Opción B: Usar Procfile
1. En Settings, **dejar vacío** el "Start Command"
2. Render usará automáticamente el `Procfile`
3. Hacer Manual Deploy

---

## 📋 VERIFICAR VARIABLES DE ENTORNO

Asegurarse de que estas variables estén configuradas:

```
✓ PYTHON_VERSION = 3.11.9
✓ SECRET_KEY = (generado automáticamente)
✓ DEBUG = False
✓ ALLOWED_HOSTS = *.onrender.com,localhost,127.0.0.1
✓ CORS_ALLOWED_ORIGINS = https://prexcol.onrender.com
✓ CSRF_TRUSTED_ORIGINS = https://prexcol.onrender.com
✓ DATABASE_URL = (conectado a prexcol-db)
✓ WEB_CONCURRENCY = 2
```

---

## 🔍 VERIFICAR QUE FUNCIONE

Después del deploy, verificar:

1. **Logs del deploy**: No debe haber errores de "No such file or directory"
2. **Health check**: El servicio debe estar "Live"
3. **API endpoint**: Probar `https://prexcol-backend.onrender.com/api/health/`

---

## 📞 SI AÚN HAY PROBLEMAS

1. Revisar los logs en tiempo real: Click en "Logs" en el menú lateral
2. Verificar que el repositorio esté actualizado con el último commit
3. Contactar soporte de Render si el problema persiste

---

## 📝 CAMBIOS REALIZADOS EN EL CÓDIGO

✅ `Procfile` - Actualizado con rutas correctas
✅ `render.yaml` - Configurado para usar scripts
✅ `build.sh` - Script de build con rutas correctas
✅ `start.sh` - Script de inicio con rutas correctas
✅ `RENDER_SETUP.md` - Documentación completa

**Commit**: `1b36bdf` - "Fix Render deployment: corregir rutas de backend"

---

## 🎉 RESULTADO ESPERADO

Después de seguir estos pasos, el deploy debe completarse exitosamente:

```
==> Build successful 🎉
==> Deploying...
==> Running migrations...
==> Collecting static files...
==> Starting Gunicorn server...
==> Your service is live at https://prexcol-backend.onrender.com
```
