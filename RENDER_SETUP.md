# Configuración de Render para PREXCOL

## ⚠️ PROBLEMA IDENTIFICADO

El error en Render es:
```bash
bash: line 1: cd: backend: No such file or directory
```

**Causa**: El comando de inicio configurado manualmente en el Dashboard de Render está intentando acceder a un directorio `backend` que no existe. La estructura correcta es `src/backend`.

## ✅ SOLUCIÓN

### Opción 1: Usar render.yaml (Recomendado)

1. **Eliminar el servicio actual en Render**
2. **Crear nuevo servicio desde el dashboard**:
   - Seleccionar "New +" → "Blueprint"
   - Conectar el repositorio `santi18melo/experticie`
   - Render detectará automáticamente el archivo `render.yaml`
   - Click en "Apply"

### Opción 2: Configuración Manual en Dashboard

Si prefieres configurar manualmente en el Dashboard de Render:

#### Build Command:
```bash
bash build.sh
```

O si prefieres el comando completo:
```bash
pip install -r requirements.txt && python src/backend/manage.py migrate --noinput && python src/backend/manage.py collectstatic --noinput
```

#### Start Command:
```bash
bash start.sh
```

O si prefieres el comando completo:
```bash
gunicorn --chdir src/backend wsgi:application --workers 2 --worker-class sync --bind 0.0.0.0:$PORT --log-file - --access-logfile - --error-logfile -
```

### Opción 3: Usar Procfile

Render también puede detectar el `Procfile` automáticamente. Asegúrate de que en el Dashboard:
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: Dejar vacío (usará el Procfile automáticamente)

## 📋 Variables de Entorno Requeridas

Configurar en el Dashboard de Render:

```
PYTHON_VERSION=3.11.9
SECRET_KEY=<generar-valor-aleatorio>
DEBUG=False
ALLOWED_HOSTS=*.onrender.com,localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=https://prexcol.onrender.com
CSRF_TRUSTED_ORIGINS=https://prexcol.onrender.com
DATABASE_URL=<conectar-a-base-de-datos>
WEB_CONCURRENCY=2
```

## 🗄️ Base de Datos

1. Crear PostgreSQL database en Render:
   - Name: `prexcol-db`
   - Database Name: `prexcol`
   - User: `prexcol_user`
   - Plan: Free

2. Conectar la base de datos al servicio web usando la variable `DATABASE_URL`

## 🚀 Estructura del Proyecto

```
experticie/
├── src/
│   ├── backend/          ← Django está aquí
│   │   ├── manage.py
│   │   ├── wsgi.py
│   │   └── ...
│   └── frontend/         ← React está aquí
├── build.sh             ← Script de build
├── start.sh             ← Script de inicio
├── Procfile             ← Configuración de procesos
├── render.yaml          ← Blueprint de Render
└── requirements.txt     ← Dependencias Python
```

## 🔍 Verificación Local

Antes de hacer deploy, verifica localmente:

```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
python src/backend/manage.py migrate

# Recolectar archivos estáticos
python src/backend/manage.py collectstatic --noinput

# Iniciar servidor
gunicorn --chdir src/backend wsgi:application --bind 0.0.0.0:8000
```

## 📝 Notas Importantes

- **NO usar** `cd backend` - el directorio correcto es `src/backend`
- Los scripts `build.sh` y `start.sh` ya tienen la ruta correcta
- El `Procfile` está configurado correctamente
- El `render.yaml` está listo para usar con Blueprint

## 🆘 Troubleshooting

### Error: "cd: backend: No such file or directory"
**Solución**: Actualizar el comando de inicio en el Dashboard para usar `src/backend` en lugar de `backend`

### Error: "No module named 'wsgi'"
**Solución**: Asegurarse de usar `--chdir src/backend` en el comando gunicorn

### Error: "ModuleNotFoundError"
**Solución**: Verificar que todas las dependencias estén en `requirements.txt`

## 📞 Contacto

Para más información, revisar la documentación en `/docs` o contactar al equipo de desarrollo.
