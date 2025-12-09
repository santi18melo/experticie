// frontend/src/components/ModalEdicion.jsx
import React from 'react';
import '../styles/ModalEdicion.css';

export default function ModalEdicion({ 
  visible, 
  tipo, 
  datos, 
  onClose, 
  onSubmit,
  usuarios = [],
  tiendas = [],
  secciones = []
}) {
  const [formData, setFormData] = React.useState({});

  React.useEffect(() => {
    if (datos) {
      const initialData = { ...datos };
      
      // Si es un producto, inicializar las secciones
      if (tipo === 'Producto' && datos.id) {
        // Encontrar qué secciones contienen este producto
        const seccionesDelProducto = secciones
          .filter(s => s.productos && s.productos.includes(datos.id))
          .map(s => s.id);
        initialData.secciones = seccionesDelProducto;
      }
      
      setFormData(initialData);
    }
  }, [datos, tipo, secciones]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>✏️ Editar {tipo}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* FORMULARIO USUARIO */}
          {tipo === 'Usuario' && (
            <>
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Foto de Perfil</label>
                {formData.imagen && typeof formData.imagen === 'string' && (
                  <div style={{ marginBottom: '10px' }}>
                    <img src={formData.imagen} alt="Actual" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }} />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  name="imagen"
                  onChange={(e) => setFormData(prev => ({ ...prev, imagen: e.target.files[0] }))}
                  style={{ padding: '8px', width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nueva Contraseña (dejar vacío para no cambiar)</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Nueva contraseña (opcional)"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Rol *</label>
                <select
                  name="rol"
                  value={formData.rol || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="cliente">Cliente</option>
                  <option value="comprador">Comprador</option>
                  <option value="proveedor">Proveedor</option>
                  <option value="logistica">Logística</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="estado"
                    checked={formData.estado || false}
                    onChange={handleChange}
                  />
                  Usuario Activo
                </label>
              </div>
            </>
          )}

          {/* FORMULARIO TIENDA */}
          {tipo === 'Tienda' && (
            <>
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Dirección *</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="activa"
                    checked={formData.activa !== undefined ? formData.activa : true}
                    onChange={handleChange}
                  />
                  Tienda Activa
                </label>
              </div>
            </>
          )}

          {/* FORMULARIO PRODUCTO */}
          {tipo === 'Producto' && (
            <>
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción *</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion || ''}
                  onChange={handleChange}
                  required
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Precio *</label>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio || ''}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock || ''}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tienda *</label>
                <select
                  name="tienda"
                  value={formData.tienda || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar tienda</option>
                  {tiendas.map(t => (
                    <option key={t.id} value={t.id}>{t.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Proveedor *</label>
                <select
                  name="proveedor"
                  value={formData.proveedor || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar proveedor</option>
                  {usuarios.filter(u => u.rol === 'proveedor').map(u => (
                    <option key={u.id} value={u.id}>{u.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Categoría</label>
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria || 'general'}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="es_basico"
                    checked={formData.es_basico !== undefined ? formData.es_basico : true}
                    onChange={handleChange}
                  />
                  Producto Básico
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="activo"
                    checked={formData.activo !== undefined ? formData.activo : true}
                    onChange={handleChange}
                  />
                  Producto Activo
                </label>
              </div>

              <div className="form-group">
                <label>Secciones</label>
                <div style={{ 
                  maxHeight: '150px', 
                  overflowY: 'auto', 
                  border: '1px solid #e2e8f0', 
                  padding: '10px', 
                  borderRadius: '8px',
                  background: '#f8fafc'
                }}>
                  {secciones.map(s => {
                    const isChecked = formData.secciones?.includes(s.id) || false;
                    return (
                      <div key={s.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <input 
                          type="checkbox" 
                          id={`modal-sec-${s.id}`}
                          checked={isChecked}
                          onChange={(e) => {
                            const currentSecciones = formData.secciones || [];
                            const newSecciones = e.target.checked
                              ? [...currentSecciones, s.id]
                              : currentSecciones.filter(id => id !== s.id);
                            setFormData(prev => ({ ...prev, secciones: newSecciones }));
                          }}
                          style={{ marginRight: '8px', cursor: 'pointer' }}
                        />
                        <label htmlFor={`modal-sec-${s.id}`} style={{ cursor: 'pointer', margin: 0 }}>
                          {s.nombre}
                        </label>
                      </div>
                    );
                  })}
                  {secciones.length === 0 && (
                    <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
                      No hay secciones disponibles
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* FORMULARIO PEDIDO */}
          {tipo === 'Pedido' && (
            <>
              <div className="form-group">
                <label>ID Pedido</label>
                <input
                  type="text"
                  value={formData.id || ''}
                  disabled
                  style={{ background: '#f0f0f0' }}
                />
              </div>

              <div className="form-group">
                <label>Estado *</label>
                <select
                  name="estado"
                  value={formData.estado || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="preparando">Preparando</option>
                  <option value="en_transito">En Tránsito</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </>
          )}

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              💾 Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
