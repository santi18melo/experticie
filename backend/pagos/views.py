from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Pago, Transaccion, MetodoPago, EstadoPago
from .serializers import (
    PagoSerializer, 
    TransaccionSerializer, 
    MetodoPagoSerializer, 
    EstadoPagoSerializer
)

class PagoViewSet(viewsets.ModelViewSet):
    serializer_class = PagoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if getattr(user, 'rol', None) in ['admin', 'comprador']:
            return Pago.objects.all()
        return Pago.objects.filter(usuario=user)

    def perform_create(self, serializer):
        # Asignar automáticamente el usuario actual
        serializer.save(usuario=self.request.user)

    @action(detail=False, methods=['post'])
    def transaccion(self, request):
        """
        Endpoint para registrar una transacción asociada a un pago existente.
        Esperamos: { "pago_id": 1, "monto": 100.00, "referencia_externa": "XYZ", "estado": "aprobado" }
        """
        pago_id = request.data.get('pago_id')
        if not pago_id:
            return Response({"error": "pago_id es requerido"}, status=status.HTTP_400_BAD_REQUEST)
        
        pago = get_object_or_404(Pago, id=pago_id)
        
        # Verificar permisos sobre el pago
        if pago.usuario != request.user and getattr(request.user, 'rol', None) != 'admin':
             return Response({"error": "No tiene permiso sobre este pago"}, status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        data['pago'] = pago.id
        
        serializer = TransaccionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def estado(self, request, pk=None):
        """
        Endpoint para consultar el estado de un pago.
        """
        pago = self.get_object()
        return Response({
            "pago_id": pago.id,
            "estado": pago.estado.nombre,
            "descripcion": pago.estado.descripcion
        })

class MetodoPagoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MetodoPago.objects.filter(activo=True)
    serializer_class = MetodoPagoSerializer
    permission_classes = [permissions.IsAuthenticated]
