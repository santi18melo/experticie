# PREXCOL - Plataforma de Comercio Electrónico

## 📋 Requisitos

- Python 3.11+
- Node.js 18+
- npm o yarn

## 🚀 Instalación y Ejecución

### Backend (Django)

1. **Crear y activar entorno virtual:**
```bash
python -m venv venv
# En Windows:
venv\Scripts\activate
```

2. **Instalar dependencias:**
```bash
pip install -r requirements.txt
```

3. **Ejecutar migraciones:**
```bash
python manage.py migrate
```

4. **Crear superusuario (opcional):**
```bash
python manage.py createsuperuser
```

5. **Iniciar servidor Django:**
```bash
python manage.py runserver
```

El servidor estará disponible en: `http://127.0.0.1:8000`

### Frontend (React + Vite)

1. **Instalar dependencias:**
```bash
cd frontend
npm install
```

2. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 🔐 Credenciales de Prueba

**Usuario Admin:**
- Email: `admin@example.com`
- Contraseña: `admin123`

## 📚 Estructura del Proyecto

```
prexcol/
├── backend/              # Configuración principal Django
├── usuarios/             # App de gestión de usuarios
│   ├── models.py         # Modelo Usuario personalizado
│   ├── views.py          # Vistas API
│   ├── serializers.py    # Serializadores
│   ├── permissions.py    # Permisos personalizados
│   └── urls.py           # Rutas
├── pedidos/              # App de pedidos
├── productos/            # App de productos
├── ventas/               # App de ventas
├── frontend/             # Aplicación React
│   └── src/
│       ├── pages/        # Páginas (Login, Register, Dashboard)
│       ├── components/   # Componentes reutilizables
│       └── services/     # Servicios API
└── manage.py             # Herramienta de gestión Django
```

## 🔌 API Endpoints

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register/` | Registrar nuevo usuario |
| POST | `/api/auth/login/` | Obtener token JWT |
| POST | `/api/auth/refresh/` | Refrescar token expirado |

### Dashboard

| Método | Ruta | Descripción | Requiere |
|--------|------|-------------|----------|
| GET | `/api/dashboard/admin/` | Dashboard admin con estadísticas | Token + Admin |
| GET | `/api/cliente/tienda/` | Información tienda cliente | Token + Cliente |

### Usuarios

| Método | Ruta | Descripción | Requiere |
|--------|------|-------------|----------|
| GET | `/api/usuarios/` | Listar todos los usuarios | Token + Admin |
| GET | `/api/usuarios/{id}/` | Obtener usuario específico | Token + Admin |

## 🔍 Pruebas

### Usando curl

**Registrar usuario:**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email":"usuario@example.com",
    "nombre":"Usuario Prueba",
    "password":"password123",
    "rol":"cliente"
  }'
```

**Login:**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email":"admin@example.com",
    "password":"admin123"
  }'
```

**Acceder al dashboard (reemplazar TOKEN):**
```bash
curl -H "Authorization: Bearer TOKEN" \
  http://127.0.0.1:8000/api/dashboard/admin/
```

### Usando Python

```bash
python test_api.py
```

## 🛠️ Desarrollo

### Variables de Entorno

Crear archivo `.env` en la raíz (opcional):
```
DEBUG=True
SECRET_KEY=tu-clave-secreta
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Comandos Útiles

```bash
# Crear migraciones
python manage.py makemigrations

# Ver migraciones pendientes
python manage.py showmigrations

# Limpiar caché de Django
python manage.py clear_cache

# Abrir shell interactivo Django
python manage.py shell

# Ejecutar tests
python manage.py test
```

## 🐛 Solución de Problemas

### Error: ModuleNotFoundError
Asegúrate de estar en el entorno virtual activado y haber instalado las dependencias.

### Error: CORS
Verifica que `CORS_ALLOWED_ORIGINS` en `backend/settings.py` incluya la URL del frontend.

### Error: No module named 'rest_framework_simplejwt'
Instala las dependencias: `pip install -r requirements.txt`

## 📝 Cambios Recientes

- ✅ Configuración completa de JWT para autenticación
- ✅ Serializer corregido con hash de contraseñas
- ✅ Dashboard admin con estadísticas reales
- ✅ Manejo de errores mejorado en el frontend
- ✅ Interceptor de tokens con refresh automático
- ✅ CORS configurado correctamente

Ver `BACKEND_FIXES.md` para más detalles técnicos.
