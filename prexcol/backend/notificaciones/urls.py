from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    NotificacionViewSet, 
    TipoNotificacionViewSet, 
    EstadoNotificacionViewSet
)

router = DefaultRouter()
router.register(r'notificaciones', NotificacionViewSet, basename='notificacion')
router.register(r'tipos-notificacion', TipoNotificacionViewSet, basename='tipo-notificacion')
router.register(r'estados-notificacion', EstadoNotificacionViewSet, basename='estado-notificacion')

urlpatterns = [
    path('', include(router.urls)),
]
