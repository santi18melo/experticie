# 🔄 DIAGRAMAS DE SECUENCIA - PREXCOL

**Proyecto**: PREXCOL  
**Fecha**: 2025-12-04  
**Tipo**: Diagramas de Comportamiento - Interacción

---

## 📋 ÍNDICE

1. [Autenticación](#autenticación)
2. [Gestión de Pedidos](#gestión-de-pedidos)
3. [Procesar Pago](#procesar-pago)
4. [Recarga de Stock](#recarga-de-stock)
5. [Notificaciones](#notificaciones)

---

## 🔐 AUTENTICACIÓN

### Secuencia: Login de Usuario

```mermaid
sequenceDiagram
    actor Usuario
    participant UI as Frontend<br/>(React)
    participant API as Backend API<br/>(Django)
    participant Auth as Auth Service
    participant DB as Database
    participant Token as JWT Generator

    Usuario->>UI: 1. Ingresa email/password
    UI->>UI: 2. Valida formato
    UI->>API: 3. POST /api/auth/login<br/>{email, password}
    
    API->>Auth: 4. validate_credentials()
    Auth->>DB: 5. SELECT * FROM usuarios<br/>WHERE email=?
    DB-->>Auth: 6. Usuario data
    
    Auth->>Auth: 7. check_password()
    Auth->>Auth: 8. verify_account_status()
    
    alt Credenciales válidas & cuenta activa
        Auth->>Token: 9. generate_tokens(user)
        Token->>Token: 10. Create access_token (15min)
        Token->>Token: 11. Create refresh_token (7 días)
        Token-->>Auth: 12. {access, refresh}
        
        Auth->>DB: 13. UPDATE ultimo_ingreso
        Auth-->>API: 14. {user, tokens}
        API-->>UI: 15. 200 OK<br/>{user, access_token, refresh_token}
        
        UI->>UI: 16. Store tokens (localStorage)
        UI->>UI: 17. Redirect to dashboard
        UI-->>Usuario: 18. Mostrar dashboard
    else Credenciales inválidas
        Auth-->>API: Error: Invalid credentials
        API-->>UI: 401 Unauthorized
        UI-->>Usuario: Mostrar error
    else Cuenta suspendida
        Auth-->>API: Error: Account suspended
        API-->>UI: 403 Forbidden
        UI-->>Usuario: Contactar soporte
    end
```

### Secuencia: Registro de Usuario

```mermaid
sequenceDiagram
    actor Usuario
    participant UI as Frontend
    participant API as Backend API
    participant Validator as Password<br/>Validator
    participant DB as Database
    participant Email as Email<br/>Service

    Usuario->>UI: 1. Completa formulario
    UI->>UI: 2. Validación cliente
    UI->>API: 3. POST /api/auth/register<br/>{email, nombre, password, rol}
    
    API->>DB: 4. Check email único
    alt Email ya existe
        DB-->>API: Email exists
        API-->>UI: 400 Bad Request
        UI-->>Usuario: Email en uso
    else Email disponible
        API->>Validator: 5. validate_password()
        Validator->>Validator: 6. Check strength
        
        alt Password débil
            Validator-->>API: Weak password
            API-->>UI: 400 Bad Request
            UI-->>Usuario: Password requirements
        else Password válido
            API->>DB: 7. INSERT usuario
            API->>DB: 8. INSERT password_history
            DB-->>API: 9. Usuario creado
            
            API->>Email: 10. send_welcome_email()
            Email-->>API: 11. Email sent
            
            API-->>UI: 12. 201 Created<br/>{user}
            UI-->>Usuario: 13. Registro exitoso
            UI->>UI: 14. Redirect to login
        end
    end
```

### Secuencia: Refresh Token

```mermaid
sequenceDiagram
    participant UI as Frontend
    participant API as Backend API
    participant Token as JWT Service
    participant DB as Database

    UI->>UI: 1. Access token expirado
    UI->>API: 2. POST /api/auth/refresh<br/>{refresh_token}
    
    API->>Token: 3. validate_refresh_token()
    
    alt Token válido y no expirado
        Token->>DB: 4. Verify user exists & active
        DB-->>Token: 5. User data
        
        Token->>Token: 6. Generate new access_token
        Token-->>API: 7. {new_access_token}
        
        API-->>UI: 8. 200 OK<br/>{access_token}
        UI->>UI: 9. Update stored token
        UI->>UI: 10. Retry original request
    else Token inválido o expirado
        Token-->>API: Invalid refresh token
        API-->>UI: 401 Unauthorized
        UI->>UI: Clear tokens
        UI->>UI: Redirect to login
    end
```

### Secuencia: Reset Password

```mermaid
sequenceDiagram
    actor Usuario
    participant UI as Frontend
    participant API as Backend API
    participant Token as Token<br/>Generator
    participant DB as Database
    participant Email as Email<br/>Service

    rect rgb(200, 220, 240)
        Note over Usuario,Email: Fase 1: Solicitud de Reset
        Usuario->>UI: 1. Click "Olvidé mi contraseña"
        UI->>UI: 2. Mostrar formulario
        Usuario->>UI: 3. Ingresa email
        UI->>API: 4. POST /api/auth/forgot-password<br/>{email}
        
        API->>DB: 5. Find user by email
        
        alt Usuario existe
            DB-->>API: 6. Usuario data
            API->>Token: 7. generate_reset_token()
            Token-->>API: 8. {uid, token}
            
            API->>DB: 9. Store reset token
            API->>Email: 10. send_reset_email(uid, token)
            Email-->>API: 11. Email sent
            
            API-->>UI: 12. 200 OK
            UI-->>Usuario: 13. "Revisa tu email"
        else Usuario no existe
            API-->>UI: 200 OK (por seguridad)
            UI-->>Usuario: "Revisa tu email"
        end
    end

    rect rgb(220, 240, 200)
        Note over Usuario,Email: Fase 2: Reset de Contraseña
        Usuario->>Usuario: 14. Abre email
        Usuario->>UI: 15. Click link reset
        UI->>API: 16. GET /reset-password/{uid}/{token}
        
        API->>Token: 17. validate_reset_token()
        
        alt Token válido
            Token-->>API: Valid
            API-->>UI: 18. Show reset form
            
            Usuario->>UI: 19. Ingresa nueva password
            UI->>API: 20. POST /api/auth/reset-password<br/>{uid, token, new_password}
            
            API->>Token: 21. verify_token()
            API->>DB: 22. Get password_history
            
            alt Password no reutilizada
                API->>DB: 23. UPDATE password
                API->>DB: 24. INSERT password_history
                API->>DB: 25. DELETE reset_token
                
                API-->>UI: 26. 200 OK
                UI-->>Usuario: 27. "Password actualizado"
                UI->>UI: 28. Redirect to login
            else Password ya usada
                API-->>UI: 400 Bad Request
                UI-->>Usuario: "Password ya usada"
            end
        else Token inválido/expirado
            Token-->>API: Invalid
            API-->>UI: 400 Bad Request
            UI-->>Usuario: "Link expirado"
        end
    end
```

---

## 🛒 GESTIÓN DE PEDIDOS

### Secuencia: Crear Pedido

```mermaid
sequenceDiagram
    actor Cliente
    participant UI as Frontend
    participant API as Backend API
    participant Order as Order<br/>Service
    participant Stock as Stock<br/>Service
    participant DB as Database
    participant Notif as Notification<br/>Service

    Cliente->>UI: 1. Agrega productos al carrito
    Cliente->>UI: 2. Click "Confirmar pedido"
    
    UI->>UI: 3. Valida carrito no vacío
    UI->>API: 4. POST /api/pedidos<br/>{items: [{producto_id, cantidad}]}
    
    API->>Order: 5. create_order(items)
    
    loop Por cada item
        Order->>Stock: 6. validate_stock(producto, cantidad)
        Stock->>DB: 7. SELECT stock FROM productos
        DB-->>Stock: 8. Stock actual
        
        alt Stock suficiente
            Stock-->>Order: OK
        else Stock insuficiente
            Stock-->>Order: Stock insuficiente
            Order-->>API: Error
            API-->>UI: 400 Bad Request
            UI-->>Cliente: "Stock insuficiente"
        end
    end
    
    Order->>DB: 9. BEGIN TRANSACTION
    Order->>DB: 10. INSERT INTO pedidos
    
    loop Por cada item
        Order->>DB: 11. INSERT INTO detalle_pedido
        Order->>Stock: 12. reduce_stock(producto, cantidad)
        Stock->>DB: 13. UPDATE stock
    end
    
    Order->>Order: 14. calculate_total()
    Order->>DB: 15. UPDATE pedido SET total
    
    Order->>DB: 16. COMMIT TRANSACTION
    
    Order->>Notif: 17. notify_order_created()
    Notif->>Notif: 18. Create notifications
    Notif-->>Order: OK
    
    Order-->>API: 19. Pedido creado
    API-->>UI: 20. 201 Created {pedido}
    UI-->>Cliente: 21. "Pedido creado exitosamente"
    UI->>UI: 22. Redirect to pagos
```

### Secuencia: Cambiar Estado de Pedido

```mermaid
sequenceDiagram
    actor Logistica
    participant UI as Frontend
    participant API as Backend API
    participant Order as Order<br/>Service
    participant DB as Database
    participant Venta as Venta<br/>Service
    participant Notif as Notification<br/>Service

    Logistica->>UI: 1. Selecciona pedido
    Logistica->>UI: 2. Click "Cambiar estado"
    
    UI->>API: 3. PATCH /api/pedidos/{id}<br/>{estado: "nuevo_estado"}
    
    API->>Order: 4. update_status(pedido_id, nuevo_estado)
    Order->>DB: 5. SELECT pedido WHERE id=?
    DB-->>Order: 6. Pedido actual
    
    Order->>Order: 7. validate_transition()
    
    alt Transición válida
        Order->>DB: 8. UPDATE pedido SET estado
        DB-->>Order: 9. Updated
        
        alt Estado = "entregado"
            Order->>Venta: 10. create_venta(pedido)
            Venta->>DB: 11. INSERT INTO ventas
            Venta->>DB: 12. INSERT INTO detalle_ventas
            Venta-->>Order: 13. Venta creada
        end
        
        Order->>Notif: 14. notify_status_change()
        Notif->>Notif: 15. Send email to cliente
        Notif-->>Order: 16. Notification sent
        
        Order-->>API: 17. Pedido actualizado
        API-->>UI: 18. 200 OK {pedido}
        UI-->>Logistica: 19. "Estado actualizado"
    else Transición inválida
        Order-->>API: Error: Invalid transition
        API-->>UI: 400 Bad Request
        UI-->>Logistica: "Transición no permitida"
    end
```

---

## 💳 PROCESAR PAGO

### Secuencia: Pago con Tarjeta

```mermaid
sequenceDiagram
    actor Cliente
    participant UI as Frontend
    participant API as Backend API
    participant Payment as Payment<br/>Service
    participant Gateway as Payment<br/>Gateway
    participant DB as Database
    participant Order as Order<br/>Service
    participant Notif as Notification<br/>Service

    Cliente->>UI: 1. Selecciona método pago
    Cliente->>UI: 2. Ingresa datos tarjeta
    
    UI->>UI: 3. Valida formato tarjeta
    UI->>API: 4. POST /api/pagos<br/>{pedido_id, metodo, datos}
    
    API->>Payment: 5. process_payment()
    Payment->>DB: 6. Get pedido details
    DB-->>Payment: 7. Pedido data
    
    Payment->>Gateway: 8. charge_card(amount, card_data)
    Gateway->>Gateway: 9. Process transaction
    
    alt Pago aprobado
        Gateway-->>Payment: 10. {status: approved, ref: XXX}
        
        Payment->>DB: 11. BEGIN TRANSACTION
        Payment->>DB: 12. INSERT INTO pagos
        Payment->>DB: 13. INSERT INTO transacciones
        Payment->>DB: 14. COMMIT
        
        Payment->>Order: 15. confirm_payment(pedido_id)
        Order->>DB: 16. UPDATE pedido SET estado='pendiente'
        Order-->>Payment: 17. OK
        
        Payment->>Notif: 18. notify_payment_success()
        Notif->>Notif: 19. Send confirmation email
        Notif-->>Payment: 20. Sent
        
        Payment-->>API: 21. Payment successful
        API-->>UI: 22. 200 OK {pago}
        UI-->>Cliente: 23. "Pago exitoso"
        UI->>UI: 24. Show confirmation
        
    else Pago rechazado
        Gateway-->>Payment: {status: declined, reason}
        
        Payment->>DB: INSERT failed transaction
        Payment-->>API: Payment declined
        API-->>UI: 402 Payment Required
        UI-->>Cliente: "Pago rechazado"
        UI->>UI: Retry option
        
    else Error de gateway
        Gateway-->>Payment: Error
        Payment->>DB: Log error
        Payment-->>API: Gateway error
        API-->>UI: 500 Server Error
        UI-->>Cliente: "Error procesando pago"
        UI->>UI: Contact support
    end
```

---

## 📦 RECARGA DE STOCK

### Secuencia: Recarga Automática

```mermaid
sequenceDiagram
    participant Beat as Celery Beat<br/>(Scheduler)
    participant Worker as Celery Worker
    participant Stock as Stock<br/>Service
    participant DB as Database
    participant Notif as Notification<br/>Service

    Beat->>Beat: 1. Timer triggers<br/>(cada 1 hora)
    Beat->>Worker: 2. Task: check_stock_levels
    
    Worker->>Stock: 3. monitor_all_products()
    Stock->>DB: 4. SELECT productos, stock_config<br/>WHERE recarga_automatica_activa
    DB-->>Stock: 5. Products list
    
    loop Por cada producto
        Stock->>Stock: 6. config.necesita_recarga()?
        
        alt Stock <= stock_minimo
            Stock->>DB: 7. BEGIN TRANSACTION
            Stock->>DB: 8. UPDATE productos<br/>SET stock += cantidad_recarga
            
            Stock->>DB: 9. INSERT INTO historial_recarga<br/>(tipo='automatica')
            
            Stock->>DB: 10. UPDATE stock_config<br/>SET ultima_recarga, total_recargas
            
            Stock->>DB: 11. COMMIT
            
            Stock->>Notif: 12. notify_auto_recharge()
            Notif->>Notif: 13. Email to proveedor
            Notif-->>Stock: 14. Sent
            
            Stock-->>Worker: 15. Recarga ejecutada
        else Stock > stock_minimo
            Stock-->>Worker: No action needed
        end
    end
    
    Worker-->>Beat: 16. Task completed
```

### Secuencia: Recarga Manual

```mermaid
sequenceDiagram
    actor Proveedor
    participant UI as Frontend
    participant API as Backend API
    participant Stock as Stock<br/>Service
    participant DB as Database
    participant Notif as Notification<br/>Service

    Proveedor->>UI: 1. Navega a "Mis Productos"
    UI->>API: 2. GET /api/productos/mis-productos
    API-->>UI: 3. Lista de productos
    
    Proveedor->>UI: 4. Selecciona producto
    Proveedor->>UI: 5. Click "Recargar Stock"
    Proveedor->>UI: 6. Ingresa cantidad
    
    UI->>API: 7. POST /api/productos/{id}/recargar<br/>{cantidad, notas}
    
    API->>Stock: 8. manual_recharge(producto, cantidad)
    Stock->>DB: 9. SELECT producto
    DB-->>Stock: 10. Producto data
    
    Stock->>DB: 11. BEGIN TRANSACTION
    
    Stock->>Stock: 12. stock_anterior = producto.stock
    Stock->>DB: 13. UPDATE productos<br/>SET stock += cantidad
    
    Stock->>DB: 14. INSERT INTO historial_recarga<br/>(tipo='manual', usuario=proveedor)
    
    Stock->>DB: 15. COMMIT
    
    Stock->>Notif: 16. notify_manual_recharge()
    Notif->>Notif: 17. Email to admin
    Notif-->>Stock: 18. Sent
    
    Stock-->>API: 19. Recarga exitosa
    API-->>UI: 20. 200 OK {producto}
    UI-->>Proveedor: 21. "Stock actualizado"
    UI->>UI: 22. Refresh product list
```

---

## 📧 NOTIFICACIONES

### Secuencia: Envío de Notificación

```mermaid
sequenceDiagram
    participant Trigger as Event<br/>Trigger
    participant Notif as Notification<br/>Service
    participant DB as Database
    participant Queue as Celery<br/>Queue
    participant Worker as Celery<br/>Worker
    participant Email as Email<br/>Service
    participant SMS as SMS<br/>Service

    Trigger->>Notif: 1. Event occurred<br/>(e.g., pedido creado)
    
    Notif->>Notif: 2. Determine recipients<br/>& notification type
    
    loop Por cada destinatario
        Notif->>DB: 3. INSERT INTO notificaciones<br/>(estado='pendiente')
        DB-->>Notif: 4. Notificacion ID
        
        Notif->>Queue: 5. Enqueue send task
    end
    
    Notif-->>Trigger: 6. Notifications queued
    
    Queue->>Worker: 7. Dequeue task
    Worker->>DB: 8. Get notification details
    DB-->>Worker: 9. Notification data
    
    alt Channel = Email
        Worker->>Email: 10. send_email()
        Email->>Email: 11. Connect to SMTP
        Email->>Email: 12. Send message
        
        alt Email sent
            Email-->>Worker: 13. Success
            Worker->>DB: 14. UPDATE notificaciones<br/>SET estado='enviada'
        else Send failed
            Email-->>Worker: Error
            Worker->>DB: UPDATE estado='fallida'
            Worker->>Queue: Retry task (max 3)
        end
        
    else Channel = SMS
        Worker->>SMS: send_sms()
        SMS-->>Worker: Result
        Worker->>DB: UPDATE notification
    end
    
    Worker->>DB: 15. Set fecha_envio
    Worker-->>Queue: 16. Task completed
```

---

**Documento generado**: 2025-12-04  
**Versión**: 1.0  
**Estado**: ✅ Completado
