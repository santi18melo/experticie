# 🚀 GUÍA DE INICIO RÁPIDO - PREXCOL

**Versión:** 3.0  
**Última actualización:** 2025-12-01

---

## 📋 REQUISITOS PREVIOS

### Software Necesario
- **Python 3.10+** ([Descargar](https://www.python.org/downloads/))
- **Node.js 18+** ([Descargar](https://nodejs.org/))
- **Git** ([Descargar](https://git-scm.com/))

### Opcional (para funcionalidad completa)
- **Redis** (para Celery - tareas asíncronas)

---

## ⚡ INICIO RÁPIDO (2 opciones)

### Opción 1: Inicio Simple (Recomendado para desarrollo)

```powershell
# 1. Clonar repositorio
git clone <repository-url>
cd experticie-3

# 2. Ejecutar script de inicio simple
.\start_simple.bat
```

Este script:
- ✅ Activa el entorno virtual
- ✅ Instala dependencias
- ✅ Ejecuta migraciones
- ✅ Inicia Backend (Django) en http://localhost:8000
- ✅ Inicia Frontend (React) en http://localhost:5175
- ✅ Abre el navegador automáticamente

### Opción 2: Inicio Completo (con Celery y Redis)

```powershell
# Asegúrate de tener Redis instalado y corriendo
.\start_prexcol.bat
```

Este script incluye todo lo anterior más:
- ✅ Celery Worker (tareas asíncronas)
- ✅ Celery Beat (tareas programadas)

---

## 🔧 CONFIGURACIÓN MANUAL (Si prefieres control total)

### 1. Backend (Django)

```powershell
# Crear y activar entorno virtual
python -m venv .venv
.\.venv\Scripts\Activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
cd backend
python manage.py migrate

# Crear usuarios de prueba (opcional)
python scripts\create_demo_users.py

# Iniciar servidor
python manage.py runserver
```

**Backend disponible en:** http://localhost:8000/api/

### 2. Frontend (React + Vite)

```powershell
# En otra terminal
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

**Frontend disponible en:** http://localhost:5175/

---

## 👥 USUARIOS DE PRUEBA

Después de ejecutar `create_demo_users.py`, tendrás estos usuarios:

| Email | Contraseña | Rol |
|-------|------------|-----|
| admin@prexcol.com | Prexcol123! | Administrador |
| cliente@prexcol.com | Prexcol123! | Cliente |
| comprador@prexcol.com | Prexcol123! | Comprador |
| proveedor@prexcol.com | Prexcol123! | Proveedor |
| logistica@prexcol.com | Prexcol123! | Logística |

---

## 🔐 REQUISITOS DE CONTRASEÑA

Al registrarse o cambiar contraseña, se requiere:
- ✅ Mínimo 8 caracteres
- ✅ Al menos una letra mayúscula
- ✅ Al menos un número

---

## 🎯 FLUJO DE AUTENTICACIÓN

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
# Activar entorno virtual
.\.venv\Scripts\Activate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar migraciones
python manage.py migrate

# Crear usuarios de prueba
python scripts\create_demo_users.py

# Ejecutar tests
pytest

# Verificar configuración
python manage.py check

# Ejecutar en red local (accesible desde otros dispositivos)
python manage.py runserver 0.0.0.0:8000
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

# Ver reporte de tests
npx playwright show-report
```

---

## 📡 ENDPOINTS API PRINCIPALES

### Autenticación

```http
# Registro
POST http://localhost:8000/api/auth/register/
Content-Type: application/json
{
  "nombre": "Nuevo Usuario",
  "email": "nuevo@example.com",
  "password": "Password123!",
  "telefono": "3001234567",
  "direccion": "Calle 123"
}

# Login
POST http://localhost:8000/api/auth/login/
Content-Type: application/json
{
  "email": "admin@prexcol.com",
  "password": "Prexcol123!"
}

# Refresh Token
POST http://localhost:8000/api/auth/token/refresh/
Content-Type: application/json
{
  "refresh": "YOUR_REFRESH_TOKEN"
}

# Logout
POST http://localhost:8000/api/auth/logout/
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
{
  "refresh": "YOUR_REFRESH_TOKEN"
}

# Recuperar contraseña
POST http://localhost:8000/api/auth/forgot-password/
Content-Type: application/json
{
  "email": "admin@prexcol.com"
}

# Restablecer contraseña
POST http://localhost:8000/api/auth/reset-password/{uid}/{token}/
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
curl http://localhost:8000/api/auth/login/

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

### Error: "psycopg2-binary build failed"

Este error ya está resuelto. El archivo `requirements.txt` ha sido actualizado para no incluir PostgreSQL por defecto (el proyecto usa SQLite).

Si necesitas PostgreSQL, descomenta la línea en `requirements.txt`:
```
# psycopg2-binary==2.9.9
```

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
experticie-3/
├── backend/
│   ├── apps/
│   │   ├── usuarios/          # Autenticación y usuarios
│   │   ├── productos/         # Gestión de productos
│   │   ├── ventas/            # Gestión de ventas
│   │   ├── pagos/             # Procesamiento de pagos
│   │   └── notificaciones/    # Sistema de notificaciones
│   ├── scripts/
│   │   └── create_demo_users.py
│   ├── settings.py
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── pages/             # Páginas principales
│   │   ├── components/        # Componentes reutilizables
│   │   ├── context/           # Estado global
│   │   ├── services/          # Servicios API
│   │   └── routes/            # Configuración de rutas
│   ├── tests/e2e/             # Tests end-to-end
│   └── package.json
│
├── docs/                      # Documentación organizada
│   ├── README.md              # Índice de documentación
│   ├── guias/
│   ├── implementacion/
│   ├── soluciones/
│   ├── reportes/
│   ├── informes/
│   ├── planes/
│   ├── resumenes/
│   └── manuales/
│
├── requirements.txt           # Dependencias Python
├── start_simple.bat           # Inicio rápido (sin Celery)
├── start_prexcol.bat          # Inicio completo (con Celery)
└── setup_backend.bat          # Configuración inicial
```

---

## 🎓 DOCUMENTACIÓN ADICIONAL

Toda la documentación está organizada en la carpeta `docs/`. Consulta `docs/README.md` para un índice completo.

**Documentos principales:**
- `INICIO_RAPIDO.md` - Esta guía
- `GUIA_PRUEBAS_COMPLETAS.md` - Guía de testing
- `SEO_Y_REDES_SOCIALES.md` - Optimización SEO
- `RESUMEN_FINAL.md` - Resumen ejecutivo del proyecto

---

## 🔐 SEGURIDAD

- ✅ Passwords hasheados con PBKDF2 (Django)
- ✅ Validación de contraseñas (8+ caracteres, mayúscula, número)
- ✅ JWT con expiración (1h access, 1d refresh)
- ✅ Tokens blacklisted en logout
- ✅ CORS configurado correctamente
- ✅ CSRF protection habilitado
- ✅ Validación de datos en backend y frontend
- ✅ Rutas protegidas por rol
- ✅ Procesamiento seguro de imágenes (Pillow)

---

## 💡 CONSEJOS PRO

1. **Usa `start_simple.bat`** para desarrollo rápido
2. **Mantén ambos servidores corriendo** mientras desarrollas
3. **Usa DevTools (F12)** para ver requests/responses
4. **Revisa logs regularmente** en ambas terminales
5. **Haz commits frecuentes** después de cambios importantes
6. **Ejecuta tests antes de cada commit**
7. **Consulta `docs/README.md`** para encontrar documentación específica

---

## 🎯 VERIFICACIÓN RÁPIDA

```powershell
# 1. Backend funcionando
curl http://localhost:8000/api/auth/login/

# 2. Frontend funcionando
# Abrir http://localhost:5175 en navegador

# 3. Tests pasando
cd frontend
npx playwright test

# 4. Usuarios creados
cd backend
python manage.py shell
>>> from apps.usuarios.models import Usuario
>>> print(f"Total usuarios: {Usuario.objects.count()}")
```

---

## 📞 SOPORTE

Si encuentras problemas:

1. Revisa la sección **Solución de Problemas** arriba
2. Consulta la documentación en `docs/`
3. Verifica los logs en las terminales
4. Revisa el estado de los servicios (backend, frontend, Redis)

---

## 📝 CHANGELOG

### Versión 3.0 (2025-12-01)
- ✨ Validación real de contraseñas (8+ caracteres, mayúscula, número)
- 📚 Reorganización completa de documentación
- 🔧 Scripts de inicio mejorados (`start_simple.bat`, `start_prexcol.bat`)
- 📦 Limpieza de `requirements.txt` (eliminado PostgreSQL por defecto)
- 🎨 Indicadores visuales en tiempo real para requisitos de contraseña

### Versión 2.1 (2025-11-25)
- ✨ Dashboards específicos por rol
- ✨ Redirección automática según rol de usuario
- 🎨 Interface profesionalizada

---

**¡Sistema listo para desarrollo!** 🎉