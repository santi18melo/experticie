Galería Visual de Diagramas
===========================

Explora la arquitectura y flujos de PREXCOL a través de nuestra galería interactiva.

.. container:: sd-p-4 sd-bg-light sd-rounded sd-shadow-sm sd-mb-4 sd-text-center

    **Accesos Rápidos**

    .. grid:: 2
        :gutter: 3

        .. grid-item::
            .. button-link:: http://localhost:5175
                :color: success
                :shadow:
                :expand:
                :icon: octicon:browser

                IR A LA APLICACIÓN

        .. grid-item::
            .. button-link:: http://localhost:8000/admin
                :color: primary
                :shadow:
                :expand:
                :icon: octicon:server

                IR AL BACKEND

---

.. dropdown:: 📊 Diagrama Actividad("7 diagramas")
    :open:
    :class-container: sd-mb-4

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TD
                        Start(["Inicio"]) --> Input["Usuario completa formulario"]
                        Input --> ValidateClient{"Validación\ncliente OK?"}
                        
                        %% Happy Path
                        ValidateClient -->|Sí| Submit["Enviar a backend"]
                        Submit --> CheckEmail{"Email\núnico?"}
                        
                        CheckEmail -->|Sí| CheckPass{"Password\nválido?"}
                        
                        CheckPass -->|Sí| CreateUser["Crear usuario en DB"]
                        CreateUser --> SaveHistory["Guardar password\nen historial"]
                        SaveHistory --> SendEmail["Enviar email\nde bienvenida"]
                        SendEmail --> ShowSuccess["Mensaje: Registro exitoso"]
                        ShowSuccess --> RedirectLogin["Redirect a Login"]
                        RedirectLogin --> End(["Fin"])
                    
                        %% Error Loops (Dotted for cleaner visuals)
                        ValidateClient -->|No| ShowError1["Mostrar errores\nde validación"]
                        ShowError1 -.-> Input
                        
                        CheckEmail -->|No| EmailExists["Error: Email ya existe"]
                        EmailExists -.-> Input
                        
                        CheckPass -->|No| PassWeak["Error: Password débil"]
                        PassWeak -.-> Input
                        
                        style Start fill:#90EE90
                        style End fill:#90EE90
                        style ShowError1 fill:#FFB6C1
                        style EmailExists fill:#FFB6C1
                        style PassWeak fill:#FFB6C1

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpb1wiXSkgLS0+IElucHV0W1wiVXN1YXJpbyBjb21wbGV0YSBmb3JtdWxhcmlvXCJdXG4gICAgSW5wdXQgLS0+IFZhbGlkYXRlQ2xpZW50e1wiVmFsaWRhY2lcdTAwZjNuXFxuY2xpZW50ZSBPSz9cIn1cbiAgICBcbiAgICAlJSBIYXBweSBQYXRoXG4gICAgVmFsaWRhdGVDbGllbnQgLS0+fFNcdTAwZWR8IFN1Ym1pdFtcIkVudmlhciBhIGJhY2tlbmRcIl1cbiAgICBTdWJtaXQgLS0+IENoZWNrRW1haWx7XCJFbWFpbFxcblx1MDBmYW5pY28/XCJ9XG4gICAgXG4gICAgQ2hlY2tFbWFpbCAtLT58U1x1MDBlZHwgQ2hlY2tQYXNze1wiUGFzc3dvcmRcXG52XHUwMGUxbGlkbz9cIn1cbiAgICBcbiAgICBDaGVja1Bhc3MgLS0+fFNcdTAwZWR8IENyZWF0ZVVzZXJbXCJDcmVhciB1c3VhcmlvIGVuIERCXCJdXG4gICAgQ3JlYXRlVXNlciAtLT4gU2F2ZUhpc3RvcnlbXCJHdWFyZGFyIHBhc3N3b3JkXFxuZW4gaGlzdG9yaWFsXCJdXG4gICAgU2F2ZUhpc3RvcnkgLS0+IFNlbmRFbWFpbFtcIkVudmlhciBlbWFpbFxcbmRlIGJpZW52ZW5pZGFcIl1cbiAgICBTZW5kRW1haWwgLS0+IFNob3dTdWNjZXNzW1wiTWVuc2FqZTogUmVnaXN0cm8gZXhpdG9zb1wiXVxuICAgIFNob3dTdWNjZXNzIC0tPiBSZWRpcmVjdExvZ2luW1wiUmVkaXJlY3QgYSBMb2dpblwiXVxuICAgIFJlZGlyZWN0TG9naW4gLS0+IEVuZChbXCJGaW5cIl0pXG5cbiAgICAlJSBFcnJvciBMb29wcyAoRG90dGVkIGZvciBjbGVhbmVyIHZpc3VhbHMpXG4gICAgVmFsaWRhdGVDbGllbnQgLS0+fE5vfCBTaG93RXJyb3IxW1wiTW9zdHJhciBlcnJvcmVzXFxuZGUgdmFsaWRhY2lcdTAwZjNuXCJdXG4gICAgU2hvd0Vycm9yMSAtLi0+IElucHV0XG4gICAgXG4gICAgQ2hlY2tFbWFpbCAtLT58Tm98IEVtYWlsRXhpc3RzW1wiRXJyb3I6IEVtYWlsIHlhIGV4aXN0ZVwiXVxuICAgIEVtYWlsRXhpc3RzIC0uLT4gSW5wdXRcbiAgICBcbiAgICBDaGVja1Bhc3MgLS0+fE5vfCBQYXNzV2Vha1tcIkVycm9yOiBQYXNzd29yZCBkXHUwMGU5YmlsXCJdXG4gICAgUGFzc1dlYWsgLS4tPiBJbnB1dFxuICAgIFxuICAgIHN0eWxlIFN0YXJ0IGZpbGw6IzkwRUU5MFxuICAgIHN0eWxlIEVuZCBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBTaG93RXJyb3IxIGZpbGw6I0ZGQjZDMVxuICAgIHN0eWxlIEVtYWlsRXhpc3RzIGZpbGw6I0ZGQjZDMVxuICAgIHN0eWxlIFBhc3NXZWFrIGZpbGw6I0ZGQjZDMSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpb1wiXSkgLS0+IElucHV0W1wiVXN1YXJpbyBjb21wbGV0YSBmb3JtdWxhcmlvXCJdXG4gICAgSW5wdXQgLS0+IFZhbGlkYXRlQ2xpZW50e1wiVmFsaWRhY2lcdTAwZjNuXFxuY2xpZW50ZSBPSz9cIn1cbiAgICBcbiAgICAlJSBIYXBweSBQYXRoXG4gICAgVmFsaWRhdGVDbGllbnQgLS0+fFNcdTAwZWR8IFN1Ym1pdFtcIkVudmlhciBhIGJhY2tlbmRcIl1cbiAgICBTdWJtaXQgLS0+IENoZWNrRW1haWx7XCJFbWFpbFxcblx1MDBmYW5pY28/XCJ9XG4gICAgXG4gICAgQ2hlY2tFbWFpbCAtLT58U1x1MDBlZHwgQ2hlY2tQYXNze1wiUGFzc3dvcmRcXG52XHUwMGUxbGlkbz9cIn1cbiAgICBcbiAgICBDaGVja1Bhc3MgLS0+fFNcdTAwZWR8IENyZWF0ZVVzZXJbXCJDcmVhciB1c3VhcmlvIGVuIERCXCJdXG4gICAgQ3JlYXRlVXNlciAtLT4gU2F2ZUhpc3RvcnlbXCJHdWFyZGFyIHBhc3N3b3JkXFxuZW4gaGlzdG9yaWFsXCJdXG4gICAgU2F2ZUhpc3RvcnkgLS0+IFNlbmRFbWFpbFtcIkVudmlhciBlbWFpbFxcbmRlIGJpZW52ZW5pZGFcIl1cbiAgICBTZW5kRW1haWwgLS0+IFNob3dTdWNjZXNzW1wiTWVuc2FqZTogUmVnaXN0cm8gZXhpdG9zb1wiXVxuICAgIFNob3dTdWNjZXNzIC0tPiBSZWRpcmVjdExvZ2luW1wiUmVkaXJlY3QgYSBMb2dpblwiXVxuICAgIFJlZGlyZWN0TG9naW4gLS0+IEVuZChbXCJGaW5cIl0pXG5cbiAgICAlJSBFcnJvciBMb29wcyAoRG90dGVkIGZvciBjbGVhbmVyIHZpc3VhbHMpXG4gICAgVmFsaWRhdGVDbGllbnQgLS0+fE5vfCBTaG93RXJyb3IxW1wiTW9zdHJhciBlcnJvcmVzXFxuZGUgdmFsaWRhY2lcdTAwZjNuXCJdXG4gICAgU2hvd0Vycm9yMSAtLi0+IElucHV0XG4gICAgXG4gICAgQ2hlY2tFbWFpbCAtLT58Tm98IEVtYWlsRXhpc3RzW1wiRXJyb3I6IEVtYWlsIHlhIGV4aXN0ZVwiXVxuICAgIEVtYWlsRXhpc3RzIC0uLT4gSW5wdXRcbiAgICBcbiAgICBDaGVja1Bhc3MgLS0+fE5vfCBQYXNzV2Vha1tcIkVycm9yOiBQYXNzd29yZCBkXHUwMGU5YmlsXCJdXG4gICAgUGFzc1dlYWsgLS4tPiBJbnB1dFxuICAgIFxuICAgIHN0eWxlIFN0YXJ0IGZpbGw6IzkwRUU5MFxuICAgIHN0eWxlIEVuZCBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBTaG93RXJyb3IxIGZpbGw6I0ZGQjZDMVxuICAgIHN0eWxlIEVtYWlsRXhpc3RzIGZpbGw6I0ZGQjZDMVxuICAgIHN0eWxlIFBhc3NXZWFrIGZpbGw6I0ZGQjZDMSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TD
                        Start(["Inicio"]) --> Input["Usuario completa formulario"]
                        Input --> ValidateClient{"Validación\ncliente OK?"}
                        
                        %% Happy Path
                        ValidateClient -->|Sí| Submit["Enviar a backend"]
                        Submit --> CheckEmail{"Email\núnico?"}
                        
                        CheckEmail -->|Sí| CheckPass{"Password\nválido?"}
                        
                        CheckPass -->|Sí| CreateUser["Crear usuario en DB"]
                        CreateUser --> SaveHistory["Guardar password\nen historial"]
                        SaveHistory --> SendEmail["Enviar email\nde bienvenida"]
                        SendEmail --> ShowSuccess["Mensaje: Registro exitoso"]
                        ShowSuccess --> RedirectLogin["Redirect a Login"]
                        RedirectLogin --> End(["Fin"])
                    
                        %% Error Loops ("Dotted for cleaner visuals")
                        ValidateClient -->|No| ShowError1["Mostrar errores\nde validación"]
                        ShowError1 -.-> Input
                        
                        CheckEmail -->|No| EmailExists["Error: Email ya existe"]
                        EmailExists -.-> Input
                        
                        CheckPass -->|No| PassWeak["Error: Password débil"]
                        PassWeak -.-> Input
                        
                        style Start fill:#90EE90
                        style End fill:#90EE90
                        style ShowError1 fill:#FFB6C1
                        style EmailExists fill:#FFB6C1
                        style PassWeak fill:#FFB6C1

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TD
                        Start(["Inicio: Cliente en catálogo"]) --> Browse["Navegar productos"]
                        Browse --> SelectProduct["Seleccionar producto"]
                        SelectProduct --> ViewDetails["Ver detalles"]
                        
                        ViewDetails --> CheckStock{"Stock\ndisponible?"}
                        
                        CheckStock -->|Sí| AddCart["Agregar al carrito"]
                        AddCart --> MoreProducts{"Agregar\nmás productos?"}
                        
                        MoreProducts -->|Sí| Browse
                        MoreProducts -->|No| ViewCart["Ver carrito"]
                        
                        ViewCart --> AdjustQty{"Ajustar\ncantidades?"}
                        AdjustQty -->|Sí| ModifyCart["Modificar carrito"]
                        ModifyCart --> ViewCart
                        
                        AdjustQty -->|No| Checkout["Proceder al pago"]
                        Checkout --> ValidateStock{"Todo el stock\ndisponible?"}
                        
                        ValidateStock -->|Sí| SelectPayment["Seleccionar método\nde pago"]
                        SelectPayment --> PaymentMethod{"Método?"}
                        
                        PaymentMethod -->|Tarjeta| EnterCard["Ingresar datos\nde tarjeta"]
                        PaymentMethod -->|Transferencia| UploadProof["Subir comprobante"]
                        PaymentMethod -->|PSE| LoginBank["Login banco"]
                        
                        EnterCard --> ProcessPayment["Procesar pago"]
                        UploadProof --> ProcessPayment
                        LoginBank --> ProcessPayment
                        
                        ProcessPayment --> PaymentResult{"Pago\nexitoso?"}
                        
                        PaymentResult -->|Sí| CreateOrder["Crear pedido"]
                        CreateOrder --> ReduceStock["Reducir stock"]
                        ReduceStock --> SendNotifications["Enviar notificaciones"]
                        SendNotifications --> ShowConfirmation["Mostrar confirmación"]
                        ShowConfirmation --> SendConfirmEmail["Enviar email\nde confirmación"]
                        SendConfirmEmail --> End2(["Fin: Pedido creado"])
                    
                        %% Feedback / Alternate Paths
                        CheckStock -->|No| OutOfStock[Mostrar "Agotado"]
                        OutOfStock -.-> Browse
                        
                        ValidateStock -->|No| StockError["Error: Stock insuficiente"]
                        StockError -.-> ViewCart
                        
                        PaymentResult -->|No| PaymentFailed["Pago rechazado"]
                        PaymentFailed --> RetryPayment{"Reintentar?"}
                        RetryPayment -->|Sí| SelectPayment
                        RetryPayment -->|No| CancelOrder["Cancelar orden"]
                        CancelOrder --> End1(["Fin: Sin pedido"])
                        
                        style Start fill:#90EE90
                        style End1 fill:#FFB6C1
                        style End2 fill:#90EE90
                        style OutOfStock fill:#FFA500
                        style StockError fill:#FFB6C1
                        style PaymentFailed fill:#FFB6C1

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpbzogQ2xpZW50ZSBlbiBjYXRcdTAwZTFsb2dvXCJdKSAtLT4gQnJvd3NlW1wiTmF2ZWdhciBwcm9kdWN0b3NcIl1cbiAgICBCcm93c2UgLS0+IFNlbGVjdFByb2R1Y3RbXCJTZWxlY2Npb25hciBwcm9kdWN0b1wiXVxuICAgIFNlbGVjdFByb2R1Y3QgLS0+IFZpZXdEZXRhaWxzW1wiVmVyIGRldGFsbGVzXCJdXG4gICAgXG4gICAgVmlld0RldGFpbHMgLS0+IENoZWNrU3RvY2t7XCJTdG9ja1xcbmRpc3BvbmlibGU/XCJ9XG4gICAgXG4gICAgQ2hlY2tTdG9jayAtLT58U1x1MDBlZHwgQWRkQ2FydFtcIkFncmVnYXIgYWwgY2Fycml0b1wiXVxuICAgIEFkZENhcnQgLS0+IE1vcmVQcm9kdWN0c3tcIkFncmVnYXJcXG5tXHUwMGUxcyBwcm9kdWN0b3M/XCJ9XG4gICAgXG4gICAgTW9yZVByb2R1Y3RzIC0tPnxTXHUwMGVkfCBCcm93c2VcbiAgICBNb3JlUHJvZHVjdHMgLS0+fE5vfCBWaWV3Q2FydFtcIlZlciBjYXJyaXRvXCJdXG4gICAgXG4gICAgVmlld0NhcnQgLS0+IEFkanVzdFF0eXtcIkFqdXN0YXJcXG5jYW50aWRhZGVzP1wifVxuICAgIEFkanVzdFF0eSAtLT58U1x1MDBlZHwgTW9kaWZ5Q2FydFtcIk1vZGlmaWNhciBjYXJyaXRvXCJdXG4gICAgTW9kaWZ5Q2FydCAtLT4gVmlld0NhcnRcbiAgICBcbiAgICBBZGp1c3RRdHkgLS0+fE5vfCBDaGVja291dFtcIlByb2NlZGVyIGFsIHBhZ29cIl1cbiAgICBDaGVja291dCAtLT4gVmFsaWRhdGVTdG9ja3tcIlRvZG8gZWwgc3RvY2tcXG5kaXNwb25pYmxlP1wifVxuICAgIFxuICAgIFZhbGlkYXRlU3RvY2sgLS0+fFNcdTAwZWR8IFNlbGVjdFBheW1lbnRbXCJTZWxlY2Npb25hciBtXHUwMGU5dG9kb1xcbmRlIHBhZ29cIl1cbiAgICBTZWxlY3RQYXltZW50IC0tPiBQYXltZW50TWV0aG9ke1wiTVx1MDBlOXRvZG8/XCJ9XG4gICAgXG4gICAgUGF5bWVudE1ldGhvZCAtLT58VGFyamV0YXwgRW50ZXJDYXJkW1wiSW5ncmVzYXIgZGF0b3NcXG5kZSB0YXJqZXRhXCJdXG4gICAgUGF5bWVudE1ldGhvZCAtLT58VHJhbnNmZXJlbmNpYXwgVXBsb2FkUHJvb2ZbXCJTdWJpciBjb21wcm9iYW50ZVwiXVxuICAgIFBheW1lbnRNZXRob2QgLS0+fFBTRXwgTG9naW5CYW5rW1wiTG9naW4gYmFuY29cIl1cbiAgICBcbiAgICBFbnRlckNhcmQgLS0+IFByb2Nlc3NQYXltZW50W1wiUHJvY2VzYXIgcGFnb1wiXVxuICAgIFVwbG9hZFByb29mIC0tPiBQcm9jZXNzUGF5bWVudFxuICAgIExvZ2luQmFuayAtLT4gUHJvY2Vzc1BheW1lbnRcbiAgICBcbiAgICBQcm9jZXNzUGF5bWVudCAtLT4gUGF5bWVudFJlc3VsdHtcIlBhZ29cXG5leGl0b3NvP1wifVxuICAgIFxuICAgIFBheW1lbnRSZXN1bHQgLS0+fFNcdTAwZWR8IENyZWF0ZU9yZGVyW1wiQ3JlYXIgcGVkaWRvXCJdXG4gICAgQ3JlYXRlT3JkZXIgLS0+IFJlZHVjZVN0b2NrW1wiUmVkdWNpciBzdG9ja1wiXVxuICAgIFJlZHVjZVN0b2NrIC0tPiBTZW5kTm90aWZpY2F0aW9uc1tcIkVudmlhciBub3RpZmljYWNpb25lc1wiXVxuICAgIFNlbmROb3RpZmljYXRpb25zIC0tPiBTaG93Q29uZmlybWF0aW9uW1wiTW9zdHJhciBjb25maXJtYWNpXHUwMGYzblwiXVxuICAgIFNob3dDb25maXJtYXRpb24gLS0+IFNlbmRDb25maXJtRW1haWxbXCJFbnZpYXIgZW1haWxcXG5kZSBjb25maXJtYWNpXHUwMGYzblwiXVxuICAgIFNlbmRDb25maXJtRW1haWwgLS0+IEVuZDIoW1wiRmluOiBQZWRpZG8gY3JlYWRvXCJdKVxuXG4gICAgJSUgRmVlZGJhY2sgLyBBbHRlcm5hdGUgUGF0aHNcbiAgICBDaGVja1N0b2NrIC0tPnxOb3wgT3V0T2ZTdG9ja1tNb3N0cmFyIFwiQWdvdGFkb1wiXVxuICAgIE91dE9mU3RvY2sgLS4tPiBCcm93c2VcbiAgICBcbiAgICBWYWxpZGF0ZVN0b2NrIC0tPnxOb3wgU3RvY2tFcnJvcltcIkVycm9yOiBTdG9jayBpbnN1ZmljaWVudGVcIl1cbiAgICBTdG9ja0Vycm9yIC0uLT4gVmlld0NhcnRcbiAgICBcbiAgICBQYXltZW50UmVzdWx0IC0tPnxOb3wgUGF5bWVudEZhaWxlZFtcIlBhZ28gcmVjaGF6YWRvXCJdXG4gICAgUGF5bWVudEZhaWxlZCAtLT4gUmV0cnlQYXltZW50e1wiUmVpbnRlbnRhcj9cIn1cbiAgICBSZXRyeVBheW1lbnQgLS0+fFNcdTAwZWR8IFNlbGVjdFBheW1lbnRcbiAgICBSZXRyeVBheW1lbnQgLS0+fE5vfCBDYW5jZWxPcmRlcltcIkNhbmNlbGFyIG9yZGVuXCJdXG4gICAgQ2FuY2VsT3JkZXIgLS0+IEVuZDEoW1wiRmluOiBTaW4gcGVkaWRvXCJdKVxuICAgIFxuICAgIHN0eWxlIFN0YXJ0IGZpbGw6IzkwRUU5MFxuICAgIHN0eWxlIEVuZDEgZmlsbDojRkZCNkMxXG4gICAgc3R5bGUgRW5kMiBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBPdXRPZlN0b2NrIGZpbGw6I0ZGQTUwMFxuICAgIHN0eWxlIFN0b2NrRXJyb3IgZmlsbDojRkZCNkMxXG4gICAgc3R5bGUgUGF5bWVudEZhaWxlZCBmaWxsOiNGRkI2QzEiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpbzogQ2xpZW50ZSBlbiBjYXRcdTAwZTFsb2dvXCJdKSAtLT4gQnJvd3NlW1wiTmF2ZWdhciBwcm9kdWN0b3NcIl1cbiAgICBCcm93c2UgLS0+IFNlbGVjdFByb2R1Y3RbXCJTZWxlY2Npb25hciBwcm9kdWN0b1wiXVxuICAgIFNlbGVjdFByb2R1Y3QgLS0+IFZpZXdEZXRhaWxzW1wiVmVyIGRldGFsbGVzXCJdXG4gICAgXG4gICAgVmlld0RldGFpbHMgLS0+IENoZWNrU3RvY2t7XCJTdG9ja1xcbmRpc3BvbmlibGU/XCJ9XG4gICAgXG4gICAgQ2hlY2tTdG9jayAtLT58U1x1MDBlZHwgQWRkQ2FydFtcIkFncmVnYXIgYWwgY2Fycml0b1wiXVxuICAgIEFkZENhcnQgLS0+IE1vcmVQcm9kdWN0c3tcIkFncmVnYXJcXG5tXHUwMGUxcyBwcm9kdWN0b3M/XCJ9XG4gICAgXG4gICAgTW9yZVByb2R1Y3RzIC0tPnxTXHUwMGVkfCBCcm93c2VcbiAgICBNb3JlUHJvZHVjdHMgLS0+fE5vfCBWaWV3Q2FydFtcIlZlciBjYXJyaXRvXCJdXG4gICAgXG4gICAgVmlld0NhcnQgLS0+IEFkanVzdFF0eXtcIkFqdXN0YXJcXG5jYW50aWRhZGVzP1wifVxuICAgIEFkanVzdFF0eSAtLT58U1x1MDBlZHwgTW9kaWZ5Q2FydFtcIk1vZGlmaWNhciBjYXJyaXRvXCJdXG4gICAgTW9kaWZ5Q2FydCAtLT4gVmlld0NhcnRcbiAgICBcbiAgICBBZGp1c3RRdHkgLS0+fE5vfCBDaGVja291dFtcIlByb2NlZGVyIGFsIHBhZ29cIl1cbiAgICBDaGVja291dCAtLT4gVmFsaWRhdGVTdG9ja3tcIlRvZG8gZWwgc3RvY2tcXG5kaXNwb25pYmxlP1wifVxuICAgIFxuICAgIFZhbGlkYXRlU3RvY2sgLS0+fFNcdTAwZWR8IFNlbGVjdFBheW1lbnRbXCJTZWxlY2Npb25hciBtXHUwMGU5dG9kb1xcbmRlIHBhZ29cIl1cbiAgICBTZWxlY3RQYXltZW50IC0tPiBQYXltZW50TWV0aG9ke1wiTVx1MDBlOXRvZG8/XCJ9XG4gICAgXG4gICAgUGF5bWVudE1ldGhvZCAtLT58VGFyamV0YXwgRW50ZXJDYXJkW1wiSW5ncmVzYXIgZGF0b3NcXG5kZSB0YXJqZXRhXCJdXG4gICAgUGF5bWVudE1ldGhvZCAtLT58VHJhbnNmZXJlbmNpYXwgVXBsb2FkUHJvb2ZbXCJTdWJpciBjb21wcm9iYW50ZVwiXVxuICAgIFBheW1lbnRNZXRob2QgLS0+fFBTRXwgTG9naW5CYW5rW1wiTG9naW4gYmFuY29cIl1cbiAgICBcbiAgICBFbnRlckNhcmQgLS0+IFByb2Nlc3NQYXltZW50W1wiUHJvY2VzYXIgcGFnb1wiXVxuICAgIFVwbG9hZFByb29mIC0tPiBQcm9jZXNzUGF5bWVudFxuICAgIExvZ2luQmFuayAtLT4gUHJvY2Vzc1BheW1lbnRcbiAgICBcbiAgICBQcm9jZXNzUGF5bWVudCAtLT4gUGF5bWVudFJlc3VsdHtcIlBhZ29cXG5leGl0b3NvP1wifVxuICAgIFxuICAgIFBheW1lbnRSZXN1bHQgLS0+fFNcdTAwZWR8IENyZWF0ZU9yZGVyW1wiQ3JlYXIgcGVkaWRvXCJdXG4gICAgQ3JlYXRlT3JkZXIgLS0+IFJlZHVjZVN0b2NrW1wiUmVkdWNpciBzdG9ja1wiXVxuICAgIFJlZHVjZVN0b2NrIC0tPiBTZW5kTm90aWZpY2F0aW9uc1tcIkVudmlhciBub3RpZmljYWNpb25lc1wiXVxuICAgIFNlbmROb3RpZmljYXRpb25zIC0tPiBTaG93Q29uZmlybWF0aW9uW1wiTW9zdHJhciBjb25maXJtYWNpXHUwMGYzblwiXVxuICAgIFNob3dDb25maXJtYXRpb24gLS0+IFNlbmRDb25maXJtRW1haWxbXCJFbnZpYXIgZW1haWxcXG5kZSBjb25maXJtYWNpXHUwMGYzblwiXVxuICAgIFNlbmRDb25maXJtRW1haWwgLS0+IEVuZDIoW1wiRmluOiBQZWRpZG8gY3JlYWRvXCJdKVxuXG4gICAgJSUgRmVlZGJhY2sgLyBBbHRlcm5hdGUgUGF0aHNcbiAgICBDaGVja1N0b2NrIC0tPnxOb3wgT3V0T2ZTdG9ja1tNb3N0cmFyIFwiQWdvdGFkb1wiXVxuICAgIE91dE9mU3RvY2sgLS4tPiBCcm93c2VcbiAgICBcbiAgICBWYWxpZGF0ZVN0b2NrIC0tPnxOb3wgU3RvY2tFcnJvcltcIkVycm9yOiBTdG9jayBpbnN1ZmljaWVudGVcIl1cbiAgICBTdG9ja0Vycm9yIC0uLT4gVmlld0NhcnRcbiAgICBcbiAgICBQYXltZW50UmVzdWx0IC0tPnxOb3wgUGF5bWVudEZhaWxlZFtcIlBhZ28gcmVjaGF6YWRvXCJdXG4gICAgUGF5bWVudEZhaWxlZCAtLT4gUmV0cnlQYXltZW50e1wiUmVpbnRlbnRhcj9cIn1cbiAgICBSZXRyeVBheW1lbnQgLS0+fFNcdTAwZWR8IFNlbGVjdFBheW1lbnRcbiAgICBSZXRyeVBheW1lbnQgLS0+fE5vfCBDYW5jZWxPcmRlcltcIkNhbmNlbGFyIG9yZGVuXCJdXG4gICAgQ2FuY2VsT3JkZXIgLS0+IEVuZDEoW1wiRmluOiBTaW4gcGVkaWRvXCJdKVxuICAgIFxuICAgIHN0eWxlIFN0YXJ0IGZpbGw6IzkwRUU5MFxuICAgIHN0eWxlIEVuZDEgZmlsbDojRkZCNkMxXG4gICAgc3R5bGUgRW5kMiBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBPdXRPZlN0b2NrIGZpbGw6I0ZGQTUwMFxuICAgIHN0eWxlIFN0b2NrRXJyb3IgZmlsbDojRkZCNkMxXG4gICAgc3R5bGUgUGF5bWVudEZhaWxlZCBmaWxsOiNGRkI2QzEiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TD
                        Start(["Inicio: Cliente en catálogo"]) --> Browse["Navegar productos"]
                        Browse --> SelectProduct["Seleccionar producto"]
                        SelectProduct --> ViewDetails["Ver detalles"]
                        
                        ViewDetails --> CheckStock{"Stock\ndisponible?"}
                        
                        CheckStock -->|Sí| AddCart["Agregar al carrito"]
                        AddCart --> MoreProducts{"Agregar\nmás productos?"}
                        
                        MoreProducts -->|Sí| Browse
                        MoreProducts -->|No| ViewCart["Ver carrito"]
                        
                        ViewCart --> AdjustQty{"Ajustar\ncantidades?"}
                        AdjustQty -->|Sí| ModifyCart["Modificar carrito"]
                        ModifyCart --> ViewCart
                        
                        AdjustQty -->|No| Checkout["Proceder al pago"]
                        Checkout --> ValidateStock{"Todo el stock\ndisponible?"}
                        
                        ValidateStock -->|Sí| SelectPayment["Seleccionar método\nde pago"]
                        SelectPayment --> PaymentMethod{"Método?"}
                        
                        PaymentMethod -->|Tarjeta| EnterCard["Ingresar datos\nde tarjeta"]
                        PaymentMethod -->|Transferencia| UploadProof["Subir comprobante"]
                        PaymentMethod -->|PSE| LoginBank["Login banco"]
                        
                        EnterCard --> ProcessPayment["Procesar pago"]
                        UploadProof --> ProcessPayment
                        LoginBank --> ProcessPayment
                        
                        ProcessPayment --> PaymentResult{"Pago\nexitoso?"}
                        
                        PaymentResult -->|Sí| CreateOrder["Crear pedido"]
                        CreateOrder --> ReduceStock["Reducir stock"]
                        ReduceStock --> SendNotifications["Enviar notificaciones"]
                        SendNotifications --> ShowConfirmation["Mostrar confirmación"]
                        ShowConfirmation --> SendConfirmEmail["Enviar email\nde confirmación"]
                        SendConfirmEmail --> End2(["Fin: Pedido creado"])
                    
                        %% Feedback / Alternate Paths
                        CheckStock -->|No| OutOfStock[Mostrar "Agotado"]
                        OutOfStock -.-> Browse
                        
                        ValidateStock -->|No| StockError["Error: Stock insuficiente"]
                        StockError -.-> ViewCart
                        
                        PaymentResult -->|No| PaymentFailed["Pago rechazado"]
                        PaymentFailed --> RetryPayment{"Reintentar?"}
                        RetryPayment -->|Sí| SelectPayment
                        RetryPayment -->|No| CancelOrder["Cancelar orden"]
                        CancelOrder --> End1(["Fin: Sin pedido"])
                        
                        style Start fill:#90EE90
                        style End1 fill:#FFB6C1
                        style End2 fill:#90EE90
                        style OutOfStock fill:#FFA500
                        style StockError fill:#FFB6C1
                        style PaymentFailed fill:#FFB6C1

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TD
                        Start(["Inicio"]) --> Login["Logística inicia sesión"]
                        Login --> Dashboard["Ver dashboard"]
                        Dashboard --> ViewPending["Ver pedidos pendientes"]
                        
                        ViewPending --> SelectOrder["Seleccionar pedido"]
                        SelectOrder --> ViewDetails["Ver detalles"]
                        ViewDetails --> CheckInventory{"Productos\ndisponibles?"}
                        
                        CheckInventory -->|Sí| StartPrep["Iniciar preparación"]
                        StartPrep --> ChangeStatus1["Cambiar estado:\nPREPARANDO"]
                        ChangeStatus1 --> NotifyClient1["Notificar cliente"]
                        
                        NotifyClient1 --> PickProducts["Recolectar productos"]
                        PickProducts --> VerifyItems["Verificar items"]
                        VerifyItems --> PackOrder["Empacar pedido"]
                        PackOrder --> PrintLabel["Imprimir etiqueta"]
                        
                        PrintLabel --> ReadyShip{"Listo para\nenviar?"}
                        
                        ReadyShip -->|Sí| ChangeStatus2["Cambiar estado:\nEN_TRANSITO"]
                        ChangeStatus2 --> NotifyClient2["Notificar cliente"]
                        NotifyClient2 --> AssignCourier["Asignar transportista"]
                        
                        AssignCourier --> InTransit["Pedido en tránsito"]
                        InTransit --> WaitDelivery["Esperar confirmación\nde entrega"]
                        
                        WaitDelivery --> DeliveryConfirm{"Entrega\nconfirmada?"}
                        
                        DeliveryConfirm -->|Sí| ChangeStatus3["Cambiar estado:\nENTREGADO"]
                        ChangeStatus3 --> GenerateSale["Generar registro\nde venta"]
                        GenerateSale --> NotifyClient3["Notificar cliente"]
                        NotifyClient3 --> UpdateMetrics["Actualizar métricas"]
                        UpdateMetrics --> End2(["Fin: Completado"])
                    
                        %% Exceptions
                        CheckInventory -->|No| ReportIssue["Reportar problema"]
                        ReportIssue --> NotifyAdmin["Notificar admin"]
                        NotifyAdmin --> WaitResolution["Esperar resolución"]
                        WaitResolution --> End1(["Fin: Pendiente"])
                    
                        ReadyShip -->|No| CheckIssue{"Hay\nproblema?"}
                        CheckIssue -->|Sí| ReportIssue
                        CheckIssue -->|No| PickProducts
                        
                        DeliveryConfirm -->|No| DeliveryIssue{"Hay\nproblema?"}
                        DeliveryIssue -->|Sí| ContactClient["Contactar cliente"]
                        ContactClient --> Reschedule["Reprogramar entrega"]
                        Reschedule -.-> InTransit
                        DeliveryIssue -->|No| WaitDelivery
                        
                        style Start fill:#90EE90
                        style End1 fill:#FFA500
                        style End2 fill:#90EE90
                        style ReportIssue fill:#FFB6C1
                        style ContactClient fill:#FFA500

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpb1wiXSkgLS0+IExvZ2luW1wiTG9nXHUwMGVkc3RpY2EgaW5pY2lhIHNlc2lcdTAwZjNuXCJdXG4gICAgTG9naW4gLS0+IERhc2hib2FyZFtcIlZlciBkYXNoYm9hcmRcIl1cbiAgICBEYXNoYm9hcmQgLS0+IFZpZXdQZW5kaW5nW1wiVmVyIHBlZGlkb3MgcGVuZGllbnRlc1wiXVxuICAgIFxuICAgIFZpZXdQZW5kaW5nIC0tPiBTZWxlY3RPcmRlcltcIlNlbGVjY2lvbmFyIHBlZGlkb1wiXVxuICAgIFNlbGVjdE9yZGVyIC0tPiBWaWV3RGV0YWlsc1tcIlZlciBkZXRhbGxlc1wiXVxuICAgIFZpZXdEZXRhaWxzIC0tPiBDaGVja0ludmVudG9yeXtcIlByb2R1Y3Rvc1xcbmRpc3BvbmlibGVzP1wifVxuICAgIFxuICAgIENoZWNrSW52ZW50b3J5IC0tPnxTXHUwMGVkfCBTdGFydFByZXBbXCJJbmljaWFyIHByZXBhcmFjaVx1MDBmM25cIl1cbiAgICBTdGFydFByZXAgLS0+IENoYW5nZVN0YXR1czFbXCJDYW1iaWFyIGVzdGFkbzpcXG5QUkVQQVJBTkRPXCJdXG4gICAgQ2hhbmdlU3RhdHVzMSAtLT4gTm90aWZ5Q2xpZW50MVtcIk5vdGlmaWNhciBjbGllbnRlXCJdXG4gICAgXG4gICAgTm90aWZ5Q2xpZW50MSAtLT4gUGlja1Byb2R1Y3RzW1wiUmVjb2xlY3RhciBwcm9kdWN0b3NcIl1cbiAgICBQaWNrUHJvZHVjdHMgLS0+IFZlcmlmeUl0ZW1zW1wiVmVyaWZpY2FyIGl0ZW1zXCJdXG4gICAgVmVyaWZ5SXRlbXMgLS0+IFBhY2tPcmRlcltcIkVtcGFjYXIgcGVkaWRvXCJdXG4gICAgUGFja09yZGVyIC0tPiBQcmludExhYmVsW1wiSW1wcmltaXIgZXRpcXVldGFcIl1cbiAgICBcbiAgICBQcmludExhYmVsIC0tPiBSZWFkeVNoaXB7XCJMaXN0byBwYXJhXFxuZW52aWFyP1wifVxuICAgIFxuICAgIFJlYWR5U2hpcCAtLT58U1x1MDBlZHwgQ2hhbmdlU3RhdHVzMltcIkNhbWJpYXIgZXN0YWRvOlxcbkVOX1RSQU5TSVRPXCJdXG4gICAgQ2hhbmdlU3RhdHVzMiAtLT4gTm90aWZ5Q2xpZW50MltcIk5vdGlmaWNhciBjbGllbnRlXCJdXG4gICAgTm90aWZ5Q2xpZW50MiAtLT4gQXNzaWduQ291cmllcltcIkFzaWduYXIgdHJhbnNwb3J0aXN0YVwiXVxuICAgIFxuICAgIEFzc2lnbkNvdXJpZXIgLS0+IEluVHJhbnNpdFtcIlBlZGlkbyBlbiB0clx1MDBlMW5zaXRvXCJdXG4gICAgSW5UcmFuc2l0IC0tPiBXYWl0RGVsaXZlcnlbXCJFc3BlcmFyIGNvbmZpcm1hY2lcdTAwZjNuXFxuZGUgZW50cmVnYVwiXVxuICAgIFxuICAgIFdhaXREZWxpdmVyeSAtLT4gRGVsaXZlcnlDb25maXJte1wiRW50cmVnYVxcbmNvbmZpcm1hZGE/XCJ9XG4gICAgXG4gICAgRGVsaXZlcnlDb25maXJtIC0tPnxTXHUwMGVkfCBDaGFuZ2VTdGF0dXMzW1wiQ2FtYmlhciBlc3RhZG86XFxuRU5UUkVHQURPXCJdXG4gICAgQ2hhbmdlU3RhdHVzMyAtLT4gR2VuZXJhdGVTYWxlW1wiR2VuZXJhciByZWdpc3Ryb1xcbmRlIHZlbnRhXCJdXG4gICAgR2VuZXJhdGVTYWxlIC0tPiBOb3RpZnlDbGllbnQzW1wiTm90aWZpY2FyIGNsaWVudGVcIl1cbiAgICBOb3RpZnlDbGllbnQzIC0tPiBVcGRhdGVNZXRyaWNzW1wiQWN0dWFsaXphciBtXHUwMGU5dHJpY2FzXCJdXG4gICAgVXBkYXRlTWV0cmljcyAtLT4gRW5kMihbXCJGaW46IENvbXBsZXRhZG9cIl0pXG5cbiAgICAlJSBFeGNlcHRpb25zXG4gICAgQ2hlY2tJbnZlbnRvcnkgLS0+fE5vfCBSZXBvcnRJc3N1ZVtcIlJlcG9ydGFyIHByb2JsZW1hXCJdXG4gICAgUmVwb3J0SXNzdWUgLS0+IE5vdGlmeUFkbWluW1wiTm90aWZpY2FyIGFkbWluXCJdXG4gICAgTm90aWZ5QWRtaW4gLS0+IFdhaXRSZXNvbHV0aW9uW1wiRXNwZXJhciByZXNvbHVjaVx1MDBmM25cIl1cbiAgICBXYWl0UmVzb2x1dGlvbiAtLT4gRW5kMShbXCJGaW46IFBlbmRpZW50ZVwiXSlcblxuICAgIFJlYWR5U2hpcCAtLT58Tm98IENoZWNrSXNzdWV7XCJIYXlcXG5wcm9ibGVtYT9cIn1cbiAgICBDaGVja0lzc3VlIC0tPnxTXHUwMGVkfCBSZXBvcnRJc3N1ZVxuICAgIENoZWNrSXNzdWUgLS0+fE5vfCBQaWNrUHJvZHVjdHNcbiAgICBcbiAgICBEZWxpdmVyeUNvbmZpcm0gLS0+fE5vfCBEZWxpdmVyeUlzc3Vle1wiSGF5XFxucHJvYmxlbWE/XCJ9XG4gICAgRGVsaXZlcnlJc3N1ZSAtLT58U1x1MDBlZHwgQ29udGFjdENsaWVudFtcIkNvbnRhY3RhciBjbGllbnRlXCJdXG4gICAgQ29udGFjdENsaWVudCAtLT4gUmVzY2hlZHVsZVtcIlJlcHJvZ3JhbWFyIGVudHJlZ2FcIl1cbiAgICBSZXNjaGVkdWxlIC0uLT4gSW5UcmFuc2l0XG4gICAgRGVsaXZlcnlJc3N1ZSAtLT58Tm98IFdhaXREZWxpdmVyeVxuICAgIFxuICAgIHN0eWxlIFN0YXJ0IGZpbGw6IzkwRUU5MFxuICAgIHN0eWxlIEVuZDEgZmlsbDojRkZBNTAwXG4gICAgc3R5bGUgRW5kMiBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBSZXBvcnRJc3N1ZSBmaWxsOiNGRkI2QzFcbiAgICBzdHlsZSBDb250YWN0Q2xpZW50IGZpbGw6I0ZGQTUwMCIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpb1wiXSkgLS0+IExvZ2luW1wiTG9nXHUwMGVkc3RpY2EgaW5pY2lhIHNlc2lcdTAwZjNuXCJdXG4gICAgTG9naW4gLS0+IERhc2hib2FyZFtcIlZlciBkYXNoYm9hcmRcIl1cbiAgICBEYXNoYm9hcmQgLS0+IFZpZXdQZW5kaW5nW1wiVmVyIHBlZGlkb3MgcGVuZGllbnRlc1wiXVxuICAgIFxuICAgIFZpZXdQZW5kaW5nIC0tPiBTZWxlY3RPcmRlcltcIlNlbGVjY2lvbmFyIHBlZGlkb1wiXVxuICAgIFNlbGVjdE9yZGVyIC0tPiBWaWV3RGV0YWlsc1tcIlZlciBkZXRhbGxlc1wiXVxuICAgIFZpZXdEZXRhaWxzIC0tPiBDaGVja0ludmVudG9yeXtcIlByb2R1Y3Rvc1xcbmRpc3BvbmlibGVzP1wifVxuICAgIFxuICAgIENoZWNrSW52ZW50b3J5IC0tPnxTXHUwMGVkfCBTdGFydFByZXBbXCJJbmljaWFyIHByZXBhcmFjaVx1MDBmM25cIl1cbiAgICBTdGFydFByZXAgLS0+IENoYW5nZVN0YXR1czFbXCJDYW1iaWFyIGVzdGFkbzpcXG5QUkVQQVJBTkRPXCJdXG4gICAgQ2hhbmdlU3RhdHVzMSAtLT4gTm90aWZ5Q2xpZW50MVtcIk5vdGlmaWNhciBjbGllbnRlXCJdXG4gICAgXG4gICAgTm90aWZ5Q2xpZW50MSAtLT4gUGlja1Byb2R1Y3RzW1wiUmVjb2xlY3RhciBwcm9kdWN0b3NcIl1cbiAgICBQaWNrUHJvZHVjdHMgLS0+IFZlcmlmeUl0ZW1zW1wiVmVyaWZpY2FyIGl0ZW1zXCJdXG4gICAgVmVyaWZ5SXRlbXMgLS0+IFBhY2tPcmRlcltcIkVtcGFjYXIgcGVkaWRvXCJdXG4gICAgUGFja09yZGVyIC0tPiBQcmludExhYmVsW1wiSW1wcmltaXIgZXRpcXVldGFcIl1cbiAgICBcbiAgICBQcmludExhYmVsIC0tPiBSZWFkeVNoaXB7XCJMaXN0byBwYXJhXFxuZW52aWFyP1wifVxuICAgIFxuICAgIFJlYWR5U2hpcCAtLT58U1x1MDBlZHwgQ2hhbmdlU3RhdHVzMltcIkNhbWJpYXIgZXN0YWRvOlxcbkVOX1RSQU5TSVRPXCJdXG4gICAgQ2hhbmdlU3RhdHVzMiAtLT4gTm90aWZ5Q2xpZW50MltcIk5vdGlmaWNhciBjbGllbnRlXCJdXG4gICAgTm90aWZ5Q2xpZW50MiAtLT4gQXNzaWduQ291cmllcltcIkFzaWduYXIgdHJhbnNwb3J0aXN0YVwiXVxuICAgIFxuICAgIEFzc2lnbkNvdXJpZXIgLS0+IEluVHJhbnNpdFtcIlBlZGlkbyBlbiB0clx1MDBlMW5zaXRvXCJdXG4gICAgSW5UcmFuc2l0IC0tPiBXYWl0RGVsaXZlcnlbXCJFc3BlcmFyIGNvbmZpcm1hY2lcdTAwZjNuXFxuZGUgZW50cmVnYVwiXVxuICAgIFxuICAgIFdhaXREZWxpdmVyeSAtLT4gRGVsaXZlcnlDb25maXJte1wiRW50cmVnYVxcbmNvbmZpcm1hZGE/XCJ9XG4gICAgXG4gICAgRGVsaXZlcnlDb25maXJtIC0tPnxTXHUwMGVkfCBDaGFuZ2VTdGF0dXMzW1wiQ2FtYmlhciBlc3RhZG86XFxuRU5UUkVHQURPXCJdXG4gICAgQ2hhbmdlU3RhdHVzMyAtLT4gR2VuZXJhdGVTYWxlW1wiR2VuZXJhciByZWdpc3Ryb1xcbmRlIHZlbnRhXCJdXG4gICAgR2VuZXJhdGVTYWxlIC0tPiBOb3RpZnlDbGllbnQzW1wiTm90aWZpY2FyIGNsaWVudGVcIl1cbiAgICBOb3RpZnlDbGllbnQzIC0tPiBVcGRhdGVNZXRyaWNzW1wiQWN0dWFsaXphciBtXHUwMGU5dHJpY2FzXCJdXG4gICAgVXBkYXRlTWV0cmljcyAtLT4gRW5kMihbXCJGaW46IENvbXBsZXRhZG9cIl0pXG5cbiAgICAlJSBFeGNlcHRpb25zXG4gICAgQ2hlY2tJbnZlbnRvcnkgLS0+fE5vfCBSZXBvcnRJc3N1ZVtcIlJlcG9ydGFyIHByb2JsZW1hXCJdXG4gICAgUmVwb3J0SXNzdWUgLS0+IE5vdGlmeUFkbWluW1wiTm90aWZpY2FyIGFkbWluXCJdXG4gICAgTm90aWZ5QWRtaW4gLS0+IFdhaXRSZXNvbHV0aW9uW1wiRXNwZXJhciByZXNvbHVjaVx1MDBmM25cIl1cbiAgICBXYWl0UmVzb2x1dGlvbiAtLT4gRW5kMShbXCJGaW46IFBlbmRpZW50ZVwiXSlcblxuICAgIFJlYWR5U2hpcCAtLT58Tm98IENoZWNrSXNzdWV7XCJIYXlcXG5wcm9ibGVtYT9cIn1cbiAgICBDaGVja0lzc3VlIC0tPnxTXHUwMGVkfCBSZXBvcnRJc3N1ZVxuICAgIENoZWNrSXNzdWUgLS0+fE5vfCBQaWNrUHJvZHVjdHNcbiAgICBcbiAgICBEZWxpdmVyeUNvbmZpcm0gLS0+fE5vfCBEZWxpdmVyeUlzc3Vle1wiSGF5XFxucHJvYmxlbWE/XCJ9XG4gICAgRGVsaXZlcnlJc3N1ZSAtLT58U1x1MDBlZHwgQ29udGFjdENsaWVudFtcIkNvbnRhY3RhciBjbGllbnRlXCJdXG4gICAgQ29udGFjdENsaWVudCAtLT4gUmVzY2hlZHVsZVtcIlJlcHJvZ3JhbWFyIGVudHJlZ2FcIl1cbiAgICBSZXNjaGVkdWxlIC0uLT4gSW5UcmFuc2l0XG4gICAgRGVsaXZlcnlJc3N1ZSAtLT58Tm98IFdhaXREZWxpdmVyeVxuICAgIFxuICAgIHN0eWxlIFN0YXJ0IGZpbGw6IzkwRUU5MFxuICAgIHN0eWxlIEVuZDEgZmlsbDojRkZBNTAwXG4gICAgc3R5bGUgRW5kMiBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBSZXBvcnRJc3N1ZSBmaWxsOiNGRkI2QzFcbiAgICBzdHlsZSBDb250YWN0Q2xpZW50IGZpbGw6I0ZGQTUwMCIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TD
                        Start(["Inicio"]) --> Login["Logística inicia sesión"]
                        Login --> Dashboard["Ver dashboard"]
                        Dashboard --> ViewPending["Ver pedidos pendientes"]
                        
                        ViewPending --> SelectOrder["Seleccionar pedido"]
                        SelectOrder --> ViewDetails["Ver detalles"]
                        ViewDetails --> CheckInventory{"Productos\ndisponibles?"}
                        
                        CheckInventory -->|Sí| StartPrep["Iniciar preparación"]
                        StartPrep --> ChangeStatus1["Cambiar estado:\nPREPARANDO"]
                        ChangeStatus1 --> NotifyClient1["Notificar cliente"]
                        
                        NotifyClient1 --> PickProducts["Recolectar productos"]
                        PickProducts --> VerifyItems["Verificar items"]
                        VerifyItems --> PackOrder["Empacar pedido"]
                        PackOrder --> PrintLabel["Imprimir etiqueta"]
                        
                        PrintLabel --> ReadyShip{"Listo para\nenviar?"}
                        
                        ReadyShip -->|Sí| ChangeStatus2["Cambiar estado:\nEN_TRANSITO"]
                        ChangeStatus2 --> NotifyClient2["Notificar cliente"]
                        NotifyClient2 --> AssignCourier["Asignar transportista"]
                        
                        AssignCourier --> InTransit["Pedido en tránsito"]
                        InTransit --> WaitDelivery["Esperar confirmación\nde entrega"]
                        
                        WaitDelivery --> DeliveryConfirm{"Entrega\nconfirmada?"}
                        
                        DeliveryConfirm -->|Sí| ChangeStatus3["Cambiar estado:\nENTREGADO"]
                        ChangeStatus3 --> GenerateSale["Generar registro\nde venta"]
                        GenerateSale --> NotifyClient3["Notificar cliente"]
                        NotifyClient3 --> UpdateMetrics["Actualizar métricas"]
                        UpdateMetrics --> End2(["Fin: Completado"])
                    
                        %% Exceptions
                        CheckInventory -->|No| ReportIssue["Reportar problema"]
                        ReportIssue --> NotifyAdmin["Notificar admin"]
                        NotifyAdmin --> WaitResolution["Esperar resolución"]
                        WaitResolution --> End1(["Fin: Pendiente"])
                    
                        ReadyShip -->|No| CheckIssue{"Hay\nproblema?"}
                        CheckIssue -->|Sí| ReportIssue
                        CheckIssue -->|No| PickProducts
                        
                        DeliveryConfirm -->|No| DeliveryIssue{"Hay\nproblema?"}
                        DeliveryIssue -->|Sí| ContactClient["Contactar cliente"]
                        ContactClient --> Reschedule["Reprogramar entrega"]
                        Reschedule -.-> InTransit
                        DeliveryIssue -->|No| WaitDelivery
                        
                        style Start fill:#90EE90
                        style End1 fill:#FFA500
                        style End2 fill:#90EE90
                        style ReportIssue fill:#FFB6C1
                        style ContactClient fill:#FFA500

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TD
                        Start(["Inicio: Timer"]) --> Trigger["Celery Beat trigger\ncada 1 hora"]
                        Trigger --> GetProducts["Obtener productos con\nrecarga automática activa"]
                        GetProducts --> Loop{"Más productos\npor revisar?"}
                        
                        Loop -->|No| EndProcess["Finalizar proceso"]
                        EndProcess --> End(["Fin"])
                        
                        Loop -->|Sí| NextProduct["Siguiente producto"]
                        NextProduct --> CheckStock{"Stock actual <=\nStock mínimo?"}
                        
                        CheckStock -->|No| SkipProduct["No requiere recarga"]
                        SkipProduct -.-> Loop
                        
                        CheckStock -->|Sí| BeginTrans["BEGIN TRANSACTION"]
                        BeginTrans --> CalcRecharge["Calcular cantidad"]
                        CalcRecharge --> UpdateStock["UPDATE stock"]
                        
                        UpdateStock --> LogHistory["INSERT historial"]
                        LogHistory --> UpdateConfig["UPDATE config"]
                        
                        UpdateConfig --> Commit["COMMIT TRANSACTION"]
                        Commit --> SendNotif["Notificar proveedor"]
                        SendNotif --> LogEvent["Registrar en log"]
                        LogEvent -.-> Loop
                        
                        BeginTrans -.Error.-> Rollback["ROLLBACK"]
                        Rollback --> LogError["Registrar error"]
                        LogError --> NotifyAdmin["Notificar admin"]
                        NotifyAdmin -.-> Loop
                        
                        style Start fill:#90EE90
                        style End fill:#90EE90
                        style SkipProduct fill:#D3D3D3
                        style Rollback fill:#FFB6C1

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpbzogVGltZXJcIl0pIC0tPiBUcmlnZ2VyW1wiQ2VsZXJ5IEJlYXQgdHJpZ2dlclxcbmNhZGEgMSBob3JhXCJdXG4gICAgVHJpZ2dlciAtLT4gR2V0UHJvZHVjdHNbXCJPYnRlbmVyIHByb2R1Y3RvcyBjb25cXG5yZWNhcmdhIGF1dG9tXHUwMGUxdGljYSBhY3RpdmFcIl1cbiAgICBHZXRQcm9kdWN0cyAtLT4gTG9vcHtcIk1cdTAwZTFzIHByb2R1Y3Rvc1xcbnBvciByZXZpc2FyP1wifVxuICAgIFxuICAgIExvb3AgLS0+fE5vfCBFbmRQcm9jZXNzW1wiRmluYWxpemFyIHByb2Nlc29cIl1cbiAgICBFbmRQcm9jZXNzIC0tPiBFbmQoW1wiRmluXCJdKVxuICAgIFxuICAgIExvb3AgLS0+fFNcdTAwZWR8IE5leHRQcm9kdWN0W1wiU2lndWllbnRlIHByb2R1Y3RvXCJdXG4gICAgTmV4dFByb2R1Y3QgLS0+IENoZWNrU3RvY2t7XCJTdG9jayBhY3R1YWwgPD1cXG5TdG9jayBtXHUwMGVkbmltbz9cIn1cbiAgICBcbiAgICBDaGVja1N0b2NrIC0tPnxOb3wgU2tpcFByb2R1Y3RbXCJObyByZXF1aWVyZSByZWNhcmdhXCJdXG4gICAgU2tpcFByb2R1Y3QgLS4tPiBMb29wXG4gICAgXG4gICAgQ2hlY2tTdG9jayAtLT58U1x1MDBlZHwgQmVnaW5UcmFuc1tcIkJFR0lOIFRSQU5TQUNUSU9OXCJdXG4gICAgQmVnaW5UcmFucyAtLT4gQ2FsY1JlY2hhcmdlW1wiQ2FsY3VsYXIgY2FudGlkYWRcIl1cbiAgICBDYWxjUmVjaGFyZ2UgLS0+IFVwZGF0ZVN0b2NrW1wiVVBEQVRFIHN0b2NrXCJdXG4gICAgXG4gICAgVXBkYXRlU3RvY2sgLS0+IExvZ0hpc3RvcnlbXCJJTlNFUlQgaGlzdG9yaWFsXCJdXG4gICAgTG9nSGlzdG9yeSAtLT4gVXBkYXRlQ29uZmlnW1wiVVBEQVRFIGNvbmZpZ1wiXVxuICAgIFxuICAgIFVwZGF0ZUNvbmZpZyAtLT4gQ29tbWl0W1wiQ09NTUlUIFRSQU5TQUNUSU9OXCJdXG4gICAgQ29tbWl0IC0tPiBTZW5kTm90aWZbXCJOb3RpZmljYXIgcHJvdmVlZG9yXCJdXG4gICAgU2VuZE5vdGlmIC0tPiBMb2dFdmVudFtcIlJlZ2lzdHJhciBlbiBsb2dcIl1cbiAgICBMb2dFdmVudCAtLi0+IExvb3BcbiAgICBcbiAgICBCZWdpblRyYW5zIC0uRXJyb3IuLT4gUm9sbGJhY2tbXCJST0xMQkFDS1wiXVxuICAgIFJvbGxiYWNrIC0tPiBMb2dFcnJvcltcIlJlZ2lzdHJhciBlcnJvclwiXVxuICAgIExvZ0Vycm9yIC0tPiBOb3RpZnlBZG1pbltcIk5vdGlmaWNhciBhZG1pblwiXVxuICAgIE5vdGlmeUFkbWluIC0uLT4gTG9vcFxuICAgIFxuICAgIHN0eWxlIFN0YXJ0IGZpbGw6IzkwRUU5MFxuICAgIHN0eWxlIEVuZCBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBTa2lwUHJvZHVjdCBmaWxsOiNEM0QzRDNcbiAgICBzdHlsZSBSb2xsYmFjayBmaWxsOiNGRkI2QzEiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpbzogVGltZXJcIl0pIC0tPiBUcmlnZ2VyW1wiQ2VsZXJ5IEJlYXQgdHJpZ2dlclxcbmNhZGEgMSBob3JhXCJdXG4gICAgVHJpZ2dlciAtLT4gR2V0UHJvZHVjdHNbXCJPYnRlbmVyIHByb2R1Y3RvcyBjb25cXG5yZWNhcmdhIGF1dG9tXHUwMGUxdGljYSBhY3RpdmFcIl1cbiAgICBHZXRQcm9kdWN0cyAtLT4gTG9vcHtcIk1cdTAwZTFzIHByb2R1Y3Rvc1xcbnBvciByZXZpc2FyP1wifVxuICAgIFxuICAgIExvb3AgLS0+fE5vfCBFbmRQcm9jZXNzW1wiRmluYWxpemFyIHByb2Nlc29cIl1cbiAgICBFbmRQcm9jZXNzIC0tPiBFbmQoW1wiRmluXCJdKVxuICAgIFxuICAgIExvb3AgLS0+fFNcdTAwZWR8IE5leHRQcm9kdWN0W1wiU2lndWllbnRlIHByb2R1Y3RvXCJdXG4gICAgTmV4dFByb2R1Y3QgLS0+IENoZWNrU3RvY2t7XCJTdG9jayBhY3R1YWwgPD1cXG5TdG9jayBtXHUwMGVkbmltbz9cIn1cbiAgICBcbiAgICBDaGVja1N0b2NrIC0tPnxOb3wgU2tpcFByb2R1Y3RbXCJObyByZXF1aWVyZSByZWNhcmdhXCJdXG4gICAgU2tpcFByb2R1Y3QgLS4tPiBMb29wXG4gICAgXG4gICAgQ2hlY2tTdG9jayAtLT58U1x1MDBlZHwgQmVnaW5UcmFuc1tcIkJFR0lOIFRSQU5TQUNUSU9OXCJdXG4gICAgQmVnaW5UcmFucyAtLT4gQ2FsY1JlY2hhcmdlW1wiQ2FsY3VsYXIgY2FudGlkYWRcIl1cbiAgICBDYWxjUmVjaGFyZ2UgLS0+IFVwZGF0ZVN0b2NrW1wiVVBEQVRFIHN0b2NrXCJdXG4gICAgXG4gICAgVXBkYXRlU3RvY2sgLS0+IExvZ0hpc3RvcnlbXCJJTlNFUlQgaGlzdG9yaWFsXCJdXG4gICAgTG9nSGlzdG9yeSAtLT4gVXBkYXRlQ29uZmlnW1wiVVBEQVRFIGNvbmZpZ1wiXVxuICAgIFxuICAgIFVwZGF0ZUNvbmZpZyAtLT4gQ29tbWl0W1wiQ09NTUlUIFRSQU5TQUNUSU9OXCJdXG4gICAgQ29tbWl0IC0tPiBTZW5kTm90aWZbXCJOb3RpZmljYXIgcHJvdmVlZG9yXCJdXG4gICAgU2VuZE5vdGlmIC0tPiBMb2dFdmVudFtcIlJlZ2lzdHJhciBlbiBsb2dcIl1cbiAgICBMb2dFdmVudCAtLi0+IExvb3BcbiAgICBcbiAgICBCZWdpblRyYW5zIC0uRXJyb3IuLT4gUm9sbGJhY2tbXCJST0xMQkFDS1wiXVxuICAgIFJvbGxiYWNrIC0tPiBMb2dFcnJvcltcIlJlZ2lzdHJhciBlcnJvclwiXVxuICAgIExvZ0Vycm9yIC0tPiBOb3RpZnlBZG1pbltcIk5vdGlmaWNhciBhZG1pblwiXVxuICAgIE5vdGlmeUFkbWluIC0uLT4gTG9vcFxuICAgIFxuICAgIHN0eWxlIFN0YXJ0IGZpbGw6IzkwRUU5MFxuICAgIHN0eWxlIEVuZCBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBTa2lwUHJvZHVjdCBmaWxsOiNEM0QzRDNcbiAgICBzdHlsZSBSb2xsYmFjayBmaWxsOiNGRkI2QzEiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TD
                        Start(["Inicio: Timer"]) --> Trigger["Celery Beat trigger\ncada 1 hora"]
                        Trigger --> GetProducts["Obtener productos con\nrecarga automática activa"]
                        GetProducts --> Loop{"Más productos\npor revisar?"}
                        
                        Loop -->|No| EndProcess["Finalizar proceso"]
                        EndProcess --> End(["Fin"])
                        
                        Loop -->|Sí| NextProduct["Siguiente producto"]
                        NextProduct --> CheckStock{"Stock actual <=\nStock mínimo?"}
                        
                        CheckStock -->|No| SkipProduct["No requiere recarga"]
                        SkipProduct -.-> Loop
                        
                        CheckStock -->|Sí| BeginTrans["BEGIN TRANSACTION"]
                        BeginTrans --> CalcRecharge["Calcular cantidad"]
                        CalcRecharge --> UpdateStock["UPDATE stock"]
                        
                        UpdateStock --> LogHistory["INSERT historial"]
                        LogHistory --> UpdateConfig["UPDATE config"]
                        
                        UpdateConfig --> Commit["COMMIT TRANSACTION"]
                        Commit --> SendNotif["Notificar proveedor"]
                        SendNotif --> LogEvent["Registrar en log"]
                        LogEvent -.-> Loop
                        
                        BeginTrans -.Error.-> Rollback["ROLLBACK"]
                        Rollback --> LogError["Registrar error"]
                        LogError --> NotifyAdmin["Notificar admin"]
                        NotifyAdmin -.-> Loop
                        
                        style Start fill:#90EE90
                        style End fill:#90EE90
                        style SkipProduct fill:#D3D3D3
                        style Rollback fill:#FFB6C1

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TD
                        Start(["Inicio"]) --> AdminLogin["Admin inicia sesión"]
                        AdminLogin --> NavProducts["Navegar Gestión"]
                        NavProducts --> ViewProducts["Ver lista productos"]
                        
                        ViewProducts --> SelectProduct["Seleccionar producto"]
                        SelectProduct --> ViewCurrent{"Proveedor\nactual?"}
                        
                        ViewCurrent -->|Sí| ConfirmChange{"Confirmar\ncambio?"}
                        ConfirmChange -->|No| ViewProducts
                        ConfirmChange -->|Sí| NewAssign["Nueva asignación"]
                        ViewCurrent -->|No| NewAssign
                        
                        NewAssign --> GetProviders["Listar proveedores"]
                        GetProviders --> SelectProvider["Seleccionar proveedor"]
                        
                        SelectProvider --> ValidateProvider{"Proveedor\nválido?"}
                        ValidateProvider -->|No| ErrorInvalid["Error: Inválido"]
                        ErrorInvalid -.-> GetProviders
                        
                        ValidateProvider -->|Sí| ConfirmAssign["Confirmar"]
                        ConfirmAssign --> UpdateProduct["UPDATE producto"]
                        
                        UpdateProduct --> CheckAutoStock{"Configurar\nrecarga auto?"}
                        CheckAutoStock -->|Sí| ConfigStock["Configurar"]
                        ConfigStock --> SetParams["Establecer parámetros"]
                        SetParams --> EnableAuto["Activar"]
                        EnableAuto --> SaveConfig["Guardar config"]
                        SaveConfig --> NotifyProvider
                        
                        CheckAutoStock -->|No| NotifyProvider["Notificar"]
                        NotifyProvider --> LogChange["Registrar auditoría"]
                        LogChange --> ShowSuccess["Éxito"]
                        ShowSuccess --> MoreAssign{"¿Más?"}
                        
                        MoreAssign -->|Sí| ViewProducts
                        MoreAssign -->|No| End(["Fin"])
                        
                        style Start fill:#90EE90
                        style End fill:#90EE90
                        style ErrorInvalid fill:#FFB6C1

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpb1wiXSkgLS0+IEFkbWluTG9naW5bXCJBZG1pbiBpbmljaWEgc2VzaVx1MDBmM25cIl1cbiAgICBBZG1pbkxvZ2luIC0tPiBOYXZQcm9kdWN0c1tcIk5hdmVnYXIgR2VzdGlcdTAwZjNuXCJdXG4gICAgTmF2UHJvZHVjdHMgLS0+IFZpZXdQcm9kdWN0c1tcIlZlciBsaXN0YSBwcm9kdWN0b3NcIl1cbiAgICBcbiAgICBWaWV3UHJvZHVjdHMgLS0+IFNlbGVjdFByb2R1Y3RbXCJTZWxlY2Npb25hciBwcm9kdWN0b1wiXVxuICAgIFNlbGVjdFByb2R1Y3QgLS0+IFZpZXdDdXJyZW50e1wiUHJvdmVlZG9yXFxuYWN0dWFsP1wifVxuICAgIFxuICAgIFZpZXdDdXJyZW50IC0tPnxTXHUwMGVkfCBDb25maXJtQ2hhbmdle1wiQ29uZmlybWFyXFxuY2FtYmlvP1wifVxuICAgIENvbmZpcm1DaGFuZ2UgLS0+fE5vfCBWaWV3UHJvZHVjdHNcbiAgICBDb25maXJtQ2hhbmdlIC0tPnxTXHUwMGVkfCBOZXdBc3NpZ25bXCJOdWV2YSBhc2lnbmFjaVx1MDBmM25cIl1cbiAgICBWaWV3Q3VycmVudCAtLT58Tm98IE5ld0Fzc2lnblxuICAgIFxuICAgIE5ld0Fzc2lnbiAtLT4gR2V0UHJvdmlkZXJzW1wiTGlzdGFyIHByb3ZlZWRvcmVzXCJdXG4gICAgR2V0UHJvdmlkZXJzIC0tPiBTZWxlY3RQcm92aWRlcltcIlNlbGVjY2lvbmFyIHByb3ZlZWRvclwiXVxuICAgIFxuICAgIFNlbGVjdFByb3ZpZGVyIC0tPiBWYWxpZGF0ZVByb3ZpZGVye1wiUHJvdmVlZG9yXFxudlx1MDBlMWxpZG8/XCJ9XG4gICAgVmFsaWRhdGVQcm92aWRlciAtLT58Tm98IEVycm9ySW52YWxpZFtcIkVycm9yOiBJbnZcdTAwZTFsaWRvXCJdXG4gICAgRXJyb3JJbnZhbGlkIC0uLT4gR2V0UHJvdmlkZXJzXG4gICAgXG4gICAgVmFsaWRhdGVQcm92aWRlciAtLT58U1x1MDBlZHwgQ29uZmlybUFzc2lnbltcIkNvbmZpcm1hclwiXVxuICAgIENvbmZpcm1Bc3NpZ24gLS0+IFVwZGF0ZVByb2R1Y3RbXCJVUERBVEUgcHJvZHVjdG9cIl1cbiAgICBcbiAgICBVcGRhdGVQcm9kdWN0IC0tPiBDaGVja0F1dG9TdG9ja3tcIkNvbmZpZ3VyYXJcXG5yZWNhcmdhIGF1dG8/XCJ9XG4gICAgQ2hlY2tBdXRvU3RvY2sgLS0+fFNcdTAwZWR8IENvbmZpZ1N0b2NrW1wiQ29uZmlndXJhclwiXVxuICAgIENvbmZpZ1N0b2NrIC0tPiBTZXRQYXJhbXNbXCJFc3RhYmxlY2VyIHBhclx1MDBlMW1ldHJvc1wiXVxuICAgIFNldFBhcmFtcyAtLT4gRW5hYmxlQXV0b1tcIkFjdGl2YXJcIl1cbiAgICBFbmFibGVBdXRvIC0tPiBTYXZlQ29uZmlnW1wiR3VhcmRhciBjb25maWdcIl1cbiAgICBTYXZlQ29uZmlnIC0tPiBOb3RpZnlQcm92aWRlclxuICAgIFxuICAgIENoZWNrQXV0b1N0b2NrIC0tPnxOb3wgTm90aWZ5UHJvdmlkZXJbXCJOb3RpZmljYXJcIl1cbiAgICBOb3RpZnlQcm92aWRlciAtLT4gTG9nQ2hhbmdlW1wiUmVnaXN0cmFyIGF1ZGl0b3JcdTAwZWRhXCJdXG4gICAgTG9nQ2hhbmdlIC0tPiBTaG93U3VjY2Vzc1tcIlx1MDBjOXhpdG9cIl1cbiAgICBTaG93U3VjY2VzcyAtLT4gTW9yZUFzc2lnbntcIlx1MDBiZk1cdTAwZTFzP1wifVxuICAgIFxuICAgIE1vcmVBc3NpZ24gLS0+fFNcdTAwZWR8IFZpZXdQcm9kdWN0c1xuICAgIE1vcmVBc3NpZ24gLS0+fE5vfCBFbmQoW1wiRmluXCJdKVxuICAgIFxuICAgIHN0eWxlIFN0YXJ0IGZpbGw6IzkwRUU5MFxuICAgIHN0eWxlIEVuZCBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBFcnJvckludmFsaWQgZmlsbDojRkZCNkMxIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpb1wiXSkgLS0+IEFkbWluTG9naW5bXCJBZG1pbiBpbmljaWEgc2VzaVx1MDBmM25cIl1cbiAgICBBZG1pbkxvZ2luIC0tPiBOYXZQcm9kdWN0c1tcIk5hdmVnYXIgR2VzdGlcdTAwZjNuXCJdXG4gICAgTmF2UHJvZHVjdHMgLS0+IFZpZXdQcm9kdWN0c1tcIlZlciBsaXN0YSBwcm9kdWN0b3NcIl1cbiAgICBcbiAgICBWaWV3UHJvZHVjdHMgLS0+IFNlbGVjdFByb2R1Y3RbXCJTZWxlY2Npb25hciBwcm9kdWN0b1wiXVxuICAgIFNlbGVjdFByb2R1Y3QgLS0+IFZpZXdDdXJyZW50e1wiUHJvdmVlZG9yXFxuYWN0dWFsP1wifVxuICAgIFxuICAgIFZpZXdDdXJyZW50IC0tPnxTXHUwMGVkfCBDb25maXJtQ2hhbmdle1wiQ29uZmlybWFyXFxuY2FtYmlvP1wifVxuICAgIENvbmZpcm1DaGFuZ2UgLS0+fE5vfCBWaWV3UHJvZHVjdHNcbiAgICBDb25maXJtQ2hhbmdlIC0tPnxTXHUwMGVkfCBOZXdBc3NpZ25bXCJOdWV2YSBhc2lnbmFjaVx1MDBmM25cIl1cbiAgICBWaWV3Q3VycmVudCAtLT58Tm98IE5ld0Fzc2lnblxuICAgIFxuICAgIE5ld0Fzc2lnbiAtLT4gR2V0UHJvdmlkZXJzW1wiTGlzdGFyIHByb3ZlZWRvcmVzXCJdXG4gICAgR2V0UHJvdmlkZXJzIC0tPiBTZWxlY3RQcm92aWRlcltcIlNlbGVjY2lvbmFyIHByb3ZlZWRvclwiXVxuICAgIFxuICAgIFNlbGVjdFByb3ZpZGVyIC0tPiBWYWxpZGF0ZVByb3ZpZGVye1wiUHJvdmVlZG9yXFxudlx1MDBlMWxpZG8/XCJ9XG4gICAgVmFsaWRhdGVQcm92aWRlciAtLT58Tm98IEVycm9ySW52YWxpZFtcIkVycm9yOiBJbnZcdTAwZTFsaWRvXCJdXG4gICAgRXJyb3JJbnZhbGlkIC0uLT4gR2V0UHJvdmlkZXJzXG4gICAgXG4gICAgVmFsaWRhdGVQcm92aWRlciAtLT58U1x1MDBlZHwgQ29uZmlybUFzc2lnbltcIkNvbmZpcm1hclwiXVxuICAgIENvbmZpcm1Bc3NpZ24gLS0+IFVwZGF0ZVByb2R1Y3RbXCJVUERBVEUgcHJvZHVjdG9cIl1cbiAgICBcbiAgICBVcGRhdGVQcm9kdWN0IC0tPiBDaGVja0F1dG9TdG9ja3tcIkNvbmZpZ3VyYXJcXG5yZWNhcmdhIGF1dG8/XCJ9XG4gICAgQ2hlY2tBdXRvU3RvY2sgLS0+fFNcdTAwZWR8IENvbmZpZ1N0b2NrW1wiQ29uZmlndXJhclwiXVxuICAgIENvbmZpZ1N0b2NrIC0tPiBTZXRQYXJhbXNbXCJFc3RhYmxlY2VyIHBhclx1MDBlMW1ldHJvc1wiXVxuICAgIFNldFBhcmFtcyAtLT4gRW5hYmxlQXV0b1tcIkFjdGl2YXJcIl1cbiAgICBFbmFibGVBdXRvIC0tPiBTYXZlQ29uZmlnW1wiR3VhcmRhciBjb25maWdcIl1cbiAgICBTYXZlQ29uZmlnIC0tPiBOb3RpZnlQcm92aWRlclxuICAgIFxuICAgIENoZWNrQXV0b1N0b2NrIC0tPnxOb3wgTm90aWZ5UHJvdmlkZXJbXCJOb3RpZmljYXJcIl1cbiAgICBOb3RpZnlQcm92aWRlciAtLT4gTG9nQ2hhbmdlW1wiUmVnaXN0cmFyIGF1ZGl0b3JcdTAwZWRhXCJdXG4gICAgTG9nQ2hhbmdlIC0tPiBTaG93U3VjY2Vzc1tcIlx1MDBjOXhpdG9cIl1cbiAgICBTaG93U3VjY2VzcyAtLT4gTW9yZUFzc2lnbntcIlx1MDBiZk1cdTAwZTFzP1wifVxuICAgIFxuICAgIE1vcmVBc3NpZ24gLS0+fFNcdTAwZWR8IFZpZXdQcm9kdWN0c1xuICAgIE1vcmVBc3NpZ24gLS0+fE5vfCBFbmQoW1wiRmluXCJdKVxuICAgIFxuICAgIHN0eWxlIFN0YXJ0IGZpbGw6IzkwRUU5MFxuICAgIHN0eWxlIEVuZCBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBFcnJvckludmFsaWQgZmlsbDojRkZCNkMxIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TD
                        Start(["Inicio"]) --> AdminLogin["Admin inicia sesión"]
                        AdminLogin --> NavProducts["Navegar Gestión"]
                        NavProducts --> ViewProducts["Ver lista productos"]
                        
                        ViewProducts --> SelectProduct["Seleccionar producto"]
                        SelectProduct --> ViewCurrent{"Proveedor\nactual?"}
                        
                        ViewCurrent -->|Sí| ConfirmChange{"Confirmar\ncambio?"}
                        ConfirmChange -->|No| ViewProducts
                        ConfirmChange -->|Sí| NewAssign["Nueva asignación"]
                        ViewCurrent -->|No| NewAssign
                        
                        NewAssign --> GetProviders["Listar proveedores"]
                        GetProviders --> SelectProvider["Seleccionar proveedor"]
                        
                        SelectProvider --> ValidateProvider{"Proveedor\nválido?"}
                        ValidateProvider -->|No| ErrorInvalid["Error: Inválido"]
                        ErrorInvalid -.-> GetProviders
                        
                        ValidateProvider -->|Sí| ConfirmAssign["Confirmar"]
                        ConfirmAssign --> UpdateProduct["UPDATE producto"]
                        
                        UpdateProduct --> CheckAutoStock{"Configurar\nrecarga auto?"}
                        CheckAutoStock -->|Sí| ConfigStock["Configurar"]
                        ConfigStock --> SetParams["Establecer parámetros"]
                        SetParams --> EnableAuto["Activar"]
                        EnableAuto --> SaveConfig["Guardar config"]
                        SaveConfig --> NotifyProvider
                        
                        CheckAutoStock -->|No| NotifyProvider["Notificar"]
                        NotifyProvider --> LogChange["Registrar auditoría"]
                        LogChange --> ShowSuccess["Éxito"]
                        ShowSuccess --> MoreAssign{"¿Más?"}
                        
                        MoreAssign -->|Sí| ViewProducts
                        MoreAssign -->|No| End(["Fin"])
                        
                        style Start fill:#90EE90
                        style End fill:#90EE90
                        style ErrorInvalid fill:#FFB6C1

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TD
                        Start(["Inicio"]) --> Login{"Usuario\nautenticado?"}
                        Login -->|No| RedirectLogin["Redirect login"]
                        RedirectLogin --> End1(["Fin"])
                        
                        Login -->|Sí| CheckRole{"Rol?"}
                        
                        CheckRole -->|Admin| AdminDash["Dashboard Admin"]
                        CheckRole -->|Proveedor| ProvDash["Dashboard Prov"]
                        CheckRole -->|Logística| LogiDash["Dashboard Log"]
                        CheckRole -->|Cliente| ClientDash["Dashboard Client"]
                        
                        AdminDash --> SelectReportType["Seleccionar reporte"]
                        SelectReportType --> ReportType{"Tipo?"}
                        
                        ReportType --> SalesReport["Ventas"]
                        ReportType --> StockReport["Stock"]
                        ReportType --> UsersReport["Usuarios"]
                        ReportType --> OrdersReport["Pedidos"]
                        
                        ProvDash --> ProvReports["Reportes Prov"]
                        LogiDash --> LogiReports["Reportes Log"]
                        ClientDash --> ClientReports["Reportes Client"]
                        
                        SalesReport --> SetParams["Parámetros"]
                        StockReport --> SetParams
                        UsersReport --> SetParams
                        OrdersReport --> SetParams
                        ProvReports --> SetParams
                        LogiReports --> SetParams
                        ClientReports --> SetParams
                        
                        SetParams --> QueryDB["Consultar DB"]
                        QueryDB --> ProcessData["Procesar"]
                        ProcessData --> GenerateChart["Gráficos"]
                        GenerateChart --> FormatReport["Formatear"]
                        
                        FormatReport --> ExportFormat{"Exportar?"}
                        ExportFormat -->|PDF| GenPDF["PDF"]
                        ExportFormat -->|Excel| GenExcel["Excel"]
                        ExportFormat -->|CSV| GenCSV["CSV"]
                        
                        GenPDF --> Download["Descargar"]
                        GenExcel --> Download
                        GenCSV --> Download
                        
                        Download --> SaveHistory["Historial"]
                        SaveHistory --> End2(["Fin"])
                        
                        style Start fill:#90EE90
                        style End1 fill:#FFB6C1
                        style End2 fill:#90EE90

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpb1wiXSkgLS0+IExvZ2lue1wiVXN1YXJpb1xcbmF1dGVudGljYWRvP1wifVxuICAgIExvZ2luIC0tPnxOb3wgUmVkaXJlY3RMb2dpbltcIlJlZGlyZWN0IGxvZ2luXCJdXG4gICAgUmVkaXJlY3RMb2dpbiAtLT4gRW5kMShbXCJGaW5cIl0pXG4gICAgXG4gICAgTG9naW4gLS0+fFNcdTAwZWR8IENoZWNrUm9sZXtcIlJvbD9cIn1cbiAgICBcbiAgICBDaGVja1JvbGUgLS0+fEFkbWlufCBBZG1pbkRhc2hbXCJEYXNoYm9hcmQgQWRtaW5cIl1cbiAgICBDaGVja1JvbGUgLS0+fFByb3ZlZWRvcnwgUHJvdkRhc2hbXCJEYXNoYm9hcmQgUHJvdlwiXVxuICAgIENoZWNrUm9sZSAtLT58TG9nXHUwMGVkc3RpY2F8IExvZ2lEYXNoW1wiRGFzaGJvYXJkIExvZ1wiXVxuICAgIENoZWNrUm9sZSAtLT58Q2xpZW50ZXwgQ2xpZW50RGFzaFtcIkRhc2hib2FyZCBDbGllbnRcIl1cbiAgICBcbiAgICBBZG1pbkRhc2ggLS0+IFNlbGVjdFJlcG9ydFR5cGVbXCJTZWxlY2Npb25hciByZXBvcnRlXCJdXG4gICAgU2VsZWN0UmVwb3J0VHlwZSAtLT4gUmVwb3J0VHlwZXtcIlRpcG8/XCJ9XG4gICAgXG4gICAgUmVwb3J0VHlwZSAtLT4gU2FsZXNSZXBvcnRbXCJWZW50YXNcIl1cbiAgICBSZXBvcnRUeXBlIC0tPiBTdG9ja1JlcG9ydFtcIlN0b2NrXCJdXG4gICAgUmVwb3J0VHlwZSAtLT4gVXNlcnNSZXBvcnRbXCJVc3Vhcmlvc1wiXVxuICAgIFJlcG9ydFR5cGUgLS0+IE9yZGVyc1JlcG9ydFtcIlBlZGlkb3NcIl1cbiAgICBcbiAgICBQcm92RGFzaCAtLT4gUHJvdlJlcG9ydHNbXCJSZXBvcnRlcyBQcm92XCJdXG4gICAgTG9naURhc2ggLS0+IExvZ2lSZXBvcnRzW1wiUmVwb3J0ZXMgTG9nXCJdXG4gICAgQ2xpZW50RGFzaCAtLT4gQ2xpZW50UmVwb3J0c1tcIlJlcG9ydGVzIENsaWVudFwiXVxuICAgIFxuICAgIFNhbGVzUmVwb3J0IC0tPiBTZXRQYXJhbXNbXCJQYXJcdTAwZTFtZXRyb3NcIl1cbiAgICBTdG9ja1JlcG9ydCAtLT4gU2V0UGFyYW1zXG4gICAgVXNlcnNSZXBvcnQgLS0+IFNldFBhcmFtc1xuICAgIE9yZGVyc1JlcG9ydCAtLT4gU2V0UGFyYW1zXG4gICAgUHJvdlJlcG9ydHMgLS0+IFNldFBhcmFtc1xuICAgIExvZ2lSZXBvcnRzIC0tPiBTZXRQYXJhbXNcbiAgICBDbGllbnRSZXBvcnRzIC0tPiBTZXRQYXJhbXNcbiAgICBcbiAgICBTZXRQYXJhbXMgLS0+IFF1ZXJ5REJbXCJDb25zdWx0YXIgREJcIl1cbiAgICBRdWVyeURCIC0tPiBQcm9jZXNzRGF0YVtcIlByb2Nlc2FyXCJdXG4gICAgUHJvY2Vzc0RhdGEgLS0+IEdlbmVyYXRlQ2hhcnRbXCJHclx1MDBlMWZpY29zXCJdXG4gICAgR2VuZXJhdGVDaGFydCAtLT4gRm9ybWF0UmVwb3J0W1wiRm9ybWF0ZWFyXCJdXG4gICAgXG4gICAgRm9ybWF0UmVwb3J0IC0tPiBFeHBvcnRGb3JtYXR7XCJFeHBvcnRhcj9cIn1cbiAgICBFeHBvcnRGb3JtYXQgLS0+fFBERnwgR2VuUERGW1wiUERGXCJdXG4gICAgRXhwb3J0Rm9ybWF0IC0tPnxFeGNlbHwgR2VuRXhjZWxbXCJFeGNlbFwiXVxuICAgIEV4cG9ydEZvcm1hdCAtLT58Q1NWfCBHZW5DU1ZbXCJDU1ZcIl1cbiAgICBcbiAgICBHZW5QREYgLS0+IERvd25sb2FkW1wiRGVzY2FyZ2FyXCJdXG4gICAgR2VuRXhjZWwgLS0+IERvd25sb2FkXG4gICAgR2VuQ1NWIC0tPiBEb3dubG9hZFxuICAgIFxuICAgIERvd25sb2FkIC0tPiBTYXZlSGlzdG9yeVtcIkhpc3RvcmlhbFwiXVxuICAgIFNhdmVIaXN0b3J5IC0tPiBFbmQyKFtcIkZpblwiXSlcbiAgICBcbiAgICBzdHlsZSBTdGFydCBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBFbmQxIGZpbGw6I0ZGQjZDMVxuICAgIHN0eWxlIEVuZDIgZmlsbDojOTBFRTkwIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpb1wiXSkgLS0+IExvZ2lue1wiVXN1YXJpb1xcbmF1dGVudGljYWRvP1wifVxuICAgIExvZ2luIC0tPnxOb3wgUmVkaXJlY3RMb2dpbltcIlJlZGlyZWN0IGxvZ2luXCJdXG4gICAgUmVkaXJlY3RMb2dpbiAtLT4gRW5kMShbXCJGaW5cIl0pXG4gICAgXG4gICAgTG9naW4gLS0+fFNcdTAwZWR8IENoZWNrUm9sZXtcIlJvbD9cIn1cbiAgICBcbiAgICBDaGVja1JvbGUgLS0+fEFkbWlufCBBZG1pbkRhc2hbXCJEYXNoYm9hcmQgQWRtaW5cIl1cbiAgICBDaGVja1JvbGUgLS0+fFByb3ZlZWRvcnwgUHJvdkRhc2hbXCJEYXNoYm9hcmQgUHJvdlwiXVxuICAgIENoZWNrUm9sZSAtLT58TG9nXHUwMGVkc3RpY2F8IExvZ2lEYXNoW1wiRGFzaGJvYXJkIExvZ1wiXVxuICAgIENoZWNrUm9sZSAtLT58Q2xpZW50ZXwgQ2xpZW50RGFzaFtcIkRhc2hib2FyZCBDbGllbnRcIl1cbiAgICBcbiAgICBBZG1pbkRhc2ggLS0+IFNlbGVjdFJlcG9ydFR5cGVbXCJTZWxlY2Npb25hciByZXBvcnRlXCJdXG4gICAgU2VsZWN0UmVwb3J0VHlwZSAtLT4gUmVwb3J0VHlwZXtcIlRpcG8/XCJ9XG4gICAgXG4gICAgUmVwb3J0VHlwZSAtLT4gU2FsZXNSZXBvcnRbXCJWZW50YXNcIl1cbiAgICBSZXBvcnRUeXBlIC0tPiBTdG9ja1JlcG9ydFtcIlN0b2NrXCJdXG4gICAgUmVwb3J0VHlwZSAtLT4gVXNlcnNSZXBvcnRbXCJVc3Vhcmlvc1wiXVxuICAgIFJlcG9ydFR5cGUgLS0+IE9yZGVyc1JlcG9ydFtcIlBlZGlkb3NcIl1cbiAgICBcbiAgICBQcm92RGFzaCAtLT4gUHJvdlJlcG9ydHNbXCJSZXBvcnRlcyBQcm92XCJdXG4gICAgTG9naURhc2ggLS0+IExvZ2lSZXBvcnRzW1wiUmVwb3J0ZXMgTG9nXCJdXG4gICAgQ2xpZW50RGFzaCAtLT4gQ2xpZW50UmVwb3J0c1tcIlJlcG9ydGVzIENsaWVudFwiXVxuICAgIFxuICAgIFNhbGVzUmVwb3J0IC0tPiBTZXRQYXJhbXNbXCJQYXJcdTAwZTFtZXRyb3NcIl1cbiAgICBTdG9ja1JlcG9ydCAtLT4gU2V0UGFyYW1zXG4gICAgVXNlcnNSZXBvcnQgLS0+IFNldFBhcmFtc1xuICAgIE9yZGVyc1JlcG9ydCAtLT4gU2V0UGFyYW1zXG4gICAgUHJvdlJlcG9ydHMgLS0+IFNldFBhcmFtc1xuICAgIExvZ2lSZXBvcnRzIC0tPiBTZXRQYXJhbXNcbiAgICBDbGllbnRSZXBvcnRzIC0tPiBTZXRQYXJhbXNcbiAgICBcbiAgICBTZXRQYXJhbXMgLS0+IFF1ZXJ5REJbXCJDb25zdWx0YXIgREJcIl1cbiAgICBRdWVyeURCIC0tPiBQcm9jZXNzRGF0YVtcIlByb2Nlc2FyXCJdXG4gICAgUHJvY2Vzc0RhdGEgLS0+IEdlbmVyYXRlQ2hhcnRbXCJHclx1MDBlMWZpY29zXCJdXG4gICAgR2VuZXJhdGVDaGFydCAtLT4gRm9ybWF0UmVwb3J0W1wiRm9ybWF0ZWFyXCJdXG4gICAgXG4gICAgRm9ybWF0UmVwb3J0IC0tPiBFeHBvcnRGb3JtYXR7XCJFeHBvcnRhcj9cIn1cbiAgICBFeHBvcnRGb3JtYXQgLS0+fFBERnwgR2VuUERGW1wiUERGXCJdXG4gICAgRXhwb3J0Rm9ybWF0IC0tPnxFeGNlbHwgR2VuRXhjZWxbXCJFeGNlbFwiXVxuICAgIEV4cG9ydEZvcm1hdCAtLT58Q1NWfCBHZW5DU1ZbXCJDU1ZcIl1cbiAgICBcbiAgICBHZW5QREYgLS0+IERvd25sb2FkW1wiRGVzY2FyZ2FyXCJdXG4gICAgR2VuRXhjZWwgLS0+IERvd25sb2FkXG4gICAgR2VuQ1NWIC0tPiBEb3dubG9hZFxuICAgIFxuICAgIERvd25sb2FkIC0tPiBTYXZlSGlzdG9yeVtcIkhpc3RvcmlhbFwiXVxuICAgIFNhdmVIaXN0b3J5IC0tPiBFbmQyKFtcIkZpblwiXSlcbiAgICBcbiAgICBzdHlsZSBTdGFydCBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBFbmQxIGZpbGw6I0ZGQjZDMVxuICAgIHN0eWxlIEVuZDIgZmlsbDojOTBFRTkwIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TD
                        Start(["Inicio"]) --> Login{"Usuario\nautenticado?"}
                        Login -->|No| RedirectLogin["Redirect login"]
                        RedirectLogin --> End1(["Fin"])
                        
                        Login -->|Sí| CheckRole{"Rol?"}
                        
                        CheckRole -->|Admin| AdminDash["Dashboard Admin"]
                        CheckRole -->|Proveedor| ProvDash["Dashboard Prov"]
                        CheckRole -->|Logística| LogiDash["Dashboard Log"]
                        CheckRole -->|Cliente| ClientDash["Dashboard Client"]
                        
                        AdminDash --> SelectReportType["Seleccionar reporte"]
                        SelectReportType --> ReportType{"Tipo?"}
                        
                        ReportType --> SalesReport["Ventas"]
                        ReportType --> StockReport["Stock"]
                        ReportType --> UsersReport["Usuarios"]
                        ReportType --> OrdersReport["Pedidos"]
                        
                        ProvDash --> ProvReports["Reportes Prov"]
                        LogiDash --> LogiReports["Reportes Log"]
                        ClientDash --> ClientReports["Reportes Client"]
                        
                        SalesReport --> SetParams["Parámetros"]
                        StockReport --> SetParams
                        UsersReport --> SetParams
                        OrdersReport --> SetParams
                        ProvReports --> SetParams
                        LogiReports --> SetParams
                        ClientReports --> SetParams
                        
                        SetParams --> QueryDB["Consultar DB"]
                        QueryDB --> ProcessData["Procesar"]
                        ProcessData --> GenerateChart["Gráficos"]
                        GenerateChart --> FormatReport["Formatear"]
                        
                        FormatReport --> ExportFormat{"Exportar?"}
                        ExportFormat -->|PDF| GenPDF["PDF"]
                        ExportFormat -->|Excel| GenExcel["Excel"]
                        ExportFormat -->|CSV| GenCSV["CSV"]
                        
                        GenPDF --> Download["Descargar"]
                        GenExcel --> Download
                        GenCSV --> Download
                        
                        Download --> SaveHistory["Historial"]
                        SaveHistory --> End2(["Fin"])
                        
                        style Start fill:#90EE90
                        style End1 fill:#FFB6C1
                        style End2 fill:#90EE90

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TD
                        Start(["Inicio"]) --> ViewProfile["Ver perfil"]
                        ViewProfile --> SelectAction{"Acción?"}
                        
                        SelectAction -->|Editar| EditProfile
                        SelectAction -->|Pass| ChangePass
                        SelectAction -->|Deactivate| DeactivateAcc["Desactivar"]
                        SelectAction -->|Delete| DeleteAcc["Eliminar"]
                        
                        %% Edit Profile
                        EditProfile --> InputChanges["Ingresar"]
                        InputChanges --> ValidateChanges{"Válido?"}
                        ValidateChanges -->|No| ShowErrors["Error"]
                        ShowErrors -.-> InputChanges
                        ValidateChanges -->|Sí| SaveChanges["Guardar"]
                        SaveChanges --> SuccessMsg["Éxito"]
                        SuccessMsg --> ViewProfile
                        
                        %% Change Pass
                        ChangePass --> InputOldPass["Pass actual"]
                        InputOldPass --> VerifyOldPass{"Correcta?"}
                        VerifyOldPass -->|No| ErrorOldPass["Error"]
                        ErrorOldPass -.-> ChangePass
                        
                        VerifyOldPass -->|Sí| InputNewPass["Nueva pass"]
                        InputNewPass --> CheckStrength{"Fuerte?"}
                        CheckStrength -->|No| ErrorWeak["Débil"]
                        ErrorWeak -.-> InputNewPass
                        
                        CheckStrength -->|Sí| CheckHistory{"Usada?"}
                        CheckHistory -->|Sí| ErrorUsed["Usada"]
                        ErrorUsed -.-> InputNewPass
                        
                        CheckHistory -->|No| UpdatePass["Actualizar"]
                        UpdatePass --> SaveHistory["Historial"]
                        SaveHistory --> LogoutAll["Logout all"]
                        LogoutAll --> Redirect["Login"]
                        Redirect --> End1(["Fin"])
                        
                        %% Deactivate
                        DeactivateAcc --> ConfirmDeact{"Confirmar?"}
                        ConfirmDeact -->|No| ViewProfile
                        ConfirmDeact -->|Sí| SetSelfDeact["Desactivar"]
                        SetSelfDeact --> Logout["Logout"]
                        Logout --> End2(["Fin"])
                        
                        %% Delete
                        DeleteAcc --> ConfirmDelete{"Confirmar?"}
                        ConfirmDelete -->|No| ViewProfile
                        ConfirmDelete -->|Sí| NotifyAdmin["Notificar Admin"]
                        NotifyAdmin --> PendingReview["Revisión"]
                        PendingReview --> End3(["Fin"])
                        
                        style Start fill:#90EE90
                        style End1 fill:#87CEEB
                        style End2 fill:#FFA500
                        style End3 fill:#FFA500
                        style ErrorOldPass fill:#FFB6C1
                        style ErrorWeak fill:#FFB6C1
                        style ErrorUsed fill:#FFB6C1

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpb1wiXSkgLS0+IFZpZXdQcm9maWxlW1wiVmVyIHBlcmZpbFwiXVxuICAgIFZpZXdQcm9maWxlIC0tPiBTZWxlY3RBY3Rpb257XCJBY2NpXHUwMGYzbj9cIn1cbiAgICBcbiAgICBTZWxlY3RBY3Rpb24gLS0+fEVkaXRhcnwgRWRpdFByb2ZpbGVcbiAgICBTZWxlY3RBY3Rpb24gLS0+fFBhc3N8IENoYW5nZVBhc3NcbiAgICBTZWxlY3RBY3Rpb24gLS0+fERlYWN0aXZhdGV8IERlYWN0aXZhdGVBY2NbXCJEZXNhY3RpdmFyXCJdXG4gICAgU2VsZWN0QWN0aW9uIC0tPnxEZWxldGV8IERlbGV0ZUFjY1tcIkVsaW1pbmFyXCJdXG4gICAgXG4gICAgJSUgRWRpdCBQcm9maWxlXG4gICAgRWRpdFByb2ZpbGUgLS0+IElucHV0Q2hhbmdlc1tcIkluZ3Jlc2FyXCJdXG4gICAgSW5wdXRDaGFuZ2VzIC0tPiBWYWxpZGF0ZUNoYW5nZXN7XCJWXHUwMGUxbGlkbz9cIn1cbiAgICBWYWxpZGF0ZUNoYW5nZXMgLS0+fE5vfCBTaG93RXJyb3JzW1wiRXJyb3JcIl1cbiAgICBTaG93RXJyb3JzIC0uLT4gSW5wdXRDaGFuZ2VzXG4gICAgVmFsaWRhdGVDaGFuZ2VzIC0tPnxTXHUwMGVkfCBTYXZlQ2hhbmdlc1tcIkd1YXJkYXJcIl1cbiAgICBTYXZlQ2hhbmdlcyAtLT4gU3VjY2Vzc01zZ1tcIlx1MDBjOXhpdG9cIl1cbiAgICBTdWNjZXNzTXNnIC0tPiBWaWV3UHJvZmlsZVxuICAgIFxuICAgICUlIENoYW5nZSBQYXNzXG4gICAgQ2hhbmdlUGFzcyAtLT4gSW5wdXRPbGRQYXNzW1wiUGFzcyBhY3R1YWxcIl1cbiAgICBJbnB1dE9sZFBhc3MgLS0+IFZlcmlmeU9sZFBhc3N7XCJDb3JyZWN0YT9cIn1cbiAgICBWZXJpZnlPbGRQYXNzIC0tPnxOb3wgRXJyb3JPbGRQYXNzW1wiRXJyb3JcIl1cbiAgICBFcnJvck9sZFBhc3MgLS4tPiBDaGFuZ2VQYXNzXG4gICAgXG4gICAgVmVyaWZ5T2xkUGFzcyAtLT58U1x1MDBlZHwgSW5wdXROZXdQYXNzW1wiTnVldmEgcGFzc1wiXVxuICAgIElucHV0TmV3UGFzcyAtLT4gQ2hlY2tTdHJlbmd0aHtcIkZ1ZXJ0ZT9cIn1cbiAgICBDaGVja1N0cmVuZ3RoIC0tPnxOb3wgRXJyb3JXZWFrW1wiRFx1MDBlOWJpbFwiXVxuICAgIEVycm9yV2VhayAtLi0+IElucHV0TmV3UGFzc1xuICAgIFxuICAgIENoZWNrU3RyZW5ndGggLS0+fFNcdTAwZWR8IENoZWNrSGlzdG9yeXtcIlVzYWRhP1wifVxuICAgIENoZWNrSGlzdG9yeSAtLT58U1x1MDBlZHwgRXJyb3JVc2VkW1wiVXNhZGFcIl1cbiAgICBFcnJvclVzZWQgLS4tPiBJbnB1dE5ld1Bhc3NcbiAgICBcbiAgICBDaGVja0hpc3RvcnkgLS0+fE5vfCBVcGRhdGVQYXNzW1wiQWN0dWFsaXphclwiXVxuICAgIFVwZGF0ZVBhc3MgLS0+IFNhdmVIaXN0b3J5W1wiSGlzdG9yaWFsXCJdXG4gICAgU2F2ZUhpc3RvcnkgLS0+IExvZ291dEFsbFtcIkxvZ291dCBhbGxcIl1cbiAgICBMb2dvdXRBbGwgLS0+IFJlZGlyZWN0W1wiTG9naW5cIl1cbiAgICBSZWRpcmVjdCAtLT4gRW5kMShbXCJGaW5cIl0pXG4gICAgXG4gICAgJSUgRGVhY3RpdmF0ZVxuICAgIERlYWN0aXZhdGVBY2MgLS0+IENvbmZpcm1EZWFjdHtcIkNvbmZpcm1hcj9cIn1cbiAgICBDb25maXJtRGVhY3QgLS0+fE5vfCBWaWV3UHJvZmlsZVxuICAgIENvbmZpcm1EZWFjdCAtLT58U1x1MDBlZHwgU2V0U2VsZkRlYWN0W1wiRGVzYWN0aXZhclwiXVxuICAgIFNldFNlbGZEZWFjdCAtLT4gTG9nb3V0W1wiTG9nb3V0XCJdXG4gICAgTG9nb3V0IC0tPiBFbmQyKFtcIkZpblwiXSlcbiAgICBcbiAgICAlJSBEZWxldGVcbiAgICBEZWxldGVBY2MgLS0+IENvbmZpcm1EZWxldGV7XCJDb25maXJtYXI/XCJ9XG4gICAgQ29uZmlybURlbGV0ZSAtLT58Tm98IFZpZXdQcm9maWxlXG4gICAgQ29uZmlybURlbGV0ZSAtLT58U1x1MDBlZHwgTm90aWZ5QWRtaW5bXCJOb3RpZmljYXIgQWRtaW5cIl1cbiAgICBOb3RpZnlBZG1pbiAtLT4gUGVuZGluZ1Jldmlld1tcIlJldmlzaVx1MDBmM25cIl1cbiAgICBQZW5kaW5nUmV2aWV3IC0tPiBFbmQzKFtcIkZpblwiXSlcbiAgICBcbiAgICBzdHlsZSBTdGFydCBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBFbmQxIGZpbGw6Izg3Q0VFQlxuICAgIHN0eWxlIEVuZDIgZmlsbDojRkZBNTAwXG4gICAgc3R5bGUgRW5kMyBmaWxsOiNGRkE1MDBcbiAgICBzdHlsZSBFcnJvck9sZFBhc3MgZmlsbDojRkZCNkMxXG4gICAgc3R5bGUgRXJyb3JXZWFrIGZpbGw6I0ZGQjZDMVxuICAgIHN0eWxlIEVycm9yVXNlZCBmaWxsOiNGRkI2QzEiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBURFxuICAgIFN0YXJ0KFtcIkluaWNpb1wiXSkgLS0+IFZpZXdQcm9maWxlW1wiVmVyIHBlcmZpbFwiXVxuICAgIFZpZXdQcm9maWxlIC0tPiBTZWxlY3RBY3Rpb257XCJBY2NpXHUwMGYzbj9cIn1cbiAgICBcbiAgICBTZWxlY3RBY3Rpb24gLS0+fEVkaXRhcnwgRWRpdFByb2ZpbGVcbiAgICBTZWxlY3RBY3Rpb24gLS0+fFBhc3N8IENoYW5nZVBhc3NcbiAgICBTZWxlY3RBY3Rpb24gLS0+fERlYWN0aXZhdGV8IERlYWN0aXZhdGVBY2NbXCJEZXNhY3RpdmFyXCJdXG4gICAgU2VsZWN0QWN0aW9uIC0tPnxEZWxldGV8IERlbGV0ZUFjY1tcIkVsaW1pbmFyXCJdXG4gICAgXG4gICAgJSUgRWRpdCBQcm9maWxlXG4gICAgRWRpdFByb2ZpbGUgLS0+IElucHV0Q2hhbmdlc1tcIkluZ3Jlc2FyXCJdXG4gICAgSW5wdXRDaGFuZ2VzIC0tPiBWYWxpZGF0ZUNoYW5nZXN7XCJWXHUwMGUxbGlkbz9cIn1cbiAgICBWYWxpZGF0ZUNoYW5nZXMgLS0+fE5vfCBTaG93RXJyb3JzW1wiRXJyb3JcIl1cbiAgICBTaG93RXJyb3JzIC0uLT4gSW5wdXRDaGFuZ2VzXG4gICAgVmFsaWRhdGVDaGFuZ2VzIC0tPnxTXHUwMGVkfCBTYXZlQ2hhbmdlc1tcIkd1YXJkYXJcIl1cbiAgICBTYXZlQ2hhbmdlcyAtLT4gU3VjY2Vzc01zZ1tcIlx1MDBjOXhpdG9cIl1cbiAgICBTdWNjZXNzTXNnIC0tPiBWaWV3UHJvZmlsZVxuICAgIFxuICAgICUlIENoYW5nZSBQYXNzXG4gICAgQ2hhbmdlUGFzcyAtLT4gSW5wdXRPbGRQYXNzW1wiUGFzcyBhY3R1YWxcIl1cbiAgICBJbnB1dE9sZFBhc3MgLS0+IFZlcmlmeU9sZFBhc3N7XCJDb3JyZWN0YT9cIn1cbiAgICBWZXJpZnlPbGRQYXNzIC0tPnxOb3wgRXJyb3JPbGRQYXNzW1wiRXJyb3JcIl1cbiAgICBFcnJvck9sZFBhc3MgLS4tPiBDaGFuZ2VQYXNzXG4gICAgXG4gICAgVmVyaWZ5T2xkUGFzcyAtLT58U1x1MDBlZHwgSW5wdXROZXdQYXNzW1wiTnVldmEgcGFzc1wiXVxuICAgIElucHV0TmV3UGFzcyAtLT4gQ2hlY2tTdHJlbmd0aHtcIkZ1ZXJ0ZT9cIn1cbiAgICBDaGVja1N0cmVuZ3RoIC0tPnxOb3wgRXJyb3JXZWFrW1wiRFx1MDBlOWJpbFwiXVxuICAgIEVycm9yV2VhayAtLi0+IElucHV0TmV3UGFzc1xuICAgIFxuICAgIENoZWNrU3RyZW5ndGggLS0+fFNcdTAwZWR8IENoZWNrSGlzdG9yeXtcIlVzYWRhP1wifVxuICAgIENoZWNrSGlzdG9yeSAtLT58U1x1MDBlZHwgRXJyb3JVc2VkW1wiVXNhZGFcIl1cbiAgICBFcnJvclVzZWQgLS4tPiBJbnB1dE5ld1Bhc3NcbiAgICBcbiAgICBDaGVja0hpc3RvcnkgLS0+fE5vfCBVcGRhdGVQYXNzW1wiQWN0dWFsaXphclwiXVxuICAgIFVwZGF0ZVBhc3MgLS0+IFNhdmVIaXN0b3J5W1wiSGlzdG9yaWFsXCJdXG4gICAgU2F2ZUhpc3RvcnkgLS0+IExvZ291dEFsbFtcIkxvZ291dCBhbGxcIl1cbiAgICBMb2dvdXRBbGwgLS0+IFJlZGlyZWN0W1wiTG9naW5cIl1cbiAgICBSZWRpcmVjdCAtLT4gRW5kMShbXCJGaW5cIl0pXG4gICAgXG4gICAgJSUgRGVhY3RpdmF0ZVxuICAgIERlYWN0aXZhdGVBY2MgLS0+IENvbmZpcm1EZWFjdHtcIkNvbmZpcm1hcj9cIn1cbiAgICBDb25maXJtRGVhY3QgLS0+fE5vfCBWaWV3UHJvZmlsZVxuICAgIENvbmZpcm1EZWFjdCAtLT58U1x1MDBlZHwgU2V0U2VsZkRlYWN0W1wiRGVzYWN0aXZhclwiXVxuICAgIFNldFNlbGZEZWFjdCAtLT4gTG9nb3V0W1wiTG9nb3V0XCJdXG4gICAgTG9nb3V0IC0tPiBFbmQyKFtcIkZpblwiXSlcbiAgICBcbiAgICAlJSBEZWxldGVcbiAgICBEZWxldGVBY2MgLS0+IENvbmZpcm1EZWxldGV7XCJDb25maXJtYXI/XCJ9XG4gICAgQ29uZmlybURlbGV0ZSAtLT58Tm98IFZpZXdQcm9maWxlXG4gICAgQ29uZmlybURlbGV0ZSAtLT58U1x1MDBlZHwgTm90aWZ5QWRtaW5bXCJOb3RpZmljYXIgQWRtaW5cIl1cbiAgICBOb3RpZnlBZG1pbiAtLT4gUGVuZGluZ1Jldmlld1tcIlJldmlzaVx1MDBmM25cIl1cbiAgICBQZW5kaW5nUmV2aWV3IC0tPiBFbmQzKFtcIkZpblwiXSlcbiAgICBcbiAgICBzdHlsZSBTdGFydCBmaWxsOiM5MEVFOTBcbiAgICBzdHlsZSBFbmQxIGZpbGw6Izg3Q0VFQlxuICAgIHN0eWxlIEVuZDIgZmlsbDojRkZBNTAwXG4gICAgc3R5bGUgRW5kMyBmaWxsOiNGRkE1MDBcbiAgICBzdHlsZSBFcnJvck9sZFBhc3MgZmlsbDojRkZCNkMxXG4gICAgc3R5bGUgRXJyb3JXZWFrIGZpbGw6I0ZGQjZDMVxuICAgIHN0eWxlIEVycm9yVXNlZCBmaWxsOiNGRkI2QzEiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TD
                        Start(["Inicio"]) --> ViewProfile["Ver perfil"]
                        ViewProfile --> SelectAction{"Acción?"}
                        
                        SelectAction -->|Editar| EditProfile
                        SelectAction -->|Pass| ChangePass
                        SelectAction -->|Deactivate| DeactivateAcc["Desactivar"]
                        SelectAction -->|Delete| DeleteAcc["Eliminar"]
                        
                        %% Edit Profile
                        EditProfile --> InputChanges["Ingresar"]
                        InputChanges --> ValidateChanges{"Válido?"}
                        ValidateChanges -->|No| ShowErrors["Error"]
                        ShowErrors -.-> InputChanges
                        ValidateChanges -->|Sí| SaveChanges["Guardar"]
                        SaveChanges --> SuccessMsg["Éxito"]
                        SuccessMsg --> ViewProfile
                        
                        %% Change Pass
                        ChangePass --> InputOldPass["Pass actual"]
                        InputOldPass --> VerifyOldPass{"Correcta?"}
                        VerifyOldPass -->|No| ErrorOldPass["Error"]
                        ErrorOldPass -.-> ChangePass
                        
                        VerifyOldPass -->|Sí| InputNewPass["Nueva pass"]
                        InputNewPass --> CheckStrength{"Fuerte?"}
                        CheckStrength -->|No| ErrorWeak["Débil"]
                        ErrorWeak -.-> InputNewPass
                        
                        CheckStrength -->|Sí| CheckHistory{"Usada?"}
                        CheckHistory -->|Sí| ErrorUsed["Usada"]
                        ErrorUsed -.-> InputNewPass
                        
                        CheckHistory -->|No| UpdatePass["Actualizar"]
                        UpdatePass --> SaveHistory["Historial"]
                        SaveHistory --> LogoutAll["Logout all"]
                        LogoutAll --> Redirect["Login"]
                        Redirect --> End1(["Fin"])
                        
                        %% Deactivate
                        DeactivateAcc --> ConfirmDeact{"Confirmar?"}
                        ConfirmDeact -->|No| ViewProfile
                        ConfirmDeact -->|Sí| SetSelfDeact["Desactivar"]
                        SetSelfDeact --> Logout["Logout"]
                        Logout --> End2(["Fin"])
                        
                        %% Delete
                        DeleteAcc --> ConfirmDelete{"Confirmar?"}
                        ConfirmDelete -->|No| ViewProfile
                        ConfirmDelete -->|Sí| NotifyAdmin["Notificar Admin"]
                        NotifyAdmin --> PendingReview["Revisión"]
                        PendingReview --> End3(["Fin"])
                        
                        style Start fill:#90EE90
                        style End1 fill:#87CEEB
                        style End2 fill:#FFA500
                        style End3 fill:#FFA500
                        style ErrorOldPass fill:#FFB6C1
                        style ErrorWeak fill:#FFB6C1
                        style ErrorUsed fill:#FFB6C1


.. dropdown:: 📊 Diagrama Casos Uso("5 diagramas")
    :open:
    :class-container: sd-mb-4

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart LR
                        %% Actors on the Left
                        Admin((Administrador))
                        Proveedor((Proveedor))
                        Logistica((Logística))
                        Cliente((Cliente))
                        Sistema_Ext["Sistema Externo"]
                    
                        %% System Boundary
                        subgraph "SISTEMA PREXCOL"
                            direction TB
                            
                            subgraph "Módulo de Autenticación"
                                UC1["Registrarse"]
                                UC2["Iniciar Sesión"]
                                UC3["Recuperar Contraseña"]
                                UC4["Cambiar Contraseña"]
                                UC5["Gestionar Cuenta"]
                            end
                    
                            subgraph "Módulo de Productos"
                                UC6["Gestionar Tiendas"]
                                UC7["Gestionar Productos"]
                                UC8["Asignar Productos"]
                                UC9["Navegar Catálogo"]
                                UC10["Buscar Productos"]
                            end
                    
                            subgraph "Módulo de Stock"
                                UC11["Configurar Recarga Auto"]
                                UC12["Recargar Stock Manual"]
                                UC13["Ver Historial Recargas"]
                                UC14["Monitorear Stock"]
                            end
                    
                            subgraph "Módulo de Pedidos"
                                UC15["Crear Pedido"]
                                UC16["Procesar Pago"]
                                UC17["Gestionar Pedidos"]
                                UC18["Cambiar Estado Pedido"]
                                UC19["Ver Mis Pedidos"]
                            end
                    
                            subgraph "Módulo de Ventas"
                                UC20["Generar Venta"]
                                UC21["Ver Historial Ventas"]
                                UC22["Generar Reportes"]
                            end
                    
                            subgraph "Módulo de Administración"
                                UC26["Gestionar Usuarios"]
                                UC27["Suspender Cuenta"]
                                UC28["Ver Dashboard"]
                                UC29["Configurar Sistema"]
                            end
                            
                            subgraph "Módulo de Notificaciones"
                                UC23["Enviar Notificación"]
                                UC24["Ver Notificaciones"]
                                UC25["Marcar como Leída"]
                            end
                        end
                    
                        %% Relationships - Organized to reduce crossing
                        %% Admin Connections
                        Admin --> UC1
                        Admin --> UC2
                        Admin --> UC6
                        Admin --> UC7
                        Admin --> UC8
                        Admin --> UC22
                        Admin --> UC26
                        Admin --> UC27
                        Admin --> UC28
                        
                        %% Provider Connections
                        Proveedor --> UC1
                        Proveedor --> UC2
                        Proveedor --> UC7
                        Proveedor --> UC11
                        Proveedor --> UC12
                        Proveedor --> UC13
                        Proveedor --> UC14
                        Proveedor --> UC22
                        
                        %% Logistica Connections
                        Logistica --> UC1
                        Logistica --> UC2
                        Logistica --> UC17
                        Logistica --> UC18
                        Logistica --> UC28
                        
                        %% Client Connections
                        Cliente --> UC1
                        Cliente --> UC2
                        Cliente --> UC9
                        Cliente --> UC10
                        Cliente --> UC15
                        Cliente --> UC16
                        Cliente --> UC19
                        Cliente --> UC24
                    
                        %% Include/Extend
                        UC16 -.-> Sistema_Ext
                        UC23 -.-> Sistema_Ext

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgICUlIEFjdG9ycyBvbiB0aGUgTGVmdFxuICAgIEFkbWluKChBZG1pbmlzdHJhZG9yKSlcbiAgICBQcm92ZWVkb3IoKFByb3ZlZWRvcikpXG4gICAgTG9naXN0aWNhKChMb2dcdTAwZWRzdGljYSkpXG4gICAgQ2xpZW50ZSgoQ2xpZW50ZSkpXG4gICAgU2lzdGVtYV9FeHRbXCJTaXN0ZW1hIEV4dGVybm9cIl1cblxuICAgICUlIFN5c3RlbSBCb3VuZGFyeVxuICAgIHN1YmdyYXBoIFwiU0lTVEVNQSBQUkVYQ09MXCJcbiAgICAgICAgZGlyZWN0aW9uIFRCXG4gICAgICAgIFxuICAgICAgICBzdWJncmFwaCBcIk1cdTAwZjNkdWxvIGRlIEF1dGVudGljYWNpXHUwMGYzblwiXG4gICAgICAgICAgICBVQzFbXCJSZWdpc3RyYXJzZVwiXVxuICAgICAgICAgICAgVUMyW1wiSW5pY2lhciBTZXNpXHUwMGYzblwiXVxuICAgICAgICAgICAgVUMzW1wiUmVjdXBlcmFyIENvbnRyYXNlXHUwMGYxYVwiXVxuICAgICAgICAgICAgVUM0W1wiQ2FtYmlhciBDb250cmFzZVx1MDBmMWFcIl1cbiAgICAgICAgICAgIFVDNVtcIkdlc3Rpb25hciBDdWVudGFcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJNXHUwMGYzZHVsbyBkZSBQcm9kdWN0b3NcIlxuICAgICAgICAgICAgVUM2W1wiR2VzdGlvbmFyIFRpZW5kYXNcIl1cbiAgICAgICAgICAgIFVDN1tcIkdlc3Rpb25hciBQcm9kdWN0b3NcIl1cbiAgICAgICAgICAgIFVDOFtcIkFzaWduYXIgUHJvZHVjdG9zXCJdXG4gICAgICAgICAgICBVQzlbXCJOYXZlZ2FyIENhdFx1MDBlMWxvZ29cIl1cbiAgICAgICAgICAgIFVDMTBbXCJCdXNjYXIgUHJvZHVjdG9zXCJdXG4gICAgICAgIGVuZFxuXG4gICAgICAgIHN1YmdyYXBoIFwiTVx1MDBmM2R1bG8gZGUgU3RvY2tcIlxuICAgICAgICAgICAgVUMxMVtcIkNvbmZpZ3VyYXIgUmVjYXJnYSBBdXRvXCJdXG4gICAgICAgICAgICBVQzEyW1wiUmVjYXJnYXIgU3RvY2sgTWFudWFsXCJdXG4gICAgICAgICAgICBVQzEzW1wiVmVyIEhpc3RvcmlhbCBSZWNhcmdhc1wiXVxuICAgICAgICAgICAgVUMxNFtcIk1vbml0b3JlYXIgU3RvY2tcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJNXHUwMGYzZHVsbyBkZSBQZWRpZG9zXCJcbiAgICAgICAgICAgIFVDMTVbXCJDcmVhciBQZWRpZG9cIl1cbiAgICAgICAgICAgIFVDMTZbXCJQcm9jZXNhciBQYWdvXCJdXG4gICAgICAgICAgICBVQzE3W1wiR2VzdGlvbmFyIFBlZGlkb3NcIl1cbiAgICAgICAgICAgIFVDMThbXCJDYW1iaWFyIEVzdGFkbyBQZWRpZG9cIl1cbiAgICAgICAgICAgIFVDMTlbXCJWZXIgTWlzIFBlZGlkb3NcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJNXHUwMGYzZHVsbyBkZSBWZW50YXNcIlxuICAgICAgICAgICAgVUMyMFtcIkdlbmVyYXIgVmVudGFcIl1cbiAgICAgICAgICAgIFVDMjFbXCJWZXIgSGlzdG9yaWFsIFZlbnRhc1wiXVxuICAgICAgICAgICAgVUMyMltcIkdlbmVyYXIgUmVwb3J0ZXNcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJNXHUwMGYzZHVsbyBkZSBBZG1pbmlzdHJhY2lcdTAwZjNuXCJcbiAgICAgICAgICAgIFVDMjZbXCJHZXN0aW9uYXIgVXN1YXJpb3NcIl1cbiAgICAgICAgICAgIFVDMjdbXCJTdXNwZW5kZXIgQ3VlbnRhXCJdXG4gICAgICAgICAgICBVQzI4W1wiVmVyIERhc2hib2FyZFwiXVxuICAgICAgICAgICAgVUMyOVtcIkNvbmZpZ3VyYXIgU2lzdGVtYVwiXVxuICAgICAgICBlbmRcbiAgICAgICAgXG4gICAgICAgIHN1YmdyYXBoIFwiTVx1MDBmM2R1bG8gZGUgTm90aWZpY2FjaW9uZXNcIlxuICAgICAgICAgICAgVUMyM1tcIkVudmlhciBOb3RpZmljYWNpXHUwMGYzblwiXVxuICAgICAgICAgICAgVUMyNFtcIlZlciBOb3RpZmljYWNpb25lc1wiXVxuICAgICAgICAgICAgVUMyNVtcIk1hcmNhciBjb21vIExlXHUwMGVkZGFcIl1cbiAgICAgICAgZW5kXG4gICAgZW5kXG5cbiAgICAlJSBSZWxhdGlvbnNoaXBzIC0gT3JnYW5pemVkIHRvIHJlZHVjZSBjcm9zc2luZ1xuICAgICUlIEFkbWluIENvbm5lY3Rpb25zXG4gICAgQWRtaW4gLS0+IFVDMVxuICAgIEFkbWluIC0tPiBVQzJcbiAgICBBZG1pbiAtLT4gVUM2XG4gICAgQWRtaW4gLS0+IFVDN1xuICAgIEFkbWluIC0tPiBVQzhcbiAgICBBZG1pbiAtLT4gVUMyMlxuICAgIEFkbWluIC0tPiBVQzI2XG4gICAgQWRtaW4gLS0+IFVDMjdcbiAgICBBZG1pbiAtLT4gVUMyOFxuICAgIFxuICAgICUlIFByb3ZpZGVyIENvbm5lY3Rpb25zXG4gICAgUHJvdmVlZG9yIC0tPiBVQzFcbiAgICBQcm92ZWVkb3IgLS0+IFVDMlxuICAgIFByb3ZlZWRvciAtLT4gVUM3XG4gICAgUHJvdmVlZG9yIC0tPiBVQzExXG4gICAgUHJvdmVlZG9yIC0tPiBVQzEyXG4gICAgUHJvdmVlZG9yIC0tPiBVQzEzXG4gICAgUHJvdmVlZG9yIC0tPiBVQzE0XG4gICAgUHJvdmVlZG9yIC0tPiBVQzIyXG4gICAgXG4gICAgJSUgTG9naXN0aWNhIENvbm5lY3Rpb25zXG4gICAgTG9naXN0aWNhIC0tPiBVQzFcbiAgICBMb2dpc3RpY2EgLS0+IFVDMlxuICAgIExvZ2lzdGljYSAtLT4gVUMxN1xuICAgIExvZ2lzdGljYSAtLT4gVUMxOFxuICAgIExvZ2lzdGljYSAtLT4gVUMyOFxuICAgIFxuICAgICUlIENsaWVudCBDb25uZWN0aW9uc1xuICAgIENsaWVudGUgLS0+IFVDMVxuICAgIENsaWVudGUgLS0+IFVDMlxuICAgIENsaWVudGUgLS0+IFVDOVxuICAgIENsaWVudGUgLS0+IFVDMTBcbiAgICBDbGllbnRlIC0tPiBVQzE1XG4gICAgQ2xpZW50ZSAtLT4gVUMxNlxuICAgIENsaWVudGUgLS0+IFVDMTlcbiAgICBDbGllbnRlIC0tPiBVQzI0XG5cbiAgICAlJSBJbmNsdWRlL0V4dGVuZFxuICAgIFVDMTYgLS4tPiBTaXN0ZW1hX0V4dFxuICAgIFVDMjMgLS4tPiBTaXN0ZW1hX0V4dCIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgICUlIEFjdG9ycyBvbiB0aGUgTGVmdFxuICAgIEFkbWluKChBZG1pbmlzdHJhZG9yKSlcbiAgICBQcm92ZWVkb3IoKFByb3ZlZWRvcikpXG4gICAgTG9naXN0aWNhKChMb2dcdTAwZWRzdGljYSkpXG4gICAgQ2xpZW50ZSgoQ2xpZW50ZSkpXG4gICAgU2lzdGVtYV9FeHRbXCJTaXN0ZW1hIEV4dGVybm9cIl1cblxuICAgICUlIFN5c3RlbSBCb3VuZGFyeVxuICAgIHN1YmdyYXBoIFwiU0lTVEVNQSBQUkVYQ09MXCJcbiAgICAgICAgZGlyZWN0aW9uIFRCXG4gICAgICAgIFxuICAgICAgICBzdWJncmFwaCBcIk1cdTAwZjNkdWxvIGRlIEF1dGVudGljYWNpXHUwMGYzblwiXG4gICAgICAgICAgICBVQzFbXCJSZWdpc3RyYXJzZVwiXVxuICAgICAgICAgICAgVUMyW1wiSW5pY2lhciBTZXNpXHUwMGYzblwiXVxuICAgICAgICAgICAgVUMzW1wiUmVjdXBlcmFyIENvbnRyYXNlXHUwMGYxYVwiXVxuICAgICAgICAgICAgVUM0W1wiQ2FtYmlhciBDb250cmFzZVx1MDBmMWFcIl1cbiAgICAgICAgICAgIFVDNVtcIkdlc3Rpb25hciBDdWVudGFcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJNXHUwMGYzZHVsbyBkZSBQcm9kdWN0b3NcIlxuICAgICAgICAgICAgVUM2W1wiR2VzdGlvbmFyIFRpZW5kYXNcIl1cbiAgICAgICAgICAgIFVDN1tcIkdlc3Rpb25hciBQcm9kdWN0b3NcIl1cbiAgICAgICAgICAgIFVDOFtcIkFzaWduYXIgUHJvZHVjdG9zXCJdXG4gICAgICAgICAgICBVQzlbXCJOYXZlZ2FyIENhdFx1MDBlMWxvZ29cIl1cbiAgICAgICAgICAgIFVDMTBbXCJCdXNjYXIgUHJvZHVjdG9zXCJdXG4gICAgICAgIGVuZFxuXG4gICAgICAgIHN1YmdyYXBoIFwiTVx1MDBmM2R1bG8gZGUgU3RvY2tcIlxuICAgICAgICAgICAgVUMxMVtcIkNvbmZpZ3VyYXIgUmVjYXJnYSBBdXRvXCJdXG4gICAgICAgICAgICBVQzEyW1wiUmVjYXJnYXIgU3RvY2sgTWFudWFsXCJdXG4gICAgICAgICAgICBVQzEzW1wiVmVyIEhpc3RvcmlhbCBSZWNhcmdhc1wiXVxuICAgICAgICAgICAgVUMxNFtcIk1vbml0b3JlYXIgU3RvY2tcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJNXHUwMGYzZHVsbyBkZSBQZWRpZG9zXCJcbiAgICAgICAgICAgIFVDMTVbXCJDcmVhciBQZWRpZG9cIl1cbiAgICAgICAgICAgIFVDMTZbXCJQcm9jZXNhciBQYWdvXCJdXG4gICAgICAgICAgICBVQzE3W1wiR2VzdGlvbmFyIFBlZGlkb3NcIl1cbiAgICAgICAgICAgIFVDMThbXCJDYW1iaWFyIEVzdGFkbyBQZWRpZG9cIl1cbiAgICAgICAgICAgIFVDMTlbXCJWZXIgTWlzIFBlZGlkb3NcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJNXHUwMGYzZHVsbyBkZSBWZW50YXNcIlxuICAgICAgICAgICAgVUMyMFtcIkdlbmVyYXIgVmVudGFcIl1cbiAgICAgICAgICAgIFVDMjFbXCJWZXIgSGlzdG9yaWFsIFZlbnRhc1wiXVxuICAgICAgICAgICAgVUMyMltcIkdlbmVyYXIgUmVwb3J0ZXNcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJNXHUwMGYzZHVsbyBkZSBBZG1pbmlzdHJhY2lcdTAwZjNuXCJcbiAgICAgICAgICAgIFVDMjZbXCJHZXN0aW9uYXIgVXN1YXJpb3NcIl1cbiAgICAgICAgICAgIFVDMjdbXCJTdXNwZW5kZXIgQ3VlbnRhXCJdXG4gICAgICAgICAgICBVQzI4W1wiVmVyIERhc2hib2FyZFwiXVxuICAgICAgICAgICAgVUMyOVtcIkNvbmZpZ3VyYXIgU2lzdGVtYVwiXVxuICAgICAgICBlbmRcbiAgICAgICAgXG4gICAgICAgIHN1YmdyYXBoIFwiTVx1MDBmM2R1bG8gZGUgTm90aWZpY2FjaW9uZXNcIlxuICAgICAgICAgICAgVUMyM1tcIkVudmlhciBOb3RpZmljYWNpXHUwMGYzblwiXVxuICAgICAgICAgICAgVUMyNFtcIlZlciBOb3RpZmljYWNpb25lc1wiXVxuICAgICAgICAgICAgVUMyNVtcIk1hcmNhciBjb21vIExlXHUwMGVkZGFcIl1cbiAgICAgICAgZW5kXG4gICAgZW5kXG5cbiAgICAlJSBSZWxhdGlvbnNoaXBzIC0gT3JnYW5pemVkIHRvIHJlZHVjZSBjcm9zc2luZ1xuICAgICUlIEFkbWluIENvbm5lY3Rpb25zXG4gICAgQWRtaW4gLS0+IFVDMVxuICAgIEFkbWluIC0tPiBVQzJcbiAgICBBZG1pbiAtLT4gVUM2XG4gICAgQWRtaW4gLS0+IFVDN1xuICAgIEFkbWluIC0tPiBVQzhcbiAgICBBZG1pbiAtLT4gVUMyMlxuICAgIEFkbWluIC0tPiBVQzI2XG4gICAgQWRtaW4gLS0+IFVDMjdcbiAgICBBZG1pbiAtLT4gVUMyOFxuICAgIFxuICAgICUlIFByb3ZpZGVyIENvbm5lY3Rpb25zXG4gICAgUHJvdmVlZG9yIC0tPiBVQzFcbiAgICBQcm92ZWVkb3IgLS0+IFVDMlxuICAgIFByb3ZlZWRvciAtLT4gVUM3XG4gICAgUHJvdmVlZG9yIC0tPiBVQzExXG4gICAgUHJvdmVlZG9yIC0tPiBVQzEyXG4gICAgUHJvdmVlZG9yIC0tPiBVQzEzXG4gICAgUHJvdmVlZG9yIC0tPiBVQzE0XG4gICAgUHJvdmVlZG9yIC0tPiBVQzIyXG4gICAgXG4gICAgJSUgTG9naXN0aWNhIENvbm5lY3Rpb25zXG4gICAgTG9naXN0aWNhIC0tPiBVQzFcbiAgICBMb2dpc3RpY2EgLS0+IFVDMlxuICAgIExvZ2lzdGljYSAtLT4gVUMxN1xuICAgIExvZ2lzdGljYSAtLT4gVUMxOFxuICAgIExvZ2lzdGljYSAtLT4gVUMyOFxuICAgIFxuICAgICUlIENsaWVudCBDb25uZWN0aW9uc1xuICAgIENsaWVudGUgLS0+IFVDMVxuICAgIENsaWVudGUgLS0+IFVDMlxuICAgIENsaWVudGUgLS0+IFVDOVxuICAgIENsaWVudGUgLS0+IFVDMTBcbiAgICBDbGllbnRlIC0tPiBVQzE1XG4gICAgQ2xpZW50ZSAtLT4gVUMxNlxuICAgIENsaWVudGUgLS0+IFVDMTlcbiAgICBDbGllbnRlIC0tPiBVQzI0XG5cbiAgICAlJSBJbmNsdWRlL0V4dGVuZFxuICAgIFVDMTYgLS4tPiBTaXN0ZW1hX0V4dFxuICAgIFVDMjMgLS4tPiBTaXN0ZW1hX0V4dCIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart LR
                        %% Actors on the Left
                        Admin((Administrador))
                        Proveedor((Proveedor))
                        Logistica((Logística))
                        Cliente((Cliente))
                        Sistema_Ext["Sistema Externo"]
                    
                        %% System Boundary
                        subgraph "SISTEMA PREXCOL"
                            direction TB
                            
                            subgraph "Módulo de Autenticación"
                                UC1["Registrarse"]
                                UC2["Iniciar Sesión"]
                                UC3["Recuperar Contraseña"]
                                UC4["Cambiar Contraseña"]
                                UC5["Gestionar Cuenta"]
                            end
                    
                            subgraph "Módulo de Productos"
                                UC6["Gestionar Tiendas"]
                                UC7["Gestionar Productos"]
                                UC8["Asignar Productos"]
                                UC9["Navegar Catálogo"]
                                UC10["Buscar Productos"]
                            end
                    
                            subgraph "Módulo de Stock"
                                UC11["Configurar Recarga Auto"]
                                UC12["Recargar Stock Manual"]
                                UC13["Ver Historial Recargas"]
                                UC14["Monitorear Stock"]
                            end
                    
                            subgraph "Módulo de Pedidos"
                                UC15["Crear Pedido"]
                                UC16["Procesar Pago"]
                                UC17["Gestionar Pedidos"]
                                UC18["Cambiar Estado Pedido"]
                                UC19["Ver Mis Pedidos"]
                            end
                    
                            subgraph "Módulo de Ventas"
                                UC20["Generar Venta"]
                                UC21["Ver Historial Ventas"]
                                UC22["Generar Reportes"]
                            end
                    
                            subgraph "Módulo de Administración"
                                UC26["Gestionar Usuarios"]
                                UC27["Suspender Cuenta"]
                                UC28["Ver Dashboard"]
                                UC29["Configurar Sistema"]
                            end
                            
                            subgraph "Módulo de Notificaciones"
                                UC23["Enviar Notificación"]
                                UC24["Ver Notificaciones"]
                                UC25["Marcar como Leída"]
                            end
                        end
                    
                        %% Relationships - Organized to reduce crossing
                        %% Admin Connections
                        Admin --> UC1
                        Admin --> UC2
                        Admin --> UC6
                        Admin --> UC7
                        Admin --> UC8
                        Admin --> UC22
                        Admin --> UC26
                        Admin --> UC27
                        Admin --> UC28
                        
                        %% Provider Connections
                        Proveedor --> UC1
                        Proveedor --> UC2
                        Proveedor --> UC7
                        Proveedor --> UC11
                        Proveedor --> UC12
                        Proveedor --> UC13
                        Proveedor --> UC14
                        Proveedor --> UC22
                        
                        %% Logistica Connections
                        Logistica --> UC1
                        Logistica --> UC2
                        Logistica --> UC17
                        Logistica --> UC18
                        Logistica --> UC28
                        
                        %% Client Connections
                        Cliente --> UC1
                        Cliente --> UC2
                        Cliente --> UC9
                        Cliente --> UC10
                        Cliente --> UC15
                        Cliente --> UC16
                        Cliente --> UC19
                        Cliente --> UC24
                    
                        %% Include/Extend
                        UC16 -.-> Sistema_Ext
                        UC23 -.-> Sistema_Ext

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart LR
                        Admin((Administrador))
                        
                        subgraph "Casos de Uso del Administrador"
                            direction TB
                            A1["Gestionar Tiendas"]
                            A2["Gestionar Productos"]
                            A3["Asignar Productos\na Proveedor"]
                            A4["Gestionar Usuarios"]
                            A5["Suspender/Reactivar\nCuentas"]
                            A6["Ver Dashboard Global"]
                            A7["Generar Reportes\nCompletos"]
                            A8["Configurar Sistema"]
                            A9["Ver Métricas KPI"]
                        end
                    
                        Admin --> A1
                        Admin --> A2
                        Admin --> A3
                        Admin --> A4
                        Admin --> A5
                        Admin --> A6
                        Admin --> A7
                        Admin --> A8
                        Admin --> A9
                    
                        A3 -.include.-> A2
                        A7 -.include.-> A6

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIEFkbWluKChBZG1pbmlzdHJhZG9yKSlcbiAgICBcbiAgICBzdWJncmFwaCBcIkNhc29zIGRlIFVzbyBkZWwgQWRtaW5pc3RyYWRvclwiXG4gICAgICAgIGRpcmVjdGlvbiBUQlxuICAgICAgICBBMVtcIkdlc3Rpb25hciBUaWVuZGFzXCJdXG4gICAgICAgIEEyW1wiR2VzdGlvbmFyIFByb2R1Y3Rvc1wiXVxuICAgICAgICBBM1tcIkFzaWduYXIgUHJvZHVjdG9zXFxuYSBQcm92ZWVkb3JcIl1cbiAgICAgICAgQTRbXCJHZXN0aW9uYXIgVXN1YXJpb3NcIl1cbiAgICAgICAgQTVbXCJTdXNwZW5kZXIvUmVhY3RpdmFyXFxuQ3VlbnRhc1wiXVxuICAgICAgICBBNltcIlZlciBEYXNoYm9hcmQgR2xvYmFsXCJdXG4gICAgICAgIEE3W1wiR2VuZXJhciBSZXBvcnRlc1xcbkNvbXBsZXRvc1wiXVxuICAgICAgICBBOFtcIkNvbmZpZ3VyYXIgU2lzdGVtYVwiXVxuICAgICAgICBBOVtcIlZlciBNXHUwMGU5dHJpY2FzIEtQSVwiXVxuICAgIGVuZFxuXG4gICAgQWRtaW4gLS0+IEExXG4gICAgQWRtaW4gLS0+IEEyXG4gICAgQWRtaW4gLS0+IEEzXG4gICAgQWRtaW4gLS0+IEE0XG4gICAgQWRtaW4gLS0+IEE1XG4gICAgQWRtaW4gLS0+IEE2XG4gICAgQWRtaW4gLS0+IEE3XG4gICAgQWRtaW4gLS0+IEE4XG4gICAgQWRtaW4gLS0+IEE5XG5cbiAgICBBMyAtLmluY2x1ZGUuLT4gQTJcbiAgICBBNyAtLmluY2x1ZGUuLT4gQTYiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIEFkbWluKChBZG1pbmlzdHJhZG9yKSlcbiAgICBcbiAgICBzdWJncmFwaCBcIkNhc29zIGRlIFVzbyBkZWwgQWRtaW5pc3RyYWRvclwiXG4gICAgICAgIGRpcmVjdGlvbiBUQlxuICAgICAgICBBMVtcIkdlc3Rpb25hciBUaWVuZGFzXCJdXG4gICAgICAgIEEyW1wiR2VzdGlvbmFyIFByb2R1Y3Rvc1wiXVxuICAgICAgICBBM1tcIkFzaWduYXIgUHJvZHVjdG9zXFxuYSBQcm92ZWVkb3JcIl1cbiAgICAgICAgQTRbXCJHZXN0aW9uYXIgVXN1YXJpb3NcIl1cbiAgICAgICAgQTVbXCJTdXNwZW5kZXIvUmVhY3RpdmFyXFxuQ3VlbnRhc1wiXVxuICAgICAgICBBNltcIlZlciBEYXNoYm9hcmQgR2xvYmFsXCJdXG4gICAgICAgIEE3W1wiR2VuZXJhciBSZXBvcnRlc1xcbkNvbXBsZXRvc1wiXVxuICAgICAgICBBOFtcIkNvbmZpZ3VyYXIgU2lzdGVtYVwiXVxuICAgICAgICBBOVtcIlZlciBNXHUwMGU5dHJpY2FzIEtQSVwiXVxuICAgIGVuZFxuXG4gICAgQWRtaW4gLS0+IEExXG4gICAgQWRtaW4gLS0+IEEyXG4gICAgQWRtaW4gLS0+IEEzXG4gICAgQWRtaW4gLS0+IEE0XG4gICAgQWRtaW4gLS0+IEE1XG4gICAgQWRtaW4gLS0+IEE2XG4gICAgQWRtaW4gLS0+IEE3XG4gICAgQWRtaW4gLS0+IEE4XG4gICAgQWRtaW4gLS0+IEE5XG5cbiAgICBBMyAtLmluY2x1ZGUuLT4gQTJcbiAgICBBNyAtLmluY2x1ZGUuLT4gQTYiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart LR
                        Admin((Administrador))
                        
                        subgraph "Casos de Uso del Administrador"
                            direction TB
                            A1["Gestionar Tiendas"]
                            A2["Gestionar Productos"]
                            A3["Asignar Productos\na Proveedor"]
                            A4["Gestionar Usuarios"]
                            A5["Suspender/Reactivar\nCuentas"]
                            A6["Ver Dashboard Global"]
                            A7["Generar Reportes\nCompletos"]
                            A8["Configurar Sistema"]
                            A9["Ver Métricas KPI"]
                        end
                    
                        Admin --> A1
                        Admin --> A2
                        Admin --> A3
                        Admin --> A4
                        Admin --> A5
                        Admin --> A6
                        Admin --> A7
                        Admin --> A8
                        Admin --> A9
                    
                        A3 -.include.-> A2
                        A7 -.include.-> A6

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart LR
                        Proveedor((Proveedor))
                        
                        subgraph "Casos de Uso del Proveedor"
                            direction TB
                            P1["Ver Productos Asignados"]
                            P2["Actualizar Stock"]
                            P3["Configurar Recarga\nAutomática"]
                            P4["Realizar Recarga\nManual"]
                            P5["Ver Historial\nde Recargas"]
                            P6["Editar Información\nde Producto"]
                            P7["Subir Imágenes\nde Producto"]
                            P8["Ver Reportes\nde Stock"]
                            P9["Recibir Alertas\nStock Bajo"]
                        end
                    
                        Proveedor --> P1
                        Proveedor --> P2
                        Proveedor --> P3
                        Proveedor --> P4
                        Proveedor --> P5
                        Proveedor --> P6
                        Proveedor --> P7
                        Proveedor --> P8
                        Proveedor --> P9
                    
                        P2 -.extend.-> P4
                        P3 -.include.-> P1

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIFByb3ZlZWRvcigoUHJvdmVlZG9yKSlcbiAgICBcbiAgICBzdWJncmFwaCBcIkNhc29zIGRlIFVzbyBkZWwgUHJvdmVlZG9yXCJcbiAgICAgICAgZGlyZWN0aW9uIFRCXG4gICAgICAgIFAxW1wiVmVyIFByb2R1Y3RvcyBBc2lnbmFkb3NcIl1cbiAgICAgICAgUDJbXCJBY3R1YWxpemFyIFN0b2NrXCJdXG4gICAgICAgIFAzW1wiQ29uZmlndXJhciBSZWNhcmdhXFxuQXV0b21cdTAwZTF0aWNhXCJdXG4gICAgICAgIFA0W1wiUmVhbGl6YXIgUmVjYXJnYVxcbk1hbnVhbFwiXVxuICAgICAgICBQNVtcIlZlciBIaXN0b3JpYWxcXG5kZSBSZWNhcmdhc1wiXVxuICAgICAgICBQNltcIkVkaXRhciBJbmZvcm1hY2lcdTAwZjNuXFxuZGUgUHJvZHVjdG9cIl1cbiAgICAgICAgUDdbXCJTdWJpciBJbVx1MDBlMWdlbmVzXFxuZGUgUHJvZHVjdG9cIl1cbiAgICAgICAgUDhbXCJWZXIgUmVwb3J0ZXNcXG5kZSBTdG9ja1wiXVxuICAgICAgICBQOVtcIlJlY2liaXIgQWxlcnRhc1xcblN0b2NrIEJham9cIl1cbiAgICBlbmRcblxuICAgIFByb3ZlZWRvciAtLT4gUDFcbiAgICBQcm92ZWVkb3IgLS0+IFAyXG4gICAgUHJvdmVlZG9yIC0tPiBQM1xuICAgIFByb3ZlZWRvciAtLT4gUDRcbiAgICBQcm92ZWVkb3IgLS0+IFA1XG4gICAgUHJvdmVlZG9yIC0tPiBQNlxuICAgIFByb3ZlZWRvciAtLT4gUDdcbiAgICBQcm92ZWVkb3IgLS0+IFA4XG4gICAgUHJvdmVlZG9yIC0tPiBQOVxuXG4gICAgUDIgLS5leHRlbmQuLT4gUDRcbiAgICBQMyAtLmluY2x1ZGUuLT4gUDEiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIFByb3ZlZWRvcigoUHJvdmVlZG9yKSlcbiAgICBcbiAgICBzdWJncmFwaCBcIkNhc29zIGRlIFVzbyBkZWwgUHJvdmVlZG9yXCJcbiAgICAgICAgZGlyZWN0aW9uIFRCXG4gICAgICAgIFAxW1wiVmVyIFByb2R1Y3RvcyBBc2lnbmFkb3NcIl1cbiAgICAgICAgUDJbXCJBY3R1YWxpemFyIFN0b2NrXCJdXG4gICAgICAgIFAzW1wiQ29uZmlndXJhciBSZWNhcmdhXFxuQXV0b21cdTAwZTF0aWNhXCJdXG4gICAgICAgIFA0W1wiUmVhbGl6YXIgUmVjYXJnYVxcbk1hbnVhbFwiXVxuICAgICAgICBQNVtcIlZlciBIaXN0b3JpYWxcXG5kZSBSZWNhcmdhc1wiXVxuICAgICAgICBQNltcIkVkaXRhciBJbmZvcm1hY2lcdTAwZjNuXFxuZGUgUHJvZHVjdG9cIl1cbiAgICAgICAgUDdbXCJTdWJpciBJbVx1MDBlMWdlbmVzXFxuZGUgUHJvZHVjdG9cIl1cbiAgICAgICAgUDhbXCJWZXIgUmVwb3J0ZXNcXG5kZSBTdG9ja1wiXVxuICAgICAgICBQOVtcIlJlY2liaXIgQWxlcnRhc1xcblN0b2NrIEJham9cIl1cbiAgICBlbmRcblxuICAgIFByb3ZlZWRvciAtLT4gUDFcbiAgICBQcm92ZWVkb3IgLS0+IFAyXG4gICAgUHJvdmVlZG9yIC0tPiBQM1xuICAgIFByb3ZlZWRvciAtLT4gUDRcbiAgICBQcm92ZWVkb3IgLS0+IFA1XG4gICAgUHJvdmVlZG9yIC0tPiBQNlxuICAgIFByb3ZlZWRvciAtLT4gUDdcbiAgICBQcm92ZWVkb3IgLS0+IFA4XG4gICAgUHJvdmVlZG9yIC0tPiBQOVxuXG4gICAgUDIgLS5leHRlbmQuLT4gUDRcbiAgICBQMyAtLmluY2x1ZGUuLT4gUDEiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart LR
                        Proveedor((Proveedor))
                        
                        subgraph "Casos de Uso del Proveedor"
                            direction TB
                            P1["Ver Productos Asignados"]
                            P2["Actualizar Stock"]
                            P3["Configurar Recarga\nAutomática"]
                            P4["Realizar Recarga\nManual"]
                            P5["Ver Historial\nde Recargas"]
                            P6["Editar Información\nde Producto"]
                            P7["Subir Imágenes\nde Producto"]
                            P8["Ver Reportes\nde Stock"]
                            P9["Recibir Alertas\nStock Bajo"]
                        end
                    
                        Proveedor --> P1
                        Proveedor --> P2
                        Proveedor --> P3
                        Proveedor --> P4
                        Proveedor --> P5
                        Proveedor --> P6
                        Proveedor --> P7
                        Proveedor --> P8
                        Proveedor --> P9
                    
                        P2 -.extend.-> P4
                        P3 -.include.-> P1

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart LR
                        Logistica((Logística))
                        
                        subgraph "Casos de Uso de Logística"
                            direction TB
                            L1["Ver Pedidos\nPendientes"]
                            L2["Iniciar Preparación\nde Pedido"]
                            L3["Cambiar Estado\na EN_TRANSITO"]
                            L4["Cambiar Estado\na ENTREGADO"]
                            L5["Reportar Problema\nen Entrega"]
                            L6["Ver Detalles\nde Pedido"]
                            L7["Asignar Transportista"]
                            L8["Ver Dashboard\nLogística"]
                            L9["Generar Reporte\nde Entregas"]
                        end
                    
                        Logistica --> L1
                        Logistica --> L2
                        Logistica --> L3
                        Logistica --> L4
                        Logistica --> L5
                        Logistica --> L6
                        Logistica --> L7
                        Logistica --> L8
                        Logistica --> L9
                    
                        L2 -.include.-> L6
                        L3 -.extend.-> L7

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIExvZ2lzdGljYSgoTG9nXHUwMGVkc3RpY2EpKVxuICAgIFxuICAgIHN1YmdyYXBoIFwiQ2Fzb3MgZGUgVXNvIGRlIExvZ1x1MDBlZHN0aWNhXCJcbiAgICAgICAgZGlyZWN0aW9uIFRCXG4gICAgICAgIEwxW1wiVmVyIFBlZGlkb3NcXG5QZW5kaWVudGVzXCJdXG4gICAgICAgIEwyW1wiSW5pY2lhciBQcmVwYXJhY2lcdTAwZjNuXFxuZGUgUGVkaWRvXCJdXG4gICAgICAgIEwzW1wiQ2FtYmlhciBFc3RhZG9cXG5hIEVOX1RSQU5TSVRPXCJdXG4gICAgICAgIEw0W1wiQ2FtYmlhciBFc3RhZG9cXG5hIEVOVFJFR0FET1wiXVxuICAgICAgICBMNVtcIlJlcG9ydGFyIFByb2JsZW1hXFxuZW4gRW50cmVnYVwiXVxuICAgICAgICBMNltcIlZlciBEZXRhbGxlc1xcbmRlIFBlZGlkb1wiXVxuICAgICAgICBMN1tcIkFzaWduYXIgVHJhbnNwb3J0aXN0YVwiXVxuICAgICAgICBMOFtcIlZlciBEYXNoYm9hcmRcXG5Mb2dcdTAwZWRzdGljYVwiXVxuICAgICAgICBMOVtcIkdlbmVyYXIgUmVwb3J0ZVxcbmRlIEVudHJlZ2FzXCJdXG4gICAgZW5kXG5cbiAgICBMb2dpc3RpY2EgLS0+IEwxXG4gICAgTG9naXN0aWNhIC0tPiBMMlxuICAgIExvZ2lzdGljYSAtLT4gTDNcbiAgICBMb2dpc3RpY2EgLS0+IEw0XG4gICAgTG9naXN0aWNhIC0tPiBMNVxuICAgIExvZ2lzdGljYSAtLT4gTDZcbiAgICBMb2dpc3RpY2EgLS0+IEw3XG4gICAgTG9naXN0aWNhIC0tPiBMOFxuICAgIExvZ2lzdGljYSAtLT4gTDlcblxuICAgIEwyIC0uaW5jbHVkZS4tPiBMNlxuICAgIEwzIC0uZXh0ZW5kLi0+IEw3IiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIExvZ2lzdGljYSgoTG9nXHUwMGVkc3RpY2EpKVxuICAgIFxuICAgIHN1YmdyYXBoIFwiQ2Fzb3MgZGUgVXNvIGRlIExvZ1x1MDBlZHN0aWNhXCJcbiAgICAgICAgZGlyZWN0aW9uIFRCXG4gICAgICAgIEwxW1wiVmVyIFBlZGlkb3NcXG5QZW5kaWVudGVzXCJdXG4gICAgICAgIEwyW1wiSW5pY2lhciBQcmVwYXJhY2lcdTAwZjNuXFxuZGUgUGVkaWRvXCJdXG4gICAgICAgIEwzW1wiQ2FtYmlhciBFc3RhZG9cXG5hIEVOX1RSQU5TSVRPXCJdXG4gICAgICAgIEw0W1wiQ2FtYmlhciBFc3RhZG9cXG5hIEVOVFJFR0FET1wiXVxuICAgICAgICBMNVtcIlJlcG9ydGFyIFByb2JsZW1hXFxuZW4gRW50cmVnYVwiXVxuICAgICAgICBMNltcIlZlciBEZXRhbGxlc1xcbmRlIFBlZGlkb1wiXVxuICAgICAgICBMN1tcIkFzaWduYXIgVHJhbnNwb3J0aXN0YVwiXVxuICAgICAgICBMOFtcIlZlciBEYXNoYm9hcmRcXG5Mb2dcdTAwZWRzdGljYVwiXVxuICAgICAgICBMOVtcIkdlbmVyYXIgUmVwb3J0ZVxcbmRlIEVudHJlZ2FzXCJdXG4gICAgZW5kXG5cbiAgICBMb2dpc3RpY2EgLS0+IEwxXG4gICAgTG9naXN0aWNhIC0tPiBMMlxuICAgIExvZ2lzdGljYSAtLT4gTDNcbiAgICBMb2dpc3RpY2EgLS0+IEw0XG4gICAgTG9naXN0aWNhIC0tPiBMNVxuICAgIExvZ2lzdGljYSAtLT4gTDZcbiAgICBMb2dpc3RpY2EgLS0+IEw3XG4gICAgTG9naXN0aWNhIC0tPiBMOFxuICAgIExvZ2lzdGljYSAtLT4gTDlcblxuICAgIEwyIC0uaW5jbHVkZS4tPiBMNlxuICAgIEwzIC0uZXh0ZW5kLi0+IEw3IiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart LR
                        Logistica((Logística))
                        
                        subgraph "Casos de Uso de Logística"
                            direction TB
                            L1["Ver Pedidos\nPendientes"]
                            L2["Iniciar Preparación\nde Pedido"]
                            L3["Cambiar Estado\na EN_TRANSITO"]
                            L4["Cambiar Estado\na ENTREGADO"]
                            L5["Reportar Problema\nen Entrega"]
                            L6["Ver Detalles\nde Pedido"]
                            L7["Asignar Transportista"]
                            L8["Ver Dashboard\nLogística"]
                            L9["Generar Reporte\nde Entregas"]
                        end
                    
                        Logistica --> L1
                        Logistica --> L2
                        Logistica --> L3
                        Logistica --> L4
                        Logistica --> L5
                        Logistica --> L6
                        Logistica --> L7
                        Logistica --> L8
                        Logistica --> L9
                    
                        L2 -.include.-> L6
                        L3 -.extend.-> L7

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart LR
                        Cliente((Cliente))
                        
                        subgraph "Casos de Uso del Cliente"
                            direction TB
                            C1["Navegar Catálogo"]
                            C2["Buscar Productos"]
                            C3["Ver Detalles\nde Producto"]
                            C4["Agregar al Carrito"]
                            C5["Modificar Carrito"]
                            C6["Realizar Compra"]
                            C7["Seleccionar Método\nde Pago"]
                            C8["Ver Mis Pedidos"]
                            C9["Ver Estado\nde Pedido"]
                            C10["Ver Notificaciones"]
                            C11["Descargar Factura"]
                        end
                    
                        Cliente --> C1
                        Cliente --> C2
                        Cliente --> C3
                        Cliente --> C4
                        Cliente --> C5
                        Cliente --> C6
                        Cliente --> C7
                        Cliente --> C8
                        Cliente --> C9
                        Cliente --> C10
                        Cliente --> C11
                    
                        C3 -.extend.-> C4
                        C6 -.include.-> C7
                        C9 -.include.-> C8

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIENsaWVudGUoKENsaWVudGUpKVxuICAgIFxuICAgIHN1YmdyYXBoIFwiQ2Fzb3MgZGUgVXNvIGRlbCBDbGllbnRlXCJcbiAgICAgICAgZGlyZWN0aW9uIFRCXG4gICAgICAgIEMxW1wiTmF2ZWdhciBDYXRcdTAwZTFsb2dvXCJdXG4gICAgICAgIEMyW1wiQnVzY2FyIFByb2R1Y3Rvc1wiXVxuICAgICAgICBDM1tcIlZlciBEZXRhbGxlc1xcbmRlIFByb2R1Y3RvXCJdXG4gICAgICAgIEM0W1wiQWdyZWdhciBhbCBDYXJyaXRvXCJdXG4gICAgICAgIEM1W1wiTW9kaWZpY2FyIENhcnJpdG9cIl1cbiAgICAgICAgQzZbXCJSZWFsaXphciBDb21wcmFcIl1cbiAgICAgICAgQzdbXCJTZWxlY2Npb25hciBNXHUwMGU5dG9kb1xcbmRlIFBhZ29cIl1cbiAgICAgICAgQzhbXCJWZXIgTWlzIFBlZGlkb3NcIl1cbiAgICAgICAgQzlbXCJWZXIgRXN0YWRvXFxuZGUgUGVkaWRvXCJdXG4gICAgICAgIEMxMFtcIlZlciBOb3RpZmljYWNpb25lc1wiXVxuICAgICAgICBDMTFbXCJEZXNjYXJnYXIgRmFjdHVyYVwiXVxuICAgIGVuZFxuXG4gICAgQ2xpZW50ZSAtLT4gQzFcbiAgICBDbGllbnRlIC0tPiBDMlxuICAgIENsaWVudGUgLS0+IEMzXG4gICAgQ2xpZW50ZSAtLT4gQzRcbiAgICBDbGllbnRlIC0tPiBDNVxuICAgIENsaWVudGUgLS0+IEM2XG4gICAgQ2xpZW50ZSAtLT4gQzdcbiAgICBDbGllbnRlIC0tPiBDOFxuICAgIENsaWVudGUgLS0+IEM5XG4gICAgQ2xpZW50ZSAtLT4gQzEwXG4gICAgQ2xpZW50ZSAtLT4gQzExXG5cbiAgICBDMyAtLmV4dGVuZC4tPiBDNFxuICAgIEM2IC0uaW5jbHVkZS4tPiBDN1xuICAgIEM5IC0uaW5jbHVkZS4tPiBDOCIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIENsaWVudGUoKENsaWVudGUpKVxuICAgIFxuICAgIHN1YmdyYXBoIFwiQ2Fzb3MgZGUgVXNvIGRlbCBDbGllbnRlXCJcbiAgICAgICAgZGlyZWN0aW9uIFRCXG4gICAgICAgIEMxW1wiTmF2ZWdhciBDYXRcdTAwZTFsb2dvXCJdXG4gICAgICAgIEMyW1wiQnVzY2FyIFByb2R1Y3Rvc1wiXVxuICAgICAgICBDM1tcIlZlciBEZXRhbGxlc1xcbmRlIFByb2R1Y3RvXCJdXG4gICAgICAgIEM0W1wiQWdyZWdhciBhbCBDYXJyaXRvXCJdXG4gICAgICAgIEM1W1wiTW9kaWZpY2FyIENhcnJpdG9cIl1cbiAgICAgICAgQzZbXCJSZWFsaXphciBDb21wcmFcIl1cbiAgICAgICAgQzdbXCJTZWxlY2Npb25hciBNXHUwMGU5dG9kb1xcbmRlIFBhZ29cIl1cbiAgICAgICAgQzhbXCJWZXIgTWlzIFBlZGlkb3NcIl1cbiAgICAgICAgQzlbXCJWZXIgRXN0YWRvXFxuZGUgUGVkaWRvXCJdXG4gICAgICAgIEMxMFtcIlZlciBOb3RpZmljYWNpb25lc1wiXVxuICAgICAgICBDMTFbXCJEZXNjYXJnYXIgRmFjdHVyYVwiXVxuICAgIGVuZFxuXG4gICAgQ2xpZW50ZSAtLT4gQzFcbiAgICBDbGllbnRlIC0tPiBDMlxuICAgIENsaWVudGUgLS0+IEMzXG4gICAgQ2xpZW50ZSAtLT4gQzRcbiAgICBDbGllbnRlIC0tPiBDNVxuICAgIENsaWVudGUgLS0+IEM2XG4gICAgQ2xpZW50ZSAtLT4gQzdcbiAgICBDbGllbnRlIC0tPiBDOFxuICAgIENsaWVudGUgLS0+IEM5XG4gICAgQ2xpZW50ZSAtLT4gQzEwXG4gICAgQ2xpZW50ZSAtLT4gQzExXG5cbiAgICBDMyAtLmV4dGVuZC4tPiBDNFxuICAgIEM2IC0uaW5jbHVkZS4tPiBDN1xuICAgIEM5IC0uaW5jbHVkZS4tPiBDOCIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart LR
                        Cliente((Cliente))
                        
                        subgraph "Casos de Uso del Cliente"
                            direction TB
                            C1["Navegar Catálogo"]
                            C2["Buscar Productos"]
                            C3["Ver Detalles\nde Producto"]
                            C4["Agregar al Carrito"]
                            C5["Modificar Carrito"]
                            C6["Realizar Compra"]
                            C7["Seleccionar Método\nde Pago"]
                            C8["Ver Mis Pedidos"]
                            C9["Ver Estado\nde Pedido"]
                            C10["Ver Notificaciones"]
                            C11["Descargar Factura"]
                        end
                    
                        Cliente --> C1
                        Cliente --> C2
                        Cliente --> C3
                        Cliente --> C4
                        Cliente --> C5
                        Cliente --> C6
                        Cliente --> C7
                        Cliente --> C8
                        Cliente --> C9
                        Cliente --> C10
                        Cliente --> C11
                    
                        C3 -.extend.-> C4
                        C6 -.include.-> C7
                        C9 -.include.-> C8


.. dropdown:: 📊 Diagrama Clases("1 diagramas")
    :open:
    :class-container: sd-mb-4

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    classDiagram
                        class Usuario{"
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
                            +set_password("raw_password")
                            +save()
                        "}
                    
                        class PasswordHistory{"
                            +Long id
                            +Long id_usuario
                            +String password_hash
                            +DateTime fecha_creacion
                        "}
                    
                        class Tienda{"
                            +Long id
                            +Long id_administrador
                            +String nombre
                            +String direccion
                            +String telefono
                            +Boolean activa
                            +DateTime fecha_creacion
                            +DateTime fecha_actualizacion
                        "}
                    
                        class Producto{"
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
                            +reducir_stock("cantidad")
                            +aumentar_stock("cantidad")
                        "}
                    
                        class StockConfig{"
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
                        "}
                    
                        class HistorialRecarga{"
                            +Long id
                            +Long id_producto
                            +Long id_usuario_ejecutor
                            +Integer cantidad
                            +Integer stock_anterior
                            +Integer stock_nuevo
                            +String tipo
                            +String notas
                            +DateTime fecha_creacion
                        "}
                    
                        class Pedido{"
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
                        "}
                    
                        class DetallePedido{"
                            +Long id
                            +Long id_pedido
                            +Long id_producto
                            +Integer cantidad
                            +Decimal precio_unitario
                            +subtotal()
                            +save()
                            +delete()
                        "}
                    
                        class Venta{"
                            +Long id
                            +Long id_pedido
                            +Long id_cliente
                            +Decimal total
                            +DateTime fecha_venta
                            +Integer cantidad_items
                        "}
                    
                        class DetalleVenta{"
                            +Long id
                            +Long id_venta
                            +Long id_producto
                            +Integer cantidad
                            +Decimal precio_unitario
                            +Decimal subtotal
                        "}
                    
                        class Pago{"
                            +Long id
                            +Long id_usuario
                            +Long id_pedido
                            +Long id_estado_pago
                            +Long id_metodo_pago
                            +Decimal monto
                            +FileField comprobante
                            +DateTime fecha_creacion
                            +DateTime fecha_actualizacion
                        "}
                    
                        class Transaccion{"
                            +Long id
                            +Long id_pago
                            +String referencia_externa
                            +Decimal monto
                            +String estado
                            +JSON respuesta_gateway
                            +DateTime fecha_creacion
                        "}
                    
                        class EstadoPago{"
                            +Long id
                            +String nombre
                            +String descripcion
                            +DateTime fecha_creacion
                            +DateTime fecha_actualizacion
                        "}
                    
                        class MetodoPago{"
                            +Long id
                            +String nombre
                            +Boolean activo
                            +DateTime fecha_creacion
                            +DateTime fecha_actualizacion
                        "}
                    
                        class Notificacion{"
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
                        "}
                    
                        class TipoNotificacion{"
                            +Long id
                            +String nombre
                            +String descripcion
                            +DateTime fecha_creacion
                            +DateTime fecha_actualizacion
                        "}
                    
                        class EstadoNotificacion{"
                            +Long id
                            +String nombre
                            +String descripcion
                            +DateTime fecha_creacion
                            +DateTime fecha_actualizacion
                        "}
                    
                        class Seccion{"
                            +Long id
                            +String nombre
                            +String descripcion
                            +Boolean activa
                            +DateTime fecha_creacion
                        "}
                    
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

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImNsYXNzRGlhZ3JhbVxuICAgIGNsYXNzIFVzdWFyaW97XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK1N0cmluZyBlbWFpbFxuICAgICAgICArU3RyaW5nIG5vbWJyZVxuICAgICAgICArU3RyaW5nIHJvbFxuICAgICAgICArU3RyaW5nIHRlbGVmb25vXG4gICAgICAgICtTdHJpbmcgZGlyZWNjaW9uXG4gICAgICAgICtCb29sZWFuIGVzdGFkb1xuICAgICAgICArSW1hZ2VGaWVsZCBpbWFnZW5cbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2NyZWFjaW9uXG4gICAgICAgKyBEYXRlVGltZSB1bHRpbW9faW5ncmVzb1xuICAgICAgICArRGF0ZVRpbWUgbGFzdF9hY3Rpdml0eVxuICAgICAgICArQm9vbGVhbiBpc19zdGFmZlxuICAgICAgICArQm9vbGVhbiBzZWxmX2RlYWN0aXZhdGVkXG4gICAgICAgICtCb29sZWFuIGFkbWluX3N1c3BlbmRlZFxuICAgICAgICArU3RyaW5nIHN1c3BlbnNpb25fcmVhc29uXG4gICAgICAgICtEYXRlVGltZSBzdXNwZW5zaW9uX2RhdGVcbiAgICAgICAgK3NldF9wYXNzd29yZChcInJhd19wYXNzd29yZFwiKVxuICAgICAgICArc2F2ZSgpXG4gICAgXCJ9XG5cbiAgICBjbGFzcyBQYXNzd29yZEhpc3Rvcnl7XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK0xvbmcgaWRfdXN1YXJpb1xuICAgICAgICArU3RyaW5nIHBhc3N3b3JkX2hhc2hcbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2NyZWFjaW9uXG4gICAgXCJ9XG5cbiAgICBjbGFzcyBUaWVuZGF7XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK0xvbmcgaWRfYWRtaW5pc3RyYWRvclxuICAgICAgICArU3RyaW5nIG5vbWJyZVxuICAgICAgICArU3RyaW5nIGRpcmVjY2lvblxuICAgICAgICArU3RyaW5nIHRlbGVmb25vXG4gICAgICAgICtCb29sZWFuIGFjdGl2YVxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfY3JlYWNpb25cbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2FjdHVhbGl6YWNpb25cbiAgICBcIn1cblxuICAgIGNsYXNzIFByb2R1Y3Rve1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtMb25nIGlkX3RpZW5kYVxuICAgICAgICArTG9uZyBpZF9wcm92ZWVkb3JcbiAgICAgICAgK1N0cmluZyBub21icmVcbiAgICAgICAgK1N0cmluZyBkZXNjcmlwY2lvblxuICAgICAgICArRGVjaW1hbCBwcmVjaW9cbiAgICAgICAgK0ludGVnZXIgc3RvY2tcbiAgICAgICAgK0Jvb2xlYW4gZXNfYmFzaWNvXG4gICAgICAgICtTdHJpbmcgY2F0ZWdvcmlhXG4gICAgICAgICtJbWFnZUZpZWxkIGltYWdlbjFcbiAgICAgICAgK0ltYWdlRmllbGQgaW1hZ2VuMlxuICAgICAgICArSW1hZ2VGaWVsZCBpbWFnZW4zXG4gICAgICAgICtTdHJpbmcgY2FyYWN0ZXJpc3RpY2FzXG4gICAgICAgICtCb29sZWFuIGFjdGl2b1xuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfY3JlYWNpb25cbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2FjdHVhbGl6YWNpb25cbiAgICAgICAgK3JlZHVjaXJfc3RvY2soXCJjYW50aWRhZFwiKVxuICAgICAgICArYXVtZW50YXJfc3RvY2soXCJjYW50aWRhZFwiKVxuICAgIFwifVxuXG4gICAgY2xhc3MgU3RvY2tDb25maWd7XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK0xvbmcgaWRfcHJvZHVjdG9cbiAgICAgICAgK0ludGVnZXIgc3RvY2tfbWluaW1vXG4gICAgICAgICtJbnRlZ2VyIGNhbnRpZGFkX3JlY2FyZ2FcbiAgICAgICAgK0Jvb2xlYW4gcmVjYXJnYV9hdXRvbWF0aWNhX2FjdGl2YVxuICAgICAgICArRGF0ZVRpbWUgdWx0aW1hX3JlY2FyZ2FcbiAgICAgICAgK0ludGVnZXIgdG90YWxfcmVjYXJnYXNcbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2NyZWFjaW9uXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9hY3R1YWxpemFjaW9uXG4gICAgICAgICtuZWNlc2l0YV9yZWNhcmdhKClcbiAgICAgICAgK2VqZWN1dGFyX3JlY2FyZ2EoKVxuICAgIFwifVxuXG4gICAgY2xhc3MgSGlzdG9yaWFsUmVjYXJnYXtcIlxuICAgICAgICArTG9uZyBpZFxuICAgICAgICArTG9uZyBpZF9wcm9kdWN0b1xuICAgICAgICArTG9uZyBpZF91c3VhcmlvX2VqZWN1dG9yXG4gICAgICAgICtJbnRlZ2VyIGNhbnRpZGFkXG4gICAgICAgICtJbnRlZ2VyIHN0b2NrX2FudGVyaW9yXG4gICAgICAgICtJbnRlZ2VyIHN0b2NrX251ZXZvXG4gICAgICAgICtTdHJpbmcgdGlwb1xuICAgICAgICArU3RyaW5nIG5vdGFzXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgIFwifVxuXG4gICAgY2xhc3MgUGVkaWRve1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtMb25nIGlkX2NsaWVudGVcbiAgICAgICAgK0xvbmcgaWRfdGllbmRhXG4gICAgICAgICtTdHJpbmcgZXN0YWRvXG4gICAgICAgICtEZWNpbWFsIHRvdGFsXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfYWN0dWFsaXphY2lvblxuICAgICAgICArU3RyaW5nIG5vdGFzXG4gICAgICAgICtjYWxjdWxhcl90b3RhbCgpXG4gICAgICAgICtwdWVkZV9jYW1iaWFyX2FfcHJlcGFyYW5kbygpXG4gICAgICAgICtwdWVkZV9jYW1iaWFyX2FfZW5fdHJhbnNpdG8oKVxuICAgICAgICArcHVlZGVfY2FtYmlhcl9hX2VudHJlZ2FkbygpXG4gICAgXCJ9XG5cbiAgICBjbGFzcyBEZXRhbGxlUGVkaWRve1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtMb25nIGlkX3BlZGlkb1xuICAgICAgICArTG9uZyBpZF9wcm9kdWN0b1xuICAgICAgICArSW50ZWdlciBjYW50aWRhZFxuICAgICAgICArRGVjaW1hbCBwcmVjaW9fdW5pdGFyaW9cbiAgICAgICAgK3N1YnRvdGFsKClcbiAgICAgICAgK3NhdmUoKVxuICAgICAgICArZGVsZXRlKClcbiAgICBcIn1cblxuICAgIGNsYXNzIFZlbnRhe1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtMb25nIGlkX3BlZGlkb1xuICAgICAgICArTG9uZyBpZF9jbGllbnRlXG4gICAgICAgICtEZWNpbWFsIHRvdGFsXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV92ZW50YVxuICAgICAgICArSW50ZWdlciBjYW50aWRhZF9pdGVtc1xuICAgIFwifVxuXG4gICAgY2xhc3MgRGV0YWxsZVZlbnRhe1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtMb25nIGlkX3ZlbnRhXG4gICAgICAgICtMb25nIGlkX3Byb2R1Y3RvXG4gICAgICAgICtJbnRlZ2VyIGNhbnRpZGFkXG4gICAgICAgICtEZWNpbWFsIHByZWNpb191bml0YXJpb1xuICAgICAgICArRGVjaW1hbCBzdWJ0b3RhbFxuICAgIFwifVxuXG4gICAgY2xhc3MgUGFnb3tcIlxuICAgICAgICArTG9uZyBpZFxuICAgICAgICArTG9uZyBpZF91c3VhcmlvXG4gICAgICAgICtMb25nIGlkX3BlZGlkb1xuICAgICAgICArTG9uZyBpZF9lc3RhZG9fcGFnb1xuICAgICAgICArTG9uZyBpZF9tZXRvZG9fcGFnb1xuICAgICAgICArRGVjaW1hbCBtb250b1xuICAgICAgICArRmlsZUZpZWxkIGNvbXByb2JhbnRlXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfYWN0dWFsaXphY2lvblxuICAgIFwifVxuXG4gICAgY2xhc3MgVHJhbnNhY2Npb257XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK0xvbmcgaWRfcGFnb1xuICAgICAgICArU3RyaW5nIHJlZmVyZW5jaWFfZXh0ZXJuYVxuICAgICAgICArRGVjaW1hbCBtb250b1xuICAgICAgICArU3RyaW5nIGVzdGFkb1xuICAgICAgICArSlNPTiByZXNwdWVzdGFfZ2F0ZXdheVxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfY3JlYWNpb25cbiAgICBcIn1cblxuICAgIGNsYXNzIEVzdGFkb1BhZ297XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK1N0cmluZyBub21icmVcbiAgICAgICAgK1N0cmluZyBkZXNjcmlwY2lvblxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfY3JlYWNpb25cbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2FjdHVhbGl6YWNpb25cbiAgICBcIn1cblxuICAgIGNsYXNzIE1ldG9kb1BhZ297XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK1N0cmluZyBub21icmVcbiAgICAgICAgK0Jvb2xlYW4gYWN0aXZvXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfYWN0dWFsaXphY2lvblxuICAgIFwifVxuXG4gICAgY2xhc3MgTm90aWZpY2FjaW9ue1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtMb25nIGlkX3VzdWFyaW9cbiAgICAgICAgK0xvbmcgaWRfdGlwb19ub3RpZmljYWNpb25cbiAgICAgICAgK0xvbmcgaWRfZXN0YWRvX25vdGlmaWNhY2lvblxuICAgICAgICArU3RyaW5nIG1lbnNhamVcbiAgICAgICAgK1N0cmluZyBkZXN0aW5vXG4gICAgICAgICtCb29sZWFuIGxlaWRhXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9sZWN0dXJhXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfYWN0dWFsaXphY2lvblxuICAgIFwifVxuXG4gICAgY2xhc3MgVGlwb05vdGlmaWNhY2lvbntcIlxuICAgICAgICArTG9uZyBpZFxuICAgICAgICArU3RyaW5nIG5vbWJyZVxuICAgICAgICArU3RyaW5nIGRlc2NyaXBjaW9uXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfYWN0dWFsaXphY2lvblxuICAgIFwifVxuXG4gICAgY2xhc3MgRXN0YWRvTm90aWZpY2FjaW9ue1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtTdHJpbmcgbm9tYnJlXG4gICAgICAgICtTdHJpbmcgZGVzY3JpcGNpb25cbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2NyZWFjaW9uXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9hY3R1YWxpemFjaW9uXG4gICAgXCJ9XG5cbiAgICBjbGFzcyBTZWNjaW9ue1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtTdHJpbmcgbm9tYnJlXG4gICAgICAgICtTdHJpbmcgZGVzY3JpcGNpb25cbiAgICAgICAgK0Jvb2xlYW4gYWN0aXZhXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgIFwifVxuXG4gICAgJSUgUmVsYWNpb25lc1xuICAgIFVzdWFyaW8gXCIxXCIgLS0+IFwiKlwiIFBhc3N3b3JkSGlzdG9yeSA6IHRpZW5lIGhpc3RvcmlhbFxuICAgIFVzdWFyaW8gXCIxXCIgLS0+IFwiKlwiIFRpZW5kYSA6IGFkbWluaXN0cmFcbiAgICBVc3VhcmlvIFwiMVwiIC0tPiBcIipcIiBQcm9kdWN0byA6IHN1bWluaXN0cmFcbiAgICBVc3VhcmlvIFwiMVwiIC0tPiBcIipcIiBQZWRpZG8gOiByZWFsaXphXG4gICAgVXN1YXJpbyBcIjFcIiAtLT4gXCIqXCIgUGFnbyA6IGVmZWN0dWFcbiAgICBVc3VhcmlvIFwiMVwiIC0tPiBcIipcIiBOb3RpZmljYWNpb24gOiByZWNpYmVcbiAgICBVc3VhcmlvIFwiMVwiIC0tPiBcIipcIiBIaXN0b3JpYWxSZWNhcmdhIDogZWplY3V0YVxuICAgIFVzdWFyaW8gXCIxXCIgLS0+IFwiKlwiIFZlbnRhIDogY29tcHJhXG5cbiAgICBUaWVuZGEgXCIxXCIgLS0+IFwiKlwiIFByb2R1Y3RvIDogY29udGllbmVcbiAgICBUaWVuZGEgXCIxXCIgLS0+IFwiKlwiIFBlZGlkbyA6IGdlc3Rpb25hXG5cbiAgICBQcm9kdWN0byBcIjFcIiAtLT4gXCIxXCIgU3RvY2tDb25maWcgOiBjb25maWd1cmFcbiAgICBQcm9kdWN0byBcIjFcIiAtLT4gXCIqXCIgSGlzdG9yaWFsUmVjYXJnYSA6IHJlZ2lzdHJhXG4gICAgUHJvZHVjdG8gXCIxXCIgLS0+IFwiKlwiIERldGFsbGVQZWRpZG8gOiBpbmNsdWlkb19lblxuICAgIFByb2R1Y3RvIFwiMVwiIC0tPiBcIipcIiBEZXRhbGxlVmVudGEgOiB2ZW5kaWRvX2VuXG4gICAgUHJvZHVjdG8gXCIxXCIgLS0+IFwiKlwiIFNlY2Npb24gOiBwZXJ0ZW5lY2VfYVxuXG4gICAgUGVkaWRvIFwiMVwiIC0tPiBcIipcIiBEZXRhbGxlUGVkaWRvIDogY29udGllbmVcbiAgICBQZWRpZG8gXCIxXCIgLS0+IFwiKlwiIFBhZ28gOiBwYWdhZG9fY29uXG4gICAgUGVkaWRvIFwiMVwiIC0tPiBcIjAuLjFcIiBWZW50YSA6IGdlbmVyYVxuXG4gICAgVmVudGEgXCIxXCIgLS0+IFwiKlwiIERldGFsbGVWZW50YSA6IGNvbnRpZW5lXG5cbiAgICBQYWdvIC0tPiBFc3RhZG9QYWdvIDogdGllbmUgZXN0YWRvXG4gICAgUGFnbyAtLT4gTWV0b2RvUGFnbyA6IHVzYSBtXHUwMGU5dG9kb1xuICAgIFBhZ28gXCIxXCIgLS0+IFwiKlwiIFRyYW5zYWNjaW9uIDogcmVnaXN0cmFcblxuICAgIE5vdGlmaWNhY2lvbiAtLT4gVGlwb05vdGlmaWNhY2lvbiA6IGVzIHRpcG9cbiAgICBOb3RpZmljYWNpb24gLS0+IEVzdGFkb05vdGlmaWNhY2lvbiA6IHRpZW5lIGVzdGFkbyIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImNsYXNzRGlhZ3JhbVxuICAgIGNsYXNzIFVzdWFyaW97XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK1N0cmluZyBlbWFpbFxuICAgICAgICArU3RyaW5nIG5vbWJyZVxuICAgICAgICArU3RyaW5nIHJvbFxuICAgICAgICArU3RyaW5nIHRlbGVmb25vXG4gICAgICAgICtTdHJpbmcgZGlyZWNjaW9uXG4gICAgICAgICtCb29sZWFuIGVzdGFkb1xuICAgICAgICArSW1hZ2VGaWVsZCBpbWFnZW5cbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2NyZWFjaW9uXG4gICAgICAgKyBEYXRlVGltZSB1bHRpbW9faW5ncmVzb1xuICAgICAgICArRGF0ZVRpbWUgbGFzdF9hY3Rpdml0eVxuICAgICAgICArQm9vbGVhbiBpc19zdGFmZlxuICAgICAgICArQm9vbGVhbiBzZWxmX2RlYWN0aXZhdGVkXG4gICAgICAgICtCb29sZWFuIGFkbWluX3N1c3BlbmRlZFxuICAgICAgICArU3RyaW5nIHN1c3BlbnNpb25fcmVhc29uXG4gICAgICAgICtEYXRlVGltZSBzdXNwZW5zaW9uX2RhdGVcbiAgICAgICAgK3NldF9wYXNzd29yZChcInJhd19wYXNzd29yZFwiKVxuICAgICAgICArc2F2ZSgpXG4gICAgXCJ9XG5cbiAgICBjbGFzcyBQYXNzd29yZEhpc3Rvcnl7XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK0xvbmcgaWRfdXN1YXJpb1xuICAgICAgICArU3RyaW5nIHBhc3N3b3JkX2hhc2hcbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2NyZWFjaW9uXG4gICAgXCJ9XG5cbiAgICBjbGFzcyBUaWVuZGF7XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK0xvbmcgaWRfYWRtaW5pc3RyYWRvclxuICAgICAgICArU3RyaW5nIG5vbWJyZVxuICAgICAgICArU3RyaW5nIGRpcmVjY2lvblxuICAgICAgICArU3RyaW5nIHRlbGVmb25vXG4gICAgICAgICtCb29sZWFuIGFjdGl2YVxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfY3JlYWNpb25cbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2FjdHVhbGl6YWNpb25cbiAgICBcIn1cblxuICAgIGNsYXNzIFByb2R1Y3Rve1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtMb25nIGlkX3RpZW5kYVxuICAgICAgICArTG9uZyBpZF9wcm92ZWVkb3JcbiAgICAgICAgK1N0cmluZyBub21icmVcbiAgICAgICAgK1N0cmluZyBkZXNjcmlwY2lvblxuICAgICAgICArRGVjaW1hbCBwcmVjaW9cbiAgICAgICAgK0ludGVnZXIgc3RvY2tcbiAgICAgICAgK0Jvb2xlYW4gZXNfYmFzaWNvXG4gICAgICAgICtTdHJpbmcgY2F0ZWdvcmlhXG4gICAgICAgICtJbWFnZUZpZWxkIGltYWdlbjFcbiAgICAgICAgK0ltYWdlRmllbGQgaW1hZ2VuMlxuICAgICAgICArSW1hZ2VGaWVsZCBpbWFnZW4zXG4gICAgICAgICtTdHJpbmcgY2FyYWN0ZXJpc3RpY2FzXG4gICAgICAgICtCb29sZWFuIGFjdGl2b1xuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfY3JlYWNpb25cbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2FjdHVhbGl6YWNpb25cbiAgICAgICAgK3JlZHVjaXJfc3RvY2soXCJjYW50aWRhZFwiKVxuICAgICAgICArYXVtZW50YXJfc3RvY2soXCJjYW50aWRhZFwiKVxuICAgIFwifVxuXG4gICAgY2xhc3MgU3RvY2tDb25maWd7XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK0xvbmcgaWRfcHJvZHVjdG9cbiAgICAgICAgK0ludGVnZXIgc3RvY2tfbWluaW1vXG4gICAgICAgICtJbnRlZ2VyIGNhbnRpZGFkX3JlY2FyZ2FcbiAgICAgICAgK0Jvb2xlYW4gcmVjYXJnYV9hdXRvbWF0aWNhX2FjdGl2YVxuICAgICAgICArRGF0ZVRpbWUgdWx0aW1hX3JlY2FyZ2FcbiAgICAgICAgK0ludGVnZXIgdG90YWxfcmVjYXJnYXNcbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2NyZWFjaW9uXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9hY3R1YWxpemFjaW9uXG4gICAgICAgICtuZWNlc2l0YV9yZWNhcmdhKClcbiAgICAgICAgK2VqZWN1dGFyX3JlY2FyZ2EoKVxuICAgIFwifVxuXG4gICAgY2xhc3MgSGlzdG9yaWFsUmVjYXJnYXtcIlxuICAgICAgICArTG9uZyBpZFxuICAgICAgICArTG9uZyBpZF9wcm9kdWN0b1xuICAgICAgICArTG9uZyBpZF91c3VhcmlvX2VqZWN1dG9yXG4gICAgICAgICtJbnRlZ2VyIGNhbnRpZGFkXG4gICAgICAgICtJbnRlZ2VyIHN0b2NrX2FudGVyaW9yXG4gICAgICAgICtJbnRlZ2VyIHN0b2NrX251ZXZvXG4gICAgICAgICtTdHJpbmcgdGlwb1xuICAgICAgICArU3RyaW5nIG5vdGFzXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgIFwifVxuXG4gICAgY2xhc3MgUGVkaWRve1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtMb25nIGlkX2NsaWVudGVcbiAgICAgICAgK0xvbmcgaWRfdGllbmRhXG4gICAgICAgICtTdHJpbmcgZXN0YWRvXG4gICAgICAgICtEZWNpbWFsIHRvdGFsXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfYWN0dWFsaXphY2lvblxuICAgICAgICArU3RyaW5nIG5vdGFzXG4gICAgICAgICtjYWxjdWxhcl90b3RhbCgpXG4gICAgICAgICtwdWVkZV9jYW1iaWFyX2FfcHJlcGFyYW5kbygpXG4gICAgICAgICtwdWVkZV9jYW1iaWFyX2FfZW5fdHJhbnNpdG8oKVxuICAgICAgICArcHVlZGVfY2FtYmlhcl9hX2VudHJlZ2FkbygpXG4gICAgXCJ9XG5cbiAgICBjbGFzcyBEZXRhbGxlUGVkaWRve1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtMb25nIGlkX3BlZGlkb1xuICAgICAgICArTG9uZyBpZF9wcm9kdWN0b1xuICAgICAgICArSW50ZWdlciBjYW50aWRhZFxuICAgICAgICArRGVjaW1hbCBwcmVjaW9fdW5pdGFyaW9cbiAgICAgICAgK3N1YnRvdGFsKClcbiAgICAgICAgK3NhdmUoKVxuICAgICAgICArZGVsZXRlKClcbiAgICBcIn1cblxuICAgIGNsYXNzIFZlbnRhe1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtMb25nIGlkX3BlZGlkb1xuICAgICAgICArTG9uZyBpZF9jbGllbnRlXG4gICAgICAgICtEZWNpbWFsIHRvdGFsXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV92ZW50YVxuICAgICAgICArSW50ZWdlciBjYW50aWRhZF9pdGVtc1xuICAgIFwifVxuXG4gICAgY2xhc3MgRGV0YWxsZVZlbnRhe1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtMb25nIGlkX3ZlbnRhXG4gICAgICAgICtMb25nIGlkX3Byb2R1Y3RvXG4gICAgICAgICtJbnRlZ2VyIGNhbnRpZGFkXG4gICAgICAgICtEZWNpbWFsIHByZWNpb191bml0YXJpb1xuICAgICAgICArRGVjaW1hbCBzdWJ0b3RhbFxuICAgIFwifVxuXG4gICAgY2xhc3MgUGFnb3tcIlxuICAgICAgICArTG9uZyBpZFxuICAgICAgICArTG9uZyBpZF91c3VhcmlvXG4gICAgICAgICtMb25nIGlkX3BlZGlkb1xuICAgICAgICArTG9uZyBpZF9lc3RhZG9fcGFnb1xuICAgICAgICArTG9uZyBpZF9tZXRvZG9fcGFnb1xuICAgICAgICArRGVjaW1hbCBtb250b1xuICAgICAgICArRmlsZUZpZWxkIGNvbXByb2JhbnRlXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfYWN0dWFsaXphY2lvblxuICAgIFwifVxuXG4gICAgY2xhc3MgVHJhbnNhY2Npb257XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK0xvbmcgaWRfcGFnb1xuICAgICAgICArU3RyaW5nIHJlZmVyZW5jaWFfZXh0ZXJuYVxuICAgICAgICArRGVjaW1hbCBtb250b1xuICAgICAgICArU3RyaW5nIGVzdGFkb1xuICAgICAgICArSlNPTiByZXNwdWVzdGFfZ2F0ZXdheVxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfY3JlYWNpb25cbiAgICBcIn1cblxuICAgIGNsYXNzIEVzdGFkb1BhZ297XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK1N0cmluZyBub21icmVcbiAgICAgICAgK1N0cmluZyBkZXNjcmlwY2lvblxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfY3JlYWNpb25cbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2FjdHVhbGl6YWNpb25cbiAgICBcIn1cblxuICAgIGNsYXNzIE1ldG9kb1BhZ297XCJcbiAgICAgICAgK0xvbmcgaWRcbiAgICAgICAgK1N0cmluZyBub21icmVcbiAgICAgICAgK0Jvb2xlYW4gYWN0aXZvXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfYWN0dWFsaXphY2lvblxuICAgIFwifVxuXG4gICAgY2xhc3MgTm90aWZpY2FjaW9ue1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtMb25nIGlkX3VzdWFyaW9cbiAgICAgICAgK0xvbmcgaWRfdGlwb19ub3RpZmljYWNpb25cbiAgICAgICAgK0xvbmcgaWRfZXN0YWRvX25vdGlmaWNhY2lvblxuICAgICAgICArU3RyaW5nIG1lbnNhamVcbiAgICAgICAgK1N0cmluZyBkZXN0aW5vXG4gICAgICAgICtCb29sZWFuIGxlaWRhXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9sZWN0dXJhXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfYWN0dWFsaXphY2lvblxuICAgIFwifVxuXG4gICAgY2xhc3MgVGlwb05vdGlmaWNhY2lvbntcIlxuICAgICAgICArTG9uZyBpZFxuICAgICAgICArU3RyaW5nIG5vbWJyZVxuICAgICAgICArU3RyaW5nIGRlc2NyaXBjaW9uXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgICAgICArRGF0ZVRpbWUgZmVjaGFfYWN0dWFsaXphY2lvblxuICAgIFwifVxuXG4gICAgY2xhc3MgRXN0YWRvTm90aWZpY2FjaW9ue1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtTdHJpbmcgbm9tYnJlXG4gICAgICAgICtTdHJpbmcgZGVzY3JpcGNpb25cbiAgICAgICAgK0RhdGVUaW1lIGZlY2hhX2NyZWFjaW9uXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9hY3R1YWxpemFjaW9uXG4gICAgXCJ9XG5cbiAgICBjbGFzcyBTZWNjaW9ue1wiXG4gICAgICAgICtMb25nIGlkXG4gICAgICAgICtTdHJpbmcgbm9tYnJlXG4gICAgICAgICtTdHJpbmcgZGVzY3JpcGNpb25cbiAgICAgICAgK0Jvb2xlYW4gYWN0aXZhXG4gICAgICAgICtEYXRlVGltZSBmZWNoYV9jcmVhY2lvblxuICAgIFwifVxuXG4gICAgJSUgUmVsYWNpb25lc1xuICAgIFVzdWFyaW8gXCIxXCIgLS0+IFwiKlwiIFBhc3N3b3JkSGlzdG9yeSA6IHRpZW5lIGhpc3RvcmlhbFxuICAgIFVzdWFyaW8gXCIxXCIgLS0+IFwiKlwiIFRpZW5kYSA6IGFkbWluaXN0cmFcbiAgICBVc3VhcmlvIFwiMVwiIC0tPiBcIipcIiBQcm9kdWN0byA6IHN1bWluaXN0cmFcbiAgICBVc3VhcmlvIFwiMVwiIC0tPiBcIipcIiBQZWRpZG8gOiByZWFsaXphXG4gICAgVXN1YXJpbyBcIjFcIiAtLT4gXCIqXCIgUGFnbyA6IGVmZWN0dWFcbiAgICBVc3VhcmlvIFwiMVwiIC0tPiBcIipcIiBOb3RpZmljYWNpb24gOiByZWNpYmVcbiAgICBVc3VhcmlvIFwiMVwiIC0tPiBcIipcIiBIaXN0b3JpYWxSZWNhcmdhIDogZWplY3V0YVxuICAgIFVzdWFyaW8gXCIxXCIgLS0+IFwiKlwiIFZlbnRhIDogY29tcHJhXG5cbiAgICBUaWVuZGEgXCIxXCIgLS0+IFwiKlwiIFByb2R1Y3RvIDogY29udGllbmVcbiAgICBUaWVuZGEgXCIxXCIgLS0+IFwiKlwiIFBlZGlkbyA6IGdlc3Rpb25hXG5cbiAgICBQcm9kdWN0byBcIjFcIiAtLT4gXCIxXCIgU3RvY2tDb25maWcgOiBjb25maWd1cmFcbiAgICBQcm9kdWN0byBcIjFcIiAtLT4gXCIqXCIgSGlzdG9yaWFsUmVjYXJnYSA6IHJlZ2lzdHJhXG4gICAgUHJvZHVjdG8gXCIxXCIgLS0+IFwiKlwiIERldGFsbGVQZWRpZG8gOiBpbmNsdWlkb19lblxuICAgIFByb2R1Y3RvIFwiMVwiIC0tPiBcIipcIiBEZXRhbGxlVmVudGEgOiB2ZW5kaWRvX2VuXG4gICAgUHJvZHVjdG8gXCIxXCIgLS0+IFwiKlwiIFNlY2Npb24gOiBwZXJ0ZW5lY2VfYVxuXG4gICAgUGVkaWRvIFwiMVwiIC0tPiBcIipcIiBEZXRhbGxlUGVkaWRvIDogY29udGllbmVcbiAgICBQZWRpZG8gXCIxXCIgLS0+IFwiKlwiIFBhZ28gOiBwYWdhZG9fY29uXG4gICAgUGVkaWRvIFwiMVwiIC0tPiBcIjAuLjFcIiBWZW50YSA6IGdlbmVyYVxuXG4gICAgVmVudGEgXCIxXCIgLS0+IFwiKlwiIERldGFsbGVWZW50YSA6IGNvbnRpZW5lXG5cbiAgICBQYWdvIC0tPiBFc3RhZG9QYWdvIDogdGllbmUgZXN0YWRvXG4gICAgUGFnbyAtLT4gTWV0b2RvUGFnbyA6IHVzYSBtXHUwMGU5dG9kb1xuICAgIFBhZ28gXCIxXCIgLS0+IFwiKlwiIFRyYW5zYWNjaW9uIDogcmVnaXN0cmFcblxuICAgIE5vdGlmaWNhY2lvbiAtLT4gVGlwb05vdGlmaWNhY2lvbiA6IGVzIHRpcG9cbiAgICBOb3RpZmljYWNpb24gLS0+IEVzdGFkb05vdGlmaWNhY2lvbiA6IHRpZW5lIGVzdGFkbyIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    classDiagram
                        class Usuario{"
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
                            +set_password("raw_password")
                            +save()
                        "}
                    
                        class PasswordHistory{"
                            +Long id
                            +Long id_usuario
                            +String password_hash
                            +DateTime fecha_creacion
                        "}
                    
                        class Tienda{"
                            +Long id
                            +Long id_administrador
                            +String nombre
                            +String direccion
                            +String telefono
                            +Boolean activa
                            +DateTime fecha_creacion
                            +DateTime fecha_actualizacion
                        "}
                    
                        class Producto{"
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
                            +reducir_stock("cantidad")
                            +aumentar_stock("cantidad")
                        "}
                    
                        class StockConfig{"
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
                        "}
                    
                        class HistorialRecarga{"
                            +Long id
                            +Long id_producto
                            +Long id_usuario_ejecutor
                            +Integer cantidad
                            +Integer stock_anterior
                            +Integer stock_nuevo
                            +String tipo
                            +String notas
                            +DateTime fecha_creacion
                        "}
                    
                        class Pedido{"
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
                        "}
                    
                        class DetallePedido{"
                            +Long id
                            +Long id_pedido
                            +Long id_producto
                            +Integer cantidad
                            +Decimal precio_unitario
                            +subtotal()
                            +save()
                            +delete()
                        "}
                    
                        class Venta{"
                            +Long id
                            +Long id_pedido
                            +Long id_cliente
                            +Decimal total
                            +DateTime fecha_venta
                            +Integer cantidad_items
                        "}
                    
                        class DetalleVenta{"
                            +Long id
                            +Long id_venta
                            +Long id_producto
                            +Integer cantidad
                            +Decimal precio_unitario
                            +Decimal subtotal
                        "}
                    
                        class Pago{"
                            +Long id
                            +Long id_usuario
                            +Long id_pedido
                            +Long id_estado_pago
                            +Long id_metodo_pago
                            +Decimal monto
                            +FileField comprobante
                            +DateTime fecha_creacion
                            +DateTime fecha_actualizacion
                        "}
                    
                        class Transaccion{"
                            +Long id
                            +Long id_pago
                            +String referencia_externa
                            +Decimal monto
                            +String estado
                            +JSON respuesta_gateway
                            +DateTime fecha_creacion
                        "}
                    
                        class EstadoPago{"
                            +Long id
                            +String nombre
                            +String descripcion
                            +DateTime fecha_creacion
                            +DateTime fecha_actualizacion
                        "}
                    
                        class MetodoPago{"
                            +Long id
                            +String nombre
                            +Boolean activo
                            +DateTime fecha_creacion
                            +DateTime fecha_actualizacion
                        "}
                    
                        class Notificacion{"
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
                        "}
                    
                        class TipoNotificacion{"
                            +Long id
                            +String nombre
                            +String descripcion
                            +DateTime fecha_creacion
                            +DateTime fecha_actualizacion
                        "}
                    
                        class EstadoNotificacion{"
                            +Long id
                            +String nombre
                            +String descripcion
                            +DateTime fecha_creacion
                            +DateTime fecha_actualizacion
                        "}
                    
                        class Seccion{"
                            +Long id
                            +String nombre
                            +String descripcion
                            +Boolean activa
                            +DateTime fecha_creacion
                        "}
                    
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


.. dropdown:: 📊 Diagrama Colaboracion("5 diagramas")
    :open:
    :class-container: sd-mb-4

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart LR
                        Cliente(("👤\n:Cliente"))
                        UI[""📱\n:Frontend""]
                        API[""🔌\n:API Controller""]
                        OrderService[""⚙️\n:OrderService""]
                        StockService[""📦\n:StockService""]
                        PaymentService[""💳\n:PaymentService""]
                        DB["("💾\n:Database")"]
                        NotifService[""📧\n:NotifService""]
                    
                        Cliente -->|1: seleccionaProductos()| UI
                        UI -->|"2: crearPedido("items")"| API
                        API -->|"3: validarStock("items")"| StockService
                        StockService -->|4: SELECT stock| DB
                        DB -->|5: stock data| StockService
                        StockService -->|6: stock OK| API
                        API -->|"7: procesarPago("monto")"| PaymentService
                        PaymentService -->|8: pago aprobado| API
                        API -->|"9: crearPedido("data")"| OrderService
                        OrderService -->|10: INSERT pedido| DB
                        OrderService -->|"11: reducirStock("items")"| StockService
                        StockService -->|12: UPDATE stock| DB
                        OrderService -->|13: enviarNotif()| NotifService
                        NotifService -->|14: emails sent| OrderService
                        OrderService -->|15: pedido creado| API
                        API -->|16: 201 Created| UI
                        UI -->|17: confirmación| Cliente
                    
                        style Cliente fill:#e1f5ff
                        style DB fill:#fff4e1
                        style NotifService fill:#ffe1f5

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIENsaWVudGUoKFwiXHVkODNkXHVkYzY0XFxuOkNsaWVudGVcIikpXG4gICAgVUlbXCJcIlx1ZDgzZFx1ZGNmMVxcbjpGcm9udGVuZFwiXCJdXG4gICAgQVBJW1wiXCJcdWQ4M2RcdWRkMGNcXG46QVBJIENvbnRyb2xsZXJcIlwiXVxuICAgIE9yZGVyU2VydmljZVtcIlwiXHUyNjk5XHVmZTBmXFxuOk9yZGVyU2VydmljZVwiXCJdXG4gICAgU3RvY2tTZXJ2aWNlW1wiXCJcdWQ4M2RcdWRjZTZcXG46U3RvY2tTZXJ2aWNlXCJcIl1cbiAgICBQYXltZW50U2VydmljZVtcIlwiXHVkODNkXHVkY2IzXFxuOlBheW1lbnRTZXJ2aWNlXCJcIl1cbiAgICBEQltcIihcIlx1ZDgzZFx1ZGNiZVxcbjpEYXRhYmFzZVwiKVwiXVxuICAgIE5vdGlmU2VydmljZVtcIlwiXHVkODNkXHVkY2U3XFxuOk5vdGlmU2VydmljZVwiXCJdXG5cbiAgICBDbGllbnRlIC0tPnwxOiBzZWxlY2Npb25hUHJvZHVjdG9zKCl8IFVJXG4gICAgVUkgLS0+fFwiMjogY3JlYXJQZWRpZG8oXCJpdGVtc1wiKVwifCBBUElcbiAgICBBUEkgLS0+fFwiMzogdmFsaWRhclN0b2NrKFwiaXRlbXNcIilcInwgU3RvY2tTZXJ2aWNlXG4gICAgU3RvY2tTZXJ2aWNlIC0tPnw0OiBTRUxFQ1Qgc3RvY2t8IERCXG4gICAgREIgLS0+fDU6IHN0b2NrIGRhdGF8IFN0b2NrU2VydmljZVxuICAgIFN0b2NrU2VydmljZSAtLT58Njogc3RvY2sgT0t8IEFQSVxuICAgIEFQSSAtLT58XCI3OiBwcm9jZXNhclBhZ28oXCJtb250b1wiKVwifCBQYXltZW50U2VydmljZVxuICAgIFBheW1lbnRTZXJ2aWNlIC0tPnw4OiBwYWdvIGFwcm9iYWRvfCBBUElcbiAgICBBUEkgLS0+fFwiOTogY3JlYXJQZWRpZG8oXCJkYXRhXCIpXCJ8IE9yZGVyU2VydmljZVxuICAgIE9yZGVyU2VydmljZSAtLT58MTA6IElOU0VSVCBwZWRpZG98IERCXG4gICAgT3JkZXJTZXJ2aWNlIC0tPnxcIjExOiByZWR1Y2lyU3RvY2soXCJpdGVtc1wiKVwifCBTdG9ja1NlcnZpY2VcbiAgICBTdG9ja1NlcnZpY2UgLS0+fDEyOiBVUERBVEUgc3RvY2t8IERCXG4gICAgT3JkZXJTZXJ2aWNlIC0tPnwxMzogZW52aWFyTm90aWYoKXwgTm90aWZTZXJ2aWNlXG4gICAgTm90aWZTZXJ2aWNlIC0tPnwxNDogZW1haWxzIHNlbnR8IE9yZGVyU2VydmljZVxuICAgIE9yZGVyU2VydmljZSAtLT58MTU6IHBlZGlkbyBjcmVhZG98IEFQSVxuICAgIEFQSSAtLT58MTY6IDIwMSBDcmVhdGVkfCBVSVxuICAgIFVJIC0tPnwxNzogY29uZmlybWFjaVx1MDBmM258IENsaWVudGVcblxuICAgIHN0eWxlIENsaWVudGUgZmlsbDojZTFmNWZmXG4gICAgc3R5bGUgREIgZmlsbDojZmZmNGUxXG4gICAgc3R5bGUgTm90aWZTZXJ2aWNlIGZpbGw6I2ZmZTFmNSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIENsaWVudGUoKFwiXHVkODNkXHVkYzY0XFxuOkNsaWVudGVcIikpXG4gICAgVUlbXCJcIlx1ZDgzZFx1ZGNmMVxcbjpGcm9udGVuZFwiXCJdXG4gICAgQVBJW1wiXCJcdWQ4M2RcdWRkMGNcXG46QVBJIENvbnRyb2xsZXJcIlwiXVxuICAgIE9yZGVyU2VydmljZVtcIlwiXHUyNjk5XHVmZTBmXFxuOk9yZGVyU2VydmljZVwiXCJdXG4gICAgU3RvY2tTZXJ2aWNlW1wiXCJcdWQ4M2RcdWRjZTZcXG46U3RvY2tTZXJ2aWNlXCJcIl1cbiAgICBQYXltZW50U2VydmljZVtcIlwiXHVkODNkXHVkY2IzXFxuOlBheW1lbnRTZXJ2aWNlXCJcIl1cbiAgICBEQltcIihcIlx1ZDgzZFx1ZGNiZVxcbjpEYXRhYmFzZVwiKVwiXVxuICAgIE5vdGlmU2VydmljZVtcIlwiXHVkODNkXHVkY2U3XFxuOk5vdGlmU2VydmljZVwiXCJdXG5cbiAgICBDbGllbnRlIC0tPnwxOiBzZWxlY2Npb25hUHJvZHVjdG9zKCl8IFVJXG4gICAgVUkgLS0+fFwiMjogY3JlYXJQZWRpZG8oXCJpdGVtc1wiKVwifCBBUElcbiAgICBBUEkgLS0+fFwiMzogdmFsaWRhclN0b2NrKFwiaXRlbXNcIilcInwgU3RvY2tTZXJ2aWNlXG4gICAgU3RvY2tTZXJ2aWNlIC0tPnw0OiBTRUxFQ1Qgc3RvY2t8IERCXG4gICAgREIgLS0+fDU6IHN0b2NrIGRhdGF8IFN0b2NrU2VydmljZVxuICAgIFN0b2NrU2VydmljZSAtLT58Njogc3RvY2sgT0t8IEFQSVxuICAgIEFQSSAtLT58XCI3OiBwcm9jZXNhclBhZ28oXCJtb250b1wiKVwifCBQYXltZW50U2VydmljZVxuICAgIFBheW1lbnRTZXJ2aWNlIC0tPnw4OiBwYWdvIGFwcm9iYWRvfCBBUElcbiAgICBBUEkgLS0+fFwiOTogY3JlYXJQZWRpZG8oXCJkYXRhXCIpXCJ8IE9yZGVyU2VydmljZVxuICAgIE9yZGVyU2VydmljZSAtLT58MTA6IElOU0VSVCBwZWRpZG98IERCXG4gICAgT3JkZXJTZXJ2aWNlIC0tPnxcIjExOiByZWR1Y2lyU3RvY2soXCJpdGVtc1wiKVwifCBTdG9ja1NlcnZpY2VcbiAgICBTdG9ja1NlcnZpY2UgLS0+fDEyOiBVUERBVEUgc3RvY2t8IERCXG4gICAgT3JkZXJTZXJ2aWNlIC0tPnwxMzogZW52aWFyTm90aWYoKXwgTm90aWZTZXJ2aWNlXG4gICAgTm90aWZTZXJ2aWNlIC0tPnwxNDogZW1haWxzIHNlbnR8IE9yZGVyU2VydmljZVxuICAgIE9yZGVyU2VydmljZSAtLT58MTU6IHBlZGlkbyBjcmVhZG98IEFQSVxuICAgIEFQSSAtLT58MTY6IDIwMSBDcmVhdGVkfCBVSVxuICAgIFVJIC0tPnwxNzogY29uZmlybWFjaVx1MDBmM258IENsaWVudGVcblxuICAgIHN0eWxlIENsaWVudGUgZmlsbDojZTFmNWZmXG4gICAgc3R5bGUgREIgZmlsbDojZmZmNGUxXG4gICAgc3R5bGUgTm90aWZTZXJ2aWNlIGZpbGw6I2ZmZTFmNSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart LR
                        Cliente(("👤\n:Cliente"))
                        UI[""📱\n:Frontend""]
                        API[""🔌\n:API Controller""]
                        OrderService[""⚙️\n:OrderService""]
                        StockService[""📦\n:StockService""]
                        PaymentService[""💳\n:PaymentService""]
                        DB["("💾\n:Database")"]
                        NotifService[""📧\n:NotifService""]
                    
                        Cliente -->|1: seleccionaProductos()| UI
                        UI -->|"2: crearPedido("items")"| API
                        API -->|"3: validarStock("items")"| StockService
                        StockService -->|4: SELECT stock| DB
                        DB -->|5: stock data| StockService
                        StockService -->|6: stock OK| API
                        API -->|"7: procesarPago("monto")"| PaymentService
                        PaymentService -->|8: pago aprobado| API
                        API -->|"9: crearPedido("data")"| OrderService
                        OrderService -->|10: INSERT pedido| DB
                        OrderService -->|"11: reducirStock("items")"| StockService
                        StockService -->|12: UPDATE stock| DB
                        OrderService -->|13: enviarNotif()| NotifService
                        NotifService -->|14: emails sent| OrderService
                        OrderService -->|15: pedido creado| API
                        API -->|16: 201 Created| UI
                        UI -->|17: confirmación| Cliente
                    
                        style Cliente fill:#e1f5ff
                        style DB fill:#fff4e1
                        style NotifService fill:#ffe1f5

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TB
                        Cliente(("👤\n:Cliente"))
                        UI[""📱\n:Frontend""]
                        PaymentCtrl[""🔌\n:PaymentController""]
                        PaymentSvc[""⚙️\n:PaymentService""]
                        Gateway[""🌐\n:PaymentGateway""]
                        DB["("💾\n:Database")"]
                        OrderSvc[""📦\n:OrderService""]
                        NotifSvc[""📧\n:NotifService""]
                    
                        Cliente -->|1: ingresaDatosPago()| UI
                        UI -->|"2: procesarPago("datos")"| PaymentCtrl
                        PaymentCtrl -->|3: validarDatos()| PaymentSvc
                        PaymentSvc -->|"4: getPedido("id")"| DB
                        DB -->|5: pedido| PaymentSvc
                        PaymentSvc -->|"6: chargeCard("amount, card")"| Gateway
                        Gateway -->|7: [si aprobado] approved| PaymentSvc
                        PaymentSvc -->|8: INSERT pago| DB
                        PaymentSvc -->|9: INSERT transaccion| DB
                        PaymentSvc -->|10: updatePedido()| OrderSvc
                        OrderSvc -->|11: UPDATE estado| DB
                        PaymentSvc -->|12: notificarPago()| NotifSvc
                        NotifSvc -->|13: email sent| PaymentSvc
                        PaymentSvc -->|14: pagoExitoso| PaymentCtrl
                        PaymentCtrl -->|15: 200 OK| UI
                        UI -->|16: mostrarConfirmacion()| Cliente
                    
                        Gateway -.->|7a: [si rechazado] declined| PaymentSvc
                        PaymentSvc -.->|8a: registrarRechazo()| DB
                        PaymentSvc -.->|14a: pagoRechazado| PaymentCtrl
                        PaymentCtrl -.->|15a: 402 Payment Required| UI
                    
                        style Cliente fill:#e1f5ff
                        style Gateway fill:#ffe1e1
                        style DB fill:#fff4e1

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIENsaWVudGUoKFwiXHVkODNkXHVkYzY0XFxuOkNsaWVudGVcIikpXG4gICAgVUlbXCJcIlx1ZDgzZFx1ZGNmMVxcbjpGcm9udGVuZFwiXCJdXG4gICAgUGF5bWVudEN0cmxbXCJcIlx1ZDgzZFx1ZGQwY1xcbjpQYXltZW50Q29udHJvbGxlclwiXCJdXG4gICAgUGF5bWVudFN2Y1tcIlwiXHUyNjk5XHVmZTBmXFxuOlBheW1lbnRTZXJ2aWNlXCJcIl1cbiAgICBHYXRld2F5W1wiXCJcdWQ4M2NcdWRmMTBcXG46UGF5bWVudEdhdGV3YXlcIlwiXVxuICAgIERCW1wiKFwiXHVkODNkXHVkY2JlXFxuOkRhdGFiYXNlXCIpXCJdXG4gICAgT3JkZXJTdmNbXCJcIlx1ZDgzZFx1ZGNlNlxcbjpPcmRlclNlcnZpY2VcIlwiXVxuICAgIE5vdGlmU3ZjW1wiXCJcdWQ4M2RcdWRjZTdcXG46Tm90aWZTZXJ2aWNlXCJcIl1cblxuICAgIENsaWVudGUgLS0+fDE6IGluZ3Jlc2FEYXRvc1BhZ28oKXwgVUlcbiAgICBVSSAtLT58XCIyOiBwcm9jZXNhclBhZ28oXCJkYXRvc1wiKVwifCBQYXltZW50Q3RybFxuICAgIFBheW1lbnRDdHJsIC0tPnwzOiB2YWxpZGFyRGF0b3MoKXwgUGF5bWVudFN2Y1xuICAgIFBheW1lbnRTdmMgLS0+fFwiNDogZ2V0UGVkaWRvKFwiaWRcIilcInwgREJcbiAgICBEQiAtLT58NTogcGVkaWRvfCBQYXltZW50U3ZjXG4gICAgUGF5bWVudFN2YyAtLT58XCI2OiBjaGFyZ2VDYXJkKFwiYW1vdW50LCBjYXJkXCIpXCJ8IEdhdGV3YXlcbiAgICBHYXRld2F5IC0tPnw3OiBbc2kgYXByb2JhZG9dIGFwcHJvdmVkfCBQYXltZW50U3ZjXG4gICAgUGF5bWVudFN2YyAtLT58ODogSU5TRVJUIHBhZ298IERCXG4gICAgUGF5bWVudFN2YyAtLT58OTogSU5TRVJUIHRyYW5zYWNjaW9ufCBEQlxuICAgIFBheW1lbnRTdmMgLS0+fDEwOiB1cGRhdGVQZWRpZG8oKXwgT3JkZXJTdmNcbiAgICBPcmRlclN2YyAtLT58MTE6IFVQREFURSBlc3RhZG98IERCXG4gICAgUGF5bWVudFN2YyAtLT58MTI6IG5vdGlmaWNhclBhZ28oKXwgTm90aWZTdmNcbiAgICBOb3RpZlN2YyAtLT58MTM6IGVtYWlsIHNlbnR8IFBheW1lbnRTdmNcbiAgICBQYXltZW50U3ZjIC0tPnwxNDogcGFnb0V4aXRvc298IFBheW1lbnRDdHJsXG4gICAgUGF5bWVudEN0cmwgLS0+fDE1OiAyMDAgT0t8IFVJXG4gICAgVUkgLS0+fDE2OiBtb3N0cmFyQ29uZmlybWFjaW9uKCl8IENsaWVudGVcblxuICAgIEdhdGV3YXkgLS4tPnw3YTogW3NpIHJlY2hhemFkb10gZGVjbGluZWR8IFBheW1lbnRTdmNcbiAgICBQYXltZW50U3ZjIC0uLT58OGE6IHJlZ2lzdHJhclJlY2hhem8oKXwgREJcbiAgICBQYXltZW50U3ZjIC0uLT58MTRhOiBwYWdvUmVjaGF6YWRvfCBQYXltZW50Q3RybFxuICAgIFBheW1lbnRDdHJsIC0uLT58MTVhOiA0MDIgUGF5bWVudCBSZXF1aXJlZHwgVUlcblxuICAgIHN0eWxlIENsaWVudGUgZmlsbDojZTFmNWZmXG4gICAgc3R5bGUgR2F0ZXdheSBmaWxsOiNmZmUxZTFcbiAgICBzdHlsZSBEQiBmaWxsOiNmZmY0ZTEiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIENsaWVudGUoKFwiXHVkODNkXHVkYzY0XFxuOkNsaWVudGVcIikpXG4gICAgVUlbXCJcIlx1ZDgzZFx1ZGNmMVxcbjpGcm9udGVuZFwiXCJdXG4gICAgUGF5bWVudEN0cmxbXCJcIlx1ZDgzZFx1ZGQwY1xcbjpQYXltZW50Q29udHJvbGxlclwiXCJdXG4gICAgUGF5bWVudFN2Y1tcIlwiXHUyNjk5XHVmZTBmXFxuOlBheW1lbnRTZXJ2aWNlXCJcIl1cbiAgICBHYXRld2F5W1wiXCJcdWQ4M2NcdWRmMTBcXG46UGF5bWVudEdhdGV3YXlcIlwiXVxuICAgIERCW1wiKFwiXHVkODNkXHVkY2JlXFxuOkRhdGFiYXNlXCIpXCJdXG4gICAgT3JkZXJTdmNbXCJcIlx1ZDgzZFx1ZGNlNlxcbjpPcmRlclNlcnZpY2VcIlwiXVxuICAgIE5vdGlmU3ZjW1wiXCJcdWQ4M2RcdWRjZTdcXG46Tm90aWZTZXJ2aWNlXCJcIl1cblxuICAgIENsaWVudGUgLS0+fDE6IGluZ3Jlc2FEYXRvc1BhZ28oKXwgVUlcbiAgICBVSSAtLT58XCIyOiBwcm9jZXNhclBhZ28oXCJkYXRvc1wiKVwifCBQYXltZW50Q3RybFxuICAgIFBheW1lbnRDdHJsIC0tPnwzOiB2YWxpZGFyRGF0b3MoKXwgUGF5bWVudFN2Y1xuICAgIFBheW1lbnRTdmMgLS0+fFwiNDogZ2V0UGVkaWRvKFwiaWRcIilcInwgREJcbiAgICBEQiAtLT58NTogcGVkaWRvfCBQYXltZW50U3ZjXG4gICAgUGF5bWVudFN2YyAtLT58XCI2OiBjaGFyZ2VDYXJkKFwiYW1vdW50LCBjYXJkXCIpXCJ8IEdhdGV3YXlcbiAgICBHYXRld2F5IC0tPnw3OiBbc2kgYXByb2JhZG9dIGFwcHJvdmVkfCBQYXltZW50U3ZjXG4gICAgUGF5bWVudFN2YyAtLT58ODogSU5TRVJUIHBhZ298IERCXG4gICAgUGF5bWVudFN2YyAtLT58OTogSU5TRVJUIHRyYW5zYWNjaW9ufCBEQlxuICAgIFBheW1lbnRTdmMgLS0+fDEwOiB1cGRhdGVQZWRpZG8oKXwgT3JkZXJTdmNcbiAgICBPcmRlclN2YyAtLT58MTE6IFVQREFURSBlc3RhZG98IERCXG4gICAgUGF5bWVudFN2YyAtLT58MTI6IG5vdGlmaWNhclBhZ28oKXwgTm90aWZTdmNcbiAgICBOb3RpZlN2YyAtLT58MTM6IGVtYWlsIHNlbnR8IFBheW1lbnRTdmNcbiAgICBQYXltZW50U3ZjIC0tPnwxNDogcGFnb0V4aXRvc298IFBheW1lbnRDdHJsXG4gICAgUGF5bWVudEN0cmwgLS0+fDE1OiAyMDAgT0t8IFVJXG4gICAgVUkgLS0+fDE2OiBtb3N0cmFyQ29uZmlybWFjaW9uKCl8IENsaWVudGVcblxuICAgIEdhdGV3YXkgLS4tPnw3YTogW3NpIHJlY2hhemFkb10gZGVjbGluZWR8IFBheW1lbnRTdmNcbiAgICBQYXltZW50U3ZjIC0uLT58OGE6IHJlZ2lzdHJhclJlY2hhem8oKXwgREJcbiAgICBQYXltZW50U3ZjIC0uLT58MTRhOiBwYWdvUmVjaGF6YWRvfCBQYXltZW50Q3RybFxuICAgIFBheW1lbnRDdHJsIC0uLT58MTVhOiA0MDIgUGF5bWVudCBSZXF1aXJlZHwgVUlcblxuICAgIHN0eWxlIENsaWVudGUgZmlsbDojZTFmNWZmXG4gICAgc3R5bGUgR2F0ZXdheSBmaWxsOiNmZmUxZTFcbiAgICBzdHlsZSBEQiBmaWxsOiNmZmY0ZTEiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TB
                        Cliente(("👤\n:Cliente"))
                        UI[""📱\n:Frontend""]
                        PaymentCtrl[""🔌\n:PaymentController""]
                        PaymentSvc[""⚙️\n:PaymentService""]
                        Gateway[""🌐\n:PaymentGateway""]
                        DB["("💾\n:Database")"]
                        OrderSvc[""📦\n:OrderService""]
                        NotifSvc[""📧\n:NotifService""]
                    
                        Cliente -->|1: ingresaDatosPago()| UI
                        UI -->|"2: procesarPago("datos")"| PaymentCtrl
                        PaymentCtrl -->|3: validarDatos()| PaymentSvc
                        PaymentSvc -->|"4: getPedido("id")"| DB
                        DB -->|5: pedido| PaymentSvc
                        PaymentSvc -->|"6: chargeCard("amount, card")"| Gateway
                        Gateway -->|7: [si aprobado] approved| PaymentSvc
                        PaymentSvc -->|8: INSERT pago| DB
                        PaymentSvc -->|9: INSERT transaccion| DB
                        PaymentSvc -->|10: updatePedido()| OrderSvc
                        OrderSvc -->|11: UPDATE estado| DB
                        PaymentSvc -->|12: notificarPago()| NotifSvc
                        NotifSvc -->|13: email sent| PaymentSvc
                        PaymentSvc -->|14: pagoExitoso| PaymentCtrl
                        PaymentCtrl -->|15: 200 OK| UI
                        UI -->|16: mostrarConfirmacion()| Cliente
                    
                        Gateway -.->|7a: [si rechazado] declined| PaymentSvc
                        PaymentSvc -.->|8a: registrarRechazo()| DB
                        PaymentSvc -.->|14a: pagoRechazado| PaymentCtrl
                        PaymentCtrl -.->|15a: 402 Payment Required| UI
                    
                        style Cliente fill:#e1f5ff
                        style Gateway fill:#ffe1e1
                        style DB fill:#fff4e1

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TB
                        Beat[""⏰\n:CeleryBeat""]
                        Worker[""⚙️\n:CeleryWorker""]
                        StockMonitor[""🔍\n:StockMonitor""]
                        DB["("💾\n:Database")"]
                        StockSvc[""📦\n:StockService""]
                        NotifSvc[""📧\n:NotifService""]
                        Proveedor(("👨‍💼\n:Proveedor"))
                    
                        Beat -->|1: [cada 1h] trigger()| Worker
                        Worker -->|2: checkStockLevels()| StockMonitor
                        StockMonitor -->|3: getProductosConRecarga()| DB
                        DB -->|4: productos[]| StockMonitor
                        
                        StockMonitor -->|"5: [loop] necesitaRecarga("p")"| StockSvc
                        StockSvc -->|6: stock <= minimo?| StockSvc
                        StockSvc -->|"7: [si] ejecutarRecarga("p")"| DB
                        DB -->|8: BEGIN TRANSACTION| DB
                        StockSvc -->|9: UPDATE stock| DB
                        StockSvc -->|10: INSERT historial| DB
                        StockSvc -->|11: UPDATE config| DB
                        DB -->|12: COMMIT| DB
                        
                        StockSvc -->|"13: notificarProveedor("p")"| NotifSvc
                        NotifSvc -->|14: enviarEmail()| Proveedor
                        Proveedor -->|15: recibe alerta| Proveedor
                        
                        StockSvc -->|16: recarga completada| StockMonitor
                        StockMonitor -->|17: siguiente producto| StockMonitor
                        
                        StockMonitor -->|18: [fin loop] reporte| Worker
                        Worker -->|19: task completed| Beat
                    
                        style Beat fill:#e1ffe1
                        style Proveedor fill:#e1f5ff
                        style DB fill:#fff4e1

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIEJlYXRbXCJcIlx1MjNmMFxcbjpDZWxlcnlCZWF0XCJcIl1cbiAgICBXb3JrZXJbXCJcIlx1MjY5OVx1ZmUwZlxcbjpDZWxlcnlXb3JrZXJcIlwiXVxuICAgIFN0b2NrTW9uaXRvcltcIlwiXHVkODNkXHVkZDBkXFxuOlN0b2NrTW9uaXRvclwiXCJdXG4gICAgREJbXCIoXCJcdWQ4M2RcdWRjYmVcXG46RGF0YWJhc2VcIilcIl1cbiAgICBTdG9ja1N2Y1tcIlwiXHVkODNkXHVkY2U2XFxuOlN0b2NrU2VydmljZVwiXCJdXG4gICAgTm90aWZTdmNbXCJcIlx1ZDgzZFx1ZGNlN1xcbjpOb3RpZlNlcnZpY2VcIlwiXVxuICAgIFByb3ZlZWRvcigoXCJcdWQ4M2RcdWRjNjhcdTIwMGRcdWQ4M2RcdWRjYmNcXG46UHJvdmVlZG9yXCIpKVxuXG4gICAgQmVhdCAtLT58MTogW2NhZGEgMWhdIHRyaWdnZXIoKXwgV29ya2VyXG4gICAgV29ya2VyIC0tPnwyOiBjaGVja1N0b2NrTGV2ZWxzKCl8IFN0b2NrTW9uaXRvclxuICAgIFN0b2NrTW9uaXRvciAtLT58MzogZ2V0UHJvZHVjdG9zQ29uUmVjYXJnYSgpfCBEQlxuICAgIERCIC0tPnw0OiBwcm9kdWN0b3NbXXwgU3RvY2tNb25pdG9yXG4gICAgXG4gICAgU3RvY2tNb25pdG9yIC0tPnxcIjU6IFtsb29wXSBuZWNlc2l0YVJlY2FyZ2EoXCJwXCIpXCJ8IFN0b2NrU3ZjXG4gICAgU3RvY2tTdmMgLS0+fDY6IHN0b2NrIDw9IG1pbmltbz98IFN0b2NrU3ZjXG4gICAgU3RvY2tTdmMgLS0+fFwiNzogW3NpXSBlamVjdXRhclJlY2FyZ2EoXCJwXCIpXCJ8IERCXG4gICAgREIgLS0+fDg6IEJFR0lOIFRSQU5TQUNUSU9OfCBEQlxuICAgIFN0b2NrU3ZjIC0tPnw5OiBVUERBVEUgc3RvY2t8IERCXG4gICAgU3RvY2tTdmMgLS0+fDEwOiBJTlNFUlQgaGlzdG9yaWFsfCBEQlxuICAgIFN0b2NrU3ZjIC0tPnwxMTogVVBEQVRFIGNvbmZpZ3wgREJcbiAgICBEQiAtLT58MTI6IENPTU1JVHwgREJcbiAgICBcbiAgICBTdG9ja1N2YyAtLT58XCIxMzogbm90aWZpY2FyUHJvdmVlZG9yKFwicFwiKVwifCBOb3RpZlN2Y1xuICAgIE5vdGlmU3ZjIC0tPnwxNDogZW52aWFyRW1haWwoKXwgUHJvdmVlZG9yXG4gICAgUHJvdmVlZG9yIC0tPnwxNTogcmVjaWJlIGFsZXJ0YXwgUHJvdmVlZG9yXG4gICAgXG4gICAgU3RvY2tTdmMgLS0+fDE2OiByZWNhcmdhIGNvbXBsZXRhZGF8IFN0b2NrTW9uaXRvclxuICAgIFN0b2NrTW9uaXRvciAtLT58MTc6IHNpZ3VpZW50ZSBwcm9kdWN0b3wgU3RvY2tNb25pdG9yXG4gICAgXG4gICAgU3RvY2tNb25pdG9yIC0tPnwxODogW2ZpbiBsb29wXSByZXBvcnRlfCBXb3JrZXJcbiAgICBXb3JrZXIgLS0+fDE5OiB0YXNrIGNvbXBsZXRlZHwgQmVhdFxuXG4gICAgc3R5bGUgQmVhdCBmaWxsOiNlMWZmZTFcbiAgICBzdHlsZSBQcm92ZWVkb3IgZmlsbDojZTFmNWZmXG4gICAgc3R5bGUgREIgZmlsbDojZmZmNGUxIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIEJlYXRbXCJcIlx1MjNmMFxcbjpDZWxlcnlCZWF0XCJcIl1cbiAgICBXb3JrZXJbXCJcIlx1MjY5OVx1ZmUwZlxcbjpDZWxlcnlXb3JrZXJcIlwiXVxuICAgIFN0b2NrTW9uaXRvcltcIlwiXHVkODNkXHVkZDBkXFxuOlN0b2NrTW9uaXRvclwiXCJdXG4gICAgREJbXCIoXCJcdWQ4M2RcdWRjYmVcXG46RGF0YWJhc2VcIilcIl1cbiAgICBTdG9ja1N2Y1tcIlwiXHVkODNkXHVkY2U2XFxuOlN0b2NrU2VydmljZVwiXCJdXG4gICAgTm90aWZTdmNbXCJcIlx1ZDgzZFx1ZGNlN1xcbjpOb3RpZlNlcnZpY2VcIlwiXVxuICAgIFByb3ZlZWRvcigoXCJcdWQ4M2RcdWRjNjhcdTIwMGRcdWQ4M2RcdWRjYmNcXG46UHJvdmVlZG9yXCIpKVxuXG4gICAgQmVhdCAtLT58MTogW2NhZGEgMWhdIHRyaWdnZXIoKXwgV29ya2VyXG4gICAgV29ya2VyIC0tPnwyOiBjaGVja1N0b2NrTGV2ZWxzKCl8IFN0b2NrTW9uaXRvclxuICAgIFN0b2NrTW9uaXRvciAtLT58MzogZ2V0UHJvZHVjdG9zQ29uUmVjYXJnYSgpfCBEQlxuICAgIERCIC0tPnw0OiBwcm9kdWN0b3NbXXwgU3RvY2tNb25pdG9yXG4gICAgXG4gICAgU3RvY2tNb25pdG9yIC0tPnxcIjU6IFtsb29wXSBuZWNlc2l0YVJlY2FyZ2EoXCJwXCIpXCJ8IFN0b2NrU3ZjXG4gICAgU3RvY2tTdmMgLS0+fDY6IHN0b2NrIDw9IG1pbmltbz98IFN0b2NrU3ZjXG4gICAgU3RvY2tTdmMgLS0+fFwiNzogW3NpXSBlamVjdXRhclJlY2FyZ2EoXCJwXCIpXCJ8IERCXG4gICAgREIgLS0+fDg6IEJFR0lOIFRSQU5TQUNUSU9OfCBEQlxuICAgIFN0b2NrU3ZjIC0tPnw5OiBVUERBVEUgc3RvY2t8IERCXG4gICAgU3RvY2tTdmMgLS0+fDEwOiBJTlNFUlQgaGlzdG9yaWFsfCBEQlxuICAgIFN0b2NrU3ZjIC0tPnwxMTogVVBEQVRFIGNvbmZpZ3wgREJcbiAgICBEQiAtLT58MTI6IENPTU1JVHwgREJcbiAgICBcbiAgICBTdG9ja1N2YyAtLT58XCIxMzogbm90aWZpY2FyUHJvdmVlZG9yKFwicFwiKVwifCBOb3RpZlN2Y1xuICAgIE5vdGlmU3ZjIC0tPnwxNDogZW52aWFyRW1haWwoKXwgUHJvdmVlZG9yXG4gICAgUHJvdmVlZG9yIC0tPnwxNTogcmVjaWJlIGFsZXJ0YXwgUHJvdmVlZG9yXG4gICAgXG4gICAgU3RvY2tTdmMgLS0+fDE2OiByZWNhcmdhIGNvbXBsZXRhZGF8IFN0b2NrTW9uaXRvclxuICAgIFN0b2NrTW9uaXRvciAtLT58MTc6IHNpZ3VpZW50ZSBwcm9kdWN0b3wgU3RvY2tNb25pdG9yXG4gICAgXG4gICAgU3RvY2tNb25pdG9yIC0tPnwxODogW2ZpbiBsb29wXSByZXBvcnRlfCBXb3JrZXJcbiAgICBXb3JrZXIgLS0+fDE5OiB0YXNrIGNvbXBsZXRlZHwgQmVhdFxuXG4gICAgc3R5bGUgQmVhdCBmaWxsOiNlMWZmZTFcbiAgICBzdHlsZSBQcm92ZWVkb3IgZmlsbDojZTFmNWZmXG4gICAgc3R5bGUgREIgZmlsbDojZmZmNGUxIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TB
                        Beat[""⏰\n:CeleryBeat""]
                        Worker[""⚙️\n:CeleryWorker""]
                        StockMonitor[""🔍\n:StockMonitor""]
                        DB["("💾\n:Database")"]
                        StockSvc[""📦\n:StockService""]
                        NotifSvc[""📧\n:NotifService""]
                        Proveedor(("👨‍💼\n:Proveedor"))
                    
                        Beat -->|1: [cada 1h] trigger()| Worker
                        Worker -->|2: checkStockLevels()| StockMonitor
                        StockMonitor -->|3: getProductosConRecarga()| DB
                        DB -->|4: productos[]| StockMonitor
                        
                        StockMonitor -->|"5: [loop] necesitaRecarga("p")"| StockSvc
                        StockSvc -->|6: stock <= minimo?| StockSvc
                        StockSvc -->|"7: [si] ejecutarRecarga("p")"| DB
                        DB -->|8: BEGIN TRANSACTION| DB
                        StockSvc -->|9: UPDATE stock| DB
                        StockSvc -->|10: INSERT historial| DB
                        StockSvc -->|11: UPDATE config| DB
                        DB -->|12: COMMIT| DB
                        
                        StockSvc -->|"13: notificarProveedor("p")"| NotifSvc
                        NotifSvc -->|14: enviarEmail()| Proveedor
                        Proveedor -->|15: recibe alerta| Proveedor
                        
                        StockSvc -->|16: recarga completada| StockMonitor
                        StockMonitor -->|17: siguiente producto| StockMonitor
                        
                        StockMonitor -->|18: [fin loop] reporte| Worker
                        Worker -->|19: task completed| Beat
                    
                        style Beat fill:#e1ffe1
                        style Proveedor fill:#e1f5ff
                        style DB fill:#fff4e1

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart LR
                        Logistica(("🚚\n:Logistica"))
                        UI[""📱\n:Frontend""]
                        OrderCtrl[""🔌\n:OrderController""]
                        OrderSvc[""⚙️\n:OrderService""]
                        DB["("💾\n:Database")"]
                        VentaSvc[""💰\n:VentaService""]
                        NotifSvc[""📧\n:NotifService""]
                        Cliente(("👤\n:Cliente"))
                    
                        Logistica -->|"1: seleccionaPedido("id")"| UI
                        UI -->|"2: cambiarEstado("id, nuevo")"| OrderCtrl
                        OrderCtrl -->|"3: getPedido("id")"| DB
                        DB -->|4: pedido actual| OrderCtrl
                        OrderCtrl -->|5: validarTransicion()| OrderSvc
                        OrderSvc -->|6: [si válido] ok| OrderCtrl
                        OrderCtrl -->|7: updateEstado()| DB
                        DB -->|8: estado updated| OrderCtrl
                        
                        OrderCtrl -->|9: [si entregado] generarVenta()| VentaSvc
                        VentaSvc -->|10: INSERT venta| DB
                        VentaSvc -->|11: INSERT detalles| DB
                        VentaSvc -->|12: venta creada| OrderCtrl
                        
                        OrderCtrl -->|13: notificarCambio()| NotifSvc
                        NotifSvc -->|14: enviarEmail()| Cliente
                        Cliente -->|15: recibe notif| Cliente
                        
                        OrderCtrl -->|"16: 200 OK("pedido")"| UI
                        UI -->|17: mostrarConfirm()| Logistica
                    
                        OrderSvc -.->|6a: [inválido] error| OrderCtrl
                        OrderCtrl -.->|16a: 400 Bad Request| UI
                    
                        style Logistica fill:#ffe1f5
                        style Cliente fill:#e1f5ff
                        style DB fill:#fff4e1

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIExvZ2lzdGljYSgoXCJcdWQ4M2RcdWRlOWFcXG46TG9naXN0aWNhXCIpKVxuICAgIFVJW1wiXCJcdWQ4M2RcdWRjZjFcXG46RnJvbnRlbmRcIlwiXVxuICAgIE9yZGVyQ3RybFtcIlwiXHVkODNkXHVkZDBjXFxuOk9yZGVyQ29udHJvbGxlclwiXCJdXG4gICAgT3JkZXJTdmNbXCJcIlx1MjY5OVx1ZmUwZlxcbjpPcmRlclNlcnZpY2VcIlwiXVxuICAgIERCW1wiKFwiXHVkODNkXHVkY2JlXFxuOkRhdGFiYXNlXCIpXCJdXG4gICAgVmVudGFTdmNbXCJcIlx1ZDgzZFx1ZGNiMFxcbjpWZW50YVNlcnZpY2VcIlwiXVxuICAgIE5vdGlmU3ZjW1wiXCJcdWQ4M2RcdWRjZTdcXG46Tm90aWZTZXJ2aWNlXCJcIl1cbiAgICBDbGllbnRlKChcIlx1ZDgzZFx1ZGM2NFxcbjpDbGllbnRlXCIpKVxuXG4gICAgTG9naXN0aWNhIC0tPnxcIjE6IHNlbGVjY2lvbmFQZWRpZG8oXCJpZFwiKVwifCBVSVxuICAgIFVJIC0tPnxcIjI6IGNhbWJpYXJFc3RhZG8oXCJpZCwgbnVldm9cIilcInwgT3JkZXJDdHJsXG4gICAgT3JkZXJDdHJsIC0tPnxcIjM6IGdldFBlZGlkbyhcImlkXCIpXCJ8IERCXG4gICAgREIgLS0+fDQ6IHBlZGlkbyBhY3R1YWx8IE9yZGVyQ3RybFxuICAgIE9yZGVyQ3RybCAtLT58NTogdmFsaWRhclRyYW5zaWNpb24oKXwgT3JkZXJTdmNcbiAgICBPcmRlclN2YyAtLT58NjogW3NpIHZcdTAwZTFsaWRvXSBva3wgT3JkZXJDdHJsXG4gICAgT3JkZXJDdHJsIC0tPnw3OiB1cGRhdGVFc3RhZG8oKXwgREJcbiAgICBEQiAtLT58ODogZXN0YWRvIHVwZGF0ZWR8IE9yZGVyQ3RybFxuICAgIFxuICAgIE9yZGVyQ3RybCAtLT58OTogW3NpIGVudHJlZ2Fkb10gZ2VuZXJhclZlbnRhKCl8IFZlbnRhU3ZjXG4gICAgVmVudGFTdmMgLS0+fDEwOiBJTlNFUlQgdmVudGF8IERCXG4gICAgVmVudGFTdmMgLS0+fDExOiBJTlNFUlQgZGV0YWxsZXN8IERCXG4gICAgVmVudGFTdmMgLS0+fDEyOiB2ZW50YSBjcmVhZGF8IE9yZGVyQ3RybFxuICAgIFxuICAgIE9yZGVyQ3RybCAtLT58MTM6IG5vdGlmaWNhckNhbWJpbygpfCBOb3RpZlN2Y1xuICAgIE5vdGlmU3ZjIC0tPnwxNDogZW52aWFyRW1haWwoKXwgQ2xpZW50ZVxuICAgIENsaWVudGUgLS0+fDE1OiByZWNpYmUgbm90aWZ8IENsaWVudGVcbiAgICBcbiAgICBPcmRlckN0cmwgLS0+fFwiMTY6IDIwMCBPSyhcInBlZGlkb1wiKVwifCBVSVxuICAgIFVJIC0tPnwxNzogbW9zdHJhckNvbmZpcm0oKXwgTG9naXN0aWNhXG5cbiAgICBPcmRlclN2YyAtLi0+fDZhOiBbaW52XHUwMGUxbGlkb10gZXJyb3J8IE9yZGVyQ3RybFxuICAgIE9yZGVyQ3RybCAtLi0+fDE2YTogNDAwIEJhZCBSZXF1ZXN0fCBVSVxuXG4gICAgc3R5bGUgTG9naXN0aWNhIGZpbGw6I2ZmZTFmNVxuICAgIHN0eWxlIENsaWVudGUgZmlsbDojZTFmNWZmXG4gICAgc3R5bGUgREIgZmlsbDojZmZmNGUxIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIExvZ2lzdGljYSgoXCJcdWQ4M2RcdWRlOWFcXG46TG9naXN0aWNhXCIpKVxuICAgIFVJW1wiXCJcdWQ4M2RcdWRjZjFcXG46RnJvbnRlbmRcIlwiXVxuICAgIE9yZGVyQ3RybFtcIlwiXHVkODNkXHVkZDBjXFxuOk9yZGVyQ29udHJvbGxlclwiXCJdXG4gICAgT3JkZXJTdmNbXCJcIlx1MjY5OVx1ZmUwZlxcbjpPcmRlclNlcnZpY2VcIlwiXVxuICAgIERCW1wiKFwiXHVkODNkXHVkY2JlXFxuOkRhdGFiYXNlXCIpXCJdXG4gICAgVmVudGFTdmNbXCJcIlx1ZDgzZFx1ZGNiMFxcbjpWZW50YVNlcnZpY2VcIlwiXVxuICAgIE5vdGlmU3ZjW1wiXCJcdWQ4M2RcdWRjZTdcXG46Tm90aWZTZXJ2aWNlXCJcIl1cbiAgICBDbGllbnRlKChcIlx1ZDgzZFx1ZGM2NFxcbjpDbGllbnRlXCIpKVxuXG4gICAgTG9naXN0aWNhIC0tPnxcIjE6IHNlbGVjY2lvbmFQZWRpZG8oXCJpZFwiKVwifCBVSVxuICAgIFVJIC0tPnxcIjI6IGNhbWJpYXJFc3RhZG8oXCJpZCwgbnVldm9cIilcInwgT3JkZXJDdHJsXG4gICAgT3JkZXJDdHJsIC0tPnxcIjM6IGdldFBlZGlkbyhcImlkXCIpXCJ8IERCXG4gICAgREIgLS0+fDQ6IHBlZGlkbyBhY3R1YWx8IE9yZGVyQ3RybFxuICAgIE9yZGVyQ3RybCAtLT58NTogdmFsaWRhclRyYW5zaWNpb24oKXwgT3JkZXJTdmNcbiAgICBPcmRlclN2YyAtLT58NjogW3NpIHZcdTAwZTFsaWRvXSBva3wgT3JkZXJDdHJsXG4gICAgT3JkZXJDdHJsIC0tPnw3OiB1cGRhdGVFc3RhZG8oKXwgREJcbiAgICBEQiAtLT58ODogZXN0YWRvIHVwZGF0ZWR8IE9yZGVyQ3RybFxuICAgIFxuICAgIE9yZGVyQ3RybCAtLT58OTogW3NpIGVudHJlZ2Fkb10gZ2VuZXJhclZlbnRhKCl8IFZlbnRhU3ZjXG4gICAgVmVudGFTdmMgLS0+fDEwOiBJTlNFUlQgdmVudGF8IERCXG4gICAgVmVudGFTdmMgLS0+fDExOiBJTlNFUlQgZGV0YWxsZXN8IERCXG4gICAgVmVudGFTdmMgLS0+fDEyOiB2ZW50YSBjcmVhZGF8IE9yZGVyQ3RybFxuICAgIFxuICAgIE9yZGVyQ3RybCAtLT58MTM6IG5vdGlmaWNhckNhbWJpbygpfCBOb3RpZlN2Y1xuICAgIE5vdGlmU3ZjIC0tPnwxNDogZW52aWFyRW1haWwoKXwgQ2xpZW50ZVxuICAgIENsaWVudGUgLS0+fDE1OiByZWNpYmUgbm90aWZ8IENsaWVudGVcbiAgICBcbiAgICBPcmRlckN0cmwgLS0+fFwiMTY6IDIwMCBPSyhcInBlZGlkb1wiKVwifCBVSVxuICAgIFVJIC0tPnwxNzogbW9zdHJhckNvbmZpcm0oKXwgTG9naXN0aWNhXG5cbiAgICBPcmRlclN2YyAtLi0+fDZhOiBbaW52XHUwMGUxbGlkb10gZXJyb3J8IE9yZGVyQ3RybFxuICAgIE9yZGVyQ3RybCAtLi0+fDE2YTogNDAwIEJhZCBSZXF1ZXN0fCBVSVxuXG4gICAgc3R5bGUgTG9naXN0aWNhIGZpbGw6I2ZmZTFmNVxuICAgIHN0eWxlIENsaWVudGUgZmlsbDojZTFmNWZmXG4gICAgc3R5bGUgREIgZmlsbDojZmZmNGUxIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart LR
                        Logistica(("🚚\n:Logistica"))
                        UI[""📱\n:Frontend""]
                        OrderCtrl[""🔌\n:OrderController""]
                        OrderSvc[""⚙️\n:OrderService""]
                        DB["("💾\n:Database")"]
                        VentaSvc[""💰\n:VentaService""]
                        NotifSvc[""📧\n:NotifService""]
                        Cliente(("👤\n:Cliente"))
                    
                        Logistica -->|"1: seleccionaPedido("id")"| UI
                        UI -->|"2: cambiarEstado("id, nuevo")"| OrderCtrl
                        OrderCtrl -->|"3: getPedido("id")"| DB
                        DB -->|4: pedido actual| OrderCtrl
                        OrderCtrl -->|5: validarTransicion()| OrderSvc
                        OrderSvc -->|6: [si válido] ok| OrderCtrl
                        OrderCtrl -->|7: updateEstado()| DB
                        DB -->|8: estado updated| OrderCtrl
                        
                        OrderCtrl -->|9: [si entregado] generarVenta()| VentaSvc
                        VentaSvc -->|10: INSERT venta| DB
                        VentaSvc -->|11: INSERT detalles| DB
                        VentaSvc -->|12: venta creada| OrderCtrl
                        
                        OrderCtrl -->|13: notificarCambio()| NotifSvc
                        NotifSvc -->|14: enviarEmail()| Cliente
                        Cliente -->|15: recibe notif| Cliente
                        
                        OrderCtrl -->|"16: 200 OK("pedido")"| UI
                        UI -->|17: mostrarConfirm()| Logistica
                    
                        OrderSvc -.->|6a: [inválido] error| OrderCtrl
                        OrderCtrl -.->|16a: 400 Bad Request| UI
                    
                        style Logistica fill:#ffe1f5
                        style Cliente fill:#e1f5ff
                        style DB fill:#fff4e1

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TB
                        Usuario(("👤\n:Usuario"))
                        UI[""📱\n:Frontend""]
                        AuthCtrl[""🔌\n:AuthController""]
                        AuthSvc[""⚙️\n:AuthService""]
                        TokenGen[""🔑\n:JWTGenerator""]
                        PassValidator[""🔒\n:PasswordValidator""]
                        DB["("💾\n:Database")"]
                    
                        Usuario -->|1: ingresaCredenciales()| UI
                        UI -->|"2: login("email, pass")"| AuthCtrl
                        AuthCtrl -->|3: getUserByEmail()| DB
                        DB -->|4: usuario| AuthCtrl
                        AuthCtrl -->|5: checkPassword()| PassValidator
                        PassValidator -->|6: [si correcto] ok| AuthCtrl
                        AuthCtrl -->|7: verifyAccountStatus()| AuthSvc
                        AuthSvc -->|8: [si activo] ok| AuthCtrl
                        AuthCtrl -->|"9: generateTokens("user")"| TokenGen
                        TokenGen -->|"10: create access("15min")"| TokenGen
                        TokenGen -->|"11: create refresh("7d")"| TokenGen
                        TokenGen -->|12: {access, refresh}| AuthCtrl
                        AuthCtrl -->|13: UPDATE ultimo_ingreso| DB
                        AuthCtrl -->|"14: 200 OK("tokens, user")"| UI
                        UI -->|15: storeTokens()| UI
                        UI -->|16: redirectDashboard()| Usuario
                    
                        PassValidator -.->|6a: [incorrecto] error| AuthCtrl
                        AuthCtrl -.->|14a: 401 Unauthorized| UI
                        
                        AuthSvc -.->|8a: [suspendido] error| AuthCtrl
                        AuthCtrl -.->|14b: 403 Forbidden| UI
                    
                        style Usuario fill:#e1f5ff
                        style TokenGen fill:#fff4e1
                        style DB fill:#fff4e1

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIFVzdWFyaW8oKFwiXHVkODNkXHVkYzY0XFxuOlVzdWFyaW9cIikpXG4gICAgVUlbXCJcIlx1ZDgzZFx1ZGNmMVxcbjpGcm9udGVuZFwiXCJdXG4gICAgQXV0aEN0cmxbXCJcIlx1ZDgzZFx1ZGQwY1xcbjpBdXRoQ29udHJvbGxlclwiXCJdXG4gICAgQXV0aFN2Y1tcIlwiXHUyNjk5XHVmZTBmXFxuOkF1dGhTZXJ2aWNlXCJcIl1cbiAgICBUb2tlbkdlbltcIlwiXHVkODNkXHVkZDExXFxuOkpXVEdlbmVyYXRvclwiXCJdXG4gICAgUGFzc1ZhbGlkYXRvcltcIlwiXHVkODNkXHVkZDEyXFxuOlBhc3N3b3JkVmFsaWRhdG9yXCJcIl1cbiAgICBEQltcIihcIlx1ZDgzZFx1ZGNiZVxcbjpEYXRhYmFzZVwiKVwiXVxuXG4gICAgVXN1YXJpbyAtLT58MTogaW5ncmVzYUNyZWRlbmNpYWxlcygpfCBVSVxuICAgIFVJIC0tPnxcIjI6IGxvZ2luKFwiZW1haWwsIHBhc3NcIilcInwgQXV0aEN0cmxcbiAgICBBdXRoQ3RybCAtLT58MzogZ2V0VXNlckJ5RW1haWwoKXwgREJcbiAgICBEQiAtLT58NDogdXN1YXJpb3wgQXV0aEN0cmxcbiAgICBBdXRoQ3RybCAtLT58NTogY2hlY2tQYXNzd29yZCgpfCBQYXNzVmFsaWRhdG9yXG4gICAgUGFzc1ZhbGlkYXRvciAtLT58NjogW3NpIGNvcnJlY3RvXSBva3wgQXV0aEN0cmxcbiAgICBBdXRoQ3RybCAtLT58NzogdmVyaWZ5QWNjb3VudFN0YXR1cygpfCBBdXRoU3ZjXG4gICAgQXV0aFN2YyAtLT58ODogW3NpIGFjdGl2b10gb2t8IEF1dGhDdHJsXG4gICAgQXV0aEN0cmwgLS0+fFwiOTogZ2VuZXJhdGVUb2tlbnMoXCJ1c2VyXCIpXCJ8IFRva2VuR2VuXG4gICAgVG9rZW5HZW4gLS0+fFwiMTA6IGNyZWF0ZSBhY2Nlc3MoXCIxNW1pblwiKVwifCBUb2tlbkdlblxuICAgIFRva2VuR2VuIC0tPnxcIjExOiBjcmVhdGUgcmVmcmVzaChcIjdkXCIpXCJ8IFRva2VuR2VuXG4gICAgVG9rZW5HZW4gLS0+fDEyOiB7YWNjZXNzLCByZWZyZXNofXwgQXV0aEN0cmxcbiAgICBBdXRoQ3RybCAtLT58MTM6IFVQREFURSB1bHRpbW9faW5ncmVzb3wgREJcbiAgICBBdXRoQ3RybCAtLT58XCIxNDogMjAwIE9LKFwidG9rZW5zLCB1c2VyXCIpXCJ8IFVJXG4gICAgVUkgLS0+fDE1OiBzdG9yZVRva2VucygpfCBVSVxuICAgIFVJIC0tPnwxNjogcmVkaXJlY3REYXNoYm9hcmQoKXwgVXN1YXJpb1xuXG4gICAgUGFzc1ZhbGlkYXRvciAtLi0+fDZhOiBbaW5jb3JyZWN0b10gZXJyb3J8IEF1dGhDdHJsXG4gICAgQXV0aEN0cmwgLS4tPnwxNGE6IDQwMSBVbmF1dGhvcml6ZWR8IFVJXG4gICAgXG4gICAgQXV0aFN2YyAtLi0+fDhhOiBbc3VzcGVuZGlkb10gZXJyb3J8IEF1dGhDdHJsXG4gICAgQXV0aEN0cmwgLS4tPnwxNGI6IDQwMyBGb3JiaWRkZW58IFVJXG5cbiAgICBzdHlsZSBVc3VhcmlvIGZpbGw6I2UxZjVmZlxuICAgIHN0eWxlIFRva2VuR2VuIGZpbGw6I2ZmZjRlMVxuICAgIHN0eWxlIERCIGZpbGw6I2ZmZjRlMSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIFVzdWFyaW8oKFwiXHVkODNkXHVkYzY0XFxuOlVzdWFyaW9cIikpXG4gICAgVUlbXCJcIlx1ZDgzZFx1ZGNmMVxcbjpGcm9udGVuZFwiXCJdXG4gICAgQXV0aEN0cmxbXCJcIlx1ZDgzZFx1ZGQwY1xcbjpBdXRoQ29udHJvbGxlclwiXCJdXG4gICAgQXV0aFN2Y1tcIlwiXHUyNjk5XHVmZTBmXFxuOkF1dGhTZXJ2aWNlXCJcIl1cbiAgICBUb2tlbkdlbltcIlwiXHVkODNkXHVkZDExXFxuOkpXVEdlbmVyYXRvclwiXCJdXG4gICAgUGFzc1ZhbGlkYXRvcltcIlwiXHVkODNkXHVkZDEyXFxuOlBhc3N3b3JkVmFsaWRhdG9yXCJcIl1cbiAgICBEQltcIihcIlx1ZDgzZFx1ZGNiZVxcbjpEYXRhYmFzZVwiKVwiXVxuXG4gICAgVXN1YXJpbyAtLT58MTogaW5ncmVzYUNyZWRlbmNpYWxlcygpfCBVSVxuICAgIFVJIC0tPnxcIjI6IGxvZ2luKFwiZW1haWwsIHBhc3NcIilcInwgQXV0aEN0cmxcbiAgICBBdXRoQ3RybCAtLT58MzogZ2V0VXNlckJ5RW1haWwoKXwgREJcbiAgICBEQiAtLT58NDogdXN1YXJpb3wgQXV0aEN0cmxcbiAgICBBdXRoQ3RybCAtLT58NTogY2hlY2tQYXNzd29yZCgpfCBQYXNzVmFsaWRhdG9yXG4gICAgUGFzc1ZhbGlkYXRvciAtLT58NjogW3NpIGNvcnJlY3RvXSBva3wgQXV0aEN0cmxcbiAgICBBdXRoQ3RybCAtLT58NzogdmVyaWZ5QWNjb3VudFN0YXR1cygpfCBBdXRoU3ZjXG4gICAgQXV0aFN2YyAtLT58ODogW3NpIGFjdGl2b10gb2t8IEF1dGhDdHJsXG4gICAgQXV0aEN0cmwgLS0+fFwiOTogZ2VuZXJhdGVUb2tlbnMoXCJ1c2VyXCIpXCJ8IFRva2VuR2VuXG4gICAgVG9rZW5HZW4gLS0+fFwiMTA6IGNyZWF0ZSBhY2Nlc3MoXCIxNW1pblwiKVwifCBUb2tlbkdlblxuICAgIFRva2VuR2VuIC0tPnxcIjExOiBjcmVhdGUgcmVmcmVzaChcIjdkXCIpXCJ8IFRva2VuR2VuXG4gICAgVG9rZW5HZW4gLS0+fDEyOiB7YWNjZXNzLCByZWZyZXNofXwgQXV0aEN0cmxcbiAgICBBdXRoQ3RybCAtLT58MTM6IFVQREFURSB1bHRpbW9faW5ncmVzb3wgREJcbiAgICBBdXRoQ3RybCAtLT58XCIxNDogMjAwIE9LKFwidG9rZW5zLCB1c2VyXCIpXCJ8IFVJXG4gICAgVUkgLS0+fDE1OiBzdG9yZVRva2VucygpfCBVSVxuICAgIFVJIC0tPnwxNjogcmVkaXJlY3REYXNoYm9hcmQoKXwgVXN1YXJpb1xuXG4gICAgUGFzc1ZhbGlkYXRvciAtLi0+fDZhOiBbaW5jb3JyZWN0b10gZXJyb3J8IEF1dGhDdHJsXG4gICAgQXV0aEN0cmwgLS4tPnwxNGE6IDQwMSBVbmF1dGhvcml6ZWR8IFVJXG4gICAgXG4gICAgQXV0aFN2YyAtLi0+fDhhOiBbc3VzcGVuZGlkb10gZXJyb3J8IEF1dGhDdHJsXG4gICAgQXV0aEN0cmwgLS4tPnwxNGI6IDQwMyBGb3JiaWRkZW58IFVJXG5cbiAgICBzdHlsZSBVc3VhcmlvIGZpbGw6I2UxZjVmZlxuICAgIHN0eWxlIFRva2VuR2VuIGZpbGw6I2ZmZjRlMVxuICAgIHN0eWxlIERCIGZpbGw6I2ZmZjRlMSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TB
                        Usuario(("👤\n:Usuario"))
                        UI[""📱\n:Frontend""]
                        AuthCtrl[""🔌\n:AuthController""]
                        AuthSvc[""⚙️\n:AuthService""]
                        TokenGen[""🔑\n:JWTGenerator""]
                        PassValidator[""🔒\n:PasswordValidator""]
                        DB["("💾\n:Database")"]
                    
                        Usuario -->|1: ingresaCredenciales()| UI
                        UI -->|"2: login("email, pass")"| AuthCtrl
                        AuthCtrl -->|3: getUserByEmail()| DB
                        DB -->|4: usuario| AuthCtrl
                        AuthCtrl -->|5: checkPassword()| PassValidator
                        PassValidator -->|6: [si correcto] ok| AuthCtrl
                        AuthCtrl -->|7: verifyAccountStatus()| AuthSvc
                        AuthSvc -->|8: [si activo] ok| AuthCtrl
                        AuthCtrl -->|"9: generateTokens("user")"| TokenGen
                        TokenGen -->|"10: create access("15min")"| TokenGen
                        TokenGen -->|"11: create refresh("7d")"| TokenGen
                        TokenGen -->|12: {access, refresh}| AuthCtrl
                        AuthCtrl -->|13: UPDATE ultimo_ingreso| DB
                        AuthCtrl -->|"14: 200 OK("tokens, user")"| UI
                        UI -->|15: storeTokens()| UI
                        UI -->|16: redirectDashboard()| Usuario
                    
                        PassValidator -.->|6a: [incorrecto] error| AuthCtrl
                        AuthCtrl -.->|14a: 401 Unauthorized| UI
                        
                        AuthSvc -.->|8a: [suspendido] error| AuthCtrl
                        AuthCtrl -.->|14b: 403 Forbidden| UI
                    
                        style Usuario fill:#e1f5ff
                        style TokenGen fill:#fff4e1
                        style DB fill:#fff4e1


.. dropdown:: 📊 Diagrama Componentes Paquetes("7 diagramas")
    :open:
    :class-container: sd-mb-4

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TB
                        subgraph "Cliente("Navegador")"
                            UI["React UI"]
                            Router["React Router"]
                            State["State Management"]
                        end
                    
                        subgraph "API Gateway"
                            NGINX["NGINX Reverse Proxy"]
                        end
                    
                        subgraph "Backend Application Server"
                            DRF["Django REST Framework"]
                            Auth["Auth Service"]
                            Business["Business Logic"]
                            ORM["Django ORM"]
                        end
                    
                        subgraph "Task Queue"
                            Celery["Celery Workers"]
                            Beat["Celery Beat"]
                        end
                    
                        subgraph "Data Layer"
                            DB["(Database\nPostgreSQL/SQLite)"]
                            Redis[("Redis Cache")]
                            Media["Media Storage"]
                        end
                    
                        subgraph "External Services"
                            Email["Email Service\nSMTP"]
                            Payment["Payment Gateway\nPayU/PSE"]
                            SMS["SMS Service\nTwilio"]
                        end
                    
                        UI --> Router
                        UI --> State
                        Router --> NGINX
                        State --> NGINX
                    
                        NGINX --> DRF
                        DRF --> Auth
                        DRF --> Business
                        Business --> ORM
                        ORM --> DB
                    
                        DRF --> Redis
                        Business --> Celery
                        Celery --> Beat
                        Celery --> Redis
                    
                        Celery --> Email
                        Celery --> SMS
                        Business --> Payment
                        ORM --> Media

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiQ2xpZW50ZShcIk5hdmVnYWRvclwiKVwiXG4gICAgICAgIFVJW1wiUmVhY3QgVUlcIl1cbiAgICAgICAgUm91dGVyW1wiUmVhY3QgUm91dGVyXCJdXG4gICAgICAgIFN0YXRlW1wiU3RhdGUgTWFuYWdlbWVudFwiXVxuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggXCJBUEkgR2F0ZXdheVwiXG4gICAgICAgIE5HSU5YW1wiTkdJTlggUmV2ZXJzZSBQcm94eVwiXVxuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggXCJCYWNrZW5kIEFwcGxpY2F0aW9uIFNlcnZlclwiXG4gICAgICAgIERSRltcIkRqYW5nbyBSRVNUIEZyYW1ld29ya1wiXVxuICAgICAgICBBdXRoW1wiQXV0aCBTZXJ2aWNlXCJdXG4gICAgICAgIEJ1c2luZXNzW1wiQnVzaW5lc3MgTG9naWNcIl1cbiAgICAgICAgT1JNW1wiRGphbmdvIE9STVwiXVxuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggXCJUYXNrIFF1ZXVlXCJcbiAgICAgICAgQ2VsZXJ5W1wiQ2VsZXJ5IFdvcmtlcnNcIl1cbiAgICAgICAgQmVhdFtcIkNlbGVyeSBCZWF0XCJdXG4gICAgZW5kXG5cbiAgICBzdWJncmFwaCBcIkRhdGEgTGF5ZXJcIlxuICAgICAgICBEQltcIihEYXRhYmFzZVxcblBvc3RncmVTUUwvU1FMaXRlKVwiXVxuICAgICAgICBSZWRpc1soXCJSZWRpcyBDYWNoZVwiKV1cbiAgICAgICAgTWVkaWFbXCJNZWRpYSBTdG9yYWdlXCJdXG4gICAgZW5kXG5cbiAgICBzdWJncmFwaCBcIkV4dGVybmFsIFNlcnZpY2VzXCJcbiAgICAgICAgRW1haWxbXCJFbWFpbCBTZXJ2aWNlXFxuU01UUFwiXVxuICAgICAgICBQYXltZW50W1wiUGF5bWVudCBHYXRld2F5XFxuUGF5VS9QU0VcIl1cbiAgICAgICAgU01TW1wiU01TIFNlcnZpY2VcXG5Ud2lsaW9cIl1cbiAgICBlbmRcblxuICAgIFVJIC0tPiBSb3V0ZXJcbiAgICBVSSAtLT4gU3RhdGVcbiAgICBSb3V0ZXIgLS0+IE5HSU5YXG4gICAgU3RhdGUgLS0+IE5HSU5YXG5cbiAgICBOR0lOWCAtLT4gRFJGXG4gICAgRFJGIC0tPiBBdXRoXG4gICAgRFJGIC0tPiBCdXNpbmVzc1xuICAgIEJ1c2luZXNzIC0tPiBPUk1cbiAgICBPUk0gLS0+IERCXG5cbiAgICBEUkYgLS0+IFJlZGlzXG4gICAgQnVzaW5lc3MgLS0+IENlbGVyeVxuICAgIENlbGVyeSAtLT4gQmVhdFxuICAgIENlbGVyeSAtLT4gUmVkaXNcblxuICAgIENlbGVyeSAtLT4gRW1haWxcbiAgICBDZWxlcnkgLS0+IFNNU1xuICAgIEJ1c2luZXNzIC0tPiBQYXltZW50XG4gICAgT1JNIC0tPiBNZWRpYSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiQ2xpZW50ZShcIk5hdmVnYWRvclwiKVwiXG4gICAgICAgIFVJW1wiUmVhY3QgVUlcIl1cbiAgICAgICAgUm91dGVyW1wiUmVhY3QgUm91dGVyXCJdXG4gICAgICAgIFN0YXRlW1wiU3RhdGUgTWFuYWdlbWVudFwiXVxuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggXCJBUEkgR2F0ZXdheVwiXG4gICAgICAgIE5HSU5YW1wiTkdJTlggUmV2ZXJzZSBQcm94eVwiXVxuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggXCJCYWNrZW5kIEFwcGxpY2F0aW9uIFNlcnZlclwiXG4gICAgICAgIERSRltcIkRqYW5nbyBSRVNUIEZyYW1ld29ya1wiXVxuICAgICAgICBBdXRoW1wiQXV0aCBTZXJ2aWNlXCJdXG4gICAgICAgIEJ1c2luZXNzW1wiQnVzaW5lc3MgTG9naWNcIl1cbiAgICAgICAgT1JNW1wiRGphbmdvIE9STVwiXVxuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggXCJUYXNrIFF1ZXVlXCJcbiAgICAgICAgQ2VsZXJ5W1wiQ2VsZXJ5IFdvcmtlcnNcIl1cbiAgICAgICAgQmVhdFtcIkNlbGVyeSBCZWF0XCJdXG4gICAgZW5kXG5cbiAgICBzdWJncmFwaCBcIkRhdGEgTGF5ZXJcIlxuICAgICAgICBEQltcIihEYXRhYmFzZVxcblBvc3RncmVTUUwvU1FMaXRlKVwiXVxuICAgICAgICBSZWRpc1soXCJSZWRpcyBDYWNoZVwiKV1cbiAgICAgICAgTWVkaWFbXCJNZWRpYSBTdG9yYWdlXCJdXG4gICAgZW5kXG5cbiAgICBzdWJncmFwaCBcIkV4dGVybmFsIFNlcnZpY2VzXCJcbiAgICAgICAgRW1haWxbXCJFbWFpbCBTZXJ2aWNlXFxuU01UUFwiXVxuICAgICAgICBQYXltZW50W1wiUGF5bWVudCBHYXRld2F5XFxuUGF5VS9QU0VcIl1cbiAgICAgICAgU01TW1wiU01TIFNlcnZpY2VcXG5Ud2lsaW9cIl1cbiAgICBlbmRcblxuICAgIFVJIC0tPiBSb3V0ZXJcbiAgICBVSSAtLT4gU3RhdGVcbiAgICBSb3V0ZXIgLS0+IE5HSU5YXG4gICAgU3RhdGUgLS0+IE5HSU5YXG5cbiAgICBOR0lOWCAtLT4gRFJGXG4gICAgRFJGIC0tPiBBdXRoXG4gICAgRFJGIC0tPiBCdXNpbmVzc1xuICAgIEJ1c2luZXNzIC0tPiBPUk1cbiAgICBPUk0gLS0+IERCXG5cbiAgICBEUkYgLS0+IFJlZGlzXG4gICAgQnVzaW5lc3MgLS0+IENlbGVyeVxuICAgIENlbGVyeSAtLT4gQmVhdFxuICAgIENlbGVyeSAtLT4gUmVkaXNcblxuICAgIENlbGVyeSAtLT4gRW1haWxcbiAgICBDZWxlcnkgLS0+IFNNU1xuICAgIEJ1c2luZXNzIC0tPiBQYXltZW50XG4gICAgT1JNIC0tPiBNZWRpYSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TB
                        subgraph "Cliente("Navegador")"
                            UI["React UI"]
                            Router["React Router"]
                            State["State Management"]
                        end
                    
                        subgraph "API Gateway"
                            NGINX["NGINX Reverse Proxy"]
                        end
                    
                        subgraph "Backend Application Server"
                            DRF["Django REST Framework"]
                            Auth["Auth Service"]
                            Business["Business Logic"]
                            ORM["Django ORM"]
                        end
                    
                        subgraph "Task Queue"
                            Celery["Celery Workers"]
                            Beat["Celery Beat"]
                        end
                    
                        subgraph "Data Layer"
                            DB["(Database\nPostgreSQL/SQLite)"]
                            Redis[("Redis Cache")]
                            Media["Media Storage"]
                        end
                    
                        subgraph "External Services"
                            Email["Email Service\nSMTP"]
                            Payment["Payment Gateway\nPayU/PSE"]
                            SMS["SMS Service\nTwilio"]
                        end
                    
                        UI --> Router
                        UI --> State
                        Router --> NGINX
                        State --> NGINX
                    
                        NGINX --> DRF
                        DRF --> Auth
                        DRF --> Business
                        Business --> ORM
                        ORM --> DB
                    
                        DRF --> Redis
                        Business --> Celery
                        Celery --> Beat
                        Celery --> Redis
                    
                        Celery --> Email
                        Celery --> SMS
                        Business --> Payment
                        ORM --> Media

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    graph TD
                        subgraph "Frontend Components"
                            App["App.jsx"]
                            
                            subgraph "Pages"
                                Login["Login.jsx"]
                                Register["Register.jsx"]
                                Dashboard["Dashboard*.jsx"]
                                Catalog["ProductCatalog.jsx"]
                            end
                    
                            subgraph "Components"
                                Navbar["Navbar.jsx"]
                                Footer["Footer.jsx"]
                                ProductCard["ProductCard.jsx"]
                                OrderCard["OrderCard.jsx"]
                            end
                    
                            subgraph "Services"
                                API["api.js"]
                                Auth_Service["authService.js"]
                            end
                    
                            subgraph "Utils"
                                Constants["constants.js"]
                                Helpers["helpers.js"]
                            end
                    
                            subgraph "Styles"
                                CSS["*.css"]
                            end
                        end
                    
                        App --> Pages
                        App --> Components
                        Pages --> Components
                        Pages --> Services
                        Services --> API
                        Services --> Auth_Service
                        Components --> Utils
                        Pages --> Styles
                        Components --> Styles

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImdyYXBoIFREXG4gICAgc3ViZ3JhcGggXCJGcm9udGVuZCBDb21wb25lbnRzXCJcbiAgICAgICAgQXBwW1wiQXBwLmpzeFwiXVxuICAgICAgICBcbiAgICAgICAgc3ViZ3JhcGggXCJQYWdlc1wiXG4gICAgICAgICAgICBMb2dpbltcIkxvZ2luLmpzeFwiXVxuICAgICAgICAgICAgUmVnaXN0ZXJbXCJSZWdpc3Rlci5qc3hcIl1cbiAgICAgICAgICAgIERhc2hib2FyZFtcIkRhc2hib2FyZCouanN4XCJdXG4gICAgICAgICAgICBDYXRhbG9nW1wiUHJvZHVjdENhdGFsb2cuanN4XCJdXG4gICAgICAgIGVuZFxuXG4gICAgICAgIHN1YmdyYXBoIFwiQ29tcG9uZW50c1wiXG4gICAgICAgICAgICBOYXZiYXJbXCJOYXZiYXIuanN4XCJdXG4gICAgICAgICAgICBGb290ZXJbXCJGb290ZXIuanN4XCJdXG4gICAgICAgICAgICBQcm9kdWN0Q2FyZFtcIlByb2R1Y3RDYXJkLmpzeFwiXVxuICAgICAgICAgICAgT3JkZXJDYXJkW1wiT3JkZXJDYXJkLmpzeFwiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIlNlcnZpY2VzXCJcbiAgICAgICAgICAgIEFQSVtcImFwaS5qc1wiXVxuICAgICAgICAgICAgQXV0aF9TZXJ2aWNlW1wiYXV0aFNlcnZpY2UuanNcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJVdGlsc1wiXG4gICAgICAgICAgICBDb25zdGFudHNbXCJjb25zdGFudHMuanNcIl1cbiAgICAgICAgICAgIEhlbHBlcnNbXCJoZWxwZXJzLmpzXCJdXG4gICAgICAgIGVuZFxuXG4gICAgICAgIHN1YmdyYXBoIFwiU3R5bGVzXCJcbiAgICAgICAgICAgIENTU1tcIiouY3NzXCJdXG4gICAgICAgIGVuZFxuICAgIGVuZFxuXG4gICAgQXBwIC0tPiBQYWdlc1xuICAgIEFwcCAtLT4gQ29tcG9uZW50c1xuICAgIFBhZ2VzIC0tPiBDb21wb25lbnRzXG4gICAgUGFnZXMgLS0+IFNlcnZpY2VzXG4gICAgU2VydmljZXMgLS0+IEFQSVxuICAgIFNlcnZpY2VzIC0tPiBBdXRoX1NlcnZpY2VcbiAgICBDb21wb25lbnRzIC0tPiBVdGlsc1xuICAgIFBhZ2VzIC0tPiBTdHlsZXNcbiAgICBDb21wb25lbnRzIC0tPiBTdHlsZXMiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImdyYXBoIFREXG4gICAgc3ViZ3JhcGggXCJGcm9udGVuZCBDb21wb25lbnRzXCJcbiAgICAgICAgQXBwW1wiQXBwLmpzeFwiXVxuICAgICAgICBcbiAgICAgICAgc3ViZ3JhcGggXCJQYWdlc1wiXG4gICAgICAgICAgICBMb2dpbltcIkxvZ2luLmpzeFwiXVxuICAgICAgICAgICAgUmVnaXN0ZXJbXCJSZWdpc3Rlci5qc3hcIl1cbiAgICAgICAgICAgIERhc2hib2FyZFtcIkRhc2hib2FyZCouanN4XCJdXG4gICAgICAgICAgICBDYXRhbG9nW1wiUHJvZHVjdENhdGFsb2cuanN4XCJdXG4gICAgICAgIGVuZFxuXG4gICAgICAgIHN1YmdyYXBoIFwiQ29tcG9uZW50c1wiXG4gICAgICAgICAgICBOYXZiYXJbXCJOYXZiYXIuanN4XCJdXG4gICAgICAgICAgICBGb290ZXJbXCJGb290ZXIuanN4XCJdXG4gICAgICAgICAgICBQcm9kdWN0Q2FyZFtcIlByb2R1Y3RDYXJkLmpzeFwiXVxuICAgICAgICAgICAgT3JkZXJDYXJkW1wiT3JkZXJDYXJkLmpzeFwiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIlNlcnZpY2VzXCJcbiAgICAgICAgICAgIEFQSVtcImFwaS5qc1wiXVxuICAgICAgICAgICAgQXV0aF9TZXJ2aWNlW1wiYXV0aFNlcnZpY2UuanNcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJVdGlsc1wiXG4gICAgICAgICAgICBDb25zdGFudHNbXCJjb25zdGFudHMuanNcIl1cbiAgICAgICAgICAgIEhlbHBlcnNbXCJoZWxwZXJzLmpzXCJdXG4gICAgICAgIGVuZFxuXG4gICAgICAgIHN1YmdyYXBoIFwiU3R5bGVzXCJcbiAgICAgICAgICAgIENTU1tcIiouY3NzXCJdXG4gICAgICAgIGVuZFxuICAgIGVuZFxuXG4gICAgQXBwIC0tPiBQYWdlc1xuICAgIEFwcCAtLT4gQ29tcG9uZW50c1xuICAgIFBhZ2VzIC0tPiBDb21wb25lbnRzXG4gICAgUGFnZXMgLS0+IFNlcnZpY2VzXG4gICAgU2VydmljZXMgLS0+IEFQSVxuICAgIFNlcnZpY2VzIC0tPiBBdXRoX1NlcnZpY2VcbiAgICBDb21wb25lbnRzIC0tPiBVdGlsc1xuICAgIFBhZ2VzIC0tPiBTdHlsZXNcbiAgICBDb21wb25lbnRzIC0tPiBTdHlsZXMiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    graph TD
                        subgraph "Frontend Components"
                            App["App.jsx"]
                            
                            subgraph "Pages"
                                Login["Login.jsx"]
                                Register["Register.jsx"]
                                Dashboard["Dashboard*.jsx"]
                                Catalog["ProductCatalog.jsx"]
                            end
                    
                            subgraph "Components"
                                Navbar["Navbar.jsx"]
                                Footer["Footer.jsx"]
                                ProductCard["ProductCard.jsx"]
                                OrderCard["OrderCard.jsx"]
                            end
                    
                            subgraph "Services"
                                API["api.js"]
                                Auth_Service["authService.js"]
                            end
                    
                            subgraph "Utils"
                                Constants["constants.js"]
                                Helpers["helpers.js"]
                            end
                    
                            subgraph "Styles"
                                CSS["*.css"]
                            end
                        end
                    
                        App --> Pages
                        App --> Components
                        Pages --> Components
                        Pages --> Services
                        Services --> API
                        Services --> Auth_Service
                        Components --> Utils
                        Pages --> Styles
                        Components --> Styles

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    graph TD
                        subgraph "Backend Components"
                            Settings["settings.py"]
                            URLs["urls.py"]
                    
                            subgraph "Apps"
                                Usuarios["usuarios/"]
                                Productos["productos/"]
                                Ventas["ventas/"]
                                Pagos["pagos/"]
                                Notific["notificaciones/"]
                            end
                    
                            subgraph "Core"
                                Core_Views["core/views.py"]
                                Core_Utils["core/utils.py"]
                            end
                    
                            subgraph "Each App Structure"
                                Models["models.py"]
                                Views["views.py"]
                                Serializers["serializers.py"]
                                Tests["tests/"]
                            end
                        end
                    
                        Settings --> Apps
                        URLs --> Apps
                        Apps --> Models
                        Apps --> Views
                        Apps --> Serializers
                        Views --> Models
                        Views --> Serializers
                        Apps --> Core

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImdyYXBoIFREXG4gICAgc3ViZ3JhcGggXCJCYWNrZW5kIENvbXBvbmVudHNcIlxuICAgICAgICBTZXR0aW5nc1tcInNldHRpbmdzLnB5XCJdXG4gICAgICAgIFVSTHNbXCJ1cmxzLnB5XCJdXG5cbiAgICAgICAgc3ViZ3JhcGggXCJBcHBzXCJcbiAgICAgICAgICAgIFVzdWFyaW9zW1widXN1YXJpb3MvXCJdXG4gICAgICAgICAgICBQcm9kdWN0b3NbXCJwcm9kdWN0b3MvXCJdXG4gICAgICAgICAgICBWZW50YXNbXCJ2ZW50YXMvXCJdXG4gICAgICAgICAgICBQYWdvc1tcInBhZ29zL1wiXVxuICAgICAgICAgICAgTm90aWZpY1tcIm5vdGlmaWNhY2lvbmVzL1wiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIkNvcmVcIlxuICAgICAgICAgICAgQ29yZV9WaWV3c1tcImNvcmUvdmlld3MucHlcIl1cbiAgICAgICAgICAgIENvcmVfVXRpbHNbXCJjb3JlL3V0aWxzLnB5XCJdXG4gICAgICAgIGVuZFxuXG4gICAgICAgIHN1YmdyYXBoIFwiRWFjaCBBcHAgU3RydWN0dXJlXCJcbiAgICAgICAgICAgIE1vZGVsc1tcIm1vZGVscy5weVwiXVxuICAgICAgICAgICAgVmlld3NbXCJ2aWV3cy5weVwiXVxuICAgICAgICAgICAgU2VyaWFsaXplcnNbXCJzZXJpYWxpemVycy5weVwiXVxuICAgICAgICAgICAgVGVzdHNbXCJ0ZXN0cy9cIl1cbiAgICAgICAgZW5kXG4gICAgZW5kXG5cbiAgICBTZXR0aW5ncyAtLT4gQXBwc1xuICAgIFVSTHMgLS0+IEFwcHNcbiAgICBBcHBzIC0tPiBNb2RlbHNcbiAgICBBcHBzIC0tPiBWaWV3c1xuICAgIEFwcHMgLS0+IFNlcmlhbGl6ZXJzXG4gICAgVmlld3MgLS0+IE1vZGVsc1xuICAgIFZpZXdzIC0tPiBTZXJpYWxpemVyc1xuICAgIEFwcHMgLS0+IENvcmUiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImdyYXBoIFREXG4gICAgc3ViZ3JhcGggXCJCYWNrZW5kIENvbXBvbmVudHNcIlxuICAgICAgICBTZXR0aW5nc1tcInNldHRpbmdzLnB5XCJdXG4gICAgICAgIFVSTHNbXCJ1cmxzLnB5XCJdXG5cbiAgICAgICAgc3ViZ3JhcGggXCJBcHBzXCJcbiAgICAgICAgICAgIFVzdWFyaW9zW1widXN1YXJpb3MvXCJdXG4gICAgICAgICAgICBQcm9kdWN0b3NbXCJwcm9kdWN0b3MvXCJdXG4gICAgICAgICAgICBWZW50YXNbXCJ2ZW50YXMvXCJdXG4gICAgICAgICAgICBQYWdvc1tcInBhZ29zL1wiXVxuICAgICAgICAgICAgTm90aWZpY1tcIm5vdGlmaWNhY2lvbmVzL1wiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIkNvcmVcIlxuICAgICAgICAgICAgQ29yZV9WaWV3c1tcImNvcmUvdmlld3MucHlcIl1cbiAgICAgICAgICAgIENvcmVfVXRpbHNbXCJjb3JlL3V0aWxzLnB5XCJdXG4gICAgICAgIGVuZFxuXG4gICAgICAgIHN1YmdyYXBoIFwiRWFjaCBBcHAgU3RydWN0dXJlXCJcbiAgICAgICAgICAgIE1vZGVsc1tcIm1vZGVscy5weVwiXVxuICAgICAgICAgICAgVmlld3NbXCJ2aWV3cy5weVwiXVxuICAgICAgICAgICAgU2VyaWFsaXplcnNbXCJzZXJpYWxpemVycy5weVwiXVxuICAgICAgICAgICAgVGVzdHNbXCJ0ZXN0cy9cIl1cbiAgICAgICAgZW5kXG4gICAgZW5kXG5cbiAgICBTZXR0aW5ncyAtLT4gQXBwc1xuICAgIFVSTHMgLS0+IEFwcHNcbiAgICBBcHBzIC0tPiBNb2RlbHNcbiAgICBBcHBzIC0tPiBWaWV3c1xuICAgIEFwcHMgLS0+IFNlcmlhbGl6ZXJzXG4gICAgVmlld3MgLS0+IE1vZGVsc1xuICAgIFZpZXdzIC0tPiBTZXJpYWxpemVyc1xuICAgIEFwcHMgLS0+IENvcmUiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    graph TD
                        subgraph "Backend Components"
                            Settings["settings.py"]
                            URLs["urls.py"]
                    
                            subgraph "Apps"
                                Usuarios["usuarios/"]
                                Productos["productos/"]
                                Ventas["ventas/"]
                                Pagos["pagos/"]
                                Notific["notificaciones/"]
                            end
                    
                            subgraph "Core"
                                Core_Views["core/views.py"]
                                Core_Utils["core/utils.py"]
                            end
                    
                            subgraph "Each App Structure"
                                Models["models.py"]
                                Views["views.py"]
                                Serializers["serializers.py"]
                                Tests["tests/"]
                            end
                        end
                    
                        Settings --> Apps
                        URLs --> Apps
                        Apps --> Models
                        Apps --> Views
                        Apps --> Serializers
                        Views --> Models
                        Views --> Serializers
                        Apps --> Core

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TB
                        subgraph "Orden Management System"
                            subgraph "Order Controller"
                                API_Order["REST API Endpoint"]
                                Validator["Order Validator"]
                                Calculator["Price Calculator"]
                            end
                    
                            subgraph "Order Processing"
                                Creator["Order Creator"]
                                StateManager["State Manager"]
                                StockReducer["Stock Reducer"]
                            end
                    
                            subgraph "Notification System"
                                NotifService["Notification Service"]
                                EmailSender["Email Sender"]
                                SMSSender["SMS Sender"]
                            end
                    
                            subgraph "Payment Integration"
                                PaymentService["Payment Service"]
                                GatewayAdapter["Gateway Adapter"]
                            end
                        end
                    
                        API_Order --> Validator
                        Validator --> Calculator
                        Calculator --> Creator
                        Creator --> StockReducer
                        Creator --> StateManager
                        StateManager --> NotifService
                        NotifService --> EmailSender
                        NotifService --> SMSSender
                        Creator --> PaymentService
                        PaymentService --> GatewayAdapter

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiT3JkZW4gTWFuYWdlbWVudCBTeXN0ZW1cIlxuICAgICAgICBzdWJncmFwaCBcIk9yZGVyIENvbnRyb2xsZXJcIlxuICAgICAgICAgICAgQVBJX09yZGVyW1wiUkVTVCBBUEkgRW5kcG9pbnRcIl1cbiAgICAgICAgICAgIFZhbGlkYXRvcltcIk9yZGVyIFZhbGlkYXRvclwiXVxuICAgICAgICAgICAgQ2FsY3VsYXRvcltcIlByaWNlIENhbGN1bGF0b3JcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJPcmRlciBQcm9jZXNzaW5nXCJcbiAgICAgICAgICAgIENyZWF0b3JbXCJPcmRlciBDcmVhdG9yXCJdXG4gICAgICAgICAgICBTdGF0ZU1hbmFnZXJbXCJTdGF0ZSBNYW5hZ2VyXCJdXG4gICAgICAgICAgICBTdG9ja1JlZHVjZXJbXCJTdG9jayBSZWR1Y2VyXCJdXG4gICAgICAgIGVuZFxuXG4gICAgICAgIHN1YmdyYXBoIFwiTm90aWZpY2F0aW9uIFN5c3RlbVwiXG4gICAgICAgICAgICBOb3RpZlNlcnZpY2VbXCJOb3RpZmljYXRpb24gU2VydmljZVwiXVxuICAgICAgICAgICAgRW1haWxTZW5kZXJbXCJFbWFpbCBTZW5kZXJcIl1cbiAgICAgICAgICAgIFNNU1NlbmRlcltcIlNNUyBTZW5kZXJcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJQYXltZW50IEludGVncmF0aW9uXCJcbiAgICAgICAgICAgIFBheW1lbnRTZXJ2aWNlW1wiUGF5bWVudCBTZXJ2aWNlXCJdXG4gICAgICAgICAgICBHYXRld2F5QWRhcHRlcltcIkdhdGV3YXkgQWRhcHRlclwiXVxuICAgICAgICBlbmRcbiAgICBlbmRcblxuICAgIEFQSV9PcmRlciAtLT4gVmFsaWRhdG9yXG4gICAgVmFsaWRhdG9yIC0tPiBDYWxjdWxhdG9yXG4gICAgQ2FsY3VsYXRvciAtLT4gQ3JlYXRvclxuICAgIENyZWF0b3IgLS0+IFN0b2NrUmVkdWNlclxuICAgIENyZWF0b3IgLS0+IFN0YXRlTWFuYWdlclxuICAgIFN0YXRlTWFuYWdlciAtLT4gTm90aWZTZXJ2aWNlXG4gICAgTm90aWZTZXJ2aWNlIC0tPiBFbWFpbFNlbmRlclxuICAgIE5vdGlmU2VydmljZSAtLT4gU01TU2VuZGVyXG4gICAgQ3JlYXRvciAtLT4gUGF5bWVudFNlcnZpY2VcbiAgICBQYXltZW50U2VydmljZSAtLT4gR2F0ZXdheUFkYXB0ZXIiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiT3JkZW4gTWFuYWdlbWVudCBTeXN0ZW1cIlxuICAgICAgICBzdWJncmFwaCBcIk9yZGVyIENvbnRyb2xsZXJcIlxuICAgICAgICAgICAgQVBJX09yZGVyW1wiUkVTVCBBUEkgRW5kcG9pbnRcIl1cbiAgICAgICAgICAgIFZhbGlkYXRvcltcIk9yZGVyIFZhbGlkYXRvclwiXVxuICAgICAgICAgICAgQ2FsY3VsYXRvcltcIlByaWNlIENhbGN1bGF0b3JcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJPcmRlciBQcm9jZXNzaW5nXCJcbiAgICAgICAgICAgIENyZWF0b3JbXCJPcmRlciBDcmVhdG9yXCJdXG4gICAgICAgICAgICBTdGF0ZU1hbmFnZXJbXCJTdGF0ZSBNYW5hZ2VyXCJdXG4gICAgICAgICAgICBTdG9ja1JlZHVjZXJbXCJTdG9jayBSZWR1Y2VyXCJdXG4gICAgICAgIGVuZFxuXG4gICAgICAgIHN1YmdyYXBoIFwiTm90aWZpY2F0aW9uIFN5c3RlbVwiXG4gICAgICAgICAgICBOb3RpZlNlcnZpY2VbXCJOb3RpZmljYXRpb24gU2VydmljZVwiXVxuICAgICAgICAgICAgRW1haWxTZW5kZXJbXCJFbWFpbCBTZW5kZXJcIl1cbiAgICAgICAgICAgIFNNU1NlbmRlcltcIlNNUyBTZW5kZXJcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJQYXltZW50IEludGVncmF0aW9uXCJcbiAgICAgICAgICAgIFBheW1lbnRTZXJ2aWNlW1wiUGF5bWVudCBTZXJ2aWNlXCJdXG4gICAgICAgICAgICBHYXRld2F5QWRhcHRlcltcIkdhdGV3YXkgQWRhcHRlclwiXVxuICAgICAgICBlbmRcbiAgICBlbmRcblxuICAgIEFQSV9PcmRlciAtLT4gVmFsaWRhdG9yXG4gICAgVmFsaWRhdG9yIC0tPiBDYWxjdWxhdG9yXG4gICAgQ2FsY3VsYXRvciAtLT4gQ3JlYXRvclxuICAgIENyZWF0b3IgLS0+IFN0b2NrUmVkdWNlclxuICAgIENyZWF0b3IgLS0+IFN0YXRlTWFuYWdlclxuICAgIFN0YXRlTWFuYWdlciAtLT4gTm90aWZTZXJ2aWNlXG4gICAgTm90aWZTZXJ2aWNlIC0tPiBFbWFpbFNlbmRlclxuICAgIE5vdGlmU2VydmljZSAtLT4gU01TU2VuZGVyXG4gICAgQ3JlYXRvciAtLT4gUGF5bWVudFNlcnZpY2VcbiAgICBQYXltZW50U2VydmljZSAtLT4gR2F0ZXdheUFkYXB0ZXIiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TB
                        subgraph "Orden Management System"
                            subgraph "Order Controller"
                                API_Order["REST API Endpoint"]
                                Validator["Order Validator"]
                                Calculator["Price Calculator"]
                            end
                    
                            subgraph "Order Processing"
                                Creator["Order Creator"]
                                StateManager["State Manager"]
                                StockReducer["Stock Reducer"]
                            end
                    
                            subgraph "Notification System"
                                NotifService["Notification Service"]
                                EmailSender["Email Sender"]
                                SMSSender["SMS Sender"]
                            end
                    
                            subgraph "Payment Integration"
                                PaymentService["Payment Service"]
                                GatewayAdapter["Gateway Adapter"]
                            end
                        end
                    
                        API_Order --> Validator
                        Validator --> Calculator
                        Calculator --> Creator
                        Creator --> StockReducer
                        Creator --> StateManager
                        StateManager --> NotifService
                        NotifService --> EmailSender
                        NotifService --> SMSSender
                        Creator --> PaymentService
                        PaymentService --> GatewayAdapter

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TB
                        subgraph "Authentication System"
                            subgraph "Auth API"
                                Login["Login Endpoint"]
                                Register["Register Endpoint"]
                                Refresh["Refresh Token Endpoint"]
                                Reset["Password Reset Endpoint"]
                            end
                    
                            subgraph "Auth Services"
                                TokenGen["JWT Token Generator"]
                                PassValidator["Password Validator"]
                                HistoryCheck["Password History Checker"]
                            end
                    
                            subgraph "User Management"
                                UserRepo["User Repository"]
                                RoleManager["Role Manager"]
                                StateManager_Auth["Account State Manager"]
                            end
                        end
                    
                        Login --> TokenGen
                        Login --> PassValidator
                        Register --> PassValidator
                        Register --> HistoryCheck
                        PassValidator --> HistoryCheck
                        TokenGen --> UserRepo
                        Register --> RoleManager
                        Login --> StateManager_Auth
                        StateManager_Auth --> UserRepo
                        RoleManager --> UserRepo

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiQXV0aGVudGljYXRpb24gU3lzdGVtXCJcbiAgICAgICAgc3ViZ3JhcGggXCJBdXRoIEFQSVwiXG4gICAgICAgICAgICBMb2dpbltcIkxvZ2luIEVuZHBvaW50XCJdXG4gICAgICAgICAgICBSZWdpc3RlcltcIlJlZ2lzdGVyIEVuZHBvaW50XCJdXG4gICAgICAgICAgICBSZWZyZXNoW1wiUmVmcmVzaCBUb2tlbiBFbmRwb2ludFwiXVxuICAgICAgICAgICAgUmVzZXRbXCJQYXNzd29yZCBSZXNldCBFbmRwb2ludFwiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIkF1dGggU2VydmljZXNcIlxuICAgICAgICAgICAgVG9rZW5HZW5bXCJKV1QgVG9rZW4gR2VuZXJhdG9yXCJdXG4gICAgICAgICAgICBQYXNzVmFsaWRhdG9yW1wiUGFzc3dvcmQgVmFsaWRhdG9yXCJdXG4gICAgICAgICAgICBIaXN0b3J5Q2hlY2tbXCJQYXNzd29yZCBIaXN0b3J5IENoZWNrZXJcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJVc2VyIE1hbmFnZW1lbnRcIlxuICAgICAgICAgICAgVXNlclJlcG9bXCJVc2VyIFJlcG9zaXRvcnlcIl1cbiAgICAgICAgICAgIFJvbGVNYW5hZ2VyW1wiUm9sZSBNYW5hZ2VyXCJdXG4gICAgICAgICAgICBTdGF0ZU1hbmFnZXJfQXV0aFtcIkFjY291bnQgU3RhdGUgTWFuYWdlclwiXVxuICAgICAgICBlbmRcbiAgICBlbmRcblxuICAgIExvZ2luIC0tPiBUb2tlbkdlblxuICAgIExvZ2luIC0tPiBQYXNzVmFsaWRhdG9yXG4gICAgUmVnaXN0ZXIgLS0+IFBhc3NWYWxpZGF0b3JcbiAgICBSZWdpc3RlciAtLT4gSGlzdG9yeUNoZWNrXG4gICAgUGFzc1ZhbGlkYXRvciAtLT4gSGlzdG9yeUNoZWNrXG4gICAgVG9rZW5HZW4gLS0+IFVzZXJSZXBvXG4gICAgUmVnaXN0ZXIgLS0+IFJvbGVNYW5hZ2VyXG4gICAgTG9naW4gLS0+IFN0YXRlTWFuYWdlcl9BdXRoXG4gICAgU3RhdGVNYW5hZ2VyX0F1dGggLS0+IFVzZXJSZXBvXG4gICAgUm9sZU1hbmFnZXIgLS0+IFVzZXJSZXBvIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiQXV0aGVudGljYXRpb24gU3lzdGVtXCJcbiAgICAgICAgc3ViZ3JhcGggXCJBdXRoIEFQSVwiXG4gICAgICAgICAgICBMb2dpbltcIkxvZ2luIEVuZHBvaW50XCJdXG4gICAgICAgICAgICBSZWdpc3RlcltcIlJlZ2lzdGVyIEVuZHBvaW50XCJdXG4gICAgICAgICAgICBSZWZyZXNoW1wiUmVmcmVzaCBUb2tlbiBFbmRwb2ludFwiXVxuICAgICAgICAgICAgUmVzZXRbXCJQYXNzd29yZCBSZXNldCBFbmRwb2ludFwiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIkF1dGggU2VydmljZXNcIlxuICAgICAgICAgICAgVG9rZW5HZW5bXCJKV1QgVG9rZW4gR2VuZXJhdG9yXCJdXG4gICAgICAgICAgICBQYXNzVmFsaWRhdG9yW1wiUGFzc3dvcmQgVmFsaWRhdG9yXCJdXG4gICAgICAgICAgICBIaXN0b3J5Q2hlY2tbXCJQYXNzd29yZCBIaXN0b3J5IENoZWNrZXJcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJVc2VyIE1hbmFnZW1lbnRcIlxuICAgICAgICAgICAgVXNlclJlcG9bXCJVc2VyIFJlcG9zaXRvcnlcIl1cbiAgICAgICAgICAgIFJvbGVNYW5hZ2VyW1wiUm9sZSBNYW5hZ2VyXCJdXG4gICAgICAgICAgICBTdGF0ZU1hbmFnZXJfQXV0aFtcIkFjY291bnQgU3RhdGUgTWFuYWdlclwiXVxuICAgICAgICBlbmRcbiAgICBlbmRcblxuICAgIExvZ2luIC0tPiBUb2tlbkdlblxuICAgIExvZ2luIC0tPiBQYXNzVmFsaWRhdG9yXG4gICAgUmVnaXN0ZXIgLS0+IFBhc3NWYWxpZGF0b3JcbiAgICBSZWdpc3RlciAtLT4gSGlzdG9yeUNoZWNrXG4gICAgUGFzc1ZhbGlkYXRvciAtLT4gSGlzdG9yeUNoZWNrXG4gICAgVG9rZW5HZW4gLS0+IFVzZXJSZXBvXG4gICAgUmVnaXN0ZXIgLS0+IFJvbGVNYW5hZ2VyXG4gICAgTG9naW4gLS0+IFN0YXRlTWFuYWdlcl9BdXRoXG4gICAgU3RhdGVNYW5hZ2VyX0F1dGggLS0+IFVzZXJSZXBvXG4gICAgUm9sZU1hbmFnZXIgLS0+IFVzZXJSZXBvIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TB
                        subgraph "Authentication System"
                            subgraph "Auth API"
                                Login["Login Endpoint"]
                                Register["Register Endpoint"]
                                Refresh["Refresh Token Endpoint"]
                                Reset["Password Reset Endpoint"]
                            end
                    
                            subgraph "Auth Services"
                                TokenGen["JWT Token Generator"]
                                PassValidator["Password Validator"]
                                HistoryCheck["Password History Checker"]
                            end
                    
                            subgraph "User Management"
                                UserRepo["User Repository"]
                                RoleManager["Role Manager"]
                                StateManager_Auth["Account State Manager"]
                            end
                        end
                    
                        Login --> TokenGen
                        Login --> PassValidator
                        Register --> PassValidator
                        Register --> HistoryCheck
                        PassValidator --> HistoryCheck
                        TokenGen --> UserRepo
                        Register --> RoleManager
                        Login --> StateManager_Auth
                        StateManager_Auth --> UserRepo
                        RoleManager --> UserRepo

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TB
                        subgraph "Stock Management System"
                            subgraph "Stock API"
                                Get["Get Stock Endpoint"]
                                Update["Update Stock Endpoint"]
                                Config["Configure Auto-Recharge"]
                            end
                    
                            subgraph "Stock Services"
                                Monitor["Stock Monitor"]
                                AutoRecharge["Auto Recharge Service"]
                                HistoryLogger["History Logger"]
                            end
                    
                            subgraph "Stock Repository"
                                ProductRepo["Product Repository"]
                                ConfigRepo["Stock Config Repository"]
                                HistoryRepo["Recharge History Repository"]
                            end
                    
                            subgraph "Notification Integration"
                                LowStockNotif["Low Stock Notifier"]
                            end
                        end
                    
                        Get --> ProductRepo
                        Update --> HistoryLogger
                        Update --> ProductRepo
                        Config --> ConfigRepo
                        Monitor --> ConfigRepo
                        Monitor --> ProductRepo
                        Monitor --> AutoRecharge
                        AutoRecharge --> ProductRepo
                        AutoRecharge --> HistoryLogger
                        AutoRecharge --> LowStockNotif
                        HistoryLogger --> HistoryRepo

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiU3RvY2sgTWFuYWdlbWVudCBTeXN0ZW1cIlxuICAgICAgICBzdWJncmFwaCBcIlN0b2NrIEFQSVwiXG4gICAgICAgICAgICBHZXRbXCJHZXQgU3RvY2sgRW5kcG9pbnRcIl1cbiAgICAgICAgICAgIFVwZGF0ZVtcIlVwZGF0ZSBTdG9jayBFbmRwb2ludFwiXVxuICAgICAgICAgICAgQ29uZmlnW1wiQ29uZmlndXJlIEF1dG8tUmVjaGFyZ2VcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJTdG9jayBTZXJ2aWNlc1wiXG4gICAgICAgICAgICBNb25pdG9yW1wiU3RvY2sgTW9uaXRvclwiXVxuICAgICAgICAgICAgQXV0b1JlY2hhcmdlW1wiQXV0byBSZWNoYXJnZSBTZXJ2aWNlXCJdXG4gICAgICAgICAgICBIaXN0b3J5TG9nZ2VyW1wiSGlzdG9yeSBMb2dnZXJcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJTdG9jayBSZXBvc2l0b3J5XCJcbiAgICAgICAgICAgIFByb2R1Y3RSZXBvW1wiUHJvZHVjdCBSZXBvc2l0b3J5XCJdXG4gICAgICAgICAgICBDb25maWdSZXBvW1wiU3RvY2sgQ29uZmlnIFJlcG9zaXRvcnlcIl1cbiAgICAgICAgICAgIEhpc3RvcnlSZXBvW1wiUmVjaGFyZ2UgSGlzdG9yeSBSZXBvc2l0b3J5XCJdXG4gICAgICAgIGVuZFxuXG4gICAgICAgIHN1YmdyYXBoIFwiTm90aWZpY2F0aW9uIEludGVncmF0aW9uXCJcbiAgICAgICAgICAgIExvd1N0b2NrTm90aWZbXCJMb3cgU3RvY2sgTm90aWZpZXJcIl1cbiAgICAgICAgZW5kXG4gICAgZW5kXG5cbiAgICBHZXQgLS0+IFByb2R1Y3RSZXBvXG4gICAgVXBkYXRlIC0tPiBIaXN0b3J5TG9nZ2VyXG4gICAgVXBkYXRlIC0tPiBQcm9kdWN0UmVwb1xuICAgIENvbmZpZyAtLT4gQ29uZmlnUmVwb1xuICAgIE1vbml0b3IgLS0+IENvbmZpZ1JlcG9cbiAgICBNb25pdG9yIC0tPiBQcm9kdWN0UmVwb1xuICAgIE1vbml0b3IgLS0+IEF1dG9SZWNoYXJnZVxuICAgIEF1dG9SZWNoYXJnZSAtLT4gUHJvZHVjdFJlcG9cbiAgICBBdXRvUmVjaGFyZ2UgLS0+IEhpc3RvcnlMb2dnZXJcbiAgICBBdXRvUmVjaGFyZ2UgLS0+IExvd1N0b2NrTm90aWZcbiAgICBIaXN0b3J5TG9nZ2VyIC0tPiBIaXN0b3J5UmVwbyIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiU3RvY2sgTWFuYWdlbWVudCBTeXN0ZW1cIlxuICAgICAgICBzdWJncmFwaCBcIlN0b2NrIEFQSVwiXG4gICAgICAgICAgICBHZXRbXCJHZXQgU3RvY2sgRW5kcG9pbnRcIl1cbiAgICAgICAgICAgIFVwZGF0ZVtcIlVwZGF0ZSBTdG9jayBFbmRwb2ludFwiXVxuICAgICAgICAgICAgQ29uZmlnW1wiQ29uZmlndXJlIEF1dG8tUmVjaGFyZ2VcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJTdG9jayBTZXJ2aWNlc1wiXG4gICAgICAgICAgICBNb25pdG9yW1wiU3RvY2sgTW9uaXRvclwiXVxuICAgICAgICAgICAgQXV0b1JlY2hhcmdlW1wiQXV0byBSZWNoYXJnZSBTZXJ2aWNlXCJdXG4gICAgICAgICAgICBIaXN0b3J5TG9nZ2VyW1wiSGlzdG9yeSBMb2dnZXJcIl1cbiAgICAgICAgZW5kXG5cbiAgICAgICAgc3ViZ3JhcGggXCJTdG9jayBSZXBvc2l0b3J5XCJcbiAgICAgICAgICAgIFByb2R1Y3RSZXBvW1wiUHJvZHVjdCBSZXBvc2l0b3J5XCJdXG4gICAgICAgICAgICBDb25maWdSZXBvW1wiU3RvY2sgQ29uZmlnIFJlcG9zaXRvcnlcIl1cbiAgICAgICAgICAgIEhpc3RvcnlSZXBvW1wiUmVjaGFyZ2UgSGlzdG9yeSBSZXBvc2l0b3J5XCJdXG4gICAgICAgIGVuZFxuXG4gICAgICAgIHN1YmdyYXBoIFwiTm90aWZpY2F0aW9uIEludGVncmF0aW9uXCJcbiAgICAgICAgICAgIExvd1N0b2NrTm90aWZbXCJMb3cgU3RvY2sgTm90aWZpZXJcIl1cbiAgICAgICAgZW5kXG4gICAgZW5kXG5cbiAgICBHZXQgLS0+IFByb2R1Y3RSZXBvXG4gICAgVXBkYXRlIC0tPiBIaXN0b3J5TG9nZ2VyXG4gICAgVXBkYXRlIC0tPiBQcm9kdWN0UmVwb1xuICAgIENvbmZpZyAtLT4gQ29uZmlnUmVwb1xuICAgIE1vbml0b3IgLS0+IENvbmZpZ1JlcG9cbiAgICBNb25pdG9yIC0tPiBQcm9kdWN0UmVwb1xuICAgIE1vbml0b3IgLS0+IEF1dG9SZWNoYXJnZVxuICAgIEF1dG9SZWNoYXJnZSAtLT4gUHJvZHVjdFJlcG9cbiAgICBBdXRvUmVjaGFyZ2UgLS0+IEhpc3RvcnlMb2dnZXJcbiAgICBBdXRvUmVjaGFyZ2UgLS0+IExvd1N0b2NrTm90aWZcbiAgICBIaXN0b3J5TG9nZ2VyIC0tPiBIaXN0b3J5UmVwbyIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TB
                        subgraph "Stock Management System"
                            subgraph "Stock API"
                                Get["Get Stock Endpoint"]
                                Update["Update Stock Endpoint"]
                                Config["Configure Auto-Recharge"]
                            end
                    
                            subgraph "Stock Services"
                                Monitor["Stock Monitor"]
                                AutoRecharge["Auto Recharge Service"]
                                HistoryLogger["History Logger"]
                            end
                    
                            subgraph "Stock Repository"
                                ProductRepo["Product Repository"]
                                ConfigRepo["Stock Config Repository"]
                                HistoryRepo["Recharge History Repository"]
                            end
                    
                            subgraph "Notification Integration"
                                LowStockNotif["Low Stock Notifier"]
                            end
                        end
                    
                        Get --> ProductRepo
                        Update --> HistoryLogger
                        Update --> ProductRepo
                        Config --> ConfigRepo
                        Monitor --> ConfigRepo
                        Monitor --> ProductRepo
                        Monitor --> AutoRecharge
                        AutoRecharge --> ProductRepo
                        AutoRecharge --> HistoryLogger
                        AutoRecharge --> LowStockNotif
                        HistoryLogger --> HistoryRepo

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart LR
                        Frontend -->|HTTP/REST| Backend
                        Backend -->|SQL| Database
                        Backend -->|Cache| Redis
                        Backend -->|Tasks| Celery
                        Celery -->|Queue| Redis
                        Celery -->|Email| SMTP
                        Backend -->|HTTP| PaymentGateway
                        
                        subgraph "Backend Apps Dependencies"
                            Ventas -->|imports| Productos
                            Ventas -->|imports| Usuarios
                            Pagos -->|imports| Productos
                            Pagos -->|imports| Usuarios
                            Notificaciones -->|imports| Usuarios
                        end

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIEZyb250ZW5kIC0tPnxIVFRQL1JFU1R8IEJhY2tlbmRcbiAgICBCYWNrZW5kIC0tPnxTUUx8IERhdGFiYXNlXG4gICAgQmFja2VuZCAtLT58Q2FjaGV8IFJlZGlzXG4gICAgQmFja2VuZCAtLT58VGFza3N8IENlbGVyeVxuICAgIENlbGVyeSAtLT58UXVldWV8IFJlZGlzXG4gICAgQ2VsZXJ5IC0tPnxFbWFpbHwgU01UUFxuICAgIEJhY2tlbmQgLS0+fEhUVFB8IFBheW1lbnRHYXRld2F5XG4gICAgXG4gICAgc3ViZ3JhcGggXCJCYWNrZW5kIEFwcHMgRGVwZW5kZW5jaWVzXCJcbiAgICAgICAgVmVudGFzIC0tPnxpbXBvcnRzfCBQcm9kdWN0b3NcbiAgICAgICAgVmVudGFzIC0tPnxpbXBvcnRzfCBVc3Vhcmlvc1xuICAgICAgICBQYWdvcyAtLT58aW1wb3J0c3wgUHJvZHVjdG9zXG4gICAgICAgIFBhZ29zIC0tPnxpbXBvcnRzfCBVc3Vhcmlvc1xuICAgICAgICBOb3RpZmljYWNpb25lcyAtLT58aW1wb3J0c3wgVXN1YXJpb3NcbiAgICBlbmQiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIEZyb250ZW5kIC0tPnxIVFRQL1JFU1R8IEJhY2tlbmRcbiAgICBCYWNrZW5kIC0tPnxTUUx8IERhdGFiYXNlXG4gICAgQmFja2VuZCAtLT58Q2FjaGV8IFJlZGlzXG4gICAgQmFja2VuZCAtLT58VGFza3N8IENlbGVyeVxuICAgIENlbGVyeSAtLT58UXVldWV8IFJlZGlzXG4gICAgQ2VsZXJ5IC0tPnxFbWFpbHwgU01UUFxuICAgIEJhY2tlbmQgLS0+fEhUVFB8IFBheW1lbnRHYXRld2F5XG4gICAgXG4gICAgc3ViZ3JhcGggXCJCYWNrZW5kIEFwcHMgRGVwZW5kZW5jaWVzXCJcbiAgICAgICAgVmVudGFzIC0tPnxpbXBvcnRzfCBQcm9kdWN0b3NcbiAgICAgICAgVmVudGFzIC0tPnxpbXBvcnRzfCBVc3Vhcmlvc1xuICAgICAgICBQYWdvcyAtLT58aW1wb3J0c3wgUHJvZHVjdG9zXG4gICAgICAgIFBhZ29zIC0tPnxpbXBvcnRzfCBVc3Vhcmlvc1xuICAgICAgICBOb3RpZmljYWNpb25lcyAtLT58aW1wb3J0c3wgVXN1YXJpb3NcbiAgICBlbmQiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart LR
                        Frontend -->|HTTP/REST| Backend
                        Backend -->|SQL| Database
                        Backend -->|Cache| Redis
                        Backend -->|Tasks| Celery
                        Celery -->|Queue| Redis
                        Celery -->|Email| SMTP
                        Backend -->|HTTP| PaymentGateway
                        
                        subgraph "Backend Apps Dependencies"
                            Ventas -->|imports| Productos
                            Ventas -->|imports| Usuarios
                            Pagos -->|imports| Productos
                            Pagos -->|imports| Usuarios
                            Notificaciones -->|imports| Usuarios
                        end


.. dropdown:: 📊 Diagrama Despliegue("3 diagramas")
    :open:
    :class-container: sd-mb-4

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TB
                        subgraph "Developer Workstation("localhost")"
                            subgraph "Frontend - Port 5175"
                                Vite["Vite Dev Server"]
                                React["React App"]
                            end
                    
                            subgraph "Backend - Port 8000"
                                Django["Django Dev Server"]
                                DRF["Django REST Framework"]
                            end
                    
                            subgraph "Database"
                                SQLite["(SQLite DB\ndb.sqlite3)"]
                            end
                    
                            subgraph "Task Queue - Port 6379"
                                Redis_Local["(Redis\nlocalhost)"]
                                Celery_Worker["Celery Worker"]
                                Celery_Beat["Celery Beat"]
                            end
                    
                            subgraph "Media Files"
                                Media_Local["/media/\nLocal Storage"]
                            end
                        end
                    
                        subgraph "Development Tools"
                            Git["Git"]
                            VSCode["VS Code"]
                            Browser["Browser DevTools"]
                        end
                    
                        React --> Vite
                        Vite -->|proxy :8000| Django
                        Django --> DRF
                        DRF --> SQLite
                        Django --> Media_Local
                        Django --> Celery_Worker
                        Celery_Worker --> Redis_Local
                        Celery_Beat --> Redis_Local
                        
                        Git --> VSCode
                        Browser --> Vite

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiRGV2ZWxvcGVyIFdvcmtzdGF0aW9uKFwibG9jYWxob3N0XCIpXCJcbiAgICAgICAgc3ViZ3JhcGggXCJGcm9udGVuZCAtIFBvcnQgNTE3NVwiXG4gICAgICAgICAgICBWaXRlW1wiVml0ZSBEZXYgU2VydmVyXCJdXG4gICAgICAgICAgICBSZWFjdFtcIlJlYWN0IEFwcFwiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIkJhY2tlbmQgLSBQb3J0IDgwMDBcIlxuICAgICAgICAgICAgRGphbmdvW1wiRGphbmdvIERldiBTZXJ2ZXJcIl1cbiAgICAgICAgICAgIERSRltcIkRqYW5nbyBSRVNUIEZyYW1ld29ya1wiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIkRhdGFiYXNlXCJcbiAgICAgICAgICAgIFNRTGl0ZVtcIihTUUxpdGUgREJcXG5kYi5zcWxpdGUzKVwiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIlRhc2sgUXVldWUgLSBQb3J0IDYzNzlcIlxuICAgICAgICAgICAgUmVkaXNfTG9jYWxbXCIoUmVkaXNcXG5sb2NhbGhvc3QpXCJdXG4gICAgICAgICAgICBDZWxlcnlfV29ya2VyW1wiQ2VsZXJ5IFdvcmtlclwiXVxuICAgICAgICAgICAgQ2VsZXJ5X0JlYXRbXCJDZWxlcnkgQmVhdFwiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIk1lZGlhIEZpbGVzXCJcbiAgICAgICAgICAgIE1lZGlhX0xvY2FsW1wiL21lZGlhL1xcbkxvY2FsIFN0b3JhZ2VcIl1cbiAgICAgICAgZW5kXG4gICAgZW5kXG5cbiAgICBzdWJncmFwaCBcIkRldmVsb3BtZW50IFRvb2xzXCJcbiAgICAgICAgR2l0W1wiR2l0XCJdXG4gICAgICAgIFZTQ29kZVtcIlZTIENvZGVcIl1cbiAgICAgICAgQnJvd3NlcltcIkJyb3dzZXIgRGV2VG9vbHNcIl1cbiAgICBlbmRcblxuICAgIFJlYWN0IC0tPiBWaXRlXG4gICAgVml0ZSAtLT58cHJveHkgOjgwMDB8IERqYW5nb1xuICAgIERqYW5nbyAtLT4gRFJGXG4gICAgRFJGIC0tPiBTUUxpdGVcbiAgICBEamFuZ28gLS0+IE1lZGlhX0xvY2FsXG4gICAgRGphbmdvIC0tPiBDZWxlcnlfV29ya2VyXG4gICAgQ2VsZXJ5X1dvcmtlciAtLT4gUmVkaXNfTG9jYWxcbiAgICBDZWxlcnlfQmVhdCAtLT4gUmVkaXNfTG9jYWxcbiAgICBcbiAgICBHaXQgLS0+IFZTQ29kZVxuICAgIEJyb3dzZXIgLS0+IFZpdGUiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiRGV2ZWxvcGVyIFdvcmtzdGF0aW9uKFwibG9jYWxob3N0XCIpXCJcbiAgICAgICAgc3ViZ3JhcGggXCJGcm9udGVuZCAtIFBvcnQgNTE3NVwiXG4gICAgICAgICAgICBWaXRlW1wiVml0ZSBEZXYgU2VydmVyXCJdXG4gICAgICAgICAgICBSZWFjdFtcIlJlYWN0IEFwcFwiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIkJhY2tlbmQgLSBQb3J0IDgwMDBcIlxuICAgICAgICAgICAgRGphbmdvW1wiRGphbmdvIERldiBTZXJ2ZXJcIl1cbiAgICAgICAgICAgIERSRltcIkRqYW5nbyBSRVNUIEZyYW1ld29ya1wiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIkRhdGFiYXNlXCJcbiAgICAgICAgICAgIFNRTGl0ZVtcIihTUUxpdGUgREJcXG5kYi5zcWxpdGUzKVwiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIlRhc2sgUXVldWUgLSBQb3J0IDYzNzlcIlxuICAgICAgICAgICAgUmVkaXNfTG9jYWxbXCIoUmVkaXNcXG5sb2NhbGhvc3QpXCJdXG4gICAgICAgICAgICBDZWxlcnlfV29ya2VyW1wiQ2VsZXJ5IFdvcmtlclwiXVxuICAgICAgICAgICAgQ2VsZXJ5X0JlYXRbXCJDZWxlcnkgQmVhdFwiXVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIk1lZGlhIEZpbGVzXCJcbiAgICAgICAgICAgIE1lZGlhX0xvY2FsW1wiL21lZGlhL1xcbkxvY2FsIFN0b3JhZ2VcIl1cbiAgICAgICAgZW5kXG4gICAgZW5kXG5cbiAgICBzdWJncmFwaCBcIkRldmVsb3BtZW50IFRvb2xzXCJcbiAgICAgICAgR2l0W1wiR2l0XCJdXG4gICAgICAgIFZTQ29kZVtcIlZTIENvZGVcIl1cbiAgICAgICAgQnJvd3NlcltcIkJyb3dzZXIgRGV2VG9vbHNcIl1cbiAgICBlbmRcblxuICAgIFJlYWN0IC0tPiBWaXRlXG4gICAgVml0ZSAtLT58cHJveHkgOjgwMDB8IERqYW5nb1xuICAgIERqYW5nbyAtLT4gRFJGXG4gICAgRFJGIC0tPiBTUUxpdGVcbiAgICBEamFuZ28gLS0+IE1lZGlhX0xvY2FsXG4gICAgRGphbmdvIC0tPiBDZWxlcnlfV29ya2VyXG4gICAgQ2VsZXJ5X1dvcmtlciAtLT4gUmVkaXNfTG9jYWxcbiAgICBDZWxlcnlfQmVhdCAtLT4gUmVkaXNfTG9jYWxcbiAgICBcbiAgICBHaXQgLS0+IFZTQ29kZVxuICAgIEJyb3dzZXIgLS0+IFZpdGUiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TB
                        subgraph "Developer Workstation("localhost")"
                            subgraph "Frontend - Port 5175"
                                Vite["Vite Dev Server"]
                                React["React App"]
                            end
                    
                            subgraph "Backend - Port 8000"
                                Django["Django Dev Server"]
                                DRF["Django REST Framework"]
                            end
                    
                            subgraph "Database"
                                SQLite["(SQLite DB\ndb.sqlite3)"]
                            end
                    
                            subgraph "Task Queue - Port 6379"
                                Redis_Local["(Redis\nlocalhost)"]
                                Celery_Worker["Celery Worker"]
                                Celery_Beat["Celery Beat"]
                            end
                    
                            subgraph "Media Files"
                                Media_Local["/media/\nLocal Storage"]
                            end
                        end
                    
                        subgraph "Development Tools"
                            Git["Git"]
                            VSCode["VS Code"]
                            Browser["Browser DevTools"]
                        end
                    
                        React --> Vite
                        Vite -->|proxy :8000| Django
                        Django --> DRF
                        DRF --> SQLite
                        Django --> Media_Local
                        Django --> Celery_Worker
                        Celery_Worker --> Redis_Local
                        Celery_Beat --> Redis_Local
                        
                        Git --> VSCode
                        Browser --> Vite

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart LR
                        subgraph "User Devices"
                            Desktop["💻 Desktop Browser"]
                            Mobile["📱 Mobile Browser"]
                        end
                    
                        subgraph "CDN Layer"
                            CF["Cloudflare CDN"]
                        end
                    
                        subgraph "Frontend Hosting("Netlify")"
                            Build["Build Process"]
                            Static["Static Assets"]
                            Edge["Edge Functions"]
                        end
                    
                        subgraph "Backend Hosting("Railway/Render")"
                            LB["Load Balancer"]
                            
                            subgraph "Application Servers"
                                App1["Django Instance 1"]
                                App2["Django Instance 2"]
                            end
                    
                            Static_Backend["Static Files Server"]
                        end
                    
                        subgraph "Database Layer"
                            PG[("PostgreSQL")]
                            PG_Backup[("Automated Backups")]
                        end
                    
                        subgraph "Cache & Queue"
                            Redis_Prod[("Redis Cloud")]
                        end
                    
                        subgraph "Worker Layer"
                            Worker1["Celery Worker 1"]
                            Worker2["Celery Worker 2"]
                            Beat["Celery Beat"]
                        end
                    
                        subgraph "External Services"
                            SMTP["SendGrid"]
                            Gateway["Payment Gateway"]
                            Monitoring["Sentry"]
                            S3["AWS S3 / Media"]
                        end
                    
                        %% Connections
                        Desktop --> CF
                        Mobile --> CF
                        
                        CF --> Static
                        CF --> LB
                        
                        Static --> Build
                        
                        LB --> App1
                        LB --> App2
                        
                        %% App Connections
                        App1 --> PG
                        App2 --> PG
                        App1 --> Redis_Prod
                        App2 --> Redis_Prod
                        
                        App1 --> S3
                        App2 --> S3
                        
                        App1 --> Gateway
                        App2 --> Gateway
                        App1 --> Monitoring
                        App2 --> Monitoring
                    
                        %% Database
                        PG --> PG_Backup
                        
                        %% Workers
                        Beat --> Redis_Prod
                        Worker1 --> Redis_Prod
                        Worker2 --> Redis_Prod
                        
                        Worker1 --> SMTP
                        Worker2 --> SMTP
                        Worker1 --> Monitoring
                        Worker2 --> Monitoring

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIHN1YmdyYXBoIFwiVXNlciBEZXZpY2VzXCJcbiAgICAgICAgRGVza3RvcFtcIlx1ZDgzZFx1ZGNiYiBEZXNrdG9wIEJyb3dzZXJcIl1cbiAgICAgICAgTW9iaWxlW1wiXHVkODNkXHVkY2YxIE1vYmlsZSBCcm93c2VyXCJdXG4gICAgZW5kXG5cbiAgICBzdWJncmFwaCBcIkNETiBMYXllclwiXG4gICAgICAgIENGW1wiQ2xvdWRmbGFyZSBDRE5cIl1cbiAgICBlbmRcblxuICAgIHN1YmdyYXBoIFwiRnJvbnRlbmQgSG9zdGluZyhcIk5ldGxpZnlcIilcIlxuICAgICAgICBCdWlsZFtcIkJ1aWxkIFByb2Nlc3NcIl1cbiAgICAgICAgU3RhdGljW1wiU3RhdGljIEFzc2V0c1wiXVxuICAgICAgICBFZGdlW1wiRWRnZSBGdW5jdGlvbnNcIl1cbiAgICBlbmRcblxuICAgIHN1YmdyYXBoIFwiQmFja2VuZCBIb3N0aW5nKFwiUmFpbHdheS9SZW5kZXJcIilcIlxuICAgICAgICBMQltcIkxvYWQgQmFsYW5jZXJcIl1cbiAgICAgICAgXG4gICAgICAgIHN1YmdyYXBoIFwiQXBwbGljYXRpb24gU2VydmVyc1wiXG4gICAgICAgICAgICBBcHAxW1wiRGphbmdvIEluc3RhbmNlIDFcIl1cbiAgICAgICAgICAgIEFwcDJbXCJEamFuZ28gSW5zdGFuY2UgMlwiXVxuICAgICAgICBlbmRcblxuICAgICAgICBTdGF0aWNfQmFja2VuZFtcIlN0YXRpYyBGaWxlcyBTZXJ2ZXJcIl1cbiAgICBlbmRcblxuICAgIHN1YmdyYXBoIFwiRGF0YWJhc2UgTGF5ZXJcIlxuICAgICAgICBQR1soXCJQb3N0Z3JlU1FMXCIpXVxuICAgICAgICBQR19CYWNrdXBbKFwiQXV0b21hdGVkIEJhY2t1cHNcIildXG4gICAgZW5kXG5cbiAgICBzdWJncmFwaCBcIkNhY2hlICYgUXVldWVcIlxuICAgICAgICBSZWRpc19Qcm9kWyhcIlJlZGlzIENsb3VkXCIpXVxuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggXCJXb3JrZXIgTGF5ZXJcIlxuICAgICAgICBXb3JrZXIxW1wiQ2VsZXJ5IFdvcmtlciAxXCJdXG4gICAgICAgIFdvcmtlcjJbXCJDZWxlcnkgV29ya2VyIDJcIl1cbiAgICAgICAgQmVhdFtcIkNlbGVyeSBCZWF0XCJdXG4gICAgZW5kXG5cbiAgICBzdWJncmFwaCBcIkV4dGVybmFsIFNlcnZpY2VzXCJcbiAgICAgICAgU01UUFtcIlNlbmRHcmlkXCJdXG4gICAgICAgIEdhdGV3YXlbXCJQYXltZW50IEdhdGV3YXlcIl1cbiAgICAgICAgTW9uaXRvcmluZ1tcIlNlbnRyeVwiXVxuICAgICAgICBTM1tcIkFXUyBTMyAvIE1lZGlhXCJdXG4gICAgZW5kXG5cbiAgICAlJSBDb25uZWN0aW9uc1xuICAgIERlc2t0b3AgLS0+IENGXG4gICAgTW9iaWxlIC0tPiBDRlxuICAgIFxuICAgIENGIC0tPiBTdGF0aWNcbiAgICBDRiAtLT4gTEJcbiAgICBcbiAgICBTdGF0aWMgLS0+IEJ1aWxkXG4gICAgXG4gICAgTEIgLS0+IEFwcDFcbiAgICBMQiAtLT4gQXBwMlxuICAgIFxuICAgICUlIEFwcCBDb25uZWN0aW9uc1xuICAgIEFwcDEgLS0+IFBHXG4gICAgQXBwMiAtLT4gUEdcbiAgICBBcHAxIC0tPiBSZWRpc19Qcm9kXG4gICAgQXBwMiAtLT4gUmVkaXNfUHJvZFxuICAgIFxuICAgIEFwcDEgLS0+IFMzXG4gICAgQXBwMiAtLT4gUzNcbiAgICBcbiAgICBBcHAxIC0tPiBHYXRld2F5XG4gICAgQXBwMiAtLT4gR2F0ZXdheVxuICAgIEFwcDEgLS0+IE1vbml0b3JpbmdcbiAgICBBcHAyIC0tPiBNb25pdG9yaW5nXG5cbiAgICAlJSBEYXRhYmFzZVxuICAgIFBHIC0tPiBQR19CYWNrdXBcbiAgICBcbiAgICAlJSBXb3JrZXJzXG4gICAgQmVhdCAtLT4gUmVkaXNfUHJvZFxuICAgIFdvcmtlcjEgLS0+IFJlZGlzX1Byb2RcbiAgICBXb3JrZXIyIC0tPiBSZWRpc19Qcm9kXG4gICAgXG4gICAgV29ya2VyMSAtLT4gU01UUFxuICAgIFdvcmtlcjIgLS0+IFNNVFBcbiAgICBXb3JrZXIxIC0tPiBNb25pdG9yaW5nXG4gICAgV29ya2VyMiAtLT4gTW9uaXRvcmluZyIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIHN1YmdyYXBoIFwiVXNlciBEZXZpY2VzXCJcbiAgICAgICAgRGVza3RvcFtcIlx1ZDgzZFx1ZGNiYiBEZXNrdG9wIEJyb3dzZXJcIl1cbiAgICAgICAgTW9iaWxlW1wiXHVkODNkXHVkY2YxIE1vYmlsZSBCcm93c2VyXCJdXG4gICAgZW5kXG5cbiAgICBzdWJncmFwaCBcIkNETiBMYXllclwiXG4gICAgICAgIENGW1wiQ2xvdWRmbGFyZSBDRE5cIl1cbiAgICBlbmRcblxuICAgIHN1YmdyYXBoIFwiRnJvbnRlbmQgSG9zdGluZyhcIk5ldGxpZnlcIilcIlxuICAgICAgICBCdWlsZFtcIkJ1aWxkIFByb2Nlc3NcIl1cbiAgICAgICAgU3RhdGljW1wiU3RhdGljIEFzc2V0c1wiXVxuICAgICAgICBFZGdlW1wiRWRnZSBGdW5jdGlvbnNcIl1cbiAgICBlbmRcblxuICAgIHN1YmdyYXBoIFwiQmFja2VuZCBIb3N0aW5nKFwiUmFpbHdheS9SZW5kZXJcIilcIlxuICAgICAgICBMQltcIkxvYWQgQmFsYW5jZXJcIl1cbiAgICAgICAgXG4gICAgICAgIHN1YmdyYXBoIFwiQXBwbGljYXRpb24gU2VydmVyc1wiXG4gICAgICAgICAgICBBcHAxW1wiRGphbmdvIEluc3RhbmNlIDFcIl1cbiAgICAgICAgICAgIEFwcDJbXCJEamFuZ28gSW5zdGFuY2UgMlwiXVxuICAgICAgICBlbmRcblxuICAgICAgICBTdGF0aWNfQmFja2VuZFtcIlN0YXRpYyBGaWxlcyBTZXJ2ZXJcIl1cbiAgICBlbmRcblxuICAgIHN1YmdyYXBoIFwiRGF0YWJhc2UgTGF5ZXJcIlxuICAgICAgICBQR1soXCJQb3N0Z3JlU1FMXCIpXVxuICAgICAgICBQR19CYWNrdXBbKFwiQXV0b21hdGVkIEJhY2t1cHNcIildXG4gICAgZW5kXG5cbiAgICBzdWJncmFwaCBcIkNhY2hlICYgUXVldWVcIlxuICAgICAgICBSZWRpc19Qcm9kWyhcIlJlZGlzIENsb3VkXCIpXVxuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggXCJXb3JrZXIgTGF5ZXJcIlxuICAgICAgICBXb3JrZXIxW1wiQ2VsZXJ5IFdvcmtlciAxXCJdXG4gICAgICAgIFdvcmtlcjJbXCJDZWxlcnkgV29ya2VyIDJcIl1cbiAgICAgICAgQmVhdFtcIkNlbGVyeSBCZWF0XCJdXG4gICAgZW5kXG5cbiAgICBzdWJncmFwaCBcIkV4dGVybmFsIFNlcnZpY2VzXCJcbiAgICAgICAgU01UUFtcIlNlbmRHcmlkXCJdXG4gICAgICAgIEdhdGV3YXlbXCJQYXltZW50IEdhdGV3YXlcIl1cbiAgICAgICAgTW9uaXRvcmluZ1tcIlNlbnRyeVwiXVxuICAgICAgICBTM1tcIkFXUyBTMyAvIE1lZGlhXCJdXG4gICAgZW5kXG5cbiAgICAlJSBDb25uZWN0aW9uc1xuICAgIERlc2t0b3AgLS0+IENGXG4gICAgTW9iaWxlIC0tPiBDRlxuICAgIFxuICAgIENGIC0tPiBTdGF0aWNcbiAgICBDRiAtLT4gTEJcbiAgICBcbiAgICBTdGF0aWMgLS0+IEJ1aWxkXG4gICAgXG4gICAgTEIgLS0+IEFwcDFcbiAgICBMQiAtLT4gQXBwMlxuICAgIFxuICAgICUlIEFwcCBDb25uZWN0aW9uc1xuICAgIEFwcDEgLS0+IFBHXG4gICAgQXBwMiAtLT4gUEdcbiAgICBBcHAxIC0tPiBSZWRpc19Qcm9kXG4gICAgQXBwMiAtLT4gUmVkaXNfUHJvZFxuICAgIFxuICAgIEFwcDEgLS0+IFMzXG4gICAgQXBwMiAtLT4gUzNcbiAgICBcbiAgICBBcHAxIC0tPiBHYXRld2F5XG4gICAgQXBwMiAtLT4gR2F0ZXdheVxuICAgIEFwcDEgLS0+IE1vbml0b3JpbmdcbiAgICBBcHAyIC0tPiBNb25pdG9yaW5nXG5cbiAgICAlJSBEYXRhYmFzZVxuICAgIFBHIC0tPiBQR19CYWNrdXBcbiAgICBcbiAgICAlJSBXb3JrZXJzXG4gICAgQmVhdCAtLT4gUmVkaXNfUHJvZFxuICAgIFdvcmtlcjEgLS0+IFJlZGlzX1Byb2RcbiAgICBXb3JrZXIyIC0tPiBSZWRpc19Qcm9kXG4gICAgXG4gICAgV29ya2VyMSAtLT4gU01UUFxuICAgIFdvcmtlcjIgLS0+IFNNVFBcbiAgICBXb3JrZXIxIC0tPiBNb25pdG9yaW5nXG4gICAgV29ya2VyMiAtLT4gTW9uaXRvcmluZyIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart LR
                        subgraph "User Devices"
                            Desktop["💻 Desktop Browser"]
                            Mobile["📱 Mobile Browser"]
                        end
                    
                        subgraph "CDN Layer"
                            CF["Cloudflare CDN"]
                        end
                    
                        subgraph "Frontend Hosting("Netlify")"
                            Build["Build Process"]
                            Static["Static Assets"]
                            Edge["Edge Functions"]
                        end
                    
                        subgraph "Backend Hosting("Railway/Render")"
                            LB["Load Balancer"]
                            
                            subgraph "Application Servers"
                                App1["Django Instance 1"]
                                App2["Django Instance 2"]
                            end
                    
                            Static_Backend["Static Files Server"]
                        end
                    
                        subgraph "Database Layer"
                            PG[("PostgreSQL")]
                            PG_Backup[("Automated Backups")]
                        end
                    
                        subgraph "Cache & Queue"
                            Redis_Prod[("Redis Cloud")]
                        end
                    
                        subgraph "Worker Layer"
                            Worker1["Celery Worker 1"]
                            Worker2["Celery Worker 2"]
                            Beat["Celery Beat"]
                        end
                    
                        subgraph "External Services"
                            SMTP["SendGrid"]
                            Gateway["Payment Gateway"]
                            Monitoring["Sentry"]
                            S3["AWS S3 / Media"]
                        end
                    
                        %% Connections
                        Desktop --> CF
                        Mobile --> CF
                        
                        CF --> Static
                        CF --> LB
                        
                        Static --> Build
                        
                        LB --> App1
                        LB --> App2
                        
                        %% App Connections
                        App1 --> PG
                        App2 --> PG
                        App1 --> Redis_Prod
                        App2 --> Redis_Prod
                        
                        App1 --> S3
                        App2 --> S3
                        
                        App1 --> Gateway
                        App2 --> Gateway
                        App1 --> Monitoring
                        App2 --> Monitoring
                    
                        %% Database
                        PG --> PG_Backup
                        
                        %% Workers
                        Beat --> Redis_Prod
                        Worker1 --> Redis_Prod
                        Worker2 --> Redis_Prod
                        
                        Worker1 --> SMTP
                        Worker2 --> SMTP
                        Worker1 --> Monitoring
                        Worker2 --> Monitoring

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart LR
                        Dev["Developer"] -->|git push| GitHub["GitHub Repo"]
                        GitHub -->|webhook| Netlify_Build["Netlify Build"]
                        GitHub -->|webhook| Railway_Build["Railway Build"]
                        
                        Netlify_Build -->|success| Netlify_Deploy["Deploy Frontend"]
                        Railway_Build -->|success| Railway_Deploy["Deploy Backend"]
                        
                        Railway_Deploy --> Migrate["Run Migrations"]
                        Migrate --> Collect["Collect Static"]
                        Collect --> Health["Health Check"]
                        Health -->|pass| Live["LIVE"]
                        Health -->|fail| Rollback["Rollback"]

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIERldltcIkRldmVsb3BlclwiXSAtLT58Z2l0IHB1c2h8IEdpdEh1YltcIkdpdEh1YiBSZXBvXCJdXG4gICAgR2l0SHViIC0tPnx3ZWJob29rfCBOZXRsaWZ5X0J1aWxkW1wiTmV0bGlmeSBCdWlsZFwiXVxuICAgIEdpdEh1YiAtLT58d2ViaG9va3wgUmFpbHdheV9CdWlsZFtcIlJhaWx3YXkgQnVpbGRcIl1cbiAgICBcbiAgICBOZXRsaWZ5X0J1aWxkIC0tPnxzdWNjZXNzfCBOZXRsaWZ5X0RlcGxveVtcIkRlcGxveSBGcm9udGVuZFwiXVxuICAgIFJhaWx3YXlfQnVpbGQgLS0+fHN1Y2Nlc3N8IFJhaWx3YXlfRGVwbG95W1wiRGVwbG95IEJhY2tlbmRcIl1cbiAgICBcbiAgICBSYWlsd2F5X0RlcGxveSAtLT4gTWlncmF0ZVtcIlJ1biBNaWdyYXRpb25zXCJdXG4gICAgTWlncmF0ZSAtLT4gQ29sbGVjdFtcIkNvbGxlY3QgU3RhdGljXCJdXG4gICAgQ29sbGVjdCAtLT4gSGVhbHRoW1wiSGVhbHRoIENoZWNrXCJdXG4gICAgSGVhbHRoIC0tPnxwYXNzfCBMaXZlW1wiTElWRVwiXVxuICAgIEhlYWx0aCAtLT58ZmFpbHwgUm9sbGJhY2tbXCJSb2xsYmFja1wiXSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBMUlxuICAgIERldltcIkRldmVsb3BlclwiXSAtLT58Z2l0IHB1c2h8IEdpdEh1YltcIkdpdEh1YiBSZXBvXCJdXG4gICAgR2l0SHViIC0tPnx3ZWJob29rfCBOZXRsaWZ5X0J1aWxkW1wiTmV0bGlmeSBCdWlsZFwiXVxuICAgIEdpdEh1YiAtLT58d2ViaG9va3wgUmFpbHdheV9CdWlsZFtcIlJhaWx3YXkgQnVpbGRcIl1cbiAgICBcbiAgICBOZXRsaWZ5X0J1aWxkIC0tPnxzdWNjZXNzfCBOZXRsaWZ5X0RlcGxveVtcIkRlcGxveSBGcm9udGVuZFwiXVxuICAgIFJhaWx3YXlfQnVpbGQgLS0+fHN1Y2Nlc3N8IFJhaWx3YXlfRGVwbG95W1wiRGVwbG95IEJhY2tlbmRcIl1cbiAgICBcbiAgICBSYWlsd2F5X0RlcGxveSAtLT4gTWlncmF0ZVtcIlJ1biBNaWdyYXRpb25zXCJdXG4gICAgTWlncmF0ZSAtLT4gQ29sbGVjdFtcIkNvbGxlY3QgU3RhdGljXCJdXG4gICAgQ29sbGVjdCAtLT4gSGVhbHRoW1wiSGVhbHRoIENoZWNrXCJdXG4gICAgSGVhbHRoIC0tPnxwYXNzfCBMaXZlW1wiTElWRVwiXVxuICAgIEhlYWx0aCAtLT58ZmFpbHwgUm9sbGJhY2tbXCJSb2xsYmFja1wiXSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart LR
                        Dev["Developer"] -->|git push| GitHub["GitHub Repo"]
                        GitHub -->|webhook| Netlify_Build["Netlify Build"]
                        GitHub -->|webhook| Railway_Build["Railway Build"]
                        
                        Netlify_Build -->|success| Netlify_Deploy["Deploy Frontend"]
                        Railway_Build -->|success| Railway_Deploy["Deploy Backend"]
                        
                        Railway_Deploy --> Migrate["Run Migrations"]
                        Migrate --> Collect["Collect Static"]
                        Collect --> Health["Health Check"]
                        Health -->|pass| Live["LIVE"]
                        Health -->|fail| Rollback["Rollback"]


.. dropdown:: 📊 Diagrama Estados("5 diagramas")
    :open:
    :class-container: sd-mb-4

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    stateDiagram-v2["*"] --> Pendiente: Cliente confirma compra\n& pago exitoso
                    
                        Pendiente --> Preparando: Logística inicia\npreparación
                        Pendiente --> Cancelado: Cliente cancela\no Admin cancela
                    
                        Preparando --> En_Transito: Logística marca\ncomo enviado
                        Preparando --> Cancelado: Problema en\npreparación
                    
                        En_Transito --> Entregado: Confirmación\nde entrega
                        En_Transito --> Problema_Entrega: Error en\nentrega
                    
                        Problema_Entrega --> En_Transito: Reintento de\nentrega
                        Problema_Entrega --> Cancelado: Entrega\nimposible
                    
                        Entregado --> [*]: Venta generada
                    
                        Cancelado --> [*]: Stock devuelto
                    
                        state Pendiente{"
                            [*] --> Esperando_Preparacion
                            Esperando_Preparacion --> Validando_Stock: Auto-check
                            Validando_Stock --> Esperando_Preparacion: Stock OK
                        "}
                    
                        state Preparando{"
                            [*] --> Recolectando
                            Recolectando --> Empacando
                            Empacando --> Etiquetando
                            Etiquetando --> Listo_para_Envio
                        "}
                    
                        state En_Transito{"
                            [*] --> Asignado_Transportista
                            Asignado_Transportista --> En_Ruta
                            En_Ruta --> En_Destino
                        "}
                    
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

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInN0YXRlRGlhZ3JhbS12MltcIipcIl0gLS0+IFBlbmRpZW50ZTogQ2xpZW50ZSBjb25maXJtYSBjb21wcmFcXG4mIHBhZ28gZXhpdG9zb1xuXG4gICAgUGVuZGllbnRlIC0tPiBQcmVwYXJhbmRvOiBMb2dcdTAwZWRzdGljYSBpbmljaWFcXG5wcmVwYXJhY2lcdTAwZjNuXG4gICAgUGVuZGllbnRlIC0tPiBDYW5jZWxhZG86IENsaWVudGUgY2FuY2VsYVxcbm8gQWRtaW4gY2FuY2VsYVxuXG4gICAgUHJlcGFyYW5kbyAtLT4gRW5fVHJhbnNpdG86IExvZ1x1MDBlZHN0aWNhIG1hcmNhXFxuY29tbyBlbnZpYWRvXG4gICAgUHJlcGFyYW5kbyAtLT4gQ2FuY2VsYWRvOiBQcm9ibGVtYSBlblxcbnByZXBhcmFjaVx1MDBmM25cblxuICAgIEVuX1RyYW5zaXRvIC0tPiBFbnRyZWdhZG86IENvbmZpcm1hY2lcdTAwZjNuXFxuZGUgZW50cmVnYVxuICAgIEVuX1RyYW5zaXRvIC0tPiBQcm9ibGVtYV9FbnRyZWdhOiBFcnJvciBlblxcbmVudHJlZ2FcblxuICAgIFByb2JsZW1hX0VudHJlZ2EgLS0+IEVuX1RyYW5zaXRvOiBSZWludGVudG8gZGVcXG5lbnRyZWdhXG4gICAgUHJvYmxlbWFfRW50cmVnYSAtLT4gQ2FuY2VsYWRvOiBFbnRyZWdhXFxuaW1wb3NpYmxlXG5cbiAgICBFbnRyZWdhZG8gLS0+IFsqXTogVmVudGEgZ2VuZXJhZGFcblxuICAgIENhbmNlbGFkbyAtLT4gWypdOiBTdG9jayBkZXZ1ZWx0b1xuXG4gICAgc3RhdGUgUGVuZGllbnRle1wiXG4gICAgICAgIFsqXSAtLT4gRXNwZXJhbmRvX1ByZXBhcmFjaW9uXG4gICAgICAgIEVzcGVyYW5kb19QcmVwYXJhY2lvbiAtLT4gVmFsaWRhbmRvX1N0b2NrOiBBdXRvLWNoZWNrXG4gICAgICAgIFZhbGlkYW5kb19TdG9jayAtLT4gRXNwZXJhbmRvX1ByZXBhcmFjaW9uOiBTdG9jayBPS1xuICAgIFwifVxuXG4gICAgc3RhdGUgUHJlcGFyYW5kb3tcIlxuICAgICAgICBbKl0gLS0+IFJlY29sZWN0YW5kb1xuICAgICAgICBSZWNvbGVjdGFuZG8gLS0+IEVtcGFjYW5kb1xuICAgICAgICBFbXBhY2FuZG8gLS0+IEV0aXF1ZXRhbmRvXG4gICAgICAgIEV0aXF1ZXRhbmRvIC0tPiBMaXN0b19wYXJhX0VudmlvXG4gICAgXCJ9XG5cbiAgICBzdGF0ZSBFbl9UcmFuc2l0b3tcIlxuICAgICAgICBbKl0gLS0+IEFzaWduYWRvX1RyYW5zcG9ydGlzdGFcbiAgICAgICAgQXNpZ25hZG9fVHJhbnNwb3J0aXN0YSAtLT4gRW5fUnV0YVxuICAgICAgICBFbl9SdXRhIC0tPiBFbl9EZXN0aW5vXG4gICAgXCJ9XG5cbiAgICBub3RlIHJpZ2h0IG9mIFBlbmRpZW50ZVxuICAgICAgICBcdTIwMjIgUGFnbyBjb25maXJtYWRvXG4gICAgICAgIFx1MjAyMiBTdG9jayByZXNlcnZhZG9cbiAgICAgICAgXHUyMDIyIENsaWVudGUgbm90aWZpY2Fkb1xuICAgIGVuZCBub3RlXG5cbiAgICBub3RlIHJpZ2h0IG9mIEVudHJlZ2Fkb1xuICAgICAgICBcdTIwMjIgR2VuZXJhIFZlbnRhXG4gICAgICAgIFx1MjAyMiBBY3R1YWxpemEgbVx1MDBlOXRyaWNhc1xuICAgICAgICBcdTIwMjIgTm90aWZpY2EgY2xpZW50ZVxuICAgIGVuZCBub3RlXG5cbiAgICBub3RlIHJpZ2h0IG9mIENhbmNlbGFkb1xuICAgICAgICBcdTIwMjIgRGV2dWVsdmUgc3RvY2tcbiAgICAgICAgXHUyMDIyIFByb2Nlc2EgcmVlbWJvbHNvXG4gICAgICAgIFx1MjAyMiBOb3RpZmljYSBjbGllbnRlXG4gICAgZW5kIG5vdGUiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInN0YXRlRGlhZ3JhbS12MltcIipcIl0gLS0+IFBlbmRpZW50ZTogQ2xpZW50ZSBjb25maXJtYSBjb21wcmFcXG4mIHBhZ28gZXhpdG9zb1xuXG4gICAgUGVuZGllbnRlIC0tPiBQcmVwYXJhbmRvOiBMb2dcdTAwZWRzdGljYSBpbmljaWFcXG5wcmVwYXJhY2lcdTAwZjNuXG4gICAgUGVuZGllbnRlIC0tPiBDYW5jZWxhZG86IENsaWVudGUgY2FuY2VsYVxcbm8gQWRtaW4gY2FuY2VsYVxuXG4gICAgUHJlcGFyYW5kbyAtLT4gRW5fVHJhbnNpdG86IExvZ1x1MDBlZHN0aWNhIG1hcmNhXFxuY29tbyBlbnZpYWRvXG4gICAgUHJlcGFyYW5kbyAtLT4gQ2FuY2VsYWRvOiBQcm9ibGVtYSBlblxcbnByZXBhcmFjaVx1MDBmM25cblxuICAgIEVuX1RyYW5zaXRvIC0tPiBFbnRyZWdhZG86IENvbmZpcm1hY2lcdTAwZjNuXFxuZGUgZW50cmVnYVxuICAgIEVuX1RyYW5zaXRvIC0tPiBQcm9ibGVtYV9FbnRyZWdhOiBFcnJvciBlblxcbmVudHJlZ2FcblxuICAgIFByb2JsZW1hX0VudHJlZ2EgLS0+IEVuX1RyYW5zaXRvOiBSZWludGVudG8gZGVcXG5lbnRyZWdhXG4gICAgUHJvYmxlbWFfRW50cmVnYSAtLT4gQ2FuY2VsYWRvOiBFbnRyZWdhXFxuaW1wb3NpYmxlXG5cbiAgICBFbnRyZWdhZG8gLS0+IFsqXTogVmVudGEgZ2VuZXJhZGFcblxuICAgIENhbmNlbGFkbyAtLT4gWypdOiBTdG9jayBkZXZ1ZWx0b1xuXG4gICAgc3RhdGUgUGVuZGllbnRle1wiXG4gICAgICAgIFsqXSAtLT4gRXNwZXJhbmRvX1ByZXBhcmFjaW9uXG4gICAgICAgIEVzcGVyYW5kb19QcmVwYXJhY2lvbiAtLT4gVmFsaWRhbmRvX1N0b2NrOiBBdXRvLWNoZWNrXG4gICAgICAgIFZhbGlkYW5kb19TdG9jayAtLT4gRXNwZXJhbmRvX1ByZXBhcmFjaW9uOiBTdG9jayBPS1xuICAgIFwifVxuXG4gICAgc3RhdGUgUHJlcGFyYW5kb3tcIlxuICAgICAgICBbKl0gLS0+IFJlY29sZWN0YW5kb1xuICAgICAgICBSZWNvbGVjdGFuZG8gLS0+IEVtcGFjYW5kb1xuICAgICAgICBFbXBhY2FuZG8gLS0+IEV0aXF1ZXRhbmRvXG4gICAgICAgIEV0aXF1ZXRhbmRvIC0tPiBMaXN0b19wYXJhX0VudmlvXG4gICAgXCJ9XG5cbiAgICBzdGF0ZSBFbl9UcmFuc2l0b3tcIlxuICAgICAgICBbKl0gLS0+IEFzaWduYWRvX1RyYW5zcG9ydGlzdGFcbiAgICAgICAgQXNpZ25hZG9fVHJhbnNwb3J0aXN0YSAtLT4gRW5fUnV0YVxuICAgICAgICBFbl9SdXRhIC0tPiBFbl9EZXN0aW5vXG4gICAgXCJ9XG5cbiAgICBub3RlIHJpZ2h0IG9mIFBlbmRpZW50ZVxuICAgICAgICBcdTIwMjIgUGFnbyBjb25maXJtYWRvXG4gICAgICAgIFx1MjAyMiBTdG9jayByZXNlcnZhZG9cbiAgICAgICAgXHUyMDIyIENsaWVudGUgbm90aWZpY2Fkb1xuICAgIGVuZCBub3RlXG5cbiAgICBub3RlIHJpZ2h0IG9mIEVudHJlZ2Fkb1xuICAgICAgICBcdTIwMjIgR2VuZXJhIFZlbnRhXG4gICAgICAgIFx1MjAyMiBBY3R1YWxpemEgbVx1MDBlOXRyaWNhc1xuICAgICAgICBcdTIwMjIgTm90aWZpY2EgY2xpZW50ZVxuICAgIGVuZCBub3RlXG5cbiAgICBub3RlIHJpZ2h0IG9mIENhbmNlbGFkb1xuICAgICAgICBcdTIwMjIgRGV2dWVsdmUgc3RvY2tcbiAgICAgICAgXHUyMDIyIFByb2Nlc2EgcmVlbWJvbHNvXG4gICAgICAgIFx1MjAyMiBOb3RpZmljYSBjbGllbnRlXG4gICAgZW5kIG5vdGUiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    stateDiagram-v2["*"] --> Pendiente: Cliente confirma compra\n& pago exitoso
                    
                        Pendiente --> Preparando: Logística inicia\npreparación
                        Pendiente --> Cancelado: Cliente cancela\no Admin cancela
                    
                        Preparando --> En_Transito: Logística marca\ncomo enviado
                        Preparando --> Cancelado: Problema en\npreparación
                    
                        En_Transito --> Entregado: Confirmación\nde entrega
                        En_Transito --> Problema_Entrega: Error en\nentrega
                    
                        Problema_Entrega --> En_Transito: Reintento de\nentrega
                        Problema_Entrega --> Cancelado: Entrega\nimposible
                    
                        Entregado --> [*]: Venta generada
                    
                        Cancelado --> [*]: Stock devuelto
                    
                        state Pendiente{"
                            [*] --> Esperando_Preparacion
                            Esperando_Preparacion --> Validando_Stock: Auto-check
                            Validando_Stock --> Esperando_Preparacion: Stock OK
                        "}
                    
                        state Preparando{"
                            [*] --> Recolectando
                            Recolectando --> Empacando
                            Empacando --> Etiquetando
                            Etiquetando --> Listo_para_Envio
                        "}
                    
                        state En_Transito{"
                            [*] --> Asignado_Transportista
                            Asignado_Transportista --> En_Ruta
                            En_Ruta --> En_Destino
                        "}
                    
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

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    stateDiagram-v2["*"] --> Activa: Registro exitoso
                    
                        Activa --> Auto_Desactivada: Usuario\ndesactiva cuenta
                        Activa --> Suspendida_Admin: Admin\nsuspende
                        Activa --> Inactiva: Sin actividad\npor 180 días
                    
                        Auto_Desactivada --> Activa: Usuario\nreactiva
                        Auto_Desactivada --> Eliminada: 30 días sin\nreactivar
                    
                        Suspendida_Admin --> Activa: Admin\nreactiva
                        Suspendida_Admin --> Eliminada: Solicitud usuario\n& aprobación admin
                    
                        Inactiva --> Activa: Usuario\ninicia sesión
                        Inactiva --> Eliminada: Sin actividad\npor 365 días
                    
                        Eliminada --> [*]: Datos anonimizados
                    
                        state Activa{"
                            [*] --> Normal
                            Normal --> Cambiando_Password: Solicitud cambio
                            Cambiando_Password --> Normal: Password actualizado
                            Normal --> Editando_Perfil: Solicitud edición
                            Editando_Perfil --> Normal: Perfil actualizado
                        "}
                    
                        state Suspendida_Admin{"
                            [*] --> Bloqueada
                            note right of Bloqueada
                                • No puede iniciar sesión
                                • Debe contactar soporte
                                • Razón registrada
                            end note
                        "}
                    
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

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInN0YXRlRGlhZ3JhbS12MltcIipcIl0gLS0+IEFjdGl2YTogUmVnaXN0cm8gZXhpdG9zb1xuXG4gICAgQWN0aXZhIC0tPiBBdXRvX0Rlc2FjdGl2YWRhOiBVc3VhcmlvXFxuZGVzYWN0aXZhIGN1ZW50YVxuICAgIEFjdGl2YSAtLT4gU3VzcGVuZGlkYV9BZG1pbjogQWRtaW5cXG5zdXNwZW5kZVxuICAgIEFjdGl2YSAtLT4gSW5hY3RpdmE6IFNpbiBhY3RpdmlkYWRcXG5wb3IgMTgwIGRcdTAwZWRhc1xuXG4gICAgQXV0b19EZXNhY3RpdmFkYSAtLT4gQWN0aXZhOiBVc3VhcmlvXFxucmVhY3RpdmFcbiAgICBBdXRvX0Rlc2FjdGl2YWRhIC0tPiBFbGltaW5hZGE6IDMwIGRcdTAwZWRhcyBzaW5cXG5yZWFjdGl2YXJcblxuICAgIFN1c3BlbmRpZGFfQWRtaW4gLS0+IEFjdGl2YTogQWRtaW5cXG5yZWFjdGl2YVxuICAgIFN1c3BlbmRpZGFfQWRtaW4gLS0+IEVsaW1pbmFkYTogU29saWNpdHVkIHVzdWFyaW9cXG4mIGFwcm9iYWNpXHUwMGYzbiBhZG1pblxuXG4gICAgSW5hY3RpdmEgLS0+IEFjdGl2YTogVXN1YXJpb1xcbmluaWNpYSBzZXNpXHUwMGYzblxuICAgIEluYWN0aXZhIC0tPiBFbGltaW5hZGE6IFNpbiBhY3RpdmlkYWRcXG5wb3IgMzY1IGRcdTAwZWRhc1xuXG4gICAgRWxpbWluYWRhIC0tPiBbKl06IERhdG9zIGFub25pbWl6YWRvc1xuXG4gICAgc3RhdGUgQWN0aXZhe1wiXG4gICAgICAgIFsqXSAtLT4gTm9ybWFsXG4gICAgICAgIE5vcm1hbCAtLT4gQ2FtYmlhbmRvX1Bhc3N3b3JkOiBTb2xpY2l0dWQgY2FtYmlvXG4gICAgICAgIENhbWJpYW5kb19QYXNzd29yZCAtLT4gTm9ybWFsOiBQYXNzd29yZCBhY3R1YWxpemFkb1xuICAgICAgICBOb3JtYWwgLS0+IEVkaXRhbmRvX1BlcmZpbDogU29saWNpdHVkIGVkaWNpXHUwMGYzblxuICAgICAgICBFZGl0YW5kb19QZXJmaWwgLS0+IE5vcm1hbDogUGVyZmlsIGFjdHVhbGl6YWRvXG4gICAgXCJ9XG5cbiAgICBzdGF0ZSBTdXNwZW5kaWRhX0FkbWlue1wiXG4gICAgICAgIFsqXSAtLT4gQmxvcXVlYWRhXG4gICAgICAgIG5vdGUgcmlnaHQgb2YgQmxvcXVlYWRhXG4gICAgICAgICAgICBcdTIwMjIgTm8gcHVlZGUgaW5pY2lhciBzZXNpXHUwMGYzblxuICAgICAgICAgICAgXHUyMDIyIERlYmUgY29udGFjdGFyIHNvcG9ydGVcbiAgICAgICAgICAgIFx1MjAyMiBSYXpcdTAwZjNuIHJlZ2lzdHJhZGFcbiAgICAgICAgZW5kIG5vdGVcbiAgICBcIn1cblxuICAgIG5vdGUgcmlnaHQgb2YgQXV0b19EZXNhY3RpdmFkYVxuICAgICAgICBcdTIwMjIgUHVlZGUgcmVhY3RpdmFyIHNvbG9cbiAgICAgICAgXHUyMDIyIERhdG9zIHByZXNlcnZhZG9zXG4gICAgICAgIFx1MjAyMiBTZXNpb25lcyBjZXJyYWRhc1xuICAgIGVuZCBub3RlXG5cbiAgICBub3RlIHJpZ2h0IG9mIEVsaW1pbmFkYVxuICAgICAgICBcdTIwMjIgSXJyZXZlcnNpYmxlXG4gICAgICAgIFx1MjAyMiBEYXRvcyBhbm9uaW1pemFkb3NcbiAgICAgICAgXHUyMDIyIEN1bXBsZSBHUERSXG4gICAgZW5kIG5vdGUiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInN0YXRlRGlhZ3JhbS12MltcIipcIl0gLS0+IEFjdGl2YTogUmVnaXN0cm8gZXhpdG9zb1xuXG4gICAgQWN0aXZhIC0tPiBBdXRvX0Rlc2FjdGl2YWRhOiBVc3VhcmlvXFxuZGVzYWN0aXZhIGN1ZW50YVxuICAgIEFjdGl2YSAtLT4gU3VzcGVuZGlkYV9BZG1pbjogQWRtaW5cXG5zdXNwZW5kZVxuICAgIEFjdGl2YSAtLT4gSW5hY3RpdmE6IFNpbiBhY3RpdmlkYWRcXG5wb3IgMTgwIGRcdTAwZWRhc1xuXG4gICAgQXV0b19EZXNhY3RpdmFkYSAtLT4gQWN0aXZhOiBVc3VhcmlvXFxucmVhY3RpdmFcbiAgICBBdXRvX0Rlc2FjdGl2YWRhIC0tPiBFbGltaW5hZGE6IDMwIGRcdTAwZWRhcyBzaW5cXG5yZWFjdGl2YXJcblxuICAgIFN1c3BlbmRpZGFfQWRtaW4gLS0+IEFjdGl2YTogQWRtaW5cXG5yZWFjdGl2YVxuICAgIFN1c3BlbmRpZGFfQWRtaW4gLS0+IEVsaW1pbmFkYTogU29saWNpdHVkIHVzdWFyaW9cXG4mIGFwcm9iYWNpXHUwMGYzbiBhZG1pblxuXG4gICAgSW5hY3RpdmEgLS0+IEFjdGl2YTogVXN1YXJpb1xcbmluaWNpYSBzZXNpXHUwMGYzblxuICAgIEluYWN0aXZhIC0tPiBFbGltaW5hZGE6IFNpbiBhY3RpdmlkYWRcXG5wb3IgMzY1IGRcdTAwZWRhc1xuXG4gICAgRWxpbWluYWRhIC0tPiBbKl06IERhdG9zIGFub25pbWl6YWRvc1xuXG4gICAgc3RhdGUgQWN0aXZhe1wiXG4gICAgICAgIFsqXSAtLT4gTm9ybWFsXG4gICAgICAgIE5vcm1hbCAtLT4gQ2FtYmlhbmRvX1Bhc3N3b3JkOiBTb2xpY2l0dWQgY2FtYmlvXG4gICAgICAgIENhbWJpYW5kb19QYXNzd29yZCAtLT4gTm9ybWFsOiBQYXNzd29yZCBhY3R1YWxpemFkb1xuICAgICAgICBOb3JtYWwgLS0+IEVkaXRhbmRvX1BlcmZpbDogU29saWNpdHVkIGVkaWNpXHUwMGYzblxuICAgICAgICBFZGl0YW5kb19QZXJmaWwgLS0+IE5vcm1hbDogUGVyZmlsIGFjdHVhbGl6YWRvXG4gICAgXCJ9XG5cbiAgICBzdGF0ZSBTdXNwZW5kaWRhX0FkbWlue1wiXG4gICAgICAgIFsqXSAtLT4gQmxvcXVlYWRhXG4gICAgICAgIG5vdGUgcmlnaHQgb2YgQmxvcXVlYWRhXG4gICAgICAgICAgICBcdTIwMjIgTm8gcHVlZGUgaW5pY2lhciBzZXNpXHUwMGYzblxuICAgICAgICAgICAgXHUyMDIyIERlYmUgY29udGFjdGFyIHNvcG9ydGVcbiAgICAgICAgICAgIFx1MjAyMiBSYXpcdTAwZjNuIHJlZ2lzdHJhZGFcbiAgICAgICAgZW5kIG5vdGVcbiAgICBcIn1cblxuICAgIG5vdGUgcmlnaHQgb2YgQXV0b19EZXNhY3RpdmFkYVxuICAgICAgICBcdTIwMjIgUHVlZGUgcmVhY3RpdmFyIHNvbG9cbiAgICAgICAgXHUyMDIyIERhdG9zIHByZXNlcnZhZG9zXG4gICAgICAgIFx1MjAyMiBTZXNpb25lcyBjZXJyYWRhc1xuICAgIGVuZCBub3RlXG5cbiAgICBub3RlIHJpZ2h0IG9mIEVsaW1pbmFkYVxuICAgICAgICBcdTIwMjIgSXJyZXZlcnNpYmxlXG4gICAgICAgIFx1MjAyMiBEYXRvcyBhbm9uaW1pemFkb3NcbiAgICAgICAgXHUyMDIyIEN1bXBsZSBHUERSXG4gICAgZW5kIG5vdGUiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    stateDiagram-v2["*"] --> Activa: Registro exitoso
                    
                        Activa --> Auto_Desactivada: Usuario\ndesactiva cuenta
                        Activa --> Suspendida_Admin: Admin\nsuspende
                        Activa --> Inactiva: Sin actividad\npor 180 días
                    
                        Auto_Desactivada --> Activa: Usuario\nreactiva
                        Auto_Desactivada --> Eliminada: 30 días sin\nreactivar
                    
                        Suspendida_Admin --> Activa: Admin\nreactiva
                        Suspendida_Admin --> Eliminada: Solicitud usuario\n& aprobación admin
                    
                        Inactiva --> Activa: Usuario\ninicia sesión
                        Inactiva --> Eliminada: Sin actividad\npor 365 días
                    
                        Eliminada --> [*]: Datos anonimizados
                    
                        state Activa{"
                            [*] --> Normal
                            Normal --> Cambiando_Password: Solicitud cambio
                            Cambiando_Password --> Normal: Password actualizado
                            Normal --> Editando_Perfil: Solicitud edición
                            Editando_Perfil --> Normal: Perfil actualizado
                        "}
                    
                        state Suspendida_Admin{"
                            [*] --> Bloqueada
                            note right of Bloqueada
                                • No puede iniciar sesión
                                • Debe contactar soporte
                                • Razón registrada
                            end note
                        "}
                    
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

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    stateDiagram-v2["*"] --> Pendiente: Cliente inicia\nproceso de pago
                    
                        Pendiente --> Procesando: Gateway\nrecibe solicitud
                    
                        Procesando --> Aprobado: Autorización\nexitosa
                        Procesando --> Rechazado: Fondos insuficientes\no tarjeta inválida
                        Procesando --> Error: Error técnico\ndel gateway
                    
                        Rechazado --> Pendiente: Cliente\nreintenta
                        Error --> Pendiente: Administrador\nautoriza reintento
                    
                        Aprobado --> Confirmado: Verificación\nexitosa
                    
                        Confirmado --> Completado: Pedido\nentregado
                    
                        Completado --> Reembolsado: Solicitud de\nreembolso aprobada
                    
                        Rechazado --> [*]: Pago no procesado
                        Error --> [*]: Pago no procesado
                        Reembolsado --> [*]: Monto devuelto
                    
                        state Procesando{"
                            [*] --> Validando_Datos
                            Validando_Datos --> Autorizando
                            Autorizando --> Capturando
                        "}
                    
                        state Aprobado{"
                            [*] --> Verificando_Fondos
                            Verificando_Fondos --> Reservado
                        "}
                    
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

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInN0YXRlRGlhZ3JhbS12MltcIipcIl0gLS0+IFBlbmRpZW50ZTogQ2xpZW50ZSBpbmljaWFcXG5wcm9jZXNvIGRlIHBhZ29cblxuICAgIFBlbmRpZW50ZSAtLT4gUHJvY2VzYW5kbzogR2F0ZXdheVxcbnJlY2liZSBzb2xpY2l0dWRcblxuICAgIFByb2Nlc2FuZG8gLS0+IEFwcm9iYWRvOiBBdXRvcml6YWNpXHUwMGYzblxcbmV4aXRvc2FcbiAgICBQcm9jZXNhbmRvIC0tPiBSZWNoYXphZG86IEZvbmRvcyBpbnN1ZmljaWVudGVzXFxubyB0YXJqZXRhIGludlx1MDBlMWxpZGFcbiAgICBQcm9jZXNhbmRvIC0tPiBFcnJvcjogRXJyb3IgdFx1MDBlOWNuaWNvXFxuZGVsIGdhdGV3YXlcblxuICAgIFJlY2hhemFkbyAtLT4gUGVuZGllbnRlOiBDbGllbnRlXFxucmVpbnRlbnRhXG4gICAgRXJyb3IgLS0+IFBlbmRpZW50ZTogQWRtaW5pc3RyYWRvclxcbmF1dG9yaXphIHJlaW50ZW50b1xuXG4gICAgQXByb2JhZG8gLS0+IENvbmZpcm1hZG86IFZlcmlmaWNhY2lcdTAwZjNuXFxuZXhpdG9zYVxuXG4gICAgQ29uZmlybWFkbyAtLT4gQ29tcGxldGFkbzogUGVkaWRvXFxuZW50cmVnYWRvXG5cbiAgICBDb21wbGV0YWRvIC0tPiBSZWVtYm9sc2FkbzogU29saWNpdHVkIGRlXFxucmVlbWJvbHNvIGFwcm9iYWRhXG5cbiAgICBSZWNoYXphZG8gLS0+IFsqXTogUGFnbyBubyBwcm9jZXNhZG9cbiAgICBFcnJvciAtLT4gWypdOiBQYWdvIG5vIHByb2Nlc2Fkb1xuICAgIFJlZW1ib2xzYWRvIC0tPiBbKl06IE1vbnRvIGRldnVlbHRvXG5cbiAgICBzdGF0ZSBQcm9jZXNhbmRve1wiXG4gICAgICAgIFsqXSAtLT4gVmFsaWRhbmRvX0RhdG9zXG4gICAgICAgIFZhbGlkYW5kb19EYXRvcyAtLT4gQXV0b3JpemFuZG9cbiAgICAgICAgQXV0b3JpemFuZG8gLS0+IENhcHR1cmFuZG9cbiAgICBcIn1cblxuICAgIHN0YXRlIEFwcm9iYWRve1wiXG4gICAgICAgIFsqXSAtLT4gVmVyaWZpY2FuZG9fRm9uZG9zXG4gICAgICAgIFZlcmlmaWNhbmRvX0ZvbmRvcyAtLT4gUmVzZXJ2YWRvXG4gICAgXCJ9XG5cbiAgICBub3RlIHJpZ2h0IG9mIFBlbmRpZW50ZVxuICAgICAgICBcdTIwMjIgRXNwZXJhbmRvIGFjY2lcdTAwZjNuXG4gICAgICAgIFx1MjAyMiBObyBhZmVjdGEgaW52ZW50YXJpb1xuICAgICAgICBcdTIwMjIgVGltZW91dDogMTUgbWludXRvc1xuICAgIGVuZCBub3RlXG5cbiAgICBub3RlIHJpZ2h0IG9mIENvbXBsZXRhZG9cbiAgICAgICAgXHUyMDIyIFBhZ28gZmluYWxpemFkb1xuICAgICAgICBcdTIwMjIgTm8gcmV2ZXJzaWJsZVxuICAgICAgICBcdTIwMjIgVmVudGEgY29uZmlybWFkYVxuICAgIGVuZCBub3RlXG5cbiAgICBub3RlIHJpZ2h0IG9mIFJlZW1ib2xzYWRvXG4gICAgICAgIFx1MjAyMiBEaW5lcm8gZGV2dWVsdG9cbiAgICAgICAgXHUyMDIyIFBlZGlkbyBjYW5jZWxhZG9cbiAgICAgICAgXHUyMDIyIFN0b2NrIHJlc3RhdXJhZG9cbiAgICBlbmQgbm90ZSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInN0YXRlRGlhZ3JhbS12MltcIipcIl0gLS0+IFBlbmRpZW50ZTogQ2xpZW50ZSBpbmljaWFcXG5wcm9jZXNvIGRlIHBhZ29cblxuICAgIFBlbmRpZW50ZSAtLT4gUHJvY2VzYW5kbzogR2F0ZXdheVxcbnJlY2liZSBzb2xpY2l0dWRcblxuICAgIFByb2Nlc2FuZG8gLS0+IEFwcm9iYWRvOiBBdXRvcml6YWNpXHUwMGYzblxcbmV4aXRvc2FcbiAgICBQcm9jZXNhbmRvIC0tPiBSZWNoYXphZG86IEZvbmRvcyBpbnN1ZmljaWVudGVzXFxubyB0YXJqZXRhIGludlx1MDBlMWxpZGFcbiAgICBQcm9jZXNhbmRvIC0tPiBFcnJvcjogRXJyb3IgdFx1MDBlOWNuaWNvXFxuZGVsIGdhdGV3YXlcblxuICAgIFJlY2hhemFkbyAtLT4gUGVuZGllbnRlOiBDbGllbnRlXFxucmVpbnRlbnRhXG4gICAgRXJyb3IgLS0+IFBlbmRpZW50ZTogQWRtaW5pc3RyYWRvclxcbmF1dG9yaXphIHJlaW50ZW50b1xuXG4gICAgQXByb2JhZG8gLS0+IENvbmZpcm1hZG86IFZlcmlmaWNhY2lcdTAwZjNuXFxuZXhpdG9zYVxuXG4gICAgQ29uZmlybWFkbyAtLT4gQ29tcGxldGFkbzogUGVkaWRvXFxuZW50cmVnYWRvXG5cbiAgICBDb21wbGV0YWRvIC0tPiBSZWVtYm9sc2FkbzogU29saWNpdHVkIGRlXFxucmVlbWJvbHNvIGFwcm9iYWRhXG5cbiAgICBSZWNoYXphZG8gLS0+IFsqXTogUGFnbyBubyBwcm9jZXNhZG9cbiAgICBFcnJvciAtLT4gWypdOiBQYWdvIG5vIHByb2Nlc2Fkb1xuICAgIFJlZW1ib2xzYWRvIC0tPiBbKl06IE1vbnRvIGRldnVlbHRvXG5cbiAgICBzdGF0ZSBQcm9jZXNhbmRve1wiXG4gICAgICAgIFsqXSAtLT4gVmFsaWRhbmRvX0RhdG9zXG4gICAgICAgIFZhbGlkYW5kb19EYXRvcyAtLT4gQXV0b3JpemFuZG9cbiAgICAgICAgQXV0b3JpemFuZG8gLS0+IENhcHR1cmFuZG9cbiAgICBcIn1cblxuICAgIHN0YXRlIEFwcm9iYWRve1wiXG4gICAgICAgIFsqXSAtLT4gVmVyaWZpY2FuZG9fRm9uZG9zXG4gICAgICAgIFZlcmlmaWNhbmRvX0ZvbmRvcyAtLT4gUmVzZXJ2YWRvXG4gICAgXCJ9XG5cbiAgICBub3RlIHJpZ2h0IG9mIFBlbmRpZW50ZVxuICAgICAgICBcdTIwMjIgRXNwZXJhbmRvIGFjY2lcdTAwZjNuXG4gICAgICAgIFx1MjAyMiBObyBhZmVjdGEgaW52ZW50YXJpb1xuICAgICAgICBcdTIwMjIgVGltZW91dDogMTUgbWludXRvc1xuICAgIGVuZCBub3RlXG5cbiAgICBub3RlIHJpZ2h0IG9mIENvbXBsZXRhZG9cbiAgICAgICAgXHUyMDIyIFBhZ28gZmluYWxpemFkb1xuICAgICAgICBcdTIwMjIgTm8gcmV2ZXJzaWJsZVxuICAgICAgICBcdTIwMjIgVmVudGEgY29uZmlybWFkYVxuICAgIGVuZCBub3RlXG5cbiAgICBub3RlIHJpZ2h0IG9mIFJlZW1ib2xzYWRvXG4gICAgICAgIFx1MjAyMiBEaW5lcm8gZGV2dWVsdG9cbiAgICAgICAgXHUyMDIyIFBlZGlkbyBjYW5jZWxhZG9cbiAgICAgICAgXHUyMDIyIFN0b2NrIHJlc3RhdXJhZG9cbiAgICBlbmQgbm90ZSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    stateDiagram-v2["*"] --> Pendiente: Cliente inicia\nproceso de pago
                    
                        Pendiente --> Procesando: Gateway\nrecibe solicitud
                    
                        Procesando --> Aprobado: Autorización\nexitosa
                        Procesando --> Rechazado: Fondos insuficientes\no tarjeta inválida
                        Procesando --> Error: Error técnico\ndel gateway
                    
                        Rechazado --> Pendiente: Cliente\nreintenta
                        Error --> Pendiente: Administrador\nautoriza reintento
                    
                        Aprobado --> Confirmado: Verificación\nexitosa
                    
                        Confirmado --> Completado: Pedido\nentregado
                    
                        Completado --> Reembolsado: Solicitud de\nreembolso aprobada
                    
                        Rechazado --> [*]: Pago no procesado
                        Error --> [*]: Pago no procesado
                        Reembolsado --> [*]: Monto devuelto
                    
                        state Procesando{"
                            [*] --> Validando_Datos
                            Validando_Datos --> Autorizando
                            Autorizando --> Capturando
                        "}
                    
                        state Aprobado{"
                            [*] --> Verificando_Fondos
                            Verificando_Fondos --> Reservado
                        "}
                    
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

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    stateDiagram-v2["*"] --> Pendiente: Evento trigger
                    
                        Pendiente --> Encolada: Agregada a\ncola Celery
                    
                        Encolada --> Enviando: Worker procesa
                    
                        Enviando --> Enviada: Envío exitoso\n(SMTP/SMS OK)
                        Enviando --> Fallida: Error al enviar
                    
                        Enviada --> Leida: Usuario abre\nnotificación
                    
                        Fallida --> Reintentando: Auto-retry\n(max 3 intentos)
                    
                        Reintentando --> Enviando: Intentando\nnuevamente
                        Reintentando --> Fallida_Final: 3 intentos\nfallidos
                    
                        Leida --> [*]: Notificación procesada
                        Fallida_Final --> [*]: Notificación\nno entregada
                    
                        state Enviando{"
                            [*] --> Conectando_Servidor
                            Conectando_Servidor --> Enviando_Mensaje
                            Enviando_Mensaje --> Esperando_Confirmacion
                        "}
                    
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

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInN0YXRlRGlhZ3JhbS12MltcIipcIl0gLS0+IFBlbmRpZW50ZTogRXZlbnRvIHRyaWdnZXJcblxuICAgIFBlbmRpZW50ZSAtLT4gRW5jb2xhZGE6IEFncmVnYWRhIGFcXG5jb2xhIENlbGVyeVxuXG4gICAgRW5jb2xhZGEgLS0+IEVudmlhbmRvOiBXb3JrZXIgcHJvY2VzYVxuXG4gICAgRW52aWFuZG8gLS0+IEVudmlhZGE6IEVudlx1MDBlZG8gZXhpdG9zb1xcbihTTVRQL1NNUyBPSylcbiAgICBFbnZpYW5kbyAtLT4gRmFsbGlkYTogRXJyb3IgYWwgZW52aWFyXG5cbiAgICBFbnZpYWRhIC0tPiBMZWlkYTogVXN1YXJpbyBhYnJlXFxubm90aWZpY2FjaVx1MDBmM25cblxuICAgIEZhbGxpZGEgLS0+IFJlaW50ZW50YW5kbzogQXV0by1yZXRyeVxcbihtYXggMyBpbnRlbnRvcylcblxuICAgIFJlaW50ZW50YW5kbyAtLT4gRW52aWFuZG86IEludGVudGFuZG9cXG5udWV2YW1lbnRlXG4gICAgUmVpbnRlbnRhbmRvIC0tPiBGYWxsaWRhX0ZpbmFsOiAzIGludGVudG9zXFxuZmFsbGlkb3NcblxuICAgIExlaWRhIC0tPiBbKl06IE5vdGlmaWNhY2lcdTAwZjNuIHByb2Nlc2FkYVxuICAgIEZhbGxpZGFfRmluYWwgLS0+IFsqXTogTm90aWZpY2FjaVx1MDBmM25cXG5ubyBlbnRyZWdhZGFcblxuICAgIHN0YXRlIEVudmlhbmRve1wiXG4gICAgICAgIFsqXSAtLT4gQ29uZWN0YW5kb19TZXJ2aWRvclxuICAgICAgICBDb25lY3RhbmRvX1NlcnZpZG9yIC0tPiBFbnZpYW5kb19NZW5zYWplXG4gICAgICAgIEVudmlhbmRvX01lbnNhamUgLS0+IEVzcGVyYW5kb19Db25maXJtYWNpb25cbiAgICBcIn1cblxuICAgIG5vdGUgcmlnaHQgb2YgUGVuZGllbnRlXG4gICAgICAgIFx1MjAyMiBDcmVhZGEgZW4gREJcbiAgICAgICAgXHUyMDIyIGxlaWRhID0gZmFsc2VcbiAgICAgICAgXHUyMDIyIGVzdGFkbyA9IHBlbmRpZW50ZVxuICAgIGVuZCBub3RlXG5cbiAgICBub3RlIHJpZ2h0IG9mIEVudmlhZGFcbiAgICAgICAgXHUyMDIyIEVudHJlZ2FkYSBleGl0b3NhbWVudGVcbiAgICAgICAgXHUyMDIyIGZlY2hhX2VudmlvIHJlZ2lzdHJhZGFcbiAgICAgICAgXHUyMDIyIFZpc2libGUgcGFyYSB1c3VhcmlvXG4gICAgZW5kIG5vdGVcblxuICAgIG5vdGUgcmlnaHQgb2YgTGVpZGFcbiAgICAgICAgXHUyMDIyIFVzdWFyaW8gbGEgdmlvXG4gICAgICAgIFx1MjAyMiBmZWNoYV9sZWN0dXJhIHJlZ2lzdHJhZGFcbiAgICAgICAgXHUyMDIyIFB1ZWRlIGFyY2hpdmFyc2VcbiAgICBlbmQgbm90ZSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInN0YXRlRGlhZ3JhbS12MltcIipcIl0gLS0+IFBlbmRpZW50ZTogRXZlbnRvIHRyaWdnZXJcblxuICAgIFBlbmRpZW50ZSAtLT4gRW5jb2xhZGE6IEFncmVnYWRhIGFcXG5jb2xhIENlbGVyeVxuXG4gICAgRW5jb2xhZGEgLS0+IEVudmlhbmRvOiBXb3JrZXIgcHJvY2VzYVxuXG4gICAgRW52aWFuZG8gLS0+IEVudmlhZGE6IEVudlx1MDBlZG8gZXhpdG9zb1xcbihTTVRQL1NNUyBPSylcbiAgICBFbnZpYW5kbyAtLT4gRmFsbGlkYTogRXJyb3IgYWwgZW52aWFyXG5cbiAgICBFbnZpYWRhIC0tPiBMZWlkYTogVXN1YXJpbyBhYnJlXFxubm90aWZpY2FjaVx1MDBmM25cblxuICAgIEZhbGxpZGEgLS0+IFJlaW50ZW50YW5kbzogQXV0by1yZXRyeVxcbihtYXggMyBpbnRlbnRvcylcblxuICAgIFJlaW50ZW50YW5kbyAtLT4gRW52aWFuZG86IEludGVudGFuZG9cXG5udWV2YW1lbnRlXG4gICAgUmVpbnRlbnRhbmRvIC0tPiBGYWxsaWRhX0ZpbmFsOiAzIGludGVudG9zXFxuZmFsbGlkb3NcblxuICAgIExlaWRhIC0tPiBbKl06IE5vdGlmaWNhY2lcdTAwZjNuIHByb2Nlc2FkYVxuICAgIEZhbGxpZGFfRmluYWwgLS0+IFsqXTogTm90aWZpY2FjaVx1MDBmM25cXG5ubyBlbnRyZWdhZGFcblxuICAgIHN0YXRlIEVudmlhbmRve1wiXG4gICAgICAgIFsqXSAtLT4gQ29uZWN0YW5kb19TZXJ2aWRvclxuICAgICAgICBDb25lY3RhbmRvX1NlcnZpZG9yIC0tPiBFbnZpYW5kb19NZW5zYWplXG4gICAgICAgIEVudmlhbmRvX01lbnNhamUgLS0+IEVzcGVyYW5kb19Db25maXJtYWNpb25cbiAgICBcIn1cblxuICAgIG5vdGUgcmlnaHQgb2YgUGVuZGllbnRlXG4gICAgICAgIFx1MjAyMiBDcmVhZGEgZW4gREJcbiAgICAgICAgXHUyMDIyIGxlaWRhID0gZmFsc2VcbiAgICAgICAgXHUyMDIyIGVzdGFkbyA9IHBlbmRpZW50ZVxuICAgIGVuZCBub3RlXG5cbiAgICBub3RlIHJpZ2h0IG9mIEVudmlhZGFcbiAgICAgICAgXHUyMDIyIEVudHJlZ2FkYSBleGl0b3NhbWVudGVcbiAgICAgICAgXHUyMDIyIGZlY2hhX2VudmlvIHJlZ2lzdHJhZGFcbiAgICAgICAgXHUyMDIyIFZpc2libGUgcGFyYSB1c3VhcmlvXG4gICAgZW5kIG5vdGVcblxuICAgIG5vdGUgcmlnaHQgb2YgTGVpZGFcbiAgICAgICAgXHUyMDIyIFVzdWFyaW8gbGEgdmlvXG4gICAgICAgIFx1MjAyMiBmZWNoYV9sZWN0dXJhIHJlZ2lzdHJhZGFcbiAgICAgICAgXHUyMDIyIFB1ZWRlIGFyY2hpdmFyc2VcbiAgICBlbmQgbm90ZSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    stateDiagram-v2["*"] --> Pendiente: Evento trigger
                    
                        Pendiente --> Encolada: Agregada a\ncola Celery
                    
                        Encolada --> Enviando: Worker procesa
                    
                        Enviando --> Enviada: Envío exitoso\n(SMTP/SMS OK)
                        Enviando --> Fallida: Error al enviar
                    
                        Enviada --> Leida: Usuario abre\nnotificación
                    
                        Fallida --> Reintentando: Auto-retry\n(max 3 intentos)
                    
                        Reintentando --> Enviando: Intentando\nnuevamente
                        Reintentando --> Fallida_Final: 3 intentos\nfallidos
                    
                        Leida --> [*]: Notificación procesada
                        Fallida_Final --> [*]: Notificación\nno entregada
                    
                        state Enviando{"
                            [*] --> Conectando_Servidor
                            Conectando_Servidor --> Enviando_Mensaje
                            Enviando_Mensaje --> Esperando_Confirmacion
                        "}
                    
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

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    stateDiagram-v2["*"] --> Normal: Stock>"= stock_minimo\n+ margen
                    
                        Normal --> Bajo: Stock <= stock_minimo
                    
                        Bajo --> Muy_Bajo: Stock < (stock_minimo / 2)
                    
                        Muy_Bajo --> Critico: Stock <= 5
                    
                        Critico --> Agotado: Stock = 0
                    
                        Bajo --> Normal: Recarga manual\no automática
                        Muy_Bajo --> Normal: Recarga manual\no automática
                        Critico --> Normal: Recarga manual\no automática
                        Agotado --> Normal: Recarga manual\no automática
                    
                        state Normal {
                            [*"] --> Disponible
                            Disponible --> Vendiendo: Pedidos activos
                            Vendiendo --> Disponible: Stock OK
                        }
                    
                        state Bajo{"
                            [*] --> Alerta_Proveedor
                            note right of Alerta_Proveedor
                                • Notificación al proveedor
                                • Recarga auto trigger
                            end note
                        "}
                    
                        state Critico{"
                            [*] --> Alerta_Admin
                            note right of Alerta_Admin
                                • Notificación urgente
                                • Visible en dashboard
                                • Icono de advertencia
                            end note
                        "}
                    
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

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInN0YXRlRGlhZ3JhbS12MltcIipcIl0gLS0+IE5vcm1hbDogU3RvY2s+XCI9IHN0b2NrX21pbmltb1xcbisgbWFyZ2VuXG5cbiAgICBOb3JtYWwgLS0+IEJham86IFN0b2NrIDw9IHN0b2NrX21pbmltb1xuXG4gICAgQmFqbyAtLT4gTXV5X0Jham86IFN0b2NrIDwgKHN0b2NrX21pbmltbyAvIDIpXG5cbiAgICBNdXlfQmFqbyAtLT4gQ3JpdGljbzogU3RvY2sgPD0gNVxuXG4gICAgQ3JpdGljbyAtLT4gQWdvdGFkbzogU3RvY2sgPSAwXG5cbiAgICBCYWpvIC0tPiBOb3JtYWw6IFJlY2FyZ2EgbWFudWFsXFxubyBhdXRvbVx1MDBlMXRpY2FcbiAgICBNdXlfQmFqbyAtLT4gTm9ybWFsOiBSZWNhcmdhIG1hbnVhbFxcbm8gYXV0b21cdTAwZTF0aWNhXG4gICAgQ3JpdGljbyAtLT4gTm9ybWFsOiBSZWNhcmdhIG1hbnVhbFxcbm8gYXV0b21cdTAwZTF0aWNhXG4gICAgQWdvdGFkbyAtLT4gTm9ybWFsOiBSZWNhcmdhIG1hbnVhbFxcbm8gYXV0b21cdTAwZTF0aWNhXG5cbiAgICBzdGF0ZSBOb3JtYWwge1xuICAgICAgICBbKlwiXSAtLT4gRGlzcG9uaWJsZVxuICAgICAgICBEaXNwb25pYmxlIC0tPiBWZW5kaWVuZG86IFBlZGlkb3MgYWN0aXZvc1xuICAgICAgICBWZW5kaWVuZG8gLS0+IERpc3BvbmlibGU6IFN0b2NrIE9LXG4gICAgfVxuXG4gICAgc3RhdGUgQmFqb3tcIlxuICAgICAgICBbKl0gLS0+IEFsZXJ0YV9Qcm92ZWVkb3JcbiAgICAgICAgbm90ZSByaWdodCBvZiBBbGVydGFfUHJvdmVlZG9yXG4gICAgICAgICAgICBcdTIwMjIgTm90aWZpY2FjaVx1MDBmM24gYWwgcHJvdmVlZG9yXG4gICAgICAgICAgICBcdTIwMjIgUmVjYXJnYSBhdXRvIHRyaWdnZXJcbiAgICAgICAgZW5kIG5vdGVcbiAgICBcIn1cblxuICAgIHN0YXRlIENyaXRpY297XCJcbiAgICAgICAgWypdIC0tPiBBbGVydGFfQWRtaW5cbiAgICAgICAgbm90ZSByaWdodCBvZiBBbGVydGFfQWRtaW5cbiAgICAgICAgICAgIFx1MjAyMiBOb3RpZmljYWNpXHUwMGYzbiB1cmdlbnRlXG4gICAgICAgICAgICBcdTIwMjIgVmlzaWJsZSBlbiBkYXNoYm9hcmRcbiAgICAgICAgICAgIFx1MjAyMiBJY29ubyBkZSBhZHZlcnRlbmNpYVxuICAgICAgICBlbmQgbm90ZVxuICAgIFwifVxuXG4gICAgc3RhdGUgQWdvdGFkbyB7XG4gICAgICAgIFsqXSAtLT4gTm9fRGlzcG9uaWJsZVxuICAgICAgICBub3RlIHJpZ2h0IG9mIE5vX0Rpc3BvbmlibGVcbiAgICAgICAgICAgIFx1MjAyMiBObyBzZSBwdWVkZSBhZ3JlZ2FyIGFsIGNhcnJpdG9cbiAgICAgICAgICAgIFx1MjAyMiBNZW5zYWplIFwiQWdvdGFkb1wiXG4gICAgICAgICAgICBcdTIwMjIgTm8gdmlzaWJsZSBlbiBiXHUwMGZhc3F1ZWRhc1xuICAgICAgICBlbmQgbm90ZVxuICAgIH1cblxuICAgIG5vdGUgcmlnaHQgb2YgTm9ybWFsXG4gICAgICAgIFx1MjAyMiBTdG9jayBzYWx1ZGFibGVcbiAgICAgICAgXHUyMDIyIFZlbnRhcyBub3JtYWxlc1xuICAgICAgICBcdTIwMjIgU2luIGFsZXJ0YXNcbiAgICBlbmQgbm90ZVxuXG4gICAgbm90ZSByaWdodCBvZiBNdXlfQmFqb1xuICAgICAgICBcdTIwMjIgUmVxdWllcmUgYXRlbmNpXHUwMGYzblxuICAgICAgICBcdTIwMjIgUHJpb3JpZGFkIGFsdGFcbiAgICAgICAgXHUyMDIyIExpbWl0YXIgY29tcHJhcyBncmFuZGVzXG4gICAgZW5kIG5vdGUiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInN0YXRlRGlhZ3JhbS12MltcIipcIl0gLS0+IE5vcm1hbDogU3RvY2s+XCI9IHN0b2NrX21pbmltb1xcbisgbWFyZ2VuXG5cbiAgICBOb3JtYWwgLS0+IEJham86IFN0b2NrIDw9IHN0b2NrX21pbmltb1xuXG4gICAgQmFqbyAtLT4gTXV5X0Jham86IFN0b2NrIDwgKHN0b2NrX21pbmltbyAvIDIpXG5cbiAgICBNdXlfQmFqbyAtLT4gQ3JpdGljbzogU3RvY2sgPD0gNVxuXG4gICAgQ3JpdGljbyAtLT4gQWdvdGFkbzogU3RvY2sgPSAwXG5cbiAgICBCYWpvIC0tPiBOb3JtYWw6IFJlY2FyZ2EgbWFudWFsXFxubyBhdXRvbVx1MDBlMXRpY2FcbiAgICBNdXlfQmFqbyAtLT4gTm9ybWFsOiBSZWNhcmdhIG1hbnVhbFxcbm8gYXV0b21cdTAwZTF0aWNhXG4gICAgQ3JpdGljbyAtLT4gTm9ybWFsOiBSZWNhcmdhIG1hbnVhbFxcbm8gYXV0b21cdTAwZTF0aWNhXG4gICAgQWdvdGFkbyAtLT4gTm9ybWFsOiBSZWNhcmdhIG1hbnVhbFxcbm8gYXV0b21cdTAwZTF0aWNhXG5cbiAgICBzdGF0ZSBOb3JtYWwge1xuICAgICAgICBbKlwiXSAtLT4gRGlzcG9uaWJsZVxuICAgICAgICBEaXNwb25pYmxlIC0tPiBWZW5kaWVuZG86IFBlZGlkb3MgYWN0aXZvc1xuICAgICAgICBWZW5kaWVuZG8gLS0+IERpc3BvbmlibGU6IFN0b2NrIE9LXG4gICAgfVxuXG4gICAgc3RhdGUgQmFqb3tcIlxuICAgICAgICBbKl0gLS0+IEFsZXJ0YV9Qcm92ZWVkb3JcbiAgICAgICAgbm90ZSByaWdodCBvZiBBbGVydGFfUHJvdmVlZG9yXG4gICAgICAgICAgICBcdTIwMjIgTm90aWZpY2FjaVx1MDBmM24gYWwgcHJvdmVlZG9yXG4gICAgICAgICAgICBcdTIwMjIgUmVjYXJnYSBhdXRvIHRyaWdnZXJcbiAgICAgICAgZW5kIG5vdGVcbiAgICBcIn1cblxuICAgIHN0YXRlIENyaXRpY297XCJcbiAgICAgICAgWypdIC0tPiBBbGVydGFfQWRtaW5cbiAgICAgICAgbm90ZSByaWdodCBvZiBBbGVydGFfQWRtaW5cbiAgICAgICAgICAgIFx1MjAyMiBOb3RpZmljYWNpXHUwMGYzbiB1cmdlbnRlXG4gICAgICAgICAgICBcdTIwMjIgVmlzaWJsZSBlbiBkYXNoYm9hcmRcbiAgICAgICAgICAgIFx1MjAyMiBJY29ubyBkZSBhZHZlcnRlbmNpYVxuICAgICAgICBlbmQgbm90ZVxuICAgIFwifVxuXG4gICAgc3RhdGUgQWdvdGFkbyB7XG4gICAgICAgIFsqXSAtLT4gTm9fRGlzcG9uaWJsZVxuICAgICAgICBub3RlIHJpZ2h0IG9mIE5vX0Rpc3BvbmlibGVcbiAgICAgICAgICAgIFx1MjAyMiBObyBzZSBwdWVkZSBhZ3JlZ2FyIGFsIGNhcnJpdG9cbiAgICAgICAgICAgIFx1MjAyMiBNZW5zYWplIFwiQWdvdGFkb1wiXG4gICAgICAgICAgICBcdTIwMjIgTm8gdmlzaWJsZSBlbiBiXHUwMGZhc3F1ZWRhc1xuICAgICAgICBlbmQgbm90ZVxuICAgIH1cblxuICAgIG5vdGUgcmlnaHQgb2YgTm9ybWFsXG4gICAgICAgIFx1MjAyMiBTdG9jayBzYWx1ZGFibGVcbiAgICAgICAgXHUyMDIyIFZlbnRhcyBub3JtYWxlc1xuICAgICAgICBcdTIwMjIgU2luIGFsZXJ0YXNcbiAgICBlbmQgbm90ZVxuXG4gICAgbm90ZSByaWdodCBvZiBNdXlfQmFqb1xuICAgICAgICBcdTIwMjIgUmVxdWllcmUgYXRlbmNpXHUwMGYzblxuICAgICAgICBcdTIwMjIgUHJpb3JpZGFkIGFsdGFcbiAgICAgICAgXHUyMDIyIExpbWl0YXIgY29tcHJhcyBncmFuZGVzXG4gICAgZW5kIG5vdGUiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    stateDiagram-v2["*"] --> Normal: Stock>"= stock_minimo\n+ margen
                    
                        Normal --> Bajo: Stock <= stock_minimo
                    
                        Bajo --> Muy_Bajo: Stock < (stock_minimo / 2)
                    
                        Muy_Bajo --> Critico: Stock <= 5
                    
                        Critico --> Agotado: Stock = 0
                    
                        Bajo --> Normal: Recarga manual\no automática
                        Muy_Bajo --> Normal: Recarga manual\no automática
                        Critico --> Normal: Recarga manual\no automática
                        Agotado --> Normal: Recarga manual\no automática
                    
                        state Normal {
                            [*"] --> Disponible
                            Disponible --> Vendiendo: Pedidos activos
                            Vendiendo --> Disponible: Stock OK
                        }
                    
                        state Bajo{"
                            [*] --> Alerta_Proveedor
                            note right of Alerta_Proveedor
                                • Notificación al proveedor
                                • Recarga auto trigger
                            end note
                        "}
                    
                        state Critico{"
                            [*] --> Alerta_Admin
                            note right of Alerta_Admin
                                • Notificación urgente
                                • Visible en dashboard
                                • Icono de advertencia
                            end note
                        "}
                    
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


.. dropdown:: 📊 Diagrama Objetos("5 diagramas")
    :open:
    :class-container: sd-mb-4

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TB
                        subgraph "Instancias en Runtime - Pedido #1234"
                            usuario1[""👤 usuario1: Usuario\n───────────────\nid: 42\nemail: 'maria@email.com'\nnombre: 'María García'\nrol: 'cliente'\nestado: true""]
                            
                            tienda1[""🏪 tienda1: Tienda\n───────────────\nid: 1\nid_administrador: 1\nnombre: 'Tienda Centro'\ndireccion: 'Calle 10 #5-20'\nactiva: true""]
                            
                            pedido1[""📦 pedido1: Pedido\n───────────────\nid: 1234\nid_cliente: 42\nid_tienda: 1\nestado: 'preparando'\ntotal: 45000.00\nfecha_creacion: '2025-12-04 10:30'\nnotas: 'Entregar antes 5pm'""]
                            
                            detalle1[""📋 detalle1: DetallePedido\n───────────────\nid: 5001\nid_pedido: 1234\nid_producto: 101\ncantidad: 2\nprecio_unitario: 12000.00\nsubtotal: 24000.00""]
                            
                            detalle2[""📋 detalle2: DetallePedido\n───────────────\nid: 5002\nid_pedido: 1234\nid_producto: 205\ncantidad: 3\nprecio_unitario: 7000.00\nsubtotal: 21000.00""]
                            
                            producto1[""📦 producto1: Producto\n───────────────\nid: 101\nid_tienda: 1\nid_proveedor: 15\nnombre: 'Arroz Diana 500g'\nprecio: 12000.00\nstock: 148\ncategoria: 'alimentos'""]
                            
                            producto2[""📦 producto2: Producto\n───────────────\nid: 205\nid_tienda: 1\nid_proveedor: 15\nnombre: 'Aceite Girasol 1L'\nprecio: 7000.00\nstock: 67\ncategoria: 'alimentos'""]
                            
                            proveedor1[""👨‍💼 proveedor1: Usuario\n───────────────\nid: 15\nemail: 'juan@proveedora.com'\nnombre: 'Juan Pérez'\nrol: 'proveedor'\nestado: true""]
                            
                            pago1[""💳 pago1: Pago\n───────────────\nid: 789\nid_usuario: 42\nid_pedido: 1234\nid_estado_pago: 2\nid_metodo_pago: 1\nmonto: 45000.00\nfecha_creacion: '2025-12-04 10:25'""]
                            
                            metodo1[""💰 metodo1: MetodoPago\n───────────────\nid: 1\nnombre: 'Tarjeta Crédito'\nactivo: true""]
                            
                            estado1[""✅ estado1: EstadoPago\n───────────────\nid: 2\nnombre: 'Aprobado'""]
                        end
                        
                        pedido1 -->|id_cliente = 42| usuario1
                        pedido1 -->|id_tienda = 1| tienda1
                        pedido1 -->|detalles| detalle1
                        pedido1 -->|detalles| detalle2
                        pedido1 -->|pagos| pago1
                        
                        detalle1 -->|id_producto = 101| producto1
                        detalle2 -->|id_producto = 205| producto2
                        
                        producto1 -->|id_tienda = 1| tienda1
                        producto2 -->|id_tienda = 1| tienda1
                        producto1 -->|id_proveedor = 15| proveedor1
                        producto2 -->|id_proveedor = 15| proveedor1
                        
                        pago1 -->|id_usuario = 42| usuario1
                        pago1 -->|id_pedido = 1234| pedido1
                        pago1 -->|id_metodo_pago = 1| metodo1
                        pago1 -->|id_estado_pago = 2| estado1

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiSW5zdGFuY2lhcyBlbiBSdW50aW1lIC0gUGVkaWRvICMxMjM0XCJcbiAgICAgICAgdXN1YXJpbzFbXCJcIlx1ZDgzZFx1ZGM2NCB1c3VhcmlvMTogVXN1YXJpb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA0MlxcbmVtYWlsOiAnbWFyaWFAZW1haWwuY29tJ1xcbm5vbWJyZTogJ01hclx1MDBlZGEgR2FyY1x1MDBlZGEnXFxucm9sOiAnY2xpZW50ZSdcXG5lc3RhZG86IHRydWVcIlwiXVxuICAgICAgICBcbiAgICAgICAgdGllbmRhMVtcIlwiXHVkODNjXHVkZmVhIHRpZW5kYTE6IFRpZW5kYVxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAxXFxuaWRfYWRtaW5pc3RyYWRvcjogMVxcbm5vbWJyZTogJ1RpZW5kYSBDZW50cm8nXFxuZGlyZWNjaW9uOiAnQ2FsbGUgMTAgIzUtMjAnXFxuYWN0aXZhOiB0cnVlXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHBlZGlkbzFbXCJcIlx1ZDgzZFx1ZGNlNiBwZWRpZG8xOiBQZWRpZG9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMTIzNFxcbmlkX2NsaWVudGU6IDQyXFxuaWRfdGllbmRhOiAxXFxuZXN0YWRvOiAncHJlcGFyYW5kbydcXG50b3RhbDogNDUwMDAuMDBcXG5mZWNoYV9jcmVhY2lvbjogJzIwMjUtMTItMDQgMTA6MzAnXFxubm90YXM6ICdFbnRyZWdhciBhbnRlcyA1cG0nXCJcIl1cbiAgICAgICAgXG4gICAgICAgIGRldGFsbGUxW1wiXCJcdWQ4M2RcdWRjY2IgZGV0YWxsZTE6IERldGFsbGVQZWRpZG9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogNTAwMVxcbmlkX3BlZGlkbzogMTIzNFxcbmlkX3Byb2R1Y3RvOiAxMDFcXG5jYW50aWRhZDogMlxcbnByZWNpb191bml0YXJpbzogMTIwMDAuMDBcXG5zdWJ0b3RhbDogMjQwMDAuMDBcIlwiXVxuICAgICAgICBcbiAgICAgICAgZGV0YWxsZTJbXCJcIlx1ZDgzZFx1ZGNjYiBkZXRhbGxlMjogRGV0YWxsZVBlZGlkb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA1MDAyXFxuaWRfcGVkaWRvOiAxMjM0XFxuaWRfcHJvZHVjdG86IDIwNVxcbmNhbnRpZGFkOiAzXFxucHJlY2lvX3VuaXRhcmlvOiA3MDAwLjAwXFxuc3VidG90YWw6IDIxMDAwLjAwXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHByb2R1Y3RvMVtcIlwiXHVkODNkXHVkY2U2IHByb2R1Y3RvMTogUHJvZHVjdG9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMTAxXFxuaWRfdGllbmRhOiAxXFxuaWRfcHJvdmVlZG9yOiAxNVxcbm5vbWJyZTogJ0Fycm96IERpYW5hIDUwMGcnXFxucHJlY2lvOiAxMjAwMC4wMFxcbnN0b2NrOiAxNDhcXG5jYXRlZ29yaWE6ICdhbGltZW50b3MnXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHByb2R1Y3RvMltcIlwiXHVkODNkXHVkY2U2IHByb2R1Y3RvMjogUHJvZHVjdG9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMjA1XFxuaWRfdGllbmRhOiAxXFxuaWRfcHJvdmVlZG9yOiAxNVxcbm5vbWJyZTogJ0FjZWl0ZSBHaXJhc29sIDFMJ1xcbnByZWNpbzogNzAwMC4wMFxcbnN0b2NrOiA2N1xcbmNhdGVnb3JpYTogJ2FsaW1lbnRvcydcIlwiXVxuICAgICAgICBcbiAgICAgICAgcHJvdmVlZG9yMVtcIlwiXHVkODNkXHVkYzY4XHUyMDBkXHVkODNkXHVkY2JjIHByb3ZlZWRvcjE6IFVzdWFyaW9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMTVcXG5lbWFpbDogJ2p1YW5AcHJvdmVlZG9yYS5jb20nXFxubm9tYnJlOiAnSnVhbiBQXHUwMGU5cmV6J1xcbnJvbDogJ3Byb3ZlZWRvcidcXG5lc3RhZG86IHRydWVcIlwiXVxuICAgICAgICBcbiAgICAgICAgcGFnbzFbXCJcIlx1ZDgzZFx1ZGNiMyBwYWdvMTogUGFnb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA3ODlcXG5pZF91c3VhcmlvOiA0MlxcbmlkX3BlZGlkbzogMTIzNFxcbmlkX2VzdGFkb19wYWdvOiAyXFxuaWRfbWV0b2RvX3BhZ286IDFcXG5tb250bzogNDUwMDAuMDBcXG5mZWNoYV9jcmVhY2lvbjogJzIwMjUtMTItMDQgMTA6MjUnXCJcIl1cbiAgICAgICAgXG4gICAgICAgIG1ldG9kbzFbXCJcIlx1ZDgzZFx1ZGNiMCBtZXRvZG8xOiBNZXRvZG9QYWdvXFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDFcXG5ub21icmU6ICdUYXJqZXRhIENyXHUwMGU5ZGl0bydcXG5hY3Rpdm86IHRydWVcIlwiXVxuICAgICAgICBcbiAgICAgICAgZXN0YWRvMVtcIlwiXHUyNzA1IGVzdGFkbzE6IEVzdGFkb1BhZ29cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMlxcbm5vbWJyZTogJ0Fwcm9iYWRvJ1wiXCJdXG4gICAgZW5kXG4gICAgXG4gICAgcGVkaWRvMSAtLT58aWRfY2xpZW50ZSA9IDQyfCB1c3VhcmlvMVxuICAgIHBlZGlkbzEgLS0+fGlkX3RpZW5kYSA9IDF8IHRpZW5kYTFcbiAgICBwZWRpZG8xIC0tPnxkZXRhbGxlc3wgZGV0YWxsZTFcbiAgICBwZWRpZG8xIC0tPnxkZXRhbGxlc3wgZGV0YWxsZTJcbiAgICBwZWRpZG8xIC0tPnxwYWdvc3wgcGFnbzFcbiAgICBcbiAgICBkZXRhbGxlMSAtLT58aWRfcHJvZHVjdG8gPSAxMDF8IHByb2R1Y3RvMVxuICAgIGRldGFsbGUyIC0tPnxpZF9wcm9kdWN0byA9IDIwNXwgcHJvZHVjdG8yXG4gICAgXG4gICAgcHJvZHVjdG8xIC0tPnxpZF90aWVuZGEgPSAxfCB0aWVuZGExXG4gICAgcHJvZHVjdG8yIC0tPnxpZF90aWVuZGEgPSAxfCB0aWVuZGExXG4gICAgcHJvZHVjdG8xIC0tPnxpZF9wcm92ZWVkb3IgPSAxNXwgcHJvdmVlZG9yMVxuICAgIHByb2R1Y3RvMiAtLT58aWRfcHJvdmVlZG9yID0gMTV8IHByb3ZlZWRvcjFcbiAgICBcbiAgICBwYWdvMSAtLT58aWRfdXN1YXJpbyA9IDQyfCB1c3VhcmlvMVxuICAgIHBhZ28xIC0tPnxpZF9wZWRpZG8gPSAxMjM0fCBwZWRpZG8xXG4gICAgcGFnbzEgLS0+fGlkX21ldG9kb19wYWdvID0gMXwgbWV0b2RvMVxuICAgIHBhZ28xIC0tPnxpZF9lc3RhZG9fcGFnbyA9IDJ8IGVzdGFkbzEiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiSW5zdGFuY2lhcyBlbiBSdW50aW1lIC0gUGVkaWRvICMxMjM0XCJcbiAgICAgICAgdXN1YXJpbzFbXCJcIlx1ZDgzZFx1ZGM2NCB1c3VhcmlvMTogVXN1YXJpb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA0MlxcbmVtYWlsOiAnbWFyaWFAZW1haWwuY29tJ1xcbm5vbWJyZTogJ01hclx1MDBlZGEgR2FyY1x1MDBlZGEnXFxucm9sOiAnY2xpZW50ZSdcXG5lc3RhZG86IHRydWVcIlwiXVxuICAgICAgICBcbiAgICAgICAgdGllbmRhMVtcIlwiXHVkODNjXHVkZmVhIHRpZW5kYTE6IFRpZW5kYVxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAxXFxuaWRfYWRtaW5pc3RyYWRvcjogMVxcbm5vbWJyZTogJ1RpZW5kYSBDZW50cm8nXFxuZGlyZWNjaW9uOiAnQ2FsbGUgMTAgIzUtMjAnXFxuYWN0aXZhOiB0cnVlXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHBlZGlkbzFbXCJcIlx1ZDgzZFx1ZGNlNiBwZWRpZG8xOiBQZWRpZG9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMTIzNFxcbmlkX2NsaWVudGU6IDQyXFxuaWRfdGllbmRhOiAxXFxuZXN0YWRvOiAncHJlcGFyYW5kbydcXG50b3RhbDogNDUwMDAuMDBcXG5mZWNoYV9jcmVhY2lvbjogJzIwMjUtMTItMDQgMTA6MzAnXFxubm90YXM6ICdFbnRyZWdhciBhbnRlcyA1cG0nXCJcIl1cbiAgICAgICAgXG4gICAgICAgIGRldGFsbGUxW1wiXCJcdWQ4M2RcdWRjY2IgZGV0YWxsZTE6IERldGFsbGVQZWRpZG9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogNTAwMVxcbmlkX3BlZGlkbzogMTIzNFxcbmlkX3Byb2R1Y3RvOiAxMDFcXG5jYW50aWRhZDogMlxcbnByZWNpb191bml0YXJpbzogMTIwMDAuMDBcXG5zdWJ0b3RhbDogMjQwMDAuMDBcIlwiXVxuICAgICAgICBcbiAgICAgICAgZGV0YWxsZTJbXCJcIlx1ZDgzZFx1ZGNjYiBkZXRhbGxlMjogRGV0YWxsZVBlZGlkb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA1MDAyXFxuaWRfcGVkaWRvOiAxMjM0XFxuaWRfcHJvZHVjdG86IDIwNVxcbmNhbnRpZGFkOiAzXFxucHJlY2lvX3VuaXRhcmlvOiA3MDAwLjAwXFxuc3VidG90YWw6IDIxMDAwLjAwXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHByb2R1Y3RvMVtcIlwiXHVkODNkXHVkY2U2IHByb2R1Y3RvMTogUHJvZHVjdG9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMTAxXFxuaWRfdGllbmRhOiAxXFxuaWRfcHJvdmVlZG9yOiAxNVxcbm5vbWJyZTogJ0Fycm96IERpYW5hIDUwMGcnXFxucHJlY2lvOiAxMjAwMC4wMFxcbnN0b2NrOiAxNDhcXG5jYXRlZ29yaWE6ICdhbGltZW50b3MnXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHByb2R1Y3RvMltcIlwiXHVkODNkXHVkY2U2IHByb2R1Y3RvMjogUHJvZHVjdG9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMjA1XFxuaWRfdGllbmRhOiAxXFxuaWRfcHJvdmVlZG9yOiAxNVxcbm5vbWJyZTogJ0FjZWl0ZSBHaXJhc29sIDFMJ1xcbnByZWNpbzogNzAwMC4wMFxcbnN0b2NrOiA2N1xcbmNhdGVnb3JpYTogJ2FsaW1lbnRvcydcIlwiXVxuICAgICAgICBcbiAgICAgICAgcHJvdmVlZG9yMVtcIlwiXHVkODNkXHVkYzY4XHUyMDBkXHVkODNkXHVkY2JjIHByb3ZlZWRvcjE6IFVzdWFyaW9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMTVcXG5lbWFpbDogJ2p1YW5AcHJvdmVlZG9yYS5jb20nXFxubm9tYnJlOiAnSnVhbiBQXHUwMGU5cmV6J1xcbnJvbDogJ3Byb3ZlZWRvcidcXG5lc3RhZG86IHRydWVcIlwiXVxuICAgICAgICBcbiAgICAgICAgcGFnbzFbXCJcIlx1ZDgzZFx1ZGNiMyBwYWdvMTogUGFnb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA3ODlcXG5pZF91c3VhcmlvOiA0MlxcbmlkX3BlZGlkbzogMTIzNFxcbmlkX2VzdGFkb19wYWdvOiAyXFxuaWRfbWV0b2RvX3BhZ286IDFcXG5tb250bzogNDUwMDAuMDBcXG5mZWNoYV9jcmVhY2lvbjogJzIwMjUtMTItMDQgMTA6MjUnXCJcIl1cbiAgICAgICAgXG4gICAgICAgIG1ldG9kbzFbXCJcIlx1ZDgzZFx1ZGNiMCBtZXRvZG8xOiBNZXRvZG9QYWdvXFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDFcXG5ub21icmU6ICdUYXJqZXRhIENyXHUwMGU5ZGl0bydcXG5hY3Rpdm86IHRydWVcIlwiXVxuICAgICAgICBcbiAgICAgICAgZXN0YWRvMVtcIlwiXHUyNzA1IGVzdGFkbzE6IEVzdGFkb1BhZ29cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMlxcbm5vbWJyZTogJ0Fwcm9iYWRvJ1wiXCJdXG4gICAgZW5kXG4gICAgXG4gICAgcGVkaWRvMSAtLT58aWRfY2xpZW50ZSA9IDQyfCB1c3VhcmlvMVxuICAgIHBlZGlkbzEgLS0+fGlkX3RpZW5kYSA9IDF8IHRpZW5kYTFcbiAgICBwZWRpZG8xIC0tPnxkZXRhbGxlc3wgZGV0YWxsZTFcbiAgICBwZWRpZG8xIC0tPnxkZXRhbGxlc3wgZGV0YWxsZTJcbiAgICBwZWRpZG8xIC0tPnxwYWdvc3wgcGFnbzFcbiAgICBcbiAgICBkZXRhbGxlMSAtLT58aWRfcHJvZHVjdG8gPSAxMDF8IHByb2R1Y3RvMVxuICAgIGRldGFsbGUyIC0tPnxpZF9wcm9kdWN0byA9IDIwNXwgcHJvZHVjdG8yXG4gICAgXG4gICAgcHJvZHVjdG8xIC0tPnxpZF90aWVuZGEgPSAxfCB0aWVuZGExXG4gICAgcHJvZHVjdG8yIC0tPnxpZF90aWVuZGEgPSAxfCB0aWVuZGExXG4gICAgcHJvZHVjdG8xIC0tPnxpZF9wcm92ZWVkb3IgPSAxNXwgcHJvdmVlZG9yMVxuICAgIHByb2R1Y3RvMiAtLT58aWRfcHJvdmVlZG9yID0gMTV8IHByb3ZlZWRvcjFcbiAgICBcbiAgICBwYWdvMSAtLT58aWRfdXN1YXJpbyA9IDQyfCB1c3VhcmlvMVxuICAgIHBhZ28xIC0tPnxpZF9wZWRpZG8gPSAxMjM0fCBwZWRpZG8xXG4gICAgcGFnbzEgLS0+fGlkX21ldG9kb19wYWdvID0gMXwgbWV0b2RvMVxuICAgIHBhZ28xIC0tPnxpZF9lc3RhZG9fcGFnbyA9IDJ8IGVzdGFkbzEiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TB
                        subgraph "Instancias en Runtime - Pedido #1234"
                            usuario1[""👤 usuario1: Usuario\n───────────────\nid: 42\nemail: 'maria@email.com'\nnombre: 'María García'\nrol: 'cliente'\nestado: true""]
                            
                            tienda1[""🏪 tienda1: Tienda\n───────────────\nid: 1\nid_administrador: 1\nnombre: 'Tienda Centro'\ndireccion: 'Calle 10 #5-20'\nactiva: true""]
                            
                            pedido1[""📦 pedido1: Pedido\n───────────────\nid: 1234\nid_cliente: 42\nid_tienda: 1\nestado: 'preparando'\ntotal: 45000.00\nfecha_creacion: '2025-12-04 10:30'\nnotas: 'Entregar antes 5pm'""]
                            
                            detalle1[""📋 detalle1: DetallePedido\n───────────────\nid: 5001\nid_pedido: 1234\nid_producto: 101\ncantidad: 2\nprecio_unitario: 12000.00\nsubtotal: 24000.00""]
                            
                            detalle2[""📋 detalle2: DetallePedido\n───────────────\nid: 5002\nid_pedido: 1234\nid_producto: 205\ncantidad: 3\nprecio_unitario: 7000.00\nsubtotal: 21000.00""]
                            
                            producto1[""📦 producto1: Producto\n───────────────\nid: 101\nid_tienda: 1\nid_proveedor: 15\nnombre: 'Arroz Diana 500g'\nprecio: 12000.00\nstock: 148\ncategoria: 'alimentos'""]
                            
                            producto2[""📦 producto2: Producto\n───────────────\nid: 205\nid_tienda: 1\nid_proveedor: 15\nnombre: 'Aceite Girasol 1L'\nprecio: 7000.00\nstock: 67\ncategoria: 'alimentos'""]
                            
                            proveedor1[""👨‍💼 proveedor1: Usuario\n───────────────\nid: 15\nemail: 'juan@proveedora.com'\nnombre: 'Juan Pérez'\nrol: 'proveedor'\nestado: true""]
                            
                            pago1[""💳 pago1: Pago\n───────────────\nid: 789\nid_usuario: 42\nid_pedido: 1234\nid_estado_pago: 2\nid_metodo_pago: 1\nmonto: 45000.00\nfecha_creacion: '2025-12-04 10:25'""]
                            
                            metodo1[""💰 metodo1: MetodoPago\n───────────────\nid: 1\nnombre: 'Tarjeta Crédito'\nactivo: true""]
                            
                            estado1[""✅ estado1: EstadoPago\n───────────────\nid: 2\nnombre: 'Aprobado'""]
                        end
                        
                        pedido1 -->|id_cliente = 42| usuario1
                        pedido1 -->|id_tienda = 1| tienda1
                        pedido1 -->|detalles| detalle1
                        pedido1 -->|detalles| detalle2
                        pedido1 -->|pagos| pago1
                        
                        detalle1 -->|id_producto = 101| producto1
                        detalle2 -->|id_producto = 205| producto2
                        
                        producto1 -->|id_tienda = 1| tienda1
                        producto2 -->|id_tienda = 1| tienda1
                        producto1 -->|id_proveedor = 15| proveedor1
                        producto2 -->|id_proveedor = 15| proveedor1
                        
                        pago1 -->|id_usuario = 42| usuario1
                        pago1 -->|id_pedido = 1234| pedido1
                        pago1 -->|id_metodo_pago = 1| metodo1
                        pago1 -->|id_estado_pago = 2| estado1

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TB
                        subgraph "Sistema de Stock - Producto con Alerta"
                            producto_leche[""📦 producto_leche: Producto\n───────────────\nid: 301\nnombre: 'Leche Entera 1L'\nprecio: 4500.00\nstock: 8 🔴\nes_basico: true\nactivo: true""]
                            
                            config_leche[""⚙️ config_leche: StockConfig\n───────────────\nid: 45\nstock_minimo: 10\ncantidad_recarga: 50\nrecarga_automatica_activa: true\nultima_recarga: '2025-12-03 08:00'\ntotal_recargas: 12""]
                            
                            historial1[""📝 historial1: HistorialRecarga\n───────────────\nid: 890\ncantidad: 50\nstock_anterior: 3\nstock_nuevo: 53\ntipo: 'automatica'\nfecha_creacion: '2025-12-03 08:00'""]
                            
                            historial2[""📝 historial2: HistorialRecarga\n───────────────\nid: 891\ncantidad: 10\nstock_anterior: 53\nstock_nuevo: 63\ntipo: 'manual'\nfecha_creacion: '2025-12-03 14:30'""]
                            
                            proveedor_lacteos[""👨‍💼 proveedor_lacteos: Usuario\n───────────────\nid: 18\nemail: 'ana@lacteos.com'\nnombre: 'Ana Rodríguez'\nrol: 'proveedor'""]
                            
                            notif1[""📧 notif1: Notificacion\n───────────────\nid: 2345\nmensaje: 'Stock bajo: Leche...'\nleida: true\nfecha_lectura: '2025-12-03 08:05'""]
                            
                            tipo_notif[""🔔 tipo_notif: TipoNotificacion\n───────────────\nid: 3\nnombre: 'Stock Bajo'""]
                        end
                        
                        producto_leche -->|config_stock| config_leche
                        producto_leche -->|historial_recargas| historial1
                        producto_leche -->|historial_recargas| historial2
                        producto_leche -->|proveedor| proveedor_lacteos
                        
                        historial1 -->|producto| producto_leche
                        historial2 -->|producto| producto_leche
                        historial2 -->|usuario| proveedor_lacteos
                        
                        notif1 -->|usuario| proveedor_lacteos
                        notif1 -->|tipo| tipo_notif

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiU2lzdGVtYSBkZSBTdG9jayAtIFByb2R1Y3RvIGNvbiBBbGVydGFcIlxuICAgICAgICBwcm9kdWN0b19sZWNoZVtcIlwiXHVkODNkXHVkY2U2IHByb2R1Y3RvX2xlY2hlOiBQcm9kdWN0b1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAzMDFcXG5ub21icmU6ICdMZWNoZSBFbnRlcmEgMUwnXFxucHJlY2lvOiA0NTAwLjAwXFxuc3RvY2s6IDggXHVkODNkXHVkZDM0XFxuZXNfYmFzaWNvOiB0cnVlXFxuYWN0aXZvOiB0cnVlXCJcIl1cbiAgICAgICAgXG4gICAgICAgIGNvbmZpZ19sZWNoZVtcIlwiXHUyNjk5XHVmZTBmIGNvbmZpZ19sZWNoZTogU3RvY2tDb25maWdcXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogNDVcXG5zdG9ja19taW5pbW86IDEwXFxuY2FudGlkYWRfcmVjYXJnYTogNTBcXG5yZWNhcmdhX2F1dG9tYXRpY2FfYWN0aXZhOiB0cnVlXFxudWx0aW1hX3JlY2FyZ2E6ICcyMDI1LTEyLTAzIDA4OjAwJ1xcbnRvdGFsX3JlY2FyZ2FzOiAxMlwiXCJdXG4gICAgICAgIFxuICAgICAgICBoaXN0b3JpYWwxW1wiXCJcdWQ4M2RcdWRjZGQgaGlzdG9yaWFsMTogSGlzdG9yaWFsUmVjYXJnYVxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA4OTBcXG5jYW50aWRhZDogNTBcXG5zdG9ja19hbnRlcmlvcjogM1xcbnN0b2NrX251ZXZvOiA1M1xcbnRpcG86ICdhdXRvbWF0aWNhJ1xcbmZlY2hhX2NyZWFjaW9uOiAnMjAyNS0xMi0wMyAwODowMCdcIlwiXVxuICAgICAgICBcbiAgICAgICAgaGlzdG9yaWFsMltcIlwiXHVkODNkXHVkY2RkIGhpc3RvcmlhbDI6IEhpc3RvcmlhbFJlY2FyZ2FcXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogODkxXFxuY2FudGlkYWQ6IDEwXFxuc3RvY2tfYW50ZXJpb3I6IDUzXFxuc3RvY2tfbnVldm86IDYzXFxudGlwbzogJ21hbnVhbCdcXG5mZWNoYV9jcmVhY2lvbjogJzIwMjUtMTItMDMgMTQ6MzAnXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHByb3ZlZWRvcl9sYWN0ZW9zW1wiXCJcdWQ4M2RcdWRjNjhcdTIwMGRcdWQ4M2RcdWRjYmMgcHJvdmVlZG9yX2xhY3Rlb3M6IFVzdWFyaW9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMThcXG5lbWFpbDogJ2FuYUBsYWN0ZW9zLmNvbSdcXG5ub21icmU6ICdBbmEgUm9kclx1MDBlZGd1ZXonXFxucm9sOiAncHJvdmVlZG9yJ1wiXCJdXG4gICAgICAgIFxuICAgICAgICBub3RpZjFbXCJcIlx1ZDgzZFx1ZGNlNyBub3RpZjE6IE5vdGlmaWNhY2lvblxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAyMzQ1XFxubWVuc2FqZTogJ1N0b2NrIGJham86IExlY2hlLi4uJ1xcbmxlaWRhOiB0cnVlXFxuZmVjaGFfbGVjdHVyYTogJzIwMjUtMTItMDMgMDg6MDUnXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHRpcG9fbm90aWZbXCJcIlx1ZDgzZFx1ZGQxNCB0aXBvX25vdGlmOiBUaXBvTm90aWZpY2FjaW9uXFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDNcXG5ub21icmU6ICdTdG9jayBCYWpvJ1wiXCJdXG4gICAgZW5kXG4gICAgXG4gICAgcHJvZHVjdG9fbGVjaGUgLS0+fGNvbmZpZ19zdG9ja3wgY29uZmlnX2xlY2hlXG4gICAgcHJvZHVjdG9fbGVjaGUgLS0+fGhpc3RvcmlhbF9yZWNhcmdhc3wgaGlzdG9yaWFsMVxuICAgIHByb2R1Y3RvX2xlY2hlIC0tPnxoaXN0b3JpYWxfcmVjYXJnYXN8IGhpc3RvcmlhbDJcbiAgICBwcm9kdWN0b19sZWNoZSAtLT58cHJvdmVlZG9yfCBwcm92ZWVkb3JfbGFjdGVvc1xuICAgIFxuICAgIGhpc3RvcmlhbDEgLS0+fHByb2R1Y3RvfCBwcm9kdWN0b19sZWNoZVxuICAgIGhpc3RvcmlhbDIgLS0+fHByb2R1Y3RvfCBwcm9kdWN0b19sZWNoZVxuICAgIGhpc3RvcmlhbDIgLS0+fHVzdWFyaW98IHByb3ZlZWRvcl9sYWN0ZW9zXG4gICAgXG4gICAgbm90aWYxIC0tPnx1c3VhcmlvfCBwcm92ZWVkb3JfbGFjdGVvc1xuICAgIG5vdGlmMSAtLT58dGlwb3wgdGlwb19ub3RpZiIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiU2lzdGVtYSBkZSBTdG9jayAtIFByb2R1Y3RvIGNvbiBBbGVydGFcIlxuICAgICAgICBwcm9kdWN0b19sZWNoZVtcIlwiXHVkODNkXHVkY2U2IHByb2R1Y3RvX2xlY2hlOiBQcm9kdWN0b1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAzMDFcXG5ub21icmU6ICdMZWNoZSBFbnRlcmEgMUwnXFxucHJlY2lvOiA0NTAwLjAwXFxuc3RvY2s6IDggXHVkODNkXHVkZDM0XFxuZXNfYmFzaWNvOiB0cnVlXFxuYWN0aXZvOiB0cnVlXCJcIl1cbiAgICAgICAgXG4gICAgICAgIGNvbmZpZ19sZWNoZVtcIlwiXHUyNjk5XHVmZTBmIGNvbmZpZ19sZWNoZTogU3RvY2tDb25maWdcXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogNDVcXG5zdG9ja19taW5pbW86IDEwXFxuY2FudGlkYWRfcmVjYXJnYTogNTBcXG5yZWNhcmdhX2F1dG9tYXRpY2FfYWN0aXZhOiB0cnVlXFxudWx0aW1hX3JlY2FyZ2E6ICcyMDI1LTEyLTAzIDA4OjAwJ1xcbnRvdGFsX3JlY2FyZ2FzOiAxMlwiXCJdXG4gICAgICAgIFxuICAgICAgICBoaXN0b3JpYWwxW1wiXCJcdWQ4M2RcdWRjZGQgaGlzdG9yaWFsMTogSGlzdG9yaWFsUmVjYXJnYVxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA4OTBcXG5jYW50aWRhZDogNTBcXG5zdG9ja19hbnRlcmlvcjogM1xcbnN0b2NrX251ZXZvOiA1M1xcbnRpcG86ICdhdXRvbWF0aWNhJ1xcbmZlY2hhX2NyZWFjaW9uOiAnMjAyNS0xMi0wMyAwODowMCdcIlwiXVxuICAgICAgICBcbiAgICAgICAgaGlzdG9yaWFsMltcIlwiXHVkODNkXHVkY2RkIGhpc3RvcmlhbDI6IEhpc3RvcmlhbFJlY2FyZ2FcXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogODkxXFxuY2FudGlkYWQ6IDEwXFxuc3RvY2tfYW50ZXJpb3I6IDUzXFxuc3RvY2tfbnVldm86IDYzXFxudGlwbzogJ21hbnVhbCdcXG5mZWNoYV9jcmVhY2lvbjogJzIwMjUtMTItMDMgMTQ6MzAnXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHByb3ZlZWRvcl9sYWN0ZW9zW1wiXCJcdWQ4M2RcdWRjNjhcdTIwMGRcdWQ4M2RcdWRjYmMgcHJvdmVlZG9yX2xhY3Rlb3M6IFVzdWFyaW9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMThcXG5lbWFpbDogJ2FuYUBsYWN0ZW9zLmNvbSdcXG5ub21icmU6ICdBbmEgUm9kclx1MDBlZGd1ZXonXFxucm9sOiAncHJvdmVlZG9yJ1wiXCJdXG4gICAgICAgIFxuICAgICAgICBub3RpZjFbXCJcIlx1ZDgzZFx1ZGNlNyBub3RpZjE6IE5vdGlmaWNhY2lvblxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAyMzQ1XFxubWVuc2FqZTogJ1N0b2NrIGJham86IExlY2hlLi4uJ1xcbmxlaWRhOiB0cnVlXFxuZmVjaGFfbGVjdHVyYTogJzIwMjUtMTItMDMgMDg6MDUnXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHRpcG9fbm90aWZbXCJcIlx1ZDgzZFx1ZGQxNCB0aXBvX25vdGlmOiBUaXBvTm90aWZpY2FjaW9uXFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDNcXG5ub21icmU6ICdTdG9jayBCYWpvJ1wiXCJdXG4gICAgZW5kXG4gICAgXG4gICAgcHJvZHVjdG9fbGVjaGUgLS0+fGNvbmZpZ19zdG9ja3wgY29uZmlnX2xlY2hlXG4gICAgcHJvZHVjdG9fbGVjaGUgLS0+fGhpc3RvcmlhbF9yZWNhcmdhc3wgaGlzdG9yaWFsMVxuICAgIHByb2R1Y3RvX2xlY2hlIC0tPnxoaXN0b3JpYWxfcmVjYXJnYXN8IGhpc3RvcmlhbDJcbiAgICBwcm9kdWN0b19sZWNoZSAtLT58cHJvdmVlZG9yfCBwcm92ZWVkb3JfbGFjdGVvc1xuICAgIFxuICAgIGhpc3RvcmlhbDEgLS0+fHByb2R1Y3RvfCBwcm9kdWN0b19sZWNoZVxuICAgIGhpc3RvcmlhbDIgLS0+fHByb2R1Y3RvfCBwcm9kdWN0b19sZWNoZVxuICAgIGhpc3RvcmlhbDIgLS0+fHVzdWFyaW98IHByb3ZlZWRvcl9sYWN0ZW9zXG4gICAgXG4gICAgbm90aWYxIC0tPnx1c3VhcmlvfCBwcm92ZWVkb3JfbGFjdGVvc1xuICAgIG5vdGlmMSAtLT58dGlwb3wgdGlwb19ub3RpZiIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TB
                        subgraph "Sistema de Stock - Producto con Alerta"
                            producto_leche[""📦 producto_leche: Producto\n───────────────\nid: 301\nnombre: 'Leche Entera 1L'\nprecio: 4500.00\nstock: 8 🔴\nes_basico: true\nactivo: true""]
                            
                            config_leche[""⚙️ config_leche: StockConfig\n───────────────\nid: 45\nstock_minimo: 10\ncantidad_recarga: 50\nrecarga_automatica_activa: true\nultima_recarga: '2025-12-03 08:00'\ntotal_recargas: 12""]
                            
                            historial1[""📝 historial1: HistorialRecarga\n───────────────\nid: 890\ncantidad: 50\nstock_anterior: 3\nstock_nuevo: 53\ntipo: 'automatica'\nfecha_creacion: '2025-12-03 08:00'""]
                            
                            historial2[""📝 historial2: HistorialRecarga\n───────────────\nid: 891\ncantidad: 10\nstock_anterior: 53\nstock_nuevo: 63\ntipo: 'manual'\nfecha_creacion: '2025-12-03 14:30'""]
                            
                            proveedor_lacteos[""👨‍💼 proveedor_lacteos: Usuario\n───────────────\nid: 18\nemail: 'ana@lacteos.com'\nnombre: 'Ana Rodríguez'\nrol: 'proveedor'""]
                            
                            notif1[""📧 notif1: Notificacion\n───────────────\nid: 2345\nmensaje: 'Stock bajo: Leche...'\nleida: true\nfecha_lectura: '2025-12-03 08:05'""]
                            
                            tipo_notif[""🔔 tipo_notif: TipoNotificacion\n───────────────\nid: 3\nnombre: 'Stock Bajo'""]
                        end
                        
                        producto_leche -->|config_stock| config_leche
                        producto_leche -->|historial_recargas| historial1
                        producto_leche -->|historial_recargas| historial2
                        producto_leche -->|proveedor| proveedor_lacteos
                        
                        historial1 -->|producto| producto_leche
                        historial2 -->|producto| producto_leche
                        historial2 -->|usuario| proveedor_lacteos
                        
                        notif1 -->|usuario| proveedor_lacteos
                        notif1 -->|tipo| tipo_notif

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TB
                        subgraph "Usuario Admin con Context"
                            admin1[""👨‍💼 admin1: Usuario\n───────────────\nid: 1\nemail: 'admin@prexcol.com'\nnombre: 'Carlos Admin'\nrol: 'admin'\nis_staff: true\nis_superuser: true\nself_deactivated: false\nadmin_suspended: false\nultimo_ingreso: '2025-12-04 13:00'""]
                            
                            pass_hist1[""🔐 pass_hist1: PasswordHistory\n───────────────\nid: 101\npassword_hash: 'pbkdf2_sha256$...'\nfecha_creacion: '2025-10-01'""]
                            
                            pass_hist2[""🔐 pass_hist2: PasswordHistory\n───────────────\nid: 102\npassword_hash: 'pbkdf2_sha256$...'\nfecha_creacion: '2025-11-15'""]
                            
                            pass_hist3[""🔐 pass_hist3: PasswordHistory\n───────────────\nid: 103\npassword_hash: 'pbkdf2_sha256$...'\nfecha_creacion: '2025-12-01'\n(actual)""]
                            
                            tienda_centro[""🏪 tienda_centro: Tienda\n───────────────\nid: 1\nnombre: 'Tienda Centro'\nactiva: true""]
                            
                            tienda_norte[""🏪 tienda_norte: Tienda\n───────────────\nid: 2\nnombre: 'Tienda Norte'\nactiva: true""]
                            
                            tienda_sur[""🏪 tienda_sur: Tienda\n───────────────\nid: 3\nnombre: 'Tienda Sur'\nactiva: false""]
                        end
                        
                        admin1 -->|password_history| pass_hist1
                        admin1 -->|password_history| pass_hist2
                        admin1 -->|password_history| pass_hist3
                        admin1 -->|tiendas_administradas| tienda_centro
                        admin1 -->|tiendas_administradas| tienda_norte
                        admin1 -->|tiendas_administradas| tienda_sur
                        
                        tienda_centro -->|administrador| admin1
                        tienda_norte -->|administrador| admin1
                        tienda_sur -->|administrador| admin1

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiVXN1YXJpbyBBZG1pbiBjb24gQ29udGV4dFwiXG4gICAgICAgIGFkbWluMVtcIlwiXHVkODNkXHVkYzY4XHUyMDBkXHVkODNkXHVkY2JjIGFkbWluMTogVXN1YXJpb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAxXFxuZW1haWw6ICdhZG1pbkBwcmV4Y29sLmNvbSdcXG5ub21icmU6ICdDYXJsb3MgQWRtaW4nXFxucm9sOiAnYWRtaW4nXFxuaXNfc3RhZmY6IHRydWVcXG5pc19zdXBlcnVzZXI6IHRydWVcXG5zZWxmX2RlYWN0aXZhdGVkOiBmYWxzZVxcbmFkbWluX3N1c3BlbmRlZDogZmFsc2VcXG51bHRpbW9faW5ncmVzbzogJzIwMjUtMTItMDQgMTM6MDAnXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHBhc3NfaGlzdDFbXCJcIlx1ZDgzZFx1ZGQxMCBwYXNzX2hpc3QxOiBQYXNzd29yZEhpc3RvcnlcXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMTAxXFxucGFzc3dvcmRfaGFzaDogJ3Bia2RmMl9zaGEyNTYkLi4uJ1xcbmZlY2hhX2NyZWFjaW9uOiAnMjAyNS0xMC0wMSdcIlwiXVxuICAgICAgICBcbiAgICAgICAgcGFzc19oaXN0MltcIlwiXHVkODNkXHVkZDEwIHBhc3NfaGlzdDI6IFBhc3N3b3JkSGlzdG9yeVxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAxMDJcXG5wYXNzd29yZF9oYXNoOiAncGJrZGYyX3NoYTI1NiQuLi4nXFxuZmVjaGFfY3JlYWNpb246ICcyMDI1LTExLTE1J1wiXCJdXG4gICAgICAgIFxuICAgICAgICBwYXNzX2hpc3QzW1wiXCJcdWQ4M2RcdWRkMTAgcGFzc19oaXN0MzogUGFzc3dvcmRIaXN0b3J5XFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDEwM1xcbnBhc3N3b3JkX2hhc2g6ICdwYmtkZjJfc2hhMjU2JC4uLidcXG5mZWNoYV9jcmVhY2lvbjogJzIwMjUtMTItMDEnXFxuKGFjdHVhbClcIlwiXVxuICAgICAgICBcbiAgICAgICAgdGllbmRhX2NlbnRyb1tcIlwiXHVkODNjXHVkZmVhIHRpZW5kYV9jZW50cm86IFRpZW5kYVxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAxXFxubm9tYnJlOiAnVGllbmRhIENlbnRybydcXG5hY3RpdmE6IHRydWVcIlwiXVxuICAgICAgICBcbiAgICAgICAgdGllbmRhX25vcnRlW1wiXCJcdWQ4M2NcdWRmZWEgdGllbmRhX25vcnRlOiBUaWVuZGFcXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMlxcbm5vbWJyZTogJ1RpZW5kYSBOb3J0ZSdcXG5hY3RpdmE6IHRydWVcIlwiXVxuICAgICAgICBcbiAgICAgICAgdGllbmRhX3N1cltcIlwiXHVkODNjXHVkZmVhIHRpZW5kYV9zdXI6IFRpZW5kYVxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAzXFxubm9tYnJlOiAnVGllbmRhIFN1cidcXG5hY3RpdmE6IGZhbHNlXCJcIl1cbiAgICBlbmRcbiAgICBcbiAgICBhZG1pbjEgLS0+fHBhc3N3b3JkX2hpc3Rvcnl8IHBhc3NfaGlzdDFcbiAgICBhZG1pbjEgLS0+fHBhc3N3b3JkX2hpc3Rvcnl8IHBhc3NfaGlzdDJcbiAgICBhZG1pbjEgLS0+fHBhc3N3b3JkX2hpc3Rvcnl8IHBhc3NfaGlzdDNcbiAgICBhZG1pbjEgLS0+fHRpZW5kYXNfYWRtaW5pc3RyYWRhc3wgdGllbmRhX2NlbnRyb1xuICAgIGFkbWluMSAtLT58dGllbmRhc19hZG1pbmlzdHJhZGFzfCB0aWVuZGFfbm9ydGVcbiAgICBhZG1pbjEgLS0+fHRpZW5kYXNfYWRtaW5pc3RyYWRhc3wgdGllbmRhX3N1clxuICAgIFxuICAgIHRpZW5kYV9jZW50cm8gLS0+fGFkbWluaXN0cmFkb3J8IGFkbWluMVxuICAgIHRpZW5kYV9ub3J0ZSAtLT58YWRtaW5pc3RyYWRvcnwgYWRtaW4xXG4gICAgdGllbmRhX3N1ciAtLT58YWRtaW5pc3RyYWRvcnwgYWRtaW4xIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiVXN1YXJpbyBBZG1pbiBjb24gQ29udGV4dFwiXG4gICAgICAgIGFkbWluMVtcIlwiXHVkODNkXHVkYzY4XHUyMDBkXHVkODNkXHVkY2JjIGFkbWluMTogVXN1YXJpb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAxXFxuZW1haWw6ICdhZG1pbkBwcmV4Y29sLmNvbSdcXG5ub21icmU6ICdDYXJsb3MgQWRtaW4nXFxucm9sOiAnYWRtaW4nXFxuaXNfc3RhZmY6IHRydWVcXG5pc19zdXBlcnVzZXI6IHRydWVcXG5zZWxmX2RlYWN0aXZhdGVkOiBmYWxzZVxcbmFkbWluX3N1c3BlbmRlZDogZmFsc2VcXG51bHRpbW9faW5ncmVzbzogJzIwMjUtMTItMDQgMTM6MDAnXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHBhc3NfaGlzdDFbXCJcIlx1ZDgzZFx1ZGQxMCBwYXNzX2hpc3QxOiBQYXNzd29yZEhpc3RvcnlcXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMTAxXFxucGFzc3dvcmRfaGFzaDogJ3Bia2RmMl9zaGEyNTYkLi4uJ1xcbmZlY2hhX2NyZWFjaW9uOiAnMjAyNS0xMC0wMSdcIlwiXVxuICAgICAgICBcbiAgICAgICAgcGFzc19oaXN0MltcIlwiXHVkODNkXHVkZDEwIHBhc3NfaGlzdDI6IFBhc3N3b3JkSGlzdG9yeVxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAxMDJcXG5wYXNzd29yZF9oYXNoOiAncGJrZGYyX3NoYTI1NiQuLi4nXFxuZmVjaGFfY3JlYWNpb246ICcyMDI1LTExLTE1J1wiXCJdXG4gICAgICAgIFxuICAgICAgICBwYXNzX2hpc3QzW1wiXCJcdWQ4M2RcdWRkMTAgcGFzc19oaXN0MzogUGFzc3dvcmRIaXN0b3J5XFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDEwM1xcbnBhc3N3b3JkX2hhc2g6ICdwYmtkZjJfc2hhMjU2JC4uLidcXG5mZWNoYV9jcmVhY2lvbjogJzIwMjUtMTItMDEnXFxuKGFjdHVhbClcIlwiXVxuICAgICAgICBcbiAgICAgICAgdGllbmRhX2NlbnRyb1tcIlwiXHVkODNjXHVkZmVhIHRpZW5kYV9jZW50cm86IFRpZW5kYVxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAxXFxubm9tYnJlOiAnVGllbmRhIENlbnRybydcXG5hY3RpdmE6IHRydWVcIlwiXVxuICAgICAgICBcbiAgICAgICAgdGllbmRhX25vcnRlW1wiXCJcdWQ4M2NcdWRmZWEgdGllbmRhX25vcnRlOiBUaWVuZGFcXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMlxcbm5vbWJyZTogJ1RpZW5kYSBOb3J0ZSdcXG5hY3RpdmE6IHRydWVcIlwiXVxuICAgICAgICBcbiAgICAgICAgdGllbmRhX3N1cltcIlwiXHVkODNjXHVkZmVhIHRpZW5kYV9zdXI6IFRpZW5kYVxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAzXFxubm9tYnJlOiAnVGllbmRhIFN1cidcXG5hY3RpdmE6IGZhbHNlXCJcIl1cbiAgICBlbmRcbiAgICBcbiAgICBhZG1pbjEgLS0+fHBhc3N3b3JkX2hpc3Rvcnl8IHBhc3NfaGlzdDFcbiAgICBhZG1pbjEgLS0+fHBhc3N3b3JkX2hpc3Rvcnl8IHBhc3NfaGlzdDJcbiAgICBhZG1pbjEgLS0+fHBhc3N3b3JkX2hpc3Rvcnl8IHBhc3NfaGlzdDNcbiAgICBhZG1pbjEgLS0+fHRpZW5kYXNfYWRtaW5pc3RyYWRhc3wgdGllbmRhX2NlbnRyb1xuICAgIGFkbWluMSAtLT58dGllbmRhc19hZG1pbmlzdHJhZGFzfCB0aWVuZGFfbm9ydGVcbiAgICBhZG1pbjEgLS0+fHRpZW5kYXNfYWRtaW5pc3RyYWRhc3wgdGllbmRhX3N1clxuICAgIFxuICAgIHRpZW5kYV9jZW50cm8gLS0+fGFkbWluaXN0cmFkb3J8IGFkbWluMVxuICAgIHRpZW5kYV9ub3J0ZSAtLT58YWRtaW5pc3RyYWRvcnwgYWRtaW4xXG4gICAgdGllbmRhX3N1ciAtLT58YWRtaW5pc3RyYWRvcnwgYWRtaW4xIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TB
                        subgraph "Usuario Admin con Context"
                            admin1[""👨‍💼 admin1: Usuario\n───────────────\nid: 1\nemail: 'admin@prexcol.com'\nnombre: 'Carlos Admin'\nrol: 'admin'\nis_staff: true\nis_superuser: true\nself_deactivated: false\nadmin_suspended: false\nultimo_ingreso: '2025-12-04 13:00'""]
                            
                            pass_hist1[""🔐 pass_hist1: PasswordHistory\n───────────────\nid: 101\npassword_hash: 'pbkdf2_sha256$...'\nfecha_creacion: '2025-10-01'""]
                            
                            pass_hist2[""🔐 pass_hist2: PasswordHistory\n───────────────\nid: 102\npassword_hash: 'pbkdf2_sha256$...'\nfecha_creacion: '2025-11-15'""]
                            
                            pass_hist3[""🔐 pass_hist3: PasswordHistory\n───────────────\nid: 103\npassword_hash: 'pbkdf2_sha256$...'\nfecha_creacion: '2025-12-01'\n(actual)""]
                            
                            tienda_centro[""🏪 tienda_centro: Tienda\n───────────────\nid: 1\nnombre: 'Tienda Centro'\nactiva: true""]
                            
                            tienda_norte[""🏪 tienda_norte: Tienda\n───────────────\nid: 2\nnombre: 'Tienda Norte'\nactiva: true""]
                            
                            tienda_sur[""🏪 tienda_sur: Tienda\n───────────────\nid: 3\nnombre: 'Tienda Sur'\nactiva: false""]
                        end
                        
                        admin1 -->|password_history| pass_hist1
                        admin1 -->|password_history| pass_hist2
                        admin1 -->|password_history| pass_hist3
                        admin1 -->|tiendas_administradas| tienda_centro
                        admin1 -->|tiendas_administradas| tienda_norte
                        admin1 -->|tiendas_administradas| tienda_sur
                        
                        tienda_centro -->|administrador| admin1
                        tienda_norte -->|administrador| admin1
                        tienda_sur -->|administrador| admin1

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TB
                        subgraph "Pago Exitoso con Transacción"
                            cliente2[""👤 cliente2: Usuario\n───────────────\nid: 55\nemail: 'pedro@email.com'\nnombre: 'Pedro López'\nrol: 'cliente'""]
                            
                            pedido2[""📦 pedido2: Pedido\n───────────────\nid: 1235\nestado: 'pendiente'\ntotal: 87500.00""]
                            
                            pago2[""💳 pago2: Pago\n───────────────\nid: 790\nmonto: 87500.00\nfecha_creacion: '2025-12-04 11:15'\nfecha_actualizacion: '2025-12-04 11:16'""]
                            
                            transaccion1[""🔄 transaccion1: Transaccion\n───────────────\nid: 4567\nreferencia_externa: 'TRX-PAY-789456'\nmonto: 87500.00\nestado: 'approved'\nrespuesta_gateway: {'...'}""]
                            
                            metodo_tarjeta[""💰 metodo_tarjeta: MetodoPago\n───────────────\nid: 1\nnombre: 'Tarjeta Crédito'\nactivo: true""]
                            
                            estado_aprobado[""✅ estado_aprobado: EstadoPago\n───────────────\nid: 2\nnombre: 'Aprobado'\ndescripcion: 'Pago autorizado'""]
                            
                            venta1[""💰 venta1: Venta\n───────────────\nid: 456\ntotal: 87500.00\ncantidad_items: 4\nfecha_venta: '2025-12-04 16:30'""]
                        end
                        
                        pago2 -->|usuario| cliente2
                        pago2 -->|pedido| pedido2
                        pago2 -->|metodo_pago| metodo_tarjeta
                        pago2 -->|estado| estado_aprobado
                        pago2 -->|transacciones| transaccion1
                        
                        pedido2 -->|cliente| cliente2
                        pedido2 -->|venta_registrada| venta1
                        
                        venta1 -->|pedido| pedido2
                        venta1 -->|cliente| cliente2
                        
                        transaccion1 -->|pago| pago2

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiUGFnbyBFeGl0b3NvIGNvbiBUcmFuc2FjY2lcdTAwZjNuXCJcbiAgICAgICAgY2xpZW50ZTJbXCJcIlx1ZDgzZFx1ZGM2NCBjbGllbnRlMjogVXN1YXJpb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA1NVxcbmVtYWlsOiAncGVkcm9AZW1haWwuY29tJ1xcbm5vbWJyZTogJ1BlZHJvIExcdTAwZjNwZXonXFxucm9sOiAnY2xpZW50ZSdcIlwiXVxuICAgICAgICBcbiAgICAgICAgcGVkaWRvMltcIlwiXHVkODNkXHVkY2U2IHBlZGlkbzI6IFBlZGlkb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAxMjM1XFxuZXN0YWRvOiAncGVuZGllbnRlJ1xcbnRvdGFsOiA4NzUwMC4wMFwiXCJdXG4gICAgICAgIFxuICAgICAgICBwYWdvMltcIlwiXHVkODNkXHVkY2IzIHBhZ28yOiBQYWdvXFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDc5MFxcbm1vbnRvOiA4NzUwMC4wMFxcbmZlY2hhX2NyZWFjaW9uOiAnMjAyNS0xMi0wNCAxMToxNSdcXG5mZWNoYV9hY3R1YWxpemFjaW9uOiAnMjAyNS0xMi0wNCAxMToxNidcIlwiXVxuICAgICAgICBcbiAgICAgICAgdHJhbnNhY2Npb24xW1wiXCJcdWQ4M2RcdWRkMDQgdHJhbnNhY2Npb24xOiBUcmFuc2FjY2lvblxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA0NTY3XFxucmVmZXJlbmNpYV9leHRlcm5hOiAnVFJYLVBBWS03ODk0NTYnXFxubW9udG86IDg3NTAwLjAwXFxuZXN0YWRvOiAnYXBwcm92ZWQnXFxucmVzcHVlc3RhX2dhdGV3YXk6IHsnLi4uJ31cIlwiXVxuICAgICAgICBcbiAgICAgICAgbWV0b2RvX3RhcmpldGFbXCJcIlx1ZDgzZFx1ZGNiMCBtZXRvZG9fdGFyamV0YTogTWV0b2RvUGFnb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAxXFxubm9tYnJlOiAnVGFyamV0YSBDclx1MDBlOWRpdG8nXFxuYWN0aXZvOiB0cnVlXCJcIl1cbiAgICAgICAgXG4gICAgICAgIGVzdGFkb19hcHJvYmFkb1tcIlwiXHUyNzA1IGVzdGFkb19hcHJvYmFkbzogRXN0YWRvUGFnb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAyXFxubm9tYnJlOiAnQXByb2JhZG8nXFxuZGVzY3JpcGNpb246ICdQYWdvIGF1dG9yaXphZG8nXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHZlbnRhMVtcIlwiXHVkODNkXHVkY2IwIHZlbnRhMTogVmVudGFcXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogNDU2XFxudG90YWw6IDg3NTAwLjAwXFxuY2FudGlkYWRfaXRlbXM6IDRcXG5mZWNoYV92ZW50YTogJzIwMjUtMTItMDQgMTY6MzAnXCJcIl1cbiAgICBlbmRcbiAgICBcbiAgICBwYWdvMiAtLT58dXN1YXJpb3wgY2xpZW50ZTJcbiAgICBwYWdvMiAtLT58cGVkaWRvfCBwZWRpZG8yXG4gICAgcGFnbzIgLS0+fG1ldG9kb19wYWdvfCBtZXRvZG9fdGFyamV0YVxuICAgIHBhZ28yIC0tPnxlc3RhZG98IGVzdGFkb19hcHJvYmFkb1xuICAgIHBhZ28yIC0tPnx0cmFuc2FjY2lvbmVzfCB0cmFuc2FjY2lvbjFcbiAgICBcbiAgICBwZWRpZG8yIC0tPnxjbGllbnRlfCBjbGllbnRlMlxuICAgIHBlZGlkbzIgLS0+fHZlbnRhX3JlZ2lzdHJhZGF8IHZlbnRhMVxuICAgIFxuICAgIHZlbnRhMSAtLT58cGVkaWRvfCBwZWRpZG8yXG4gICAgdmVudGExIC0tPnxjbGllbnRlfCBjbGllbnRlMlxuICAgIFxuICAgIHRyYW5zYWNjaW9uMSAtLT58cGFnb3wgcGFnbzIiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiUGFnbyBFeGl0b3NvIGNvbiBUcmFuc2FjY2lcdTAwZjNuXCJcbiAgICAgICAgY2xpZW50ZTJbXCJcIlx1ZDgzZFx1ZGM2NCBjbGllbnRlMjogVXN1YXJpb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA1NVxcbmVtYWlsOiAncGVkcm9AZW1haWwuY29tJ1xcbm5vbWJyZTogJ1BlZHJvIExcdTAwZjNwZXonXFxucm9sOiAnY2xpZW50ZSdcIlwiXVxuICAgICAgICBcbiAgICAgICAgcGVkaWRvMltcIlwiXHVkODNkXHVkY2U2IHBlZGlkbzI6IFBlZGlkb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAxMjM1XFxuZXN0YWRvOiAncGVuZGllbnRlJ1xcbnRvdGFsOiA4NzUwMC4wMFwiXCJdXG4gICAgICAgIFxuICAgICAgICBwYWdvMltcIlwiXHVkODNkXHVkY2IzIHBhZ28yOiBQYWdvXFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDc5MFxcbm1vbnRvOiA4NzUwMC4wMFxcbmZlY2hhX2NyZWFjaW9uOiAnMjAyNS0xMi0wNCAxMToxNSdcXG5mZWNoYV9hY3R1YWxpemFjaW9uOiAnMjAyNS0xMi0wNCAxMToxNidcIlwiXVxuICAgICAgICBcbiAgICAgICAgdHJhbnNhY2Npb24xW1wiXCJcdWQ4M2RcdWRkMDQgdHJhbnNhY2Npb24xOiBUcmFuc2FjY2lvblxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA0NTY3XFxucmVmZXJlbmNpYV9leHRlcm5hOiAnVFJYLVBBWS03ODk0NTYnXFxubW9udG86IDg3NTAwLjAwXFxuZXN0YWRvOiAnYXBwcm92ZWQnXFxucmVzcHVlc3RhX2dhdGV3YXk6IHsnLi4uJ31cIlwiXVxuICAgICAgICBcbiAgICAgICAgbWV0b2RvX3RhcmpldGFbXCJcIlx1ZDgzZFx1ZGNiMCBtZXRvZG9fdGFyamV0YTogTWV0b2RvUGFnb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAxXFxubm9tYnJlOiAnVGFyamV0YSBDclx1MDBlOWRpdG8nXFxuYWN0aXZvOiB0cnVlXCJcIl1cbiAgICAgICAgXG4gICAgICAgIGVzdGFkb19hcHJvYmFkb1tcIlwiXHUyNzA1IGVzdGFkb19hcHJvYmFkbzogRXN0YWRvUGFnb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAyXFxubm9tYnJlOiAnQXByb2JhZG8nXFxuZGVzY3JpcGNpb246ICdQYWdvIGF1dG9yaXphZG8nXCJcIl1cbiAgICAgICAgXG4gICAgICAgIHZlbnRhMVtcIlwiXHVkODNkXHVkY2IwIHZlbnRhMTogVmVudGFcXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogNDU2XFxudG90YWw6IDg3NTAwLjAwXFxuY2FudGlkYWRfaXRlbXM6IDRcXG5mZWNoYV92ZW50YTogJzIwMjUtMTItMDQgMTY6MzAnXCJcIl1cbiAgICBlbmRcbiAgICBcbiAgICBwYWdvMiAtLT58dXN1YXJpb3wgY2xpZW50ZTJcbiAgICBwYWdvMiAtLT58cGVkaWRvfCBwZWRpZG8yXG4gICAgcGFnbzIgLS0+fG1ldG9kb19wYWdvfCBtZXRvZG9fdGFyamV0YVxuICAgIHBhZ28yIC0tPnxlc3RhZG98IGVzdGFkb19hcHJvYmFkb1xuICAgIHBhZ28yIC0tPnx0cmFuc2FjY2lvbmVzfCB0cmFuc2FjY2lvbjFcbiAgICBcbiAgICBwZWRpZG8yIC0tPnxjbGllbnRlfCBjbGllbnRlMlxuICAgIHBlZGlkbzIgLS0+fHZlbnRhX3JlZ2lzdHJhZGF8IHZlbnRhMVxuICAgIFxuICAgIHZlbnRhMSAtLT58cGVkaWRvfCBwZWRpZG8yXG4gICAgdmVudGExIC0tPnxjbGllbnRlfCBjbGllbnRlMlxuICAgIFxuICAgIHRyYW5zYWNjaW9uMSAtLT58cGFnb3wgcGFnbzIiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TB
                        subgraph "Pago Exitoso con Transacción"
                            cliente2[""👤 cliente2: Usuario\n───────────────\nid: 55\nemail: 'pedro@email.com'\nnombre: 'Pedro López'\nrol: 'cliente'""]
                            
                            pedido2[""📦 pedido2: Pedido\n───────────────\nid: 1235\nestado: 'pendiente'\ntotal: 87500.00""]
                            
                            pago2[""💳 pago2: Pago\n───────────────\nid: 790\nmonto: 87500.00\nfecha_creacion: '2025-12-04 11:15'\nfecha_actualizacion: '2025-12-04 11:16'""]
                            
                            transaccion1[""🔄 transaccion1: Transaccion\n───────────────\nid: 4567\nreferencia_externa: 'TRX-PAY-789456'\nmonto: 87500.00\nestado: 'approved'\nrespuesta_gateway: {'...'}""]
                            
                            metodo_tarjeta[""💰 metodo_tarjeta: MetodoPago\n───────────────\nid: 1\nnombre: 'Tarjeta Crédito'\nactivo: true""]
                            
                            estado_aprobado[""✅ estado_aprobado: EstadoPago\n───────────────\nid: 2\nnombre: 'Aprobado'\ndescripcion: 'Pago autorizado'""]
                            
                            venta1[""💰 venta1: Venta\n───────────────\nid: 456\ntotal: 87500.00\ncantidad_items: 4\nfecha_venta: '2025-12-04 16:30'""]
                        end
                        
                        pago2 -->|usuario| cliente2
                        pago2 -->|pedido| pedido2
                        pago2 -->|metodo_pago| metodo_tarjeta
                        pago2 -->|estado| estado_aprobado
                        pago2 -->|transacciones| transaccion1
                        
                        pedido2 -->|cliente| cliente2
                        pedido2 -->|venta_registrada| venta1
                        
                        venta1 -->|pedido| pedido2
                        venta1 -->|cliente| cliente2
                        
                        transaccion1 -->|pago| pago2

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    flowchart TB
                        subgraph "Notificaciones por Pedido Creado"
                            pedido_evento[""📦 pedido_nuevo: Pedido\n───────────────\nid: 1236\nestado: 'pendiente'\nfecha_creacion: '2025-12-04 14:00'""]
                            
                            notif_cliente[""📧 notif_cliente: Notificacion\n───────────────\nid: 3001\nmensaje: 'Tu pedido #1236 ha sido...'\ndestino: 'cliente@email.com'\nleida: true\nfecha_lectura: '2025-12-04 14:05'""]
                            
                            notif_logistica[""📧 notif_logistica: Notificacion\n───────────────\nid: 3002\nmensaje: 'Nuevo pedido #1236 para...'\ndestino: 'logistica@prexcol.com'\nleida: false\nfecha_lectura: null""]
                            
                            notif_proveedor[""📧 notif_proveedor: Notificacion\n───────────────\nid: 3003\nmensaje: 'Pedido #1236 incluye tus...'\ndestino: 'proveedor@proveedora.com'\nleida: true\nfecha_lectura: '2025-12-04 14:30'""]
                            
                            tipo_pedido[""🔔 tipo_pedido: TipoNotificacion\n───────────────\nid: 1\nnombre: 'Nuevo Pedido'""]
                            
                            estado_enviada[""✅ estado_enviada: EstadoNotificacion\n───────────────\nid: 2\nnombre: 'Enviada'""]
                            
                            cliente_dest[""👤 cliente_dest: Usuario\n───────────────\nid: 60\nrol: 'cliente'""]
                            
                            logistica_dest[""👤 logistica_dest: Usuario\n───────────────\nid: 8\nrol: 'logistica'""]
                            
                            proveedor_dest[""👤 proveedor_dest: Usuario\n───────────────\nid: 15\nrol: 'proveedor'""]
                        end
                        
                        notif_cliente -->|usuario| cliente_dest
                        notif_cliente -->|tipo| tipo_pedido
                        notif_cliente -->|estado| estado_enviada
                        
                        notif_logistica -->|usuario| logistica_dest
                        notif_logistica -->|tipo| tipo_pedido
                        notif_logistica -->|estado| estado_enviada
                        
                        notif_proveedor -->|usuario| proveedor_dest
                        notif_proveedor -->|tipo| tipo_pedido
                        notif_proveedor -->|estado| estado_enviada

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiTm90aWZpY2FjaW9uZXMgcG9yIFBlZGlkbyBDcmVhZG9cIlxuICAgICAgICBwZWRpZG9fZXZlbnRvW1wiXCJcdWQ4M2RcdWRjZTYgcGVkaWRvX251ZXZvOiBQZWRpZG9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMTIzNlxcbmVzdGFkbzogJ3BlbmRpZW50ZSdcXG5mZWNoYV9jcmVhY2lvbjogJzIwMjUtMTItMDQgMTQ6MDAnXCJcIl1cbiAgICAgICAgXG4gICAgICAgIG5vdGlmX2NsaWVudGVbXCJcIlx1ZDgzZFx1ZGNlNyBub3RpZl9jbGllbnRlOiBOb3RpZmljYWNpb25cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMzAwMVxcbm1lbnNhamU6ICdUdSBwZWRpZG8gIzEyMzYgaGEgc2lkby4uLidcXG5kZXN0aW5vOiAnY2xpZW50ZUBlbWFpbC5jb20nXFxubGVpZGE6IHRydWVcXG5mZWNoYV9sZWN0dXJhOiAnMjAyNS0xMi0wNCAxNDowNSdcIlwiXVxuICAgICAgICBcbiAgICAgICAgbm90aWZfbG9naXN0aWNhW1wiXCJcdWQ4M2RcdWRjZTcgbm90aWZfbG9naXN0aWNhOiBOb3RpZmljYWNpb25cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMzAwMlxcbm1lbnNhamU6ICdOdWV2byBwZWRpZG8gIzEyMzYgcGFyYS4uLidcXG5kZXN0aW5vOiAnbG9naXN0aWNhQHByZXhjb2wuY29tJ1xcbmxlaWRhOiBmYWxzZVxcbmZlY2hhX2xlY3R1cmE6IG51bGxcIlwiXVxuICAgICAgICBcbiAgICAgICAgbm90aWZfcHJvdmVlZG9yW1wiXCJcdWQ4M2RcdWRjZTcgbm90aWZfcHJvdmVlZG9yOiBOb3RpZmljYWNpb25cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMzAwM1xcbm1lbnNhamU6ICdQZWRpZG8gIzEyMzYgaW5jbHV5ZSB0dXMuLi4nXFxuZGVzdGlubzogJ3Byb3ZlZWRvckBwcm92ZWVkb3JhLmNvbSdcXG5sZWlkYTogdHJ1ZVxcbmZlY2hhX2xlY3R1cmE6ICcyMDI1LTEyLTA0IDE0OjMwJ1wiXCJdXG4gICAgICAgIFxuICAgICAgICB0aXBvX3BlZGlkb1tcIlwiXHVkODNkXHVkZDE0IHRpcG9fcGVkaWRvOiBUaXBvTm90aWZpY2FjaW9uXFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDFcXG5ub21icmU6ICdOdWV2byBQZWRpZG8nXCJcIl1cbiAgICAgICAgXG4gICAgICAgIGVzdGFkb19lbnZpYWRhW1wiXCJcdTI3MDUgZXN0YWRvX2VudmlhZGE6IEVzdGFkb05vdGlmaWNhY2lvblxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAyXFxubm9tYnJlOiAnRW52aWFkYSdcIlwiXVxuICAgICAgICBcbiAgICAgICAgY2xpZW50ZV9kZXN0W1wiXCJcdWQ4M2RcdWRjNjQgY2xpZW50ZV9kZXN0OiBVc3VhcmlvXFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDYwXFxucm9sOiAnY2xpZW50ZSdcIlwiXVxuICAgICAgICBcbiAgICAgICAgbG9naXN0aWNhX2Rlc3RbXCJcIlx1ZDgzZFx1ZGM2NCBsb2dpc3RpY2FfZGVzdDogVXN1YXJpb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA4XFxucm9sOiAnbG9naXN0aWNhJ1wiXCJdXG4gICAgICAgIFxuICAgICAgICBwcm92ZWVkb3JfZGVzdFtcIlwiXHVkODNkXHVkYzY0IHByb3ZlZWRvcl9kZXN0OiBVc3VhcmlvXFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDE1XFxucm9sOiAncHJvdmVlZG9yJ1wiXCJdXG4gICAgZW5kXG4gICAgXG4gICAgbm90aWZfY2xpZW50ZSAtLT58dXN1YXJpb3wgY2xpZW50ZV9kZXN0XG4gICAgbm90aWZfY2xpZW50ZSAtLT58dGlwb3wgdGlwb19wZWRpZG9cbiAgICBub3RpZl9jbGllbnRlIC0tPnxlc3RhZG98IGVzdGFkb19lbnZpYWRhXG4gICAgXG4gICAgbm90aWZfbG9naXN0aWNhIC0tPnx1c3VhcmlvfCBsb2dpc3RpY2FfZGVzdFxuICAgIG5vdGlmX2xvZ2lzdGljYSAtLT58dGlwb3wgdGlwb19wZWRpZG9cbiAgICBub3RpZl9sb2dpc3RpY2EgLS0+fGVzdGFkb3wgZXN0YWRvX2VudmlhZGFcbiAgICBcbiAgICBub3RpZl9wcm92ZWVkb3IgLS0+fHVzdWFyaW98IHByb3ZlZWRvcl9kZXN0XG4gICAgbm90aWZfcHJvdmVlZG9yIC0tPnx0aXBvfCB0aXBvX3BlZGlkb1xuICAgIG5vdGlmX3Byb3ZlZWRvciAtLT58ZXN0YWRvfCBlc3RhZG9fZW52aWFkYSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogImZsb3djaGFydCBUQlxuICAgIHN1YmdyYXBoIFwiTm90aWZpY2FjaW9uZXMgcG9yIFBlZGlkbyBDcmVhZG9cIlxuICAgICAgICBwZWRpZG9fZXZlbnRvW1wiXCJcdWQ4M2RcdWRjZTYgcGVkaWRvX251ZXZvOiBQZWRpZG9cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMTIzNlxcbmVzdGFkbzogJ3BlbmRpZW50ZSdcXG5mZWNoYV9jcmVhY2lvbjogJzIwMjUtMTItMDQgMTQ6MDAnXCJcIl1cbiAgICAgICAgXG4gICAgICAgIG5vdGlmX2NsaWVudGVbXCJcIlx1ZDgzZFx1ZGNlNyBub3RpZl9jbGllbnRlOiBOb3RpZmljYWNpb25cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMzAwMVxcbm1lbnNhamU6ICdUdSBwZWRpZG8gIzEyMzYgaGEgc2lkby4uLidcXG5kZXN0aW5vOiAnY2xpZW50ZUBlbWFpbC5jb20nXFxubGVpZGE6IHRydWVcXG5mZWNoYV9sZWN0dXJhOiAnMjAyNS0xMi0wNCAxNDowNSdcIlwiXVxuICAgICAgICBcbiAgICAgICAgbm90aWZfbG9naXN0aWNhW1wiXCJcdWQ4M2RcdWRjZTcgbm90aWZfbG9naXN0aWNhOiBOb3RpZmljYWNpb25cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMzAwMlxcbm1lbnNhamU6ICdOdWV2byBwZWRpZG8gIzEyMzYgcGFyYS4uLidcXG5kZXN0aW5vOiAnbG9naXN0aWNhQHByZXhjb2wuY29tJ1xcbmxlaWRhOiBmYWxzZVxcbmZlY2hhX2xlY3R1cmE6IG51bGxcIlwiXVxuICAgICAgICBcbiAgICAgICAgbm90aWZfcHJvdmVlZG9yW1wiXCJcdWQ4M2RcdWRjZTcgbm90aWZfcHJvdmVlZG9yOiBOb3RpZmljYWNpb25cXG5cdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcXG5pZDogMzAwM1xcbm1lbnNhamU6ICdQZWRpZG8gIzEyMzYgaW5jbHV5ZSB0dXMuLi4nXFxuZGVzdGlubzogJ3Byb3ZlZWRvckBwcm92ZWVkb3JhLmNvbSdcXG5sZWlkYTogdHJ1ZVxcbmZlY2hhX2xlY3R1cmE6ICcyMDI1LTEyLTA0IDE0OjMwJ1wiXCJdXG4gICAgICAgIFxuICAgICAgICB0aXBvX3BlZGlkb1tcIlwiXHVkODNkXHVkZDE0IHRpcG9fcGVkaWRvOiBUaXBvTm90aWZpY2FjaW9uXFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDFcXG5ub21icmU6ICdOdWV2byBQZWRpZG8nXCJcIl1cbiAgICAgICAgXG4gICAgICAgIGVzdGFkb19lbnZpYWRhW1wiXCJcdTI3MDUgZXN0YWRvX2VudmlhZGE6IEVzdGFkb05vdGlmaWNhY2lvblxcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiAyXFxubm9tYnJlOiAnRW52aWFkYSdcIlwiXVxuICAgICAgICBcbiAgICAgICAgY2xpZW50ZV9kZXN0W1wiXCJcdWQ4M2RcdWRjNjQgY2xpZW50ZV9kZXN0OiBVc3VhcmlvXFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDYwXFxucm9sOiAnY2xpZW50ZSdcIlwiXVxuICAgICAgICBcbiAgICAgICAgbG9naXN0aWNhX2Rlc3RbXCJcIlx1ZDgzZFx1ZGM2NCBsb2dpc3RpY2FfZGVzdDogVXN1YXJpb1xcblx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxcbmlkOiA4XFxucm9sOiAnbG9naXN0aWNhJ1wiXCJdXG4gICAgICAgIFxuICAgICAgICBwcm92ZWVkb3JfZGVzdFtcIlwiXHVkODNkXHVkYzY0IHByb3ZlZWRvcl9kZXN0OiBVc3VhcmlvXFxuXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXFxuaWQ6IDE1XFxucm9sOiAncHJvdmVlZG9yJ1wiXCJdXG4gICAgZW5kXG4gICAgXG4gICAgbm90aWZfY2xpZW50ZSAtLT58dXN1YXJpb3wgY2xpZW50ZV9kZXN0XG4gICAgbm90aWZfY2xpZW50ZSAtLT58dGlwb3wgdGlwb19wZWRpZG9cbiAgICBub3RpZl9jbGllbnRlIC0tPnxlc3RhZG98IGVzdGFkb19lbnZpYWRhXG4gICAgXG4gICAgbm90aWZfbG9naXN0aWNhIC0tPnx1c3VhcmlvfCBsb2dpc3RpY2FfZGVzdFxuICAgIG5vdGlmX2xvZ2lzdGljYSAtLT58dGlwb3wgdGlwb19wZWRpZG9cbiAgICBub3RpZl9sb2dpc3RpY2EgLS0+fGVzdGFkb3wgZXN0YWRvX2VudmlhZGFcbiAgICBcbiAgICBub3RpZl9wcm92ZWVkb3IgLS0+fHVzdWFyaW98IHByb3ZlZWRvcl9kZXN0XG4gICAgbm90aWZfcHJvdmVlZG9yIC0tPnx0aXBvfCB0aXBvX3BlZGlkb1xuICAgIG5vdGlmX3Byb3ZlZWRvciAtLT58ZXN0YWRvfCBlc3RhZG9fZW52aWFkYSIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    flowchart TB
                        subgraph "Notificaciones por Pedido Creado"
                            pedido_evento[""📦 pedido_nuevo: Pedido\n───────────────\nid: 1236\nestado: 'pendiente'\nfecha_creacion: '2025-12-04 14:00'""]
                            
                            notif_cliente[""📧 notif_cliente: Notificacion\n───────────────\nid: 3001\nmensaje: 'Tu pedido #1236 ha sido...'\ndestino: 'cliente@email.com'\nleida: true\nfecha_lectura: '2025-12-04 14:05'""]
                            
                            notif_logistica[""📧 notif_logistica: Notificacion\n───────────────\nid: 3002\nmensaje: 'Nuevo pedido #1236 para...'\ndestino: 'logistica@prexcol.com'\nleida: false\nfecha_lectura: null""]
                            
                            notif_proveedor[""📧 notif_proveedor: Notificacion\n───────────────\nid: 3003\nmensaje: 'Pedido #1236 incluye tus...'\ndestino: 'proveedor@proveedora.com'\nleida: true\nfecha_lectura: '2025-12-04 14:30'""]
                            
                            tipo_pedido[""🔔 tipo_pedido: TipoNotificacion\n───────────────\nid: 1\nnombre: 'Nuevo Pedido'""]
                            
                            estado_enviada[""✅ estado_enviada: EstadoNotificacion\n───────────────\nid: 2\nnombre: 'Enviada'""]
                            
                            cliente_dest[""👤 cliente_dest: Usuario\n───────────────\nid: 60\nrol: 'cliente'""]
                            
                            logistica_dest[""👤 logistica_dest: Usuario\n───────────────\nid: 8\nrol: 'logistica'""]
                            
                            proveedor_dest[""👤 proveedor_dest: Usuario\n───────────────\nid: 15\nrol: 'proveedor'""]
                        end
                        
                        notif_cliente -->|usuario| cliente_dest
                        notif_cliente -->|tipo| tipo_pedido
                        notif_cliente -->|estado| estado_enviada
                        
                        notif_logistica -->|usuario| logistica_dest
                        notif_logistica -->|tipo| tipo_pedido
                        notif_logistica -->|estado| estado_enviada
                        
                        notif_proveedor -->|usuario| proveedor_dest
                        notif_proveedor -->|tipo| tipo_pedido
                        notif_proveedor -->|estado| estado_enviada


.. dropdown:: 📊 Diagrama Secuencia("10 diagramas")
    :open:
    :class-container: sd-mb-4

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    sequenceDiagram
                        actor Usuario
                        participant UI as Frontend\n(React)
                        participant API as Backend API\n(Django)
                        participant Auth as Auth Service
                        participant DB as Database
                        participant Token as JWT Generator
                    
                        Usuario->>UI: 1. Ingresa email/password
                        UI->>UI: 2. Valida formato
                        UI->>API: 3. POST /api/auth/login\n{email, password}
                        
                        API->>Auth: 4. validate_credentials()
                        Auth->>DB: 5. SELECT * FROM usuarios\nWHERE email=?
                        DB-->>Auth: 6. Usuario data
                        
                        Auth->>Auth: 7. check_password()
                        Auth->>Auth: 8. verify_account_status()
                        
                        alt Credenciales válidas & cuenta activa
                            Auth->>Token: 9. generate_tokens("user")
                            Token->>Token: 10. Create access_token("15min")
                            Token->>Token: 11. Create refresh_token("7 días")
                            Token-->>Auth: 12. {access, refresh}
                            
                            Auth->>DB: 13. UPDATE ultimo_ingreso
                            Auth-->>API: 14. {user, tokens}
                            API-->>UI: 15. 200 OK\n{user, access_token, refresh_token}
                            
                            UI->>UI: 16. Store tokens("localStorage")
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

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIFVzdWFyaW9cbiAgICBwYXJ0aWNpcGFudCBVSSBhcyBGcm9udGVuZFxcbihSZWFjdClcbiAgICBwYXJ0aWNpcGFudCBBUEkgYXMgQmFja2VuZCBBUElcXG4oRGphbmdvKVxuICAgIHBhcnRpY2lwYW50IEF1dGggYXMgQXV0aCBTZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgREIgYXMgRGF0YWJhc2VcbiAgICBwYXJ0aWNpcGFudCBUb2tlbiBhcyBKV1QgR2VuZXJhdG9yXG5cbiAgICBVc3VhcmlvLT4+VUk6IDEuIEluZ3Jlc2EgZW1haWwvcGFzc3dvcmRcbiAgICBVSS0+PlVJOiAyLiBWYWxpZGEgZm9ybWF0b1xuICAgIFVJLT4+QVBJOiAzLiBQT1NUIC9hcGkvYXV0aC9sb2dpblxcbntlbWFpbCwgcGFzc3dvcmR9XG4gICAgXG4gICAgQVBJLT4+QXV0aDogNC4gdmFsaWRhdGVfY3JlZGVudGlhbHMoKVxuICAgIEF1dGgtPj5EQjogNS4gU0VMRUNUICogRlJPTSB1c3Vhcmlvc1xcbldIRVJFIGVtYWlsPT9cbiAgICBEQi0tPj5BdXRoOiA2LiBVc3VhcmlvIGRhdGFcbiAgICBcbiAgICBBdXRoLT4+QXV0aDogNy4gY2hlY2tfcGFzc3dvcmQoKVxuICAgIEF1dGgtPj5BdXRoOiA4LiB2ZXJpZnlfYWNjb3VudF9zdGF0dXMoKVxuICAgIFxuICAgIGFsdCBDcmVkZW5jaWFsZXMgdlx1MDBlMWxpZGFzICYgY3VlbnRhIGFjdGl2YVxuICAgICAgICBBdXRoLT4+VG9rZW46IDkuIGdlbmVyYXRlX3Rva2VucyhcInVzZXJcIilcbiAgICAgICAgVG9rZW4tPj5Ub2tlbjogMTAuIENyZWF0ZSBhY2Nlc3NfdG9rZW4oXCIxNW1pblwiKVxuICAgICAgICBUb2tlbi0+PlRva2VuOiAxMS4gQ3JlYXRlIHJlZnJlc2hfdG9rZW4oXCI3IGRcdTAwZWRhc1wiKVxuICAgICAgICBUb2tlbi0tPj5BdXRoOiAxMi4ge2FjY2VzcywgcmVmcmVzaH1cbiAgICAgICAgXG4gICAgICAgIEF1dGgtPj5EQjogMTMuIFVQREFURSB1bHRpbW9faW5ncmVzb1xuICAgICAgICBBdXRoLS0+PkFQSTogMTQuIHt1c2VyLCB0b2tlbnN9XG4gICAgICAgIEFQSS0tPj5VSTogMTUuIDIwMCBPS1xcbnt1c2VyLCBhY2Nlc3NfdG9rZW4sIHJlZnJlc2hfdG9rZW59XG4gICAgICAgIFxuICAgICAgICBVSS0+PlVJOiAxNi4gU3RvcmUgdG9rZW5zKFwibG9jYWxTdG9yYWdlXCIpXG4gICAgICAgIFVJLT4+VUk6IDE3LiBSZWRpcmVjdCB0byBkYXNoYm9hcmRcbiAgICAgICAgVUktLT4+VXN1YXJpbzogMTguIE1vc3RyYXIgZGFzaGJvYXJkXG4gICAgZWxzZSBDcmVkZW5jaWFsZXMgaW52XHUwMGUxbGlkYXNcbiAgICAgICAgQXV0aC0tPj5BUEk6IEVycm9yOiBJbnZhbGlkIGNyZWRlbnRpYWxzXG4gICAgICAgIEFQSS0tPj5VSTogNDAxIFVuYXV0aG9yaXplZFxuICAgICAgICBVSS0tPj5Vc3VhcmlvOiBNb3N0cmFyIGVycm9yXG4gICAgZWxzZSBDdWVudGEgc3VzcGVuZGlkYVxuICAgICAgICBBdXRoLS0+PkFQSTogRXJyb3I6IEFjY291bnQgc3VzcGVuZGVkXG4gICAgICAgIEFQSS0tPj5VSTogNDAzIEZvcmJpZGRlblxuICAgICAgICBVSS0tPj5Vc3VhcmlvOiBDb250YWN0YXIgc29wb3J0ZVxuICAgIGVuZCIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIFVzdWFyaW9cbiAgICBwYXJ0aWNpcGFudCBVSSBhcyBGcm9udGVuZFxcbihSZWFjdClcbiAgICBwYXJ0aWNpcGFudCBBUEkgYXMgQmFja2VuZCBBUElcXG4oRGphbmdvKVxuICAgIHBhcnRpY2lwYW50IEF1dGggYXMgQXV0aCBTZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgREIgYXMgRGF0YWJhc2VcbiAgICBwYXJ0aWNpcGFudCBUb2tlbiBhcyBKV1QgR2VuZXJhdG9yXG5cbiAgICBVc3VhcmlvLT4+VUk6IDEuIEluZ3Jlc2EgZW1haWwvcGFzc3dvcmRcbiAgICBVSS0+PlVJOiAyLiBWYWxpZGEgZm9ybWF0b1xuICAgIFVJLT4+QVBJOiAzLiBQT1NUIC9hcGkvYXV0aC9sb2dpblxcbntlbWFpbCwgcGFzc3dvcmR9XG4gICAgXG4gICAgQVBJLT4+QXV0aDogNC4gdmFsaWRhdGVfY3JlZGVudGlhbHMoKVxuICAgIEF1dGgtPj5EQjogNS4gU0VMRUNUICogRlJPTSB1c3Vhcmlvc1xcbldIRVJFIGVtYWlsPT9cbiAgICBEQi0tPj5BdXRoOiA2LiBVc3VhcmlvIGRhdGFcbiAgICBcbiAgICBBdXRoLT4+QXV0aDogNy4gY2hlY2tfcGFzc3dvcmQoKVxuICAgIEF1dGgtPj5BdXRoOiA4LiB2ZXJpZnlfYWNjb3VudF9zdGF0dXMoKVxuICAgIFxuICAgIGFsdCBDcmVkZW5jaWFsZXMgdlx1MDBlMWxpZGFzICYgY3VlbnRhIGFjdGl2YVxuICAgICAgICBBdXRoLT4+VG9rZW46IDkuIGdlbmVyYXRlX3Rva2VucyhcInVzZXJcIilcbiAgICAgICAgVG9rZW4tPj5Ub2tlbjogMTAuIENyZWF0ZSBhY2Nlc3NfdG9rZW4oXCIxNW1pblwiKVxuICAgICAgICBUb2tlbi0+PlRva2VuOiAxMS4gQ3JlYXRlIHJlZnJlc2hfdG9rZW4oXCI3IGRcdTAwZWRhc1wiKVxuICAgICAgICBUb2tlbi0tPj5BdXRoOiAxMi4ge2FjY2VzcywgcmVmcmVzaH1cbiAgICAgICAgXG4gICAgICAgIEF1dGgtPj5EQjogMTMuIFVQREFURSB1bHRpbW9faW5ncmVzb1xuICAgICAgICBBdXRoLS0+PkFQSTogMTQuIHt1c2VyLCB0b2tlbnN9XG4gICAgICAgIEFQSS0tPj5VSTogMTUuIDIwMCBPS1xcbnt1c2VyLCBhY2Nlc3NfdG9rZW4sIHJlZnJlc2hfdG9rZW59XG4gICAgICAgIFxuICAgICAgICBVSS0+PlVJOiAxNi4gU3RvcmUgdG9rZW5zKFwibG9jYWxTdG9yYWdlXCIpXG4gICAgICAgIFVJLT4+VUk6IDE3LiBSZWRpcmVjdCB0byBkYXNoYm9hcmRcbiAgICAgICAgVUktLT4+VXN1YXJpbzogMTguIE1vc3RyYXIgZGFzaGJvYXJkXG4gICAgZWxzZSBDcmVkZW5jaWFsZXMgaW52XHUwMGUxbGlkYXNcbiAgICAgICAgQXV0aC0tPj5BUEk6IEVycm9yOiBJbnZhbGlkIGNyZWRlbnRpYWxzXG4gICAgICAgIEFQSS0tPj5VSTogNDAxIFVuYXV0aG9yaXplZFxuICAgICAgICBVSS0tPj5Vc3VhcmlvOiBNb3N0cmFyIGVycm9yXG4gICAgZWxzZSBDdWVudGEgc3VzcGVuZGlkYVxuICAgICAgICBBdXRoLS0+PkFQSTogRXJyb3I6IEFjY291bnQgc3VzcGVuZGVkXG4gICAgICAgIEFQSS0tPj5VSTogNDAzIEZvcmJpZGRlblxuICAgICAgICBVSS0tPj5Vc3VhcmlvOiBDb250YWN0YXIgc29wb3J0ZVxuICAgIGVuZCIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    sequenceDiagram
                        actor Usuario
                        participant UI as Frontend\n(React)
                        participant API as Backend API\n(Django)
                        participant Auth as Auth Service
                        participant DB as Database
                        participant Token as JWT Generator
                    
                        Usuario->>UI: 1. Ingresa email/password
                        UI->>UI: 2. Valida formato
                        UI->>API: 3. POST /api/auth/login\n{email, password}
                        
                        API->>Auth: 4. validate_credentials()
                        Auth->>DB: 5. SELECT * FROM usuarios\nWHERE email=?
                        DB-->>Auth: 6. Usuario data
                        
                        Auth->>Auth: 7. check_password()
                        Auth->>Auth: 8. verify_account_status()
                        
                        alt Credenciales válidas & cuenta activa
                            Auth->>Token: 9. generate_tokens("user")
                            Token->>Token: 10. Create access_token("15min")
                            Token->>Token: 11. Create refresh_token("7 días")
                            Token-->>Auth: 12. {access, refresh}
                            
                            Auth->>DB: 13. UPDATE ultimo_ingreso
                            Auth-->>API: 14. {user, tokens}
                            API-->>UI: 15. 200 OK\n{user, access_token, refresh_token}
                            
                            UI->>UI: 16. Store tokens("localStorage")
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

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    sequenceDiagram
                        actor Usuario
                        participant UI as Frontend
                        participant API as Backend API
                        participant Validator as Password\nValidator
                        participant DB as Database
                        participant Email as Email\nService
                    
                        Usuario->>UI: 1. Completa formulario
                        UI->>UI: 2. Validación cliente
                        UI->>API: 3. POST /api/auth/register\n{email, nombre, password, rol}
                        
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
                                
                                API-->>UI: 12. 201 Created\n{user}
                                UI-->>Usuario: 13. Registro exitoso
                                UI->>UI: 14. Redirect to login
                            end
                        end

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIFVzdWFyaW9cbiAgICBwYXJ0aWNpcGFudCBVSSBhcyBGcm9udGVuZFxuICAgIHBhcnRpY2lwYW50IEFQSSBhcyBCYWNrZW5kIEFQSVxuICAgIHBhcnRpY2lwYW50IFZhbGlkYXRvciBhcyBQYXNzd29yZFxcblZhbGlkYXRvclxuICAgIHBhcnRpY2lwYW50IERCIGFzIERhdGFiYXNlXG4gICAgcGFydGljaXBhbnQgRW1haWwgYXMgRW1haWxcXG5TZXJ2aWNlXG5cbiAgICBVc3VhcmlvLT4+VUk6IDEuIENvbXBsZXRhIGZvcm11bGFyaW9cbiAgICBVSS0+PlVJOiAyLiBWYWxpZGFjaVx1MDBmM24gY2xpZW50ZVxuICAgIFVJLT4+QVBJOiAzLiBQT1NUIC9hcGkvYXV0aC9yZWdpc3RlclxcbntlbWFpbCwgbm9tYnJlLCBwYXNzd29yZCwgcm9sfVxuICAgIFxuICAgIEFQSS0+PkRCOiA0LiBDaGVjayBlbWFpbCBcdTAwZmFuaWNvXG4gICAgYWx0IEVtYWlsIHlhIGV4aXN0ZVxuICAgICAgICBEQi0tPj5BUEk6IEVtYWlsIGV4aXN0c1xuICAgICAgICBBUEktLT4+VUk6IDQwMCBCYWQgUmVxdWVzdFxuICAgICAgICBVSS0tPj5Vc3VhcmlvOiBFbWFpbCBlbiB1c29cbiAgICBlbHNlIEVtYWlsIGRpc3BvbmlibGVcbiAgICAgICAgQVBJLT4+VmFsaWRhdG9yOiA1LiB2YWxpZGF0ZV9wYXNzd29yZCgpXG4gICAgICAgIFZhbGlkYXRvci0+PlZhbGlkYXRvcjogNi4gQ2hlY2sgc3RyZW5ndGhcbiAgICAgICAgXG4gICAgICAgIGFsdCBQYXNzd29yZCBkXHUwMGU5YmlsXG4gICAgICAgICAgICBWYWxpZGF0b3ItLT4+QVBJOiBXZWFrIHBhc3N3b3JkXG4gICAgICAgICAgICBBUEktLT4+VUk6IDQwMCBCYWQgUmVxdWVzdFxuICAgICAgICAgICAgVUktLT4+VXN1YXJpbzogUGFzc3dvcmQgcmVxdWlyZW1lbnRzXG4gICAgICAgIGVsc2UgUGFzc3dvcmQgdlx1MDBlMWxpZG9cbiAgICAgICAgICAgIEFQSS0+PkRCOiA3LiBJTlNFUlQgdXN1YXJpb1xuICAgICAgICAgICAgQVBJLT4+REI6IDguIElOU0VSVCBwYXNzd29yZF9oaXN0b3J5XG4gICAgICAgICAgICBEQi0tPj5BUEk6IDkuIFVzdWFyaW8gY3JlYWRvXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEFQSS0+PkVtYWlsOiAxMC4gc2VuZF93ZWxjb21lX2VtYWlsKClcbiAgICAgICAgICAgIEVtYWlsLS0+PkFQSTogMTEuIEVtYWlsIHNlbnRcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQVBJLS0+PlVJOiAxMi4gMjAxIENyZWF0ZWRcXG57dXNlcn1cbiAgICAgICAgICAgIFVJLS0+PlVzdWFyaW86IDEzLiBSZWdpc3RybyBleGl0b3NvXG4gICAgICAgICAgICBVSS0+PlVJOiAxNC4gUmVkaXJlY3QgdG8gbG9naW5cbiAgICAgICAgZW5kXG4gICAgZW5kIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIFVzdWFyaW9cbiAgICBwYXJ0aWNpcGFudCBVSSBhcyBGcm9udGVuZFxuICAgIHBhcnRpY2lwYW50IEFQSSBhcyBCYWNrZW5kIEFQSVxuICAgIHBhcnRpY2lwYW50IFZhbGlkYXRvciBhcyBQYXNzd29yZFxcblZhbGlkYXRvclxuICAgIHBhcnRpY2lwYW50IERCIGFzIERhdGFiYXNlXG4gICAgcGFydGljaXBhbnQgRW1haWwgYXMgRW1haWxcXG5TZXJ2aWNlXG5cbiAgICBVc3VhcmlvLT4+VUk6IDEuIENvbXBsZXRhIGZvcm11bGFyaW9cbiAgICBVSS0+PlVJOiAyLiBWYWxpZGFjaVx1MDBmM24gY2xpZW50ZVxuICAgIFVJLT4+QVBJOiAzLiBQT1NUIC9hcGkvYXV0aC9yZWdpc3RlclxcbntlbWFpbCwgbm9tYnJlLCBwYXNzd29yZCwgcm9sfVxuICAgIFxuICAgIEFQSS0+PkRCOiA0LiBDaGVjayBlbWFpbCBcdTAwZmFuaWNvXG4gICAgYWx0IEVtYWlsIHlhIGV4aXN0ZVxuICAgICAgICBEQi0tPj5BUEk6IEVtYWlsIGV4aXN0c1xuICAgICAgICBBUEktLT4+VUk6IDQwMCBCYWQgUmVxdWVzdFxuICAgICAgICBVSS0tPj5Vc3VhcmlvOiBFbWFpbCBlbiB1c29cbiAgICBlbHNlIEVtYWlsIGRpc3BvbmlibGVcbiAgICAgICAgQVBJLT4+VmFsaWRhdG9yOiA1LiB2YWxpZGF0ZV9wYXNzd29yZCgpXG4gICAgICAgIFZhbGlkYXRvci0+PlZhbGlkYXRvcjogNi4gQ2hlY2sgc3RyZW5ndGhcbiAgICAgICAgXG4gICAgICAgIGFsdCBQYXNzd29yZCBkXHUwMGU5YmlsXG4gICAgICAgICAgICBWYWxpZGF0b3ItLT4+QVBJOiBXZWFrIHBhc3N3b3JkXG4gICAgICAgICAgICBBUEktLT4+VUk6IDQwMCBCYWQgUmVxdWVzdFxuICAgICAgICAgICAgVUktLT4+VXN1YXJpbzogUGFzc3dvcmQgcmVxdWlyZW1lbnRzXG4gICAgICAgIGVsc2UgUGFzc3dvcmQgdlx1MDBlMWxpZG9cbiAgICAgICAgICAgIEFQSS0+PkRCOiA3LiBJTlNFUlQgdXN1YXJpb1xuICAgICAgICAgICAgQVBJLT4+REI6IDguIElOU0VSVCBwYXNzd29yZF9oaXN0b3J5XG4gICAgICAgICAgICBEQi0tPj5BUEk6IDkuIFVzdWFyaW8gY3JlYWRvXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEFQSS0+PkVtYWlsOiAxMC4gc2VuZF93ZWxjb21lX2VtYWlsKClcbiAgICAgICAgICAgIEVtYWlsLS0+PkFQSTogMTEuIEVtYWlsIHNlbnRcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQVBJLS0+PlVJOiAxMi4gMjAxIENyZWF0ZWRcXG57dXNlcn1cbiAgICAgICAgICAgIFVJLS0+PlVzdWFyaW86IDEzLiBSZWdpc3RybyBleGl0b3NvXG4gICAgICAgICAgICBVSS0+PlVJOiAxNC4gUmVkaXJlY3QgdG8gbG9naW5cbiAgICAgICAgZW5kXG4gICAgZW5kIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    sequenceDiagram
                        actor Usuario
                        participant UI as Frontend
                        participant API as Backend API
                        participant Validator as Password\nValidator
                        participant DB as Database
                        participant Email as Email\nService
                    
                        Usuario->>UI: 1. Completa formulario
                        UI->>UI: 2. Validación cliente
                        UI->>API: 3. POST /api/auth/register\n{email, nombre, password, rol}
                        
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
                                
                                API-->>UI: 12. 201 Created\n{user}
                                UI-->>Usuario: 13. Registro exitoso
                                UI->>UI: 14. Redirect to login
                            end
                        end

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    sequenceDiagram
                        participant UI as Frontend
                        participant API as Backend API
                        participant Token as JWT Service
                        participant DB as Database
                    
                        UI->>UI: 1. Access token expirado
                        UI->>API: 2. POST /api/auth/refresh\n{refresh_token}
                        
                        API->>Token: 3. validate_refresh_token()
                        
                        alt Token válido y no expirado
                            Token->>DB: 4. Verify user exists & active
                            DB-->>Token: 5. User data
                            
                            Token->>Token: 6. Generate new access_token
                            Token-->>API: 7. {new_access_token}
                            
                            API-->>UI: 8. 200 OK\n{access_token}
                            UI->>UI: 9. Update stored token
                            UI->>UI: 10. Retry original request
                        else Token inválido o expirado
                            Token-->>API: Invalid refresh token
                            API-->>UI: 401 Unauthorized
                            UI->>UI: Clear tokens
                            UI->>UI: Redirect to login
                        end

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIHBhcnRpY2lwYW50IFVJIGFzIEZyb250ZW5kXG4gICAgcGFydGljaXBhbnQgQVBJIGFzIEJhY2tlbmQgQVBJXG4gICAgcGFydGljaXBhbnQgVG9rZW4gYXMgSldUIFNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBEQiBhcyBEYXRhYmFzZVxuXG4gICAgVUktPj5VSTogMS4gQWNjZXNzIHRva2VuIGV4cGlyYWRvXG4gICAgVUktPj5BUEk6IDIuIFBPU1QgL2FwaS9hdXRoL3JlZnJlc2hcXG57cmVmcmVzaF90b2tlbn1cbiAgICBcbiAgICBBUEktPj5Ub2tlbjogMy4gdmFsaWRhdGVfcmVmcmVzaF90b2tlbigpXG4gICAgXG4gICAgYWx0IFRva2VuIHZcdTAwZTFsaWRvIHkgbm8gZXhwaXJhZG9cbiAgICAgICAgVG9rZW4tPj5EQjogNC4gVmVyaWZ5IHVzZXIgZXhpc3RzICYgYWN0aXZlXG4gICAgICAgIERCLS0+PlRva2VuOiA1LiBVc2VyIGRhdGFcbiAgICAgICAgXG4gICAgICAgIFRva2VuLT4+VG9rZW46IDYuIEdlbmVyYXRlIG5ldyBhY2Nlc3NfdG9rZW5cbiAgICAgICAgVG9rZW4tLT4+QVBJOiA3LiB7bmV3X2FjY2Vzc190b2tlbn1cbiAgICAgICAgXG4gICAgICAgIEFQSS0tPj5VSTogOC4gMjAwIE9LXFxue2FjY2Vzc190b2tlbn1cbiAgICAgICAgVUktPj5VSTogOS4gVXBkYXRlIHN0b3JlZCB0b2tlblxuICAgICAgICBVSS0+PlVJOiAxMC4gUmV0cnkgb3JpZ2luYWwgcmVxdWVzdFxuICAgIGVsc2UgVG9rZW4gaW52XHUwMGUxbGlkbyBvIGV4cGlyYWRvXG4gICAgICAgIFRva2VuLS0+PkFQSTogSW52YWxpZCByZWZyZXNoIHRva2VuXG4gICAgICAgIEFQSS0tPj5VSTogNDAxIFVuYXV0aG9yaXplZFxuICAgICAgICBVSS0+PlVJOiBDbGVhciB0b2tlbnNcbiAgICAgICAgVUktPj5VSTogUmVkaXJlY3QgdG8gbG9naW5cbiAgICBlbmQiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIHBhcnRpY2lwYW50IFVJIGFzIEZyb250ZW5kXG4gICAgcGFydGljaXBhbnQgQVBJIGFzIEJhY2tlbmQgQVBJXG4gICAgcGFydGljaXBhbnQgVG9rZW4gYXMgSldUIFNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBEQiBhcyBEYXRhYmFzZVxuXG4gICAgVUktPj5VSTogMS4gQWNjZXNzIHRva2VuIGV4cGlyYWRvXG4gICAgVUktPj5BUEk6IDIuIFBPU1QgL2FwaS9hdXRoL3JlZnJlc2hcXG57cmVmcmVzaF90b2tlbn1cbiAgICBcbiAgICBBUEktPj5Ub2tlbjogMy4gdmFsaWRhdGVfcmVmcmVzaF90b2tlbigpXG4gICAgXG4gICAgYWx0IFRva2VuIHZcdTAwZTFsaWRvIHkgbm8gZXhwaXJhZG9cbiAgICAgICAgVG9rZW4tPj5EQjogNC4gVmVyaWZ5IHVzZXIgZXhpc3RzICYgYWN0aXZlXG4gICAgICAgIERCLS0+PlRva2VuOiA1LiBVc2VyIGRhdGFcbiAgICAgICAgXG4gICAgICAgIFRva2VuLT4+VG9rZW46IDYuIEdlbmVyYXRlIG5ldyBhY2Nlc3NfdG9rZW5cbiAgICAgICAgVG9rZW4tLT4+QVBJOiA3LiB7bmV3X2FjY2Vzc190b2tlbn1cbiAgICAgICAgXG4gICAgICAgIEFQSS0tPj5VSTogOC4gMjAwIE9LXFxue2FjY2Vzc190b2tlbn1cbiAgICAgICAgVUktPj5VSTogOS4gVXBkYXRlIHN0b3JlZCB0b2tlblxuICAgICAgICBVSS0+PlVJOiAxMC4gUmV0cnkgb3JpZ2luYWwgcmVxdWVzdFxuICAgIGVsc2UgVG9rZW4gaW52XHUwMGUxbGlkbyBvIGV4cGlyYWRvXG4gICAgICAgIFRva2VuLS0+PkFQSTogSW52YWxpZCByZWZyZXNoIHRva2VuXG4gICAgICAgIEFQSS0tPj5VSTogNDAxIFVuYXV0aG9yaXplZFxuICAgICAgICBVSS0+PlVJOiBDbGVhciB0b2tlbnNcbiAgICAgICAgVUktPj5VSTogUmVkaXJlY3QgdG8gbG9naW5cbiAgICBlbmQiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    sequenceDiagram
                        participant UI as Frontend
                        participant API as Backend API
                        participant Token as JWT Service
                        participant DB as Database
                    
                        UI->>UI: 1. Access token expirado
                        UI->>API: 2. POST /api/auth/refresh\n{refresh_token}
                        
                        API->>Token: 3. validate_refresh_token()
                        
                        alt Token válido y no expirado
                            Token->>DB: 4. Verify user exists & active
                            DB-->>Token: 5. User data
                            
                            Token->>Token: 6. Generate new access_token
                            Token-->>API: 7. {new_access_token}
                            
                            API-->>UI: 8. 200 OK\n{access_token}
                            UI->>UI: 9. Update stored token
                            UI->>UI: 10. Retry original request
                        else Token inválido o expirado
                            Token-->>API: Invalid refresh token
                            API-->>UI: 401 Unauthorized
                            UI->>UI: Clear tokens
                            UI->>UI: Redirect to login
                        end

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    sequenceDiagram
                        actor Usuario
                        participant UI as Frontend
                        participant API as Backend API
                        participant Token as Token\nGenerator
                        participant DB as Database
                        participant Email as Email\nService
                    
                        rect rgb("200, 220, 240")
                            Note over Usuario,Email: Fase 1: Solicitud de Reset
                            Usuario->>UI: 1. Click "Olvidé mi contraseña"
                            UI->>UI: 2. Mostrar formulario
                            Usuario->>UI: 3. Ingresa email
                            UI->>API: 4. POST /api/auth/forgot-password\n{email}
                            
                            API->>DB: 5. Find user by email
                            
                            alt Usuario existe
                                DB-->>API: 6. Usuario data
                                API->>Token: 7. generate_reset_token()
                                Token-->>API: 8. {uid, token}
                                
                                API->>DB: 9. Store reset token
                                API->>Email: 10. send_reset_email("uid, token")
                                Email-->>API: 11. Email sent
                                
                                API-->>UI: 12. 200 OK
                                UI-->>Usuario: 13. "Revisa tu email"
                            else Usuario no existe
                                API-->>UI: 200 OK("por seguridad")
                                UI-->>Usuario: "Revisa tu email"
                            end
                        end
                    
                        rect rgb("220, 240, 200")
                            Note over Usuario,Email: Fase 2: Reset de Contraseña
                            Usuario->>Usuario: 14. Abre email
                            Usuario->>UI: 15. Click link reset
                            UI->>API: 16. GET /reset-password/{uid}/{token}
                            
                            API->>Token: 17. validate_reset_token()
                            
                            alt Token válido
                                Token-->>API: Valid
                                API-->>UI: 18. Show reset form
                                
                                Usuario->>UI: 19. Ingresa nueva password
                                UI->>API: 20. POST /api/auth/reset-password\n{uid, token, new_password}
                                
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

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIFVzdWFyaW9cbiAgICBwYXJ0aWNpcGFudCBVSSBhcyBGcm9udGVuZFxuICAgIHBhcnRpY2lwYW50IEFQSSBhcyBCYWNrZW5kIEFQSVxuICAgIHBhcnRpY2lwYW50IFRva2VuIGFzIFRva2VuXFxuR2VuZXJhdG9yXG4gICAgcGFydGljaXBhbnQgREIgYXMgRGF0YWJhc2VcbiAgICBwYXJ0aWNpcGFudCBFbWFpbCBhcyBFbWFpbFxcblNlcnZpY2VcblxuICAgIHJlY3QgcmdiKFwiMjAwLCAyMjAsIDI0MFwiKVxuICAgICAgICBOb3RlIG92ZXIgVXN1YXJpbyxFbWFpbDogRmFzZSAxOiBTb2xpY2l0dWQgZGUgUmVzZXRcbiAgICAgICAgVXN1YXJpby0+PlVJOiAxLiBDbGljayBcIk9sdmlkXHUwMGU5IG1pIGNvbnRyYXNlXHUwMGYxYVwiXG4gICAgICAgIFVJLT4+VUk6IDIuIE1vc3RyYXIgZm9ybXVsYXJpb1xuICAgICAgICBVc3VhcmlvLT4+VUk6IDMuIEluZ3Jlc2EgZW1haWxcbiAgICAgICAgVUktPj5BUEk6IDQuIFBPU1QgL2FwaS9hdXRoL2ZvcmdvdC1wYXNzd29yZFxcbntlbWFpbH1cbiAgICAgICAgXG4gICAgICAgIEFQSS0+PkRCOiA1LiBGaW5kIHVzZXIgYnkgZW1haWxcbiAgICAgICAgXG4gICAgICAgIGFsdCBVc3VhcmlvIGV4aXN0ZVxuICAgICAgICAgICAgREItLT4+QVBJOiA2LiBVc3VhcmlvIGRhdGFcbiAgICAgICAgICAgIEFQSS0+PlRva2VuOiA3LiBnZW5lcmF0ZV9yZXNldF90b2tlbigpXG4gICAgICAgICAgICBUb2tlbi0tPj5BUEk6IDguIHt1aWQsIHRva2VufVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBBUEktPj5EQjogOS4gU3RvcmUgcmVzZXQgdG9rZW5cbiAgICAgICAgICAgIEFQSS0+PkVtYWlsOiAxMC4gc2VuZF9yZXNldF9lbWFpbChcInVpZCwgdG9rZW5cIilcbiAgICAgICAgICAgIEVtYWlsLS0+PkFQSTogMTEuIEVtYWlsIHNlbnRcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQVBJLS0+PlVJOiAxMi4gMjAwIE9LXG4gICAgICAgICAgICBVSS0tPj5Vc3VhcmlvOiAxMy4gXCJSZXZpc2EgdHUgZW1haWxcIlxuICAgICAgICBlbHNlIFVzdWFyaW8gbm8gZXhpc3RlXG4gICAgICAgICAgICBBUEktLT4+VUk6IDIwMCBPSyhcInBvciBzZWd1cmlkYWRcIilcbiAgICAgICAgICAgIFVJLS0+PlVzdWFyaW86IFwiUmV2aXNhIHR1IGVtYWlsXCJcbiAgICAgICAgZW5kXG4gICAgZW5kXG5cbiAgICByZWN0IHJnYihcIjIyMCwgMjQwLCAyMDBcIilcbiAgICAgICAgTm90ZSBvdmVyIFVzdWFyaW8sRW1haWw6IEZhc2UgMjogUmVzZXQgZGUgQ29udHJhc2VcdTAwZjFhXG4gICAgICAgIFVzdWFyaW8tPj5Vc3VhcmlvOiAxNC4gQWJyZSBlbWFpbFxuICAgICAgICBVc3VhcmlvLT4+VUk6IDE1LiBDbGljayBsaW5rIHJlc2V0XG4gICAgICAgIFVJLT4+QVBJOiAxNi4gR0VUIC9yZXNldC1wYXNzd29yZC97dWlkfS97dG9rZW59XG4gICAgICAgIFxuICAgICAgICBBUEktPj5Ub2tlbjogMTcuIHZhbGlkYXRlX3Jlc2V0X3Rva2VuKClcbiAgICAgICAgXG4gICAgICAgIGFsdCBUb2tlbiB2XHUwMGUxbGlkb1xuICAgICAgICAgICAgVG9rZW4tLT4+QVBJOiBWYWxpZFxuICAgICAgICAgICAgQVBJLS0+PlVJOiAxOC4gU2hvdyByZXNldCBmb3JtXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFVzdWFyaW8tPj5VSTogMTkuIEluZ3Jlc2EgbnVldmEgcGFzc3dvcmRcbiAgICAgICAgICAgIFVJLT4+QVBJOiAyMC4gUE9TVCAvYXBpL2F1dGgvcmVzZXQtcGFzc3dvcmRcXG57dWlkLCB0b2tlbiwgbmV3X3Bhc3N3b3JkfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBBUEktPj5Ub2tlbjogMjEuIHZlcmlmeV90b2tlbigpXG4gICAgICAgICAgICBBUEktPj5EQjogMjIuIEdldCBwYXNzd29yZF9oaXN0b3J5XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFsdCBQYXNzd29yZCBubyByZXV0aWxpemFkYVxuICAgICAgICAgICAgICAgIEFQSS0+PkRCOiAyMy4gVVBEQVRFIHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgQVBJLT4+REI6IDI0LiBJTlNFUlQgcGFzc3dvcmRfaGlzdG9yeVxuICAgICAgICAgICAgICAgIEFQSS0+PkRCOiAyNS4gREVMRVRFIHJlc2V0X3Rva2VuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgQVBJLS0+PlVJOiAyNi4gMjAwIE9LXG4gICAgICAgICAgICAgICAgVUktLT4+VXN1YXJpbzogMjcuIFwiUGFzc3dvcmQgYWN0dWFsaXphZG9cIlxuICAgICAgICAgICAgICAgIFVJLT4+VUk6IDI4LiBSZWRpcmVjdCB0byBsb2dpblxuICAgICAgICAgICAgZWxzZSBQYXNzd29yZCB5YSB1c2FkYVxuICAgICAgICAgICAgICAgIEFQSS0tPj5VSTogNDAwIEJhZCBSZXF1ZXN0XG4gICAgICAgICAgICAgICAgVUktLT4+VXN1YXJpbzogXCJQYXNzd29yZCB5YSB1c2FkYVwiXG4gICAgICAgICAgICBlbmRcbiAgICAgICAgZWxzZSBUb2tlbiBpbnZcdTAwZTFsaWRvL2V4cGlyYWRvXG4gICAgICAgICAgICBUb2tlbi0tPj5BUEk6IEludmFsaWRcbiAgICAgICAgICAgIEFQSS0tPj5VSTogNDAwIEJhZCBSZXF1ZXN0XG4gICAgICAgICAgICBVSS0tPj5Vc3VhcmlvOiBcIkxpbmsgZXhwaXJhZG9cIlxuICAgICAgICBlbmRcbiAgICBlbmQiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIFVzdWFyaW9cbiAgICBwYXJ0aWNpcGFudCBVSSBhcyBGcm9udGVuZFxuICAgIHBhcnRpY2lwYW50IEFQSSBhcyBCYWNrZW5kIEFQSVxuICAgIHBhcnRpY2lwYW50IFRva2VuIGFzIFRva2VuXFxuR2VuZXJhdG9yXG4gICAgcGFydGljaXBhbnQgREIgYXMgRGF0YWJhc2VcbiAgICBwYXJ0aWNpcGFudCBFbWFpbCBhcyBFbWFpbFxcblNlcnZpY2VcblxuICAgIHJlY3QgcmdiKFwiMjAwLCAyMjAsIDI0MFwiKVxuICAgICAgICBOb3RlIG92ZXIgVXN1YXJpbyxFbWFpbDogRmFzZSAxOiBTb2xpY2l0dWQgZGUgUmVzZXRcbiAgICAgICAgVXN1YXJpby0+PlVJOiAxLiBDbGljayBcIk9sdmlkXHUwMGU5IG1pIGNvbnRyYXNlXHUwMGYxYVwiXG4gICAgICAgIFVJLT4+VUk6IDIuIE1vc3RyYXIgZm9ybXVsYXJpb1xuICAgICAgICBVc3VhcmlvLT4+VUk6IDMuIEluZ3Jlc2EgZW1haWxcbiAgICAgICAgVUktPj5BUEk6IDQuIFBPU1QgL2FwaS9hdXRoL2ZvcmdvdC1wYXNzd29yZFxcbntlbWFpbH1cbiAgICAgICAgXG4gICAgICAgIEFQSS0+PkRCOiA1LiBGaW5kIHVzZXIgYnkgZW1haWxcbiAgICAgICAgXG4gICAgICAgIGFsdCBVc3VhcmlvIGV4aXN0ZVxuICAgICAgICAgICAgREItLT4+QVBJOiA2LiBVc3VhcmlvIGRhdGFcbiAgICAgICAgICAgIEFQSS0+PlRva2VuOiA3LiBnZW5lcmF0ZV9yZXNldF90b2tlbigpXG4gICAgICAgICAgICBUb2tlbi0tPj5BUEk6IDguIHt1aWQsIHRva2VufVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBBUEktPj5EQjogOS4gU3RvcmUgcmVzZXQgdG9rZW5cbiAgICAgICAgICAgIEFQSS0+PkVtYWlsOiAxMC4gc2VuZF9yZXNldF9lbWFpbChcInVpZCwgdG9rZW5cIilcbiAgICAgICAgICAgIEVtYWlsLS0+PkFQSTogMTEuIEVtYWlsIHNlbnRcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQVBJLS0+PlVJOiAxMi4gMjAwIE9LXG4gICAgICAgICAgICBVSS0tPj5Vc3VhcmlvOiAxMy4gXCJSZXZpc2EgdHUgZW1haWxcIlxuICAgICAgICBlbHNlIFVzdWFyaW8gbm8gZXhpc3RlXG4gICAgICAgICAgICBBUEktLT4+VUk6IDIwMCBPSyhcInBvciBzZWd1cmlkYWRcIilcbiAgICAgICAgICAgIFVJLS0+PlVzdWFyaW86IFwiUmV2aXNhIHR1IGVtYWlsXCJcbiAgICAgICAgZW5kXG4gICAgZW5kXG5cbiAgICByZWN0IHJnYihcIjIyMCwgMjQwLCAyMDBcIilcbiAgICAgICAgTm90ZSBvdmVyIFVzdWFyaW8sRW1haWw6IEZhc2UgMjogUmVzZXQgZGUgQ29udHJhc2VcdTAwZjFhXG4gICAgICAgIFVzdWFyaW8tPj5Vc3VhcmlvOiAxNC4gQWJyZSBlbWFpbFxuICAgICAgICBVc3VhcmlvLT4+VUk6IDE1LiBDbGljayBsaW5rIHJlc2V0XG4gICAgICAgIFVJLT4+QVBJOiAxNi4gR0VUIC9yZXNldC1wYXNzd29yZC97dWlkfS97dG9rZW59XG4gICAgICAgIFxuICAgICAgICBBUEktPj5Ub2tlbjogMTcuIHZhbGlkYXRlX3Jlc2V0X3Rva2VuKClcbiAgICAgICAgXG4gICAgICAgIGFsdCBUb2tlbiB2XHUwMGUxbGlkb1xuICAgICAgICAgICAgVG9rZW4tLT4+QVBJOiBWYWxpZFxuICAgICAgICAgICAgQVBJLS0+PlVJOiAxOC4gU2hvdyByZXNldCBmb3JtXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFVzdWFyaW8tPj5VSTogMTkuIEluZ3Jlc2EgbnVldmEgcGFzc3dvcmRcbiAgICAgICAgICAgIFVJLT4+QVBJOiAyMC4gUE9TVCAvYXBpL2F1dGgvcmVzZXQtcGFzc3dvcmRcXG57dWlkLCB0b2tlbiwgbmV3X3Bhc3N3b3JkfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBBUEktPj5Ub2tlbjogMjEuIHZlcmlmeV90b2tlbigpXG4gICAgICAgICAgICBBUEktPj5EQjogMjIuIEdldCBwYXNzd29yZF9oaXN0b3J5XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFsdCBQYXNzd29yZCBubyByZXV0aWxpemFkYVxuICAgICAgICAgICAgICAgIEFQSS0+PkRCOiAyMy4gVVBEQVRFIHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgQVBJLT4+REI6IDI0LiBJTlNFUlQgcGFzc3dvcmRfaGlzdG9yeVxuICAgICAgICAgICAgICAgIEFQSS0+PkRCOiAyNS4gREVMRVRFIHJlc2V0X3Rva2VuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgQVBJLS0+PlVJOiAyNi4gMjAwIE9LXG4gICAgICAgICAgICAgICAgVUktLT4+VXN1YXJpbzogMjcuIFwiUGFzc3dvcmQgYWN0dWFsaXphZG9cIlxuICAgICAgICAgICAgICAgIFVJLT4+VUk6IDI4LiBSZWRpcmVjdCB0byBsb2dpblxuICAgICAgICAgICAgZWxzZSBQYXNzd29yZCB5YSB1c2FkYVxuICAgICAgICAgICAgICAgIEFQSS0tPj5VSTogNDAwIEJhZCBSZXF1ZXN0XG4gICAgICAgICAgICAgICAgVUktLT4+VXN1YXJpbzogXCJQYXNzd29yZCB5YSB1c2FkYVwiXG4gICAgICAgICAgICBlbmRcbiAgICAgICAgZWxzZSBUb2tlbiBpbnZcdTAwZTFsaWRvL2V4cGlyYWRvXG4gICAgICAgICAgICBUb2tlbi0tPj5BUEk6IEludmFsaWRcbiAgICAgICAgICAgIEFQSS0tPj5VSTogNDAwIEJhZCBSZXF1ZXN0XG4gICAgICAgICAgICBVSS0tPj5Vc3VhcmlvOiBcIkxpbmsgZXhwaXJhZG9cIlxuICAgICAgICBlbmRcbiAgICBlbmQiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    sequenceDiagram
                        actor Usuario
                        participant UI as Frontend
                        participant API as Backend API
                        participant Token as Token\nGenerator
                        participant DB as Database
                        participant Email as Email\nService
                    
                        rect rgb("200, 220, 240")
                            Note over Usuario,Email: Fase 1: Solicitud de Reset
                            Usuario->>UI: 1. Click "Olvidé mi contraseña"
                            UI->>UI: 2. Mostrar formulario
                            Usuario->>UI: 3. Ingresa email
                            UI->>API: 4. POST /api/auth/forgot-password\n{email}
                            
                            API->>DB: 5. Find user by email
                            
                            alt Usuario existe
                                DB-->>API: 6. Usuario data
                                API->>Token: 7. generate_reset_token()
                                Token-->>API: 8. {uid, token}
                                
                                API->>DB: 9. Store reset token
                                API->>Email: 10. send_reset_email("uid, token")
                                Email-->>API: 11. Email sent
                                
                                API-->>UI: 12. 200 OK
                                UI-->>Usuario: 13. "Revisa tu email"
                            else Usuario no existe
                                API-->>UI: 200 OK("por seguridad")
                                UI-->>Usuario: "Revisa tu email"
                            end
                        end
                    
                        rect rgb("220, 240, 200")
                            Note over Usuario,Email: Fase 2: Reset de Contraseña
                            Usuario->>Usuario: 14. Abre email
                            Usuario->>UI: 15. Click link reset
                            UI->>API: 16. GET /reset-password/{uid}/{token}
                            
                            API->>Token: 17. validate_reset_token()
                            
                            alt Token válido
                                Token-->>API: Valid
                                API-->>UI: 18. Show reset form
                                
                                Usuario->>UI: 19. Ingresa nueva password
                                UI->>API: 20. POST /api/auth/reset-password\n{uid, token, new_password}
                                
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

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    sequenceDiagram
                        actor Cliente
                        participant UI as Frontend
                        participant API as Backend API
                        participant Order as Order\nService
                        participant Stock as Stock\nService
                        participant DB as Database
                        participant Notif as Notification\nService
                    
                        Cliente->>UI: 1. Agrega productos al carrito
                        Cliente->>UI: 2. Click "Confirmar pedido"
                        
                        UI->>UI: 3. Valida carrito no vacío
                        UI->>API: 4. POST /api/pedidos\n{items: [{producto_id, cantidad}]}
                        
                        API->>Order: 5. create_order("items")
                        
                        loop Por cada item
                            Order->>Stock: 6. validate_stock("producto, cantidad")
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
                            Order->>Stock: 12. reduce_stock("producto, cantidad")
                            Stock->>DB: 13. UPDATE stock
                        end
                        
                        Order->>Order: 14. calculate_total()
                        Order->>DB: 15. UPDATE pedido SET total
                        
                        Order->>DB: 16. COMMIT TRANSACTION
                        
                        Order->>Notif: 17. notify_order_created()
                        Notif->>Notif: 18. Create notifications
                        Notif-->>Order: OK
                        
                        Order-->>API: 19. Pedido creado
                        API-->>UI: 20. 201 Created{"pedido"}
                        UI-->>Cliente: 21. "Pedido creado exitosamente"
                        UI->>UI: 22. Redirect to pagos

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIENsaWVudGVcbiAgICBwYXJ0aWNpcGFudCBVSSBhcyBGcm9udGVuZFxuICAgIHBhcnRpY2lwYW50IEFQSSBhcyBCYWNrZW5kIEFQSVxuICAgIHBhcnRpY2lwYW50IE9yZGVyIGFzIE9yZGVyXFxuU2VydmljZVxuICAgIHBhcnRpY2lwYW50IFN0b2NrIGFzIFN0b2NrXFxuU2VydmljZVxuICAgIHBhcnRpY2lwYW50IERCIGFzIERhdGFiYXNlXG4gICAgcGFydGljaXBhbnQgTm90aWYgYXMgTm90aWZpY2F0aW9uXFxuU2VydmljZVxuXG4gICAgQ2xpZW50ZS0+PlVJOiAxLiBBZ3JlZ2EgcHJvZHVjdG9zIGFsIGNhcnJpdG9cbiAgICBDbGllbnRlLT4+VUk6IDIuIENsaWNrIFwiQ29uZmlybWFyIHBlZGlkb1wiXG4gICAgXG4gICAgVUktPj5VSTogMy4gVmFsaWRhIGNhcnJpdG8gbm8gdmFjXHUwMGVkb1xuICAgIFVJLT4+QVBJOiA0LiBQT1NUIC9hcGkvcGVkaWRvc1xcbntpdGVtczogW3twcm9kdWN0b19pZCwgY2FudGlkYWR9XX1cbiAgICBcbiAgICBBUEktPj5PcmRlcjogNS4gY3JlYXRlX29yZGVyKFwiaXRlbXNcIilcbiAgICBcbiAgICBsb29wIFBvciBjYWRhIGl0ZW1cbiAgICAgICAgT3JkZXItPj5TdG9jazogNi4gdmFsaWRhdGVfc3RvY2soXCJwcm9kdWN0bywgY2FudGlkYWRcIilcbiAgICAgICAgU3RvY2stPj5EQjogNy4gU0VMRUNUIHN0b2NrIEZST00gcHJvZHVjdG9zXG4gICAgICAgIERCLS0+PlN0b2NrOiA4LiBTdG9jayBhY3R1YWxcbiAgICAgICAgXG4gICAgICAgIGFsdCBTdG9jayBzdWZpY2llbnRlXG4gICAgICAgICAgICBTdG9jay0tPj5PcmRlcjogT0tcbiAgICAgICAgZWxzZSBTdG9jayBpbnN1ZmljaWVudGVcbiAgICAgICAgICAgIFN0b2NrLS0+Pk9yZGVyOiBTdG9jayBpbnN1ZmljaWVudGVcbiAgICAgICAgICAgIE9yZGVyLS0+PkFQSTogRXJyb3JcbiAgICAgICAgICAgIEFQSS0tPj5VSTogNDAwIEJhZCBSZXF1ZXN0XG4gICAgICAgICAgICBVSS0tPj5DbGllbnRlOiBcIlN0b2NrIGluc3VmaWNpZW50ZVwiXG4gICAgICAgIGVuZFxuICAgIGVuZFxuICAgIFxuICAgIE9yZGVyLT4+REI6IDkuIEJFR0lOIFRSQU5TQUNUSU9OXG4gICAgT3JkZXItPj5EQjogMTAuIElOU0VSVCBJTlRPIHBlZGlkb3NcbiAgICBcbiAgICBsb29wIFBvciBjYWRhIGl0ZW1cbiAgICAgICAgT3JkZXItPj5EQjogMTEuIElOU0VSVCBJTlRPIGRldGFsbGVfcGVkaWRvXG4gICAgICAgIE9yZGVyLT4+U3RvY2s6IDEyLiByZWR1Y2Vfc3RvY2soXCJwcm9kdWN0bywgY2FudGlkYWRcIilcbiAgICAgICAgU3RvY2stPj5EQjogMTMuIFVQREFURSBzdG9ja1xuICAgIGVuZFxuICAgIFxuICAgIE9yZGVyLT4+T3JkZXI6IDE0LiBjYWxjdWxhdGVfdG90YWwoKVxuICAgIE9yZGVyLT4+REI6IDE1LiBVUERBVEUgcGVkaWRvIFNFVCB0b3RhbFxuICAgIFxuICAgIE9yZGVyLT4+REI6IDE2LiBDT01NSVQgVFJBTlNBQ1RJT05cbiAgICBcbiAgICBPcmRlci0+Pk5vdGlmOiAxNy4gbm90aWZ5X29yZGVyX2NyZWF0ZWQoKVxuICAgIE5vdGlmLT4+Tm90aWY6IDE4LiBDcmVhdGUgbm90aWZpY2F0aW9uc1xuICAgIE5vdGlmLS0+Pk9yZGVyOiBPS1xuICAgIFxuICAgIE9yZGVyLS0+PkFQSTogMTkuIFBlZGlkbyBjcmVhZG9cbiAgICBBUEktLT4+VUk6IDIwLiAyMDEgQ3JlYXRlZHtcInBlZGlkb1wifVxuICAgIFVJLS0+PkNsaWVudGU6IDIxLiBcIlBlZGlkbyBjcmVhZG8gZXhpdG9zYW1lbnRlXCJcbiAgICBVSS0+PlVJOiAyMi4gUmVkaXJlY3QgdG8gcGFnb3MiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIENsaWVudGVcbiAgICBwYXJ0aWNpcGFudCBVSSBhcyBGcm9udGVuZFxuICAgIHBhcnRpY2lwYW50IEFQSSBhcyBCYWNrZW5kIEFQSVxuICAgIHBhcnRpY2lwYW50IE9yZGVyIGFzIE9yZGVyXFxuU2VydmljZVxuICAgIHBhcnRpY2lwYW50IFN0b2NrIGFzIFN0b2NrXFxuU2VydmljZVxuICAgIHBhcnRpY2lwYW50IERCIGFzIERhdGFiYXNlXG4gICAgcGFydGljaXBhbnQgTm90aWYgYXMgTm90aWZpY2F0aW9uXFxuU2VydmljZVxuXG4gICAgQ2xpZW50ZS0+PlVJOiAxLiBBZ3JlZ2EgcHJvZHVjdG9zIGFsIGNhcnJpdG9cbiAgICBDbGllbnRlLT4+VUk6IDIuIENsaWNrIFwiQ29uZmlybWFyIHBlZGlkb1wiXG4gICAgXG4gICAgVUktPj5VSTogMy4gVmFsaWRhIGNhcnJpdG8gbm8gdmFjXHUwMGVkb1xuICAgIFVJLT4+QVBJOiA0LiBQT1NUIC9hcGkvcGVkaWRvc1xcbntpdGVtczogW3twcm9kdWN0b19pZCwgY2FudGlkYWR9XX1cbiAgICBcbiAgICBBUEktPj5PcmRlcjogNS4gY3JlYXRlX29yZGVyKFwiaXRlbXNcIilcbiAgICBcbiAgICBsb29wIFBvciBjYWRhIGl0ZW1cbiAgICAgICAgT3JkZXItPj5TdG9jazogNi4gdmFsaWRhdGVfc3RvY2soXCJwcm9kdWN0bywgY2FudGlkYWRcIilcbiAgICAgICAgU3RvY2stPj5EQjogNy4gU0VMRUNUIHN0b2NrIEZST00gcHJvZHVjdG9zXG4gICAgICAgIERCLS0+PlN0b2NrOiA4LiBTdG9jayBhY3R1YWxcbiAgICAgICAgXG4gICAgICAgIGFsdCBTdG9jayBzdWZpY2llbnRlXG4gICAgICAgICAgICBTdG9jay0tPj5PcmRlcjogT0tcbiAgICAgICAgZWxzZSBTdG9jayBpbnN1ZmljaWVudGVcbiAgICAgICAgICAgIFN0b2NrLS0+Pk9yZGVyOiBTdG9jayBpbnN1ZmljaWVudGVcbiAgICAgICAgICAgIE9yZGVyLS0+PkFQSTogRXJyb3JcbiAgICAgICAgICAgIEFQSS0tPj5VSTogNDAwIEJhZCBSZXF1ZXN0XG4gICAgICAgICAgICBVSS0tPj5DbGllbnRlOiBcIlN0b2NrIGluc3VmaWNpZW50ZVwiXG4gICAgICAgIGVuZFxuICAgIGVuZFxuICAgIFxuICAgIE9yZGVyLT4+REI6IDkuIEJFR0lOIFRSQU5TQUNUSU9OXG4gICAgT3JkZXItPj5EQjogMTAuIElOU0VSVCBJTlRPIHBlZGlkb3NcbiAgICBcbiAgICBsb29wIFBvciBjYWRhIGl0ZW1cbiAgICAgICAgT3JkZXItPj5EQjogMTEuIElOU0VSVCBJTlRPIGRldGFsbGVfcGVkaWRvXG4gICAgICAgIE9yZGVyLT4+U3RvY2s6IDEyLiByZWR1Y2Vfc3RvY2soXCJwcm9kdWN0bywgY2FudGlkYWRcIilcbiAgICAgICAgU3RvY2stPj5EQjogMTMuIFVQREFURSBzdG9ja1xuICAgIGVuZFxuICAgIFxuICAgIE9yZGVyLT4+T3JkZXI6IDE0LiBjYWxjdWxhdGVfdG90YWwoKVxuICAgIE9yZGVyLT4+REI6IDE1LiBVUERBVEUgcGVkaWRvIFNFVCB0b3RhbFxuICAgIFxuICAgIE9yZGVyLT4+REI6IDE2LiBDT01NSVQgVFJBTlNBQ1RJT05cbiAgICBcbiAgICBPcmRlci0+Pk5vdGlmOiAxNy4gbm90aWZ5X29yZGVyX2NyZWF0ZWQoKVxuICAgIE5vdGlmLT4+Tm90aWY6IDE4LiBDcmVhdGUgbm90aWZpY2F0aW9uc1xuICAgIE5vdGlmLS0+Pk9yZGVyOiBPS1xuICAgIFxuICAgIE9yZGVyLS0+PkFQSTogMTkuIFBlZGlkbyBjcmVhZG9cbiAgICBBUEktLT4+VUk6IDIwLiAyMDEgQ3JlYXRlZHtcInBlZGlkb1wifVxuICAgIFVJLS0+PkNsaWVudGU6IDIxLiBcIlBlZGlkbyBjcmVhZG8gZXhpdG9zYW1lbnRlXCJcbiAgICBVSS0+PlVJOiAyMi4gUmVkaXJlY3QgdG8gcGFnb3MiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    sequenceDiagram
                        actor Cliente
                        participant UI as Frontend
                        participant API as Backend API
                        participant Order as Order\nService
                        participant Stock as Stock\nService
                        participant DB as Database
                        participant Notif as Notification\nService
                    
                        Cliente->>UI: 1. Agrega productos al carrito
                        Cliente->>UI: 2. Click "Confirmar pedido"
                        
                        UI->>UI: 3. Valida carrito no vacío
                        UI->>API: 4. POST /api/pedidos\n{items: [{producto_id, cantidad}]}
                        
                        API->>Order: 5. create_order("items")
                        
                        loop Por cada item
                            Order->>Stock: 6. validate_stock("producto, cantidad")
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
                            Order->>Stock: 12. reduce_stock("producto, cantidad")
                            Stock->>DB: 13. UPDATE stock
                        end
                        
                        Order->>Order: 14. calculate_total()
                        Order->>DB: 15. UPDATE pedido SET total
                        
                        Order->>DB: 16. COMMIT TRANSACTION
                        
                        Order->>Notif: 17. notify_order_created()
                        Notif->>Notif: 18. Create notifications
                        Notif-->>Order: OK
                        
                        Order-->>API: 19. Pedido creado
                        API-->>UI: 20. 201 Created{"pedido"}
                        UI-->>Cliente: 21. "Pedido creado exitosamente"
                        UI->>UI: 22. Redirect to pagos

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    sequenceDiagram
                        actor Logistica
                        participant UI as Frontend
                        participant API as Backend API
                        participant Order as Order\nService
                        participant DB as Database
                        participant Venta as Venta\nService
                        participant Notif as Notification\nService
                    
                        Logistica->>UI: 1. Selecciona pedido
                        Logistica->>UI: 2. Click "Cambiar estado"
                        
                        UI->>API: 3. PATCH /api/pedidos/{id}\n{estado: "nuevo_estado"}
                        
                        API->>Order: 4. update_status("pedido_id, nuevo_estado")
                        Order->>DB: 5. SELECT pedido WHERE id=?
                        DB-->>Order: 6. Pedido actual
                        
                        Order->>Order: 7. validate_transition()
                        
                        alt Transición válida
                            Order->>DB: 8. UPDATE pedido SET estado
                            DB-->>Order: 9. Updated
                            
                            alt Estado = "entregado"
                                Order->>Venta: 10. create_venta("pedido")
                                Venta->>DB: 11. INSERT INTO ventas
                                Venta->>DB: 12. INSERT INTO detalle_ventas
                                Venta-->>Order: 13. Venta creada
                            end
                            
                            Order->>Notif: 14. notify_status_change()
                            Notif->>Notif: 15. Send email to cliente
                            Notif-->>Order: 16. Notification sent
                            
                            Order-->>API: 17. Pedido actualizado
                            API-->>UI: 18. 200 OK{"pedido"}
                            UI-->>Logistica: 19. "Estado actualizado"
                        else Transición inválida
                            Order-->>API: Error: Invalid transition
                            API-->>UI: 400 Bad Request
                            UI-->>Logistica: "Transición no permitida"
                        end

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIExvZ2lzdGljYVxuICAgIHBhcnRpY2lwYW50IFVJIGFzIEZyb250ZW5kXG4gICAgcGFydGljaXBhbnQgQVBJIGFzIEJhY2tlbmQgQVBJXG4gICAgcGFydGljaXBhbnQgT3JkZXIgYXMgT3JkZXJcXG5TZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgREIgYXMgRGF0YWJhc2VcbiAgICBwYXJ0aWNpcGFudCBWZW50YSBhcyBWZW50YVxcblNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBOb3RpZiBhcyBOb3RpZmljYXRpb25cXG5TZXJ2aWNlXG5cbiAgICBMb2dpc3RpY2EtPj5VSTogMS4gU2VsZWNjaW9uYSBwZWRpZG9cbiAgICBMb2dpc3RpY2EtPj5VSTogMi4gQ2xpY2sgXCJDYW1iaWFyIGVzdGFkb1wiXG4gICAgXG4gICAgVUktPj5BUEk6IDMuIFBBVENIIC9hcGkvcGVkaWRvcy97aWR9XFxue2VzdGFkbzogXCJudWV2b19lc3RhZG9cIn1cbiAgICBcbiAgICBBUEktPj5PcmRlcjogNC4gdXBkYXRlX3N0YXR1cyhcInBlZGlkb19pZCwgbnVldm9fZXN0YWRvXCIpXG4gICAgT3JkZXItPj5EQjogNS4gU0VMRUNUIHBlZGlkbyBXSEVSRSBpZD0/XG4gICAgREItLT4+T3JkZXI6IDYuIFBlZGlkbyBhY3R1YWxcbiAgICBcbiAgICBPcmRlci0+Pk9yZGVyOiA3LiB2YWxpZGF0ZV90cmFuc2l0aW9uKClcbiAgICBcbiAgICBhbHQgVHJhbnNpY2lcdTAwZjNuIHZcdTAwZTFsaWRhXG4gICAgICAgIE9yZGVyLT4+REI6IDguIFVQREFURSBwZWRpZG8gU0VUIGVzdGFkb1xuICAgICAgICBEQi0tPj5PcmRlcjogOS4gVXBkYXRlZFxuICAgICAgICBcbiAgICAgICAgYWx0IEVzdGFkbyA9IFwiZW50cmVnYWRvXCJcbiAgICAgICAgICAgIE9yZGVyLT4+VmVudGE6IDEwLiBjcmVhdGVfdmVudGEoXCJwZWRpZG9cIilcbiAgICAgICAgICAgIFZlbnRhLT4+REI6IDExLiBJTlNFUlQgSU5UTyB2ZW50YXNcbiAgICAgICAgICAgIFZlbnRhLT4+REI6IDEyLiBJTlNFUlQgSU5UTyBkZXRhbGxlX3ZlbnRhc1xuICAgICAgICAgICAgVmVudGEtLT4+T3JkZXI6IDEzLiBWZW50YSBjcmVhZGFcbiAgICAgICAgZW5kXG4gICAgICAgIFxuICAgICAgICBPcmRlci0+Pk5vdGlmOiAxNC4gbm90aWZ5X3N0YXR1c19jaGFuZ2UoKVxuICAgICAgICBOb3RpZi0+Pk5vdGlmOiAxNS4gU2VuZCBlbWFpbCB0byBjbGllbnRlXG4gICAgICAgIE5vdGlmLS0+Pk9yZGVyOiAxNi4gTm90aWZpY2F0aW9uIHNlbnRcbiAgICAgICAgXG4gICAgICAgIE9yZGVyLS0+PkFQSTogMTcuIFBlZGlkbyBhY3R1YWxpemFkb1xuICAgICAgICBBUEktLT4+VUk6IDE4LiAyMDAgT0t7XCJwZWRpZG9cIn1cbiAgICAgICAgVUktLT4+TG9naXN0aWNhOiAxOS4gXCJFc3RhZG8gYWN0dWFsaXphZG9cIlxuICAgIGVsc2UgVHJhbnNpY2lcdTAwZjNuIGludlx1MDBlMWxpZGFcbiAgICAgICAgT3JkZXItLT4+QVBJOiBFcnJvcjogSW52YWxpZCB0cmFuc2l0aW9uXG4gICAgICAgIEFQSS0tPj5VSTogNDAwIEJhZCBSZXF1ZXN0XG4gICAgICAgIFVJLS0+PkxvZ2lzdGljYTogXCJUcmFuc2ljaVx1MDBmM24gbm8gcGVybWl0aWRhXCJcbiAgICBlbmQiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIExvZ2lzdGljYVxuICAgIHBhcnRpY2lwYW50IFVJIGFzIEZyb250ZW5kXG4gICAgcGFydGljaXBhbnQgQVBJIGFzIEJhY2tlbmQgQVBJXG4gICAgcGFydGljaXBhbnQgT3JkZXIgYXMgT3JkZXJcXG5TZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgREIgYXMgRGF0YWJhc2VcbiAgICBwYXJ0aWNpcGFudCBWZW50YSBhcyBWZW50YVxcblNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBOb3RpZiBhcyBOb3RpZmljYXRpb25cXG5TZXJ2aWNlXG5cbiAgICBMb2dpc3RpY2EtPj5VSTogMS4gU2VsZWNjaW9uYSBwZWRpZG9cbiAgICBMb2dpc3RpY2EtPj5VSTogMi4gQ2xpY2sgXCJDYW1iaWFyIGVzdGFkb1wiXG4gICAgXG4gICAgVUktPj5BUEk6IDMuIFBBVENIIC9hcGkvcGVkaWRvcy97aWR9XFxue2VzdGFkbzogXCJudWV2b19lc3RhZG9cIn1cbiAgICBcbiAgICBBUEktPj5PcmRlcjogNC4gdXBkYXRlX3N0YXR1cyhcInBlZGlkb19pZCwgbnVldm9fZXN0YWRvXCIpXG4gICAgT3JkZXItPj5EQjogNS4gU0VMRUNUIHBlZGlkbyBXSEVSRSBpZD0/XG4gICAgREItLT4+T3JkZXI6IDYuIFBlZGlkbyBhY3R1YWxcbiAgICBcbiAgICBPcmRlci0+Pk9yZGVyOiA3LiB2YWxpZGF0ZV90cmFuc2l0aW9uKClcbiAgICBcbiAgICBhbHQgVHJhbnNpY2lcdTAwZjNuIHZcdTAwZTFsaWRhXG4gICAgICAgIE9yZGVyLT4+REI6IDguIFVQREFURSBwZWRpZG8gU0VUIGVzdGFkb1xuICAgICAgICBEQi0tPj5PcmRlcjogOS4gVXBkYXRlZFxuICAgICAgICBcbiAgICAgICAgYWx0IEVzdGFkbyA9IFwiZW50cmVnYWRvXCJcbiAgICAgICAgICAgIE9yZGVyLT4+VmVudGE6IDEwLiBjcmVhdGVfdmVudGEoXCJwZWRpZG9cIilcbiAgICAgICAgICAgIFZlbnRhLT4+REI6IDExLiBJTlNFUlQgSU5UTyB2ZW50YXNcbiAgICAgICAgICAgIFZlbnRhLT4+REI6IDEyLiBJTlNFUlQgSU5UTyBkZXRhbGxlX3ZlbnRhc1xuICAgICAgICAgICAgVmVudGEtLT4+T3JkZXI6IDEzLiBWZW50YSBjcmVhZGFcbiAgICAgICAgZW5kXG4gICAgICAgIFxuICAgICAgICBPcmRlci0+Pk5vdGlmOiAxNC4gbm90aWZ5X3N0YXR1c19jaGFuZ2UoKVxuICAgICAgICBOb3RpZi0+Pk5vdGlmOiAxNS4gU2VuZCBlbWFpbCB0byBjbGllbnRlXG4gICAgICAgIE5vdGlmLS0+Pk9yZGVyOiAxNi4gTm90aWZpY2F0aW9uIHNlbnRcbiAgICAgICAgXG4gICAgICAgIE9yZGVyLS0+PkFQSTogMTcuIFBlZGlkbyBhY3R1YWxpemFkb1xuICAgICAgICBBUEktLT4+VUk6IDE4LiAyMDAgT0t7XCJwZWRpZG9cIn1cbiAgICAgICAgVUktLT4+TG9naXN0aWNhOiAxOS4gXCJFc3RhZG8gYWN0dWFsaXphZG9cIlxuICAgIGVsc2UgVHJhbnNpY2lcdTAwZjNuIGludlx1MDBlMWxpZGFcbiAgICAgICAgT3JkZXItLT4+QVBJOiBFcnJvcjogSW52YWxpZCB0cmFuc2l0aW9uXG4gICAgICAgIEFQSS0tPj5VSTogNDAwIEJhZCBSZXF1ZXN0XG4gICAgICAgIFVJLS0+PkxvZ2lzdGljYTogXCJUcmFuc2ljaVx1MDBmM24gbm8gcGVybWl0aWRhXCJcbiAgICBlbmQiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    sequenceDiagram
                        actor Logistica
                        participant UI as Frontend
                        participant API as Backend API
                        participant Order as Order\nService
                        participant DB as Database
                        participant Venta as Venta\nService
                        participant Notif as Notification\nService
                    
                        Logistica->>UI: 1. Selecciona pedido
                        Logistica->>UI: 2. Click "Cambiar estado"
                        
                        UI->>API: 3. PATCH /api/pedidos/{id}\n{estado: "nuevo_estado"}
                        
                        API->>Order: 4. update_status("pedido_id, nuevo_estado")
                        Order->>DB: 5. SELECT pedido WHERE id=?
                        DB-->>Order: 6. Pedido actual
                        
                        Order->>Order: 7. validate_transition()
                        
                        alt Transición válida
                            Order->>DB: 8. UPDATE pedido SET estado
                            DB-->>Order: 9. Updated
                            
                            alt Estado = "entregado"
                                Order->>Venta: 10. create_venta("pedido")
                                Venta->>DB: 11. INSERT INTO ventas
                                Venta->>DB: 12. INSERT INTO detalle_ventas
                                Venta-->>Order: 13. Venta creada
                            end
                            
                            Order->>Notif: 14. notify_status_change()
                            Notif->>Notif: 15. Send email to cliente
                            Notif-->>Order: 16. Notification sent
                            
                            Order-->>API: 17. Pedido actualizado
                            API-->>UI: 18. 200 OK{"pedido"}
                            UI-->>Logistica: 19. "Estado actualizado"
                        else Transición inválida
                            Order-->>API: Error: Invalid transition
                            API-->>UI: 400 Bad Request
                            UI-->>Logistica: "Transición no permitida"
                        end

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    sequenceDiagram
                        actor Cliente
                        participant UI as Frontend
                        participant API as Backend API
                        participant Payment as Payment\nService
                        participant Gateway as Payment\nGateway
                        participant DB as Database
                        participant Order as Order\nService
                        participant Notif as Notification\nService
                    
                        Cliente->>UI: 1. Selecciona método pago
                        Cliente->>UI: 2. Ingresa datos tarjeta
                        
                        UI->>UI: 3. Valida formato tarjeta
                        UI->>API: 4. POST /api/pagos\n{pedido_id, metodo, datos}
                        
                        API->>Payment: 5. process_payment()
                        Payment->>DB: 6. Get pedido details
                        DB-->>Payment: 7. Pedido data
                        
                        Payment->>Gateway: 8. charge_card("amount, card_data")
                        Gateway->>Gateway: 9. Process transaction
                        
                        alt Pago aprobado
                            Gateway-->>Payment: 10. {status: approved, ref: XXX}
                            
                            Payment->>DB: 11. BEGIN TRANSACTION
                            Payment->>DB: 12. INSERT INTO pagos
                            Payment->>DB: 13. INSERT INTO transacciones
                            Payment->>DB: 14. COMMIT
                            
                            Payment->>Order: 15. confirm_payment("pedido_id")
                            Order->>DB: 16. UPDATE pedido SET estado='pendiente'
                            Order-->>Payment: 17. OK
                            
                            Payment->>Notif: 18. notify_payment_success()
                            Notif->>Notif: 19. Send confirmation email
                            Notif-->>Payment: 20. Sent
                            
                            Payment-->>API: 21. Payment successful
                            API-->>UI: 22. 200 OK{"pago"}
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

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIENsaWVudGVcbiAgICBwYXJ0aWNpcGFudCBVSSBhcyBGcm9udGVuZFxuICAgIHBhcnRpY2lwYW50IEFQSSBhcyBCYWNrZW5kIEFQSVxuICAgIHBhcnRpY2lwYW50IFBheW1lbnQgYXMgUGF5bWVudFxcblNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBHYXRld2F5IGFzIFBheW1lbnRcXG5HYXRld2F5XG4gICAgcGFydGljaXBhbnQgREIgYXMgRGF0YWJhc2VcbiAgICBwYXJ0aWNpcGFudCBPcmRlciBhcyBPcmRlclxcblNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBOb3RpZiBhcyBOb3RpZmljYXRpb25cXG5TZXJ2aWNlXG5cbiAgICBDbGllbnRlLT4+VUk6IDEuIFNlbGVjY2lvbmEgbVx1MDBlOXRvZG8gcGFnb1xuICAgIENsaWVudGUtPj5VSTogMi4gSW5ncmVzYSBkYXRvcyB0YXJqZXRhXG4gICAgXG4gICAgVUktPj5VSTogMy4gVmFsaWRhIGZvcm1hdG8gdGFyamV0YVxuICAgIFVJLT4+QVBJOiA0LiBQT1NUIC9hcGkvcGFnb3NcXG57cGVkaWRvX2lkLCBtZXRvZG8sIGRhdG9zfVxuICAgIFxuICAgIEFQSS0+PlBheW1lbnQ6IDUuIHByb2Nlc3NfcGF5bWVudCgpXG4gICAgUGF5bWVudC0+PkRCOiA2LiBHZXQgcGVkaWRvIGRldGFpbHNcbiAgICBEQi0tPj5QYXltZW50OiA3LiBQZWRpZG8gZGF0YVxuICAgIFxuICAgIFBheW1lbnQtPj5HYXRld2F5OiA4LiBjaGFyZ2VfY2FyZChcImFtb3VudCwgY2FyZF9kYXRhXCIpXG4gICAgR2F0ZXdheS0+PkdhdGV3YXk6IDkuIFByb2Nlc3MgdHJhbnNhY3Rpb25cbiAgICBcbiAgICBhbHQgUGFnbyBhcHJvYmFkb1xuICAgICAgICBHYXRld2F5LS0+PlBheW1lbnQ6IDEwLiB7c3RhdHVzOiBhcHByb3ZlZCwgcmVmOiBYWFh9XG4gICAgICAgIFxuICAgICAgICBQYXltZW50LT4+REI6IDExLiBCRUdJTiBUUkFOU0FDVElPTlxuICAgICAgICBQYXltZW50LT4+REI6IDEyLiBJTlNFUlQgSU5UTyBwYWdvc1xuICAgICAgICBQYXltZW50LT4+REI6IDEzLiBJTlNFUlQgSU5UTyB0cmFuc2FjY2lvbmVzXG4gICAgICAgIFBheW1lbnQtPj5EQjogMTQuIENPTU1JVFxuICAgICAgICBcbiAgICAgICAgUGF5bWVudC0+Pk9yZGVyOiAxNS4gY29uZmlybV9wYXltZW50KFwicGVkaWRvX2lkXCIpXG4gICAgICAgIE9yZGVyLT4+REI6IDE2LiBVUERBVEUgcGVkaWRvIFNFVCBlc3RhZG89J3BlbmRpZW50ZSdcbiAgICAgICAgT3JkZXItLT4+UGF5bWVudDogMTcuIE9LXG4gICAgICAgIFxuICAgICAgICBQYXltZW50LT4+Tm90aWY6IDE4LiBub3RpZnlfcGF5bWVudF9zdWNjZXNzKClcbiAgICAgICAgTm90aWYtPj5Ob3RpZjogMTkuIFNlbmQgY29uZmlybWF0aW9uIGVtYWlsXG4gICAgICAgIE5vdGlmLS0+PlBheW1lbnQ6IDIwLiBTZW50XG4gICAgICAgIFxuICAgICAgICBQYXltZW50LS0+PkFQSTogMjEuIFBheW1lbnQgc3VjY2Vzc2Z1bFxuICAgICAgICBBUEktLT4+VUk6IDIyLiAyMDAgT0t7XCJwYWdvXCJ9XG4gICAgICAgIFVJLS0+PkNsaWVudGU6IDIzLiBcIlBhZ28gZXhpdG9zb1wiXG4gICAgICAgIFVJLT4+VUk6IDI0LiBTaG93IGNvbmZpcm1hdGlvblxuICAgICAgICBcbiAgICBlbHNlIFBhZ28gcmVjaGF6YWRvXG4gICAgICAgIEdhdGV3YXktLT4+UGF5bWVudDoge3N0YXR1czogZGVjbGluZWQsIHJlYXNvbn1cbiAgICAgICAgXG4gICAgICAgIFBheW1lbnQtPj5EQjogSU5TRVJUIGZhaWxlZCB0cmFuc2FjdGlvblxuICAgICAgICBQYXltZW50LS0+PkFQSTogUGF5bWVudCBkZWNsaW5lZFxuICAgICAgICBBUEktLT4+VUk6IDQwMiBQYXltZW50IFJlcXVpcmVkXG4gICAgICAgIFVJLS0+PkNsaWVudGU6IFwiUGFnbyByZWNoYXphZG9cIlxuICAgICAgICBVSS0+PlVJOiBSZXRyeSBvcHRpb25cbiAgICAgICAgXG4gICAgZWxzZSBFcnJvciBkZSBnYXRld2F5XG4gICAgICAgIEdhdGV3YXktLT4+UGF5bWVudDogRXJyb3JcbiAgICAgICAgUGF5bWVudC0+PkRCOiBMb2cgZXJyb3JcbiAgICAgICAgUGF5bWVudC0tPj5BUEk6IEdhdGV3YXkgZXJyb3JcbiAgICAgICAgQVBJLS0+PlVJOiA1MDAgU2VydmVyIEVycm9yXG4gICAgICAgIFVJLS0+PkNsaWVudGU6IFwiRXJyb3IgcHJvY2VzYW5kbyBwYWdvXCJcbiAgICAgICAgVUktPj5VSTogQ29udGFjdCBzdXBwb3J0XG4gICAgZW5kIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIENsaWVudGVcbiAgICBwYXJ0aWNpcGFudCBVSSBhcyBGcm9udGVuZFxuICAgIHBhcnRpY2lwYW50IEFQSSBhcyBCYWNrZW5kIEFQSVxuICAgIHBhcnRpY2lwYW50IFBheW1lbnQgYXMgUGF5bWVudFxcblNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBHYXRld2F5IGFzIFBheW1lbnRcXG5HYXRld2F5XG4gICAgcGFydGljaXBhbnQgREIgYXMgRGF0YWJhc2VcbiAgICBwYXJ0aWNpcGFudCBPcmRlciBhcyBPcmRlclxcblNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBOb3RpZiBhcyBOb3RpZmljYXRpb25cXG5TZXJ2aWNlXG5cbiAgICBDbGllbnRlLT4+VUk6IDEuIFNlbGVjY2lvbmEgbVx1MDBlOXRvZG8gcGFnb1xuICAgIENsaWVudGUtPj5VSTogMi4gSW5ncmVzYSBkYXRvcyB0YXJqZXRhXG4gICAgXG4gICAgVUktPj5VSTogMy4gVmFsaWRhIGZvcm1hdG8gdGFyamV0YVxuICAgIFVJLT4+QVBJOiA0LiBQT1NUIC9hcGkvcGFnb3NcXG57cGVkaWRvX2lkLCBtZXRvZG8sIGRhdG9zfVxuICAgIFxuICAgIEFQSS0+PlBheW1lbnQ6IDUuIHByb2Nlc3NfcGF5bWVudCgpXG4gICAgUGF5bWVudC0+PkRCOiA2LiBHZXQgcGVkaWRvIGRldGFpbHNcbiAgICBEQi0tPj5QYXltZW50OiA3LiBQZWRpZG8gZGF0YVxuICAgIFxuICAgIFBheW1lbnQtPj5HYXRld2F5OiA4LiBjaGFyZ2VfY2FyZChcImFtb3VudCwgY2FyZF9kYXRhXCIpXG4gICAgR2F0ZXdheS0+PkdhdGV3YXk6IDkuIFByb2Nlc3MgdHJhbnNhY3Rpb25cbiAgICBcbiAgICBhbHQgUGFnbyBhcHJvYmFkb1xuICAgICAgICBHYXRld2F5LS0+PlBheW1lbnQ6IDEwLiB7c3RhdHVzOiBhcHByb3ZlZCwgcmVmOiBYWFh9XG4gICAgICAgIFxuICAgICAgICBQYXltZW50LT4+REI6IDExLiBCRUdJTiBUUkFOU0FDVElPTlxuICAgICAgICBQYXltZW50LT4+REI6IDEyLiBJTlNFUlQgSU5UTyBwYWdvc1xuICAgICAgICBQYXltZW50LT4+REI6IDEzLiBJTlNFUlQgSU5UTyB0cmFuc2FjY2lvbmVzXG4gICAgICAgIFBheW1lbnQtPj5EQjogMTQuIENPTU1JVFxuICAgICAgICBcbiAgICAgICAgUGF5bWVudC0+Pk9yZGVyOiAxNS4gY29uZmlybV9wYXltZW50KFwicGVkaWRvX2lkXCIpXG4gICAgICAgIE9yZGVyLT4+REI6IDE2LiBVUERBVEUgcGVkaWRvIFNFVCBlc3RhZG89J3BlbmRpZW50ZSdcbiAgICAgICAgT3JkZXItLT4+UGF5bWVudDogMTcuIE9LXG4gICAgICAgIFxuICAgICAgICBQYXltZW50LT4+Tm90aWY6IDE4LiBub3RpZnlfcGF5bWVudF9zdWNjZXNzKClcbiAgICAgICAgTm90aWYtPj5Ob3RpZjogMTkuIFNlbmQgY29uZmlybWF0aW9uIGVtYWlsXG4gICAgICAgIE5vdGlmLS0+PlBheW1lbnQ6IDIwLiBTZW50XG4gICAgICAgIFxuICAgICAgICBQYXltZW50LS0+PkFQSTogMjEuIFBheW1lbnQgc3VjY2Vzc2Z1bFxuICAgICAgICBBUEktLT4+VUk6IDIyLiAyMDAgT0t7XCJwYWdvXCJ9XG4gICAgICAgIFVJLS0+PkNsaWVudGU6IDIzLiBcIlBhZ28gZXhpdG9zb1wiXG4gICAgICAgIFVJLT4+VUk6IDI0LiBTaG93IGNvbmZpcm1hdGlvblxuICAgICAgICBcbiAgICBlbHNlIFBhZ28gcmVjaGF6YWRvXG4gICAgICAgIEdhdGV3YXktLT4+UGF5bWVudDoge3N0YXR1czogZGVjbGluZWQsIHJlYXNvbn1cbiAgICAgICAgXG4gICAgICAgIFBheW1lbnQtPj5EQjogSU5TRVJUIGZhaWxlZCB0cmFuc2FjdGlvblxuICAgICAgICBQYXltZW50LS0+PkFQSTogUGF5bWVudCBkZWNsaW5lZFxuICAgICAgICBBUEktLT4+VUk6IDQwMiBQYXltZW50IFJlcXVpcmVkXG4gICAgICAgIFVJLS0+PkNsaWVudGU6IFwiUGFnbyByZWNoYXphZG9cIlxuICAgICAgICBVSS0+PlVJOiBSZXRyeSBvcHRpb25cbiAgICAgICAgXG4gICAgZWxzZSBFcnJvciBkZSBnYXRld2F5XG4gICAgICAgIEdhdGV3YXktLT4+UGF5bWVudDogRXJyb3JcbiAgICAgICAgUGF5bWVudC0+PkRCOiBMb2cgZXJyb3JcbiAgICAgICAgUGF5bWVudC0tPj5BUEk6IEdhdGV3YXkgZXJyb3JcbiAgICAgICAgQVBJLS0+PlVJOiA1MDAgU2VydmVyIEVycm9yXG4gICAgICAgIFVJLS0+PkNsaWVudGU6IFwiRXJyb3IgcHJvY2VzYW5kbyBwYWdvXCJcbiAgICAgICAgVUktPj5VSTogQ29udGFjdCBzdXBwb3J0XG4gICAgZW5kIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    sequenceDiagram
                        actor Cliente
                        participant UI as Frontend
                        participant API as Backend API
                        participant Payment as Payment\nService
                        participant Gateway as Payment\nGateway
                        participant DB as Database
                        participant Order as Order\nService
                        participant Notif as Notification\nService
                    
                        Cliente->>UI: 1. Selecciona método pago
                        Cliente->>UI: 2. Ingresa datos tarjeta
                        
                        UI->>UI: 3. Valida formato tarjeta
                        UI->>API: 4. POST /api/pagos\n{pedido_id, metodo, datos}
                        
                        API->>Payment: 5. process_payment()
                        Payment->>DB: 6. Get pedido details
                        DB-->>Payment: 7. Pedido data
                        
                        Payment->>Gateway: 8. charge_card("amount, card_data")
                        Gateway->>Gateway: 9. Process transaction
                        
                        alt Pago aprobado
                            Gateway-->>Payment: 10. {status: approved, ref: XXX}
                            
                            Payment->>DB: 11. BEGIN TRANSACTION
                            Payment->>DB: 12. INSERT INTO pagos
                            Payment->>DB: 13. INSERT INTO transacciones
                            Payment->>DB: 14. COMMIT
                            
                            Payment->>Order: 15. confirm_payment("pedido_id")
                            Order->>DB: 16. UPDATE pedido SET estado='pendiente'
                            Order-->>Payment: 17. OK
                            
                            Payment->>Notif: 18. notify_payment_success()
                            Notif->>Notif: 19. Send confirmation email
                            Notif-->>Payment: 20. Sent
                            
                            Payment-->>API: 21. Payment successful
                            API-->>UI: 22. 200 OK{"pago"}
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

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    sequenceDiagram
                        participant Beat as Celery Beat\n(Scheduler)
                        participant Worker as Celery Worker
                        participant Stock as Stock\nService
                        participant DB as Database
                        participant Notif as Notification\nService
                    
                        Beat->>Beat: 1. Timer triggers\n(cada 1 hora)
                        Beat->>Worker: 2. Task: check_stock_levels
                        
                        Worker->>Stock: 3. monitor_all_products()
                        Stock->>DB: 4. SELECT productos, stock_config\nWHERE recarga_automatica_activa
                        DB-->>Stock: 5. Products list
                        
                        loop Por cada producto
                            Stock->>Stock: 6. config.necesita_recarga()?
                            
                            alt Stock <= stock_minimo
                                Stock->>DB: 7. BEGIN TRANSACTION
                                Stock->>DB: 8. UPDATE productos\nSET stock += cantidad_recarga
                                
                                Stock->>DB: 9. INSERT INTO historial_recarga\n(tipo='automatica')
                                
                                Stock->>DB: 10. UPDATE stock_config\nSET ultima_recarga, total_recargas
                                
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

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIHBhcnRpY2lwYW50IEJlYXQgYXMgQ2VsZXJ5IEJlYXRcXG4oU2NoZWR1bGVyKVxuICAgIHBhcnRpY2lwYW50IFdvcmtlciBhcyBDZWxlcnkgV29ya2VyXG4gICAgcGFydGljaXBhbnQgU3RvY2sgYXMgU3RvY2tcXG5TZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgREIgYXMgRGF0YWJhc2VcbiAgICBwYXJ0aWNpcGFudCBOb3RpZiBhcyBOb3RpZmljYXRpb25cXG5TZXJ2aWNlXG5cbiAgICBCZWF0LT4+QmVhdDogMS4gVGltZXIgdHJpZ2dlcnNcXG4oY2FkYSAxIGhvcmEpXG4gICAgQmVhdC0+PldvcmtlcjogMi4gVGFzazogY2hlY2tfc3RvY2tfbGV2ZWxzXG4gICAgXG4gICAgV29ya2VyLT4+U3RvY2s6IDMuIG1vbml0b3JfYWxsX3Byb2R1Y3RzKClcbiAgICBTdG9jay0+PkRCOiA0LiBTRUxFQ1QgcHJvZHVjdG9zLCBzdG9ja19jb25maWdcXG5XSEVSRSByZWNhcmdhX2F1dG9tYXRpY2FfYWN0aXZhXG4gICAgREItLT4+U3RvY2s6IDUuIFByb2R1Y3RzIGxpc3RcbiAgICBcbiAgICBsb29wIFBvciBjYWRhIHByb2R1Y3RvXG4gICAgICAgIFN0b2NrLT4+U3RvY2s6IDYuIGNvbmZpZy5uZWNlc2l0YV9yZWNhcmdhKCk/XG4gICAgICAgIFxuICAgICAgICBhbHQgU3RvY2sgPD0gc3RvY2tfbWluaW1vXG4gICAgICAgICAgICBTdG9jay0+PkRCOiA3LiBCRUdJTiBUUkFOU0FDVElPTlxuICAgICAgICAgICAgU3RvY2stPj5EQjogOC4gVVBEQVRFIHByb2R1Y3Rvc1xcblNFVCBzdG9jayArPSBjYW50aWRhZF9yZWNhcmdhXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFN0b2NrLT4+REI6IDkuIElOU0VSVCBJTlRPIGhpc3RvcmlhbF9yZWNhcmdhXFxuKHRpcG89J2F1dG9tYXRpY2EnKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBTdG9jay0+PkRCOiAxMC4gVVBEQVRFIHN0b2NrX2NvbmZpZ1xcblNFVCB1bHRpbWFfcmVjYXJnYSwgdG90YWxfcmVjYXJnYXNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgU3RvY2stPj5EQjogMTEuIENPTU1JVFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBTdG9jay0+Pk5vdGlmOiAxMi4gbm90aWZ5X2F1dG9fcmVjaGFyZ2UoKVxuICAgICAgICAgICAgTm90aWYtPj5Ob3RpZjogMTMuIEVtYWlsIHRvIHByb3ZlZWRvclxuICAgICAgICAgICAgTm90aWYtLT4+U3RvY2s6IDE0LiBTZW50XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFN0b2NrLS0+PldvcmtlcjogMTUuIFJlY2FyZ2EgZWplY3V0YWRhXG4gICAgICAgIGVsc2UgU3RvY2sgPiBzdG9ja19taW5pbW9cbiAgICAgICAgICAgIFN0b2NrLS0+PldvcmtlcjogTm8gYWN0aW9uIG5lZWRlZFxuICAgICAgICBlbmRcbiAgICBlbmRcbiAgICBcbiAgICBXb3JrZXItLT4+QmVhdDogMTYuIFRhc2sgY29tcGxldGVkIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIHBhcnRpY2lwYW50IEJlYXQgYXMgQ2VsZXJ5IEJlYXRcXG4oU2NoZWR1bGVyKVxuICAgIHBhcnRpY2lwYW50IFdvcmtlciBhcyBDZWxlcnkgV29ya2VyXG4gICAgcGFydGljaXBhbnQgU3RvY2sgYXMgU3RvY2tcXG5TZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgREIgYXMgRGF0YWJhc2VcbiAgICBwYXJ0aWNpcGFudCBOb3RpZiBhcyBOb3RpZmljYXRpb25cXG5TZXJ2aWNlXG5cbiAgICBCZWF0LT4+QmVhdDogMS4gVGltZXIgdHJpZ2dlcnNcXG4oY2FkYSAxIGhvcmEpXG4gICAgQmVhdC0+PldvcmtlcjogMi4gVGFzazogY2hlY2tfc3RvY2tfbGV2ZWxzXG4gICAgXG4gICAgV29ya2VyLT4+U3RvY2s6IDMuIG1vbml0b3JfYWxsX3Byb2R1Y3RzKClcbiAgICBTdG9jay0+PkRCOiA0LiBTRUxFQ1QgcHJvZHVjdG9zLCBzdG9ja19jb25maWdcXG5XSEVSRSByZWNhcmdhX2F1dG9tYXRpY2FfYWN0aXZhXG4gICAgREItLT4+U3RvY2s6IDUuIFByb2R1Y3RzIGxpc3RcbiAgICBcbiAgICBsb29wIFBvciBjYWRhIHByb2R1Y3RvXG4gICAgICAgIFN0b2NrLT4+U3RvY2s6IDYuIGNvbmZpZy5uZWNlc2l0YV9yZWNhcmdhKCk/XG4gICAgICAgIFxuICAgICAgICBhbHQgU3RvY2sgPD0gc3RvY2tfbWluaW1vXG4gICAgICAgICAgICBTdG9jay0+PkRCOiA3LiBCRUdJTiBUUkFOU0FDVElPTlxuICAgICAgICAgICAgU3RvY2stPj5EQjogOC4gVVBEQVRFIHByb2R1Y3Rvc1xcblNFVCBzdG9jayArPSBjYW50aWRhZF9yZWNhcmdhXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFN0b2NrLT4+REI6IDkuIElOU0VSVCBJTlRPIGhpc3RvcmlhbF9yZWNhcmdhXFxuKHRpcG89J2F1dG9tYXRpY2EnKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBTdG9jay0+PkRCOiAxMC4gVVBEQVRFIHN0b2NrX2NvbmZpZ1xcblNFVCB1bHRpbWFfcmVjYXJnYSwgdG90YWxfcmVjYXJnYXNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgU3RvY2stPj5EQjogMTEuIENPTU1JVFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBTdG9jay0+Pk5vdGlmOiAxMi4gbm90aWZ5X2F1dG9fcmVjaGFyZ2UoKVxuICAgICAgICAgICAgTm90aWYtPj5Ob3RpZjogMTMuIEVtYWlsIHRvIHByb3ZlZWRvclxuICAgICAgICAgICAgTm90aWYtLT4+U3RvY2s6IDE0LiBTZW50XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFN0b2NrLS0+PldvcmtlcjogMTUuIFJlY2FyZ2EgZWplY3V0YWRhXG4gICAgICAgIGVsc2UgU3RvY2sgPiBzdG9ja19taW5pbW9cbiAgICAgICAgICAgIFN0b2NrLS0+PldvcmtlcjogTm8gYWN0aW9uIG5lZWRlZFxuICAgICAgICBlbmRcbiAgICBlbmRcbiAgICBcbiAgICBXb3JrZXItLT4+QmVhdDogMTYuIFRhc2sgY29tcGxldGVkIiwgIm1lcm1haWQiOiB7InRoZW1lIjogImRlZmF1bHQifSwgImF1dG9TeW5jIjogdHJ1ZSwgInVwZGF0ZURpYWdyYW0iOiB0cnVlfQ==
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    sequenceDiagram
                        participant Beat as Celery Beat\n(Scheduler)
                        participant Worker as Celery Worker
                        participant Stock as Stock\nService
                        participant DB as Database
                        participant Notif as Notification\nService
                    
                        Beat->>Beat: 1. Timer triggers\n(cada 1 hora)
                        Beat->>Worker: 2. Task: check_stock_levels
                        
                        Worker->>Stock: 3. monitor_all_products()
                        Stock->>DB: 4. SELECT productos, stock_config\nWHERE recarga_automatica_activa
                        DB-->>Stock: 5. Products list
                        
                        loop Por cada producto
                            Stock->>Stock: 6. config.necesita_recarga()?
                            
                            alt Stock <= stock_minimo
                                Stock->>DB: 7. BEGIN TRANSACTION
                                Stock->>DB: 8. UPDATE productos\nSET stock += cantidad_recarga
                                
                                Stock->>DB: 9. INSERT INTO historial_recarga\n(tipo='automatica')
                                
                                Stock->>DB: 10. UPDATE stock_config\nSET ultima_recarga, total_recargas
                                
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

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    sequenceDiagram
                        actor Proveedor
                        participant UI as Frontend
                        participant API as Backend API
                        participant Stock as Stock\nService
                        participant DB as Database
                        participant Notif as Notification\nService
                    
                        Proveedor->>UI: 1. Navega a "Mis Productos"
                        UI->>API: 2. GET /api/productos/mis-productos
                        API-->>UI: 3. Lista de productos
                        
                        Proveedor->>UI: 4. Selecciona producto
                        Proveedor->>UI: 5. Click "Recargar Stock"
                        Proveedor->>UI: 6. Ingresa cantidad
                        
                        UI->>API: 7. POST /api/productos/{id}/recargar\n{cantidad, notas}
                        
                        API->>Stock: 8. manual_recharge("producto, cantidad")
                        Stock->>DB: 9. SELECT producto
                        DB-->>Stock: 10. Producto data
                        
                        Stock->>DB: 11. BEGIN TRANSACTION
                        
                        Stock->>Stock: 12. stock_anterior = producto.stock
                        Stock->>DB: 13. UPDATE productos\nSET stock += cantidad
                        
                        Stock->>DB: 14. INSERT INTO historial_recarga\n(tipo='manual', usuario=proveedor)
                        
                        Stock->>DB: 15. COMMIT
                        
                        Stock->>Notif: 16. notify_manual_recharge()
                        Notif->>Notif: 17. Email to admin
                        Notif-->>Stock: 18. Sent
                        
                        Stock-->>API: 19. Recarga exitosa
                        API-->>UI: 20. 200 OK{"producto"}
                        UI-->>Proveedor: 21. "Stock actualizado"
                        UI->>UI: 22. Refresh product list

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIFByb3ZlZWRvclxuICAgIHBhcnRpY2lwYW50IFVJIGFzIEZyb250ZW5kXG4gICAgcGFydGljaXBhbnQgQVBJIGFzIEJhY2tlbmQgQVBJXG4gICAgcGFydGljaXBhbnQgU3RvY2sgYXMgU3RvY2tcXG5TZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgREIgYXMgRGF0YWJhc2VcbiAgICBwYXJ0aWNpcGFudCBOb3RpZiBhcyBOb3RpZmljYXRpb25cXG5TZXJ2aWNlXG5cbiAgICBQcm92ZWVkb3ItPj5VSTogMS4gTmF2ZWdhIGEgXCJNaXMgUHJvZHVjdG9zXCJcbiAgICBVSS0+PkFQSTogMi4gR0VUIC9hcGkvcHJvZHVjdG9zL21pcy1wcm9kdWN0b3NcbiAgICBBUEktLT4+VUk6IDMuIExpc3RhIGRlIHByb2R1Y3Rvc1xuICAgIFxuICAgIFByb3ZlZWRvci0+PlVJOiA0LiBTZWxlY2Npb25hIHByb2R1Y3RvXG4gICAgUHJvdmVlZG9yLT4+VUk6IDUuIENsaWNrIFwiUmVjYXJnYXIgU3RvY2tcIlxuICAgIFByb3ZlZWRvci0+PlVJOiA2LiBJbmdyZXNhIGNhbnRpZGFkXG4gICAgXG4gICAgVUktPj5BUEk6IDcuIFBPU1QgL2FwaS9wcm9kdWN0b3Mve2lkfS9yZWNhcmdhclxcbntjYW50aWRhZCwgbm90YXN9XG4gICAgXG4gICAgQVBJLT4+U3RvY2s6IDguIG1hbnVhbF9yZWNoYXJnZShcInByb2R1Y3RvLCBjYW50aWRhZFwiKVxuICAgIFN0b2NrLT4+REI6IDkuIFNFTEVDVCBwcm9kdWN0b1xuICAgIERCLS0+PlN0b2NrOiAxMC4gUHJvZHVjdG8gZGF0YVxuICAgIFxuICAgIFN0b2NrLT4+REI6IDExLiBCRUdJTiBUUkFOU0FDVElPTlxuICAgIFxuICAgIFN0b2NrLT4+U3RvY2s6IDEyLiBzdG9ja19hbnRlcmlvciA9IHByb2R1Y3RvLnN0b2NrXG4gICAgU3RvY2stPj5EQjogMTMuIFVQREFURSBwcm9kdWN0b3NcXG5TRVQgc3RvY2sgKz0gY2FudGlkYWRcbiAgICBcbiAgICBTdG9jay0+PkRCOiAxNC4gSU5TRVJUIElOVE8gaGlzdG9yaWFsX3JlY2FyZ2FcXG4odGlwbz0nbWFudWFsJywgdXN1YXJpbz1wcm92ZWVkb3IpXG4gICAgXG4gICAgU3RvY2stPj5EQjogMTUuIENPTU1JVFxuICAgIFxuICAgIFN0b2NrLT4+Tm90aWY6IDE2LiBub3RpZnlfbWFudWFsX3JlY2hhcmdlKClcbiAgICBOb3RpZi0+Pk5vdGlmOiAxNy4gRW1haWwgdG8gYWRtaW5cbiAgICBOb3RpZi0tPj5TdG9jazogMTguIFNlbnRcbiAgICBcbiAgICBTdG9jay0tPj5BUEk6IDE5LiBSZWNhcmdhIGV4aXRvc2FcbiAgICBBUEktLT4+VUk6IDIwLiAyMDAgT0t7XCJwcm9kdWN0b1wifVxuICAgIFVJLS0+PlByb3ZlZWRvcjogMjEuIFwiU3RvY2sgYWN0dWFsaXphZG9cIlxuICAgIFVJLT4+VUk6IDIyLiBSZWZyZXNoIHByb2R1Y3QgbGlzdCIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIGFjdG9yIFByb3ZlZWRvclxuICAgIHBhcnRpY2lwYW50IFVJIGFzIEZyb250ZW5kXG4gICAgcGFydGljaXBhbnQgQVBJIGFzIEJhY2tlbmQgQVBJXG4gICAgcGFydGljaXBhbnQgU3RvY2sgYXMgU3RvY2tcXG5TZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgREIgYXMgRGF0YWJhc2VcbiAgICBwYXJ0aWNpcGFudCBOb3RpZiBhcyBOb3RpZmljYXRpb25cXG5TZXJ2aWNlXG5cbiAgICBQcm92ZWVkb3ItPj5VSTogMS4gTmF2ZWdhIGEgXCJNaXMgUHJvZHVjdG9zXCJcbiAgICBVSS0+PkFQSTogMi4gR0VUIC9hcGkvcHJvZHVjdG9zL21pcy1wcm9kdWN0b3NcbiAgICBBUEktLT4+VUk6IDMuIExpc3RhIGRlIHByb2R1Y3Rvc1xuICAgIFxuICAgIFByb3ZlZWRvci0+PlVJOiA0LiBTZWxlY2Npb25hIHByb2R1Y3RvXG4gICAgUHJvdmVlZG9yLT4+VUk6IDUuIENsaWNrIFwiUmVjYXJnYXIgU3RvY2tcIlxuICAgIFByb3ZlZWRvci0+PlVJOiA2LiBJbmdyZXNhIGNhbnRpZGFkXG4gICAgXG4gICAgVUktPj5BUEk6IDcuIFBPU1QgL2FwaS9wcm9kdWN0b3Mve2lkfS9yZWNhcmdhclxcbntjYW50aWRhZCwgbm90YXN9XG4gICAgXG4gICAgQVBJLT4+U3RvY2s6IDguIG1hbnVhbF9yZWNoYXJnZShcInByb2R1Y3RvLCBjYW50aWRhZFwiKVxuICAgIFN0b2NrLT4+REI6IDkuIFNFTEVDVCBwcm9kdWN0b1xuICAgIERCLS0+PlN0b2NrOiAxMC4gUHJvZHVjdG8gZGF0YVxuICAgIFxuICAgIFN0b2NrLT4+REI6IDExLiBCRUdJTiBUUkFOU0FDVElPTlxuICAgIFxuICAgIFN0b2NrLT4+U3RvY2s6IDEyLiBzdG9ja19hbnRlcmlvciA9IHByb2R1Y3RvLnN0b2NrXG4gICAgU3RvY2stPj5EQjogMTMuIFVQREFURSBwcm9kdWN0b3NcXG5TRVQgc3RvY2sgKz0gY2FudGlkYWRcbiAgICBcbiAgICBTdG9jay0+PkRCOiAxNC4gSU5TRVJUIElOVE8gaGlzdG9yaWFsX3JlY2FyZ2FcXG4odGlwbz0nbWFudWFsJywgdXN1YXJpbz1wcm92ZWVkb3IpXG4gICAgXG4gICAgU3RvY2stPj5EQjogMTUuIENPTU1JVFxuICAgIFxuICAgIFN0b2NrLT4+Tm90aWY6IDE2LiBub3RpZnlfbWFudWFsX3JlY2hhcmdlKClcbiAgICBOb3RpZi0+Pk5vdGlmOiAxNy4gRW1haWwgdG8gYWRtaW5cbiAgICBOb3RpZi0tPj5TdG9jazogMTguIFNlbnRcbiAgICBcbiAgICBTdG9jay0tPj5BUEk6IDE5LiBSZWNhcmdhIGV4aXRvc2FcbiAgICBBUEktLT4+VUk6IDIwLiAyMDAgT0t7XCJwcm9kdWN0b1wifVxuICAgIFVJLS0+PlByb3ZlZWRvcjogMjEuIFwiU3RvY2sgYWN0dWFsaXphZG9cIlxuICAgIFVJLT4+VUk6IDIyLiBSZWZyZXNoIHByb2R1Y3QgbGlzdCIsICJtZXJtYWlkIjogeyJ0aGVtZSI6ICJkZWZhdWx0In0sICJhdXRvU3luYyI6IHRydWUsICJ1cGRhdGVEaWFncmFtIjogdHJ1ZX0=
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    sequenceDiagram
                        actor Proveedor
                        participant UI as Frontend
                        participant API as Backend API
                        participant Stock as Stock\nService
                        participant DB as Database
                        participant Notif as Notification\nService
                    
                        Proveedor->>UI: 1. Navega a "Mis Productos"
                        UI->>API: 2. GET /api/productos/mis-productos
                        API-->>UI: 3. Lista de productos
                        
                        Proveedor->>UI: 4. Selecciona producto
                        Proveedor->>UI: 5. Click "Recargar Stock"
                        Proveedor->>UI: 6. Ingresa cantidad
                        
                        UI->>API: 7. POST /api/productos/{id}/recargar\n{cantidad, notas}
                        
                        API->>Stock: 8. manual_recharge("producto, cantidad")
                        Stock->>DB: 9. SELECT producto
                        DB-->>Stock: 10. Producto data
                        
                        Stock->>DB: 11. BEGIN TRANSACTION
                        
                        Stock->>Stock: 12. stock_anterior = producto.stock
                        Stock->>DB: 13. UPDATE productos\nSET stock += cantidad
                        
                        Stock->>DB: 14. INSERT INTO historial_recarga\n(tipo='manual', usuario=proveedor)
                        
                        Stock->>DB: 15. COMMIT
                        
                        Stock->>Notif: 16. notify_manual_recharge()
                        Notif->>Notif: 17. Email to admin
                        Notif-->>Stock: 18. Sent
                        
                        Stock-->>API: 19. Recarga exitosa
                        API-->>UI: 20. 200 OK{"producto"}
                        UI-->>Proveedor: 21. "Stock actualizado"
                        UI->>UI: 22. Refresh product list

    .. card::
        :class-card: sd-mb-4 sd-shadow-sm

        .. tab-set::

            .. tab-item:: 👁️ Visualización
                :sync: view

                .. mermaid::

                    sequenceDiagram
                        participant Trigger as Event\nTrigger
                        participant Notif as Notification\nService
                        participant DB as Database
                        participant Queue as Celery\nQueue
                        participant Worker as Celery\nWorker
                        participant Email as Email\nService
                        participant SMS as SMS\nService
                    
                        Trigger->>Notif: 1. Event occurred\n(e.g., pedido creado)
                        
                        Notif->>Notif: 2. Determine recipients\n& notification type
                        
                        loop Por cada destinatario
                            Notif->>DB: 3. INSERT INTO notificaciones\n(estado='pendiente')
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
                                Worker->>DB: 14. UPDATE notificaciones\nSET estado='enviada'
                            else Send failed
                                Email-->>Worker: Error
                                Worker->>DB: UPDATE estado='fallida'
                                Worker->>Queue: Retry task("max 3")
                            end
                            
                        else Channel = SMS
                            Worker->>SMS: send_sms()
                            SMS-->>Worker: Result
                            Worker->>DB: UPDATE notification
                        end
                        
                        Worker->>DB: 15. Set fecha_envio
                        Worker-->>Queue: 16. Task completed

                .. div:: diagram-controls

                    .. button-link:: https://mermaid.live/view#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIHBhcnRpY2lwYW50IFRyaWdnZXIgYXMgRXZlbnRcXG5UcmlnZ2VyXG4gICAgcGFydGljaXBhbnQgTm90aWYgYXMgTm90aWZpY2F0aW9uXFxuU2VydmljZVxuICAgIHBhcnRpY2lwYW50IERCIGFzIERhdGFiYXNlXG4gICAgcGFydGljaXBhbnQgUXVldWUgYXMgQ2VsZXJ5XFxuUXVldWVcbiAgICBwYXJ0aWNpcGFudCBXb3JrZXIgYXMgQ2VsZXJ5XFxuV29ya2VyXG4gICAgcGFydGljaXBhbnQgRW1haWwgYXMgRW1haWxcXG5TZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgU01TIGFzIFNNU1xcblNlcnZpY2VcblxuICAgIFRyaWdnZXItPj5Ob3RpZjogMS4gRXZlbnQgb2NjdXJyZWRcXG4oZS5nLiwgcGVkaWRvIGNyZWFkbylcbiAgICBcbiAgICBOb3RpZi0+Pk5vdGlmOiAyLiBEZXRlcm1pbmUgcmVjaXBpZW50c1xcbiYgbm90aWZpY2F0aW9uIHR5cGVcbiAgICBcbiAgICBsb29wIFBvciBjYWRhIGRlc3RpbmF0YXJpb1xuICAgICAgICBOb3RpZi0+PkRCOiAzLiBJTlNFUlQgSU5UTyBub3RpZmljYWNpb25lc1xcbihlc3RhZG89J3BlbmRpZW50ZScpXG4gICAgICAgIERCLS0+Pk5vdGlmOiA0LiBOb3RpZmljYWNpb24gSURcbiAgICAgICAgXG4gICAgICAgIE5vdGlmLT4+UXVldWU6IDUuIEVucXVldWUgc2VuZCB0YXNrXG4gICAgZW5kXG4gICAgXG4gICAgTm90aWYtLT4+VHJpZ2dlcjogNi4gTm90aWZpY2F0aW9ucyBxdWV1ZWRcbiAgICBcbiAgICBRdWV1ZS0+PldvcmtlcjogNy4gRGVxdWV1ZSB0YXNrXG4gICAgV29ya2VyLT4+REI6IDguIEdldCBub3RpZmljYXRpb24gZGV0YWlsc1xuICAgIERCLS0+PldvcmtlcjogOS4gTm90aWZpY2F0aW9uIGRhdGFcbiAgICBcbiAgICBhbHQgQ2hhbm5lbCA9IEVtYWlsXG4gICAgICAgIFdvcmtlci0+PkVtYWlsOiAxMC4gc2VuZF9lbWFpbCgpXG4gICAgICAgIEVtYWlsLT4+RW1haWw6IDExLiBDb25uZWN0IHRvIFNNVFBcbiAgICAgICAgRW1haWwtPj5FbWFpbDogMTIuIFNlbmQgbWVzc2FnZVxuICAgICAgICBcbiAgICAgICAgYWx0IEVtYWlsIHNlbnRcbiAgICAgICAgICAgIEVtYWlsLS0+PldvcmtlcjogMTMuIFN1Y2Nlc3NcbiAgICAgICAgICAgIFdvcmtlci0+PkRCOiAxNC4gVVBEQVRFIG5vdGlmaWNhY2lvbmVzXFxuU0VUIGVzdGFkbz0nZW52aWFkYSdcbiAgICAgICAgZWxzZSBTZW5kIGZhaWxlZFxuICAgICAgICAgICAgRW1haWwtLT4+V29ya2VyOiBFcnJvclxuICAgICAgICAgICAgV29ya2VyLT4+REI6IFVQREFURSBlc3RhZG89J2ZhbGxpZGEnXG4gICAgICAgICAgICBXb3JrZXItPj5RdWV1ZTogUmV0cnkgdGFzayhcIm1heCAzXCIpXG4gICAgICAgIGVuZFxuICAgICAgICBcbiAgICBlbHNlIENoYW5uZWwgPSBTTVNcbiAgICAgICAgV29ya2VyLT4+U01TOiBzZW5kX3NtcygpXG4gICAgICAgIFNNUy0tPj5Xb3JrZXI6IFJlc3VsdFxuICAgICAgICBXb3JrZXItPj5EQjogVVBEQVRFIG5vdGlmaWNhdGlvblxuICAgIGVuZFxuICAgIFxuICAgIFdvcmtlci0+PkRCOiAxNS4gU2V0IGZlY2hhX2VudmlvXG4gICAgV29ya2VyLS0+PlF1ZXVlOiAxNi4gVGFzayBjb21wbGV0ZWQiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: info
                        :icon: octicon:search
                        :outline:

                        🔍 Zoom / Pantalla Completa

                    .. button-link:: https://mermaid.live/edit#base64:eyJjb2RlIjogInNlcXVlbmNlRGlhZ3JhbVxuICAgIHBhcnRpY2lwYW50IFRyaWdnZXIgYXMgRXZlbnRcXG5UcmlnZ2VyXG4gICAgcGFydGljaXBhbnQgTm90aWYgYXMgTm90aWZpY2F0aW9uXFxuU2VydmljZVxuICAgIHBhcnRpY2lwYW50IERCIGFzIERhdGFiYXNlXG4gICAgcGFydGljaXBhbnQgUXVldWUgYXMgQ2VsZXJ5XFxuUXVldWVcbiAgICBwYXJ0aWNpcGFudCBXb3JrZXIgYXMgQ2VsZXJ5XFxuV29ya2VyXG4gICAgcGFydGljaXBhbnQgRW1haWwgYXMgRW1haWxcXG5TZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgU01TIGFzIFNNU1xcblNlcnZpY2VcblxuICAgIFRyaWdnZXItPj5Ob3RpZjogMS4gRXZlbnQgb2NjdXJyZWRcXG4oZS5nLiwgcGVkaWRvIGNyZWFkbylcbiAgICBcbiAgICBOb3RpZi0+Pk5vdGlmOiAyLiBEZXRlcm1pbmUgcmVjaXBpZW50c1xcbiYgbm90aWZpY2F0aW9uIHR5cGVcbiAgICBcbiAgICBsb29wIFBvciBjYWRhIGRlc3RpbmF0YXJpb1xuICAgICAgICBOb3RpZi0+PkRCOiAzLiBJTlNFUlQgSU5UTyBub3RpZmljYWNpb25lc1xcbihlc3RhZG89J3BlbmRpZW50ZScpXG4gICAgICAgIERCLS0+Pk5vdGlmOiA0LiBOb3RpZmljYWNpb24gSURcbiAgICAgICAgXG4gICAgICAgIE5vdGlmLT4+UXVldWU6IDUuIEVucXVldWUgc2VuZCB0YXNrXG4gICAgZW5kXG4gICAgXG4gICAgTm90aWYtLT4+VHJpZ2dlcjogNi4gTm90aWZpY2F0aW9ucyBxdWV1ZWRcbiAgICBcbiAgICBRdWV1ZS0+PldvcmtlcjogNy4gRGVxdWV1ZSB0YXNrXG4gICAgV29ya2VyLT4+REI6IDguIEdldCBub3RpZmljYXRpb24gZGV0YWlsc1xuICAgIERCLS0+PldvcmtlcjogOS4gTm90aWZpY2F0aW9uIGRhdGFcbiAgICBcbiAgICBhbHQgQ2hhbm5lbCA9IEVtYWlsXG4gICAgICAgIFdvcmtlci0+PkVtYWlsOiAxMC4gc2VuZF9lbWFpbCgpXG4gICAgICAgIEVtYWlsLT4+RW1haWw6IDExLiBDb25uZWN0IHRvIFNNVFBcbiAgICAgICAgRW1haWwtPj5FbWFpbDogMTIuIFNlbmQgbWVzc2FnZVxuICAgICAgICBcbiAgICAgICAgYWx0IEVtYWlsIHNlbnRcbiAgICAgICAgICAgIEVtYWlsLS0+PldvcmtlcjogMTMuIFN1Y2Nlc3NcbiAgICAgICAgICAgIFdvcmtlci0+PkRCOiAxNC4gVVBEQVRFIG5vdGlmaWNhY2lvbmVzXFxuU0VUIGVzdGFkbz0nZW52aWFkYSdcbiAgICAgICAgZWxzZSBTZW5kIGZhaWxlZFxuICAgICAgICAgICAgRW1haWwtLT4+V29ya2VyOiBFcnJvclxuICAgICAgICAgICAgV29ya2VyLT4+REI6IFVQREFURSBlc3RhZG89J2ZhbGxpZGEnXG4gICAgICAgICAgICBXb3JrZXItPj5RdWV1ZTogUmV0cnkgdGFzayhcIm1heCAzXCIpXG4gICAgICAgIGVuZFxuICAgICAgICBcbiAgICBlbHNlIENoYW5uZWwgPSBTTVNcbiAgICAgICAgV29ya2VyLT4+U01TOiBzZW5kX3NtcygpXG4gICAgICAgIFNNUy0tPj5Xb3JrZXI6IFJlc3VsdFxuICAgICAgICBXb3JrZXItPj5EQjogVVBEQVRFIG5vdGlmaWNhdGlvblxuICAgIGVuZFxuICAgIFxuICAgIFdvcmtlci0+PkRCOiAxNS4gU2V0IGZlY2hhX2VudmlvXG4gICAgV29ya2VyLS0+PlF1ZXVlOiAxNi4gVGFzayBjb21wbGV0ZWQiLCAibWVybWFpZCI6IHsidGhlbWUiOiAiZGVmYXVsdCJ9LCAiYXV0b1N5bmMiOiB0cnVlLCAidXBkYXRlRGlhZ3JhbSI6IHRydWV9
                        :color: secondary
                        :icon: octicon:pencil
                        :outline:

                        ✏️ Editar en Vivo

            .. tab-item:: 📝 Código Fuente
                :sync: code

                .. code-block:: mermaid

                    sequenceDiagram
                        participant Trigger as Event\nTrigger
                        participant Notif as Notification\nService
                        participant DB as Database
                        participant Queue as Celery\nQueue
                        participant Worker as Celery\nWorker
                        participant Email as Email\nService
                        participant SMS as SMS\nService
                    
                        Trigger->>Notif: 1. Event occurred\n(e.g., pedido creado)
                        
                        Notif->>Notif: 2. Determine recipients\n& notification type
                        
                        loop Por cada destinatario
                            Notif->>DB: 3. INSERT INTO notificaciones\n(estado='pendiente')
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
                                Worker->>DB: 14. UPDATE notificaciones\nSET estado='enviada'
                            else Send failed
                                Email-->>Worker: Error
                                Worker->>DB: UPDATE estado='fallida'
                                Worker->>Queue: Retry task("max 3")
                            end
                            
                        else Channel = SMS
                            Worker->>SMS: send_sms()
                            SMS-->>Worker: Result
                            Worker->>DB: UPDATE notification
                        end
                        
                        Worker->>DB: 15. Set fecha_envio
                        Worker-->>Queue: 16. Task completed