"""
Script para agregar componentes de Paginación a DashboardAdmin.jsx
"""

import re

# Leer el archivo
with open('frontend/src/pages/DashboardAdmin.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Componente de paginación para usuarios
pagination_usuarios = '''              </table>
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
        )}'''

# Buscar el cierre de la tabla de usuarios y agregar paginación
pattern_usuarios = r'(</table>\s*</div>\s*</div>\s*\}\s*)\s*{/\* TAB TIENDAS \*/}'
replacement_usuarios = pagination_usuarios + '\n\n        {/* TAB TIENDAS */}'
content = re.sub(pattern_usuarios, replacement_usuarios, content)

# Eliminar opción "comprador" de los filtros
content = content.replace('<option value="comprador">Comprador</option>', '')

# Guardar
with open('frontend/src/pages/DashboardAdmin.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Paginación agregada a tabla de usuarios")
print("✅ Opción 'comprador' eliminada de filtros")
print("✅ Archivo actualizado correctamente")
