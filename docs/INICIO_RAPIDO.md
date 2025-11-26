
#  GUÍA DE INICIO RÁPIDO

##  INSTALACIÓN INICIAL

### Opción A: Automática (Recomendada)
Ejecuta el script de configuración que instalará todas las dependencias:
```powershell
.\setup_project.bat
```

### Opción B: Manual
Si prefieres configurar manualmente:

1. **Backend**
```powershell
# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
.venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Migraciones y usuarios
python manage.py migrate
python scripts\create_test_users.py
```

2. **Frontend**
```powershell
cd frontend
npm install
```

---

## s FLUJO DE USUARIO

1. Registro (rol por defecto: cliente)
   ↓
2. Login
   ↓
3. Redirección automática al dashboard específico del rol:
   - Admin → /admin
   - Cliente → /cliente
   - Comprador → /comprador
   - Proveedor → /proveedor
   - Logística → /logistica
   ↓
4. Navegación (según permisos del rol)
   ↓
5. Logout
```

---

## 🔧 COMANDOS ÚTILES

### Backend (Django)

```powershell
# Crear superusuario
python manage.py createsuperuser

# Ejecutar migraciones
python manage.py migrate

# Crear usuarios de prueba
python scripts\create_test_users.py

# Ejecutar tests
python manage.py test apps.usuarios.tests

# Verificar configuración
python manage.py check
```

Ejecutar Backend — Guía completa

Desarrollo (rápido, local)

```powershell
# 1) Activar venv (PowerShell)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force
.\.venv\Scripts\Activate
# o si lo creaste dentro de backend:
.\backend\.venv\Scripts\Activate

# 2) Instalar dependencias (si no está hecho)
pip install -r requirements.txt

# 3) Migraciones y datos iniciales
python manage.py migrate
python scripts\create_test_users.py

# 4) Ejecutar servidor de desarrollo (accesible solo localmente)
python manage.py runserver

# 4b) Ejecutar en todas las interfaces (útil para pruebas en red)
python manage.py runserver 0.0.0.0:8000

# 5) Si prefieres ejecutar desde un CMD (Windows) y no PowerShell:
& ".\.venv\Scripts\activate.bat"
cd backend
python manage.py runserver
```

Producción (ejemplo con Gunicorn en Linux):

```bash
# Crear venv y activar (bash)
python -m venv venv
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Migraciones y collectstatic
python manage.py migrate --noinput
python manage.py collectstatic --noinput

# Ejecutar con gunicorn (ejecutar desde el directorio `backend` si el wsgi está ahí)
gunicorn -c deployment/gunicorn.conf.py backend.wsgi:application

# (Alternativa sencilla)
gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 3
```

Notas y recomendaciones
- Variables de entorno: exporta `DJANGO_SETTINGS_MODULE`, `DATABASE_URL`, `SECRET_KEY` y otras variables necesarias antes de arrancar en producción.
- Base de datos: este proyecto puede usar SQLite por defecto (`db.sqlite3`) pero para producción se recomienda Postgres/MySQL; ajustar `DATABASES` en `backend/settings.py`.
- Logs: en producción usa `gunicorn` + `systemd` + `nginx` según `deployment/` y los `*.service` ya incluidos en el repo.
- Si tu prompt ya muestra `(.venv)` no hace falta reactivar el entorno.
- Si necesitas ejecutar tareas en background (Linux): usa `nohup` o `systemd` en vez de `&`.

### Frontend (React + Vite)

Antes de iniciar el frontend, activa el entorno virtual del backend para que la API local esté disponible.

Nota importante sobre PowerShell: en Windows PowerShell la ejecución de scripts (.ps1) puede estar deshabilitada por la política de ejecución del sistema, por eso podrías ver un error como:

```
.\.venv\Scripts\Activate : No se puede cargar el archivo C:\experticie\.venv\Scripts\Activate.ps1 porque la ejecución de scripts está deshabilitada en este sistema.
```

Por qué ocurre: PowerShell aplica políticas de ejecución (Execution Policies) que bloquean la ejecución de scripts no firmados o remotos por seguridad. `Activate.ps1` es un script local y puede ser bloqueado por la política por defecto.

Soluciones (elige una) y comprobaciones previas:

1) Comprobar si la ruta del `venv` existe

```powershell
# Listar contenido de backend (verifica si existe backend\.venv)
Get-ChildItem -Path .\backend -Force -ErrorAction SilentlyContinue

