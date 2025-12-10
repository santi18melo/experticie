# 📐 DIAGRAMA DE CLASES - PREXCOL

**Proyecto**: PREXCOL  
**Fecha**: 2025-12-04  
**Tipo**: Diagrama Estructural - Modelo de Dominio

---

## 📋 MODELO DE DOMINIO COMPLETO

### Diagrama de Clases Principal

![Diagrama de Clases Visual](imagenes/01_diagrama_clases.png)

```mermaid
classDiagram
    class Usuario {
        +Long id
        +String email
        +String nombre
        +String rol
        +String telefono
        +String direccion
        +Boolean estado
        +ImageField imagen
        +DateTime fecha_creacion
       + DateTime ultimo_ingreso
        +DateTime last_activity
        +Boolean is_staff
        +Boolean self_deactivated
        +Boolean admin_suspended
        +String suspension_reason
        +DateTime suspension_date
        +set_password(raw_password)
        +save()
    }

    class PasswordHistory {
        +Long id
        +Long id_usuario
        +String password_hash
        +DateTime fecha_creacion
    }

    class Tienda {
        +Long id
        +Long id_administrador
        +String nombre
        +String direccion
        +String telefono
        +Boolean activa
        +DateTime fecha_creacion
        +DateTime fecha_actualizacion
    }

    class Producto {
        +Long id
        +Long id_tienda
        +Long id_proveedor
        +String nombre
        +String descripcion
        +Decimal precio
        +Integer stock
        +Boolean es_basico
        +String categoria
        +ImageField imagen1
        +ImageField imagen2
        +ImageField imagen3
        +String caracteristicas
        +Boolean activo
        +DateTime fecha_creacion
        +DateTime fecha_actualizacion
        +reducir_stock(cantidad)
        +aumentar_stock(cantidad)
    }

    class StockConfig {
        +Long id
        +Long id_producto
        +Integer stock_minimo
        +Integer cantidad_recarga
        +Boolean recarga_automatica_activa
        +DateTime ultima_recarga
        +Integer total_recargas
        +DateTime fecha_creacion
        +DateTime fecha_actualizacion
        +necesita_recarga()
        +ejecutar_recarga()
    }

    class HistorialRecarga {
        +Long id
        +Long id_producto
        +Long id_usuario_ejecutor
        +Integer cantidad
        +Integer stock_anterior
        +Integer stock_nuevo
        +String tipo
        +String notas
        +DateTime fecha_creacion
    }

    class Pedido {
        +Long id
        +Long id_cliente
        +Long id_tienda
        +String estado
        +Decimal total
        +DateTime fecha_creacion
        +DateTime fecha_actualizacion
        +String notas
        +calcular_total()
        +puede_cambiar_a_preparando()
        +puede_cambiar_a_en_transito()
        +puede_cambiar_a_entregado()
    }

    class DetallePedido {
        +Long id
        +Long id_pedido
        +Long id_producto
        +Integer cantidad
        +Decimal precio_unitario
        +subtotal()
        +save()
        +delete()
    }

    class Venta {
        +Long id
        +Long id_pedido
        +Long id_cliente
        +Decimal total
        +DateTime fecha_venta
        +Integer cantidad_items
    }

    class DetalleVenta {
        +Long id
        +Long id_venta
        +Long id_producto
        +Integer cantidad
        +Decimal precio_unitario
        +Decimal subtotal
    }

    class Pago {
        +Long id
        +Long id_usuario
        +Long id_pedido
        +Long id_estado_pago
        +Long id_metodo_pago
        +Decimal monto
        +FileField comprobante
        +DateTime fecha_creacion
        +DateTime fecha_actualizacion
    }

    class Transaccion {
        +Long id
        +Long id_pago
        +String referencia_externa
        +Decimal monto
        +String estado
        +JSON respuesta_gateway
        +DateTime fecha_creacion
    }

    class EstadoPago {
        +Long id
        +String nombre
        +String descripcion
        +DateTime fecha_creacion
        +DateTime fecha_actualizacion
    }

    class MetodoPago {
        +Long id
        +String nombre
        +Boolean activo
        +DateTime fecha_creacion
        +DateTime fecha_actualizacion
    }

    class Notificacion {
        +Long id
        +Long id_usuario
        +Long id_tipo_notificacion
        +Long id_estado_notificacion
        +String mensaje
        +String destino
        +Boolean leida
        +DateTime fecha_lectura
        +DateTime fecha_creacion
        +DateTime fecha_actualizacion
    }

    class TipoNotificacion {
        +Long id
        +String nombre
        +String descripcion
        +DateTime fecha_creacion
        +DateTime fecha_actualizacion
    }

    class EstadoNotificacion {
        +Long id
        +String nombre
        +String descripcion
        +DateTime fecha_creacion
        +DateTime fecha_actualizacion
    }

    class Seccion {
        +Long id
        +String nombre
        +String descripcion
        +Boolean activa
        +DateTime fecha_creacion
    }

    %% Relaciones
    Usuario "1" --> "*" PasswordHistory : tiene historial
    Usuario "1" --> "*" Tienda : administra
    Usuario "1" --> "*" Producto : suministra
    Usuario "1" --> "*" Pedido : realiza
    Usuario "1" --> "*" Pago : efectua
    Usuario "1" --> "*" Notificacion : recibe
    Usuario "1" --> "*" HistorialRecarga : ejecuta
    Usuario "1" --> "*" Venta : compra

    Tienda "1" --> "*" Producto : contiene
    Tienda "1" --> "*" Pedido : gestiona

    Producto "1" --> "1" StockConfig : configura
    Producto "1" --> "*" HistorialRecarga : registra
    Producto "1" --> "*" DetallePedido : incluido_en
    Producto "1" --> "*" DetalleVenta : vendido_en
    Producto "1" --> "*" Seccion : pertenece_a

    Pedido "1" --> "*" DetallePedido : contiene
    Pedido "1" --> "*" Pago : pagado_con
    Pedido "1" --> "0..1" Venta : genera

    Venta "1" --> "*" DetalleVenta : contiene

    Pago --> EstadoPago : tiene estado
    Pago --> MetodoPago : usa método
    Pago "1" --> "*" Transaccion : registra

    Notificacion --> TipoNotificacion : es tipo
    Notificacion --> EstadoNotificacion : tiene estado
```

