# 🗺️ MAPA DE PROCESOS - PREXCOL

**Proyecto**: PREXCOL (Plataforma de Gestión de Retail)  
**Fecha**: 2025-12-04  
**Versión**: 1.0  

---

## 📋 ÍNDICE

1. [Visión General](#visión-general)
2. [Procesos Estratégicos](#procesos-estratégicos)
3. [Procesos Operativos](#procesos-operativos)
4. [Procesos de Soporte](#procesos-de-soporte)
5. [Flujos de Usuario por Rol](#flujos-de-usuario-por-rol)
6. [Diagrama de Flujo de Pedidos](#diagrama-de-flujo-de-pedidos)
7. [Integraciones y Sistemas](#integraciones-y-sistemas)

---

## 🎯 VISIÓN GENERAL

PREXCOL es una plataforma integral para la gestión de tiendas minoristas que conecta **4 actores principales**:

```
┌─────────────────────────────────────────────────────────────────┐
│                    PLATAFORMA PREXCOL                          │
│                                                                 │
│  👤 ADMIN  ←→  📦 PROVEEDOR  ←→  🚚 LOGÍSTICA  ←→  🛒 CLIENTE  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### **Entidades Clave**
- **Usuarios**: 4 roles (Admin, Proveedor, Logística, Cliente)
- **Tiendas**: Puntos de venta administrados
- **Productos**: Catálogo de productos con stock
- **Pedidos**: Órdenes de compra de clientes
- **Pagos**: Transacciones financieras
- **Notificaciones**: Comunicación automatizada

---

## 📊 PROCESOS ESTRATÉGICOS

### 1. **Gestión de Tiendas**
**Responsable**: Administrador  
**Objetivo**: Crear, configurar y administrar puntos de venta

```
┌──────────────────────────────────────────────────────┐
│  GESTIÓN DE TIENDAS                                  │
├──────────────────────────────────────────────────────┤
│  1. Crear nueva tienda                               │
│  2. Asignar administrador responsable                │
│  3. Configurar información (dirección, teléfono)     │
│  4. Activar/Desactivar tienda                        │
│  5. Monitorear rendimiento                           │
└──────────────────────────────────────────────────────┘
```

**Impacto**: Base para toda la operación del sistema

---

### 2. **Gestión de Usuarios**
**Responsable**: Administrador  
**Objetivo**: Administrar ciclo de vida de usuarios

```
┌──────────────────────────────────────────────────────┐
│  GESTIÓN DE USUARIOS                                 │
├──────────────────────────────────────────────────────┤
│  1. Registro de nuevos usuarios                      │
│  2. Asignación de roles                              │
│     • Admin                                          │
│     • Proveedor                                      │
│     • Logística                                      │
│     • Cliente                                        │
│  3. Gestión de permisos                              │
│  4. Suspensión/Reactivación de cuentas              │
│  5. Auto-desactivación de cuentas                    │
│  6. Historial de contraseñas                         │
└──────────────────────────────────────────────────────┘
```

**Características Especiales**:
- ✅ Sistema de suspensión dual (auto-desactivación + suspensión por admin)
- ✅ Validación de contraseñas únicas (historial)
- ✅ Imágenes de perfil

---

### 3. **Gestión del Catálogo**
**Responsable**: Administrador + Proveedor  
**Objetivo**: Mantener catálogo de productos actualizado

```
┌──────────────────────────────────────────────────────┐
│  GESTIÓN DEL CATÁLOGO                                │
├──────────────────────────────────────────────────────┤
│  Admin:                                              │
│  1. Asignar productos a proveedores                  │
│  2. Crear/editar productos                           │
│  3. Configurar categorías                            │
│  4. Establecer precios                               │
│  5. Definir productos básicos                        │
│                                                       │
│  Proveedor:                                          │
│  1. Ver productos asignados                          │
│  2. Actualizar stock                                 │
│  3. Gestionar recarga automática                     │
│  4. Subir imágenes (hasta 3 por producto)           │
│  5. Actualizar características                       │
└──────────────────────────────────────────────────────┘
```

**Características Especiales**:
- ✅ Sistema de recarga automática de stock
- ✅ Historial de recargas (manual/automática)
- ✅ Configuración de umbrales por producto
- ✅ Múltiples imágenes por producto

---

## 🔄 PROCESOS OPERATIVOS

### 1. **Flujo Completo de Pedidos**

```
┌─────────────────────────────────────────────────────────────────┐
│                     CICLO DE VIDA DEL PEDIDO                    │
└─────────────────────────────────────────────────────────────────┘

    1. CREACIÓN
    ┌─────────────┐
    │  🛒 Cliente │ ─────► Agrega productos al carrito
    │  Navega     │        Selecciona cantidades
    │  Catalogo   │        Confirma pedido
    └─────────────┘
           │
           ▼
    2. PROCESAMIENTO DE PAGO
    ┌─────────────┐
    │ 💳 Sistema  │ ─────► Valida método de pago
    │ de Pagos    │        Procesa transacción
    │             │        Valida comprobante (si aplica)
    └─────────────┘
           │
           ▼
    3. CONFIRMACIÓN
    ┌─────────────┐
    │ Estado:     │ ─────► 📧 Notificación al cliente
    │ PENDIENTE   │        📧 Notificación al proveedor
    │             │        📧 Notificación a logística
    └─────────────┘
           │
           ▼
    4. PREPARACIÓN
    ┌─────────────┐
    │ 🚚 Logística│ ─────► Recibe orden
    │ Prepara     │        Verifica productos
    │ Productos   │        Reduce stock
    └─────────────┘        Cambia estado → PREPARANDO
           │
           ▼
    5. ENVÍO
    ┌─────────────┐
    │ Estado:     │ ─────► 📧 Notificación al cliente
    │ EN_TRANSITO │        Asigna transportista
    │             │        Tracking (futuro)
    └─────────────┘
           │
           ▼
    6. ENTREGA
    ┌─────────────┐
    │ Estado:     │ ─────► 📧 Confirmación al cliente
    │ ENTREGADO   │        ✅ Genera registro de venta
    │             │        📊 Actualiza métricas
    └─────────────┘
           │
           ▼
    7. REGISTRO FINANCIERO
    ┌─────────────┐
    │ 📊 Venta    │ ─────► Consolida información
    │ Registrada  │        Disponible para reportes
    │             │        Historial permanente
    └─────────────┘
```

**Estados del Pedido**:
1. `pendiente` - Pedido creado, esperando preparación
2. `preparando` - Logística está preparando el pedido
3. `en_transito` - Pedido enviado al cliente
4. `entregado` - Pedido completado exitosamente
5. `cancelado` - Pedido cancelado (devuelve stock)

---

### 2. **Gestión de Stock**

```
┌─────────────────────────────────────────────────────────────────┐
│                   SISTEMA DE GESTIÓN DE STOCK                   │
└─────────────────────────────────────────────────────────────────┘

    RECARGA MANUAL
    ┌─────────────┐
    │ 📦 Proveedor│ ─────► Ingresa cantidad
    │ o Admin     │        Sistema valida
    └─────────────┘        Actualiza stock
           │                Registra en historial
           │
    ┌──────▼──────────────────────────────────────┐
    │         STOCK DEL PRODUCTO                  │
    │   Actual: 150 unidades                      │
    └─────────────────────────────────────────────┘
           │
           ▼
    MONITOREO AUTOMÁTICO
    ┌─────────────┐
    │ 🤖 Sistema  │ ─────► Verifica stock cada X tiempo
    │ Automático  │        Compara con stock_minimo
    └─────────────┘        
           │
           ▼
    ¿Stock <= Stock Mínimo?
           │
           ├─[SÍ]──► RECARGA AUTOMÁTICA
           │         ┌─────────────┐
           │         │ + cantidad  │
           │         │   recarga   │
           │         └─────────────┘
           │         Registra en historial
           │         Notifica al proveedor
           │
           └─[NO]──► Continúa monitoreo

    REDUCCIÓN POR VENTA
    ┌─────────────┐
    │ 🛒 Pedido   │ ─────► Valida disponibilidad
    │ Confirmado  │        Reduce stock
    │             │        Registra en historial
    └─────────────┘        Trigger recarga si aplica
```

**Modelos Involucrados**:
- `Producto.stock` - Stock actual
- `StockConfig` - Configuración de recarga
- `HistorialRecarga` - Registro de movimientos

---

### 3. **Procesamiento de Pagos**

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO DE PROCESAMIENTO DE PAGOS              │
└─────────────────────────────────────────────────────────────────┘

    1. SELECCIÓN DE MÉTODO
    ┌─────────────┐
    │  🛒 Cliente │ ─────► Selecciona método de pago:
    └─────────────┘        • Tarjeta de crédito
           │                • Transferencia bancaria
           │                • PSE
           │                • Efectivo (en tienda)
           │
           ▼
    2. VALIDACIÓN
    ┌─────────────┐
    │ Método      │ ─────► ¿Requiere comprobante?
    │ Activo?     │         
    └─────────────┘        
           │
           ▼
    3. PROCESAMIENTO
    ┌─────────────┐
    │ Gateway de  │ ─────► Procesa transacción
    │ Pago        │        Recibe respuesta
    └─────────────┘        Guarda referencia externa
           │
           ▼
    4. REGISTRO
    ┌─────────────┐
    │ Pago        │ ─────► Crea registro en BD
    │ + Estado    │        Asocia con pedido
    │             │        Guarda respuesta gateway
    └─────────────┘
           │
           ▼
    5. NOTIFICACIÓN
    ┌─────────────┐
    │ 📧 Email    │ ─────► Confirmación al cliente
    │ Automático  │        Recibo de pago
    └─────────────┘        Detalles de transacción
```

**Modelos Involucrados**:
- `MetodoPago` - Métodos disponibles
- `Pago` - Registro del pago
- `Transaccion` - Detalles de la transacción
- `EstadoPago` - Estados del pago

---

## 🛠️ PROCESOS DE SOPORTE

### 1. **Sistema de Notificaciones**

```
┌─────────────────────────────────────────────────────────────────┐
│                MOTOR DE NOTIFICACIONES AUTOMÁTICAS              │
└─────────────────────────────────────────────────────────────────┘

    EVENTOS TRIGGER
    ┌─────────────────┐
    │ • Nuevo pedido  │
    │ • Cambio estado │
    │ • Pago recibido │ ────► Detector de Eventos
    │ • Stock bajo    │
    │ • Nuevo usuario │
    └─────────────────┘
           │
           ▼
    CLASIFICACIÓN
    ┌─────────────────┐
    │ Tipo de         │ ────► • Transaccional
    │ Notificación    │       • Informativa
    └─────────────────┘       • Alerta
           │
           ▼
    DESTINATARIOS
    ┌─────────────────┐
    │ • Cliente       │
    │ • Proveedor     │ ────► Envío Multi-canal
    │ • Logística     │       • Email
    │ • Admin         │       • Push (futuro)
    └─────────────────┘       • SMS (futuro)
           │
           ▼
    REGISTRO
    ┌─────────────────┐
    │ Base de Datos   │ ────► Marca como enviada
    │ Notificaciones  │       Tracking de lectura
    └─────────────────┘       Historial completo
```

**Tipos de Notificaciones**:
- ✉️ **Pedido Creado** → Cliente, Logística
- 📦 **Pedido en Preparación** → Cliente
- 🚚 **Pedido en Tránsito** → Cliente
- ✅ **Pedido Entregado** → Cliente
- 💰 **Pago Recibido** → Cliente, Admin
- 📉 **Stock Bajo** → Proveedor, Admin
- 🔄 **Recarga Automática** → Proveedor
- 👤 **Nuevo Usuario** → Admin

---

### 2. **Autenticación y Seguridad**

```
┌─────────────────────────────────────────────────────────────────┐
│              SISTEMA DE AUTENTICACIÓN Y SEGURIDAD               │
└─────────────────────────────────────────────────────────────────┘

    REGISTRO
    ┌─────────────┐
    │ Nuevo       │ ────► Validación de email único
    │ Usuario     │       Hash de contraseña (bcrypt)
    └─────────────┘       Creación de perfil
           │
           ▼
    LOGIN
    ┌─────────────┐
    │ Credenciales│ ────► Validación email/password
    │ Email/Pass  │       Verificación de estado
    └─────────────┘       • ¿Activo?
           │               • ¿Suspendido?
           │               • ¿Auto-desactivado?
           ▼
    TOKEN JWT
    ┌─────────────┐
    │ Generación  │ ────► Access Token (15 min)
    │ Token       │       Refresh Token (7 días)
    └─────────────┘       Claims: id, email, rol
           │
           ▼
    AUTORIZACIÓN
    ┌─────────────┐
    │ Middleware  │ ────► Verifica token en cada request
    │ JWT         │       Valida permisos por rol
    └─────────────┘       Renueva token si aplica
           │
           ▼
    GESTIÓN DE CUENTA
    ┌─────────────┐
    │ • Cambio    │ ────► Validación de contraseña anterior
    │   contraseña│       Verificación vs historial
    │ • Reset     │       Envío de email con token
    │ • Suspensión│       Estados de cuenta
    └─────────────┘
```

**Características de Seguridad**:
- 🔒 JWT con refresh tokens
- 🔑 Historial de contraseñas (no reutilización)
- 🚫 Suspensión dual (usuario/admin)
- 📧 Reset de contraseña por email
- 🛡️ Rate limiting (futuro)
- 🔐 2FA (futuro)

---

### 3. **Sistema de Reportes y Analytics**

```
┌─────────────────────────────────────────────────────────────────┐
│                   REPORTES Y ANALÍTICAS                         │
└─────────────────────────────────────────────────────────────────┘

    DATOS OPERATIVOS
    ┌─────────────────┐
    │ • Ventas        │
    │ • Pedidos       │
    │ • Stock         │ ────► Agregación
    │ • Usuarios      │       
    │ • Transacciones │
    └─────────────────┘
           │
           ▼
    MÉTRICAS CLAVE (KPIs)
    ┌─────────────────┐
    │ • Total ventas  │
    │ • Pedidos/día   │
    │ • Productos más │ ────► Dashboard
    │   vendidos      │       Visualización
    │ • Stock crítico │
    │ • Usuarios      │
    │   activos       │
    └─────────────────┘
           │
           ▼
    REPORTES POR ROL
    ┌─────────────────┐
    │ Admin:          │ ────► Vista completa
    │ • Global        │       Todas las tiendas
    │                 │       Todos los usuarios
    │ Proveedor:      │ ────► Sus productos
    │ • Productos     │       Stock e historial
    │ • Recargas      │
    │                 │
    │ Logística:      │ ────► Pedidos asignados
    │ • Pendientes    │       Estados
    │ • En proceso    │
    │                 │
    │ Cliente:        │ ────► Historial personal
    │ • Mis pedidos   │       Mis pagos
    │ • Mis pagos     │
    └─────────────────┘
```

---

## 👥 FLUJOS DE USUARIO POR ROL

### 1. **ADMINISTRADOR**

```
┌─────────────────────────────────────────────────────────────────┐
│                        ROL: ADMINISTRADOR                       │
└─────────────────────────────────────────────────────────────────┘

    INICIO DE SESIÓN
         │
         ▼
    DASHBOARD ADMIN
    ┌────────────────────────────────┐
    │ • Vista general del sistema    │
    │ • Métricas clave (KPIs)        │
    │ • Alertas y notificaciones     │
    │ • Accesos rápidos              │
    └────────────────────────────────┘
         │
    ┌────┴──────┬──────────┬──────────┬──────────┐
    │           │          │          │          │
    ▼           ▼          ▼          ▼          ▼
TIENDAS    PRODUCTOS   USUARIOS   PEDIDOS   REPORTES
 │           │          │          │          │
 ├─Crear    ├─Crear    ├─Crear    ├─Ver     ├─Ventas
 ├─Editar   ├─Editar   ├─Editar   ├─Estado  ├─Stock
 ├─Activar  ├─Asignar  ├─Roles    ├─Canc.  ├─Usuarios
 └─Eliminar └─Stock    └─Suspend. └─Detall. └─Finanzas
```

**Capacidades Principales**:
- ✅ Gestión completa de tiendas
- ✅ Asignación de productos a proveedores
- ✅ Creación y edición de productos
- ✅ Administración de usuarios (todos los roles)
- ✅ Suspensión/reactivación de cuentas
- ✅ Vista global de pedidos
- ✅ Reportes y analíticas completas
- ✅ Configuración del sistema

---

### 2. **PROVEEDOR**

```
┌─────────────────────────────────────────────────────────────────┐
│                         ROL: PROVEEDOR                          │
└─────────────────────────────────────────────────────────────────┘

    INICIO DE SESIÓN
         │
         ▼
    DASHBOARD PROVEEDOR
    ┌────────────────────────────────┐
    │ • Productos asignados          │
    │ • Stock bajo (alertas)         │
    │ • Recargas recientes           │
    │ • Pedidos relacionados         │
    └────────────────────────────────┘
         │
    ┌────┴──────┬──────────┬──────────┐
    │           │          │          │
    ▼           ▼          ▼          ▼
MIS PRODUCTOS STOCK   RECARGAS  REPORTES
    │           │          │          │
    ├─Ver      ├─Actual   ├─Manual   ├─Historial
    ├─Editar   ├─Histo.  ├─Auto     ├─Ventas
    ├─Imágenes ├─Config. ├─Histor.  └─Stock
    └─Caract.  └─Alert.  └─Config.
```

**Capacidades Principales**:
- ✅ Ver productos asignados
- ✅ Actualizar stock
- ✅ Configurar recarga automática
- ✅ Realizar recargas manuales
- ✅ Ver historial de recargas
- ✅ Subir/editar imágenes de productos
- ✅ Actualizar características
- ✅ Recibir alertas de stock bajo
- ✅ Reportes de sus productos

---

### 3. **LOGÍSTICA**

```
┌─────────────────────────────────────────────────────────────────┐
│                        ROL: LOGÍSTICA                           │
└─────────────────────────────────────────────────────────────────┘

    INICIO DE SESIÓN
         │
         ▼
    PANEL LOGÍSTICA
    ┌────────────────────────────────┐
    │ • Pedidos pendientes           │
    │ • Pedidos en preparación       │
    │ • Pedidos en tránsito          │
    │ • Alertas de tiempo            │
    └────────────────────────────────┘
         │
    ┌────┴──────┬──────────┬──────────┐
    │           │          │          │
    ▼           ▼          ▼          ▼
PENDIENTES PREPARANDO EN_TRANSITO ENTREGADOS
    │           │          │          │
    ├─Ver      ├─Ver      ├─Ver      ├─Ver
    ├─Iniciar  ├─Detalle  ├─Detalle  ├─Historial
    ├─Detalle  ├─Marcar   ├─Marcar   └─Reportes
    └─Asignar  │ enviado  │ entregado
               └─Cancelar └─Problemas
```

**Capacidades Principales**:
- ✅ Ver pedidos pendientes
- ✅ Cambiar estado de pedidos
  - Pendiente → Preparando
  - Preparando → En tránsito
  - En tránsito → Entregado
- ✅ Ver detalles completos de pedidos
- ✅ Cancelar pedidos (con justificación)
- ✅ Gestionar problemas en entrega
- ✅ Reportes de entregas
- ✅ Métricas de tiempo de entrega

---

### 4. **CLIENTE**

```
┌─────────────────────────────────────────────────────────────────┐
│                          ROL: CLIENTE                           │
└─────────────────────────────────────────────────────────────────┘

    INICIO DE SESIÓN / REGISTRO
         │
         ▼
    CATÁLOGO DE PRODUCTOS
    ┌────────────────────────────────┐
    │ • Buscar productos             │
    │ • Filtrar por categoría        │
    │ • Ver detalles                 │
    │ • Agregar al carrito           │
    └────────────────────────────────┘
         │
         ▼
    CARRITO DE COMPRAS
    ┌────────────────────────────────┐
    │ • Ver productos seleccionados  │
    │ • Ajustar cantidades           │
    │ • Calcular total               │
    │ • Proceder al pago             │
    └────────────────────────────────┘
         │
         ▼
    PAGO
    ┌────────────────────────────────┐
    │ • Seleccionar método de pago   │
    │ • Ingresar datos               │
    │ • Subir comprobante (si aplica)│
    │ • Confirmar pago               │
    └────────────────────────────────┘
         │
         ▼
    CONFIRMACIÓN
    ┌────────────────────────────────┐
    │ • Número de pedido             │
    │ • Detalles de la compra        │
    │ • Estado: Pendiente            │
    │ • Email de confirmación        │
    └────────────────────────────────┘
         │
         ▼
    MIS PEDIDOS
    ┌────────────────────────────────┐
    │ • Ver historial                │
    │ • Seguimiento de estados       │
    │ • Ver detalles                 │
    │ • Descargar factura            │
    └────────────────────────────────┘
```

**Capacidades Principales**:
- ✅ Navegar catálogo de productos
- ✅ Buscar y filtrar productos
- ✅ Ver detalles y características
- ✅ Agregar productos al carrito
- ✅ Realizar compras
- ✅ Seleccionar método de pago
- ✅ Ver historial de pedidos
- ✅ Seguimiento de estado de pedidos
- ✅ Gestionar perfil
- ✅ Auto-desactivar cuenta

---

## 📈 DIAGRAMA DE FLUJO DE PEDIDOS

### **Flujo Detallado con Validaciones**

```mermaid
graph TD
    A[Cliente: Agrega productos al carrito] --> B{¿Stock disponible?}
    B -->|Sí| C[Cliente: Confirma pedido]
    B -->|No| A1[Error: Stock insuficiente]
    
    C --> D[Cliente: Selecciona método de pago]
    D --> E{¿Método válido y activo?}
    E -->|Sí| F[Sistema: Procesa pago]
    E -->|No| D1[Error: Método no disponible]
    
    F --> G{¿Pago exitoso?}
    G -->|Sí| H[Sistema: Crea pedido - Estado: PENDIENTE]
    G -->|No| F1[Error: Pago rechazado]
    
    H --> H1[Sistema: Reduce stock de productos]
    H1 --> H2[Sistema: Envía notificaciones]
    H2 --> I[Logística: Recibe orden]
    
    I --> J[Logística: Inicia preparación]
    J --> K[Sistema: Cambia estado a PREPARANDO]
    K --> K1[Sistema: Notifica al cliente]
    
    K1 --> L[Logística: Prepara productos]
    L --> M{¿Productos listos?}
    M -->|Sí| N[Logística: Marca como EN_TRANSITO]
    M -->|No| M1[Logística: Reporta problema]
    
    N --> N1[Sistema: Notifica al cliente]
    N1 --> O[Transporte: Entrega pedido]
    
    O --> P{¿Entrega exitosa?}
    P -->|Sí| Q[Logística: Marca como ENTREGADO]
    P -->|No| P1[Reporta problema de entrega]
    
    Q --> Q1[Sistema: Genera registro de venta]
    Q1 --> Q2[Sistema: Actualiza métricas]
    Q2 --> R[Sistema: Notifica confirmación al cliente]
    
    A1 --> Z[Fin - Error]
    D1 --> Z
    F1 --> Z
    M1 --> Z
    P1 --> Z
    R --> Y[Fin - Éxito]
```

---

## 🔗 INTEGRACIONES Y SISTEMAS

### **Arquitectura del Sistema**

```
┌─────────────────────────────────────────────────────────────────┐
│                          FRONTEND                               │
│                    React 19 + Vite                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │Dashboard │  │Catálogo  │  │ Pedidos  │  │  Auth    │       │
│  │  Admin   │  │Productos │  │          │  │          │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼ axios (HTTP)
┌─────────────────────────────────────────────────────────────────┐
│                          API REST                               │
│                   Django REST Framework                         │
│  ┌────────────────────────────────────────────────────┐        │
│  │  Endpoints:                                        │        │
│  │  • /api/auth/ (login, registro, reset)            │        │
│  │  • /api/usuarios/                                 │        │
│  │  • /api/productos/                                │        │
│  │  • /api/pedidos/                                  │        │
│  │  • /api/pagos/                                    │        │
│  │  • /api/notificaciones/                           │        │
│  └────────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                          BACKEND                                │
│                       Django 4.x                                │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  │
│  │Usuarios│  │Product.│  │Ventas  │  │Pagos   │  │Notific.│  │
│  │  App   │  │  App   │  │  App   │  │  App   │  │  App   │  │
│  └────────┘  └────────┘  └────────┘  └────────┘  └────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BASE DE DATOS                            │
│                        SQLite / PostgreSQL                      │
│  ┌──────────────────────────────────────────────────┐          │
│  │ Tablas: Usuario, Producto, Pedido, Pago,        │          │
│  │         Notificacion, Tienda, etc.              │          │
│  └──────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘

                SERVICIOS EXTERNOS (Futuros)
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ Gateway  │  │  Email   │  │  SMS     │
    │  Pagos   │  │ Service  │  │ Service  │
    │(PayU,PSE)│  │(SendGrid)│  │(Twilio)  │
    └──────────┘  └──────────┘  └──────────┘
```

---

## 📊 MATRIZ DE RESPONSABILIDADES (RACI)

| Proceso | Admin | Proveedor | Logística | Cliente |
|---------|-------|-----------|-----------|---------|
| **Gestión de Tiendas** | R,A | I | I | - |
| **Gestión de Usuarios** | R,A | I | I | C |
| **Crear Productos** | R,A | C | I | - |
| **Asignar Productos a Proveedor** | R,A | I | - | - |
| **Actualizar Stock** | R | R,A | I | - |
| **Configurar Recarga Auto** | R | R,A | I | - |
| **Crear Pedido** | I | I | I | R,A |
| **Preparar Pedido** | I | I | R,A | C |
| **Cambiar Estado Pedido** | I | I | R,A | C |
| **Procesar Pago** | I | I | I | R,A |
| **Enviar Notificaciones** | I | C | C | C |
| **Generar Reportes** | R,A | R,A | R,A | R,A |
| **Gestión de Cuenta** | R | R,A | R,A | R,A |

**Leyenda**:
- **R** = Responsable (quien ejecuta)
- **A** = Aprobador (quien decide)
- **C** = Consultado (quien provee información)
- **I** = Informado (quien recibe información)

---

## 🎯 INDICADORES CLAVE DE RENDIMIENTO (KPIs)

### **KPIs por Área**

#### **Ventas**
- 💰 Total de ventas (diario/semanal/mensual)
- 📦 Número de pedidos completados
- 💵 Valor promedio de pedido
- 📈 Tasa de conversión (visitas → compras)
- 🔄 Tasa de pedidos cancelados

#### **Operaciones**
- ⏱️ Tiempo promedio de preparación
- 🚚 Tiempo promedio de entrega
- ✅ Tasa de entregas exitosas
- ❌ Tasa de problemas en entrega
- 📊 Pedidos por estado (dashboard)

#### **Inventario**
- 📉 Productos con stock bajo
- 🔄 Frecuencia de recarga automática
- 📊 Rotación de inventario
- 💸 Valor total de inventario
- 🎯 Tasa de productos sin stock

#### **Usuarios**
- 👥 Usuarios activos (por rol)
- 📊 Nuevos registros (período)
- 🚫 Cuentas suspendidas
- 🔄 Tasa de retención de clientes
- ⏰ Última actividad promedio

---

## 🚀 ROADMAP Y MEJORAS FUTURAS

### **Fase 1: Completada ✅**
- Sistema de usuarios multi-rol
- Gestión de productos y tiendas
- Flujo completo de pedidos
- Sistema de pagos básico
- Notificaciones por email
- Recarga automática de stock
- Dashboards por rol

### **Fase 2: En Progreso 🔄**
- Optimización de filtros y búsqueda
- Reportes avanzados
- Sistema de guías interactivas
- SEO y optimización social media
- Mejoras de UX/UI

### **Fase 3: Planeada 📋**
- Integración con gateways de pago reales (PayU, PSE)
- Sistema de tracking de entregas
- Notificaciones push en tiempo real
- App móvil (React Native)
- Sistema de chat en vivo
- Multi-tienda para un mismo admin
- Sistema de cupones y descuentos
- Programa de fidelización
- Analíticas avanzadas con IA

### **Fase 4: Visión a Largo Plazo 🔮**
- Marketplace multi-vendor
- Integración con ERP externo
- API pública para terceros
- Sistema de franquicias
- Blockchain para trazabilidad
- Inteligencia artificial para predicción de demanda

---

## 📝 CONCLUSIÓN

El **Mapa de Procesos de PREXCOL** define un sistema integral de gestión retail que:

✅ **Conecta 4 actores clave**: Admin, Proveedor, Logística, Cliente  
✅ **Automatiza procesos críticos**: Stock, pagos, notificaciones  
✅ **Garantiza trazabilidad**: Historial completo de operaciones  
✅ **Escala eficientemente**: Arquitectura modular y extensible  
✅ **Prioriza la experiencia**: Dashboards específicos por rol  

Este mapa sirve como **guía estratégica** para el desarrollo continuo y la optimización del sistema.

---

**Documento preparado por**: Sistema PREXCOL  
**Última actualización**: 2025-12-04  
**Versión**: 1.0  
**Mantenedor**: Equipo de Desarrollo
