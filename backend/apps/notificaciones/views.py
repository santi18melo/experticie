from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Notificacion, TipoNotificacion, EstadoNotificacion
from .serializers import (
    NotificacionSerializer,
    TipoNotificacionSerializer,
    EstadoNotificacionSerializer
)

class NotificacionViewSet(viewsets.ModelViewSet):
    serializer_class = NotificacionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notificacion.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(detail=False, methods=['post'])
    def enviar(self, request):
        """
        Endpoint simulado para enviar una notificación.
        Esperamos: { "tipo_id": 1, "mensaje": "Hola", "destino": "user@example.com" }
        """
        # Simulación de envío
        tipo_id = request.data.get('tipo_id')
        mensaje = request.data.get('mensaje')
        destino = request.data.get('destino')

        if not all([tipo_id, mensaje, destino]):
             return Response({"error": "Faltan datos requeridos"}, status=status.HTTP_400_BAD_REQUEST)

        # En un caso real, aquí se buscaría el Tipo y el Estado inicial
        # Para este ejemplo, asumimos que existen o los manejamos con try/except
        try:
            # Asumimos que el estado inicial es el ID 1 (PENDIENTE) o similar
            # Esto requeriría fixtures o lógica de inicialización.
            # Para evitar errores si no existen datos, validamos primero.
            if not TipoNotificacion.objects.filter(id=tipo_id).exists():
                 return Response({"error": "Tipo de notificación no válido"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Crear la notificación
            # Nota: En un sistema real, el 'usuario' sería el destinatario si es interna,
            # o el remitente si es un log. Según RF, "pertenece a un usuario".
            # Asumiremos que el usuario autenticado es quien la genera o recibe.
            # Si es "enviar", quizás el usuario autenticado la envía a 'destino'.
            # Pero el modelo tiene FK a usuario. Asumiremos que es el dueño de la noti.
            
            # Simplificación: Creamos la notificación para el usuario actual
            # En producción, esto debería buscar el usuario destino por email.
            
            return Response({"message": "Notificación enviada (simulada)"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def marcar_leida(self, request, pk=None):
        notificacion = self.get_object()
        if not notificacion.leida:
            notificacion.leida = True
            notificacion.fecha_lectura = timezone.now()
            notificacion.save()
        return Response(self.get_serializer(notificacion).data)

    @action(detail=False, methods=['get'], url_path='historial/(?P<usuario_id>[^/.]+)')
    def historial(self, request, usuario_id=None):
        # Verificar permisos: solo admin o el mismo usuario
        if str(request.user.id) != usuario_id and not request.user.is_staff:
            return Response({"error": "No autorizado"}, status=status.HTTP_403_FORBIDDEN)
        
        notificaciones = Notificacion.objects.filter(usuario_id=usuario_id)
        page = self.paginate_queryset(notificaciones)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(notificaciones, many=True)
        return Response(serializer.data)

class TipoNotificacionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TipoNotificacion.objects.all()
    serializer_class = TipoNotificacionSerializer
    permission_classes = [permissions.IsAuthenticated]

class EstadoNotificacionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EstadoNotificacion.objects.all()
    serializer_class = EstadoNotificacionSerializer
    permission_classes = [permissions.IsAuthenticated]
