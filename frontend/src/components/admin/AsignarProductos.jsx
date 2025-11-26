import React, { useState, useEffect } from 'react';
import productosService from '../../services/productosService';
import UserService from '../../services/userService';
import '../../styles/AsignarProductos.css';

function AsignarProductos() {
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState('todos'); // 'todos', 'con_proveedor', 'sin_proveedor'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    setError('');
    try {
      const [productosData, proveedoresData] = await Promise.all([
        productosService.getProductos(),
        UserService.getProveedores()
      ]);
      
      console.log('Productos cargados:', productosData);
      console.log('Proveedores cargados:', proveedoresData);
      
      setProductos(Array.isArray(productosData) ? productosData : []);
      setProveedores(Array.isArray(proveedoresData) ? proveedoresData : []);
      
      if (!Array.isArray(productosData) || productosData.length === 0) {
        setError('No se encontraron productos. Asegúrate de crear productos primero.');
      }
      if (!Array.isArray(proveedoresData) || proveedoresData.length === 0) {
        setError('No se encontraron proveedores. Asegúrate de crear usuarios con rol "proveedor" primero.');
      }
    } catch (err) {
      console.error('Error cargando datos:', err);
      setError(err.response?.data?.error || 'Error al cargar los datos. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  const handleAsignar = async (productoId, proveedorId) => {
    if (!proveedorId) {
      setError('Selecciona un proveedor');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      setError('');
      const resultado = await productosService.asignarProveedor(productoId, proveedorId);
      setMensaje(resultado.mensaje || 'Proveedor asignado correctamente');
      
      // Actualizar el producto en la lista
      setProductos(prev => prev.map(p => 
        p.id === productoId 
          ? { ...p, proveedor: proveedorId, proveedor_nombre: resultado.proveedor_nombre }
          : p
      ));

      setTimeout(() => setMensaje(''), 3000);
    } catch (err) {
      console.error('Error asignando proveedor:', err);
      setError(err.response?.data?.error || 'Error al asignar proveedor');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleAsignarMasivo = async (proveedorId) => {
    if (!proveedorId) {
      setError('Selecciona un proveedor para asignación masiva');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const productosSinProveedor = productos.filter(p => !p.proveedor);
    if (productosSinProveedor.length === 0) {
      setError('No hay productos sin proveedor');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (!window.confirm(`¿Asignar ${productosSinProveedor.length} productos sin proveedor a este proveedor?`)) {
      return;
    }

    let exitosos = 0;
    let fallidos = 0;

    for (const producto of productosSinProveedor) {
      try {
        await handleAsignar(producto.id, proveedorId);
        exitosos++;
      } catch {
        fallidos++;
      }
    }

    setMensaje(`Asignación masiva completada: ${exitosos} exitosos, ${fallidos} fallidos`);
    setTimeout(() => setMensaje(''), 5000);
  };

  const productosFiltrados = productos.filter(p => {
    const matchesFiltro = 
      filtro === 'todos' ? true :
      filtro === 'con_proveedor' ? p.proveedor :
      filtro === 'sin_proveedor' ? !p.proveedor :
      true;
    
    const matchesSearch = searchTerm === '' || 
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.categoria && p.categoria.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFiltro && matchesSearch;
  });

  if (loading) {
    return (
      <div className="asignar-productos-container">
        <div className="loading-spinner">
          <p>Cargando productos y proveedores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="asignar-productos-container">
      <div className="header-section">
        <h1>🔗 Asignar Productos a Proveedores</h1>
        <p className="subtitle">Gestiona la asignación de productos a proveedores</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      {/* Barra de búsqueda y asignación masiva */}
      <div className="controls-section">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar productos por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="masivo-container">
          <select 
            className="proveedor-select"
            onChange={(e) => e.target.value && handleAsignarMasivo(e.target.value)}
            defaultValue=""
          >
            <option value="">Asignación masiva...</option>
            {proveedores.map(prov => (
              <option key={prov.id} value={prov.id}>
                {prov.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros-container">
        <button 
          className={`filtro-btn ${filtro === 'todos' ? 'active' : ''}`}
          onClick={() => setFiltro('todos')}
        >
          Todos ({productos.length})
        </button>
        <button 
          className={`filtro-btn ${filtro === 'con_proveedor' ? 'active' : ''}`}
          onClick={() => setFiltro('con_proveedor')}
        >
          Con Proveedor ({productos.filter(p => p.proveedor).length})
        </button>
        <button 
          className={`filtro-btn ${filtro === 'sin_proveedor' ? 'active' : ''}`}
          onClick={() => setFiltro('sin_proveedor')}
        >
          Sin Proveedor ({productos.filter(p => !p.proveedor).length})
        </button>
      </div>

      {/* Tabla de productos */}
      <div className="table-container">
        <table className="productos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Proveedor Actual</th>
              <th>Asignar Proveedor</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="7" style={{textAlign: 'center', padding: '40px'}}>
                  {searchTerm ? 'No se encontraron productos con ese criterio' : 'No hay productos para mostrar'}
                </td>
              </tr>
            ) : (
              productosFiltrados.map(producto => (
                <ProductoRow 
                  key={producto.id}
                  producto={producto}
                  proveedores={proveedores}
                  onAsignar={handleAsignar}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Estadísticas */}
      <div className="stats-section">
        <div className="stat-card">
          <span className="stat-value">{productos.length}</span>
          <span className="stat-label">Total Productos</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{productos.filter(p => p.proveedor).length}</span>
          <span className="stat-label">Con Proveedor</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{productos.filter(p => !p.proveedor).length}</span>
          <span className="stat-label">Sin Proveedor</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{proveedores.length}</span>
          <span className="stat-label">Proveedores Activos</span>
        </div>
      </div>
    </div>
  );
}

function ProductoRow({ producto, proveedores, onAsignar }) {
  const [selectedProveedor, setSelectedProveedor] = useState(producto.proveedor || '');
  const [isAssigning, setIsAssigning] = useState(false);

  const handleAsignarClick = async () => {
    setIsAssigning(true);
    try {
      await onAsignar(producto.id, selectedProveedor);
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <tr>
      <td>{producto.id}</td>
      <td>
        <div className="producto-info">
          <strong>{producto.nombre}</strong>
          {producto.categoria && (
            <span className="categoria-badge">{producto.categoria}</span>
          )}
        </div>
      </td>
      <td>${Number(producto.precio).toFixed(2)}</td>
      <td>
        <span className={producto.stock < 10 ? 'stock-bajo' : ''}>
          {producto.stock}
        </span>
      </td>
      <td>
        {producto.proveedor_nombre ? (
          <span className="proveedor-badge">{producto.proveedor_nombre}</span>
        ) : (
          <span className="sin-proveedor">Sin asignar</span>
        )}
      </td>
      <td>
        <select 
          className="proveedor-select"
          value={selectedProveedor}
          onChange={(e) => setSelectedProveedor(e.target.value)}
          disabled={isAssigning}
        >
          <option value="">Seleccionar...</option>
          {proveedores.map(prov => (
            <option key={prov.id} value={prov.id}>
              {prov.nombre}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button 
          className="btn-asignar"
          onClick={handleAsignarClick}
          disabled={!selectedProveedor || selectedProveedor == producto.proveedor || isAssigning}
        >
          {isAssigning ? 'Asignando...' : 'Asignar'}
        </button>
      </td>
    </tr>
  );
}

export default AsignarProductos;
