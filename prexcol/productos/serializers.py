from rest_framework import serializers
from .models import Tienda, Producto, Pedido, DetallePedido
from usuarios.models import Usuario


class TiendaSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Tienda.
    Incluye información del administrador.
    """

    administrador_info = serializers.SerializerMethodField()

    class Meta:
        model = Tienda
        fields = [
            "id",
            "nombre",
            "direccion",
            "telefono",
            "administrador",
            "administrador_info",
            "activa",
            "fecha_creacion",
            "fecha_actualizacion",
        ]
        read_only_fields = ["fecha_creacion", "fecha_actualizacion"]

    def get_administrador_info(self, obj):
        """Retorna información básica del administrador."""
        return {
            "id": obj.administrador.id,
            "nombre": obj.administrador.nombre,
            "email": obj.administrador.email,
        }


class ProductoSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Producto.
    Incluye información de la tienda y el proveedor.
    """

    tienda_nombre = serializers.CharField(source="tienda.nombre", read_only=True)
    proveedor_nombre = serializers.CharField(source="proveedor.nombre", read_only=True)

    imagen_url = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = [
            "id",
            "nombre",
            "descripcion",
            "precio",
            "stock",
            "tienda",
            "tienda_nombre",
            "proveedor",
            "proveedor_nombre",
            # CAMPOS agregados / confirmados según tu JSON
            "categoria",
            "es_basico",
            "activo",
            "fecha_creacion",
            "fecha_actualizacion",
            "imagen_url",  # (eliminado un duplicado de "categoria" si tienes 2)""
        ]
        read_only_fields = ["fecha_creacion", "fecha_actualizacion"]

    def get_imagen_url(self, obj):
        if obj.imagen:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.imagen.url)
        return None

    def get_proveedor_info(self, obj):
        """Retorna información básica del proveedor."""
        return {
            "id": obj.proveedor.id,
            "nombre": obj.proveedor.nombre,
            "email": obj.proveedor.email,
        }


class ProductoListSerializer(serializers.ModelSerializer):
    """
    Serializador simplificado para listados de productos.
    Retorna menos información para mejorar el rendimiento.
    """

    tienda_nombre = serializers.CharField(source="tienda.nombre", read_only=True)
    imagen_url = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = [
            "id",
            "nombre",
            "precio",
            "stock",
            "tienda",
            "tienda_nombre",
            "activo",
            "imagen_url",
        ]

    def get_imagen_url(self, obj):
        request = self.context.get("request")
        if obj.imagen:
            return request.build_absolute_uri(obj.imagen.url)
        return None