# Comprobaciones puntuales (devuelven True/False)
Test-Path .\backend\.venv\Scripts\Activate.ps1
Test-Path .\.venv\Scripts\Activate.ps1
```

Si los tests devuelven `False`, la ruta no existe y debes crear el `venv` en la ubicación que prefieras (raíz o dentro de `backend`).

```powershell
# Crear venv en la raíz
python -m venv .venv

# O crear venv dentro de backend
python -m venv backend/.venv
```

2) Formas correctas de activar el `venv`

- Activar en PowerShell (si `Activate.ps1` está presente):

```powershell
# Si el venv está en la raíz
.\.venv\Scripts\Activate

# Si el venv está dentro de backend
.\backend\.venv\Scripts\Activate
```

- Ejecutar el `.bat` desde PowerShell: usa el operador `&` para invocar ejecutables o scripts por ruta (evita el error "no se reconoce como nombre de un cmdlet"):

```powershell
# Ejecutar el .bat directamente desde PowerShell (ruta correcta requerida)
& ".\backend\.venv\Scripts\activate.bat"

# o si está en la raíz
& ".\.venv\Scripts\activate.bat"
```

Nota sobre `cmd /c`: también funciona si la ruta existe, pero el error "El sistema no puede encontrar la ruta especificada" indica que la ruta indicada no existe. Asegúrate de que `backend\.venv\Scripts\activate.bat` exista antes de usar `cmd /c`.

- Alternativa: ejecutar PowerShell con política temporal para un comando concreto (menos necesaria si usas la opción `Set-ExecutionPolicy -Scope Process`):

```powershell
powershell -ExecutionPolicy Bypass -Command ".\backend\.venv\Scripts\Activate.ps1"
```

3) Observación práctica: si tu prompt ya muestra `(.venv)` —p.ej. `(.venv) PS C:\experticie>`— significa que el entorno ya está activado y no necesitas volver a ejecutar el activador.

Resumen: los errores que mostraste pueden deberse a dos causas diferentes:
- "No se puede cargar el archivo ... porque la ejecución de scripts está deshabilitada" → la política de ejecución bloquea `Activate.ps1` (solución: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned`).
- "El sistema no puede encontrar la ruta especificada" o "no se reconoce como nombre de un cmdlet" → la ruta al `.bat`/`.ps1` es incorrecta o no existe; comprueba con `Test-Path`/`Get-ChildItem` y crea el `venv` si falta.

```powershell
# IMPORTANTE: ejecuta los comandos de npm desde la carpeta `frontend`
cd frontend

# Modo desarrollo
npm run dev

# Modo desarrollo (accesible desde red)
npm run dev -- --host

# Build para producción
npm run build

# Preview de producción
npm run preview

# Ejecutar tests E2E
npx playwright test

# Ejecutar test específico
npx playwright test tests/e2e/full-user-journey.spec.js

# Ejecutar tests en modo headed (visible)
npx playwright test --headed

# Ver reporte de tests
npx playwright show-report
```

### Tests Automatizados

```powershell
# Ejecutar pruebas continuas por 3 horas
cd frontend
python run_continuous_tests.py 3

# Ejecutar pruebas por 30 minutos
python run_continuous_tests.py 0.5
```

---

## 🌐 ENDPOINTS DE API

### Autenticación

```bash
# Registro
POST http://127.0.0.1:8000/api/auth/register/
Content-Type: application/json
{
  "nombre": "Nuevo Usuario",
  "email": "nuevo@example.com",
  "password": "Password123!",
  "telefono": "3001234567",
  "direccion": "Calle 123"
}

# Login
POST http://127.0.0.1:8000/api/auth/login/
Content-Type: application/json
{
  "email": "admin@prexcol.com",
  "password": "Prexcol123!"
}

# Refresh Token
POST http://127.0.0.1:8000/api/auth/token/refresh/
Content-Type: application/json
{
  "refresh": "YOUR_REFRESH_TOKEN"
}

# Logout
POST http://127.0.0.1:8000/api/auth/logout/
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
{
  "refresh": "YOUR_REFRESH_TOKEN"
}

# Recuperar contraseña
POST http://127.0.0.1:8000/api/auth/forgot-password/
Content-Type: application/json
{
  "email": "admin@prexcol.com"
}

# Restablecer contraseña
POST http://127.0.0.1:8000/api/auth/reset-password/{uid}/{token}/
Content-Type: application/json
{
  "password": "NewPassword123!"
}
```

