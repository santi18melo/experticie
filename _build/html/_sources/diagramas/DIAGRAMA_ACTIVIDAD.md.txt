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
    Input --> ValidateClient{"Validación<br/>cliente OK?"}
    
    %% Happy Path
    ValidateClient -->|Sí| Submit[Enviar a backend]
    Submit --> CheckEmail{"Email<br/>único?"}
    
    CheckEmail -->|Sí| CheckPass{"Password<br/>válido?"}
    
    CheckPass -->|Sí| CreateUser[Crear usuario en DB]
    CreateUser --> SaveHistory["Guardar password<br/>en historial"]
    SaveHistory --> SendEmail["Enviar email<br/>de bienvenida"]
    SendEmail --> ShowSuccess[Mensaje: Registro exitoso]
    ShowSuccess --> RedirectLogin[Redirect a Login]
    RedirectLogin --> End([Fin])

    %% Error Loops (Dotted for cleaner visuals)
    ValidateClient -->|No| ShowError1["Mostrar errores<br/>de validación"]
    ShowError1 -.-> Input
    
    CheckEmail -->|No| EmailExists[Error: Email ya existe]
    EmailExists -.-> Input
    
    CheckPass -->|No| PassWeak[Error: Password débil]
    PassWeak -.-> Input
    
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
    
    ViewDetails --> CheckStock{"Stock<br/>disponible?"}
    
    CheckStock -->|Sí| AddCart[Agregar al carrito]
    AddCart --> MoreProducts{"Agregar<br/>más productos?"}
    
    MoreProducts -->|Sí| Browse
    MoreProducts -->|No| ViewCart[Ver carrito]
    
    ViewCart --> AdjustQty{"Ajustar<br/>cantidades?"}
    AdjustQty -->|Sí| ModifyCart[Modificar carrito]
    ModifyCart --> ViewCart
    
    AdjustQty -->|No| Checkout[Proceder al pago]
    Checkout --> ValidateStock{"Todo el stock<br/>disponible?"}
    
    ValidateStock -->|Sí| SelectPayment["Seleccionar método<br/>de pago"]
    SelectPayment --> PaymentMethod{Método?}
    
    PaymentMethod -->|Tarjeta| EnterCard["Ingresar datos<br/>de tarjeta"]
    PaymentMethod -->|Transferencia| UploadProof[Subir comprobante]
    PaymentMethod -->|PSE| LoginBank[Login banco]
    
    EnterCard --> ProcessPayment[Procesar pago]
    UploadProof --> ProcessPayment
    LoginBank --> ProcessPayment
    
    ProcessPayment --> PaymentResult{"Pago<br/>exitoso?"}
    
    PaymentResult -->|Sí| CreateOrder[Crear pedido]
    CreateOrder --> ReduceStock[Reducir stock]
    ReduceStock --> SendNotifications[Enviar notificaciones]
    SendNotifications --> ShowConfirmation[Mostrar confirmación]
    ShowConfirmation --> SendConfirmEmail["Enviar email<br/>de confirmación"]
    SendConfirmEmail --> End2([Fin: Pedido creado])

    %% Feedback / Alternate Paths
    CheckStock -->|No| OutOfStock[Mostrar "Agotado"]
    OutOfStock -.-> Browse
    
    ValidateStock -->|No| StockError[Error: Stock insuficiente]
    StockError -.-> ViewCart
    
    PaymentResult -->|No| PaymentFailed[Pago rechazado]
    PaymentFailed --> RetryPayment{Reintentar?}
    RetryPayment -->|Sí| SelectPayment
    RetryPayment -->|No| CancelOrder[Cancelar orden]
    CancelOrder --> End1([Fin: Sin pedido])
    
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
    ViewDetails --> CheckInventory{"Productos<br/>disponibles?"}
    
    CheckInventory -->|Sí| StartPrep[Iniciar preparación]
    StartPrep --> ChangeStatus1["Cambiar estado:<br/>PREPARANDO"]
    ChangeStatus1 --> NotifyClient1[Notificar cliente]
    
    NotifyClient1 --> PickProducts[Recolectar productos]
    PickProducts --> VerifyItems[Verificar items]
    VerifyItems --> PackOrder[Empacar pedido]
    PackOrder --> PrintLabel[Imprimir etiqueta]
    
    PrintLabel --> ReadyShip{"Listo para<br/>enviar?"}
    
    ReadyShip -->|Sí| ChangeStatus2["Cambiar estado:<br/>EN_TRANSITO"]
    ChangeStatus2 --> NotifyClient2[Notificar cliente]
    NotifyClient2 --> AssignCourier[Asignar transportista]
    
    AssignCourier --> InTransit[Pedido en tránsito]
    InTransit --> WaitDelivery["Esperar confirmación<br/>de entrega"]
    
    WaitDelivery --> DeliveryConfirm{"Entrega<br/>confirmada?"}
    
    DeliveryConfirm -->|Sí| ChangeStatus3["Cambiar estado:<br/>ENTREGADO"]
    ChangeStatus3 --> GenerateSale["Generar registro<br/>de venta"]
    GenerateSale --> NotifyClient3[Notificar cliente]
    NotifyClient3 --> UpdateMetrics[Actualizar métricas]
    UpdateMetrics --> End2([Fin: Completado])

    %% Exceptions
    CheckInventory -->|No| ReportIssue[Reportar problema]
    ReportIssue --> NotifyAdmin[Notificar admin]
    NotifyAdmin --> WaitResolution[Esperar resolución]
    WaitResolution --> End1([Fin: Pendiente])

    ReadyShip -->|No| CheckIssue{"Hay<br/>problema?"}
    CheckIssue -->|Sí| ReportIssue
    CheckIssue -->|No| PickProducts
    
    DeliveryConfirm -->|No| DeliveryIssue{"Hay<br/>problema?"}
    DeliveryIssue -->|Sí| ContactClient[Contactar cliente]
    ContactClient --> Reschedule[Reprogramar entrega]
    Reschedule -.-> InTransit
    DeliveryIssue -->|No| WaitDelivery
    
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
    Start([Inicio: Timer]) --> Trigger["Celery Beat trigger<br/>cada 1 hora"]
    Trigger --> GetProducts["Obtener productos con<br/>recarga automática activa"]
    GetProducts --> Loop{"Más productos<br/>por revisar?"}
    
    Loop -->|No| EndProcess[Finalizar proceso]
    EndProcess --> End([Fin])
    
    Loop -->|Sí| NextProduct[Siguiente producto]
    NextProduct --> CheckStock{"Stock actual <=<br/>Stock mínimo?"}
    
    CheckStock -->|No| SkipProduct[No requiere recarga]
    SkipProduct -.-> Loop
    
    CheckStock -->|Sí| BeginTrans[BEGIN TRANSACTION]
    BeginTrans --> CalcRecharge[Calcular cantidad]
    CalcRecharge --> UpdateStock[UPDATE stock]
    
    UpdateStock --> LogHistory[INSERT historial]
    LogHistory --> UpdateConfig[UPDATE config]
    
    UpdateConfig --> Commit[COMMIT TRANSACTION]
    Commit --> SendNotif[Notificar proveedor]
    SendNotif --> LogEvent[Registrar en log]
    LogEvent -.-> Loop
    
    BeginTrans -.Error.-> Rollback[ROLLBACK]
    Rollback --> LogError[Registrar error]
    LogError --> NotifyAdmin[Notificar admin]
    NotifyAdmin -.-> Loop
    
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
    AdminLogin --> NavProducts[Navegar Gestión]
    NavProducts --> ViewProducts[Ver lista productos]
    
    ViewProducts --> SelectProduct[Seleccionar producto]
    SelectProduct --> ViewCurrent{"Proveedor<br/>actual?"}
    
    ViewCurrent -->|Sí| ConfirmChange{"Confirmar<br/>cambio?"}
    ConfirmChange -->|No| ViewProducts
    ConfirmChange -->|Sí| NewAssign[Nueva asignación]
    ViewCurrent -->|No| NewAssign
    
    NewAssign --> GetProviders[Listar proveedores]
    GetProviders --> SelectProvider[Seleccionar proveedor]
    
    SelectProvider --> ValidateProvider{"Proveedor<br/>válido?"}
    ValidateProvider -->|No| ErrorInvalid[Error: Inválido]
    ErrorInvalid -.-> GetProviders
    
    ValidateProvider -->|Sí| ConfirmAssign[Confirmar]
    ConfirmAssign --> UpdateProduct[UPDATE producto]
    
    UpdateProduct --> CheckAutoStock{"Configurar<br/>recarga auto?"}
    CheckAutoStock -->|Sí| ConfigStock[Configurar]
    ConfigStock --> SetParams[Establecer parámetros]
    SetParams --> EnableAuto[Activar]
    EnableAuto --> SaveConfig[Guardar config]
    SaveConfig --> NotifyProvider
    
    CheckAutoStock -->|No| NotifyProvider[Notificar]
    NotifyProvider --> LogChange[Registrar auditoría]
    LogChange --> ShowSuccess[Éxito]
    ShowSuccess --> MoreAssign{¿Más?}
    
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
    Start([Inicio]) --> Login{"Usuario<br/>autenticado?"}
    Login -->|No| RedirectLogin[Redirect login]
    RedirectLogin --> End1([Fin])
    
    Login -->|Sí| CheckRole{Rol?}
    
    CheckRole -->|Admin| AdminDash[Dashboard Admin]
    CheckRole -->|Proveedor| ProvDash[Dashboard Prov]
    CheckRole -->|Logística| LogiDash[Dashboard Log]
    CheckRole -->|Cliente| ClientDash[Dashboard Client]
    
    AdminDash --> SelectReportType[Seleccionar reporte]
    SelectReportType --> ReportType{Tipo?}
    
    ReportType --> SalesReport[Ventas]
    ReportType --> StockReport[Stock]
    ReportType --> UsersReport[Usuarios]
    ReportType --> OrdersReport[Pedidos]
    
    ProvDash --> ProvReports[Reportes Prov]
    LogiDash --> LogiReports[Reportes Log]
    ClientDash --> ClientReports[Reportes Client]
    
    SalesReport --> SetParams[Parámetros]
    StockReport --> SetParams
    UsersReport --> SetParams
    OrdersReport --> SetParams
    ProvReports --> SetParams
    LogiReports --> SetParams
    ClientReports --> SetParams
    
    SetParams --> QueryDB[Consultar DB]
    QueryDB --> ProcessData[Procesar]
    ProcessData --> GenerateChart[Gráficos]
    GenerateChart --> FormatReport[Formatear]
    
    FormatReport --> ExportFormat{Exportar?}
    ExportFormat -->|PDF| GenPDF[PDF]
    ExportFormat -->|Excel| GenExcel[Excel]
    ExportFormat -->|CSV| GenCSV[CSV]
    
    GenPDF --> Download[Descargar]
    GenExcel --> Download
    GenCSV --> Download
    
    Download --> SaveHistory[Historial]
    SaveHistory --> End2([Fin])
    
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
    
    SelectAction -->|Editar| EditProfile
    SelectAction -->|Pass| ChangePass
    SelectAction -->|Deactivate| DeactivateAcc[Desactivar]
    SelectAction -->|Delete| DeleteAcc[Eliminar]
    
    %% Edit Profile
    EditProfile --> InputChanges[Ingresar]
    InputChanges --> ValidateChanges{Válido?}
    ValidateChanges -->|No| ShowErrors[Error]
    ShowErrors -.-> InputChanges
    ValidateChanges -->|Sí| SaveChanges[Guardar]
    SaveChanges --> SuccessMsg[Éxito]
    SuccessMsg --> ViewProfile
    
    %% Change Pass
    ChangePass --> InputOldPass[Pass actual]
    InputOldPass --> VerifyOldPass{Correcta?}
    VerifyOldPass -->|No| ErrorOldPass[Error]
    ErrorOldPass -.-> ChangePass
    
    VerifyOldPass -->|Sí| InputNewPass[Nueva pass]
    InputNewPass --> CheckStrength{Fuerte?}
    CheckStrength -->|No| ErrorWeak[Débil]
    ErrorWeak -.-> InputNewPass
    
    CheckStrength -->|Sí| CheckHistory{Usada?}
    CheckHistory -->|Sí| ErrorUsed[Usada]
    ErrorUsed -.-> InputNewPass
    
    CheckHistory -->|No| UpdatePass[Actualizar]
    UpdatePass --> SaveHistory[Historial]
    SaveHistory --> LogoutAll[Logout all]
    LogoutAll --> Redirect[Login]
    Redirect --> End1([Fin])
    
    %% Deactivate
    DeactivateAcc --> ConfirmDeact{Confirmar?}
    ConfirmDeact -->|No| ViewProfile
    ConfirmDeact -->|Sí| SetSelfDeact[Desactivar]
    SetSelfDeact --> Logout[Logout]
    Logout --> End2([Fin])
    
    %% Delete
    DeleteAcc --> ConfirmDelete{Confirmar?}
    ConfirmDelete -->|No| ViewProfile
    ConfirmDelete -->|Sí| NotifyAdmin[Notificar Admin]
    NotifyAdmin --> PendingReview[Revisión]
    PendingReview --> End3([Fin])
    
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
