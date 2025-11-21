# 🚀 Guía de Integración Frontend - App Productos

## Resumen Rápido

La app `productos` proporciona una API REST completa para gestionar:
- **Tiendas** minoristas
- **Productos** con inventario
- **Pedidos** con seguimiento de estado
- **Detalles** de cada pedido

Todos los endpoints requieren **autenticación JWT**.

---

## 📡 Configuración Base en Frontend

### JavaScript/TypeScript

```javascript
// services/api.js
const API_URL = 'http://localhost:8000/api';

const api = {
  // Autenticación
  login: (email, password) => 
    fetch(`${API_URL}/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(r => r.json()),

  // Headers con token
  getHeaders: (token) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }),

  // Tiendas
  getTiendas: (token) =>
    fetch(`${API_URL}/tiendas/`, {
      headers: api.getHeaders(token)
    }).then(r => r.json()),

  // Productos
  getProductos: (token) =>
    fetch(`${API_URL}/productos/`, {
      headers: api.getHeaders(token)
    }).then(r => r.json()),

  getProductosPorTienda: (token, tiendaId) =>
    fetch(`${API_URL}/productos/por_tienda/?tienda_id=${tiendaId}`, {
      headers: api.getHeaders(token)
    }).then(r => r.json()),

  // Pedidos
  crearPedido: (token, data) =>
    fetch(`${API_URL}/pedidos/crear_pedido/`, {
      method: 'POST',
      headers: api.getHeaders(token),
      body: JSON.stringify(data)
    }).then(r => r.json()),

  getMisPedidos: (token) =>
    fetch(`${API_URL}/pedidos/mis_pedidos/`, {
      headers: api.getHeaders(token)
    }).then(r => r.json()),

  cambiarEstadoPedido: (token, pedidoId, estado) =>
    fetch(`${API_URL}/pedidos/${pedidoId}/cambiar_estado/`, {
      method: 'POST',
      headers: api.getHeaders(token),
      body: JSON.stringify({ estado })
    }).then(r => r.json())
};

