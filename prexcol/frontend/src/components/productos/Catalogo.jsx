import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [tiendaId, setTiendaId] = useState(1);

  // Filtros
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');
  const [ordenPrecio, setOrdenPrecio] = useState('none');
  const [mostrarBasicos, setMostrarBasicos] = useState(false);

  const token = localStorage.getItem('token');

  const cargarProductos = async () => {
    try {
      let data = tiendaId === 0
        ? await api.getProductos(token)            // todos
        : await api.getProductosPorTienda(token, tiendaId); // por tienda

      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error cargando productos:', err);
      setProductos([]);
    }
  };

  const aplicarFiltros = () => {
    let filtrados = [...productos];

    // Búsqueda
    filtrados = filtrados.filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Categoría
    if (categoriaFiltro !== 'todos') {
      filtrados = filtrados.filter(p => p.categoria === categoriaFiltro);
    }

    // Básicos
    if (mostrarBasicos) {
      filtrados = filtrados.filter(p => p.es_basico === true);
    }

    // Orden
    if (ordenPrecio === 'asc') {
      filtrados.sort((a, b) => a.precio - b.precio);
    } else if (ordenPrecio === 'desc') {
      filtrados.sort((a, b) => b.precio - a.precio);
    }

    setProductosFiltrados(filtrados);
  };

  // Cargar productos al cambiar tienda
  useEffect(() => { cargarProductos(); }, [tiendaId]);

  // Aplicar filtros
  useEffect(() => {
    aplicarFiltros();
  }, [productos, busqueda, categoriaFiltro, ordenPrecio, mostrarBasicos]);

  // Carrito
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(p => p.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(p =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const crearPedido = async () => {
    const detalles = carrito.map(p => ({ producto: p.id, cantidad: p.cantidad }));
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

      {/* Controles de filtro */}
      <div className="filtros" style={{ marginBottom: "20px" }}>

        {/* FILTRO POR TIENDA */}
        <div className="filtro-tienda" style={{ marginBottom: "20px" }}>
          <label>Filtrar por tienda: </label>
          <select
            value={tiendaId}
            onChange={(e) => setTiendaId(Number(e.target.value))}
            style={{ padding: "6px", marginLeft: "10px" }}
          >
            <option value={1}>Básicos</option>
            <option value={0}>Todos</option>
          </select>
        </div>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        />

        {/* Categorías dinámicas */}
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        >
          <option value="todos">Todas las categorías</option>
          {[...new Set(productos.map(p => p.categoria))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Orden precio */}
        <select
          value={ordenPrecio}
          onChange={(e) => setOrdenPrecio(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        >
          <option value="none">Sin ordenar</option>
          <option value="asc">Precio: menor a mayor</option>
          <option value="desc">Precio: mayor a menor</option>
        </select>

        {/* Botón básicos */}
        <button
          onClick={() => setMostrarBasicos(!mostrarBasicos)}
          style={{
            padding: "6px 12px",
            background: mostrarBasicos ? "#007bff" : "#ccc",
            color: mostrarBasicos ? "white" : "black",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          {mostrarBasicos ? "Mostrando: Básicos" : "Mostrando: Todos"}
        </button>
      </div>

      {/* Productos */}
      <div className="productos">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="producto-card">
            {producto.imagen_url && (
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px" }}
              />
            )}

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

      {/* Carrito */}
      <div className="carrito">
        <h2>Carrito ({carrito.length})</h2>
        <ul>
          {carrito.map(item => (
            <li key={item.id}>
              {item.nombre} x{item.cantidad} = ${item.precio * item.cantidad}
            </li>
          ))}
        </ul>
        <button onClick={crearPedido} disabled={carrito.length === 0}>
          Crear Pedido
        </button>
      </div>
    </div>
  );
}

export default Catalogo;
