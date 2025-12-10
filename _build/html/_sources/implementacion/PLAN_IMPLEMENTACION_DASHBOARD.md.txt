# 🎯 PLAN DE IMPLEMENTACIÓN COMPLETO - Dashboard Admin

## ✅ Funcionalidades a Implementar

### 1. **Paginación** (50 elementos por página)
- ✅ Usuarios
- ⏳ Tiendas
- ⏳ Productos  
- ⏳ Pedidos

### 2. **Filtros**
- ✅ Usuarios: Por rol y estado
- ⏳ Tiendas: Por estado (activa/inactiva)
- ⏳ Productos: Por tienda
- ⏳ Pedidos: Por estado

### 3. **CRUD Completo**
- **Usuarios**:
  - ✅ Create
  - ✅ Read
  - ⏳ Update (NUEVO)
  - ✅ Delete
  
- **Tiendas**:
  - ✅ Create
  - ✅ Read
  - ⏳ Update (NUEVO)
  - ✅ Delete
  
- **Productos**:
  - ✅ Create
  - ✅ Read
  - ⏳ Update (NUEVO)
  - ✅ Delete
  
- **Pedidos**:
  - ✅ Read
  - ⏳ Update Estado (cambiar_estado)
  - ✅ Delete (solo admin)

---

## 🔧 Backend - Estado Actual

### Permisos Verificados:

**Usuarios** (`UsuarioViewSet`):
```python
permission_classes = [IsAuthenticated]
# UPDATE disponible automáticamente (ModelViewSet)
```

**Tiendas** (`TiendaViewSet`):
```python
# list, retrieve: IsAuthenticated
# create, update, delete: IsAdmin
```

**Productos** (`ProductoViewSet`):
```python
# list, retrieve: IsAuthenticated
# create, update, delete: IsAdmin o IsProductoOwnerOrAdmin
```

**Pedidos** (`PedidoViewSet`):
```python
# list, retrieve: IsAuthenticated
# destroy: IsAdmin ✅
# cambiar_estado: IsAdmin | IsComprador | IsLogistica
```

---

## 🎨 Frontend - Componentes a Agregar

### 1. **Modal de Edición**
Componente reutilizable para editar usuarios, tiendas y productos:

```jsx
const [modalEdicion, setModalEdicion] = useState({
  visible: false,
  tipo: '', // 'usuario', 'tienda', 'producto'
  datos: null
});
```

### 2. **Botones de Edición**
En cada tabla, agregar botón "✏️ Editar" junto al botón de eliminar.

### 3. **Controles de Paginación**
Para Tiendas, Productos y Pedidos (mismo patrón que Usuarios).

### 4. **Filtros**
Para Tiendas, Productos y Pedidos.

---

## 📋 Estructura del Modal de Edición

```jsx
{modalEdicion.visible && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>Editar {modalEdicion.tipo}</h3>
      
      {modalEdicion.tipo === 'usuario' && (
        <form onSubmit={handleActualizarUsuario}>
          {/* Campos del usuario */}
        </form>
      )}
      
      {modalEdicion.tipo === 'tienda' && (
        <form onSubmit={handleActualizarTienda}>
          {/* Campos de la tienda */}
        </form>
      )}
      
      {modalEdicion.tipo === 'producto' && (
        <form onSubmit={handleActualizarProducto}>
          {/* Campos del producto */}
        </form>
      )}
      
      <button onClick={() => setModalEdicion({ visible: false })}>
        Cancelar
      </button>
    </div>
  </div>
)}
```

---

## 🔄 Funciones de Actualización

### Usuario
```javascript
const handleActualizarUsuario = async (e) => {
  e.preventDefault();
  try {
    await axiosInstance.patch(`/usuarios/${modalEdicion.datos.id}/`, {
      nombre: editForm.nombre,
      email: editForm.email,
      rol: editForm.rol,
      telefono: editForm.telefono,
      direccion: editForm.direccion,
      estado: editForm.estado
      // password solo si se proporciona
    });
    setSuccess("✓ Usuario actualizado");
    await cargarUsuarios();
    setModalEdicion({ visible: false });
  } catch (err) {
    setError("Error al actualizar usuario");
  }
};
```

### Tienda
```javascript
const handleActualizarTienda = async (e) => {
  e.preventDefault();
  try {
    await axiosInstance.patch(`/productos/tiendas/${modalEdicion.datos.id}/`, {
      nombre: editForm.nombre,
      direccion: editForm.direccion,
      telefono: editForm.telefono,
      activa: editForm.activa
    });
    setSuccess("✓ Tienda actualizada");
    await cargarTiendas();
    setModalEdicion({ visible: false });
  } catch (err) {
    setError("Error al actualizar tienda");
  }
};
```

### Producto
```javascript
const handleActualizarProducto = async (e) => {
  e.preventDefault();
  try {
    await axiosInstance.patch(`/productos/productos/${modalEdicion.datos.id}/`, {
      nombre: editForm.nombre,
      descripcion: editForm.descripcion,
      precio: editForm.precio,
      stock: editForm.stock,
      tienda: editForm.tienda,
      proveedor: editForm.proveedor,
      es_basico: editForm.es_basico,
      categoria: editForm.categoria,
      activo: editForm.activo
    });
    setSuccess("✓ Producto actualizado");
    await cargarProductos();
    setModalEdicion({ visible: false });
  } catch (err) {
    setError("Error al actualizar producto");
  }
};
```

### Pedido (Cambiar Estado)
```javascript
const handleCambiarEstadoPedido = async (pedidoId, nuevoEstado) => {
  try {
    await axiosInstance.post(`/productos/pedidos/${pedidoId}/cambiar_estado/`, {
      estado: nuevoEstado
    });
    setSuccess("✓ Estado del pedido actualizado");
    await cargarPedidos();
  } catch (err) {
    setError("Error al cambiar estado del pedido");
  }
};
```

---

## 🎯 Orden de Implementación

1. ✅ **Paginación para Tiendas** (copiar patrón de Usuarios)
2. ✅ **Paginación para Productos** (copiar patrón de Usuarios)
3. ✅ **Paginación para Pedidos** (copiar patrón de Usuarios)
4. ✅ **Modal de Edición** (componente reutilizable)
5. ✅ **Función handleActualizarUsuario**
6. ✅ **Función handleActualizarTienda**
7. ✅ **Función handleActualizarProducto**
8. ✅ **Botones de edición** en todas las tablas
9. ✅ **Selector de estado** para pedidos (admin)
10. ✅ **Botón eliminar pedido** (solo admin)

---

## 📝 Notas Importantes

- **Password en usuarios**: Solo actualizar si se proporciona un nuevo password
- **Permisos**: Verificar que solo admin pueda editar/eliminar
- **Validación**: Mantener las mismas validaciones que en creación
- **UX**: Mostrar mensajes claros de éxito/error
- **Paginación**: Mantener la página actual después de editar

---

**Estado**: 🚧 En Desarrollo  
**Prioridad**: Alta  
**Fecha**: 26 de Noviembre de 2025
