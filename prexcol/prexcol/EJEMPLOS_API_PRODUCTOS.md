# API REST - Ejemplos de Solicitudes HTTP para Pruebas

## Primeros Pasos

1. Crear usuarios de prueba:
```bash
python manage.py shell < test_productos.py
```

2. Iniciar el servidor:
```bash
python manage.py runserver
```

---

## 🔐 AUTENTICACIÓN

### Obtener Token JWT

```bash
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@prexcol.com",
    "password": "cliente123"
  }'
```

**Respuesta:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

Usar el token en los headers:
```
Authorization: Bearer {access_token}
```

---

## 🏪 TIENDAS

### Listar todas las tiendas
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/tiendas/
```

### Crear tienda (solo admin)
```bash
curl -X POST http://localhost:8000/api/tiendas/ \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Tienda Nueva",
    "direccion": "Calle Principal 100, Madrid",
    "telefono": "+34 91 123 4567",
    "administrador": 1,
    "activa": true
  }'
```

### Obtener mis tiendas (admin)
```bash
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:8000/api/tiendas/mis_tiendas/
```

### Obtener detalle de tienda
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/tiendas/1/
```

### Actualizar tienda (solo admin)
```bash
curl -X PATCH http://localhost:8000/api/tiendas/1/ \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Tienda Centro Actualizada"
  }'
```

---

## 📦 PRODUCTOS

### Listar productos (sin filtro específico)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/productos/
```

### Listar productos con paginación
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8000/api/productos/?page=1"
```

### Productos por tienda
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8000/api/productos/por_tienda/?tienda_id=1"
```

### Mis productos (proveedor)
```bash
curl -H "Authorization: Bearer PROVEEDOR_TOKEN" \
  http://localhost:8000/api/productos/mis_productos/
```

### Crear producto (solo admin)
```bash
curl -X POST http://localhost:8000/api/productos/ \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "iPhone 15 Pro",
    "descripcion": "Smartphone último modelo de Apple",
    "precio": "1299.99",
    "stock": 20,
    "tienda": 1,
    "proveedor": 2,
    "activo": true
  }'
```

### Obtener detalle de producto
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/productos/1/
```

### Actualizar producto (admin o proveedor propietario)
```bash
curl -X PATCH http://localhost:8000/api/productos/1/ \
  -H "Authorization: Bearer PROVEEDOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "precio": "1399.99",
    "stock": 18
  }'
```

### Ajustar stock de producto (admin o proveedor)
```bash
curl -X POST http://localhost:8000/api/productos/1/ajustar_stock/ \
  -H "Authorization: Bearer PROVEEDOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cantidad": 5,
    "operacion": "aumentar"
  }'
```

Operaciones permitidas:
- `"aumentar"` - Aumenta el stock
- `"reducir"` - Reduce el stock

---

## 🛒 PEDIDOS

### Listar mis pedidos (cliente)
```bash
curl -H "Authorization: Bearer CLIENTE_TOKEN" \
  http://localhost:8000/api/pedidos/mis_pedidos/
```

### Listar pedidos pendientes (comprador)
```bash
curl -H "Authorization: Bearer COMPRADOR_TOKEN" \
  http://localhost:8000/api/pedidos/pendientes/
```

### Listar pedidos en preparación (logística)
```bash
curl -H "Authorization: Bearer LOGISTICA_TOKEN" \
  http://localhost:8000/api/pedidos/en_preparacion/
```

### Listar todos los pedidos (admin)
```bash
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:8000/api/pedidos/
```

### Crear pedido (cliente)
```bash
curl -X POST http://localhost:8000/api/pedidos/crear_pedido/ \
  -H "Authorization: Bearer CLIENTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tienda_id": 1,
    "detalles": [
      {
        "producto": 1,
        "cantidad": 2
      },
      {
        "producto": 3,
        "cantidad": 1
      }
    ],
    "notas": "Entrega rápida por favor"
  }'
```