export default api;
```

---

## 🛍️ Ejemplo React: Catálogo de Productos

```jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [tiendaId, setTiendaId] = useState(1);
  const token = localStorage.getItem('token');

  useEffect(() => {
    cargarProductos();
  }, [tiendaId]);

  const cargarProductos = async () => {
    const data = await api.getProductosPorTienda(token, tiendaId);
    setProductos(data);
  };

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(p => p.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(p =>
        p.id === producto.id
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const crearPedido = async () => {
    const detalles = carrito.map(p => ({
      producto: p.id,
      cantidad: p.cantidad
    }));

    const response = await api.crearPedido(token, {
      tienda_id: tiendaId,
      detalles,
      notas: 'Pedido desde React'
    });

    if (response.id) {
      alert(`✓ Pedido creado #${response.id}`);
      setCarrito([]);
    } else {
      alert(`✗ Error: ${JSON.stringify(response)}`);
    }
  };

  return (
    <div className="catalogo">
      <h1>Catálogo de Productos</h1>

      <div className="productos">
        {productos.map(producto => (
          <div key={producto.id} className="producto-card">
            <h3>{producto.nombre}</h3>
            <p>${producto.precio}</p>
            <p>Stock: {producto.stock}</p>
            <button
              onClick={() => agregarAlCarrito(producto)}
              disabled={producto.stock === 0}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      <div className="carrito">
        <h2>Carrito ({carrito.length})</h2>
        <ul>
          {carrito.map(item => (
            <li key={item.id}>
              {item.nombre} x{item.cantidad} = ${item.precio * item.cantidad}
            </li>
          ))}
        </ul>
        <button
          onClick={crearPedido}
          disabled={carrito.length === 0}
        >
          Crear Pedido
        </button>
      </div>
    </div>
  );
}

export default Catalogo;
```

---

## 📦 Ejemplo Vue: Seguimiento de Pedidos

```vue
<template>
  <div class="pedidos">
    <h1>Mis Pedidos</h1>

    <div v-if="pedidos.length === 0" class="vacio">
      No tienes pedidos aún
    </div>

    <div v-else>
      <div
        v-for="pedido in pedidos"
        :key="pedido.id"
        class="pedido-card"
        :class="'estado-' + pedido.estado"
      >
        <div class="header">
          <h3>Pedido #{{ pedido.id }}</h3>
          <span class="estado">{{ pedido.estado }}</span>
        </div>

        <p class="tienda">{{ pedido.tienda_nombre }}</p>
        <p class="fecha">{{ new Date(pedido.fecha_creacion).toLocaleDateString() }}</p>

        <div class="items">
          <div v-for="item in pedido.detalles" :key="item.id">
            {{ item.producto_nombre }} x{{ item.cantidad }}
          </div>
        </div>

        <p class="total">Total: ${{ pedido.total }}</p>

        <div class="barra-progreso">
          <div
            class="progreso"
            :style="{ width: getProgresso(pedido.estado) + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'Pedidos',
  data() {
    return {
      pedidos: []
    };
  },
  mounted() {
    this.cargarPedidos();
  },
  methods: {
    async cargarPedidos() {
      const token = localStorage.getItem('token');
      const data = await api.getMisPedidos(token);
      this.pedidos = data;
    },
    getProgresso(estado) {
      const estados = {
        'pendiente': 25,
        'preparando': 50,
        'en_transito': 75,
        'entregado': 100,
        'cancelado': 0
      };
      return estados[estado] || 0;
    }
  }
};
</script>

<style scoped>
.pedidos {
  padding: 20px;
}

.pedido-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background: white;
}

.pedido-card.estado-entregado {
  border-left: 4px solid green;
}

.pedido-card.estado-en_transito {
  border-left: 4px solid orange;
}

.pedido-card.estado-preparando {
  border-left: 4px solid yellow;
}

.pedido-card.estado-pendiente {
  border-left: 4px solid blue;
}

.estado {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  background: #f0f0f0;
}

.total {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.barra-progreso {
  height: 4px;
  background: #eee;
  border-radius: 2px;
  margin-top: 10px;
  overflow: hidden;
}

.progreso {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  transition: width 0.3s ease;
}
</style>
```

---

## 👤 Panel de Comprador

```jsx
// Comprador.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function PanelComprador() {
  const [pedidosPendientes, setPedidosPendientes] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    const response = await fetch('/api/pedidos/pendientes/', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setPedidosPendientes(data);
  };

  const cambiarAPreparando = async (pedidoId) => {
    await fetch(`/api/pedidos/${pedidoId}/cambiar_estado/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ estado: 'preparando' })
    });
    cargarPedidos();
  };

  return (
    <div className="panel-comprador">
      <h1>Pedidos Pendientes</h1>
      {pedidosPendientes.map(pedido => (
        <div key={pedido.id} className="pedido">
          <p>Cliente: {pedido.cliente_nombre}</p>
          <p>Tienda: {pedido.tienda_nombre}</p>
          <p>Total: ${pedido.total}</p>
          <button onClick={() => cambiarAPreparando(pedido.id)}>
            Marcar como Preparando
          </button>
        </div>
      ))}
    </div>
  );
}

export default PanelComprador;
```

---

## 📊 Panel de Logística

```jsx
// PanelLogistica.jsx
function PanelLogistica() {
  const [pedidosEnPrep, setPedidosEnPrep] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    const response = await fetch('/api/pedidos/en_preparacion/', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setPedidosEnPrep(data);
  };

  const cambiarAEntregado = async (pedidoId) => {
    await fetch(`/api/pedidos/${pedidoId}/cambiar_estado/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ estado: 'entregado' })
    });
    cargarPedidos();
  };

  return (
    <div className="panel-logistica">
      <h1>Pedidos en Preparación</h1>
      {pedidosEnPrep.map(pedido => (
        <div key={pedido.id} className="pedido">
          <p>Pedido: #{pedido.id}</p>
          <p>Cliente: {pedido.cliente_nombre}</p>
          <button onClick={() => cambiarAEntregado(pedido.id)}>
            Marcar como Entregado
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## 🧑‍💼 Gestión de Proveedor

```jsx
// ProveedorPanel.jsx
function ProveedorPanel() {
  const [productos, setProductos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const response = await fetch('/api/productos/mis_productos/', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setProductos(data);
  };

  const ajustarStock = async (productoId, operacion, cantidad) => {
    const response = await fetch(
      `/api/productos/${productoId}/ajustar_stock/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cantidad, operacion })
      }
    );
    const result = await response.json();
    alert(result.mensaje);
    cargarProductos();
  };

  return (
    <div className="proveedor-panel">
      <h1>Mi Inventario</h1>
      {productos.map(p => (
        <div key={p.id} className="producto">
          <h3>{p.nombre}</h3>
          <p>Stock actual: {p.stock}</p>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
          />
          <button onClick={() => ajustarStock(p.id, 'aumentar', cantidad)}>
            ➕ Aumentar
          </button>
          <button onClick={() => ajustarStock(p.id, 'reducir', cantidad)}>
            ➖ Reducir
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## ⚠️ Manejo de Errores

```javascript
const crearPedidoSeguro = async (token, data) => {
  try {
    const response = await fetch('/api/pedidos/crear_pedido/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (response.status === 400) {
      const error = await response.json();
      alert(`Error: ${JSON.stringify(error)}`);
    } else if (response.status === 401) {
      alert('Sesión expirada. Inicia sesión de nuevo.');
    } else if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    alert('Error de conexión');
  }
};
```

---

## 📱 Interfaz Responsive

```css
@media (max-width: 768px) {
  .catalogo {
    display: grid;
    grid-template-columns: 1fr;
  }

  .producto-card {
    padding: 10px;
  }

  .carrito {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: white;
    border-top: 1px solid #ddd;
  }
}
```

---

## 🔄 Actualización en Tiempo Real (WebSocket)

Para futuras implementaciones:

```javascript
// Socket para actualizaciones de pedidos
const socket = new WebSocket('ws://localhost:8001/ws/pedidos/');

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'pedido_actualizado') {
    // Actualizar UI
    cargarPedidos();
  }
};
```

---

## 📋 Checklist de Integración

- [ ] Configurar endpoints API en frontend
- [ ] Implementar autenticación JWT
- [ ] Crear componente Catálogo
- [ ] Crear carrito de compras
- [ ] Implementar creación de pedidos
- [ ] Crear panel de seguimiento
- [ ] Agregar permisos por rol
- [ ] Validar errores HTTP
- [ ] Implementar paginación
- [ ] Agregar notificaciones
- [ ] Testing completo
- [ ] Deploy en producción

---

## 📚 Enlaces Útiles

- API Documentation: `PRODUCTOS_DOCUMENTACION.md`
- Ejemplos HTTP: `EJEMPLOS_API_PRODUCTOS.md`
- Tests: `python manage.py test productos`
- Admin Panel: `http://localhost:8000/admin/`