---

## 🔍 VERIFICACIÓN DEL SISTEMA

### Verificar Backend

```powershell
# Verificar que el servidor esté corriendo
netstat -ano | findstr :8000

# Probar endpoint de salud
curl http://127.0.0.1:8000/api/auth/login/

# Ver usuarios en la base de datos
python manage.py shell
>>> from apps.usuarios.models import Usuario
>>> Usuario.objects.all()
```

### Verificar Frontend

```powershell
# Verificar que Vite esté corriendo
netstat -ano | findstr :5175

# Ver tokens en navegador (F12 → Console)
localStorage.getItem('token')
localStorage.getItem('refresh')
localStorage.getItem('user')
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "Módulo no encontrado"
```powershell
# Reinstalar dependencias backend
# Asegúrate de estar en la raíz del proyecto y con el entorno virtual activo
pip install -r requirements.txt

# Reinstalar dependencias frontend
cd frontend
npm install
```

### Error: "CORS Policy"
- Verificar que el frontend esté en `http://localhost:5175`
- Revisar `CORS_ALLOWED_ORIGINS` en `backend/settings.py`

### Error: "401 Unauthorized"
- El token expiró (válido por 1 hora)
- Hacer login nuevamente o usar refresh token

### Error: "Puerto ya en uso"
```powershell
# Backend en otro puerto
python manage.py runserver 8001

# Frontend en otro puerto
npm run dev -- --port 5174
```

### Error: "Database is locked"
- Cerrar todas las conexiones a la BD
- Reiniciar el servidor Django

### Tests E2E fallan
```powershell
# Instalar navegadores de Playwright
npx playwright install

# Ejecutar con más tiempo de espera
npx playwright test --timeout=60000
```

### Error: "Pillow build failed" (Python 3.14+)
```powershell
# El sistema instalará automáticamente una versión compatible
# Si persiste el error, instalar Pillow manualmente:
python -m pip install Pillow
```

### Error: "IndentationError" o "expected an indented block"
```powershell
# Limpiar archivos .pyc corruptos
cd backend
Get-ChildItem -Recurse -Filter *.pyc | Remove-Item -Force

# Verificar sintaxis
python manage.py check

# Si el error persiste, verificar apps/productos/serializers.py
# Debe tener todas las clases completas sin duplicados
```

---

## 📁 ESTRUCTURA DEL PROYECTO

```
experticie-2/
├── backend/
│   ├── apps/
│   │   ├── usuarios/
│   │   │   ├── models.py          # Modelo Usuario
│   │   │   ├── serializers.py     # Validación de datos
│   │   │   ├── views/
│   │   │   │   ├── views_auth.py  # Login, Register, Logout
│   │   │   │   └── view_password.py # Recuperación de contraseña
│   │   │   ├── urls.py            # Rutas de API
│   │   │   └── tests/             # Tests unitarios
│   │   ├── productos/             # Módulo productos
│   │   ├── ventas/                # Módulo ventas
│   │   ├── pagos/                 # Módulo pagos
│   │   └── notificaciones/        # Módulo notificaciones
│   ├── scripts/
│   │   └── create_test_users.py   # Crear usuarios de prueba
│   ├── settings.py                # Configuración Django
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx          # Página de login
│   │   │   ├── Register.jsx       # Página de registro
│   │   │   ├── Dashboard.jsx      # Dashboard general
│   │   │   ├── DashboardAdmin.jsx # Dashboard Admin
│   │   │   └── CompradorDashboard.jsx # Dashboard Comprador
│   │   ├── components/
│   │   │   ├── clientes/
│   │   │   │   └── PanelCliente.jsx    # Panel Cliente
│   │   │   ├── logistica/
│   │   │   │   └── PanelLogistica.jsx  # Panel Logística
│   │   │   └── usuarios/
│   │   │       └── ProveedorPanel.jsx  # Panel Proveedor
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Estado de autenticación
│   │   ├── services/
│   │   │   ├── api.js             # Axios configurado
│   │   │   └── authService.js     # Servicios de auth
│   │   └── routes/
│   │       ├── App.jsx            # Rutas principales
│   │       └── ProtectedRoute.jsx # Protección por rol
│   ├── tests/
│   │   └── e2e/
│   │       ├── login-simple.spec.js      # Test de login
│   │       └── full-user-journey.spec.js # Test completo
│   ├── run_continuous_tests.py    # Script de pruebas continuas
│   └── package.json
│
├── requirements.txt               # Dependencias Python (ACTUALIZADO)
├── setup_project.bat             # Script instalación Windows (NUEVO)
├── setup_project.sh              # Script instalación Unix/Linux (NUEVO)
├── start_system.bat              # Script inicio completo (NUEVO)
│
└── docs/
    ├── INICIO_RAPIDO.md          # Esta guía
    ├── ESTADO_SISTEMA_FINAL.md   # Estado actual
    └── REPORTE_PRUEBAS_AUTENTICACION.md  # Validación
```

