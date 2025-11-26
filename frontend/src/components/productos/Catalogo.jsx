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
          {mostrarBasicos ? "Mostrar todos" : "Mostrar solo básicos"}
        </button>
      </div>

      {/* Productos */}
      <div className="productos">
        {productosFiltrados.map(p => (
          <div key={p.id} className="producto">
            <img src={p.imagen} alt={p.nombre} />
            <h2>{p.nombre}</h2>
            <p className="categoria">{p.categoria}</p>
            <p className="tienda">Tienda: {p.tienda_nombre}</p>
            <p className="precio">${p.precio}</p>
            <p className={`stock ${p.stock > 0 ? 'disponible' : 'agotado'}`}>
              {p.stock > 0 ? `Stock: ${p.stock}` : 'Agotado'}
            </p>
            <button 
              onClick={() => agregarAlCarrito(p)}
              disabled={p.stock <= 0}
              className={p.stock <= 0 ? 'disabled' : ''}
            >
              {p.stock > 0 ? 'Agregar al carrito' : 'Sin Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;