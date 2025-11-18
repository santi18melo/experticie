from rest_framework import serializers
from .models import Tienda, Producto, Pedido, DetallePedido
from usuarios.serializers import UsuarioSerializer


class TiendaSerializer(serializers.ModelSerializer):
    administrador = UsuarioSerializer(read_only=True)

    class Meta:
        model = Tienda
        fields = "__all__"


class ProductoSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Producto
        fields = "__all__"


class ProductoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio']  # solo los campos que quieras mostrar en listados

class DetallePedidoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    subtotal = serializers.DecimalField(
        max_digits=12, decimal_places=2, read_only=True
    )

    class Meta:
        model = DetallePedido
        fields = [
            "id",
            "producto",
            "cantidad",
            "precio_unitario",
            "subtotal",
        ]

class PedidoSerializer(serializers.ModelSerializer):
    cliente = UsuarioSerializer(read_only=True)
    tienda = TiendaSerializer(read_only=True)
    detalles = DetallePedidoSerializer(many=True, read_only=True)

    class Meta:
        model = Pedido
        fields = "__all__"
        

class PedidoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = "__all__"  # o los campos que quieras permitir al crear

class PedidoUpdateEstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ['estado']  # Solo el campo que quieres actualizar

class PedidoListSerializer(serializers.ModelSerializer):
    cliente = UsuarioSerializer(read_only=True)
    tienda = TiendaSerializer(read_only=True)
    class Meta:
        model = Pedido
        fields = ["id", "cliente", "tienda", "estado", "fecha_creacion"]