---

## 🎓 DOCUMENTACIÓN ADICIONAL

| Documento | Descripción |
|-----------|-------------|
| `INICIO_RAPIDO.md` | Guía de inicio rápido (este documento) |
| `ESTADO_SISTEMA_FINAL.md` | Estado completo del sistema con métricas |
| `REPORTE_PRUEBAS_AUTENTICACION.md` | Validación detallada de autenticación |
| `RESUMEN_VALIDACION.md` | Resumen ejecutivo con credenciales |
| `REPORTE_AUTOMATIZACION.md` | Documentación de tests automáticos |
| `MANUAL_AUTH_TESTING_GUIDE.md` | Guía paso a paso de pruebas manuales |

---

## 🔐 SEGURIDAD

- ✅ Passwords hasheados con PBKDF2 (Django)
- ✅ JWT con expiración (1h access, 1d refresh)
- ✅ Tokens blacklisted en logout
- ✅ CORS configurado correctamente
- ✅ CSRF protection habilitado
- ✅ Validación de datos en backend
- ✅ Rutas protegidas por rol
- ✅ Procesamiento seguro de imágenes (Pillow)

---

## 🚀 PRÓXIMOS PASOS

1. **Explorar Dashboards Específicos**
   - Login con diferentes roles
   - Verificar funcionalidades específicas de cada dashboard
   - Probar permisos por rol

2. **Crear Nuevos Usuarios**
   - Usar formulario de registro
   - Probar con diferentes roles
   - Verificar emails en consola (DEBUG mode)

3. **Ejecutar Tests**
   - Tests unitarios backend
   - Tests E2E frontend
   - Pruebas continuas

4. **Desarrollo**
   - Personalizar dashboards específicos
   - Implementar funcionalidades de negocio
   - Agregar más tests

---

## 💡 CONSEJOS PRO

1. **Usa el script maestro** (`start_system.bat`) para iniciar todo en segundos
2. **Mantén ambos servidores corriendo** mientras desarrollas
3. **Usa DevTools (F12)** para ver requests/responses
4. **Revisa logs regularmente** en ambas terminales
5. **Haz commits frecuentes** después de cambios importantes
6. **Ejecuta tests antes de cada commit** para evitar regresiones
7. **Usa data-testid** en elementos interactivos para testing
8. **Consulta la documentación** en la carpeta `docs/`

---

## 🎯 VERIFICACIÓN RÁPIDA

Ejecuta estos comandos para verificar que todo funciona:

```powershell
# 1. Backend funcionando
curl http://127.0.0.1:8000/api/auth/login/

# 2. Frontend funcionando
# Abrir http://localhost:5175 en navegador

# 3. Tests pasando
cd frontend
npx playwright test tests/e2e/login-simple.spec.js

# 4. Usuarios creados
cd ..\backend
python manage.py shell
>>> from apps.usuarios.models import Usuario
>>> print(f"Total usuarios: {Usuario.objects.count()}")
```

---

## 📞 SOPORTE

Si encuentras problemas:

1. Revisa la sección de **Solución de Problemas**
- 📦 Limpieza y optimización de `requirements.txt`

### Versión 2.1 (2025-11-25)
- ✨ Dashboards específicos por rol
- ✨ Redirección automática según rol de usuario
- 🎨 Interface profesionalizada

---

**¡Sistema listo para desarrollo!** 🎉