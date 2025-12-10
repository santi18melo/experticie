# Guía Visual y Leyenda de Imágenes - PREXCOL

**Fecha:** 01 de Diciembre de 2025  
**Propósito:** Definición de capturas y diagramas para los manuales de documentación.

---

## PARTE I: MANUAL TÉCNICO (Visuales de Implementación y Arquitectura)

### 1. Diagrama de Arquitectura de PREXCOL

![Diagrama de Arquitectura - ShutterstockExplorar]

**Descripción para el Manual:** Representación de alto nivel de la arquitectura de tres capas del sistema PREXCOL.
**Contenido Detallado:** El diagrama debe mostrar tres bloques verticales principales claramente diferenciados:
1.  **Capa Cliente (Izquierda):** Representada por un icono de navegador/monitor etiquetado "Frontend (React + Vite)".
2.  **Capa Servidor (Centro):** Representada por un engranaje o servidor etiquetado "API Gateway (Django REST Framework)".
3.  **Capa de Datos (Derecha):** Dos cilindros, uno para "Base de Datos (PostgreSQL/SQLite)" y otro para "Broker/Cache (Redis)".
*   **Conexiones:** Flechas bidireccionales entre Cliente y Servidor etiquetadas como "JSON / HTTPS". Flecha unidireccional del Servidor a un bloque "Celery Worker", y de este a un icono de "Servicio de Email".

### 2. Consola de Inicio del Backend (Django)

![Consola Django - ShutterstockExplorar]

**Descripción para el Manual:** Confirmación visual de que el servidor de desarrollo Django se está ejecutando correctamente.
**Contenido Detallado:** Captura de una terminal de comandos con fondo oscuro. El texto debe ser legible y mostrar las siguientes líneas clave:
*   `Watching for file changes with StatReloader`
*   `Performing system checks...`
*   `System check identified no issues (0 silenced).`
*   `Django version 5.0.4, using settings 'backend.settings'`
*   `Starting development server at http://127.0.0.1:8000/`
*   `Quit the server with CTRL-BREAK.`

### 3. Consola del Worker de Celery

![Consola Celery - ShutterstockExplorar]

**Descripción para el Manual:** Verificación del servicio de tareas en segundo plano conectado a Redis.
**Contenido Detallado:** Captura de terminal mostrando el arte ASCII característico de Celery al inicio. Debajo, una sección de configuración (`[config]`) mostrando el `app: experticie`, `transport: redis://...`, y `concurrency: 4`. Más abajo, la sección `[tasks]` listando tareas detectadas como `apps.notificaciones.tasks.enviar_email` y `apps.ventas.tasks.generar_reporte`. La última línea debe decir `celery@hostname ready.`

### 4. Diagrama Entidad-Relación (DER) Detallado

![DER Detallado - ShutterstockExplorar]

**Descripción para el Manual:** Esquema relacional que ilustra las conexiones entre las entidades principales del negocio.
**Contenido Detallado:** Un diagrama de base de datos profesional.
*   **Entidades:** Cajas rectangulares para `Usuario`, `Producto`, `Pedido`, `DetallePedido`, `Tienda`.
*   **Atributos:** Dentro de `Usuario` mostrar `id, email, rol`. En `Pedido` mostrar `id, estado, total`.
*   **Relaciones:**
    *   Línea de `Usuario` a `Pedido` con terminación de "pata de gallo" en Pedido (1:N).
    *   Línea de `Tienda` a `Producto` (1:N).
    *   Línea de `Pedido` a `DetallePedido` (1:N).
    *   Línea de `Producto` a `DetallePedido` (1:N).

---

## PARTE II: MANUAL DE USUARIO (Visuales de Flujos Funcionales)

### 5. Pantalla de Login y Registro

![Login Mockup - ShutterstockExplorar]

**Descripción para el Manual:** Interfaz de acceso seguro para usuarios registrados.
**Contenido Detallado:** Un mockup de alta fidelidad o captura de pantalla.
*   **Centro:** Una tarjeta blanca sobre un fondo suave.
*   **Elementos:** Logo de PREXCOL en la parte superior. Campo de texto "Correo Electrónico". Campo de texto "Contraseña" (con icono de ojo para mostrar/ocultar).
*   **Acciones:** Botón principal ancho de color primario con texto "Ingresar".
*   **Enlaces:** Texto pequeño debajo del botón: "¿No tienes cuenta? **Regístrate**" y "¿Olvidaste tu contraseña?".

### 6. Catálogo de Productos con Filtros

![Catálogo Productos - ShutterstockExplorar]

**Descripción para el Manual:** Vista principal donde los clientes exploran y buscan productos.
**Contenido Detallado:** Captura de la página `/productos`.
*   **Barra Superior:** Campo de búsqueda amplio con icono de lupa.
*   **Lateral Izquierdo:** Panel "Filtros". Slider de rango de precios ($0 - $1000). Checkboxes para Categorías (Tecnología, Hogar, Moda).
*   **Área Principal:** Grid de 3 o 4 columnas con tarjetas de productos.
*   **Tarjeta de Producto:** Debe mostrar una imagen cuadrada del producto, título en negrita (ej. "Auriculares Bluetooth"), precio destacado en color verde, y un botón o icono de carrito de compras.

### 7. Carrito de Compras antes de Checkout

![Carrito Compras - ShutterstockExplorar]

**Descripción para el Manual:** Resumen detallado de los ítems seleccionados antes de finalizar la compra.
**Contenido Detallado:** Captura de la página `/cart`.
*   **Lista:** Tabla con 2 o 3 productos de ejemplo.
*   **Filas:** Cada fila muestra una miniatura, nombre del producto, un control de cantidad (`- 2 +`), precio unitario y subtotal. Icono de papelera rojo a la derecha.
*   **Resumen:** Un panel a la derecha o abajo mostrando "Subtotal: $XXX", "Envío: $XX", y un "Total: $XXX" en fuente grande.
*   **Call to Action:** Botón grande y llamativo "Proceder al Pago".

### 8. Panel de Proveedor - Gestión de Inventario

![Panel Proveedor - ShutterstockExplorar]

**Descripción para el Manual:** Herramienta administrativa para que los proveedores controlen su stock.
**Contenido Detallado:** Captura del Dashboard filtrado por rol de Proveedor.
*   **Título:** "Gestión de Inventario" o "Mis Productos".
*   **Tabla:** Lista de productos. Columnas visibles: "ID", "Imagen" (miniatura), "Nombre", "Precio", "Stock Actual", "Estado".
*   **Indicadores:** Una fila debe tener un Stock bajo (ej. 5) y mostrarse con un indicador de color rojo o naranja (alerta).
*   **Acciones:** Botones pequeños en cada fila para "Editar" (lápiz) y "Eliminar" (basura).