class DetallePedidoSerializer(serializers.ModelSerializer):
    """
    Serializador para los detalles de un pedido.
    Incluye información del producto y calcula el subtotal.
    """

    producto_nombre = serializers.CharField(source="producto.nombre", read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = DetallePedido
        fields = [
            "id",
            "pedido",
            "producto",
            "producto_nombre",
            "cantidad",
            "precio_unitario",
            "subtotal",
        ]
        read_only_fields = ["pedido"]

    def get_subtotal(self, obj):
        """Calcula y retorna el subtotal del detalle."""
        return str(obj.subtotal)


class DetallePedidoCreateSerializer(serializers.ModelSerializer):
    """
    Serializador para crear detalles de pedido.
    Obtiene el precio del producto al momento de la creación.
    """

    class Meta:
        model = DetallePedido
        fields = ["producto", "cantidad"]

    def validate_cantidad(self, value):
        """Valida que la cantidad sea positiva."""
        if value <= 0:
            raise serializers.ValidationError("La cantidad debe ser mayor que 0")
        return value


class PedidoSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Pedido.
    Incluye información del cliente, tienda y detalles.
    """

    cliente_info = serializers.SerializerMethodField()
    tienda_nombre = serializers.CharField(source="tienda.nombre", read_only=True)
    detalles = DetallePedidoSerializer(many=True, read_only=True)

    class Meta:
        model = Pedido
        fields = [
            "id",
            "cliente",
            "cliente_info",
            "tienda",
            "tienda_nombre",
            "estado",
            "total",
            "detalles",
            "notas",
            "fecha_creacion",
            "fecha_actualizacion",
        ]
        read_only_fields = [
            "total",
            "fecha_creacion",
            "fecha_actualizacion",
            "detalles",
        ]

    def get_cliente_info(self, obj):
        """Retorna información básica del cliente."""
        return {
            "id": obj.cliente.id,
            "nombre": obj.cliente.nombre,
            "email": obj.cliente.email,
            "telefono": obj.cliente.telefono,
        }


class PedidoCreateSerializer(serializers.Serializer):
    """
    Serializador para crear pedidos.
    Recibe una lista de productos con cantidades.
    """

    tienda_id = serializers.IntegerField()
    detalles = DetallePedidoCreateSerializer(many=True)
    notas = serializers.CharField(required=False, allow_blank=True)

    def validate_detalles(self, value):
        """Valida que haya al menos un detalle."""
        if not value:
            raise serializers.ValidationError(
                "El pedido debe tener al menos un producto"
            )
        return value

    def validate_tienda_id(self, value):
        """Valida que la tienda exista."""
        try:
            Tienda.objects.get(id=value)
        except Tienda.DoesNotExist:
            raise serializers.ValidationError("La tienda no existe")
        return value

    def validate(self, data):
        """Valida que los productos existan y tengan stock suficiente."""
        detalles = data.get("detalles", [])
        tienda_id = data.get("tienda_id")

        for detalle in detalles:
            try:
                producto = Producto.objects.get(id=detalle["producto"].id)
            except Producto.DoesNotExist:
                raise serializers.ValidationError(
                    f"El producto {detalle['producto'].id} no existe"
                )

            # Verifica que el producto pertenezca a la tienda
            if producto.tienda_id != tienda_id:
                raise serializers.ValidationError(
                    f"El producto {producto.nombre} no pertenece a la tienda"
                )

            # Verifica que haya stock suficiente
            if producto.stock < detalle["cantidad"]:
                raise serializers.ValidationError(
                    f"Stock insuficiente para {producto.nombre}. Disponible: {producto.stock}, Solicitado: {detalle['cantidad']}"
                )

        return data


class PedidoUpdateEstadoSerializer(serializers.Serializer):
    """
    Serializador para actualizar el estado de un pedido.
    Solo permite transiciones válidas.
    """

    ESTADOS_VALIDOS = ["preparando", "en_transito", "entregado", "cancelado"]

    estado = serializers.ChoiceField(choices=ESTADOS_VALIDOS)

    def validate_estado(self, value):
        """Valida las transiciones permitidas según el rol del usuario."""
        request = self.context.get("request")
        pedido = self.context.get("pedido")

        if not pedido:
            return value

        usuario_rol = getattr(request.user, "rol", None)

        # Comprador: solo puede cambiar a 'preparando'
        if usuario_rol == "comprador" and value != "preparando":
            raise serializers.ValidationError(
                "Comprador solo puede cambiar a estado 'preparando'"
            )

        # Logística: solo puede cambiar a 'en_transito' o 'entregado'
        if usuario_rol == "logistica" and value not in ["en_transito", "entregado"]:
            raise serializers.ValidationError(
                "Logística solo puede cambiar a 'en_transito' o 'entregado'"
            )

        # Admin: puede cambiar a cualquier estado
        if usuario_rol not in ["admin", "comprador", "logistica"]:
            raise serializers.ValidationError(
                "Solo usuarios autorizados pueden cambiar el estado"
            )

        return value


class PedidoListSerializer(serializers.ModelSerializer):
    """
    Serializador simplificado para listados de pedidos.
    """

    cliente_nombre = serializers.CharField(source="cliente.nombre", read_only=True)
    tienda_nombre = serializers.CharField(source="tienda.nombre", read_only=True)

    class Meta:
        model = Pedido
        fields = [
            "id",
            "cliente_nombre",
            "tienda_nombre",
            "estado",
            "total",
            "fecha_creacion",
        ]
