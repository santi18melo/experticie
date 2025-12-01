# Scripts Disponibles - PREXCOL

Esta guía lista todos los scripts batch (.bat) disponibles en el proyecto y su uso.

---

## 🚀 Scripts de Inicio

### `start_prexcol.bat`
**Ubicación**: Raíz del proyecto  
**Propósito**: Iniciar todo el sistema PREXCOL (Backend + Frontend + Celery)

**Qué hace**:
1. ✅ Actualiza dependencias Python (`pip install -r requirements.txt`)
2. ✅ Ejecuta migraciones de base de datos
3. ✅ Inicia servidor Django (Backend)
4. ✅ Inicia Celery Worker (tareas asíncronas)
5. ✅ Inicia Celery Beat (tareas programadas)
6. ✅ Instala/actualiza dependencias Node.js
7. ✅ Inicia servidor Vite (Frontend)
8. ✅ Abre el navegador en `http://localhost:5175`

**Uso**:
```bash
.\start_prexcol.bat
```

**Requisitos**:
- Entorno virtual `.venv` creado
- Redis instalado y corriendo (para Celery)

**Logs**: Se guardan en `logs/backend/`, `logs/frontend/`, `logs/celery/`

---

## 🔍 Scripts de Verificación

### `verify_dependencies.bat`
**Ubicación**: Raíz del proyecto  
**Propósito**: Verificar que todas las dependencias estén instaladas correctamente

**Qué verifica**:
1. ✅ Entorno virtual Python existe
2. ✅ Dependencias Python principales (Django, DRF, Celery, Redis)
3. ✅ Node.js instalado
4. ✅ Dependencias Frontend (React, react-icons, axios, etc.)
5. ✅ Redis corriendo (opcional)

**Uso**:
```bash
.\verify_dependencies.bat
```

**Cuándo usarlo**:
- Después de clonar el repositorio
- Después de hacer `git pull`
- Cuando hay errores de "módulo no encontrado"
- Antes de iniciar el proyecto por primera vez

---

## 🛠️ Scripts de Configuración

### `setup_project.bat`
**Ubicación**: Raíz del proyecto  
**Propósito**: Configuración inicial completa del proyecto

**Qué hace**:
1. ✅ Crea entorno virtual Python
2. ✅ Instala todas las dependencias Python
3. ✅ Ejecuta migraciones de base de datos
4. ✅ Crea usuarios de prueba
5. ✅ Instala dependencias Frontend
6. ✅ Configura estructura de logs

**Uso**:
```bash
.\setup_project.bat
```

**Cuándo usarlo**:
- Primera vez que configuras el proyecto
- Después de eliminar `.venv` o `node_modules`
- Para resetear el proyecto a estado inicial

---

## 📦 Scripts NPM (Frontend)

Estos scripts se ejecutan desde la carpeta `frontend/`:

### Desarrollo
```bash
cd frontend

# Iniciar servidor de desarrollo
npm run dev

# Iniciar en modo accesible desde red
npm run dev -- --host
```

### Producción
```bash
cd frontend

# Crear build de producción
npm run build

# Preview del build de producción
npm run preview
```

### Testing
```bash
cd frontend

# Ejecutar tests unitarios
npm test

# Ejecutar tests E2E con Playwright
npx playwright test

# Ejecutar test específico
npx playwright test tests/e2e/login-simple.spec.js

# Ejecutar tests en modo visible
npx playwright test --headed

# Ver reporte de tests
npx playwright show-report
```

### Linting
```bash
cd frontend

# Ejecutar linter
npm run lint
```

---

## 🐍 Scripts Python (Backend)

Estos scripts se ejecutan desde la raíz del proyecto con el entorno virtual activado:

### Servidor
```bash
# Activar entorno virtual
.venv\Scripts\activate

# Servidor de desarrollo (solo localhost)
cd backend
python manage.py runserver

# Servidor accesible desde red
python manage.py runserver 0.0.0.0:8000
```

### Base de Datos
```bash
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Shell interactivo de Django
python manage.py shell
```

### Usuarios de Prueba
```bash
# Crear usuarios de prueba (desde raíz del proyecto)
python scripts\create_test_users.py
```

