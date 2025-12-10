from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.views_usuario import UsuarioViewSet

# -------------------------------
# ROUTER
# -------------------------------
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

# -------------------------------
# URLS
# -------------------------------
urlpatterns = [
    path('', include(router.urls)),  # ViewSet routes
    path('admin/', include('apps.usuarios.urls_admin')),
]