---

## 🎯 DESCRIPCIÓN POR MÓDULO

### **Módulo: Usuarios**

#### Usuario
**Responsabilidad**: Gestionar la autenticación, autorización y datos de usuarios del sistema.

**Atributos Principales**:
- `rol`: Enum (admin, proveedor, logistica, cliente)
- `self_deactivated`: Flag para auto-desactivación
- `admin_suspended`: Flag para suspensión por admin

**Métodos Clave**:
- `set_password()`: Valida contraseña vs historial
- `save()`: Guarda historial de contraseñas

#### PasswordHistory
**Responsabilidad**: Mantener historial de contraseñas para evitar reutilización.

---

### **Módulo: Productos**

#### Tienda
**Responsabilidad**: Representar puntos de venta físicos.

**Relaciones**:
- Un administrador puede gestionar múltiples tiendas
- Una tienda contiene múltiples productos

#### Producto
**Responsabilidad**: Gestionar el catálogo de productos.

**Atributos Principales**:
- `stock`: Cantidad disponible
- `es_basico`: Marca productos de necesidad básica
- `categoria`: Clasificación del producto
- `imagen1, imagen2, imagen3`: Múltiples imágenes

**Métodos Clave**:
- `reducir_stock()`: Valida y reduce stock
- `aumentar_stock()`: Incrementa stock

#### StockConfig
**Responsabilidad**: Configurar recarga automática de stock.

**Atributos Principales**:
- `stock_minimo`: Umbral de recarga
- `cantidad_recarga`: Cantidad a agregar
- `recarga_automatica_activa`: Flag de activación

**Métodos Clave**:
- `necesita_recarga()`: Verifica si debe recargarse
- `ejecutar_recarga()`: Ejecuta la recarga

#### HistorialRecarga
**Responsabilidad**: Auditoría de recargas de stock.

**Atributos Principales**:
- `tipo`: Enum (automatica, manual)
- `stock_anterior`, `stock_nuevo`: Trazabilidad

---

### **Módulo: Ventas**

#### Pedido
**Responsabilidad**: Gestionar órdenes de compra.

**Atributos Principales**:
- `estado`: Enum (pendiente, preparando, en_transito, entregado, cancelado)
- `total`: Total calculado automáticamente

**Métodos Clave**:
- `calcular_total()`: Suma detalles del pedido
- `puede_cambiar_a_*()`: Valida transiciones de estado

#### DetallePedido
**Responsabilidad**: Ítems individuales de un pedido.

**Características**:
- Relación M2M entre Pedido y Producto
- Guarda precio_unitario en momento de compra
- Calcula subtotal automáticamente

#### Venta
**Responsabilidad**: Registro consolidado de venta completada.

**Características**:
- Se genera cuando pedido es entregado
- Desnormaliza datos para reportes rápidos

#### DetalleVenta
**Responsabilidad**: Detalles de productos vendidos.

---

### **Módulo: Pagos**

#### Pago
**Responsabilidad**: Gestionar transacciones de pago.

