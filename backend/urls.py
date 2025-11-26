from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render

def api_root(request):
    return render(request, 'index.html')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', api_root, name='api-root'),
    
    # Auth routes (login, register, etc.)
    path('api/auth/', include('apps.usuarios.urls_auth')),
    
    # User resource routes (api/usuarios/)
    path('api/', include('apps.usuarios.urls')),
    
    # Product routes (api/productos/tiendas/, api/productos/productos/, etc.)
    path('api/productos/', include('apps.productos.urls')),
    
    # Sales routes
    path('api/ventas/', include('apps.ventas.urls')),
    
    # Payment routes (api/pagos/metodos-pago/)
    path('api/pagos/', include('apps.pagos.urls')),
    
    # Notification routes (api/notificaciones/)
    path('api/', include('apps.notificaciones.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
