import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productosService from '../../services/productosService';
import UserService from '../../services/userService';
import '../../styles/AsignarProductos.css';

function AsignarProductos() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const [selectedIds, setSelectedIds] = useState(new Set());
  
  // Filtros avanzados
  const [searchId, setSearchId] = useState('');
  const [searchNombre, setSearchNombre] = useState('');
  const [searchCategoria, setSearchCategoria] = useState('');
  const [searchProveedor, setSearchProveedor] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [ordenPrecio, setOrdenPrecio] = useState(''); // 'asc', 'desc', ''
  
  // Estado para asignación masiva
  const [proveedoresSeleccionados, setProveedoresSeleccionados] = useState(new Set());
  const [mostrarPanelAsignacion, setMostrarPanelAsignacion] = useState(false);

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
    // Filtro de estado (todos, con proveedor, sin proveedor)
    const matchesFiltro = 
      filtro === 'todos' ? true :
      filtro === 'con_proveedor' ? p.proveedor :
      filtro === 'sin_proveedor' ? !p.proveedor :
      true;
    
    // Búsqueda por ID
    const matchesId = searchId === '' || p.id.toString().includes(searchId);
    
    // Búsqueda por nombre
    const matchesNombre = searchNombre === '' || 
      p.nombre.toLowerCase().includes(searchNombre.toLowerCase());
    
    // Búsqueda por categoría
    const matchesCategoria = searchCategoria === '' || 
      (p.categoria && p.categoria.toLowerCase().includes(searchCategoria.toLowerCase()));
    
    // Búsqueda por proveedor
    const matchesProveedor = searchProveedor === '' || 
      (p.proveedor_nombre && p.proveedor_nombre.toLowerCase().includes(searchProveedor.toLowerCase()));
    
    // Filtro de precio mínimo
    const matchesPrecioMin = precioMin === '' || parseFloat(p.precio) >= parseFloat(precioMin);
    
    // Filtro de precio máximo
    const matchesPrecioMax = precioMax === '' || parseFloat(p.precio) <= parseFloat(precioMax);
    
    return matchesFiltro && matchesId && matchesNombre && matchesCategoria && 
           matchesProveedor && matchesPrecioMin && matchesPrecioMax;
  }).sort((a, b) => {
    // Ordenamiento por precio
    if (ordenPrecio === 'asc') {
      return parseFloat(a.precio) - parseFloat(b.precio);
    } else if (ordenPrecio === 'desc') {
      return parseFloat(b.precio) - parseFloat(a.precio);
    }
    return 0;
  });

  const limpiarFiltros = () => {
    setSearchId('');
    setSearchNombre('');
    setSearchCategoria('');
    setSearchProveedor('');
    setPrecioMin('');
    setPrecioMax('');
    setOrdenPrecio('');
    setFiltro('todos');
  };

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

  const toggleProveedorSeleccionado = (proveedorId) => {
    const newSelected = new Set(proveedoresSeleccionados);
    if (newSelected.has(proveedorId)) {
      newSelected.delete(proveedorId);
    } else {
      newSelected.add(proveedorId);
    }
    setProveedoresSeleccionados(newSelected);
  };

  const handleAsignarMasivo = async () => {
    if (selectedIds.size === 0) {
      setError('Selecciona al menos un producto');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (proveedoresSeleccionados.size === 0) {
      setError('Selecciona al menos un proveedor');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const confirmMsg = `¿Asignar ${selectedIds.size} producto(s) a ${proveedoresSeleccionados.size} proveedor(es)?`;
    if (!window.confirm(confirmMsg)) {
      return;
    }

    let exitosos = 0;
    let fallidos = 0;

    // Asignar cada producto a cada proveedor seleccionado
    for (const productoId of selectedIds) {
      for (const proveedorId of proveedoresSeleccionados) {
        try {
          const resultado = await productosService.asignarProveedor(productoId, proveedorId);
          
          // Actualizar estado local (solo la última asignación se reflejará)
          setProductos(prev => prev.map(p => 
            p.id === productoId 
              ? { ...p, proveedor: proveedorId, proveedor_nombre: resultado.proveedor_nombre }
              : p
          ));
          exitosos++;
        } catch (err) {
          console.error(`Error asignando producto ${productoId} a proveedor ${proveedorId}:`, err);
          fallidos++;
        }
      }
    }

    setMensaje(`Asignación completada: ${exitosos} exitosos, ${fallidos} fallidos`);
    setSelectedIds(new Set());
    setProveedoresSeleccionados(new Set());
    setMostrarPanelAsignacion(false);
    setTimeout(() => setMensaje(''), 5000);
  };

  if (loading) {
    return (
      <div className="asignar-productos-container">
        <div className="loading-spinner">
          <div className="spinner-icon">⏳</div>
          <p>Cargando productos y proveedores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="asignar-productos-container">
      {/* Header */}
      <div className="header-section">
        <div className="header-content">
          <div className="title-group">
            <h1>🔗 Asignar Productos a Proveedores</h1>
            <p className="subtitle">Gestiona las asignaciones de productos a proveedores de forma eficiente</p>
          </div>
          <button 
            className="btn-volver"
            onClick={() => navigate('/dashboard')}
            title="Volver al Dashboard"
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && <div className="alert alert-error">⚠️ {error}</div>}
      {mensaje && <div className="alert alert-success">✓ {mensaje}</div>}

      {/* Sección 1: Búsqueda Avanzada */}
      <div className="section-card">
        <div className="section-header">
          <h2>🔍 Búsqueda Avanzada</h2>
          <button className="btn-secondary" onClick={limpiarFiltros}>
            Limpiar Filtros
          </button>
        </div>
        
        <div className="filtros-grid">
          <div className="filter-group">
            <label>ID del Producto</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Ej: 123"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Nombre del Producto</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Buscar por nombre..."
              value={searchNombre}
              onChange={(e) => setSearchNombre(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Categoría</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Buscar por categoría..."
              value={searchCategoria}
              onChange={(e) => setSearchCategoria(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Nombre del Proveedor</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Buscar por proveedor..."
              value={searchProveedor}
              onChange={(e) => setSearchProveedor(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Precio Mínimo</label>
            <input
              type="number"
              className="filter-input"
              placeholder="Ej: 10.00"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
              step="0.01"
            />
          </div>

          <div className="filter-group">
            <label>Precio Máximo</label>
            <input
              type="number"
              className="filter-input"
              placeholder="Ej: 100.00"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
              step="0.01"
            />
          </div>

          <div className="filter-group">
            <label>Ordenar por Precio</label>
            <select
              className="filter-select"
              value={ordenPrecio}
              onChange={(e) => setOrdenPrecio(e.target.value)}
            >
              <option value="">Sin ordenar</option>
              <option value="asc">Menor a Mayor</option>
              <option value="desc">Mayor a Menor</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Estado del Proveedor</label>
            <select
              className="filter-select"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option value="todos">Todos ({productos.length})</option>
              <option value="con_proveedor">Con Proveedor ({productos.filter(p => p.proveedor).length})</option>
              <option value="sin_proveedor">Sin Proveedor ({productos.filter(p => !p.proveedor).length})</option>
            </select>
          </div>
        </div>

        <div className="results-info">
          <span className="results-count">
            📊 Mostrando {productosFiltrados.length} de {productos.length} productos
          </span>
          {selectedIds.size > 0 && (
            <span className="selected-count">
              ✓ {selectedIds.size} producto(s) seleccionado(s)
            </span>
          )}
        </div>
      </div>

      {/* Sección 2: Asignación Masiva */}
      {selectedIds.size > 0 && (
        <div className="section-card section-assignment">
          <div className="section-header">
            <h2>📦 Asignación Masiva de Proveedores</h2>
            <button 
              className="btn-toggle"
              onClick={() => setMostrarPanelAsignacion(!mostrarPanelAsignacion)}
            >
              {mostrarPanelAsignacion ? '▼ Ocultar' : '▶ Mostrar'}
            </button>
          </div>

          {mostrarPanelAsignacion && (
            <div className="assignment-panel">
              <div className="assignment-info">
                <p><strong>{selectedIds.size}</strong> producto(s) seleccionado(s) para asignar</p>
              </div>

              <div className="proveedores-grid">
                {proveedores.map(proveedor => (
                  <div
                    key={proveedor.id}
                    className={`proveedor-card ${proveedoresSeleccionados.has(proveedor.id) ? 'selected' : ''}`}
                    onClick={() => toggleProveedorSeleccionado(proveedor.id)}
                  >
                    <input
                      type="checkbox"
                      checked={proveedoresSeleccionados.has(proveedor.id)}
                      onChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="proveedor-info">
                      <span className="proveedor-nombre">{proveedor.nombre}</span>
                      <span className="proveedor-email">{proveedor.email}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="assignment-actions">
                <button
                  className="btn-primary btn-large"
                  onClick={handleAsignarMasivo}
                  disabled={proveedoresSeleccionados.size === 0}
                >
                  ✓ Asignar a {proveedoresSeleccionados.size} Proveedor(es)
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setProveedoresSeleccionados(new Set());
                    setMostrarPanelAsignacion(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sección 3: Tabla de Productos */}
      <div className="section-card">
        <div className="section-header">
          <h2>📋 Lista de Productos</h2>
          <button
            className="btn-select-all"
            onClick={toggleSelectAll}
          >
            {selectedIds.size === productosFiltrados.length && productosFiltrados.length > 0 
              ? '□ Deseleccionar Todos' 
              : '☑ Seleccionar Todos'}
          </button>
        </div>

        <div className="table-container">
          <table className="productos-table">
            <thead>
              <tr>
                <th className="th-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === productosFiltrados.length && productosFiltrados.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>ID</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Proveedor Actual</th>
                <th>Asignar Individual</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <p>No se encontraron productos con los criterios seleccionados</p>
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
      </div>

      {/* Sección 4: Estadísticas */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <span className="stat-value">{productos.length}</span>
          <span className="stat-label">Total Productos</span>
        </div>
        <div className="stat-card stat-success">
          <div className="stat-icon">✓</div>
          <span className="stat-value">{productos.filter(p => p.proveedor).length}</span>
          <span className="stat-label">Con Proveedor</span>
        </div>
        <div className="stat-card stat-warning">
          <div className="stat-icon">⚠</div>
          <span className="stat-value">{productos.filter(p => !p.proveedor).length}</span>
          <span className="stat-label">Sin Proveedor</span>
        </div>
        <div className="stat-card stat-info">
          <div className="stat-icon">👥</div>
          <span className="stat-value">{proveedores.length}</span>
          <span className="stat-label">Proveedores Activos</span>
        </div>
      </div>

      {/* Botones de Acción Final */}
      <div className="action-buttons">
        <button
          className="btn-primary btn-large"
          onClick={() => {
            setMensaje('Cambios guardados correctamente');
            setTimeout(() => setMensaje(''), 3000);
          }}
        >
          💾 Guardar y Actualizar
        </button>
        <button
          className="btn-secondary btn-large"
          onClick={() => navigate('/dashboard')}
        >
          ← Volver al Dashboard
        </button>
      </div>
    </div>
  );
}

function ProductoRow({ producto, proveedores, onAsignar, isSelected, onToggleSelect }) {
  const [isAssigning, setIsAssigning] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

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
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsAssigning(false);
    }
  };

  const formatoMoneda = (value) => `$${Number(value).toFixed(2)}`;

  return (
    <tr className={isSelected ? 'row-selected' : ''}>
      <td className="td-checkbox">
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => onToggleSelect(producto.id)}
        />
      </td>
      <td className="td-id">{producto.id}</td>
      <td>
        <div className="producto-info">
          <span className="producto-nombre">{producto.nombre}</span>
        </div>
      </td>
      <td>
        {producto.categoria ? (
          <span className="badge-categoria">{producto.categoria}</span>
        ) : (
          <span className="text-muted">—</span>
        )}
      </td>
      <td className="td-precio">{formatoMoneda(producto.precio)}</td>
      <td>
        <span className={`stock-badge ${producto.stock < 10 ? 'stock-bajo' : ''}`}>
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
          <div className="status-assigning">
            <span className="spinner-small">⌛</span> Guardando...
          </div>
        ) : saveStatus === 'success' ? (
          <div className="status-success">
            ✓ ¡Asignado!
          </div>
        ) : saveStatus === 'error' ? (
          <div className="status-error">
            ✗ Error
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
