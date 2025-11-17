from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    register_user,
    login_user,
    api_root,
    dashboard_admin,
    tienda_cliente,
    UsuarioViewSet,
)

# Crear el router
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = [
    path('', api_root, name='api-root'),

    # Autenticación
    path('auth/register/', register_user, name='register'),
    path('auth/login/', login_user, name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Rutas según rol
    path('dashboard/admin/', dashboard_admin, name='dashboard-admin'),
    path('cliente/tienda/', tienda_cliente, name='tienda-cliente'),

    # Incluir rutas del router
    path('', include(router.urls)),
]
