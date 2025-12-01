from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum
from .models import Venta
from .serializers import VentaSerializer
from apps.usuarios.permissions import IsAdmin

class VentaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet para visualizar ventas. Solo lectura.
    Acceso restringido a administradores.
    """
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer
    permission_classes = [IsAdmin]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        fecha_inicio = self.request.query_params.get('fecha_inicio')
        fecha_fin = self.request.query_params.get('fecha_fin')
        
        if fecha_inicio:
            queryset = queryset.filter(fecha_venta__gte=fecha_inicio)
        if fecha_fin:
            queryset = queryset.filter(fecha_venta__lte=fecha_fin)
            
        return queryset

    @action(detail=False, methods=['get'])
    def reporte_diario(self, request):
        """Reporte de ventas del día actual"""
        hoy = timezone.now().date()
        ventas_hoy = self.get_queryset().filter(fecha_venta__date=hoy)
        
        total_vendido = ventas_hoy.aggregate(Sum('total'))['total__sum'] or 0
        cantidad_ventas = ventas_hoy.count()
        
        return Response({
            'fecha': hoy,
            'total_vendido': total_vendido,
            'cantidad_ventas': cantidad_ventas,
            'ventas': VentaSerializer(ventas_hoy, many=True).data
        })

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def mis_ventas_proveedor(self, request):
        """
        Retorna los detalles de venta de productos que pertenecen al proveedor actual.
        """
        from .models import DetalleVenta
        from .serializers import DetalleVentaSerializer
        
        user = request.user
        if user.rol != 'proveedor':
            return Response({'error': 'No eres proveedor'}, status=403)
            
        detalles = DetalleVenta.objects.filter(producto__proveedor=user).order_by('-venta__fecha_venta')
        
        # Calcular total vendido histórico
        total_historico = detalles.aggregate(Sum('subtotal'))['subtotal__sum'] or 0
        
        # Serializar
        data = []
        for d in detalles:
            data.append({
                'id': d.id,
                'fecha': d.venta.fecha_venta,
                'producto': d.producto.nombre,
                'cantidad': d.cantidad,
                'precio_unitario': d.precio_unitario,
                'subtotal': d.subtotal,
                'cliente': d.venta.cliente.nombre
            })
            
        return Response({
            'total_historico': total_historico,
            'ventas': data
        })