**Atributos Principales**:
- `comprobante`: Archivo de comprobante (opcional)
- `monto`: Monto de la transacción

#### Transaccion
**Responsabilidad**: Detalles de transacción con gateway.

**Atributos Principales**:
- `referencia_externa`: ID del gateway
- `respuesta_gateway`: JSON completo de respuesta

#### EstadoPago
**Responsabilidad**: Catálogo de estados de pago.

**Valores Típicos**: Pendiente, Aprobado, Rechazado, Reembolsado

#### MetodoPago
**Responsabilidad**: Catálogo de métodos de pago.

**Valores Típicos**: Tarjeta, Transferencia, PSE, Efectivo

---

### **Módulo: Notificaciones**

#### Notificacion
**Responsabilidad**: Gestionar notificaciones a usuarios.

**Atributos Principales**:
- `leida`: Flag de lectura
- `fecha_lectura`: Timestamp de lectura
- `destino`: Email o ID de usuario

#### TipoNotificacion
**Responsabilidad**: Catálogo de tipos de notificación.

**Valores Típicos**: Pedido, Pago, Stock, Sistema

#### EstadoNotificacion
**Responsabilidad**: Catálogo de estados de notificación.

**Valores Típicos**: Pendiente, Enviada, Fallida

---

## 🔗 PATRONES DE DISEÑO APLICADOS

### 1. **Factory Pattern**
- `UsuarioManager.create_user()` y `create_superuser()`
- Crea instancias de Usuario con configuración específica por rol

### 2. **Strategy Pattern**
- Métodos de pago intercambiables
- Tipos de notificación configurables

### 3. **Observer Pattern**
- Notificaciones automáticas al cambiar estado de pedido
- Recarga automática de stock al detectar umbral

### 4. **Repository Pattern**
- ViewSets de Django REST actúan como repositorios
- Abstracción de acceso a datos

### 5. **Template Method**
- `save()` y `delete()` sobrescritos en DetallePedido
- Define esqueleto del algoritmo

---

## 📊 CARDINALIDADES CLAVE

| Relación | Cardinalidad | Descripción |
|----------|--------------|-------------|
| Usuario → Tienda | 1:N | Un admin gestiona N tiendas |
| Usuario → Producto | 1:N | Un proveedor suministra N productos |
| Tienda → Producto | 1:N | Una tienda tiene N productos |
| Producto → StockConfig | 1:1 | Un producto tiene una config |
| Pedido → DetallePedido | 1:N | Un pedido tiene N ítems |
| Pedido → Venta | 1:0..1 | Un pedido genera 0 o 1 venta |
| Producto → DetallePedido | 1:N | Un producto en N pedidos |

---

## 🎯 INVARIANTES DEL MODELO

### Usuario
- Email debe ser único
- Roles válidos: admin, proveedor, logistica, cliente
- Si admin_suspended=True, usuario no puede autenticarse

### Producto
- Stock >= 0 siempre
- (nombre, tienda) debe ser único
- Si recarga_automatica_activa=True, debe tener StockConfig

### Pedido
- Total debe ser suma de detalles
- Transiciones de estado válidas:
  - pendiente → preparando
  - preparando → en_transito
  - en_transito → entregado
- No puede haber DetallePedido duplicados (mismo producto)

### Pago
- Monto debe coincidir con total del pedido
- Si método requiere comprobante, debe tenerlo

---

## 📝 NOTAS DE IMPLEMENTACIÓN

### Índices de Base de Datos
```python
# Usuario
indexes = [
    ('rol', 'estado'),
    ('email', 'estado'),
    ('-fecha_creacion',)
]

# Producto
indexes = [
    ('tienda', 'activo'),
    ('proveedor', 'activo')
]

# Pedido
indexes = [
    ('cliente', 'estado'),
    ('tienda', 'estado'),
    ('estado', '-fecha_creacion')
]

# HistorialRecarga
indexes = [
    ('producto', '-fecha_creacion'),
    ('tipo', '-fecha_creacion')
]
```

### Unique Constraints
```python
# Producto
unique_together = ('nombre', 'tienda')

# DetallePedido
unique_together = ('pedido', 'producto')
```

---

## 🚀 EXTENSIONES FUTURAS

### Versión 2.0
- [ ] `ProductoVariante` (tallas, colores)
- [ ] `Promocion` y `Descuento`
- [ ] `Carrito` persistente
- [ ] `Wishlist`

### Versión 3.0
- [ ] `Review` y `Rating`
- [ ] `Recomendacion` (IA)
- [ ] `Suscripcion` recurrente
- [ ] `Programa` de fidelización

---

**Documento generado**: 2025-12-04  
**Versión**: 1.0  
**Estado**: ✅ Completado
