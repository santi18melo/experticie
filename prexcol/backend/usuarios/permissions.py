from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """
    Permite acceso solo a usuarios autenticados con rol 'admin' o is_superuser=True
    """

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        # Permitir si es superuser o tiene rol admin
        return (
            request.user.is_superuser or getattr(request.user, "rol", None) == "admin"
        )

    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        return (
            request.user.is_superuser or getattr(request.user, "rol", None) == "admin"
        )