**Respuesta:**
```json
{
  "id": 1,
  "cliente": 5,
  "cliente_info": {
    "id": 5,
    "nombre": "Juan Cliente",
    "email": "cliente@prexcol.com",
    "telefono": "+34 600 000 003"
  },
  "tienda": 1,
  "tienda_nombre": "Tienda Centro",
  "estado": "pendiente",
  "total": "2599.96",
  "detalles": [
    {
      "id": 1,
      "pedido": 1,
      "producto": 1,
      "producto_nombre": "Laptop Dell",
      "cantidad": 2,
      "precio_unitario": "1299.99",
      "subtotal": "2599.98"
    },
    ...
  ],
  "notas": "Entrega rápida por favor",
  "fecha_creacion": "2024-01-15T10:30:00Z",
  "fecha_actualizacion": "2024-01-15T10:30:00Z"
}
```

### Obtener detalle de pedido
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/pedidos/1/
```

### Cambiar estado de pedido (comprador: preparando)
```bash
curl -X POST http://localhost:8000/api/pedidos/1/cambiar_estado/ \
  -H "Authorization: Bearer COMPRADOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "preparando"
  }'
```

### Cambiar estado de pedido (logística: en_transito)
```bash
curl -X POST http://localhost:8000/api/pedidos/1/cambiar_estado/ \
  -H "Authorization: Bearer LOGISTICA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "en_transito"
  }'
```

### Cambiar estado de pedido (logística: entregado)
```bash
curl -X POST http://localhost:8000/api/pedidos/1/cambiar_estado/ \
  -H "Authorization: Bearer LOGISTICA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "entregado"
  }'
```

### Cancelar pedido (admin)
```bash
curl -X POST http://localhost:8000/api/pedidos/1/cambiar_estado/ \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "cancelado"
  }'
```

---

## 📋 DETALLES DE PEDIDO

### Listar todos los detalles
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/detalles-pedido/
```

### Detalles de un pedido específico
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8000/api/detalles-pedido/por_pedido/?pedido_id=1"
```

### Obtener detalle específico
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/detalles-pedido/1/
```

---

## ⚠️ CÓDIGOS DE ERROR

| Código | Significado | Ejemplo |
|--------|-------------|---------|
| 200 | OK - Solicitud exitosa | GET exitoso |
| 201 | Created - Recurso creado | POST de producto exitoso |
| 400 | Bad Request - Datos inválidos | Stock insuficiente |
| 401 | Unauthorized - Sin autenticación | Token no proporcionado |
| 403 | Forbidden - Sin permiso | Proveedor editando producto ajeno |
| 404 | Not Found - Recurso no existe | Pedido no encontrado |
| 405 | Method Not Allowed | Usar crear_pedido/ en lugar de create |
| 500 | Internal Server Error | Error del servidor |

---

## 🧪 FLUJO COMPLETO DE PRUEBA

### 1. Obtener token de cliente
```bash
TOKEN=$(curl -s -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"email":"cliente@prexcol.com","password":"cliente123"}' \
  | grep -o '"access":"[^"]*' | cut -d'"' -f4)
echo $TOKEN
```

### 2. Listar productos
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/productos/
```

### 3. Crear un pedido
```bash
curl -X POST http://localhost:8000/api/pedidos/crear_pedido/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tienda_id": 1,
    "detalles": [{"producto": 1, "cantidad": 1}]
  }'
```

### 4. Obtener token de comprador
```bash
TOKEN_COMPRADOR=$(curl -s -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"email":"comprador@prexcol.com","password":"comprador123"}' \
  | grep -o '"access":"[^"]*' | cut -d'"' -f4)
```

### 5. Cambiar estado a "preparando"
```bash
curl -X POST http://localhost:8000/api/pedidos/1/cambiar_estado/ \
  -H "Authorization: Bearer $TOKEN_COMPRADOR" \
  -H "Content-Type: application/json" \
  -d '{"estado": "preparando"}'
```

---

## 📚 Recursos Útiles

- **Documentation**: `/PRODUCTOS_DOCUMENTACION.md`
- **Test Data**: `python manage.py shell < test_productos.py`
- **Admin Panel**: http://localhost:8000/admin/
- **API Browsable**: http://localhost:8000/api/

---

**Nota:** Reemplaza `localhost:8000` con tu URL real en producción.
