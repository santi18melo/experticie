"""
Script de corrección final para DashboardAdmin.jsx
Corrige completamente el formulario de usuario
"""

# Leer archivo
with open('frontend/src/pages/DashboardAdmin.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Encontrar la línea problemática (alrededor de 860)
# y reconstruir el formulario correctamente

corrected_lines = []
skip_until_filtros = False
form_fixed = False

for i, line in enumerate(lines):
    line_num = i + 1
    
    # Si encontramos la línea rota del password
    if 'value={userForm.password}' in line and not form_fixed:
        # Agregar el cierre correcto del input de password
        corrected_lines.append('                    value={userForm.password}\n')
        corrected_lines.append('                    onChange={(e) =>\n')
        corrected_lines.append('                      setUserForm({ ...userForm, password: e.target.value })\n')
        corrected_lines.append('                    }\n')
        corrected_lines.append('                    required\n')
        corrected_lines.append('                  />\n')
        corrected_lines.append('                  <div className="form-group" style={{ gridColumn: \'1 / -1\' }}>\n')
        corrected_lines.append('                    <label style={{display: \'block\', marginBottom: \'5px\', fontSize: \'14px\', color: \'#666\'}}>Foto de Perfil</label>\n')
        corrected_lines.append('                    <input\n')
        corrected_lines.append('                      type="file"\n')
        corrected_lines.append('                      accept="image/*"\n')
        corrected_lines.append('                      onChange={(e) => setUserForm({ ...userForm, imagen: e.target.files[0] })}\n')
        corrected_lines.append('                      style={{ padding: \'8px\', width: \'100%\', border: \'2px solid #e2e8f0\', borderRadius: \'10px\' }}\n')
        corrected_lines.append('                    />\n')
        corrected_lines.append('                  </div>\n')
        corrected_lines.append('                  <select\n')
        corrected_lines.append('                    value={userForm.rol}\n')
        corrected_lines.append('                    onChange={(e) =>\n')
        corrected_lines.append('                      setUserForm({ ...userForm, rol: e.target.value })\n')
        corrected_lines.append('                    }\n')
        corrected_lines.append('                  >\n')
        corrected_lines.append('                    <option value="cliente">Cliente</option>\n')
        corrected_lines.append('                    <option value="proveedor">Proveedor</option>\n')
        corrected_lines.append('                    <option value="logistica">Logística</option>\n')
        corrected_lines.append('                    <option value="admin">Admin</option>\n')
        corrected_lines.append('                  </select>\n')
        corrected_lines.append('                  <input\n')
        corrected_lines.append('                    type="tel"\n')
        corrected_lines.append('                    placeholder="Teléfono"\n')
        corrected_lines.append('                    value={userForm.telefono}\n')
        corrected_lines.append('                    onChange={(e) =>\n')
        corrected_lines.append('                      setUserForm({ ...userForm, telefono: e.target.value })\n')
        corrected_lines.append('                    }\n')
        corrected_lines.append('                  />\n')
        corrected_lines.append('                  <input\n')
        corrected_lines.append('                    type="text"\n')
        corrected_lines.append('                    placeholder="Dirección"\n')
        corrected_lines.append('                    value={userForm.direccion}\n')
        corrected_lines.append('                    onChange={(e) =>\n')
        corrected_lines.append('                      setUserForm({ ...userForm, direccion: e.target.value })\n')
        corrected_lines.append('                    }\n')
        corrected_lines.append('                  />\n')
        corrected_lines.append('                </div>\n')
        corrected_lines.append('                <button type="submit" className="btn-submit">\n')
        corrected_lines.append('                  Crear Usuario\n')
        corrected_lines.append('                </button>\n')
        corrected_lines.append('              </form>\n')
        corrected_lines.append('            )}\n')
        corrected_lines.append('\n')
        skip_until_filtros = True
        form_fixed = True
        continue
    
    # Saltar líneas hasta encontrar FILTROS
    if skip_until_filtros:
        if '{/* FILTROS */}' in line:
            skip_until_filtros = False
            corrected_lines.append(line)
        continue
    
    corrected_lines.append(line)

# Guardar
with open('frontend/src/pages/DashboardAdmin.jsx', 'w', encoding='utf-8') as f:
    f.writelines(corrected_lines)

print("✅ Formulario corregido completamente")
print(f"✅ Total de líneas procesadas: {len(lines)}")
print(f"✅ Total de líneas corregidas: {len(corrected_lines)}")
