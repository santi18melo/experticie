import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';
import { axiosInstance } from '../../services/api';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [tiendaId, setTiendaId] = useState(1);
  const [secciones, setSecciones] = useState([]);

  // Filtros avanzados
  const [filtros, setFiltros] = useState({
    busqueda: '',
    categoria: 'todos',
    seccion: '',
    precioMin: '',
    precioMax: '',
    ordenPrecio: 'none',
    mostrarBasicos: false
  });

  const token = localStorage.getItem('token');

  const cargarSecciones = async () => {
    try {
      const res = await axiosInstance.get('/productos/secciones/');
      const data = res.data.results || res.data;
      setSecciones(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error cargando secciones:', err);
    }
  };

  const cargarProductos = async () => {
    try {
      let data = tiendaId === 0
        ? await api.getProductos(token)
        : await api.getProductosPorTienda(token, tiendaId);

      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error cargando productos:', err);
      setProductos([]);
    }
  };

  const aplicarFiltros = () => {
    let filtrados = [...productos];

    // Búsqueda por nombre
    if (filtros.busqueda) {
      filtrados = filtrados.filter(p =>
        p.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase())
      );
    }

    // Categoría
    if (filtros.categoria !== 'todos') {
      filtrados = filtrados.filter(p => p.categoria === filtros.categoria);
    }

    // Sección
    if (filtros.seccion) {
      const seccionSeleccionada = secciones.find(s => s.id === parseInt(filtros.seccion));
      if (seccionSeleccionada && seccionSeleccionada.productos) {
        filtrados = filtrados.filter(p => seccionSeleccionada.productos.includes(p.id));
      }
    }

    // Rango de precios
    if (filtros.precioMin) {
      filtrados = filtrados.filter(p => parseFloat(p.precio) >= parseFloat(filtros.precioMin));
    }
    if (filtros.precioMax) {
      filtrados = filtrados.filter(p => parseFloat(p.precio) <= parseFloat(filtros.precioMax));
    }

    // Básicos
    if (filtros.mostrarBasicos) {
      filtrados = filtrados.filter(p => p.es_basico === true);
    }

    // Orden por precio
    if (filtros.ordenPrecio === 'asc') {
      filtrados.sort((a, b) => a.precio - b.precio);
    } else if (filtros.ordenPrecio === 'desc') {
      filtrados.sort((a, b) => b.precio - a.precio);
    }

    setProductosFiltrados(filtrados);
  };

  useEffect(() => { 
    cargarProductos(); 
    cargarSecciones();
  }, [tiendaId]);

  useEffect(() => {
    aplicarFiltros();
  }, [productos, filtros, secciones]);

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

  const limpiarFiltros = () => {
    setFiltros({
      busqueda: '',
      categoria: 'todos',
      seccion: '',
      precioMin: '',
      precioMax: '',
      ordenPrecio: 'none',
      mostrarBasicos: false
    });
  };

  return (
    <div className="catalogo">
      <h1>Catálogo de Productos</h1>

      {/* FILTROS AVANZADOS */}
      <div style={{ 
        marginBottom: '25px', 
        padding: '20px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: 'white', fontSize: '18px' }}>🔍 Filtros de Búsqueda</h3>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Búsqueda con lupa */}
          <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
            <input
              type="text"
              placeholder="Buscar producto..."
              value={filtros.busqueda}
              onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
              style={{
                padding: '10px 40px 10px 15px',
                borderRadius: '10px',
                border: 'none',
                width: '100%',
                fontSize: '15px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            />
            <span style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '18px',
              pointerEvents: 'none'
            }}>
              🔍
            </span>
          </div>

          {/* Categoría */}
          <select
            value={filtros.categoria}
            onChange={(e) => setFiltros({...filtros, categoria: e.target.value})}
            style={{
              padding: '10px 15px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '15px',
              background: 'white',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            <option value="todos">Todas las Categorías</option>
            {[...new Set(productos.map(p => p.categoria))].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Sección */}
          <select
            value={filtros.seccion}
            onChange={(e) => setFiltros({...filtros, seccion: e.target.value})}
            style={{
              padding: '10px 15px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '15px',
              background: 'white',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            <option value="">Todas las Secciones</option>
            {secciones.map(s => (
              <option key={s.id} value={s.id}>{s.nombre}</option>
            ))}
          </select>

          {/* Rango de precios */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="number"
              placeholder="Min $"
              value={filtros.precioMin}
              onChange={(e) => setFiltros({...filtros, precioMin: e.target.value})}
              style={{
                width: '100px',
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '15px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            />
            <span style={{ color: 'white', fontWeight: 'bold' }}>-</span>
            <input
              type="number"
              placeholder="Max $"
              value={filtros.precioMax}
              onChange={(e) => setFiltros({...filtros, precioMax: e.target.value})}
              style={{
                width: '100px',
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '15px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* Orden */}
          <select
            value={filtros.ordenPrecio}
            onChange={(e) => setFiltros({...filtros, ordenPrecio: e.target.value})}
            style={{
              padding: '10px 15px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '15px',
              background: 'white',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            <option value="none">Sin ordenar</option>
            <option value="asc">Precio: Menor a Mayor</option>
            <option value="desc">Precio: Mayor a Menor</option>
          </select>

          {/* Botón básicos */}
          <button
            onClick={() => setFiltros({...filtros, mostrarBasicos: !filtros.mostrarBasicos})}
            style={{
              padding: '10px 20px',
              background: filtros.mostrarBasicos ? '#10b981' : 'white',
              color: filtros.mostrarBasicos ? 'white' : '#334155',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }}
          >
            {filtros.mostrarBasicos ? '✓ Solo Básicos' : 'Mostrar Básicos'}
          </button>

          {/* Limpiar */}
          <button
            onClick={limpiarFiltros}
            style={{
              padding: '10px 20px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }}
          >
            🗑️ Limpiar
          </button>
        </div>

        {/* Contador de resultados */}
        <div style={{ marginTop: '15px', color: 'white', fontSize: '14px', fontWeight: '500' }}>
          📦 Mostrando {productosFiltrados.length} de {productos.length} productos
        </div>
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
              data-testid="add-to-cart-button"
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