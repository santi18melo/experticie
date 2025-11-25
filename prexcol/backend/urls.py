from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('usuarios.urls')),
    path('api/', include('productos.urls')),
    path('api/', include('ventas.urls')),
    path('api/', include('pagos.urls')),  # Router already includes 'pagos'
    path('api/', include('notificaciones.urls')),  # Router already includes 'notificaciones'
]
