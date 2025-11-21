# APP PRODUCTOS - Documentación Completa

## Descripción General

La app `productos` es un sistema de gestión de tiendas minoristas que se integra con la app `usuarios`. Permite gestionar:
- **Tiendas**: Negocios minoristas con administrador asignado
- **Productos**: Catálogo de productos por tienda con proveedor asignado
- **Pedidos**: Órdenes de compra de clientes con seguimiento de estado
- **Detalles de Pedido**: Items específicos en cada pedido con precios y cantidades

## Características Principales

### Control de Acceso por Rol

La app integra permisos basados en roles de la app `usuarios`:

| Rol | Permisos |
|-----|----------|
| **admin** | CRUD completo en todos los modelos, ajuste de inventario |
| **cliente** | Ver catálogo, crear pedidos, ver sus pedidos |
| **proveedor** | Ver sus productos asignados, actualizar stock |
| **comprador** | Ver pedidos pendientes, marcar como "preparando" |
| **logística** | Ver pedidos en preparación, marcar como "en tránsito" o "entregado" |

### Gestión de Inventario

- Stock se actualiza automáticamente al crear pedidos
- Los proveedores pueden ajustar stock mediante endpoint dedicado
- Stock se restaura si un pedido es cancelado

### Flujo de Estados de Pedidos

```
pendiente → preparando → en_transito → entregado
     ↓
  cancelado
```

- **Comprador**: Cambia de `pendiente` → `preparando`
- **Logística**: Cambia de `preparando` → `en_transito` → `entregado`
- **Admin**: Puede cambiar a cualquier estado

## Modelos de Datos

### 1. Tienda
```python
{
    "id": int,
    "nombre": string,
    "direccion": string,
    "telefono": string (opcional),
    "administrador": int (FK Usuario con rol admin),
    "activa": boolean,
    "fecha_creacion": datetime,
    "fecha_actualizacion": datetime
}
```

### 2. Producto
```python
{
    "id": int,
    "nombre": string,
    "descripcion": string,
    "precio": decimal,
    "stock": int,
    "tienda": int (FK Tienda),
    "proveedor": int (FK Usuario con rol proveedor),
    "activo": boolean,
    "fecha_creacion": datetime,
    "fecha_actualizacion": datetime
}
```

### 3. Pedido
```python
{
    "id": int,
    "cliente": int (FK Usuario con rol cliente),
    "tienda": int (FK Tienda),
    "estado": string (pendiente|preparando|en_transito|entregado|cancelado),
    "total": decimal,
    "detalles": [DetallePedido],
    "notas": string (opcional),
    "fecha_creacion": datetime,
    "fecha_actualizacion": datetime
}
```

### 4. DetallePedido
```python
{
    "id": int,
    "pedido": int (FK Pedido),
    "producto": int (FK Producto),
    "cantidad": int,
    "precio_unitario": decimal,
    "subtotal": decimal (calculado: cantidad × precio_unitario)
}
```

## API REST Endpoints

### TIENDAS

```bash
# Listar tiendas (autenticado)
GET /api/tiendas/

# Crear tienda (admin)
POST /api/tiendas/
Content-Type: application/json
{
    "nombre": "Mi Tienda",
    "direccion": "Calle 123",
    "telefono": "123456789",
    "administrador": 1,
    "activa": true
}

# Obtener detalle de tienda
GET /api/tiendas/{id}/

# Actualizar tienda (admin)
PUT /api/tiendas/{id}/
PATCH /api/tiendas/{id}/

# Eliminar tienda (admin)
DELETE /api/tiendas/{id}/

# Mis tiendas (admin)
GET /api/tiendas/mis_tiendas/
```

### PRODUCTOS

```bash
# Listar productos (filtrado por rol)
GET /api/productos/

# Crear producto (admin)
POST /api/productos/
Content-Type: application/json
{
    "nombre": "Laptop",
    "descripcion": "Laptop de 15 pulgadas",
    "precio": "999.99",
    "stock": 10,
    "tienda": 1,
    "proveedor": 2,
    "activo": true
}

# Obtener detalle de producto
GET /api/productos/{id}/

# Actualizar producto (admin o proveedor propietario)
PUT /api/productos/{id}/
PATCH /api/productos/{id}/

# Eliminar producto (admin)
DELETE /api/productos/{id}/

# Productos por tienda
GET /api/productos/por_tienda/?tienda_id=1

# Mis productos (proveedor)
GET /api/productos/mis_productos/

# Ajustar stock (admin o proveedor propietario)
POST /api/productos/{id}/ajustar_stock/
Content-Type: application/json
{
    "cantidad": 5,
    "operacion": "aumentar"  # o "reducir"
}

# Respuesta
{
    "mensaje": "Stock aumentado a 15",
    "nuevo_stock": 15,
    "producto_id": 1
}
```

### PEDIDOS

```bash
# Listar pedidos (filtrado por rol)
GET /api/pedidos/

# Crear pedido (cliente)
POST /api/pedidos/crear_pedido/
Content-Type: application/json
{
    "tienda_id": 1,
    "detalles": [
        {"producto": 1, "cantidad": 2},
        {"producto": 3, "cantidad": 1}
    ],
    "notas": "Envio express"
}

# Respuesta
{
    "id": 1,
    "cliente": 5,
    "tienda": 1,
    "estado": "pendiente",
    "total": "2998.97",
    "detalles": [
        {
            "id": 1,
            "producto": 1,
            "producto_nombre": "Laptop",
            "cantidad": 2,
            "precio_unitario": "999.99",
            "subtotal": "1999.98"
        },
        ...
    ],
    "fecha_creacion": "2024-01-15T10:30:00Z"
}

# Obtener detalle de pedido
GET /api/pedidos/{id}/

# Cambiar estado (admin, comprador, logística)
POST /api/pedidos/{id}/cambiar_estado/
Content-Type: application/json
{
    "estado": "preparando"  # o "en_transito", "entregado", "cancelado"
}

# Respuesta
{
    "mensaje": "Pedido actualizado a estado: preparando",
    "pedido": { ... }
}

# Mis pedidos (cliente)
GET /api/pedidos/mis_pedidos/

# Pedidos pendientes (comprador)
GET /api/pedidos/pendientes/

# Pedidos en preparación (logística)
GET /api/pedidos/en_preparacion/

# Cancelar/eliminar pedido (admin)
DELETE /api/pedidos/{id}/
```

