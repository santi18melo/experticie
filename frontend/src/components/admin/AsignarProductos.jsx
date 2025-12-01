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
  const [selectedIds, setSelectedIds] = useState(new Set());

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
      
      const productosArray = Array.isArray(productosData) ? productosData : (productosData.results || []);
      setProductos(productosArray);
      setProveedores(Array.isArray(proveedoresData) ? proveedoresData : []);
      
      if (productosArray.length === 0) {
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

  const toggleSelectAll = () => {
    if (selectedIds.size === productosFiltrados.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(productosFiltrados.map(p => p.id)));
    }
  };

  const toggleSelectOne = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleAsignarSeleccionados = async (proveedorId) => {
    if (!proveedorId) {
      setError('Selecciona un proveedor para asignación masiva');
      return;
    }
    if (selectedIds.size === 0) {
      setError('Selecciona al menos un producto');
      return;
    }

    if (!window.confirm(`¿Asignar ${selectedIds.size} productos seleccionados a este proveedor?`)) {
      return;
    }

    let exitosos = 0;
    let fallidos = 0;

    // Iterar sobre los IDs seleccionados
    for (const id of selectedIds) {
      try {
        // Llamada directa al servicio sin pasar por handleAsignar para evitar múltiples actualizaciones de estado
        const resultado = await productosService.asignarProveedor(id, proveedorId);
        
        // Actualizar estado local silenciosamente
        setProductos(prev => prev.map(p => 
          p.id === id 
            ? { ...p, proveedor: proveedorId, proveedor_nombre: resultado.proveedor_nombre }
            : p
        ));
        exitosos++;
      } catch (err) {
        console.error(`Error asignando producto ${id}:`, err);
        fallidos++;
      }
    }

    setMensaje(`Asignación completada: ${exitosos} exitosos, ${fallidos} fallidos`);
    setSelectedIds(new Set()); // Limpiar selección
    setTimeout(() => setMensaje(''), 5000);
  };

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
        
        {selectedIds.size > 0 && (
          <div className="masivo-container" style={{display: 'flex', gap: '10px', alignItems: 'center', background: '#e0f2fe', padding: '5px 15px', borderRadius: '8px', border: '1px solid #bae6fd'}}>
            <span style={{fontWeight: 'bold', color: '#0369a1'}}>{selectedIds.size} seleccionados</span>
            <select 
              className="proveedor-select"
              onChange={(e) => {
                if (e.target.value) {
                  handleAsignarSeleccionados(e.target.value);
                  e.target.value = ""; // Reset select
                }
              }}
              defaultValue=""
              style={{margin: 0, minWidth: '200px'}}
            >
              <option value="">Asignar a proveedor...</option>
              {proveedores.map(prov => (
                <option key={prov.id} value={prov.id}>
                  {prov.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
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
              <th></th> {/* Checkbox column */}
              <th>ID</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Proveedor Actual</th>
              <th>Asignar Proveedor</th>
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
                  isSelected={selectedIds.has(producto.id)}
                  onToggleSelect={toggleSelectOne}
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

function ProductoRow({ producto, proveedores, onAsignar, isSelected, onToggleSelect }) {
  const [isAssigning, setIsAssigning] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success', 'error'

  const handleProveedorChange = async (e) => {
    const nuevoProveedorId = e.target.value;
    if (!nuevoProveedorId) return;

    setIsAssigning(true);
    setSaveStatus(null);
    
    try {
      await onAsignar(producto.id, nuevoProveedorId);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsAssigning(false);
    }
  };

  // Helper function for currency formatting (assuming it's defined elsewhere or will be added)
  const formatoMoneda = (value) => `$${Number(value).toFixed(2)}`;

  return (
    <tr style={isSelected ? {background: '#f0f9ff'} : {}}>
      <td style={{textAlign: 'center'}}>
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => onToggleSelect(producto.id)}
          style={{cursor: 'pointer', width: '18px', height: '18px'}}
        />
      </td>
      <td>{producto.id}</td>
      <td>
        <div className="producto-info">
          <span className="producto-nombre">{producto.nombre}</span>
          {producto.categoria && (
            <span className="badge-categoria">{producto.categoria}</span>
          )}
        </div>
      </td>
      <td>{formatoMoneda(producto.precio)}</td>
      <td>
        <span className={producto.stock < 10 ? 'stock-bajo' : ''}>
          {producto.stock}
        </span>
      </td>
      <td>
        {producto.proveedor_nombre ? (
          <span className="badge-proveedor">
            {producto.proveedor_nombre}
          </span>
        ) : (
          <span className="badge-sin-proveedor">Sin asignar</span>
        )}
      </td>
      <td>
        {isAssigning ? (
          <div style={{display: 'flex', alignItems: 'center', gap: '5px', color: '#666'}}>
            <span className="spinner-small">⌛</span> Guardando...
          </div>
        ) : saveStatus === 'success' ? (
          <div style={{color: '#10b981', fontWeight: '500'}}>
            ✓ ¡Asignado!
          </div>
        ) : (
          <select 
            className="select-proveedor-row"
            value={producto.proveedor || ''}
            onChange={handleProveedorChange}
            disabled={isAssigning}
          >
            <option value="">Seleccionar...</option>
            {proveedores.map(prov => (
              <option key={prov.id} value={prov.id}>
                {prov.nombre}
              </option>
            ))}
          </select>
        )}
      </td>
    </tr>
  );
}

export default AsignarProductos;
