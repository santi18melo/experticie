// frontend/src/services/productosService.js
import api from './api';

/**
 * Servicio para gestión de tiendas, productos y pedidos
 */

// ==================== TIENDAS ====================

/**
 * Obtener todas las tiendas activas
 */
export const getTiendas = async () => {
  try {
    const response = await api.get('/productos/tiendas/');
    return response.data;
  } catch (error) {
    console.error('[productosService] Error getting tiendas:', error);
    throw error;
  }
};

/**
 * Obtener tiendas del administrador actual
 */
export const getMisTiendas = async () => {
  try {
    const response = await api.get('/productos/tiendas/mis_tiendas/');
    return response.data;
  } catch (error) {
    console.error('[productosService] Error getting mis tiendas:', error);
    throw error;
  }
};

/**
 * Crear una nueva tienda (solo admin)
 */
export const crearTienda = async (tiendaData) => {
  try {
    const response = await api.post('/productos/tiendas/', tiendaData);
    return response.data;
  } catch (error) {
    console.error('[productosService] Error creating tienda:', error);
    throw error;
  }
};

/**
 * Actualizar una tienda
 */
export const actualizarTienda = async (tiendaId, tiendaData) => {
  try {
    const response = await api.patch(`/productos/tiendas/${tiendaId}/`, tiendaData);
    return response.data;
  } catch (error) {
    console.error('[productosService] Error updating tienda:', error);
    throw error;
  }
};

/**
 * Eliminar una tienda
 */
export const eliminarTienda = async (tiendaId) => {
  try {
    const response = await api.delete(`/productos/tiendas/${tiendaId}/`);
    return response.data;
  } catch (error) {
    console.error('[productosService] Error deleting tienda:', error);
    throw error;
  }
};

// ==================== PRODUCTOS ====================

/**
 * Obtener todos los productos activos
 */
export const getProductos = async () => {
  try {
    const response = await api.get('/productos/productos/');
    return response.data;
  } catch (error) {
    console.error('[productosService] Error getting productos:', error);
    throw error;
  }
};

/**
 * Obtener productos por tienda
 */
export const getProductosPorTienda = async (tiendaId) => {
  try {
    const response = await api.get(`/productos/productos/por_tienda/?tienda_id=${tiendaId}`);
    return response.data;
  } catch (error) {
    console.error('[productosService] Error getting productos por tienda:', error);
    throw error;
  }
};

/**
 * Obtener un producto específico
 */
export const getProducto = async (productoId) => {
  try {
    const response = await api.get(`/productos/productos/${productoId}/`);
    return response.data;
  } catch (error) {
    console.error('[productosService] Error getting producto:', error);
    throw error;
  }
};

/**
 * Crear un nuevo producto (solo admin)
 */
export const crearProducto = async (productoData) => {
  try {
    const response = await api.post('/productos/productos/', productoData);
    return response.data;
  } catch (error) {
    console.error('[productosService] Error creating producto:', error);
    throw error;
  }
};

/**
 * Actualizar un producto
 */
export const actualizarProducto = async (productoId, productoData) => {
  try {
    const response = await api.patch(`/productos/productos/${productoId}/`, productoData);
    return response.data;
  } catch (error) {
    console.error('[productosService] Error updating producto:', error);
    throw error;
  }
};

/**
 * Eliminar un producto
 */
export const eliminarProducto = async (productoId) => {
  try {
    const response = await api.delete(`/productos/productos/${productoId}/`);
    return response.data;
  } catch (error) {
    console.error('[productosService] Error deleting producto:', error);
    throw error;
  }
};

// ==================== PEDIDOS ====================

/**
 * Obtener mis pedidos (cliente)
 */
export const getMisPedidos = async () => {
  try {
    const response = await api.get('/productos/pedidos/mis_pedidos/');
    return response.data;
  } catch (error) {
    console.error('[productosService] Error getting mis pedidos:', error);
    throw error;
  }
};

/**
 * Obtener todos los pedidos (admin)
 */
export const getPedidos = async () => {
  try {
    const response = await api.get('/productos/pedidos/');
    return response.data;
  } catch (error) {
    console.error('[productosService] Error getting pedidos:', error);
    throw error;
  }
};

/**
 * Obtener un pedido específico
 */
export const getPedido = async (pedidoId) => {
  try {
    const response = await api.get(`/productos/pedidos/${pedidoId}/`);
    return response.data;
  } catch (error) {
    console.error('[productosService] Error getting pedido:', error);
    throw error;
  }
};

/**
 * Crear un nuevo pedido
 * @param {Object} pedidoData - Datos del pedido
 * @param {number} pedidoData.tienda_id - ID de la tienda
 * @param {Array} pedidoData.detalles - Array de {producto: id, cantidad: number}
 * @param {string} pedidoData.metodo_pago - Método de pago
 * @param {number} pedidoData.monto_pago - Monto total del pago
 * @param {string} pedidoData.notas - Notas adicionales (opcional)
 */
export const crearPedido = async (pedidoData) => {
  try {
    const response = await api.post('/productos/pedidos/crear_pedido/', pedidoData);
    return response.data;
  } catch (error) {
    console.error('[productosService] Error creating pedido:', error);
    throw error;
  }
};

/**
 * Cambiar estado de un pedido
 */
export const cambiarEstadoPedido = async (pedidoId, nuevoEstado) => {
  try {
    const response = await api.post(`/productos/pedidos/${pedidoId}/cambiar_estado/`, {
      estado: nuevoEstado
    });
    return response.data;
  } catch (error) {
    console.error('[productosService] Error changing pedido estado:', error);
    throw error;
  }
};

/**
 * Obtener pedidos pendientes (comprador)
 */
export const getPedidosPendientes = async () => {
  try {
    const response = await api.get('/productos/pedidos/pendientes/');
    return response.data;
  } catch (error) {
    console.error('[productosService] Error getting pedidos pendientes:', error);
    throw error;
  }
};

/**
 * Obtener pedidos en preparación (logística)
 */
export const getPedidosEnPreparacion = async () => {
  try {
    const response = await api.get('/productos/pedidos/en_preparacion/');
    return response.data;
  } catch (error) {
    console.error('[productosService] Error getting pedidos en preparación:', error);
    throw error;
  }
};

// ==================== MÉTODOS DE PAGO ====================

/**
 * Obtener métodos de pago disponibles
 */
export const getMetodosPago = async () => {
  try {
    const response = await api.get('/pagos/metodos-pago/');
    return response.data;
  } catch (error) {
    console.error('[productosService] Error getting métodos de pago:', error);
    throw error;
  }
};

export default {
  // Tiendas
  getTiendas,
  getMisTiendas,
  crearTienda,
  actualizarTienda,
  eliminarTienda,
  
  // Productos
  getProductos,
  getProductosPorTienda,
  getProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  
  // Pedidos
  getMisPedidos,
  getPedidos,
  getPedido,
  crearPedido,
  cambiarEstadoPedido,
  getPedidosPendientes,
  getPedidosEnPreparacion,
  
  // Pagos
  getMetodosPago,
};
