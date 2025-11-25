import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import api from "../../services/api.js";
import "../../styles/PanelCliente.css";

/**
 * PanelComprador (versión mejorada)
 * - Funciones optimizadas con useCallback
 * - total memoizado con useMemo
 * - pequeños subcomponentes internos ProductCard / CartItem
 * - manejo robusto de errores y loading
 * - debounce simple para búsqueda (si quisieras)
 *
 * Requisitos: api.getProductosPorTienda, api.getMisPedidos, api.getTiendas, api.crearPedido
 */

function PanelComprador() {
  // -----------------------
  // Estados
  // -----------------------
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const [tiendas, setTiendas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [pedidos, setPedidos] = useState([]);

  const [busqueda, setBusqueda] = useState(""); // ejemplo de buscador
  const token = localStorage.getItem("token");

  // debounce simple para búsqueda (evita buscar cada tecla)
  const debounceRef = useRef(null);
  const onBuscar = (value) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setBusqueda(value);
    }, 300);
  };

  // -----------------------
  // Memo / Derived
  // -----------------------
  const total = useMemo(
    () =>
      carrito.reduce((sum, item) => {
        const price = Number(item.precio) || 0;
        const qty = Number(item.cantidad) || 0;
        return sum + price * qty;
      }, 0),
    [carrito]
  );

  const productosFiltrados = useMemo(() => {
    return productos
      .filter((p) => {
        if (filtroCategoria === "basicos") return p.es_basico;
        if (filtroCategoria === "no_basicos") return !p.es_basico;
        return true;
      })
      .filter((p) => {
        if (!busqueda) return true;
        return (
          p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
          p.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
        );
      });
  }, [productos, filtroCategoria, busqueda]);

  // -----------------------
  // Funciones del carrito
  // -----------------------
  const agregarAlCarrito = useCallback((producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: Math.min(p.cantidad + 1, producto.stock || Infinity) }
            : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }, []);

  const eliminarDelCarrito = useCallback((id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const actualizarCantidad = useCallback((id, nuevaCantidad) => {
    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) return;
    setCarrito((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad: nuevaCantidad } : item))
    );
  }, []);

  // -----------------------
  // Cargar productos por tienda
  // -----------------------
  const cargarProductosPorTienda = useCallback(
    async (id) => {
      if (!id) return setProductos([]);
      try {
        setLoading(true);
        const data = await api.getProductosPorTienda(token, id);
        // normalizar
        setProductos(Array.isArray(data) ? data : data.results || []);
        setCarrito([]); // opcional: limpiar carrito al cambiar tienda
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError(
          "Error cargando productos: " +
            (err?.response?.data?.detail || err?.message || "desconocido")
        );
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // -----------------------
  // Cargar datos iniciales (tiendas, pedidos)
  // -----------------------
  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [resPedidos, resTiendas] = await Promise.all([
        api.getMisPedidos(token),
        api.getTiendas(token),
      ]);

      setPedidos(Array.isArray(resPedidos) ? resPedidos : resPedidos.results || []);
      const listaTiendas = Array.isArray(resTiendas) ? resTiendas : resTiendas.results || [];
      setTiendas(listaTiendas);

      if (listaTiendas.length > 0) {
        const defaultId = listaTiendas[0].id;
        setTiendaSeleccionada(defaultId);
        await cargarProductosPorTienda(defaultId);
      } else {
        setProductos([]);
      }
    } catch (err) {
      console.error("Error cargando datos:", err);
      setError("Error al cargar datos: " + (err?.message || "desconocido"));
    } finally {
      setLoading(false);
    }
  }, [token, cargarProductosPorTienda]);

  useEffect(() => {
    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // llamar solo al montar; cargarDatos ya está memoizado

  // -----------------------
  // Crear pedido
  // -----------------------
  const crearPedido = useCallback(async () => {
    if (carrito.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const detalles = carrito.map((p) => ({ producto: p.id, cantidad: p.cantidad }));
      const response = await api.crearPedido(token, {
        tienda_id: tiendaSeleccionada,
        detalles,
        notas: "Pedido desde el panel",
      });

      setExito(`✓ Pedido #${response.id} creado exitosamente`);
      setCarrito([]);
      // refrescar pedidos/tiendas
      setTimeout(() => {
        setExito("");
        cargarDatos();
      }, 1300);
    } catch (err) {
      console.error("Error creando pedido:", err);
      setError("Error al crear pedido: " + (err?.response?.data?.error || err?.message || ""));
    } finally {
      setLoading(false);
    }
  }, [carrito, token, tiendaSeleccionada, cargarDatos]);

  // -----------------------
  // Subcomponentes internos (pequeños y reutilizables)
  // -----------------------
  function ProductCard({ producto }) {
    return (
      <div className="producto-card">
        <h3>{producto.nombre}</h3>
        <p className="descripcion">{producto.descripcion}</p>
        <p className="precio">${producto.precio}</p>
        <p className={`categoria ${producto.es_basico ? "basico" : "no-basico"}`}>
          {producto.es_basico ? "🔹 Necesidad Básica" : "✨ No Básico"}
        </p>
        <p className={`stock ${producto.stock > 0 ? "disponible" : "agotado"}`}>
          Stock: {producto.stock}
        </p>
        <div className="producto-actions">
          <button
            onClick={() => agregarAlCarrito(producto)}
            disabled={producto.stock === 0}
            className="btn-agregar"
          >
            {producto.stock > 0 ? "Agregar" : "Agotado"}
          </button>
        </div>
      </div>
    );
  }

  function CartItem({ item }) {
    return (
      <div className="carrito-item">
        <div className="item-info">
          <h4>{item.nombre}</h4>
          <p>
            ${item.precio} x {item.cantidad}
          </p>
        </div>
        <div className="item-controls">
          <input
            type="number"
            min="1"
            max={item.stock || 9999}
            value={item.cantidad}
            onChange={(e) => {
              const val = parseInt(e.target.value || "0", 10);
              if (!isNaN(val)) actualizarCantidad(item.id, val);
            }}
          />
          <button onClick={() => eliminarDelCarrito(item.id)} className="btn-eliminar">
            ✕
          </button>
        </div>
        <div className="item-subtotal">${(item.precio * item.cantidad).toFixed(2)}</div>
      </div>
    );
  }

  // -----------------------
  // Render
  // -----------------------
  return (
    <div className="panel-comprador">
      <h1>🛒 Panel Comprador</h1>

      {loading && <div className="alert alert-info">Cargando...</div>}
      {error && <div className="alert alert-error">{error}</div>}
      {exito && <div className="alert alert-success">{exito}</div>}

      <div className="main-content">
        {/* PRODUCTOS */}
        <div className="seccion-productos">
          <h2>Productos</h2>

          <div className="selector-tienda">
            <label>Tienda:</label>
            <select
              value={tiendaSeleccionada || ""}
              onChange={(e) => {
                const id = parseInt(e.target.value, 10);
                setTiendaSeleccionada(id);
                cargarProductosPorTienda(id);
              }}
            >
              {tiendas.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="buscador">
            <input
              placeholder="Buscar nombre o descripción..."
              onChange={(e) => onBuscar(e.target.value)}
            />
          </div>

          <div className="filtro-categoria">
            <label>Filtrar por:</label>
            <div className="filtro-botones">
              <button
                className={`filtro-btn ${filtroCategoria === "todos" ? "activo" : ""}`}
                onClick={() => setFiltroCategoria("todos")}
              >
                Todos ({productos.length})
              </button>
              <button
                className={`filtro-btn ${filtroCategoria === "basicos" ? "activo" : ""}`}
                onClick={() => setFiltroCategoria("basicos")}
              >
                🔹 Básicos ({productos.filter((p) => p.es_basico).length})
              </button>
              <button
                className={`filtro-btn ${filtroCategoria === "no_basicos" ? "activo" : ""}`}
                onClick={() => setFiltroCategoria("no_basicos")}
              >
                ✨ No Básicos ({productos.filter((p) => !p.es_basico).length})
              </button>
            </div>
          </div>

          <div className="grid-productos">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((p) => <ProductCard key={p.id} producto={p} />)
            ) : (
              <p>No hay productos disponibles en esta tienda</p>
            )}
          </div>
        </div>

        {/* CARRITO */}
        <div className="seccion-carrito">
          <h2>🛍️ Carrito ({carrito.length})</h2>

          {carrito.length > 0 ? (
            <>
              <div className="carrito-items">
                {carrito.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="carrito-resumen">
                <h3>Total: ${total.toFixed(2)}</h3>
                <button onClick={crearPedido} className="btn-crear-pedido">
                  Crear Pedido
                </button>
              </div>
            </>
          ) : (
            <p>El carrito está vacío</p>
          )}
        </div>
      </div>

      {/* PEDIDOS */}
      <div className="seccion-pedidos">
        <h2>📋 Mis Pedidos</h2>
        {pedidos.length > 0 ? (
          <table className="tabla-pedidos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tienda</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id} className={`estado-${p.estado}`}>
                  <td>#{p.id}</td>
                  <td>{p.tienda_nombre}</td>
                  <td>
                    <span className={`badge estado-${p.estado}`}>{p.estado}</span>
                  </td>
                  <td>${p.total}</td>
                  <td>{new Date(p.fecha_creacion).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tienes pedidos aún</p>
        )}
      </div>
    </div>
  );
}

export default PanelComprador;