### Testing
```bash
# Ejecutar todos los tests
python manage.py test

# Ejecutar tests de una app específica
python manage.py test apps.usuarios.tests

# Ejecutar con cobertura
pytest --cov=apps
```

### Celery (Tareas Asíncronas)
```bash
# Worker de Celery
celery -A backend worker -l info

# Celery Beat (tareas programadas)
celery -A backend beat -l info

# Flower (monitor de Celery)
celery -A backend flower
```

---

## 🔧 Scripts de Utilidad

### Verificar Estado del Sistema
```bash
# Verificar configuración Django
python manage.py check

# Ver puertos en uso
netstat -ano | findstr :8000
netstat -ano | findstr :5175

# Ver procesos Python
tasklist | findstr python
```

### Limpiar Proyecto
```bash
# Limpiar archivos .pyc
cd backend
Get-ChildItem -Recurse -Filter *.pyc | Remove-Item -Force

# Limpiar caché Python
Get-ChildItem -Recurse -Filter __pycache__ | Remove-Item -Recurse -Force

# Reinstalar dependencias Frontend
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 📋 Flujo de Trabajo Recomendado

### Primera Vez (Setup Inicial)
```bash
# 1. Configurar proyecto
.\setup_project.bat

# 2. Verificar dependencias
.\verify_dependencies.bat

# 3. Iniciar sistema
.\start_prexcol.bat
```

### Desarrollo Diario
```bash
# Opción 1: Usar script maestro
.\start_prexcol.bat

# Opción 2: Iniciar manualmente
# Terminal 1 - Backend
.venv\Scripts\activate
cd backend
python manage.py runserver

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Después de Git Pull
```bash
# 1. Verificar nuevas dependencias
.\verify_dependencies.bat

# 2. Si hay cambios en dependencias
.venv\Scripts\activate
pip install -r requirements.txt
cd frontend
npm install

# 3. Aplicar nuevas migraciones
cd backend
python manage.py migrate
```

### Antes de Git Push
```bash
# 1. Ejecutar tests backend
python manage.py test

# 2. Ejecutar tests frontend
cd frontend
npm test
npx playwright test

# 3. Verificar linting
npm run lint

# 4. Verificar que todo funcione
.\start_prexcol.bat
```

---

## 🆘 Solución de Problemas

### "Módulo no encontrado"
```bash
# Verificar dependencias
.\verify_dependencies.bat

# Reinstalar si es necesario
.venv\Scripts\activate
pip install -r requirements.txt
cd frontend
npm install
```

### "Puerto ya en uso"
```bash
# Ver qué proceso usa el puerto
netstat -ano | findstr :8000

# Matar proceso (reemplazar PID)
taskkill /PID <numero_pid> /F

# O usar otro puerto
python manage.py runserver 8001
npm run dev -- --port 5174
```

### "Redis no está corriendo"
```bash
# Verificar Redis
redis-cli ping

# Si no responde, iniciar Redis
# (Requiere Redis instalado)
redis-server
```

### "Error de permisos PowerShell"
```bash
# Permitir ejecución de scripts (una vez)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force

# Luego ejecutar el script
.\start_prexcol.bat
```

---

## 📚 Documentación Relacionada

- **`docs/INICIO_RAPIDO.md`** - Guía de inicio rápido completa
- **`docs/DEPENDENCIAS.md`** - Documentación de dependencias
- **`docs/RESUMEN_CAMBIOS_DEPENDENCIAS.md`** - Últimos cambios realizados
- **`docs/ESTADO_SISTEMA_FINAL.md`** - Estado actual del sistema

---

## 💡 Tips y Mejores Prácticas

1. **Siempre activar el entorno virtual** antes de ejecutar comandos Python
2. **Usar `start_prexcol.bat`** para inicios rápidos y consistentes
3. **Ejecutar `verify_dependencies.bat`** después de cada `git pull`
4. **Revisar logs** en `logs/` si algo no funciona
5. **Mantener Redis corriendo** si usas tareas asíncronas
6. **Hacer hard refresh** (`Ctrl+Shift+R`) si el frontend no actualiza
7. **Cerrar todos los terminales** antes de reiniciar el sistema

---

**Última actualización**: 2025-12-01
