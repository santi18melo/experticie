from rest_framework.views import APIView
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from django.db import transaction



from .models import Tienda, Producto, Pedido, DetallePedido, Seccion
from apps.usuarios.models import Usuario
from .serializers import (
    TiendaSerializer,
    ProductoSerializer,
    ProductoListSerializer,
    PedidoSerializer,
    PedidoCreateSerializer,
    PedidoUpdateEstadoSerializer,
    PedidoListSerializer,
    DetallePedidoSerializer,
    SeccionSerializer,
)
from .permissions import (
    IsAdmin,
    IsCliente,
    IsProveedor,
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

    @action(detail=True, methods=["post"], permission_classes=[IsAdmin])
    def asignar_proveedor(self, request, pk=None):
        """Asignar o cambiar el proveedor de un producto (solo admin)"""
        producto = self.get_object()
        proveedor_id = request.data.get("proveedor_id")

        if not proveedor_id:
            return Response(
                {"error": "Se requiere proveedor_id"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            from apps.usuarios.models import Usuario
            proveedor = Usuario.objects.get(id=proveedor_id, rol="proveedor", estado=True)
        except Usuario.DoesNotExist:
            return Response(
                {"error": "Proveedor no encontrado o inactivo"},
                status=status.HTTP_404_NOT_FOUND,
            )

        producto.proveedor = proveedor
        producto.save()

        return Response(
            {
                "mensaje": f"Producto '{producto.nombre}' asignado a '{proveedor.nombre}'",
                "producto_id": producto.id,
                "proveedor_id": proveedor.id,
                "proveedor_nombre": proveedor.nombre,
            }
        )
    
    @action(detail=True, methods=["get", "post", "patch"], permission_classes=[IsAdmin | IsProveedor])
    def config_stock(self, request, pk=None):
        """Obtener o configurar la recarga automática de stock"""
        from .models import StockConfig
        
        producto = self.get_object()
        
        if request.method == "GET":
            try:
                config = StockConfig.objects.get(producto=producto)
                return Response({
                    "producto_id": producto.id,
                    "producto_nombre": producto.nombre,
                    "stock_actual": producto.stock,
                    "stock_minimo": config.stock_minimo,
                    "cantidad_recarga": config.cantidad_recarga,
                    "recarga_automatica_activa": config.recarga_automatica_activa,
                    "ultima_recarga": config.ultima_recarga,
                    "total_recargas": config.total_recargas,
                })
            except StockConfig.DoesNotExist:
                return Response({
                    "mensaje": "No hay configuración de stock para este producto",
                    "producto_id": producto.id,
                    "stock_actual": producto.stock,
                }, status=status.HTTP_404_NOT_FOUND)
        
        # POST o PATCH: Crear o actualizar configuración
        stock_minimo = request.data.get("stock_minimo")
        cantidad_recarga = request.data.get("cantidad_recarga")
        recarga_automatica_activa = request.data.get("recarga_automatica_activa")
        
        config, created = StockConfig.objects.get_or_create(
            producto=producto,
            defaults={
                "stock_minimo": stock_minimo or 10,
                "cantidad_recarga": cantidad_recarga or 50,
                "recarga_automatica_activa": recarga_automatica_activa if recarga_automatica_activa is not None else True,
            }
        )
        
        if not created:
            # Actualizar configuración existente
            if stock_minimo is not None:
                config.stock_minimo = stock_minimo
            if cantidad_recarga is not None:
                config.cantidad_recarga = cantidad_recarga
            if recarga_automatica_activa is not None:
                config.recarga_automatica_activa = recarga_automatica_activa
            config.save()
        
        return Response({
            "mensaje": "Configuración de stock actualizada" if not created else "Configuración de stock creada",
            "producto_id": producto.id,
            "stock_minimo": config.stock_minimo,
            "cantidad_recarga": config.cantidad_recarga,
            "recarga_automatica_activa": config.recarga_automatica_activa,
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
    
    @action(detail=True, methods=["post"], permission_classes=[IsAdmin])
    def ejecutar_recarga(self, request, pk=None):
        """Ejecutar manualmente la recarga de stock"""
        from .models import StockConfig, HistorialRecarga
        
        producto = self.get_object()
        
        try:
            config = StockConfig.objects.get(producto=producto)
        except StockConfig.DoesNotExist:
            return Response({
                "error": "No hay configuración de stock para este producto. Configure primero."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        stock_anterior = producto.stock
        
        # Registrar en historial
        HistorialRecarga.objects.create(
            producto=producto,
            cantidad=config.cantidad_recarga,
            stock_anterior=stock_anterior,
            stock_nuevo=stock_anterior + config.cantidad_recarga,
            tipo='manual',
            usuario=request.user,
            notas=request.data.get('notas', 'Recarga manual desde admin')
        )
        
        # Ejecutar recarga
        producto.aumentar_stock(config.cantidad_recarga)
        
        return Response({
            "mensaje": f"Stock recargado exitosamente",
            "producto": producto.nombre,
            "stock_anterior": stock_anterior,
            "stock_nuevo": producto.stock,
            "cantidad_agregada": config.cantidad_recarga,
        })
    
    @action(detail=False, methods=["get"], permission_classes=[IsAdmin])
    def productos_stock_bajo(self, request):
        """Listar productos con stock bajo que necesitan recarga"""
        from .models import StockConfig
        
        configs = StockConfig.objects.filter(
            recarga_automatica_activa=True
        ).select_related('producto')
        
        productos_bajo_stock = []
        for config in configs:
            if config.necesita_recarga():
                productos_bajo_stock.append({
                    "id": config.producto.id,
                    "nombre": config.producto.nombre,
                    "stock_actual": config.producto.stock,
                    "stock_minimo": config.stock_minimo,
                    "cantidad_recarga": config.cantidad_recarga,
                    "proveedor": config.producto.proveedor.nombre if config.producto.proveedor else None,
                })
        
        return Response({
            "total": len(productos_bajo_stock),
            "productos": productos_bajo_stock,
        })
    
    @action(detail=True, methods=["get"], permission_classes=[IsAdmin | IsProveedor])
    def historial_recargas(self, request, pk=None):
        """Ver historial de recargas de un producto"""
        from .models import HistorialRecarga
        
        producto = self.get_object()
        historial = HistorialRecarga.objects.filter(producto=producto).order_by('-fecha_creacion')[:20]
        
        data = [{
            "id": h.id,
            "cantidad": h.cantidad,
            "stock_anterior": h.stock_anterior,
            "stock_nuevo": h.stock_nuevo,
            "tipo": h.tipo,
            "usuario": h.usuario.nombre if h.usuario else "Sistema",
            "notas": h.notas,
            "fecha": h.fecha_creacion.strftime("%Y-%m-%d %H:%M:%S"),
        } for h in historial]
        
        return Response({
            "producto": producto.nombre,
            "total_recargas": historial.count(),
            "historial": data,
        })
    
    @action(detail=False, methods=["post"], permission_classes=[IsAdmin])
    def asignar_productos_masivo(self, request):
        """Asignar múltiples productos a un proveedor"""
        from apps.usuarios.models import Usuario
        
        proveedor_id = request.data.get("proveedor_id")
        producto_ids = request.data.get("producto_ids", [])
        
        if not proveedor_id:
            return Response({"error": "Se requiere proveedor_id"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not producto_ids or not isinstance(producto_ids, list):
            return Response({"error": "Se requiere una lista de producto_ids"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            proveedor = Usuario.objects.get(id=proveedor_id, rol="proveedor", estado=True)
        except Usuario.DoesNotExist:
            return Response({"error": "Proveedor no encontrado o inactivo"}, status=status.HTTP_404_NOT_FOUND)
        
        productos_actualizados = []
        errores = []
        
        for producto_id in producto_ids:
            try:
                producto = Producto.objects.get(id=producto_id)
                producto.proveedor = proveedor
                producto.save()
                productos_actualizados.append({
                    "id": producto.id,
                    "nombre": producto.nombre,
                })
            except Producto.DoesNotExist:
                errores.append(f"Producto {producto_id} no encontrado")
        
        return Response({
            "mensaje": f"{len(productos_actualizados)} productos asignados a {proveedor.nombre}",
            "proveedor": {
                "id": proveedor.id,
                "nombre": proveedor.nombre,
            },
            "productos_actualizados": productos_actualizados,
            "errores": errores if errores else None,
        })



# ======================== PEDIDO VIEWSET ========================


class PedidoViewSet(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer

    def get_queryset(self):
        rol = getattr(self.request.user, "rol", None)
        if rol in ["admin"] or self.request.user.is_superuser:
            return Pedido.objects.all()
        if rol == "cliente":
            return Pedido.objects.filter(cliente=self.request.user)
        if rol == "logistica":
            return Pedido.objects.filter(estado__in=["pendiente", "preparando", "en_transito", "entregado"])
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
            permission_classes = [IsAdmin | IsLogistica]
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
                metodo_pago_nombre = serializer.validated_data["metodo_pago"]
                monto_pago = serializer.validated_data["monto_pago"]

                # 1. Validar Método de Pago
                from apps.pagos.models import MetodoPago, EstadoPago, Pago
                try:
                    metodo_pago = MetodoPago.objects.get(nombre__iexact=metodo_pago_nombre, activo=True)
                except MetodoPago.DoesNotExist:
                    raise ValueError(f"Método de pago '{metodo_pago_nombre}' no válido o inactivo")

                # 2. Obtener Estado de Pago Inicial (Pendiente)
                estado_pendiente, _ = EstadoPago.objects.get_or_create(nombre="Pendiente")

                # 3. Crear Pedido
                pedido = Pedido.objects.create(
                    cliente=request.user, tienda_id=tienda_id, notas=notas
                )

                # 4. Crear Detalles y Actualizar Stock
                detalles_data = serializer.validated_data["detalles"]
                for detalle_data in detalles_data:
                    producto_id = detalle_data["producto"]
                    cantidad = detalle_data["cantidad"]
                    
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

                # 5. Calcular Total del Pedido
                total_pedido = pedido.calcular_total()

                # 6. Validar Monto del Pago (Debe coincidir con el total)
                # Nota: En un escenario real, esto podría variar (pagos parciales), pero por ahora exigimos exactitud.
                if float(monto_pago) != float(total_pedido):
                     raise ValueError(f"El monto del pago ({monto_pago}) no coincide con el total del pedido ({total_pedido})")

                # 7. Crear Registro de Pago
                Pago.objects.create(
                    usuario=request.user,
                    pedido=pedido,
                    monto=monto_pago,
                    estado=estado_pendiente,
                    metodo_pago=metodo_pago
                )

                return Response(
                    PedidoSerializer(pedido).data, status=status.HTTP_201_CREATED
                )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(
        detail=True,
        methods=["post", "put", "patch"],
        permission_classes=[IsAdmin | IsLogistica],
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

    @action(detail=False, methods=["get"], permission_classes=[IsLogistica])
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
        if rol == "logistica":
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
                or getattr(request.user, "rol", None) == "logistica"
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


# ======================== SECCION VIEWSET ========================


class SeccionViewSet(viewsets.ModelViewSet):
    """ViewSet para gestionar secciones de productos"""
    queryset = Seccion.objects.filter(activa=True)
    serializer_class = SeccionSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = []  # Public access
        elif self.action in ["create", "update", "partial_update", "destroy"]:
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=["post"], permission_classes=[IsAdmin])
    def agregar_productos(self, request, pk=None):
        """Agregar productos a una sección"""
        seccion = self.get_object()
        producto_ids = request.data.get("producto_ids", [])
        
        if not producto_ids:
            return Response(
                {"error": "Se requiere una lista de producto_ids"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        productos = Producto.objects.filter(id__in=producto_ids, activo=True)
        seccion.productos.add(*productos)
        
        return Response({
            "mensaje": f"{productos.count()} productos agregados a la sección",
            "seccion": SeccionSerializer(seccion).data
        })


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
