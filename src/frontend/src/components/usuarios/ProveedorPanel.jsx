import React, { useEffect, useState } from 'react';
import productosService from '../../services/productosService';
import '../../styles/ProveedorPanel.css';
import DashboardHeader from '../DashboardHeader';

function PanelProveedor() {
  const [productos, setProductos] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState({});
  const [loading, setLoading] = useState(false);

  // Edit State
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await productosService.getMisProductos();
      setProductos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error cargando productos:', error);
      setError('No se pudieron cargar los productos.');
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  const ajustarStock = async (id, operacion) => {
    const cantidad = cantidades[id];
    if (!cantidad || cantidad <= 0) {
      setError('Ingresa una cantidad válida mayor a 0');
      return;
    }

    setError('');
    setMensaje('');
    setUpdating(prev => ({ ...prev, [id]: true }));
    try {
      const resultado = await productosService.ajustarStock(id, operacion, cantidad);
      
      if (resultado && resultado.producto_id) {
         await cargarProductos();
      }
      
      setMensaje(resultado.mensaje || 'Stock actualizado');
      setCantidades(prev => ({ ...prev, [id]: 0 }));

      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error ajustando stock:', error);
      const errMsg = error.response?.data?.error || 'Error al ajustar stock';
      setError('❌ ' + errMsg);
      setTimeout(() => setError(''), 5000);
    } finally {
      setUpdating(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleCantidadChange = (id, value) => {
    setCantidades(prev => ({
      ...prev,
      [id]: parseInt(value) || 0
    }));
  };

  const calcularValorTotal = () => {
    return productos.reduce((sum, p) => sum + (p.precio * p.stock), 0);
  };

  // Edit Handlers
  const handleEditClick = (producto) => {
    setEditingProduct(producto);
    setEditForm({
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion || '',
      imagen: null
    });
    setPreviewImage(producto.imagen);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm(prev => ({ ...prev, imagen: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      setUpdating(prev => ({ ...prev, [editingProduct.id]: true }));
      
      // 1. Update details
      const updateData = {
        nombre: editForm.nombre,
        precio: editForm.precio,
        descripcion: editForm.descripcion
      };
      
      await productosService.actualizarProducto(editingProduct.id, updateData);

      // 2. Update image if changed
      if (editForm.imagen) {
        const formData = new FormData();
        formData.append('imagen', editForm.imagen);
        await productosService.subirImagenProducto(editingProduct.id, formData);
      }

      setMensaje('Producto actualizado correctamente');
      setEditingProduct(null);
      await cargarProductos();
      setTimeout(() => setMensaje(''), 3000);
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Error al actualizar el producto');
      setTimeout(() => setError(''), 5000);
    } finally {
      setUpdating(prev => ({ ...prev, [editingProduct.id]: false }));
    }
  };

  if (loading && productos.length === 0) return <div className="panel-proveedor"><p>Cargando...</p></div>;

  return (
    <div className="panel-proveedor">
      <DashboardHeader title="📦 Panel de Proveedor" />

      {error && <div className="alert alert-error">{error}</div>}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      {productos.length > 0 ? (
        <>
          <div className="resumen-inventario">
            <div className="stat-card">
              <h3>{productos.length}</h3>
              <p>Productos</p>
            </div>
            <div className="stat-card">
              <h3>{productos.reduce((sum, p) => sum + p.stock, 0)}</h3>
              <p>Unidades en Stock</p>
            </div>
            <div className="stat-card">
              <h3>${calcularValorTotal().toFixed(2)}</h3>
              <p>Valor Inventario</p>
            </div>
          </div>

          <div className="resumen-categorias" style={{marginBottom: '24px'}}>
            <div className="categoria-card basicos">
                <h4>🔹 Productos Básicos</h4>
                <div className="stat-item">
                <span className="label">Productos:</span>
                <span className="valor">{productos.filter(p => p.es_basico).length}</span>
                </div>
                <div className="stat-item">
                <span className="label">Stock:</span>
                <span className="valor">{productos.filter(p => p.es_basico).reduce((s, p) => s + p.stock, 0)}</span>
                </div>
            </div>
            <div className="categoria-card no-basicos">
                <h4>✨ Productos No Básicos</h4>
                <div className="stat-item">
                <span className="label">Productos:</span>
                <span className="valor">{productos.filter(p => !p.es_basico).length}</span>
                </div>
                <div className="stat-item">
                <span className="label">Stock:</span>
                <span className="valor">{productos.filter(p => !p.es_basico).reduce((s, p) => s + p.stock, 0)}</span>
                </div>
            </div>
          </div>

          <div className="productos-grid">
            {productos.map(p => (
              <div key={p.id} className="producto-item">
                <div className="producto-header">
                  <h3>{p.nombre}</h3>
                  <span className="precio">${p.precio}</span>
                </div>
                
                {p.imagen && (
                    <img 
                        src={p.imagen.startsWith('http') ? p.imagen : `http://localhost:8000${p.imagen}`} 
                        alt={p.nombre} 
                        style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginTop: '10px'}}
                    />
                )}

                <p className="descripcion">{p.descripcion}</p>

                <div className="stock-info">
                  <p>Stock: <strong>{p.stock}</strong></p>
                  <div className="stock-bar">
                    <div className="stock-filled" style={{ width: `${Math.min((p.stock / 100) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div className="control-stock">
                  <div className="cantidad-quick">
                     <button className="quick-btn" onClick={() => handleCantidadChange(p.id, (cantidades[p.id] || 0) + 1)}>+1</button>
                     <button className="quick-btn" onClick={() => handleCantidadChange(p.id, Math.max(0, (cantidades[p.id] || 0) - 1))}>-1</button>
                     <input
                       type="number"
                       min="0"
                       value={cantidades[p.id] || ''}
                       onChange={e => handleCantidadChange(p.id, e.target.value)}
                       placeholder="Cant"
                       className="input-cantidad"
                     />
                  </div>
                  <div className="accion-buttons">
                    <button onClick={() => ajustarStock(p.id, 'aumentar')} className="btn btn-aumentar" disabled={updating[p.id]}>+</button>
                    <button onClick={() => ajustarStock(p.id, 'reducir')} className="btn btn-reducir" disabled={updating[p.id] || p.stock === 0}>-</button>
                  </div>
                </div>
                
                <button onClick={() => handleEditClick(p)} className="btn btn-edit">
                    ✏️ Editar Detalles
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="sin-productos">
          <p>No tienes productos asignados</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="modal-overlay" onClick={() => setEditingProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Editar Producto</h2>
            <form onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={editForm.nombre}
                  onChange={handleEditChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={editForm.precio}
                  onChange={handleEditChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={editForm.descripcion}
                  onChange={handleEditChange}
                  className="form-textarea"
                />
              </div>
              <div className="form-group">
                <label>Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-input"
                />
                {previewImage && (
                    <img 
                        src={previewImage.startsWith('http') || previewImage.startsWith('blob') ? previewImage : `http://localhost:8000${previewImage}`} 
                        alt="Preview" 
                        className="image-preview" 
                    />
                )}
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setEditingProduct(null)} className="btn btn-cancel">Cancelar</button>
                <button type="submit" className="btn btn-save" disabled={updating[editingProduct.id]}>
                    {updating[editingProduct.id] ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PanelProveedor;
