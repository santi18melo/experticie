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

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [productosData, proveedoresData] = await Promise.all([
        productosService.getProductos(),
        UserService.getProveedores()
      ]);
      
      setProductos(Array.isArray(productosData) ? productosData : []);
      setProveedores(Array.isArray(proveedoresData) ? proveedoresData : []);
    } catch (err) {
      console.error('Error cargando datos:', err);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleAsignar = async (productoId, proveedorId) => {
    if (!proveedorId) {
      setError('Selecciona un proveedor');
      return;
    }

    try {
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

  const productosFiltrados = productos.filter(p => {
    if (filtro === 'con_proveedor') return p.proveedor;
    if (filtro === 'sin_proveedor') return !p.proveedor;
    return true;
  });

  if (loading) {
    return (
      <div className="asignar-productos-container">
        <p>Cargando...</p>
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
                  No hay productos para mostrar
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
    </div>
  );
}

function ProductoRow({ producto, proveedores, onAsignar }) {
  const [selectedProveedor, setSelectedProveedor] = useState(producto.proveedor || '');

  return (
    <tr>
      <td>{producto.id}</td>
      <td>
        <div className="producto-info">
          <strong>{producto.nombre}</strong>
          <span className="categoria-badge">{producto.categoria || 'general'}</span>
        </div>
      </td>
      <td>${Number(producto.precio).toFixed(2)}</td>
      <td>{producto.stock}</td>
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
          onClick={() => onAsignar(producto.id, selectedProveedor)}
          disabled={!selectedProveedor || selectedProveedor == producto.proveedor}
        >
          Asignar
        </button>
      </td>
    </tr>
  );
}

export default AsignarProductos;
