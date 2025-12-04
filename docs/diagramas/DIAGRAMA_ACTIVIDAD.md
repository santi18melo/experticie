# 🔀 DIAGRAMAS DE ACTIVIDAD - PREXCOL

**Proyecto**: PREXCOL  
**Fecha**: 2025-12-04  
**Tipo**: Diagramas de Comportamiento - Flujos de Proceso

---

## 📋 ÍNDICE

1. [Registro de Usuario](#registro-de-usuario)
2. [Proceso de Compra Completo](#proceso-de-compra-completo)
3. [Gestión de Pedido (Logística)](#gestión-de-pedido-logística)
4. [Recarga Automática de Stock](#recarga-automática-de-stock)
5. [Asignación de Productos a Proveedor](#asignación-de-productos-a-proveedor)

---

## 👤 REGISTRO DE USUARIO

```mermaid
flowchart TD
    Start([Inicio]) --> Input[Usuario completa formulario]
    Input --> ValidateClient{Validación<br/>cliente OK?}
    
    ValidateClient -->|No| ShowError1[Mostrar errores<br/>de validación]
    ShowError1 --> Input
    
    ValidateClient -->|Sí| Submit[Enviar a backend]
    Submit --> CheckEmail{Email<br/>único?}
    
    CheckEmail -->|No| EmailExists[Error: Email ya existe]
    EmailExists --> Input
    
    CheckEmail -->|Sí| CheckPass{Password<br/>válido?}
    
    CheckPass -->|No| PassWeak[Error: Password débil]
    PassWeak --> Input
    
    CheckPass -->|Sí| CreateUser[Crear usuario en DB]
    CreateUser --> SaveHistory[Guardar password<br/>en historial]
    SaveHistory --> SendEmail[Enviar email<br/>de bienvenida]
    SendEmail --> ShowSuccess[Mensaje: Registro exitoso]
    ShowSuccess --> RedirectLogin[Redirect a Login]
    RedirectLogin --> End([Fin])
    
    style Start fill:#90EE90
    style End fill:#90EE90
    style ShowError1 fill:#FFB6C1
    style EmailExists fill:#FFB6C1
    style PassWeak fill:#FFB6C1
```

---

## 🛒 PROCESO DE COMPRA COMPLETO

```mermaid
flowchart TD
    Start([Inicio: Cliente en catálogo]) --> Browse[Navegar productos]
    Browse --> SelectProduct[Seleccionar producto]
    SelectProduct --> ViewDetails[Ver detalles]
    
    ViewDetails --> CheckStock{Stock<br/>disponible?}
    CheckStock -->|No| OutOfStock[Mostrar "Agotado"]
    OutOfStock --> Browse
    
    CheckStock -->|Sí| AddCart[Agregar al carrito]
    AddCart --> MoreProducts{Agregar<br/>más productos?}
    
    MoreProducts -->|Sí| Browse
    MoreProducts -->|No| ViewCart[Ver carrito]
    
    ViewCart --> AdjustQty{Ajustar<br/>cantidades?}
    AdjustQty -->|Sí| ModifyCart[Modificar carrito]
    ModifyCart --> ViewCart
    
    AdjustQty -->|No| Checkout[Proceder al pago]
    Checkout --> ValidateStock{Todo el stock<br/>disponible?}
    
    ValidateStock -->|No| StockError[Error: Stock insuficiente]
    StockError --> ViewCart
    
    ValidateStock -->|Sí| SelectPayment[Seleccionar método<br/>de pago]
    SelectPayment --> PaymentMethod{Método?}
    
    PaymentMethod -->|Tarjeta| EnterCard[Ingresar datos<br/>de tarjeta]
    PaymentMethod -->|Transferencia| UploadProof[Subir comprobante]
    PaymentMethod -->|PSE| LoginBank[Login banco]
    
    EnterCard --> ProcessPayment[Procesar pago]
    UploadProof --> ProcessPayment
    LoginBank --> ProcessPayment
    
    ProcessPayment --> PaymentResult{Pago<br/>exitoso?}
    
    PaymentResult -->|No| PaymentFailed[Pago rechazado]
    PaymentFailed --> RetryPayment{Reintentar?}
    RetryPayment -->|Sí| SelectPayment
    RetryPayment -->|No| CancelOrder[Cancelar orden]
    CancelOrder --> End1([Fin: Sin pedido])
    
    PaymentResult -->|Sí| CreateOrder[Crear pedido]
    CreateOrder --> ReduceStock[Reducir stock]
    ReduceStock --> SendNotifications[Enviar notificaciones<br/>• Cliente<br/>• Logística<br/>• Proveedor]
    SendNotifications --> ShowConfirmation[Mostrar confirmación<br/>con número de pedido]
    ShowConfirmation --> SendConfirmEmail[Enviar email<br/>de confirmación]
    SendConfirmEmail --> End2([Fin: Pedido creado])
    
    style Start fill:#90EE90
    style End1 fill:#FFB6C1
    style End2 fill:#90EE90
    style OutOfStock fill:#FFA500
    style StockError fill:#FFB6C1
    style PaymentFailed fill:#FFB6C1
```

---

## 🚚 GESTIÓN DE PEDIDO (LOGÍSTICA)

```mermaid
flowchart TD
    Start([Inicio]) --> Login[Logística inicia sesión]
    Login --> Dashboard[Ver dashboard]
    Dashboard --> ViewPending[Ver pedidos pendientes]
    
    ViewPending --> SelectOrder[Seleccionar pedido]
    SelectOrder --> ViewDetails[Ver detalles]
    ViewDetails --> CheckInventory{Productos<br/>disponibles?}
    
    CheckInventory -->|No| ReportIssue[Reportar problema]
    ReportIssue --> NotifyAdmin[Notificar admin]
    NotifyAdmin --> WaitResolution[Esperar resolución]
    WaitResolution --> End1([Fin: Pendiente])
    
    CheckInventory -->|Sí| StartPrep[Iniciar preparación]
    StartPrep --> ChangeStatus1[Cambiar estado:<br/>PREPARANDO]
    ChangeStatus1 --> NotifyClient1[Notificar cliente]
    
    NotifyClient1 --> PickProducts[Recolectar productos]
    PickProducts --> VerifyItems[Verificar items]
    VerifyItems --> PackOrder[Empacar pedido]
    PackOrder --> PrintLabel[Imprimir etiqueta]
    
    PrintLabel --> ReadyShip{Listo para<br/>enviar?}
    ReadyShip -->|No| CheckIssue{Hay<br/>problema?}
    CheckIssue -->|Sí| ReportIssue
    CheckIssue -->|No| PickProducts
    
    ReadyShip -->|Sí| ChangeStatus2[Cambiar estado:<br/>EN_TRANSITO]
    ChangeStatus2 --> NotifyClient2[Notificar cliente]
    NotifyClient2 --> AssignCourier[Asignar transportista]
    
    AssignCourier --> InTransit[Pedido en tránsito]
    InTransit --> WaitDelivery[Esperar confirmación<br/>de entrega]
    
    WaitDelivery --> DeliveryConfirm{Entrega<br/>confirmada?}
    DeliveryConfirm -->|No| DeliveryIssue{Hay<br/>problema?}
    DeliveryIssue -->|Sí| ContactClient[Contactar cliente]
    ContactClient --> Reschedule[Reprogramar entrega]
    Reschedule --> InTransit
    
    DeliveryIssue -->|No| WaitDelivery
    
    DeliveryConfirm -->|Sí| ChangeStatus3[Cambiar estado:<br/>ENTREGADO]
    ChangeStatus3 --> GenerateSale[Generar registro<br/>de venta]
    GenerateSale --> NotifyClient3[Notificar cliente]
    NotifyClient3 --> UpdateMetrics[Actualizar métricas]
    UpdateMetrics --> End2([Fin: Completado])
    
    style Start fill:#90EE90
    style End1 fill:#FFA500
    style End2 fill:#90EE90
    style ReportIssue fill:#FFB6C1
    style ContactClient fill:#FFA500
```

---

## 🔄 RECARGA AUTOMÁTICA DE STOCK

```mermaid
flowchart TD
    Start([Inicio: Timer]) --> Trigger[Celery Beat trigger<br/>cada 1 hora]
    Trigger --> GetProducts[Obtener productos con<br/>recarga automática activa]
    GetProducts --> Loop{Más productos<br/>por revisar?}
    
    Loop -->|No| EndProcess[Finalizar proceso]
    EndProcess --> End([Fin])
    
    Loop -->|Sí| NextProduct[Siguiente producto]
    NextProduct --> CheckStock{Stock actual <=<br/>Stock mínimo?}
    
    CheckStock -->|No| SkipProduct[No requiere recarga]
    SkipProduct --> Loop
    
    CheckStock -->|Sí| BeginTrans[BEGIN TRANSACTION]
    BeginTrans --> CalcRecharge[Calcular cantidad<br/>de recarga]
    CalcRecharge --> UpdateStock[UPDATE stock<br/>stock += cantidad_recarga]
    
    UpdateStock --> LogHistory[INSERT historial_recarga<br/>tipo: automática]
    LogHistory --> UpdateConfig[UPDATE stock_config<br/>• ultima_recarga<br/>• total_recargas++]
    
    UpdateConfig --> Commit[COMMIT TRANSACTION]
    Commit --> SendNotif[Enviar notificación<br/>a proveedor]
    SendNotif --> LogEvent[Registrar en log]
    LogEvent --> Loop
    
    BeginTrans -.Error.-> Rollback[ROLLBACK]
    Rollback --> LogError[Registrar error]
    LogError --> NotifyAdmin[Notificar admin]
    NotifyAdmin --> Loop
    
    style Start fill:#90EE90
    style End fill:#90EE90
    style SkipProduct fill:#D3D3D3
    style Rollback fill:#FFB6C1
```

---

## 👨‍💼 ASIGNACIÓN DE PRODUCTOS A PROVEEDOR

```mermaid
flowchart TD
    Start([Inicio]) --> AdminLogin[Admin inicia sesión]
    AdminLogin --> NavProducts[Navegar a<br/>Gestión de Productos]
    NavProducts --> ViewProducts[Ver lista de productos]
    
    ViewProducts --> SelectProduct[Seleccionar producto]
    SelectProduct --> ViewCurrent{Proveedor<br/>actual?}
    
    ViewCurrent -->|No| NewAssign[Nueva asignación]
    ViewCurrent -->|Sí| ConfirmChange{Confirmar<br/>cambio?}
    ConfirmChange -->|No| ViewProducts
    ConfirmChange -->|Sí| NewAssign
    
    NewAssign --> GetProviders[Obtener lista de<br/>proveedores activos]
    GetProviders --> SelectProvider[Seleccionar proveedor]
    
    SelectProvider --> ValidateProvider{Proveedor<br/>válido?}
    ValidateProvider -->|No| ErrorInvalid[Error: Proveedor inválido]
    ErrorInvalid --> GetProviders
    
    ValidateProvider -->|Sí| ConfirmAssign[Confirmar asignación]
    ConfirmAssign --> UpdateProduct[UPDATE producto<br/>SET proveedor_id]
    
    UpdateProduct --> CheckAutoStock{Configurar<br/>recarga auto?}
    CheckAutoStock -->|Sí| ConfigStock[Configurar<br/>stock_config]
    ConfigStock --> SetMinStock[Establecer stock_minimo]
    SetMinStock --> SetRechargeQty[Establecer cantidad_recarga]
    SetRechargeQty --> EnableAuto[Activar recarga_automatica]
    EnableAuto --> SaveConfig[Guardar configuración]
    SaveConfig --> NotifyProvider
    
    CheckAutoStock -->|No| NotifyProvider[Notificar proveedor]
    NotifyProvider --> LogChange[Registrar cambio<br/>en auditoría]
    LogChange --> ShowSuccess[Mostrar mensaje<br/>de éxito]
    ShowSuccess --> MoreAssign{Asignar<br/>más productos?}
    
    MoreAssign -->|Sí| ViewProducts
    MoreAssign -->|No| End([Fin])
    
    style Start fill:#90EE90
    style End fill:#90EE90
    style ErrorInvalid fill:#FFB6C1
```

---

## 📊 GENERACIÓN DE REPORTES

```mermaid
flowchart TD
    Start([Inicio]) --> Login{Usuario<br/>autenticado?}
    Login -->|No| RedirectLogin[Redirect a login]
    RedirectLogin --> End1([Fin])
    
    Login -->|Sí| CheckRole{Rol de<br/>usuario?}
    
    CheckRole -->|Admin| AdminDash[Dashboard Admin]
    CheckRole -->|Proveedor| ProvDash[Dashboard Proveedor]
    CheckRole -->|Logística| LogiDash[Dashboard Logística]
    CheckRole -->|Cliente| ClientDash[Dashboard Cliente]
    
    AdminDash --> SelectReportType[Seleccionar tipo<br/>de reporte]
    SelectReportType --> ReportType{Tipo?}
    
    ReportType -->|Ventas| SalesReport[Reporte de ventas]
    ReportType -->|Stock| StockReport[Reporte de stock]
    ReportType -->|Usuarios| UsersReport[Reporte de usuarios]
    ReportType -->|Pedidos| OrdersReport[Reporte de pedidos]
    
    SalesReport --> SetDateRange[Establecer rango<br/>de fechas]
    StockReport --> SetFilters[Establecer filtros]
    UsersReport --> SetFilters
    OrdersReport --> SetDateRange
    
    SetDateRange --> QueryDB[Consultar base<br/>de datos]
    SetFilters --> QueryDB
    
    QueryDB --> ProcessData[Procesar datos]
    ProcessData --> GenerateChart[Generar gráficos]
    GenerateChart --> FormatReport[Formatear reporte]
    
    FormatReport --> ExportFormat{Formato de<br/>exportación?}
    ExportFormat -->|PDF| GenPDF[Generar PDF]
    ExportFormat -->|Excel| GenExcel[Generar Excel]
    ExportFormat -->|CSV| GenCSV[Generar CSV]
    
    GenPDF --> Download[Descargar archivo]
    GenExcel --> Download
    GenCSV --> Download
    
    Download --> SaveHistory[Guardar en historial<br/>de reportes]
    SaveHistory --> End2([Fin])
    
    ProvDash --> ProvReports[Reportes de proveedor]
    LogiDash --> LogiReports[Reportes de logística]
    ClientDash --> ClientReports[Reportes de cliente]
    
    ProvReports --> SetFilters
    LogiReports --> SetFilters
    ClientReports --> SetDateRange
    
    style Start fill:#90EE90
    style End1 fill:#FFB6C1
    style End2 fill:#90EE90
```

---

## 🔐 GESTIÓN DE CUENTA DE USUARIO

```mermaid
flowchart TD
    Start([Inicio]) --> ViewProfile[Ver perfil]
    ViewProfile --> SelectAction{Acción?}
    
    SelectAction -->|Editar perfil| EditProfile[Editar información]
    SelectAction -->|Cambiar password| ChangePass[Cambiar contraseña]
    SelectAction -->|Desactivar cuenta| DeactivateAcc[Desactivar cuenta]
    SelectAction -->|Eliminar cuenta| DeleteAcc[Solicitar eliminación]
    
    EditProfile --> InputChanges[Ingresar cambios]
    InputChanges --> ValidateChanges{Datos<br/>válidos?}
    ValidateChanges -->|No| ShowErrors[Mostrar errores]
    ShowErrors --> InputChanges
    ValidateChanges -->|Sí| SaveChanges[Guardar cambios]
    SaveChanges --> SuccessMsg[Mensaje de éxito]
    SuccessMsg --> ViewProfile
    
    ChangePass --> InputOldPass[Ingresar contraseña<br/>actual]
    InputOldPass --> VerifyOldPass{Contraseña<br/>correcta?}
    VerifyOldPass -->|No| ErrorOldPass[Error: Contraseña<br/>incorrecta]
    ErrorOldPass --> ChangePass
    
    VerifyOldPass -->|Sí| InputNewPass[Ingresar nueva<br/>contraseña]
    InputNewPass --> CheckStrength{Contraseña<br/>fuerte?}
    CheckStrength -->|No| ErrorWeak[Error: Contraseña<br/>débil]
    ErrorWeak --> InputNewPass
    
    CheckStrength -->|Sí| CheckHistory{Ya usada<br/>antes?}
    CheckHistory -->|Sí| ErrorUsed[Error: Contraseña<br/>ya utilizada]
    ErrorUsed --> InputNewPass
    
    CheckHistory -->|No| UpdatePass[Actualizar contraseña]
    UpdatePass --> SaveHistory[Guardar en historial]
    SaveHistory --> LogoutAll[Cerrar sesión en<br/>todos los dispositivos]
    LogoutAll --> Redirect[Redirect a login]
    Redirect --> End1([Fin: Reautenticarse])
    
    DeactivateAcc --> ConfirmDeact{Confirmar<br/>desactivación?}
    ConfirmDeact -->|No| ViewProfile
    ConfirmDeact -->|Sí| SetSelfDeact[SET self_deactivated=true]
    SetSelfDeact --> Logout[Cerrar sesión]
    Logout --> ShowInfo[Mostrar info:<br/>Puede reactivar]
    ShowInfo --> End2([Fin: Cuenta desactivada])
    
    DeleteAcc --> ConfirmDelete{Confirmar<br/>eliminación?}
    ConfirmDelete -->|No| ViewProfile
    ConfirmDelete -->|Sí| NotifyAdmin[Notificar admin]
    NotifyAdmin --> PendingReview[Pendiente de revisión]
    PendingReview --> End3([Fin: Solicitud enviada])
    
    style Start fill:#90EE90
    style End1 fill:#87CEEB
    style End2 fill:#FFA500
    style End3 fill:#FFA500
    style ErrorOldPass fill:#FFB6C1
    style ErrorWeak fill:#FFB6C1
    style ErrorUsed fill:#FFB6C1
```

---

**Documento generado**: 2025-12-04  
**Versión**: 1.0  
**Estado**: ✅ Completado
