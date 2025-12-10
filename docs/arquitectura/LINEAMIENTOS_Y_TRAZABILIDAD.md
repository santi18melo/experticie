# 📐 LINEAMIENTOS Y TRAZABILIDAD DE PREXCOL
## Documento de Gobernanza Técnica y Rastreabilidad

---

# 📋 TABLA DE CONTENIDOS
1. Lineamientos de Desarrollo
2. Estándares de Codificación
3. Flujo de Trazabilidad
4. Auditoría y Logging
5. Versionamiento y Control de Cambios
6. Políticas de Seguridad
7. Performance y Optimización

---

# 🏛️ PARTE 1: LINEAMIENTOS DE DESARROLLO

## 1.1 Principios Arquitectónicos

### A. Clean Architecture (Limpia)
```
PREXCOL implementa:

┌────────────────────────────────────┐
│      ENTERPRISE Business Rules      │  ← Lógica pura (sin dependencias)
├────────────────────────────────────┤
│      Application Business Rules     │  ← Casos de uso
│      (Services, Use Cases)          │
├────────────────────────────────────┤
│      Interface Adapters            │  ← Controllers, Presenters
│      (APIs, Database)              │
├────────────────────────────────────┤
│      Frameworks & Drivers          │  ← Django, React, PostgreSQL
│      (Web, DB, External Services)  │
└────────────────────────────────────┘

Objetivo: Independencia de frameworks y detalles técnicos
```

### B. SOLID Principles:
```
✓ Single Responsibility    → Cada clase/función hace UNA cosa
✓ Open/Closed             → Abierto a extensión, cerrado a modificación
✓ Liskov Substitution     → Subclases intercambiables
✓ Interface Segregation   → Interfaces específicas, no genéricas
✓ Dependency Inversion    → Depender de abstracciones, no implementaciones
```

### C. DRY - Don't Repeat Yourself
- Reutilizar código en servicios
- Mixins en modelos Django
- Custom hooks en React
- Utility functions para lógica común

### D. KISS - Keep It Simple, Stupid
- Código legible > Código "clever"
- Comments claros en lógica compleja
- Evitar over-engineering

## 1.2 Convenciones de Nombres

### Backend (Python/Django):

```python
# Modelos
class Usuario:           # PascalCase
class Producto:
class VentaItem:

# Funciones/Métodos
def obtener_usuario():   # snake_case
def crear_venta():
def validar_pago():

# Constantes
MAX_ITEMS_PER_PAGE = 50  # UPPER_SNAKE_CASE
TIMEOUT_SEGUNDOS = 30

# Variables privadas
_helpers_internos = []   # _snake_case
_calculo_privado()

# Database
tabla_usuarios           # lowercase_underscore
campo_fecha_creacion     # lowercase con separadores

# URLs
/api/usuarios/          # lowercase, plural
/api/usuarios/{id}/
/api/usuarios/admin/metrics/

# Serializers
class UsuarioSerializer:        # NombreSerializer
class ProductoListSerializer:   # Context-specific
```

### Frontend (JavaScript/React):

```javascript
// Componentes
function LoginForm() { }        // PascalCase
export const LoginForm = () => {}

// Hooks
function useAuth() { }          // useXxxx pattern
const useUserFetch = () => {}

// Funciones/Utils
const validateEmail = () => {}  // camelCase
const formatCurrency = () => {}

// Constantes
const API_BASE_URL = '...'      // CONSTANT_CASE
const MAX_RETRIES = 3

// Variables
let currentUser = null          // camelCase
const isLoading = false

// Ficheros
LoginForm.jsx                   // PascalCase (componentes)
authService.js                  # camelCase (servicios)
constants.js                    # lowercase (sin cambios)

// Directories
src/
├── pages/                      # Componentes de página
├── components/                 # UI reutilizable
├── services/                   # API y lógica
├── hooks/                      # Custom hooks
├── utils/                      # Funciones auxiliares
└── styles/                     # CSS Modules
```

## 1.3 Estructura de Carpetas - Estándar

### Backend:
```
src/backend/
├── manage.py                      # Entry point Django
├── settings.py                    # Configuración global
├── urls.py                        # Rutas principales
├── wsgi.py                        # WSGI app para producción
│
├── apps/                          # Aplicaciones funcionales
│   ├── usuarios/
│   │   ├── models.py              # Definición de datos
│   │   ├── serializers.py         # Serialización/Validación
│   │   ├── views/                 # ViewSets y APIViews
│   │   │   ├── views_users.py
│   │   │   ├── views_auth.py
│   │   │   └── views_admin.py
│   │   ├── services.py            # Lógica de negocio
│   │   ├── backends.py            # Auth backends
│   │   ├── urls.py                # Rutas locales
│   │   ├── permissions.py         # Permisos custom
│   │   ├── pagination.py          # Paginación custom
│   │   └── tests.py               # Tests de app
│   │
│   ├── productos/                 # Similar estructura
│   ├── ventas/
│   ├── pagos/
│   └── notificaciones/
│
├── services/                      # Servicios transversales
│   ├── email.py                   # Envío de emails
│   ├── storage.py                 # Almacenamiento
│   ├── payment.py                 # Procesamiento pagos
│   └── logging.py                 # Logging centralizado
│
├── middleware/                    # Custom middleware
│   ├── observability.py           # Logging y métricas
│   └── user_middleware.py         # Context de usuario
│
├── views/                         # Vistas globales
│   ├── metrics.py                 # Métricas del sistema
│   └── maps.py                    # Datos geográficos
│
├── templates/                     # Templates (si hay)
├── migrations/                    # Migraciones BD
├── tests/                         # Tests globales
└── fixtures/                      # Datos de prueba
```

