# Guion de Presentación Técnica: Arquitectura y Flujo de Datos PREXCOL

Este documento sirve como guía para presentar la arquitectura del sistema PREXCOL y explicar detalladamente cómo se procesa un pedido, desde el frontend hasta la base de datos.

---

## 1. Introducción a la Arquitectura

"Buenos días/tardes. El sistema PREXCOL está construido sobre una arquitectura moderna de **Cliente-Servidor** desacoplada, lo que garantiza escalabilidad y seguridad."

*   **Backend (El Motor):**
    *   Construido con **Django** y **Django REST Framework**.
    *   Se encarga de la lógica de negocio, validación de datos, seguridad y persistencia.
    *   Expone una **API RESTful** documentada que sirve como único punto de entrada para los datos.
*   **Frontend (La Interfaz):**
    *   Desarrollado en **React** (con Vite).
    *   Es una "Single Page Application" (SPA) que consume la API del backend.
    *   Se encarga de la experiencia de usuario (UX) y la presentación visual.

---

## 2. El Flujo de un Pedido (Caso de Uso Principal)

"Para entender cómo interactúan estas dos capas, vamos a seguir el viaje de un dato crítico: **La Creación de un Pedido**."

### Paso 1: La Acción del Usuario (Frontend)
*   **Ubicación:** `frontend/src/pages/Checkout.jsx`
*   **Explicación:** "Todo comienza cuando el usuario hace clic en 'Confirmar Pedido'. En este componente, recopilamos la información del carrito y del formulario de envío."
*   **Código Clave:**
    ```javascript
    const orderData = {
        tienda_id: formData.tienda_id,
        detalles: cartItems.map(...), // Productos y cantidades
        metodo_pago: "Tarjeta",
        // ...
    };
    await OrderService.createOrder(orderData);
    ```

### Paso 2: La Comunicación (Servicio API)
*   **Ubicación:** `frontend/src/services/orderService.js`
*   **Explicación:** "El componente no habla directamente con el servidor. Delega esa tarea al `OrderService`. Este servicio utiliza **Axios** para enviar una petición HTTP POST segura (con Token JWT) al backend."
*   **Código Clave:**
    ```javascript
    async createOrder(orderData) {
        return await axiosInstance.post("/productos/pedidos/crear_pedido/", orderData);
    }
    ```

### Paso 3: La Recepción y Enrutamiento (Backend)
*   **Ubicación:** `backend/apps/productos/urls.py`
*   **Explicación:** "La petición llega a Django. El archivo `urls.py` actúa como un despachador de tráfico, dirigiendo la solicitud `/crear_pedido/` hacia la vista correspondiente."

### Paso 4: Validación de Datos (Serializadores)
*   **Ubicación:** `backend/apps/productos/serializers.py`
*   **Explicación:** "Antes de procesar nada, el `PedidoCreateSerializer` actúa como un filtro de seguridad. Verifica que los IDs de productos existan, que las cantidades sean números positivos y que el formato sea correcto. Si algo está mal, rechaza la petición inmediatamente."

### Paso 5: Lógica de Negocio y Transacción (Vistas)
*   **Ubicación:** `backend/apps/productos/views.py`
*   **Explicación:** "Aquí ocurre la magia. En el método `crear_pedido`, abrimos una **transacción atómica** (todo o nada).
    1.  Creamos el registro del Pedido.
    2.  **Descontamos el stock** de cada producto (usando el método `reducir_stock` del modelo Producto).
    3.  Registramos el Pago.
    Si cualquiera de estos pasos falla (ej. no hay suficiente stock), se deshacen todos los cambios para mantener la integridad de los datos."

### Paso 6: Persistencia (Modelos)
*   **Ubicación:** `backend/apps/productos/models.py`
*   **Explicación:** "Finalmente, los modelos `Pedido`, `DetallePedido` y `Producto` guardan la información en la base de datos relacional."

---

## 3. Conclusión

"Esta estructura nos permite:
1.  **Seguridad:** El frontend no puede modificar la base de datos directamente; debe pasar por las validaciones del backend.
2.  **Integridad:** El manejo de transacciones asegura que nunca vendamos productos sin stock.
3.  **Mantenibilidad:** La separación de responsabilidades hace que sea fácil corregir errores o añadir nuevas funciones sin romper el sistema completo."
