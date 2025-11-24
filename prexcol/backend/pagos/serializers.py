from rest_framework import serializers
from .models import Pago, Transaccion, MetodoPago, EstadoPago

class EstadoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoPago
        fields = '__all__'

class MetodoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetodoPago
        fields = '__all__'

class TransaccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaccion
        fields = '__all__'

class PagoSerializer(serializers.ModelSerializer):
    estado_nombre = serializers.CharField(source='estado.nombre', read_only=True)
    metodo_nombre = serializers.CharField(source='metodo_pago.nombre', read_only=True)
    transacciones = TransaccionSerializer(many=True, read_only=True)

    class Meta:
        model = Pago
        fields = '__all__'
        read_only_fields = ['usuario', 'fecha_creacion', 'fecha_actualizacion']