### Frontend:
```
src/frontend/
├── src/
│   ├── main.jsx                   # Entry point
│   ├── App.jsx                    # Componente raíz
│   │
│   ├── pages/                     # Componentes página (ruta = componente)
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── NotFound.jsx
│   │
│   ├── components/                # Componentes reutilizables
│   │   ├── admin/
│   │   │   ├── LiveMetricsModal.jsx
│   │   │   └── UserManagement.jsx
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   └── forms/
│   │       ├── LoginForm.jsx
│   │       └── RegisterForm.jsx
│   │
│   ├── services/                  # Lógica API y datos
│   │   ├── api.js                 # Cliente Axios configurado
│   │   ├── authService.js         # Login/Logout
│   │   ├── userService.js         # CRUD usuarios
│   │   └── productService.js      # CRUD productos
│   │
│   ├── context/                   # Context API (State global)
│   │   ├── AuthContext.jsx        # Auth state
│   │   └── AppContext.jsx         # App general state
│   │
│   ├── hooks/                     # Custom hooks
│   │   ├── useAuth.js             # Auth hook
│   │   ├── useFetch.js            # Data fetching
│   │   └── useForm.js             # Form handling
│   │
│   ├── utils/                     # Funciones auxiliares
│   │   ├── validators.js          # Validaciones
│   │   ├── formatters.js          # Formato datos
│   │   └── constants.js           # Constantes
│   │
│   ├── styles/                    # CSS Modules
│   │   ├── globals.css            # Global styles
│   │   ├── variables.css          # CSS variables
│   │   └── components.css         # Estilos específicos
│   │
│   ├── routes/                    # Enrutamiento
│   │   └── App.jsx                # Routes config
│   │
│   └── tests/                     # Tests unitarios
│
├── public/                        # Archivos estáticos
├── tests/                         # Tests E2E (Playwright)
├── vite.config.js
├── eslint.config.js
└── package.json
```

## 1.4 Dependencias entre Módulos

### Backend:

```
┌─────────────────────────────────┐
│      USUARIOS (Core)            │
│  • Autenticación                │
│  • Roles y Permisos             │
│  • Profiles                     │
└────────────┬────────────────────┘
             │ Depende de
             ▼
┌─────────────────────────────────┐
│      PRODUCTOS                  │
│  • Catálogo                     │
│  • Categorías                   │
│  • Inventario                   │
└────────────┬────────────────────┘
             │ Depende de
             ▼
┌─────────────────────────────────┐
│      VENTAS                     │
│  • Órdenes                      │
│  • Items de orden               │
│  • Estados de venta             │
└────────────┬────────────────────┘
             │ Depende de
             ▼
┌─────────────────────────────────┐
│      PAGOS                      │
│  • Transacciones                │
│  • Gateways                     │
│  • Refunds                      │
└────────────┬────────────────────┘
             │ Depende de
             ▼
┌─────────────────────────────────┐
│      NOTIFICACIONES             │
│  • Eventos                      │
│  • Logs                         │
│  • Alerts                       │
└─────────────────────────────────┘

REGLA: Nunca import "hacia arriba" en el gráfico
```

---

# 🔍 PARTE 2: ESTÁNDARES DE CODIFICACIÓN

## 2.1 Backend (Python/Django)

