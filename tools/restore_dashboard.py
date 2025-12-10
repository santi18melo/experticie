"""
Script de emergencia para restaurar DashboardAdmin.jsx
El archivo se cortó y necesita ser restaurado
"""

# Este es el contenido que falta después de la línea 907
missing_content = '''
            {/* FILTROS */}
            <div className="filters-container" style={{ marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <div className="filter-group">
                <label style={{ marginRight: '8px', fontWeight: '600' }}>Rol:</label>
                <select 
                  value={filtroRol} 
                  onChange={(e) => { setFiltroRol(e.target.value); setPaginaUsuarios(1); }}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd' }}
                >
                  <option value="todos">Todos</option>
                  <option value="admin">Admin</option>
                  <option value="proveedor">Proveedor</option>
                  <option value="cliente">Cliente</option>
                  <option value="logistica">Logística</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label style={{ marginRight: '8px', fontWeight: '600' }}>Estado:</label>
                <select 
                  value={filtroEstadoUsuario} 
                  onChange={(e) => { setFiltroEstadoUsuario(e.target.value); setPaginaUsuarios(1); }}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd' }}
                >
                  <option value="todos">Todos</option>
                  <option value="activo">Activos</option>
                  <option value="inactivo">Inactivos</option>
                </select>
              </div>

              <div style={{ marginLeft: 'auto', color: '#666', fontWeight: '500' }}>
                Mostrando {usuariosPaginados.length} de {usuariosFiltrados.length} usuarios
              </div>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosPaginados.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>
                        {usuario.imagen ? (
                          <img 
                            src={usuario.imagen} 
                            alt={usuario.nombre} 
                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                          />
                        ) : (
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                            👤
                          </div>
                        )}
                      </td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td>
                        <span className={`badge badge-${usuario.rol}`}>
                          {usuario.rol}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status ${
                            usuario.estado ? "active" : "inactive"
                          }`}
                        >
                          {usuario.estado ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-edit-small"
                          onClick={() => setModalEdicion({
                            visible: true,
                            tipo: 'Usuario',
                            datos: usuario
                          })}
                          style={{ marginRight: '8px' }}
                        >
                          ✏️
                        </button>
                        <button
                          className={usuario.estado ? "btn-warning-small" : "btn-success-small"}
                          onClick={() => handleToggleEstadoUsuario(usuario)}
                          style={{ marginRight: '8px' }}
                          title={usuario.estado ? "Desactivar usuario" : "Activar usuario"}
                        >
                          {usuario.estado ? '🔒' : '🔓'}
                        </button>
                        <button
                          className="btn-delete-small"
                          onClick={() => handleEliminarUsuario(usuario.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINACIÓN */}
            <Pagination
              currentPage={paginaUsuarios}
              totalPages={totalPaginasUsuarios}
              onPageChange={setPaginaUsuarios}
              itemsPerPage={ITEMS_POR_PAGINA}
              totalItems={usuariosFiltrados.length}
              currentItems={usuariosPaginados.length}
            />
          </div>
        )}

        {/* Resto del contenido... */}
      </div>

      {/* MODAL DE EDICIÓN */}
      <ModalEdicion
        visible={modalEdicion.visible}
        tipo={modalEdicion.tipo}
        datos={modalEdicion.datos}
        onClose={() => setModalEdicion({ visible: false, tipo: '', datos: null })}
        onSave={handleGuardarEdicion}
      />
    </div>
  );
}
'''

# Leer el archivo actual
with open('frontend/src/pages/DashboardAdmin.jsx', 'r', encoding='utf-8') as f:
    current_content = f.read()

# Si el archivo termina en la línea 907, agregar el contenido faltante
if ')}\n\n\n' in current_content[-20:]:
    # Eliminar las líneas vacías finales
    current_content = current_content.rstrip()
    # Agregar el contenido faltante
    full_content = current_content + missing_content
    
    # Guardar
    with open('frontend/src/pages/DashboardAdmin.jsx', 'w', encoding='utf-8') as f:
        f.write(full_content)
    
    print("✅ Archivo restaurado exitosamente")
    print(f"✅ Contenido faltante agregado")
else:
    print("⚠️ El archivo parece estar completo o tiene un formato diferente")
    print(f"Últimos 50 caracteres: {current_content[-50:]}")
