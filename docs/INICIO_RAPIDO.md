# 🚀 GUÍA DE INICIO RÁPIDO - PREXCOL

**Última actualización:** 2025-11-25 22:00:00  
**Estado del Sistema:** ✅ 100% Operativo  
**Versión:** 2.0 - Autenticación Completa

---

## 📋 REQUISITOS PREVIOS

- Python 3.8+ instalado
- Node.js 16+ y npm instalados
- Git instalado
- Editor de código (VS Code recomendado)

---

## ⚡ INICIO RÁPIDO (3 PASOS)

### 1️⃣ **Clonar e Instalar**

```powershell
# Clonar repositorio
git clone https://github.com/santi18melo/experticie.git
cd experticie-2

# Backend - Instalar dependencias
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Frontend - Instalar dependencias
cd ..\frontend
npm install
```

### 2️⃣ **Iniciar Servicios**

**Terminal 1 - Backend:**
```powershell
cd backend
.\.venv\Scripts\Activate.ps1
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

## 👥 USUARIOS DE PRUEBA

Todos los usuarios siguen el patrón: `{rol}@prexcol.com` / `{Rol}123!`

| Rol | Email | Password | Dashboard |
|-----|-------|----------|-----------|
| **Admin** | admin@prexcol.com | Prexcol123! | /admin |
| **Cliente** | cliente1@prexcol.com | Cliente123! | /dashboard |
| **Comprador** | comprador1@prexcol.com | Comprador123! | /dashboard |
| **Proveedor** | proveedor1@prexcol.com | Proveedor123! | /dashboard |
| **Logística** | logistica1@prexcol.com | Logistica123! | /dashboard |

---

## 🎯 FLUJO DE USUARIO COMPLETO

```
1. Registro
   ↓
2. Login (automático o manual)
   ↓
3. Dashboard (según rol)
   ↓
4. Navegación:
   - Perfil (/profile)
   - Pedidos (/orders)
   - Notificaciones (/notifications)
   - Configuración (/settings)
   - Productos (/productos) - Cliente/Comprador
   - Carrito (/cart) - Cliente/Comprador
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
cd backend
pip install -r requirements.txt
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

---

## 📁 ESTRUCTURA DEL PROYECTO

```
experticie-2/
├── backend/
│   ├── apps/
│   │   └── usuarios/
│   │       ├── models.py          # Modelo Usuario
│   │       ├── serializers.py     # Validación de datos
│   │       ├── views/
│   │       │   ├── views_auth.py  # Login, Register, Logout
│   │       │   └── view_password.py # Recuperación de contraseña
│   │       ├── urls.py            # Rutas de API
│   │       └── tests/             # Tests unitarios
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
│   │   │   └── Dashboard.jsx      # Dashboard general
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
└── docs/
    ├── ESTADO_SISTEMA_FINAL.md           # Estado actual
    ├── REPORTE_PRUEBAS_AUTENTICACION.md  # Validación
    ├── RESUMEN_VALIDACION.md             # Resumen
    └── MANUAL_AUTH_TESTING_GUIDE.md      # Guía de pruebas
```

---

## 🎓 DOCUMENTACIÓN ADICIONAL

| Documento | Descripción |
|-----------|-------------|
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

---

## 🚀 PRÓXIMOS PASOS

1. **Explorar el Dashboard**
   - Login con diferentes roles
   - Probar navegación entre secciones
   - Verificar permisos por rol

2. **Crear Nuevos Usuarios**
   - Usar formulario de registro
   - Probar con diferentes roles
   - Verificar emails en consola (DEBUG mode)

3. **Ejecutar Tests**
   - Tests unitarios backend
   - Tests E2E frontend
   - Pruebas continuas

4. **Desarrollo**
   - Crear páginas para Profile, Orders, etc.
   - Implementar funcionalidades de negocio
   - Agregar más tests

---

## 💡 CONSEJOS PRO

1. **Mantén ambos servidores corriendo** mientras desarrollas
2. **Usa DevTools (F12)** para ver requests/responses
3. **Revisa logs regularmente** en ambas terminales
4. **Haz commits frecuentes** después de cambios importantes
5. **Ejecuta tests antes de cada commit** para evitar regresiones
6. **Usa data-testid** en elementos interactivos para testing
7. **Consulta la documentación** en la carpeta `docs/`

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
2. Consulta los logs en las terminales
3. Verifica la documentación en `docs/`
4. Revisa los tests para ver ejemplos de uso

---

**¡Sistema listo para desarrollo!** 🎉

Todos los componentes están operativos y probados. Comienza a desarrollar con confianza.