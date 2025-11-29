from rest_framework import serializers
from .models import Venta, DetalleVenta
from apps.usuarios.serializers import UsuarioSerializer

class DetalleVentaSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.ReadOnlyField(source='producto.nombre')
    
    class Meta:
        model = DetalleVenta
        fields = ['id', 'producto', 'producto_nombre', 'cantidad', 'precio_unitario', 'subtotal']

class VentaSerializer(serializers.ModelSerializer):
    cliente = UsuarioSerializer(read_only=True)
    detalles = DetalleVentaSerializer(many=True, read_only=True)
    
    class Meta:
        model = Venta
        fields = ['id', 'pedido', 'cliente', 'total', 'fecha_venta', 'cantidad_items', 'detalles']
