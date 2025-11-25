from rest_framework.views import APIView
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction



from .models import Tienda, Producto, Pedido, DetallePedido
from .serializers import (
    TiendaSerializer,
    ProductoSerializer,
    ProductoListSerializer,
    PedidoSerializer,
    PedidoCreateSerializer,
    PedidoUpdateEstadoSerializer,
    PedidoListSerializer,
    DetallePedidoSerializer,
)
from .permissions import (
    IsAdmin,
    IsCliente,
    IsProveedor,
    IsComprador,
    IsLogistica,
    IsProductoOwnerOrAdmin,
)


# ======================== TIENDA VIEWSET ========================


class TiendaViewSet(viewsets.ModelViewSet):
    queryset = Tienda.objects.filter(activa=True)
    serializer_class = TiendaSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve", "mis_tiendas"]:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def mis_tiendas(self, request):
        tiendas = Tienda.objects.filter(administrador=request.user)
        serializer = self.get_serializer(tiendas, many=True)
        return Response(serializer.data)


# ======================== PRODUCTO VIEWSET ========================


class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer

    def get_queryset(self):
        # Allow public access to all active products
        if not self.request.user.is_authenticated:
            return Producto.objects.filter(activo=True)
        
        rol = getattr(self.request.user, "rol", None)
        if rol in ["admin"] or self.request.user.is_superuser:
            return Producto.objects.filter(activo=True)
        if rol == "proveedor":
            return Producto.objects.filter(proveedor=self.request.user, activo=True)
        if rol == "cliente":
            return Producto.objects.filter(activo=True)
        return Producto.objects.filter(activo=True)  # Default to all

    def get_serializer_class(self):
        if self.action == "list":
            return ProductoListSerializer
        return ProductoSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = []  # Public access for viewing products
        elif self.action in ["por_tienda"]:
            permission_classes = [IsAuthenticated]
        elif self.action in ["create", "destroy"]:
            permission_classes = [IsAdmin]
        elif self.action in ["update", "partial_update"]:
            permission_classes = [IsProductoOwnerOrAdmin]
        elif self.action == "ajustar_stock":
            permission_classes = [IsAdmin | IsProveedor]
        elif self.action == "mis_productos":
            permission_classes = [IsProveedor]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def por_tienda(self, request):
        tienda_id = request.query_params.get("tienda_id")
        if not tienda_id:
            return Response(
                {"error": "Parámetro tienda_id requerido"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        productos = self.get_queryset().filter(tienda_id=tienda_id)
        serializer = self.get_serializer(productos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], permission_classes=[IsProveedor])
    def mis_productos(self, request):
        productos = Producto.objects.filter(proveedor=request.user, activo=True)
        serializer = self.get_serializer(productos, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"], permission_classes=[IsAdmin | IsProveedor])
    def ajustar_stock(self, request, pk=None):
        producto = self.get_object()
        self.check_object_permissions(request, producto)

        cantidad = request.data.get("cantidad")
        operacion = request.data.get("operacion", "aumentar")

        if cantidad is None:
            return Response(
                {"error": "Parámetro cantidad requerido"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            cantidad = int(cantidad)
        except ValueError:
            return Response(
                {"error": "Cantidad debe ser un número entero"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if cantidad <= 0:
            return Response(
                {"error": "La cantidad debe ser mayor que 0"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            if operacion == "aumentar":
                nuevo_stock = producto.aumentar_stock(cantidad)
                mensaje = f"Stock aumentado a {nuevo_stock}"
            elif operacion == "reducir":
                nuevo_stock = producto.reducir_stock(cantidad)
                mensaje = f"Stock reducido a {nuevo_stock}"
            else:
                return Response(
                    {"error": 'Operación no válida. Use "aumentar" o "reducir"'},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return Response(
                {
                    "mensaje": mensaje,
                    "nuevo_stock": nuevo_stock,
                    "producto_id": producto.id,
                }
            )
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ======================== PEDIDO VIEWSET ========================


class PedidoViewSet(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer

    def get_queryset(self):
        rol = getattr(self.request.user, "rol", None)
        if rol in ["admin"] or self.request.user.is_superuser:
            return Pedido.objects.all()
        if rol == "cliente":
            return Pedido.objects.filter(cliente=self.request.user)
        if rol == "comprador":
            return Pedido.objects.filter(estado__in=["pendiente", "preparando"])
        if rol == "logistica":
            return Pedido.objects.filter(estado__in=["preparando", "en_transito"])
        return Pedido.objects.none()

    def get_serializer_class(self):
        if self.action == "list":
            return PedidoListSerializer
        if self.action == "crear_pedido":
            return PedidoCreateSerializer
        if self.action == "cambiar_estado":
            return PedidoUpdateEstadoSerializer
        return PedidoSerializer

    def get_permissions(self):
        if self.action in [
            "list",
            "retrieve",
            "mis_pedidos",
            "pendientes",
            "en_preparacion",
        ]:
            permission_classes = [IsAuthenticated]
        elif self.action == "crear_pedido":
            permission_classes = [IsCliente]
        elif self.action == "cambiar_estado":
            permission_classes = [IsAdmin | IsComprador | IsLogistica]
        elif self.action == "destroy":
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        return Response(
            {"error": "Use el endpoint /crear_pedido/ para crear pedidos"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    @action(detail=False, methods=["post"], permission_classes=[IsCliente])
    def crear_pedido(self, request):
        serializer = PedidoCreateSerializer(
            data=request.data, context={"request": request}
        )
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                tienda_id = serializer.validated_data["tienda_id"]
                notas = serializer.validated_data.get("notas", "")
                pedido = Pedido.objects.create(
                    cliente=request.user, tienda_id=tienda_id, notas=notas
                )

                detalles_data = serializer.validated_data["detalles"]
                for detalle_data in detalles_data:
                    producto_id = detalle_data["producto"]
                    cantidad = detalle_data["cantidad"]
                    
                    # Fetch the product object
                    try:
                        producto = Producto.objects.get(id=producto_id)
                    except Producto.DoesNotExist:
                        raise ValueError(f"Producto {producto_id} no existe")
                    
                    producto.reducir_stock(cantidad)
                    DetallePedido.objects.create(
                        pedido=pedido,
                        producto=producto,
                        cantidad=cantidad,
                        precio_unitario=producto.precio,
                    )

                pedido.calcular_total()
                return Response(
                    PedidoSerializer(pedido).data, status=status.HTTP_201_CREATED
                )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[IsAdmin | IsComprador | IsLogistica],
    )
    def cambiar_estado(self, request, pk=None):
        pedido = self.get_object()
        serializer = PedidoUpdateEstadoSerializer(
            data=request.data, context={"request": request, "pedido": pedido}
        )
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        nuevo_estado = serializer.validated_data["estado"]

        if nuevo_estado == "preparando" and not pedido.puede_cambiar_a_preparando():
            return Response(
                {"error": f"No se puede cambiar de {pedido.estado} a preparando"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if nuevo_estado == "en_transito" and not pedido.puede_cambiar_a_en_transito():
            return Response(
                {"error": f"No se puede cambiar de {pedido.estado} a en_transito"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if nuevo_estado == "entregado" and not pedido.puede_cambiar_a_entregado():
            return Response(
                {"error": f"No se puede cambiar de {pedido.estado} a entregado"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        pedido.estado = nuevo_estado
        pedido.save()

        if nuevo_estado == "cancelado":
            for detalle in pedido.detalles.all():
                detalle.producto.aumentar_stock(detalle.cantidad)

        return Response(
            {
                "mensaje": f"Pedido actualizado a estado: {nuevo_estado}",
                "pedido": PedidoSerializer(pedido).data,
            }
        )

    @action(detail=False, methods=["get"], permission_classes=[IsCliente])
    def mis_pedidos(self, request):
        pedidos = Pedido.objects.filter(cliente=request.user).order_by(
            "-fecha_creacion"
        )
        serializer = PedidoListSerializer(pedidos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], permission_classes=[IsComprador])
    def pendientes(self, request):
        pedidos = Pedido.objects.filter(estado="pendiente").order_by("fecha_creacion")
        serializer = PedidoListSerializer(pedidos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], permission_classes=[IsLogistica])
    def en_preparacion(self, request):
        pedidos = Pedido.objects.filter(estado="preparando").order_by("fecha_creacion")
        serializer = PedidoListSerializer(pedidos, many=True)
        return Response(serializer.data)


# ======================== DETALLE PEDIDO VIEWSET ========================


class DetallePedidoViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DetallePedidoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        rol = getattr(self.request.user, "rol", None)
        if rol in ["admin"] or self.request.user.is_superuser:
            return DetallePedido.objects.all()
        if rol == "cliente":
            return DetallePedido.objects.filter(pedido__cliente=self.request.user)
        if rol in ["comprador", "logistica"]:
            return DetallePedido.objects.all()
        return DetallePedido.objects.none()

    @action(detail=False, methods=["get"])
    def por_pedido(self, request):
        pedido_id = request.query_params.get("pedido_id")
        if not pedido_id:
            return Response(
                {"error": "Parámetro pedido_id requerido"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            pedido = Pedido.objects.get(id=pedido_id)
            if not (
                request.user.is_superuser
                or getattr(request.user, "rol", None) == "admin"
                or pedido.cliente == request.user
                or getattr(request.user, "rol", None) in ["comprador", "logistica"]
            ):
                return Response(
                    {"error": "No tiene permiso para ver este pedido"},
                    status=status.HTTP_403_FORBIDDEN,
                )
            detalles = DetallePedido.objects.filter(pedido_id=pedido_id)
            serializer = self.get_serializer(detalles, many=True)
            return Response(serializer.data)
        except Pedido.DoesNotExist:
            return Response(
                {"error": "Pedido no encontrado"}, status=status.HTTP_404_NOT_FOUND
            )


class ProductoSubirImagenView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            producto = Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            return Response(
                {"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND
            )

        if "imagen" not in request.FILES:
            return Response(
                {"error": "Se requiere una imagen"}, status=status.HTTP_400_BAD_REQUEST
            )

        imagen = request.FILES["imagen"]
        producto.imagen = imagen
        producto.save()

        return Response(
            {
                "mensaje": "Imagen subida correctamente",
                "imagen_url": request.build_absolute_uri(producto.imagen.url),
            }
        )
