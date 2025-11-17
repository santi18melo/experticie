# Correcciones del Backend - API REST

## Cambios Realizados

### 1. **Instalación de Dependencias**
- ✅ `djangorestframework-simplejwt` - Para autenticación JWT
- ✅ `django-cors-headers` - Para permitir requests desde el frontend

### 2. **Configuración en `backend/settings.py`**

#### Agregado a INSTALLED_APPS:
```python
'rest_framework_simplejwt',
```

#### Configuración JWT:
```python
from datetime import timedelta

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
}
```

### 3. **Mejoras en `usuarios/serializers.py`**

**Problema:** El campo `password` no estaba siendo procesado correctamente y no se hasheaba.

**Solución:**
- Agregado campo `password` con `write_only=True`
- Implementado método `create()` personalizado que:
  - Extrae la contraseña del data validado
  - Usa `set_password()` para hashear la contraseña
  - Guarda el usuario correctamente

```python
class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = Usuario(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user
```

### 4. **Correcciones en `usuarios/views.py`**

#### Dashboard Admin:
- ✅ Agregado decorador `IsAdmin` a las permisos
- ✅ Cambio en la estructura de respuesta para que coincida con lo esperado en el frontend
- ✅ Agregadas estadísticas reales:

```python
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def dashboard_admin(request):
    from django.db.models import Count
    estadisticas = {
        "total_usuarios": Usuario.objects.count(),
        "usuarios_activos": Usuario.objects.filter(estado=True).count(),
        "rol_distribution": dict(
            Usuario.objects.values('rol').annotate(count=Count('id')).values_list('rol', 'count')
        )
    }
    return Response({
        "message": "Bienvenido al panel de administrador",
        "estadisticas": estadisticas
    })
```

#### Tienda Cliente:
- ✅ Permite acceso a usuarios con rol 'cliente' o 'comprador'
- ✅ Retorna información del usuario autenticado

### 5. **Migraciones de BD**

Se ejecutaron los siguientes comandos:
```bash
python manage.py makemigrations usuarios
python manage.py migrate
```

Se creó un usuario admin de prueba:
- **Email:** admin@example.com
- **Contraseña:** admin123

### 6. **Rutas de API**

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register/` | Registrar nuevo usuario | ❌ |
| POST | `/api/auth/login/` | Obtener token JWT | ❌ |
| POST | `/api/auth/refresh/` | Refrescar token | ❌ |
| GET | `/api/dashboard/admin/` | Dashboard admin con estadísticas | ✅ (Admin) |
| GET | `/api/cliente/tienda/` | Información de tienda cliente | ✅ (Cliente/Comprador) |
| GET | `/api/usuarios/` | Listar usuarios | ✅ (Admin) |

## Cómo Probar

### 1. Iniciar el servidor Django:
```bash
python manage.py runserver
```

### 2. Usar el script de prueba:
```bash
python test_api.py
```

### 3. O usar curl/Postman:

**Registrar usuario:**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","nombre":"Usuario","password":"pass123","rol":"cliente"}'
```

**Login:**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

**Acceder a Dashboard (reemplazar TOKEN con el token obtenido):**
```bash
curl -H "Authorization: Bearer TOKEN" \
  http://127.0.0.1:8000/api/dashboard/admin/
```

## Próximos Pasos

- [ ] Agregar más validaciones en los serializers
- [ ] Implementar refresh token mechanism
- [ ] Agregar manejo de errores mejorado
- [ ] Integrar con más apps (pedidos, productos, ventas)
- [ ] Implementar paginación en listados
