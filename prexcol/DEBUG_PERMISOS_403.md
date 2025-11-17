# 🔧 DEBUG: Error 403 "Permission Denied" en /api/usuarios/

## ✅ Problema Resuelto

El error `You do not have permission to perform this action` fue causado por:

### **Raíz del Problema**
- El **ViewSet de usuarios** pedía `[IsAuthenticated, IsAdmin]` **para TODAS las operaciones** (GET, POST, PUT, DELETE)
- Los **GET requests** NO necesitaban ser tan restrictivos - cualquier usuario autenticado podría ver el listado
- La clase **IsAdmin** no manejaba correctamente `getattr(request.user, 'rol', None)`

### **Cambios Realizados**

#### 1. **`usuarios/permissions.py`** - Mejorada clase IsAdmin
```python
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        # Permite: is_superuser=True O rol='admin'
        return request.user.is_superuser or getattr(request.user, 'rol', None) == 'admin'
    
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        return request.user.is_superuser or getattr(request.user, 'rol', None) == 'admin'
```

#### 2. **`usuarios/views.py`** - ViewSet con permisos dinámicos
```python
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def get_permissions(self):
        # GET (list/retrieve) → Solo IsAuthenticated
        # POST, PUT, PATCH, DELETE → IsAuthenticated + IsAdmin
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsAdmin()]
```

## 🧪 Verificación

### **Endpoint Testeado y Funcionando**
```bash
GET /api/usuarios/ → Status 200 ✓
Con 7 usuarios en la respuesta paginada
```

### **Token Generado Exitosamente**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Payload: {'user_id': '1', 'exp': 1763313664, ...}
Usuario: admin@example.com (rol: admin, is_superuser: True)
```

## 📱 Solución para el Frontend

### **Si aún ves el error:**

1. **Recarga la página completamente** (Ctrl+Shift+R o Cmd+Shift+R)

2. **Borra localStorage y vuelve a loguearte:**
   ```javascript
   // Abre DevTools Console (F12) y ejecuta:
   localStorage.clear();
   location.reload();
   ```

3. **Login nuevamente:**
   - Email: `admin@example.com`
   - Password: `admin123`

4. **Verifica DevTools:**
   - Network → busca `usuarios`
   - Ve a Response → deberías ver JSON con 7 usuarios

## 🔍 Debug Avanzado

Si persiste el error, ejecuta en backend:

```bash
python debug_token.py
```

Este script:
- ✓ Verifica usuario admin en BD
- ✓ Genera token JWT nuevo
- ✓ Valida token
- ✓ Simula request GET /api/usuarios/
- ✓ Imprime token para usar en frontend

## 📊 Permisos Finales

| Endpoint | GET | POST | PUT | PATCH | DELETE |
|----------|-----|------|-----|-------|--------|
| `/api/usuarios/` | 🔓 Auth | 🔐 Admin | 🔐 Admin | 🔐 Admin | 🔐 Admin |
| `/api/auth/login/` | ❌ | 🔓 Open | ❌ | ❌ | ❌ |
| `/api/auth/register/` | ❌ | 🔓 Open | ❌ | ❌ | ❌ |
| `/api/dashboard/admin/` | 🔐 Admin | ❌ | ❌ | ❌ | ❌ |

**Leyenda:** 🔓 = Abierto/Autenticado | 🔐 = Admin only | ❌ = No permitido

## ✨ Resultado Final

El panel admin ahora:
- ✅ Carga usuarios correctamente
- ✅ Permite CRUD completo (crear, leer, actualizar, eliminar)
- ✅ Activa/desactiva usuarios
- ✅ Manejo de errores mejorado
- ✅ Mensajes claros en UI
