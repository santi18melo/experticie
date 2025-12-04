# ⚙️ DIAGRAMAS DE MÁQUINAS DE ESTADO - PREXCOL

**Proyecto**: PREXCOL  
**Fecha**: 2025-12-04  
**Tipo**: Diagramas de Comportamiento - Estados y Transiciones

---

## 📋 ÍNDICE

1. [Estado del Pedido](#estado-del-pedido)
2. [Estado de la Cuenta de Usuario](#estado-de-la-cuenta-de-usuario)
3. [Estado del Pago](#estado-del-pago)
4. [Estado de la Notificación](#estado-de-la-notificación)
5. [Estado del Stock](#estado-del-stock)

---

## 📦 ESTADO DEL PEDIDO

![Diagrama de Estados Pedido Visual](imagenes/11_diagrama_estados_pedido.png)

### Diagrama de Estados

```mermaid
stateDiagram-v2
    [*] --> Pendiente: Cliente confirma compra<br/>& pago exitoso

    Pendiente --> Preparando: Logística inicia<br/>preparación
    Pendiente --> Cancelado: Cliente cancela<br/>o Admin cancela

    Preparando --> En_Transito: Logística marca<br/>como enviado
    Preparando --> Cancelado: Problema en<br/>preparación

    En_Transito --> Entregado: Confirmación<br/>de entrega
    En_Transito --> Problema_Entrega: Error en<br/>entrega

    Problema_Entrega --> En_Transito: Reintento de<br/>entrega
    Problema_Entrega --> Cancelado: Entrega<br/>imposible

    Entregado --> [*]: Venta generada

    Cancelado --> [*]: Stock devuelto

    state Pendiente {
        [*] --> Esperando_Preparacion
        Esperando_Preparacion --> Validando_Stock: Auto-check
        Validando_Stock --> Esperando_Preparacion: Stock OK
    }

    state Preparando {
        [*] --> Recolectando
        Recolectando --> Empacando
        Empacando --> Etiquetando
        Etiquetando --> Listo_para_Envio
    }

    state En_Transito {
        [*] --> Asignado_Transportista
        Asignado_Transportista --> En_Ruta
        En_Ruta --> En_Destino
    }

    note right of Pendiente
        • Pago confirmado
        • Stock reservado
        • Cliente notificado
    end note

    note right of Entregado
        • Genera Venta
        • Actualiza métricas
        • Notifica cliente
    end note

    note right of Cancelado
        • Devuelve stock
        • Procesa reembolso
        • Notifica cliente
    end note
```

### Tabla de Transiciones

| Estado Origen | Evento | Acción | Estado Destino | Actor |
|---------------|--------|--------|----------------|-------|
| - | Pago exitoso | Crear pedido, reservar stock | Pendiente | Sistema |
| Pendiente | Iniciar preparación | Asignar a logística | Preparando | Logística |
| Pendiente | Cancelar | Devolver stock | Cancelado | Cliente/Admin |
| Preparando | Marcar enviado | Asignar transportista | En_Transito | Logística |
| Preparando | Reportar problema | Notificar admin | Cancelado | Logística |
| En_Transito | Confirmar entrega | Generar venta | Entregado | Logística/Sistema |
| En_Transito | Problema entrega | Registrar incidente | Problema_Entrega | Logística |
| Problema_Entrega | Reintentar | Reprogramar entrega | En_Transito | Logística |
| Problema_Entrega | Imposible entregar | Procesar reembolso | Cancelado | Admin |

### Invariantes de Estado

```python
# Reglas de Negocio por Estado

Estado.PENDIENTE:
    - Pago debe estar APROBADO
    - Stock debe estar reservado
    - No puede tener detalles vacíos
    - Total debe ser > 0

Estado.PREPARANDO:
    - Debe tener logística asignada
    - Todos los productos deben existir
    - Stock debe seguir disponible

Estado.EN_TRANSITO:
    - Debe tener transportista asignado
    - Fecha de envío registrada
    - Tracking ID (opcional)

Estado.ENTREGADO:
    - Debe tener confirmación de entrega
    - Venta debe estar generada
    - Cliente notificado

Estado.CANCELADO:
    - Debe tener razón de cancelación
    - Stock debe estar devuelto
    - Reembolso procesado (si aplica)
```

---

## 👤 ESTADO DE LA CUENTA DE USUARIO

### Diagrama de Estados

```mermaid
stateDiagram-v2
    [*] --> Activa: Registro exitoso

    Activa --> Auto_Desactivada: Usuario<br/>desactiva cuenta
    Activa --> Suspendida_Admin: Admin<br/>suspende
    Activa --> Inactiva: Sin actividad<br/>por 180 días

    Auto_Desactivada --> Activa: Usuario<br/>reactiva
    Auto_Desactivada --> Eliminada: 30 días sin<br/>reactivar

    Suspendida_Admin --> Activa: Admin<br/>reactiva
    Suspendida_Admin --> Eliminada: Solicitud usuario<br/>& aprobación admin

    Inactiva --> Activa: Usuario<br/>inicia sesión
    Inactiva --> Eliminada: Sin actividad<br/>por 365 días

    Eliminada --> [*]: Datos anonimizados

    state Activa {
        [*] --> Normal
        Normal --> Cambiando_Password: Solicitud cambio
        Cambiando_Password --> Normal: Password actualizado
        Normal --> Editando_Perfil: Solicitud edición
        Editando_Perfil --> Normal: Perfil actualizado
    }

    state Suspendida_Admin {
        [*] --> Bloqueada
        note right of Bloqueada
            • No puede iniciar sesión
            • Debe contactar soporte
            • Razón registrada
        end note
    }

    note right of Auto_Desactivada
        • Puede reactivar solo
        • Datos preservados
        • Sesiones cerradas
    end note

    note right of Eliminada
        • Irreversible
        • Datos anonimizados
        • Cumple GPDR
    end note
```

### Tabla de Transiciones

| Estado Origen | Evento | Acción | Estado Destino | Actor |
|---------------|--------|--------|----------------|-------|
| - | Registro | Crear usuario, enviar email | Activa | Sistema |
| Activa | Desactivar cuenta | Cerrar sesiones | Auto_Desactivada | Usuario |
| Activa | Suspender | Bloquear acceso, notificar | Suspendida_Admin | Admin |
| Activa | Sin actividad 180 días | Marcar inactiva | Inactiva | Sistema |
| Auto_Desactivada | Reactivar | Restaurar acceso | Activa | Usuario |
| Auto_Desactivada | 30 días sin usar | Anonimizar datos | Eliminada | Sistema |
| Suspendida_Admin | Reactivar | Desbloquear | Activa | Admin |
| Suspendida_Admin | Solicitar eliminación | Anonimizar | Eliminada | Admin |
| Inactiva | Login | Actualizar last_activity | Activa | Usuario |
| Inactiva | 365 días sin usar | Anonimizar | Eliminada | Sistema |

### Permisos por Estado

```python
# Matriz de Permisos

Estado.ACTIVA:
    - Puede iniciar sesión: SÍ
    - Puede realizar operaciones: SÍ
    - Visible en sistema: SÍ
    - Recibe notificaciones: SÍ

Estado.AUTO_DESACTIVADA:
    - Puede iniciar sesión: SÍ (para reactivar)
    - Puede realizar operaciones: NO
    - Visible en sistema: NO
    - Recibe notificaciones: NO

Estado.SUSPENDIDA_ADMIN:
    - Puede iniciar sesión: NO
    - Puede realizar operaciones: NO
    - Visible en sistema: SÍ (para admin)
    - Recibe notificaciones: NO

Estado.INACTIVA:
    - Puede iniciar sesión: SÍ (reactiva automáticamente)
    - Puede realizar operaciones: Limitadas
    - Visible en sistema: NO
    - Recibe notificaciones: NO

Estado.ELIMINADA:
    - Puede iniciar sesión: NO
    - Puede realizar operaciones: NO
    - Visible en sistema: NO
    - Recibe notificaciones: NO
```

---

## 💳 ESTADO DEL PAGO

### Diagrama de Estados

```mermaid
stateDiagram-v2
    [*] --> Pendiente: Cliente inicia<br/>proceso de pago

    Pendiente --> Procesando: Gateway<br/>recibe solicitud

    Procesando --> Aprobado: Autorización<br/>exitosa
    Procesando --> Rechazado: Fondos insuficientes<br/>o tarjeta inválida
    Procesando --> Error: Error técnico<br/>del gateway

    Rechazado --> Pendiente: Cliente<br/>reintenta
    Error --> Pendiente: Administrador<br/>autoriza reintento

    Aprobado --> Confirmado: Verificación<br/>exitosa

    Confirmado --> Completado: Pedido<br/>entregado

    Completado --> Reembolsado: Solicitud de<br/>reembolso aprobada

    Rechazado --> [*]: Pago no procesado
    Error --> [*]: Pago no procesado
    Reembolsado --> [*]: Monto devuelto

    state Procesando {
        [*] --> Validando_Datos
        Validando_Datos --> Autorizando
        Autorizando --> Capturando
    }

    state Aprobado {
        [*] --> Verificando_Fondos
        Verificando_Fondos --> Reservado
    }

    note right of Pendiente
        • Esperando acción
        • No afecta inventario
        • Timeout: 15 minutos
    end note

    note right of Completado
        • Pago finalizado
        • No reversible
        • Venta confirmada
    end note

    note right of Reembolsado
        • Dinero devuelto
        • Pedido cancelado
        • Stock restaurado
    end note
```

### Tabla de Transiciones

| Estado Origen | Evento | Acción | Estado Destino | Actor |
|---------------|--------|--------|----------------|-------|
| - | Iniciar pago | Crear registro | Pendiente | Cliente |
| Pendiente | Enviar a gateway | Conectar gateway | Procesando | Sistema |
| Procesando | Autorización OK | Guardar referencia | Aprobado | Gateway |
| Procesando | Autorización denegada | Registrar razón | Rechazado | Gateway |
| Procesando | Error técnico | Log error | Error | Gateway |
| Rechazado | Reintentar | Limpiar datos | Pendiente | Cliente |
| Error | Autorizar reintento | Resetear | Pendiente | Admin |
| Aprobado | Verificar fondos | Reservar monto | Confirmado | Sistema |
| Confirmado | Pedido entregado | Capturar pago | Completado | Sistema |
| Completado | Solicitar reembolso | Procesar devolución | Reembolsado | Admin |

---

## 📧 ESTADO DE LA NOTIFICACIÓN

### Diagrama de Estados

```mermaid
stateDiagram-v2
    [*] --> Pendiente: Evento trigger

    Pendiente --> Encolada: Agregada a<br/>cola Celery

    Encolada --> Enviando: Worker procesa

    Enviando --> Enviada: Envío exitoso<br/>(SMTP/SMS OK)
    Enviando --> Fallida: Error al enviar

    Enviada --> Leida: Usuario abre<br/>notificación

    Fallida --> Reintentando: Auto-retry<br/>(max 3 intentos)

    Reintentando --> Enviando: Intentando<br/>nuevamente
    Reintentando --> Fallida_Final: 3 intentos<br/>fallidos

    Leida --> [*]: Notificación procesada
    Fallida_Final --> [*]: Notificación<br/>no entregada

    state Enviando {
        [*] --> Conectando_Servidor
        Conectando_Servidor --> Enviando_Mensaje
        Enviando_Mensaje --> Esperando_Confirmacion
    }

    note right of Pendiente
        • Creada en DB
        • leida = false
        • estado = pendiente
    end note

    note right of Enviada
        • Entregada exitosamente
        • fecha_envio registrada
        • Visible para usuario
    end note

    note right of Leida
        • Usuario la vio
        • fecha_lectura registrada
        • Puede archivarse
    end note
```

### Tabla de Transiciones

| Estado Origen | Evento | Acción | Estado Destino | Actor |
|---------------|--------|--------|----------------|-------|
| - | Evento ocurre | Crear notificación | Pendiente | Sistema |
| Pendiente | Encolar tarea | Enviar a Redis | Encolada | Sistema |
| Encolada | Worker toma tarea | Procesar envío | Enviando | Celery |
| Enviando | SMTP/SMS OK | Registrar envío | Enviada | Sistema |
| Enviando | SMTP/SMS fail | Log error | Fallida | Sistema |
| Fallida | Auto-retry | Reencolar | Reintentando | Celery |
| Reintentando | Procesar | Intentar envío | Enviando | Celery |
| Reintentando | 3 fallos | Marcar como final | Fallida_Final | Sistema |
| Enviada | Usuario abre | Actualizar timestamp | Leida | Usuario |

---

## 📊 ESTADO DEL STOCK

### Diagrama de Estados

```mermaid
stateDiagram-v2
    [*] --> Normal: Stock >= stock_minimo<br/>+ margen

    Normal --> Bajo: Stock <= stock_minimo

    Bajo --> Muy_Bajo: Stock < (stock_minimo / 2)

    Muy_Bajo --> Critico: Stock <= 5

    Critico --> Agotado: Stock = 0

    Bajo --> Normal: Recarga manual<br/>o automática
    Muy_Bajo --> Normal: Recarga manual<br/>o automática
    Critico --> Normal: Recarga manual<br/>o automática
    Agotado --> Normal: Recarga manual<br/>o automática

    state Normal {
        [*] --> Disponible
        Disponible --> Vendiendo: Pedidos activos
        Vendiendo --> Disponible: Stock OK
    }

    state Bajo {
        [*] --> Alerta_Proveedor
        note right of Alerta_Proveedor
            • Notificación al proveedor
            • Recarga auto trigger
        end note
    }

    state Critico {
        [*] --> Alerta_Admin
        note right of Alerta_Admin
            • Notificación urgente
            • Visible en dashboard
            • Icono de advertencia
        end note
    }

    state Agotado {
        [*] --> No_Disponible
        note right of No_Disponible
            • No se puede agregar al carrito
            • Mensaje "Agotado"
            • No visible en búsquedas
        end note
    }

    note right of Normal
        • Stock saludable
        • Ventas normales
        • Sin alertas
    end note

    note right of Muy_Bajo
        • Requiere atención
        • Prioridad alta
        • Limitar compras grandes
    end note
```

### Tabla de Transiciones

| Estado Origen | Evento | Acción | Estado Destino |
|---------------|--------|--------|----------------|
| Normal | stock <= stock_minimo | Notificar proveedor, trigger recarga auto | Bajo |
| Bajo | stock < (stock_minimo / 2) | Alerta urgente, priorizar recarga | Muy_Bajo |
| Muy_Bajo | stock <= 5 | Alerta crítica admin, limitar ventas | Critico |
| Critico | stock = 0 | Ocultar producto, desactivar ventas | Agotado |
| Bajo/Muy_Bajo/Critico/Agotado | Recarga | Aumentar stock, cancelar alertas | Normal |

### Acciones por Estado

```python
# Comportamiento del Sistema por Estado

Estado.NORMAL:
    - Visible en catálogo: SÍ
    - Permite compra: SÍ
    - Límite de compra: Sin límite
    - Alertas: NO
    - Recarga automática: NO

Estado.BAJO:
    - Visible en catálogo: SÍ
    - Permite compra: SÍ
    - Límite de compra: Normal
    - Alertas: Proveedor notificado
    - Recarga automática: SÍ (si activa)

Estado.MUY_BAJO:
    - Visible en catálogo: SÍ
    - Permite compra: SÍ
    - Límite de compra: Max 3 unidades
    - Alertas: Proveedor + Admin
    - Recarga automática: SÍ (prioridad alta)

Estado.CRITICO:
    - Visible en catálogo: SÍ (con advertencia)
    - Permite compra: SÍ
    - Límite de compra: Max 1 unidad
    - Alertas: Urgente a Admin
    - Recarga automática: SÍ (prioridad máxima)

Estado.AGOTADO:
    - Visible en catálogo: NO (o con "Agotado")
    - Permite compra: NO
    - Límite de compra: 0
    - Alertas: Admin notificado
    - Recarga automática: Esperando recarga
```

---

## 🔗 INTERACCIONES ENTRE MÁQUINAS DE ESTADO

### Pedido ↔ Pago

```
Pago:APROBADO → Pedido:PENDIENTE
Pedido:CANCELADO → Pago:REEMBOLSADO
Pedido:ENTREGADO → Pago:COMPLETADO
```

### Pedido ↔ Stock

```
Pedido:PENDIENTE → Stock: reducir cantidad
Pedido:CANCELADO → Stock: devolver cantidad
Stock:AGOTADO → Pedido: no permitir crear
```

### Usuario ↔ Pedido

```
Usuario:SUSPENDIDA_ADMIN → Pedidos: cancelar pendientes
Usuario:AUTO_DESACTIVADA → Pedidos: mantener histórico
Usuario:ELIMINADA → Pedidos: anonimizar cliente
```

### Stock ↔ Notificación

```
Stock:BAJO → Notificación:PENDIENTE (tipo: stock_bajo)
Stock:CRITICO → Notificación:PENDIENTE (tipo: stock_critico)
Stock:AGOTADO → Notificación:PENDIENTE (tipo: agotado)
```

---

## 📊 RESUMEN DE ESTADOS POR ENTIDAD

| Entidad | Estados Posibles | Estado Inicial | Estados Finales |
|---------|------------------|----------------|-----------------|
| **Pedido** | Pendiente, Preparando, En_Transito, Problema_Entrega, Entregado, Cancelado | Pendiente | Entregado, Cancelado |
| **Usuario** | Activa, Auto_Desactivada, Suspendida_Admin, Inactiva, Eliminada | Activa | Eliminada |
| **Pago** | Pendiente, Procesando, Aprobado, Confirmado, Completado, Rechazado, Error, Reembolsado | Pendiente | Completado, Rechazado, Reembolsado, Error |
| **Notificación** | Pendiente, Encolada, Enviando, Enviada, Leida, Fallida, Reintentando, Fallida_Final | Pendiente | Leida, Fallida_Final |
| **Stock** | Normal, Bajo, Muy_Bajo, Critico, Agotado | Normal | - (cíclico) |

---

**Documento generado**: 2025-12-04  
**Versión**: 1.0  
**Estado**: ✅ Completado
