from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.usuarios.urls')),
    path('api/', include('apps.productos.urls')),
    path('api/', include('apps.ventas.urls')),
    path('api/', include('apps.pagos.urls')),
    path('api/', include('apps.notificaciones.urls')),
]
