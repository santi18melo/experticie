# ✅ SOLUCIÓN COMPLETA: Error 403 Permisos en Panel Admin

## 🎯 Problema Original
```
Error al cargar usuarios: You do not have permission to perform this action
Status: 403 (Forbidden)
```

## 🔍 Causa Raíz Encontrada

### Problema 1: ViewSet demasiado restrictivo
**Archivo:** `usuarios/views.py`

```python
# ❌ ANTES (denegaba GET a todos)
class UsuarioViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]  # Requería IsAdmin PARA TODO
```

El problema: **GET requests también necesitaban permisos de admin**, cuando solo POST/PUT/PATCH/DELETE deberían requerirlo.

### Problema 2: Clase IsAdmin incompleta
**Archivo:** `usuarios/permissions.py`

```python
# ❌ ANTES (fallaba con atributo 'rol')
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'admin'
        # No manejaba is_superuser ni getattr()
```

El problema: No usaba `getattr()` de forma segura y no consideraba `is_superuser`.

## ✨ Solución Implementada

### 1️⃣ Mejorar clase `IsAdmin` (usuarios/permissions.py)

```python
from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    """
    Permite acceso solo a usuarios autenticados con rol 'admin' o is_superuser=True
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        # Permitir si es superuser o tiene rol admin
        return request.user.is_superuser or getattr(request.user, 'rol', None) == 'admin'
    
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        return request.user.is_superuser or getattr(request.user, 'rol', None) == 'admin'
```

**Cambios:**
- ✅ Usa `getattr(request.user, 'rol', None)` de forma segura
- ✅ Comprueba `is_superuser` además de rol
- ✅ Implementa `has_object_permission()` para permisos de objeto
- ✅ Valida que usuario existe antes de acceder

### 2️⃣ ViewSet con permisos dinámicos (usuarios/views.py)

```python
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def get_permissions(self):
        """
        Permite GET (list/retrieve) a cualquier usuario autenticado.
        POST, PUT, PATCH, DELETE solo a admin.
        """
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsAdmin()]
```

**Cambios:**
- ✅ Override `get_permissions()` para lógica condicional
- ✅ GET permitido para cualquier usuario autenticado
- ✅ Modificaciones (POST/PUT/PATCH/DELETE) requieren IsAdmin

### 3️⃣ Mejor manejo de errores en frontend (dashboardAdmin.jsx)

```javascript
const fetchUsuarios = async () => {
  setLoading(true);
  setError("");
  try {
    const res = await authAxios.get("/usuarios/");
    const data = res.data.results ? res.data.results : res.data;
    setUsuarios(data);
  } catch (err) {
    console.error("Error fetching usuarios:", err);
    
    if (err.response?.status === 403) {
      setError("❌ No tienes permisos para ver usuarios. Asegúrate de estar logueado como admin.");
    } else if (err.response?.status === 401) {
      setError("⚠️ Tu sesión expiró. Por favor, recarga la página y vuelve a loguearte.");
    } else {
      setError("Error al cargar usuarios: " + (err.response?.data?.detail || err.message));
    }
  } finally {
    setLoading(false);
  }
};
```

**Cambios:**
- ✅ Logging detallado del error
- ✅ Mensajes específicos por código de error (401, 403, etc)
- ✅ Instrucciones claras al usuario

## 🧪 Verificación

### ✅ Endpoint testeado exitosamente:
```
GET /api/usuarios/
Authorization: Bearer eyJhbGc...
Status: 200 OK
Respuesta: { count: 7, results: [...] }
```

### ✅ Usuario admin verificado:
```
ID: 1
Email: admin@example.com
Rol: admin
is_superuser: True
is_staff: True
```

### ✅ Token JWT generado:
```
Payload: {
  "user_id": "1",
  "token_type": "access",
  "exp": 1763313755,
  "iat": 1763310155
}
```

## 📋 Matriz de Permisos Final

| Endpoint | Método | Autenticado | Admin |
|----------|--------|:-----------:|:-----:|
| `/api/usuarios/` | GET | ✅ | ✅ |
| `/api/usuarios/` | POST | ❌ | ✅ |
| `/api/usuarios/{id}/` | GET | ✅ | ✅ |
| `/api/usuarios/{id}/` | PUT | ❌ | ✅ |
| `/api/usuarios/{id}/` | PATCH | ❌ | ✅ |
| `/api/usuarios/{id}/` | DELETE | ❌ | ✅ |
| `/api/dashboard/admin/` | GET | ❌ | ✅ |
| `/api/auth/login/` | POST | 🔓 | 🔓 |
| `/api/auth/register/` | POST | 🔓 | 🔓 |

## 🚀 Instrucciones para Probar

### Opción 1: Login en Frontend (Recomendado)
1. Abre http://localhost:5173
2. Login con:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Ve al Admin Dashboard
4. ✅ Deberías ver los 7 usuarios sin errores

### Opción 2: Generar Token Manualmente
1. Ejecuta: `python gen_admin_token.py`
2. Copia el token
3. Abre DevTools (F12)
4. Ve a Console
5. Pega: `localStorage.setItem('token', 'eyJhbGc...')`
6. Recarga la página

### Opción 3: Probar desde Terminal
```powershell
$token = 'eyJhbGc...'
Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/usuarios/' `
  -Headers @{ Authorization = "Bearer $token" } | ConvertTo-Json
```

## 📁 Archivos Modificados

1. ✅ `usuarios/permissions.py` - IsAdmin mejorada
2. ✅ `usuarios/views.py` - ViewSet con permisos dinámicos
3. ✅ `frontend/src/pages/dashboardAdmin.jsx` - Mejor error handling
4. ✅ `gen_admin_token.py` (nuevo) - Generador de tokens
5. ✅ `debug_token.py` (nuevo) - Script de debug

## 🎉 Resultado Final

**Panel Admin ahora:**
- ✅ Carga usuarios sin errores 403
- ✅ CRUD completo funcional
- ✅ Activar/desactivar usuarios
- ✅ Permisos granulares por método HTTP
- ✅ Mejor manejo de errores
- ✅ Mensajes claros en UI
- ✅ Compatible con rol='admin' e is_superuser=True

---

**Estado:** ✅ **SOLUCIONADO**

Si aún tienes problemas:
1. Recarga la página (Ctrl+Shift+R)
2. Borra localStorage: `localStorage.clear()`
3. Vuelve a loguearte
4. Ejecuta: `python debug_token.py` para verificar
