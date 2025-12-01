from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.productos.models import Tienda, Producto, Pedido, DetallePedido
from apps.productos.serializers import (
    TiendaSerializer, ProductoSerializer, PedidoSerializer,
    PedidoCreateSerializer, DetallePedidoSerializer
)
from decimal import Decimal

User = get_user_model()

class TestTiendaSerializer(TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            email="admin@test.com",
            nombre="Admin",
            password="admin123",
            rol="admin"
        )

    def test_tienda_serializer_valid_data(self):
        """Test TiendaSerializer with valid data"""
        data = {
            "nombre": "Mi Tienda",
            "direccion": "Calle 123",
            "telefono": "1234567890",
            "administrador": self.admin.id
        }
        serializer = TiendaSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        tienda = serializer.save()
        self.assertEqual(tienda.nombre, "Mi Tienda")

    def test_tienda_serializer_representation(self):
        """Test TiendaSerializer representation includes nested admin"""
        tienda = Tienda.objects.create(
            nombre="Tienda Test",
            direccion="Calle 123",
            administrador=self.admin
        )
        serializer = TiendaSerializer(tienda)
        self.assertIn('administrador', serializer.data)
        self.assertEqual(serializer.data['administrador']['email'], self.admin.email)


class TestProductoSerializer(TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            email="admin@test.com",
            nombre="Admin",
            password="admin123",
            rol="admin"
        )
        self.proveedor = User.objects.create_user(
            email="prov@test.com",
            nombre="Proveedor",
            password="prov123",
            rol="proveedor"
        )
        self.tienda = Tienda.objects.create(
            nombre="Tienda Test",
            direccion="Calle 123",
            administrador=self.admin
        )

    def test_producto_serializer_valid_data(self):
        """Test ProductoSerializer with valid data"""
        data = {
            "nombre": "Producto Test",
            "descripcion": "Descripción",
            "precio": "10.50",
            "stock": 100,
            "tienda": self.tienda.id,
            "proveedor": self.proveedor.id,
            "es_basico": True,
            "categoria": "alimentos"
        }
        serializer = ProductoSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        producto = serializer.save()
        self.assertEqual(producto.nombre, "Producto Test")
        self.assertEqual(producto.precio, Decimal("10.50"))


class TestPedidoCreateSerializer(TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            email="admin@test.com",
            nombre="Admin",
            password="admin123",
            rol="admin"
        )
        self.proveedor = User.objects.create_user(
            email="prov@test.com",
            nombre="Proveedor",
            password="prov123",
            rol="proveedor"
        )
        self.tienda = Tienda.objects.create(
            nombre="Tienda Test",
            direccion="Calle 123",
            administrador=self.admin
        )
        self.producto = Producto.objects.create(
            nombre="Producto Test",
            descripcion="Desc",
            precio=Decimal("10.00"),
            stock=100,
            tienda=self.tienda,
            proveedor=self.proveedor
        )

    def test_pedido_create_serializer_valid_data(self):
        """Test PedidoCreateSerializer with valid data"""
        data = {
            "tienda_id": self.tienda.id,
            "detalles": [
                {"producto": self.producto.id, "cantidad": 2}
            ],
            "notas": "Entrega rápida",
            "metodo_pago": "Efectivo",
            "monto_pago": "20.00"
        }
        serializer = PedidoCreateSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_pedido_create_serializer_invalid_detalles(self):
        """Test PedidoCreateSerializer with invalid detalles"""
        data = {
            "tienda_id": self.tienda.id,
            "detalles": [
                {"producto": self.producto.id}  # Missing cantidad
            ],
            "metodo_pago": "Efectivo",
            "monto_pago": "20.00"
        }
        serializer = PedidoCreateSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    def test_pedido_create_serializer_empty_detalles(self):
        """Test PedidoCreateSerializer with empty detalles"""
        data = {
            "tienda_id": self.tienda.id,
            "detalles": [],
            "metodo_pago": "Efectivo",
            "monto_pago": "0.00"
        }
        serializer = PedidoCreateSerializer(data=data)
        self.assertFalse(serializer.is_valid())


class TestDetallePedidoSerializer(TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            email="admin@test.com",
            nombre="Admin",
            password="admin123",
            rol="admin"
        )
        self.cliente = User.objects.create_user(
            email="cliente@test.com",
            nombre="Cliente",
            password="client123",
            rol="cliente"
        )
        self.proveedor = User.objects.create_user(
            email="prov@test.com",
            nombre="Proveedor",
            password="prov123",
            rol="proveedor"
        )
        self.tienda = Tienda.objects.create(
            nombre="Tienda Test",
            direccion="Calle 123",
            administrador=self.admin
        )
        self.producto = Producto.objects.create(
            nombre="Producto Test",
            descripcion="Desc",
            precio=Decimal("10.00"),
            stock=100,
            tienda=self.tienda,
            proveedor=self.proveedor
        )
        self.pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda
        )

    def test_detalle_pedido_serializer_includes_subtotal(self):
        """Test DetallePedidoSerializer includes calculated subtotal"""
        detalle = DetallePedido.objects.create(
            pedido=self.pedido,
            producto=self.producto,
            cantidad=5,
            precio_unitario=Decimal("10.00")
        )
        serializer = DetallePedidoSerializer(detalle)
        self.assertEqual(serializer.data['subtotal'], "50.00")
        self.assertIn('producto', serializer.data)
