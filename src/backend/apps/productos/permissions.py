from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """
    Permite acceso solo a usuarios autenticados con rol 'admin'
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return request.user.is_superuser or getattr(request.user, 'rol', None) == 'admin'


class IsCliente(BasePermission):
    """
    Permite acceso solo a usuarios autenticados con rol 'cliente'
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return getattr(request.user, 'rol', None) == 'cliente'


class IsProveedor(BasePermission):
    """
    Permite acceso solo a usuarios autenticados con rol 'proveedor'
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return getattr(request.user, 'rol', None) == 'proveedor'


class IsComprador(BasePermission):
    """
    Permite acceso solo a usuarios autenticados con rol 'comprador'
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return getattr(request.user, 'rol', None) == 'comprador'


class IsLogistica(BasePermission):
    """
    Permite acceso solo a usuarios autenticados con rol 'logística'
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return getattr(request.user, 'rol', None) == 'logistica'


class IsAdminOrReadOnly(BasePermission):
    """
    Permite que admins editen, otros solo lectura
    """
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return request.user and request.user.is_authenticated
        if not request.user or not request.user.is_authenticated:
            return False
        return request.user.is_superuser or getattr(request.user, 'rol', None) == 'admin'


class IsProductoOwnerOrAdmin(BasePermission):
    """
    Permite que el proveedor del producto o admin edite el producto
    """
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        # Admin tiene acceso total
        if request.user.is_superuser or getattr(request.user, 'rol', None) == 'admin':
            return True
        # Proveedor solo puede editar sus propios productos
        if getattr(request.user, 'rol', None) == 'proveedor':
            return obj.proveedor == request.user
        return False


class IsPedidoOwnerOrAdmin(BasePermission):
    """
    Permite que el cliente del pedido o admin acceda al pedido
    """
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        # Admin tiene acceso total
        if request.user.is_superuser or getattr(request.user, 'rol', None) == 'admin':
            return True
        # Cliente solo puede ver sus propios pedidos
        if getattr(request.user, 'rol', None) == 'cliente':
            return obj.cliente == request.user
        return False
