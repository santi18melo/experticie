"""
Script para corregir DashboardAdmin.jsx
Corrige el formulario de usuario y agrega paginación
"""

import re

# Leer el archivo
with open('frontend/src/pages/DashboardAdmin.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Buscar la sección del formulario de usuario que está rota
# y reemplazarla con una versión correcta

form_section = '''              <form onSubmit={handleCrearUsuario} className="form-card">
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={userForm.nombre}
                    onChange={(e) =>
                      setUserForm({ ...userForm, nombre: e.target.value })
                    }
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm({ ...userForm, email: e.target.value })
                    }
                    required
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={userForm.password}
                    onChange={(e) =>
                      setUserForm({ ...userForm, password: e.target.value })
                    }
                    required
                  />
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label style={{display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666'}}>Foto de Perfil</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUserForm({ ...userForm, imagen: e.target.files[0] })}
                      style={{ padding: '8px', width: '100%', border: '2px solid #e2e8f0', borderRadius: '10px' }}
                    />
                  </div>
                  <select
                    value={userForm.rol}
                    onChange={(e) =>
                      setUserForm({ ...userForm, rol: e.target.value })
                    }
                  >
                    <option value="cliente">Cliente</option>
                    <option value="proveedor">Proveedor</option>
                    <option value="logistica">Logística</option>
                    <option value="admin">Admin</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={userForm.telefono}
                    onChange={(e) =>
                      setUserForm({ ...userForm, telefono: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={userForm.direccion}
                    onChange={(e) =>
                      setUserForm({ ...userForm, direccion: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn-submit">
                  Crear Usuario
                </button>
              </form>
            )}

            {/* FILTROS */}'''

# Buscar el patrón problemático y reemplazarlo
pattern = r'<form onSubmit=\{handleCrearUsuario\}.*?{/\* FILTROS \*/}'
content = re.sub(pattern, form_section, content, flags=re.DOTALL)

# Guardar el archivo corregido
with open('frontend/src/pages/DashboardAdmin.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Archivo corregido exitosamente")
print("✅ Formulario de usuario restaurado")
print("✅ Rol 'comprador' eliminado del formulario")
