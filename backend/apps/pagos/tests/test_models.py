from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.pagos.models import MetodoPago, EstadoPago, Pago, Transaccion
from apps.productos.models import Pedido, Tienda
from decimal import Decimal

User = get_user_model()

class TestMetodoPagoModel(TestCase):
    def test_create_metodo_pago(self):
        """Test creating a payment method"""
        metodo = MetodoPago.objects.create(
            nombre="Tarjeta de Crédito",
            activo=True
        )
        self.assertEqual(metodo.nombre, "Tarjeta de Crédito")
        self.assertTrue(metodo.activo)
        self.assertEqual(str(metodo), "Tarjeta de Crédito")

    def test_metodo_pago_inactive(self):
        """Test creating inactive payment method"""
        metodo = MetodoPago.objects.create(
            nombre="Método Obsoleto",
            activo=False
        )
        self.assertFalse(metodo.activo)

    def test_metodo_pago_unique_nombre(self):
        """Test that payment method names are unique"""
        MetodoPago.objects.create(nombre="Efectivo", activo=True)
        
        with self.assertRaises(Exception):
            MetodoPago.objects.create(nombre="Efectivo", activo=True)


class TestEstadoPagoModel(TestCase):
    def test_create_estado_pago(self):
        """Test creating a payment state"""
        estado = EstadoPago.objects.create(
            nombre="Aprobado",
            descripcion="Pago aprobado exitosamente"
        )
        self.assertEqual(estado.nombre, "Aprobado")
        self.assertEqual(estado.descripcion, "Pago aprobado exitosamente")
        self.assertEqual(str(estado), "Aprobado")

    def test_estado_pago_without_description(self):
        """Test creating payment state without description"""
        estado = EstadoPago.objects.create(nombre="Pendiente")
        self.assertIsNone(estado.descripcion)

    def test_estado_pago_unique_nombre(self):
        """Test that payment state names are unique"""
        EstadoPago.objects.create(nombre="Pendiente")
        
        with self.assertRaises(Exception):
            EstadoPago.objects.create(nombre="Pendiente")


class TestPagoModel(TestCase):
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

    def test_create_pago(self):
        """Test creating a payment"""
        pago = Pago.objects.create(
            usuario=self.cliente,
            pedido=self.pedido,
            monto=Decimal("100.00"),
            estado=self.estado_pago,
            metodo_pago=self.metodo_pago
        )
        self.assertEqual(pago.monto, Decimal("100.00"))
        self.assertEqual(pago.usuario, self.cliente)
        self.assertEqual(pago.pedido, self.pedido)

    def test_pago_str_representation(self):
        """Test Pago string representation"""
        pago = Pago.objects.create(
            usuario=self.cliente,
            pedido=self.pedido,
            monto=Decimal("100.00"),
            estado=self.estado_pago,
            metodo_pago=self.metodo_pago
        )
        expected = f"Pago {pago.id} - {self.cliente.email} - 100.00"
        self.assertEqual(str(pago), expected)

    def test_pago_with_comprobante(self):
        """Test payment with receipt file"""
        pago = Pago.objects.create(
            usuario=self.cliente,
            pedido=self.pedido,
            monto=Decimal("100.00"),
            estado=self.estado_pago,
            metodo_pago=self.metodo_pago
        )
        self.assertIsNone(pago.comprobante.name if pago.comprobante else None)

    def test_pago_timestamps(self):
        """Test that payment has automatic timestamps"""
        pago = Pago.objects.create(
            usuario=self.cliente,
            pedido=self.pedido,
            monto=Decimal("100.00"),
            estado=self.estado_pago,
            metodo_pago=self.metodo_pago
        )
        self.assertIsNotNone(pago.fecha_creacion)
        self.assertIsNotNone(pago.fecha_actualizacion)


class TestTransaccionModel(TestCase):
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

    def test_create_transaccion(self):
        """Test creating a transaction"""
        transaccion = Transaccion.objects.create(
            pago=self.pago,
            referencia_externa="TXN123456",
            monto=Decimal("100.00"),
            estado="aprobado",
            respuesta_gateway={"status": "success", "code": "00"}
        )
        self.assertEqual(transaccion.referencia_externa, "TXN123456")
        self.assertEqual(transaccion.estado, "aprobado")
        self.assertEqual(transaccion.monto, Decimal("100.00"))

    def test_transaccion_str_representation(self):
        """Test Transaccion string representation"""
        transaccion = Transaccion.objects.create(
            pago=self.pago,
            monto=Decimal("100.00"),
            estado="aprobado"
        )
        expected = f"Transacción {transaccion.id} - Pago {self.pago.id}"
        self.assertEqual(str(transaccion), expected)

    def test_transaccion_with_gateway_response(self):
        """Test transaction with gateway response"""
        gateway_response = {
            "status": "approved",
            "transaction_id": "ABC123",
            "authorization_code": "789456"
        }
        transaccion = Transaccion.objects.create(
            pago=self.pago,
            monto=Decimal("100.00"),
            estado="aprobado",
            respuesta_gateway=gateway_response
        )
        self.assertEqual(transaccion.respuesta_gateway["status"], "approved")
        self.assertEqual(transaccion.respuesta_gateway["transaction_id"], "ABC123")

    def test_transaccion_without_referencia(self):
        """Test transaction without external reference"""
        transaccion = Transaccion.objects.create(
            pago=self.pago,
            monto=Decimal("100.00"),
            estado="pendiente"
        )
        self.assertIsNone(transaccion.referencia_externa)