### Estructura de un APIView:

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class UsuarioListView(APIView):
    """
    API endpoint para listar y crear usuarios.
    
    GET: Retorna lista paginada de usuarios
    POST: Crea nuevo usuario (requiere autenticación)
    """
    permission_classes = [IsAuthenticated]  # 1. Permisos
    
    def get(self, request):                 # 2. Método HTTP
        """
        Obtiene lista de usuarios.
        
        Query params:
            - page: Número de página (default: 1)
            - limit: Items por página (default: 10)
        
        Returns:
            {
                "count": int,
                "next": str,
                "previous": str,
                "results": [usuario, ...]
            }
        """
        try:
            # 3. Lógica
            users = Usuario.objects.all()
            paginator = CustomPagination()
            page = paginator.paginate_queryset(users, request)
            
            # 4. Serialización
            serializer = UsuarioSerializer(page, many=True)
            
            # 5. Response
            return paginator.get_paginated_response(serializer.data)
            
        except Exception as e:              # 6. Error handling
            logger.error(f"Error fetching users: {str(e)}")
            return Response(
                {"error": "Error fetching users"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
```

### Estructura de un Serializer:

```python
from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    """
    Serializer para Usuario.
    Valida y transforma datos de entrada/salida.
    """
    
    # 1. Fields adicionales (no en modelo)
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Usuario
        # 2. Campos a incluir/excluir
        fields = [
            'id', 'email', 'nombre_completo', 'roles',
            'estado', 'fecha_creacion', 'full_name'
        ]
        # 3. Campos read-only
        read_only_fields = ['id', 'fecha_creacion']
        # 4. Campos write-only (para POST/PUT)
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    # 5. Validaciones a nivel field
    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value
    
    # 6. Validaciones a nivel objeto
    def validate(self, data):
        if data.get('password') and len(data['password']) < 8:
            raise serializers.ValidationError("Password too short")
        return data
    
    # 7. Métodos personalizados
    def get_full_name(self, obj):
        return obj.get_full_name()
```

### Estructura de un Service (Lógica de Negocio):

```python
from django.db import transaction
import logging

logger = logging.getLogger(__name__)

class UsuarioService:
    """
    Servicio de negocio para Usuario.
    Centraliza lógica de negocio fuera de views.
    """
    
    @staticmethod
    def crear_usuario(email, password, nombre_completo, roles=None):
        """
        Crea nuevo usuario con validaciones de negocio.
        
        Args:
            email: Email único
            password: Password (será hasheado)
            nombre_completo: Nombre
            roles: Lista de roles (default: ['usuario'])
        
        Returns:
            Usuario creado
        
        Raises:
            ValueError: Si email duplicado o datos inválidos
        """
        try:
            # 1. Validaciones
            if Usuario.objects.filter(email=email).exists():
                raise ValueError(f"Email {email} already exists")
            
            if len(password) < 8:
                raise ValueError("Password must be at least 8 chars")
            
            # 2. Transacción (garantiza consistencia)
            with transaction.atomic():
                usuario = Usuario.objects.create_user(
                    email=email,
                    password=password,
                    nombre_completo=nombre_completo,
                    roles=roles or ['usuario']
                )
                
                logger.info(f"Usuario creado: {usuario.id}")
                return usuario
                
        except Exception as e:
            logger.error(f"Error creating usuario: {str(e)}")
            raise
    
    @staticmethod
    @transaction.atomic
    def cambiar_password(usuario, password_actual, password_nuevo):
        """Cambia password con validación."""
        if not usuario.check_password(password_actual):
            raise ValueError("Current password incorrect")
        
        usuario.set_password(password_nuevo)
        usuario.save()
        logger.info(f"Password changed for {usuario.email}")
```

## 2.2 Frontend (JavaScript/React)

### Estructura de un Componente:

```jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import UserService from '../../services/userService';
import LoadingSpinner from '../common/LoadingSpinner';
import styles from './UserList.module.css';

/**
 * Componente: UserList
 * 
 * Propósito: Mostrar tabla de usuarios con paginación y filtros
 * 
 * Props:
 *   - adminOnly (boolean): Si solo mostrar a admins
 * 
 * State:
 *   - users: Array de usuarios
 *   - loading: Boolean de carga
 *   - error: String de error
 *   - currentPage: Número de página
 */
export function UserList({ adminOnly = false }) {
  // 1. Hooks (lógica personalizada)
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // 2. State (dato local)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // 3. Effects (efectos secundarios)
  useEffect(() => {
    // Verifica autenticación
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Carga usuarios
    fetchUsers(currentPage);
  }, [currentPage, isAuthenticated, navigate]);
  
  // 4. Funciones (lógica del componente)
  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      setError(null);
      
      // Llamada API
      const response = await UserService.getUsers({
        page,
        limit: 10,
        admin_only: adminOnly
      });
      
      // Actualizar state
      setUsers(response.data);
      setTotalPages(response.total_pages);
      
    } catch (err) {
      // Manejo de errores
      setError(err.message || 'Error loading users');
      logger.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('¿Estás seguro?')) return;
    
    try {
      await UserService.deleteUser(userId);
      fetchUsers(currentPage); // Recarga lista
    } catch (err) {
      setError(err.message);
    }
  };
  
  // 5. Render condicional (estados)
  if (loading && users.length === 0) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        <button onClick={() => fetchUsers(currentPage)}>
          Reintentar
        </button>
      </div>
    );
  }
  
  // 6. Render principal
  return (
    <div className={styles.container}>
      <h1>Gestión de Usuarios</h1>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.nombre_completo}</td>
              <td>{u.roles?.join(', ')}</td>
              <td>
                <span className={u.estado ? 'active' : 'inactive'}>
                  {u.estado ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>
                <button onClick={() => navigate(`/users/${u.id}`)}>
                  Ver
                </button>
                <button 
                  onClick={() => handleDeleteUser(u.id)}
                  className={styles.danger}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* 7. Controles auxiliares */}
      <div className={styles.pagination}>
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
        >
          Anterior
        </button>
        <span>{currentPage} de {totalPages}</span>
        <button 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default UserList;
