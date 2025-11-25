from rest_framework import serializers
from .models import Notificacion, TipoNotificacion, EstadoNotificacion

class TipoNotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoNotificacion
        fields = '__all__'

class EstadoNotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoNotificacion
        fields = '__all__'

class NotificacionSerializer(serializers.ModelSerializer):
    tipo_nombre = serializers.CharField(source='tipo.nombre', read_only=True)
    estado_nombre = serializers.CharField(source='estado.nombre', read_only=True)

    class Meta:
        model = Notificacion
        fields = '__all__'
        read_only_fields = ['usuario', 'fecha_creacion', 'fecha_actualizacion', 'fecha_lectura']
