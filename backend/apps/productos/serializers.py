from rest_framework import serializers
from .models import Tienda, Producto, Pedido, DetallePedido
from apps.usuarios.serializers import UsuarioSerializer
from apps.usuarios.models import Usuario


class TiendaSerializer(serializers.ModelSerializer):
    administrador_detalle = UsuarioSerializer(source='administrador', read_only=True)
    administrador = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.filter(rol='admin')
    )

    class Meta:
        model = Tienda
        fields = ['id', 'nombre', 'direccion', 'telefono', 'administrador', 'administrador_detalle', 'activa', 'fecha_creacion', 'fecha_actualizacion']
        read_only_fields = ['activa', 'fecha_creacion', 'fecha_actualizacion']

    def to_representation(self, instance):
        """Override to show nested administrador in GET responses"""
        ret = super().to_representation(instance)
        # Remove the ID-only administrador and keep only the detailed version
        if 'administrador' in ret and 'administrador_detalle' in ret:
            ret['administrador'] = ret.pop('administrador_detalle')
        return ret


class ProductoSerializer(serializers.ModelSerializer):    
    tienda_nombre = serializers.ReadOnlyField(source='tienda.nombre')
    

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
        

class PedidoCreateSerializer(serializers.Serializer):
    """Custom serializer for crear_pedido endpoint"""
    tienda_id = serializers.IntegerField(required=True)
    detalles = serializers.ListField(
        child=serializers.DictField(),
        required=True,
        allow_empty=False
    )
    notas = serializers.CharField(required=False, allow_blank=True)
    metodo_pago = serializers.CharField(required=True)
    monto_pago = serializers.DecimalField(max_digits=12, decimal_places=2, required=True)

    def validate_detalles(self, value):
        """Validate that each detalle has producto and cantidad"""
        for detalle in value:
            if 'producto' not in detalle or 'cantidad' not in detalle:
                raise serializers.ValidationError(
                    "Cada detalle debe tener 'producto' y 'cantidad'"
                )
        return value

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