"""
Script para agregar paginación a Tiendas, Productos y Pedidos
"""

# Leer archivo
with open('frontend/src/pages/DashboardAdmin.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Agregar paginación a TIENDAS (después de grid-cards, línea ~991)
tiendas_pagination = '''            </div>

            {/* PAGINACIÓN */}
            <Pagination
              currentPage={paginaTiendas}
              totalPages={totalPaginasTiendas}
              onPageChange={setPaginaTiendas}
              itemsPerPage={ITEMS_POR_PAGINA}
              totalItems={tiendas.length}
              currentItems={tiendasPaginadas.length}
            />
          </div>
        )}

        {/* TAB PRODUCTOS */}'''

content = content.replace(
    '''            </div>
          </div>
        )}

        {/* TAB PRODUCTOS */}''',
    tiendas_pagination
)

# 2. Buscar y agregar paginación a PEDIDOS (después de tabla, línea ~1222)
pedidos_pagination = '''            </div>

            {/* PAGINACIÓN */}
            <Pagination
              currentPage={paginaPedidos}
              totalPages={totalPaginasPedidos}
              onPageChange={setPaginaPedidos}
              itemsPerPage={ITEMS_POR_PAGINA}
              totalItems={pedidosFiltrados.length}
              currentItems={pedidosPaginados.length}
            />
          </div>
        )}
      </div>'''

content = content.replace(
    '''            </div>
          </div>
        )}
      </div>

      {/* MODAL DE EDICIÓN */}''',
    pedidos_pagination + '\n\n      {/* MODAL DE EDICIÓN */}'
)

# Guardar
with open('frontend/src/pages/DashboardAdmin.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Paginación agregada a Tiendas")
print("✅ Paginación agregada a Pedidos")
print("✅ Archivo actualizado correctamente")
print("\nNOTA: Productos parece no tener tabla renderizada en este archivo")
