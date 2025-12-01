from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TiendaViewSet,
    ProductoViewSet,
    PedidoViewSet,
    DetallePedidoViewSet,
    ProductoSubirImagenView,
    SeccionViewSet,  # <-- Nuevo
)

# Crear el router para registrar los viewsets
router = DefaultRouter()
router.register(r"tiendas", TiendaViewSet, basename="tienda")
router.register(r"productos", ProductoViewSet, basename="producto")
router.register(r"pedidos", PedidoViewSet, basename="pedido")
router.register(r"detalles-pedido", DetallePedidoViewSet, basename="detalle-pedido")
router.register(r"secciones", SeccionViewSet, basename="seccion")  # <-- Nuevo

# Definir URLs
urlpatterns = [
    # Todas las rutas del router
    path("", include(router.urls)),
    # Ruta adicional para subir imagen de producto
    path(
        "productos/<int:pk>/subir-imagen/",
        ProductoSubirImagenView.as_view(),
        name="producto_subir_imagen",
    ),
]


# ======================== RESUMEN DE ENDPOINTS ========================
#
# TIENDAS:
# -------
# GET    /api/tiendas/                    - Listar tiendas activas
# POST   /api/tiendas/                    - Crear tienda (solo admin)
# GET    /api/tiendas/{id}/               - Detalle de tienda
# PUT    /api/tiendas/{id}/               - Actualizar tienda (solo admin)
# DELETE /api/tiendas/{id}/               - Eliminar tienda (solo admin)
# GET    /api/tiendas/mis_tiendas/        - Tiendas del usuario actual
#
# PRODUCTOS:
# ----------
# GET    /api/productos/                  - Listar productos (filtrado por rol)
# POST   /api/productos/                  - Crear producto (solo admin)
# GET    /api/productos/{id}/             - Detalle de producto
# PUT    /api/productos/{id}/             - Actualizar producto (admin o proveedor)
# DELETE /api/productos/{id}/             - Eliminar producto (solo admin)
# GET    /api/productos/por_tienda/?tienda_id=<id>  - Productos por tienda
# GET    /api/productos/mis_productos/    - Mis productos (proveedor)
# POST   /api/productos/{id}/ajustar_stock/ - Ajustar stock (admin o proveedor)
#        Body: {"cantidad": int, "operacion": "aumentar" | "reducir"}
#
# PEDIDOS:
# --------
# GET    /api/pedidos/                    - Listar pedidos (filtrado por rol)
# POST   /api/pedidos/crear_pedido/       - Crear pedido (cliente)
#        Body: {
#          "tienda_id": int,
#          "detalles": [{"producto": int, "cantidad": int}, ...],
#          "notas": "opcional"
#        }
# GET    /api/pedidos/{id}/               - Detalle de pedido
# DELETE /api/pedidos/{id}/               - Cancelar pedido (solo admin)
# POST   /api/pedidos/{id}/cambiar_estado/ - Cambiar estado (admin, comprador, logística)
#        Body: {"estado": "preparando" | "en_transito" | "entregado" | "cancelado"}
# GET    /api/pedidos/mis_pedidos/        - Mis pedidos (cliente)
# GET    /api/pedidos/pendientes/         - Pedidos pendientes (comprador)
# GET    /api/pedidos/en_preparacion/     - Pedidos en preparación (logística)
#
# DETALLES PEDIDO:
# ----------------
# GET    /api/detalles-pedido/            - Listar detalles (filtrado por rol)
# GET    /api/detalles-pedido/{id}/       - Detalle específico
# GET    /api/detalles-pedido/por_pedido/?pedido_id=<id> - Detalles de un pedido
#
# SECCIONES:
# ----------
# GET    /api/secciones/                  - Listar secciones
# POST   /api/secciones/                  - Crear sección (solo admin)
# POST   /api/secciones/{id}/agregar_productos/ - Agregar productos a sección
