#  GUÍA DE INICIO RÁPIDO - PREXCOL

**Última actualización:** 2025-11-26 15:00:00  
**Estado del Sistema:** ✅ 100% Operativo  
**Versión:** 2.2 - Dependencias Completas y Scripts de Configuración

---

##  REQUISITOS PREVIOS

- Python 3.11+ instalado (compatible hasta Python 3.14+)
- Node.js 16+ y npm instalados
- Git instalado
- Editor de código (VS Code recomendado)

---

## ⚡ INICIO RÁPIDO (2 PASOS)

### 1️⃣ **Clonar e Instalar (MÉTODO AUTOMÁTICO)**

```powershell
# Clonar repositorio
git clone https://github.com/santi18melo/experticie.git
cd experticie-2

# Instalar TODAS las dependencias (Backend + Frontend) automáticamente
.\\setup_project.bat
```

**O manualmente (paso a paso):**

```powershell
# Backend - Instalar dependencias
cd backend
python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1
python -m pip install -r requirements.txt

# Frontend - Instalar dependencias
cd ..\\frontend
npm install
```

> **💡 Nuevo:** El script `setup_project.bat` instala automáticamente todas las dependencias de backend y frontend en un solo paso.

### 2️⃣ **Iniciar Servicios**

**Terminal 1 - Backend:**
```powershell
cd backend
.\\.venv\\Scripts\\Activate.ps1
python manage.py runserver 0.0.0.0:8000
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

### 3️⃣ **Acceder a la Aplicación**

Abre tu navegador en: **http://localhost:5175**

---

## 📦 DEPENDENCIAS DEL PROYECTO

### Backend (Python)

| Categoría | Paquete | Versión | Propósito |
|-----------|---------|---------|-----------|
| **Framework** | Django | 5.0.1 | Framework web |
| | djangorestframework | 3.14.0 | API REST |
| **Autenticación** | djangorestframework-simplejwt | 5.3.1 | Tokens JWT |
| **CORS** | django-cors-headers | 4.3.1 | Solicitudes entre dominios |
| **Base de Datos** | psycopg2-binary | 2.9.11 | Adaptador PostgreSQL |
| **Servidor** | gunicorn | 21.2.0 | Servidor WSGI |
| **Configuración** | python-dotenv | 1.0.0 | Variables de entorno |
| | django-environ | 0.11.2 | Gestión de configuración |
| **Archivos Estáticos** | whitenoise | 6.6.0 | Servir archivos estáticos |
| **Media** | Pillow | >=10.2.0 | Procesamiento de imágenes |
| **HTTP Client** | requests | 2.31.0 | Peticiones HTTP |
| **Testing** | pytest | 7.4.3 | Framework de testing |
| | pytest-django | 4.7.0 | Testing para Django |

**Total:** 13 dependencias principales

### Frontend (Node.js)

| Categoría | Paquete | Versión | Propósito |
|-----------|---------|---------|-----------|
| **Framework** | react | ^19.2.0 | Biblioteca UI |
| | react-dom | ^19.2.0 | Renderizado React |
| **Routing** | react-router-dom | ^7.9.6 | Navegación SPA |
| **HTTP Client** | axios | ^1.13.2 | Peticiones HTTP |
| **Build Tool** | vite | ^7.2.2 | Bundler y dev server |
| **Testing** | @playwright/test | ^1.57.0 | Testing E2E |
| | vitest | ^4.0.13 | Testing unitario |
| | @testing-library/react | ^16.3.0 | Testing de componentes |

**Total:** 8 dependencias principales + 7 dev dependencies

---

## 👥 USUARIOS DE PRUEBA

Todos los usuarios siguen el patrón: `{rol}@prexcol.com` / `{Rol}123!`

| Rol | Email | Password | Dashboard |
|-----|-------|----------|-----------|
| **Admin** | admin@prexcol.com | Prexcol123! | /admin |
| **Cliente** | cliente1@prexcol.com | Cliente123! | /cliente |
| **Comprador** | comprador1@prexcol.com | Comprador123! | /comprador |
| **Proveedor** | proveedor1@prexcol.com | Proveedor123! | /proveedor |
| **Logística** | logistica1@prexcol.com | Logistica123! | /logistica |

> **Nota:** Cada rol tiene su propio dashboard específico con funcionalidades adaptadas a sus necesidades.

---

##  FLUJO DE USUARIO COMPLETO

```
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
python scripts\\create_test_users.py

# Ejecutar tests
python manage.py test apps.usuarios.tests

# Verificar configuración
python manage.py check
```

### Frontend (React + Vite)

```powershell
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
cd backend
python -m pip install -r requirements.txt

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

1. **Usa el script de instalación automática** (`setup_project.bat`) para configurar el proyecto en segundos
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
cd ..\\backend
python manage.py shell
>>> from apps.usuarios.models import Usuario
>>> print(f"Total usuarios: {Usuario.objects.count()}")
```

---

## 📞 SOPORTE

Si encuentras problemas:

1. Revisa la sección de **Solución de Problemas**
2. Consulta los logs en las terminales
3. Verifica la documentación en `docs/`
4. Revisa los tests para ver ejemplos de uso
5. Ejecuta `setup_project.bat` para reinstalar dependencias

---

## 📝 CHANGELOG

### Versión 2.2 (2025-11-26)
- ✨ Agregado `setup_project.bat` y `setup_project.sh` para instalación automática
- ✨ Agregadas dependencias: `Pillow` (manejo de imágenes) y `requests` (cliente HTTP)
- 📝 Actualizada documentación de dependencias
- 🐛 Mejorada compatibilidad con Python 3.14+
- 📦 Limpieza y optimización de `requirements.txt`

### Versión 2.1 (2025-11-25)
- ✨ Dashboards específicos por rol
- ✨ Redirección automática según rol de usuario
- 🎨 Interface profesionalizada

---

**¡Sistema listo para desarrollo!** 🎉

Todos los componentes están operativos y probados. Cada rol tiene su dashboard específico con redirección automática. Ejecuta `setup_project.bat` para instalar todas las dependencias automáticamente.