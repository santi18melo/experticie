from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.pagos.models import MetodoPago, EstadoPago, Pago, Transaccion
from apps.pagos.serializers import (
    MetodoPagoSerializer,
    EstadoPagoSerializer,
    PagoSerializer,
    TransaccionSerializer
)
from apps.productos.models import Pedido, Tienda
from decimal import Decimal

User = get_user_model()

class TestPagoSerializer(TestCase):
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
        self.tienda = Tienda.objects.create(
            nombre="Tienda Test",
            direccion="Calle 123",
            administrador=self.admin
        )
        self.pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda,
            total=Decimal("100.00")
        )
        self.metodo_pago = MetodoPago.objects.create(
            nombre="Efectivo",
            activo=True
        )
        self.estado_pago = EstadoPago.objects.create(
            nombre="Pendiente"
        )

    def test_pago_serializer_valid_data(self):
        """Test PagoSerializer with valid data"""
        data = {
            "usuario": self.cliente.id,
            "pedido": self.pedido.id,
            "monto": "100.00",
            "estado": self.estado_pago.id,
            "metodo_pago": self.metodo_pago.id
        }
        serializer = PagoSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_pago_serializer_representation(self):
        """Test PagoSerializer representation"""
        pago = Pago.objects.create(
            usuario=self.cliente,
            pedido=self.pedido,
            monto=Decimal("100.00"),
            estado=self.estado_pago,
            metodo_pago=self.metodo_pago
        )
        serializer = PagoSerializer(pago)
        self.assertEqual(serializer.data['monto'], "100.00")
        self.assertIn('usuario', serializer.data)
        self.assertIn('pedido', serializer.data)


class TestTransaccionSerializer(TestCase):
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
        self.tienda = Tienda.objects.create(
            nombre="Tienda Test",
            direccion="Calle 123",
            administrador=self.admin
        )
        self.pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda,
            total=Decimal("100.00")
        )
        self.metodo_pago = MetodoPago.objects.create(
            nombre="Tarjeta",
            activo=True
        )
        self.estado_pago = EstadoPago.objects.create(
            nombre="Pendiente"
        )
        self.pago = Pago.objects.create(
            usuario=self.cliente,
            pedido=self.pedido,
            monto=Decimal("100.00"),
            estado=self.estado_pago,
            metodo_pago=self.metodo_pago
        )

    def test_transaccion_serializer_valid_data(self):
        """Test TransaccionSerializer with valid data"""
        data = {
            "pago": self.pago.id,
            "referencia_externa": "TXN123",
            "monto": "100.00",
            "estado": "aprobado",
            "respuesta_gateway": {"status": "success"}
        }
        serializer = TransaccionSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_transaccion_serializer_with_gateway_response(self):
        """Test TransaccionSerializer with complex gateway response"""
        transaccion = Transaccion.objects.create(
            pago=self.pago,
            referencia_externa="TXN456",
            monto=Decimal("100.00"),
            estado="aprobado",
            respuesta_gateway={
                "status": "approved",
                "code": "00",
                "message": "Transaction successful"
            }
        )
        serializer = TransaccionSerializer(transaccion)
        self.assertEqual(serializer.data['respuesta_gateway']['status'], "approved")


class TestMetodoPagoSerializer(TestCase):
    def test_metodo_pago_serializer(self):
        """Test MetodoPagoSerializer"""
        metodo = MetodoPago.objects.create(
            nombre="Tarjeta de Crédito",
            activo=True
        )
        serializer = MetodoPagoSerializer(metodo)
        self.assertEqual(serializer.data['nombre'], "Tarjeta de Crédito")
        self.assertTrue(serializer.data['activo'])

    def test_metodo_pago_serializer_inactive(self):
        """Test MetodoPagoSerializer with inactive method"""
        metodo = MetodoPago.objects.create(
            nombre="Método Obsoleto",
            activo=False
        )
        serializer = MetodoPagoSerializer(metodo)
        self.assertFalse(serializer.data['activo'])


class TestEstadoPagoSerializer(TestCase):
    def test_estado_pago_serializer(self):
        """Test EstadoPagoSerializer"""
        estado = EstadoPago.objects.create(
            nombre="Aprobado",
            descripcion="Pago aprobado exitosamente"
        )
        serializer = EstadoPagoSerializer(estado)
        self.assertEqual(serializer.data['nombre'], "Aprobado")
        self.assertEqual(serializer.data['descripcion'], "Pago aprobado exitosamente")

    def test_estado_pago_serializer_without_description(self):
        """Test EstadoPagoSerializer without description"""
        estado = EstadoPago.objects.create(nombre="Pendiente")
        serializer = EstadoPagoSerializer(estado)
        self.assertIsNone(serializer.data['descripcion'])
