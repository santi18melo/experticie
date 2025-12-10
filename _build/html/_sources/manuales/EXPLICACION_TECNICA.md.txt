# Explicación Técnica: Integración Backend‑Frontend (PREXCOL)

Este documento muestra, con referencias de archivo y fragmentos de código, cómo el frontend React se comunica con el backend Django‑REST para crear un pedido.

---

## 📂 Mapa de archivos clave

**Backend (Django)**
- Modelos: `backend/apps/productos/models.py`
- Serializadores: `backend/apps/productos/serializers.py`
- Vistas: `backend/apps/productos/views.py`
- URLs: `backend/apps/productos/urls.py`

**Frontend (React)**
- Página de Checkout: `frontend/src/pages/Checkout.jsx`
- Servicio de Pedidos: `frontend/src/services/orderService.js`
- Configuración API (Axios + JWT): `frontend/src/services/api.js`
- Página Cliente (listado de productos): `frontend/src/pages/Cliente.jsx`

---

## 🔄 Flujo paso a paso: "Crear un Pedido"

1. **Usuario confirma la compra** – `frontend/src/pages/Checkout.jsx` (función `handleSubmitOrder`).
2. **Servicio envía la petición** – `frontend/src/services/orderService.js` (`createOrder`).
3. **Ruta del backend** – `backend/apps/productos/urls.py` registra `PedidoViewSet` y la acción `crear_pedido`.
4. **Serializador valida** – `backend/apps/productos/serializers.py` (`PedidoCreateSerializer`).
5. **Vista procesa** – `backend/apps/productos/views.py` (`crear_pedido`):
   - Transacción atómica.
   - Crea `Pedido`.
   - Reduce stock (`Producto.reducir_stock`).
   - Registra `Pago`.
6. **Modelos persisten** – `backend/apps/productos/models.py` (`Pedido`, `DetallePedido`, `Producto`).
7. **Respuesta al frontend** – objeto `Pedido` con `id`, `estado` y `total`.
8. **Frontend muestra éxito** y redirige a "Mis Pedidos".

---

## 📜 Desplazamiento y selección de productos (scroll)

En la ruta **/cliente** el listado se carga paginado. El componente `Cliente.jsx` usa un listener `window.onscroll` para solicitar la siguiente página al backend cuando el usuario llega al final.

```tsx
useEffect(() => {
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      loadMore();
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

Cada producto tiene un botón **Agregar** que llama a `cartService.addItem(productId, qty)`. El carrito se mantiene en `CartContext`/Redux y el icono muestra el número de ítems.

---

## 🛒 Proceso de checkout

1. **Icono del carrito** (`🛒 Carrito (n)`) lleva a `/cart`.
2. En `/cart` se listan los ítems y el botón **Finalizar Compra** envía:
   ```json
   {
     "tienda_id": 3,
     "detalles": [{"producto_id": 12, "cantidad": 2}],
     "metodo_pago": "tarjeta"
   }
   ```
   a `orderService.createOrder`.
3. Backend ejecuta la lógica descrita en el paso 5.
4. Se crea el registro `Pedido`, se actualiza el stock y se genera el `Pago`.
5. El frontend muestra una pantalla de éxito y redirige a `/orders`.

---

## 📊 Diagrama de flujo

```mermaid
flowchart TD
    A[Cliente abre /cliente] --> B[Scroll carga más productos]
    B --> C[Usuario pulsa "Agregar"]
    C --> D[cartService.addItem]
    D --> E[Icono carrito muestra n]
    E --> F[Click → /cart]
    F --> G[Botón "Finalizar Compra"]
    G --> H[POST /productos/pedidos/crear_pedido]
    H --> I[PedidoViewSet.crear_pedido]
    I --> J[Actualiza stock, crea DetallePedido y Pago]
    J --> K[Respuesta con Pedido]
    K --> L[Frontend muestra éxito]
    L --> M[Redirección a /orders]
```

---

## 💡 Resumen rápido
- **Frontend** prepara y envía datos vía Axios (JWT incluido). 
- **Backend** valida, procesa en transacción y persiste.
- **Scroll** permite cargar productos ilimitados.
- **Carrito** se mantiene en estado global y se sincroniza con el backend al crear el pedido.

---

*Este documento está listo para ser presentado y usado como guía de referencia para el flujo de creación de pedidos en PREXCOL.*