```

### Estructura de un Service (API calls):

```javascript
import api from './api'; // Axios instance configurado

class UserService {
  /**
   * Service para operaciones de Usuario
   * Centraliza todas las llamadas API relacionadas
   */
  
  /**
   * Obtiene lista de usuarios con paginación
   * 
   * @param {Object} filters - {page, limit, admin_only, search}
   * @returns {Promise<{data: Array, total_pages: number}>}
   */
  static async getUsers(filters = {}) {
    try {
      const response = await api.get('/usuarios/', {
        params: {
          page: filters.page || 1,
          limit: filters.limit || 10,
          ...filters // Spread otros filtros
        }
      });
      
      return {
        data: response.data.results,
        total_pages: Math.ceil(response.data.count / filters.limit)
      };
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Error fetching users');
    }
  }
  
  /**
   * Obtiene un usuario por ID
   * 
   * @param {number} id - User ID
   * @returns {Promise<Object>} Usuario
   */
  static async getUserById(id) {
    try {
      const response = await api.get(`/usuarios/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error(`User ${id} not found`);
    }
  }
  
  /**
   * Actualiza usuario
   * 
   * @param {number} id - User ID
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} Usuario actualizado
   */
  static async updateUser(id, data) {
    try {
      const response = await api.put(`/usuarios/${id}/`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Error updating user');
    }
  }
  
  /**
   * Elimina usuario (soft delete)
   * 
   * @param {number} id - User ID
   * @returns {Promise<void>}
   */
  static async deleteUser(id) {
    try {
      await api.delete(`/usuarios/${id}/`);
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }
}

export default UserService;
```

---

# 📊 PARTE 3: FLUJO DE TRAZABILIDAD

## 3.1 Trazabilidad de una Petición (End-to-End)

### Escenario: Usuario intenta login

```
┌─────────────────────────────────────────────────────────────┐
│ MOMENTO 1: Frontend - Usuario interactúa                    │
├─────────────────────────────────────────────────────────────┤
│ 1. Usuario escribe email y password en LoginForm.jsx        │
│ 2. onClick handleSubmit()                                   │
│ 3. Validación local: email format, password length         │
│ 4. Si válido → authService.login(email, password)          │
│                                                              │
│ TRAZA: AuthContext.js guarda "loading=true"                │
└─────────────────────────────────────────────────────────────┘
                        ↓ (HTTP POST)
┌─────────────────────────────────────────────────────────────┐
│ MOMENTO 2: Network - Request viaja                          │
├─────────────────────────────────────────────────────────────┤
│ POST /api/auth/login/                                       │
│ Headers: Content-Type: application/json                     │
│ Body: {email, password}                                     │
│                                                              │
│ TRAZA: axios interceptor añade timestamp y request ID       │
└─────────────────────────────────────────────────────────────┘
                        ↓ (Llega a Django)
┌─────────────────────────────────────────────────────────────┐
│ MOMENTO 3: Backend - Django procesa                         │
├─────────────────────────────────────────────────────────────┤
│ 1. urls.py router dirige a LoginView en urls_auth.py       │
│                                                              │
│ 2. Middleware procesa:                                      │
│    - CorsMiddleware: Valida origin                          │
│    - SecurityMiddleware: Headers                            │
│    - SessionMiddleware: Cookies                             │
│                                                              │
│ 3. LoginView.post() ejecuta:                                │
│    - Deserializa JSON → UsuarioLoginSerializer              │
│    - Validación: email format, password length              │
│    - authenticate() → EmailBackend.authenticate()           │
│      • Query: Usuario.objects.get(email=email)              │
│      • check_password(password)                             │
│    - Si OK → generate JWT tokens (access + refresh)         │
│    - Serialize response → UsuarioSerializer                 │
│                                                              │
│ TRAZA: Logger.info("Usuario login exitoso: {email}")        │
│        AuditLog.create(usuario_id, "LOGIN", timestamp)      │
└─────────────────────────────────────────────────────────────┘
                        ↓ (HTTP Response)
┌─────────────────────────────────────────────────────────────┐
│ MOMENTO 4: Network - Response regresa                       │
├─────────────────────────────────────────────────────────────┤
│ 200 OK                                                       │
│ {                                                            │
│   "user": {...},                                            │
│   "access": "eyJhbGc...",                                   │
│   "refresh": "eyJhbGc..."                                   │
│ }                                                            │
│                                                              │
│ TRAZA: Response interceptor mapea status codes              │
└─────────────────────────────────────────────────────────────┘
                        ↓ (Llega a Frontend)
┌─────────────────────────────────────────────────────────────┐
│ MOMENTO 5: Frontend - Estado se actualiza                   │
├─────────────────────────────────────────────────────────────┤
│ 1. authService.login() recibe response                      │
│ 2. localStorage.setItem('access_token', token)              │
│ 3. AuthContext.setUser(userData)                            │
│ 4. AuthContext.setLoading(false)                            │
│ 5. useEffect en LoginForm() detecta isAuthenticated=true    │
│ 6. navigate('/dashboard')                                   │
│ 7. Dashboard.jsx renderiza con datos de usuario             │
│                                                              │
│ TRAZA: Console.log con detalles (dev mode)                  │
│        Toast notificación "Bienvenido {nombre}"             │
└─────────────────────────────────────────────────────────────┘
```

## 3.2 Capas de Rastreabilidad

```
┌────────────────────────────────────────────────────────┐
│ NIVEL 1: APLICACIÓN (Business Logic)                  │
├────────────────────────────────────────────────────────┤
│ - Logs de negocio: "Usuario login", "Producto vendido"│
│ - Eventos importantes: creat, update, delete          │
│ - Errores de negocio: "Email duplicado"               │
│                                                        │
│ Herramientas:                                          │
│ - logging.getLogger(__name__)                         │
│ - logger.info/warning/error                           │
│ - AuditLog model                                       │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ NIVEL 2: INFRAESTRUCTURA (System Behavior)            │
├────────────────────────────────────────────────────────┤
│ - Requests HTTP: método, ruta, parámetros            │
│ - Performance: tiempo respuesta                        │
│ - Errores HTTP: 4xx, 5xx                              │
│ - Database queries: tiempo, registros afectados       │
│                                                        │
│ Herramientas:                                          │
│ - Middleware logging                                   │
│ - Django Debug Toolbar (dev)                          │
│ - Sentry (producción)                                 │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ NIVEL 3: SEGURIDAD (Access Control)                   │
├────────────────────────────────────────────────────────┤
│ - Quién: usuario_id, IP, user-agent                   │
│ - Qué: acción, recurso, resultado                     │
│ - Cuándo: timestamp exacto                            │
│ - Resultado: éxito, fallo, cambio                     │
│                                                        │
│ Herramientas:                                          │
│ - AuditLog model (custom)                             │
│ - user_middleware.py                                   │
│ - JWT token claims                                     │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ NIVEL 4: OBSERVABILIDAD (System Metrics)              │
├────────────────────────────────────────────────────────┤
│ - Uptime: disponibilidad del servicio                 │
│ - Throughput: requests/segundo                        │
│ - Latency: percentiles (p50, p95, p99)                │
│ - Errores: tasa de fallos                             │
│ - Recursos: CPU, memoria, conexiones DB               │
│                                                        │
│ Herramientas:                                          │
│ - /api/admin/metrics/ endpoint                        │
│ - Prometheus (opcional)                                │
│ - Datadog (opcional)                                   │
└────────────────────────────────────────────────────────┘
```

---

# 🔐 PARTE 4: AUDITORÍA Y LOGGING

## 4.1 Sistema de Auditoría (AuditLog Model)

```python
# apps/notificaciones/models.py

class AuditLog(models.Model):
    """
    Registro de auditoría de todas las acciones importantes.
    
    Permite trazabilidad completa: quién, qué, cuándo, dónde.
    """
    
    ACTIONS = [
        ('CREATE', 'Crear'),
        ('UPDATE', 'Actualizar'),
        ('DELETE', 'Eliminar (soft)'),
        ('LOGIN', 'Login'),
        ('LOGOUT', 'Logout'),
        ('DOWNLOAD', 'Descargar'),
        ('EXPORT', 'Exportar'),
    ]
    
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    accion = models.CharField(max_length=20, choices=ACTIONS)
    modelo = models.CharField(max_length=50)  # 'Usuario', 'Producto', etc
    registro_id = models.IntegerField()       # ID del objeto modificado
    cambios = models.JSONField(default=dict)  # Antes/después
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    resultado = models.CharField(
        max_length=10,
        choices=[('SUCCESS', 'Éxito'), ('FAIL', 'Error')],
        default='SUCCESS'
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-fecha_creacion']
        indexes = [
            models.Index(fields=['usuario', 'fecha_creacion']),
            models.Index(fields=['accion', 'modelo']),
        ]
    
    def __str__(self):
        return f"{self.usuario} {self.accion} {self.modelo}#{self.registro_id}"
```

## 4.2 Middleware de Auditoría

```python
# middleware/observability.py

import logging
import json
from datetime import datetime
from apps.notificaciones.models import AuditLog

logger = logging.getLogger(__name__)

class ObservabilityMiddleware:
    """
    Middleware que captura y registra todas las interacciones.
    """
    
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        # ANTES del request
        request.start_time = datetime.now()
        
        # Procesa request
        response = self.get_response(request)
        
        # DESPUÉS del response
        self.log_request(request, response)
        
        return response
    
    def log_request(self, request, response):
        """Registra detalles del request/response."""
        
        # Información básica
        duration = (datetime.now() - request.start_time).total_seconds()
        
        # Datos a loguear
        log_data = {
            'timestamp': datetime.now().isoformat(),
            'method': request.method,
            'path': request.path,
            'status_code': response.status_code,
            'duration_ms': duration * 1000,
            'ip': self.get_client_ip(request),
            'user': request.user.id if request.user.is_authenticated else 'anonymous',
            'user_agent': request.META.get('HTTP_USER_AGENT', ''),
        }
        
        # Log según status code
        if response.status_code >= 500:
            logger.error(json.dumps(log_data))
        elif response.status_code >= 400:
            logger.warning(json.dumps(log_data))
        else:
            logger.info(json.dumps(log_data))
        
        # Si es una acción de negocio, guarda en AuditLog
        if self.is_audit_action(request):
            self.save_audit_log(request, response, log_data)
    
    def is_audit_action(self, request):
        """Determina si es una acción que debe auditarse."""
        audit_methods = ['POST', 'PUT', 'PATCH', 'DELETE']
        audit_paths = ['/api/usuarios/', '/api/productos/', '/api/ventas/']
        
        return (request.method in audit_methods and 
                any(request.path.startswith(p) for p in audit_paths))
    
    def save_audit_log(self, request, response, log_data):
        """Guarda en tabla de auditoría."""
        try:
            action_map = {
                'POST': 'CREATE',
                'PUT': 'UPDATE',
                'PATCH': 'UPDATE',
                'DELETE': 'DELETE',
            }
            
            AuditLog.objects.create(
                usuario=request.user if request.user.is_authenticated else None,
                accion=action_map.get(request.method),
                modelo=self.extract_model(request.path),
                registro_id=self.extract_id(request.path),
                ip_address=self.get_client_ip(request),
                user_agent=request.META.get('HTTP_USER_AGENT', ''),
                resultado='SUCCESS' if response.status_code < 400 else 'FAIL',
            )
        except Exception as e:
            logger.error(f"Error saving audit log: {str(e)}")
    
    def get_client_ip(self, request):
        """Obtiene IP real del cliente."""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0].strip()
        return request.META.get('REMOTE_ADDR')
    
    def extract_model(self, path):
        """Extrae modelo de la URL."""
        # /api/usuarios/ → "Usuario"
        parts = path.strip('/').split('/')
        if len(parts) >= 2:
            return parts[1].capitalize()
        return 'Unknown'
    
    def extract_id(self, path):
        """Extrae ID de la URL."""
        # /api/usuarios/123/ → 123
        parts = path.strip('/').split('/')
        if len(parts) >= 3 and parts[2].isdigit():
            return int(parts[2])
        return 0
```

## 4.3 Logging Centralizado

```python
# settings.py

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    
    'formatters': {
        'json': {
            '()': 'pythonjsonlogger.jsonlogger.JsonFormatter',
            'format': '%(timestamp)s %(level)s %(name)s %(message)s'
        },
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'json',
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'logs/prexcol.log',
            'maxBytes': 10485760,  # 10MB
            'backupCount': 5,
            'formatter': 'json',
        },
        'error_file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'logs/errors.log',
            'maxBytes': 10485760,
            'backupCount': 10,
            'formatter': 'verbose',
            'level': 'ERROR',
        },
    },
    
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'apps': {
            'handlers': ['console', 'file', 'error_file'],
            'level': 'DEBUG' if DEBUG else 'INFO',
            'propagate': False,
        },
    },
}

# Uso en código:
# logger = logging.getLogger(__name__)
# logger.info(f"Usuario {usuario.id} creado")
# logger.warning("Stock bajo para producto {sku}")
# logger.error(f"Error procesando pago: {str(e)}")
```

---

# 📈 PARTE 5: VERSIONAMIENTO Y CONTROL DE CAMBIOS

## 5.1 Convención de Commits

```
Formato: <tipo>(<alcance>): <descripción>

Tipos:
  feat:      Nueva funcionalidad
  fix:       Bug fix
  docs:      Cambios en documentación
  style:     Cambios de formato (no afectan código)
  refactor:  Reorganización de código
  perf:      Mejoras de performance
  test:      Añadir o modificar tests
  chore:     Cambios en config/dependencias

Alcance (opcional):
  usuarios, productos, ventas, pagos, etc.

Descripción:
  - Imperativo, presente ("add" no "added")
  - No capitalizar
  - Sin punto final
  - Máx 50 caracteres

Ejemplo de commits buenos:
  feat(auth): add password reset functionality
  fix(productos): resolve inventory calculation bug
  docs(readme): update installation instructions
  refactor(ventas): extract business logic to service
  perf(api): optimize user query with select_related
  test(usuarios): add tests for email validation

Mensaje largo (opcional):
  Explicación detallada de por qué se hace el cambio.
  Por qué es mejor que la alternativa.
  
  Fixes #123
  Related to #456
```

## 5.2 Release Versioning (Semantic Versioning)

```
PREXCOL utiliza Semantic Versioning: MAJOR.MINOR.PATCH

v0.1.0  → Versión inicial (Early Access)
v1.0.0  → Production Ready
v1.1.0  → Nuevas features compatibles
v1.1.1  → Bug fixes
v2.0.0  → Breaking changes

MAJOR (x.y.z)
  - Cambios incompatibles
  - Database migrations obligatorias
  - Cambios en API contract
  - Actualización requerida

MINOR (x.y.z)
  - Nuevas features compatibles
  - Nuevos endpoints
  - Deprecations anunciadas
  - Actualización opcional

PATCH (x.y.z)
  - Bug fixes
  - Performance improvements
  - Security patches
  - Actualización recomendada

Changelog obligatorio para cada release con:
  - Features nuevas
  - Bugs solucionados
  - Breaking changes
  - Migration instructions
```

## 5.3 Branching Strategy (Git Flow)

```
main (producción)
├── v1.0.0 (tag)
├── v1.1.0 (tag)
└── v1.2.0 (tag)

develop (desarrollo)
├── feature/auth-2fa (rama feature)
├── feature/product-search
├── bugfix/login-error
└── hotfix/critical-security-issue (rama hotfix)

Flujo:
1. feature/* → develop (Pull Request + Code Review)
2. develop → main (Release) + Tag
3. hotfix/* → main + develop (Bug crítico)

Reglas:
  - main siempre deployable
  - develop siempre en estado estable
  - feature from develop, merge back to develop
  - hotfix from main, merge to main y develop
  - Code review antes de merge (minimum 1)
  - Tests deben pasar antes de merge
```

---

# 🔒 PARTE 6: POLÍTICAS DE SEGURIDAD

## 6.1 Autenticación y Autorización

```
AUTENTICACIÓN (Quién eres):
  ├─ Email + Password → JWT Tokens
  ├─ Token Refresh → Renovar acceso sin re-login
  ├─ Logout → Blacklist token en BD
  └─ Custom EmailBackend (no username)

AUTORIZACIÓN (Qué puedes hacer):
  ├─ Roles: admin, vendedor, usuario
  ├─ Permissions: create_user, edit_producto, view_sales
  ├─ Scope: solo datos propios + admin puede ver todo
  └─ Object-level permissions en serializers

JWT Token Claims:
  {
    "user_id": 123,
    "email": "user@example.com",
    "roles": ["usuario"],
    "iat": 1702240000,      # Issued At
    "exp": 1702326400,      # Expires In
    "scope": "api"
  }
```

## 6.2 Validaciones de Seguridad

```python
# settings.py - Production security

# ✅ HTTPS/TLS
SECURE_HSTS_SECONDS = 31536000  # 1 año
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# ✅ CORS
CORS_ALLOWED_ORIGINS = [
    "https://prexcol.onrender.com",
    "https://www.prexcol.onrender.com",
]
CORS_ALLOW_CREDENTIALS = True

# ✅ Content Security
SECURE_CONTENT_SECURITY_POLICY = {
    "default-src": ("'self'",),
    "script-src": ("'self'", "'unsafe-inline'"),
    "style-src": ("'self'", "'unsafe-inline'"),
}

# ✅ Secrets
SECRET_KEY = os.getenv("SECRET_KEY")  # De ENV, nunca hardcoded
DEBUG = False  # NUNCA True en producción

# ✅ Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {'min_length': 8}
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
]
```

## 6.3 OWASP Top 10 Mitigaciones

```
1. Broken Access Control
   ✅ Checks de permisos en cada endpoint
   ✅ Object-level permissions
   ✅ Role-based access (RBAC)

2. Cryptographic Failures
   ✅ HTTPS en producción
   ✅ Passwords hasheados (PBKDF2)
   ✅ Sensitive data no en logs

3. Injection
   ✅ ORM (Django) previene SQL injection
   ✅ Serializer validation previene XXS
   ✅ Parameterized queries siempre

4. Insecure Design
   ✅ Threat modeling en diseño
   ✅ Seguridad by default
   ✅ Rate limiting en endpoints

5. Security Misconfiguration
   ✅ Security checklist en deploy
   ✅ Headers de seguridad
   ✅ Secrets en ENV variables

6. Vulnerable Components
   ✅ pip audit en CI/CD
   ✅ Dependabot alerts
   ✅ Regular updates

7. Authentication Failures
   ✅ JWT con expiry
   ✅ Password reset con token único
   ✅ Session timeout

8. Software Data Integrity Failures
   ✅ Validaciones frontend + backend
   ✅ Checksums en datos críticos
   ✅ Auditoría de cambios

9. Logging & Monitoring Failures
   ✅ Logging centralizado
   ✅ Error tracking (Sentry)
   ✅ Alertas de anomalías

10. SSRF
    ✅ Whitelist de URLs externas
    ✅ Timeout en requests externos
    ✅ No seguir redirects peligrosos
```

---

# ⚡ PARTE 7: PERFORMANCE Y OPTIMIZACIÓN

## 7.1 Optimizaciones Backend

```python
# 1. Database Queries
# ❌ Malo: N+1 queries
for usuario in Usuario.objects.all():
    print(usuario.tienda.nombre)  # Query por cada usuario

# ✅ Bueno: select_related (FK)
usuarios = Usuario.objects.select_related('tienda').all()

# ✅ Bueno: prefetch_related (Reverse FK, M2M)
usuarios = Usuario.objects.prefetch_related('productos').all()

# 2. Pagination
# ✅ Siempre paginar en listas
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    pagination_class = CustomPagination  # default_page_size=10

# 3. Caching
from django.views.decorators.cache import cache_page

@cache_page(60 * 5)  # 5 minutos
def get_categories(request):
    return Response(...)

# 4. Filtering/Searching
from django_filters import FilterSet, CharFilter

class ProductoFilter(FilterSet):
    nombre = CharFilter(field_name='nombre', lookup_expr='icontains')
    
    class Meta:
        model = Producto
        fields = ['categoria', 'precio_min', 'precio_max']

# 5. Indexing
class Producto(models.Model):
    nombre = models.CharField(max_length=200, db_index=True)
    sku = models.CharField(max_length=100, unique=True, db_index=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['categoria', 'precio']),
            models.Index(fields=['tienda', 'activo']),
        ]
```

## 7.2 Optimizaciones Frontend

```jsx
// 1. Code Splitting (Lazy Loading)
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const AdminPanel = lazy(() => import('../pages/AdminPanel'));

export function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Suspense>
  );
}

// 2. Memoization (evita re-renders innecesarios)
const UserCard = React.memo(({ user }) => {
  return <div>{user.name}</div>;
}, (prevProps, nextProps) => prevProps.user.id === nextProps.user.id);

// 3. useCallback (memoiza funciones)
const handleDelete = useCallback((id) => {
  UserService.delete(id);
}, []);  // Dependencies

// 4. Virtual Scrolling (para listas largas)
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={users.length}
  itemSize={50}
>
  {({ index, style }) => (
    <div style={style}>{users[index].name}</div>
  )}
</FixedSizeList>

// 5. Image Optimization
<img 
  src="image.jpg"
  loading="lazy"
  width="300"
  height="200"
/>

// 6. Bundle Analysis
// En package.json
"build:analyze": "vite build --report"
```

## 7.3 Métricas de Performance

```
Core Web Vitals:

LCP (Largest Contentful Paint): < 2.5 segundos
  ↳ Tiempo hasta renderizar contenido principal

FID (First Input Delay): < 100 milisegundos
  ↳ Tiempo respuesta a usuario interaction

CLS (Cumulative Layout Shift): < 0.1
  ↳ Estabilidad visual durante carga

Backend:
  - API response time: < 200ms (p95)
  - Database query time: < 100ms
  - Error rate: < 0.1%
  - Uptime: > 99.9%

Herramientas de medición:
  - Lighthouse (Chrome DevTools)
  - WebPageTest
  - New Relic
  - DataDog
  - Sentry (errors)
```

---

# 📚 RESUMEN EJECUTIVO

## Lineamientos Clave:

1. **Arquitectura:** Clean Architecture con capas bien definidas
2. **Código:** Sigue SOLID, DRY, KISS - legibilidad primero
3. **Testing:** Cobertura mínima 75%, tests E2E obligatorios
4. **Seguridad:** HTTPS, CORS, JWT, validaciones en ambos lados
5. **Performance:** Pagination, caching, lazy loading, indexing
6. **Auditoría:** Logging centralizado, AuditLog de acciones críticas
7. **Versionamiento:** Semantic versioning, Git Flow, commits limpios
8. **Despliegue:** Reproducible en cualquier ambiente, Infrastructure as Code

## Trazabilidad Garantizada:

- **Quién:** User ID en cada acción
- **Qué:** Tipo de acción y modelo afectado
- **Cuándo:** Timestamp exacto
- **Dónde:** IP, user-agent
- **Por qué:** Logs con contexto y cambios (before/after)

---

**Documento elaborado:** 2025-12-10  
**Versión:** 1.0  
**Responsable:** Arquitectura PREXCOL