### DETALLES DE PEDIDO

```bash
# Listar detalles (filtrado por rol)
GET /api/detalles-pedido/

# Obtener detalle específico
GET /api/detalles-pedido/{id}/

# Detalles de un pedido
GET /api/detalles-pedido/por_pedido/?pedido_id=1
```

## Ejemplos de Uso Frontend

### React - Crear Pedido

```javascript
const crearPedido = async (tiendaId, productos) => {
    const response = await fetch('/api/pedidos/crear_pedido/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            tienda_id: tiendaId,
            detalles: productos.map(p => ({
                producto: p.id,
                cantidad: p.cantidad
            })),
            notas: 'Mi primer pedido'
        })
    });
    return response.json();
};
```

### Vue - Cambiar Estado de Pedido

```javascript
const cambiarEstadoPedido = async (pedidoId, nuevoEstado) => {
    const response = await fetch(`/api/pedidos/${pedidoId}/cambiar_estado/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            estado: nuevoEstado  // "preparando", "en_transito", "entregado"
        })
    });
    return response.json();
};
```

## Validaciones y Reglas de Negocio

### Creación de Pedidos
- Cliente debe estar autenticado con rol "cliente"
- La tienda debe existir y estar activa
- Los productos deben pertenecer a la tienda especificada
- Debe haber stock suficiente para cada producto
- Se reduce automáticamente el stock al crear el pedido

### Cambio de Estados
- Solo transiciones válidas permitidas
- Comprador solo puede cambiar a "preparando"
- Logística solo puede cambiar a "en_transito" o "entregado"
- Admin puede cambiar a cualquier estado
- Si se cancela, se restaura el stock

### Actualización de Productos
- Admin puede editar cualquier producto
- Proveedor solo puede editar sus propios productos
- Stock no puede ser negativo
- Precio debe ser positivo

## Permisos Personalizados

Archivo: `productos/permissions.py`

- `IsAdmin`: Solo rol admin o superuser
- `IsCliente`: Solo rol cliente
- `IsProveedor`: Solo rol proveedor
- `IsComprador`: Solo rol comprador
- `IsLogistica`: Solo rol logística
- `IsProductoOwnerOrAdmin`: Proveedor propietario o admin
- `IsPedidoOwnerOrAdmin`: Cliente propietario o admin

## Integración con App Usuarios

- Todos los modelos usan FK a `usuarios.Usuario`
- Se respetan los roles definidos en la app usuarios
- Las restricciones de rol se aplican en vistas y permisos
- Los usuarios deben estar autenticados con JWT

## Configuración Requerida

En `backend/settings.py`:

```python
INSTALLED_APPS = [
    ...
    'productos',
]

# Ya está configurado JWT
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}
```

## Administración

Todos los modelos están registrados en Django Admin:
- `/admin/productos/tienda/`
- `/admin/productos/producto/`
- `/admin/productos/pedido/`
- `/admin/productos/detallepedido/`

**Acciones disponibles:**
- Marcar productos como activos/inactivos
- Cambiar estado de pedidos (preparando, en_transito, entregado)
- Edición inline de detalles de pedido

## Índices de Base de Datos

Se han creado índices para optimizar consultas:
- `tienda_id + activo` en Producto
- `proveedor_id + activo` en Producto
- `cliente_id + estado` en Pedido
- `tienda_id + estado` en Pedido
- `estado + -fecha_creacion` en Pedido

## Manejo de Errores

La API retorna códigos HTTP estándar:

```
200 OK - Éxito
201 Created - Recurso creado
400 Bad Request - Datos inválidos
403 Forbidden - Sin permisos
404 Not Found - Recurso no existe
405 Method Not Allowed - Método no permitido
500 Internal Server Error - Error del servidor
```

## Testing

Ejemplo de test:

```python
from django.test import TestCase
from rest_framework.test import APIClient
from usuarios.models import Usuario
from productos.models import Tienda, Producto

class ProductoTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Usuario.objects.create_user(
            email='test@test.com',
            nombre='Test User',
            rol='admin'
        )
        self.client.force_authenticate(user=self.user)

    def test_crear_producto(self):
        tienda = Tienda.objects.create(
            nombre='Tienda Test',
            administrador=self.user
        )
        response = self.client.post('/api/productos/', {
            'nombre': 'Producto Test',
            'descripcion': 'Descripción',
            'precio': 99.99,
            'stock': 10,
            'tienda': tienda.id,
            'proveedor': self.user.id
        })
        self.assertEqual(response.status_code, 201)
```

## Notas Importantes

1. **Stock automático**: El stock se reduce al crear pedidos y se restaura si se cancela
2. **Transacciones**: Las creaciones de pedidos usan `transaction.atomic()` para integridad
3. **Filtrado por rol**: Cada vista filtra automáticamente según el rol del usuario
4. **Auditoría**: Todos los modelos tienen `fecha_creacion` y `fecha_actualizacion`
5. **Soft delete**: Los productos tienen campo `activo` para desactivar sin eliminar

---

**Versión**: 1.0  
**Última actualización**: 2024-11-16
