from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PagoViewSet, MetodoPagoViewSet

router = DefaultRouter()
router.register(r'pagos', PagoViewSet, basename='pago')
router.register(r'metodos-pago', MetodoPagoViewSet, basename='metodo-pago')

urlpatterns = [
    path('', include(router.urls)),
]
