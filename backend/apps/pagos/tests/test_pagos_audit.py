from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from apps.pagos.models import Pago, MetodoPago, EstadoPago, Transaccion
from apps.productos.models import Pedido, Tienda

User = get_user_model()

class TestPagosAudit(APITestCase):
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
        
        # Create tienda and pedido
        self.tienda = Tienda.objects.create(
            nombre="Tienda Test",
            direccion="Calle 123",
            administrador=self.admin
        )
        
        self.pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda,
            total=100.00
        )
        
        # Create payment method and state
        self.metodo_pago = MetodoPago.objects.create(
            nombre="Tarjeta de Crédito",
            activo=True
        )
        self.estado_pendiente = EstadoPago.objects.create(
            nombre="Pendiente",
            descripcion="Pago pendiente de confirmación"
        )
        self.estado_aprobado = EstadoPago.objects.create(
            nombre="Aprobado",
            descripcion="Pago confirmado"
        )

    def test_create_pago(self):
        """Test creating a payment"""
        self.client.force_authenticate(user=self.cliente)
        url = reverse('pago-list')
        data = {
            "pedido": self.pedido.id,
            "monto": 100.00,
            "estado": self.estado_pendiente.id,
            "metodo_pago": self.metodo_pago.id
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Pago.objects.count(), 1)
        
        # Verify usuario is automatically assigned
        pago = Pago.objects.first()
        self.assertEqual(pago.usuario, self.cliente)

    def test_list_pagos_cliente(self):
        """Test that cliente can only see their own payments"""
        # Create payment for cliente
        Pago.objects.create(
            usuario=self.cliente,
            pedido=self.pedido,
            monto=100.00,
            estado=self.estado_pendiente,
            metodo_pago=self.metodo_pago
        )
        
        # Create another user and payment
        otro_cliente = User.objects.create_user(
            email="otro@test.com",
            nombre="Otro Cliente",
            password="otro123",
            rol="cliente"
        )
        otro_pedido = Pedido.objects.create(
            cliente=otro_cliente,
            tienda=self.tienda,
            total=50.00
        )
        Pago.objects.create(
            usuario=otro_cliente,
            pedido=otro_pedido,
            monto=50.00,
            estado=self.estado_pendiente,
            metodo_pago=self.metodo_pago
        )
        
        # Cliente should only see their own payment
        self.client.force_authenticate(user=self.cliente)
        url = reverse('pago-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_list_pagos_admin(self):
        """Test that admin can see all payments"""
        Pago.objects.create(
            usuario=self.cliente,
            pedido=self.pedido,
            monto=100.00,
            estado=self.estado_pendiente,
            metodo_pago=self.metodo_pago
        )
        
        self.client.force_authenticate(user=self.admin)
        url = reverse('pago-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_consultar_estado_pago(self):
        """Test querying payment status"""
        pago = Pago.objects.create(
            usuario=self.cliente,
            pedido=self.pedido,
            monto=100.00,
            estado=self.estado_aprobado,
            metodo_pago=self.metodo_pago
        )
        
        self.client.force_authenticate(user=self.cliente)
        url = reverse('pago-estado', kwargs={'pk': pago.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['estado'], 'Aprobado')

    def test_registrar_transaccion(self):
        """Test registering a transaction for a payment"""
        pago = Pago.objects.create(
            usuario=self.cliente,
            pedido=self.pedido,
            monto=100.00,
            estado=self.estado_pendiente,
            metodo_pago=self.metodo_pago
        )
        
        self.client.force_authenticate(user=self.cliente)
        url = reverse('pago-transaccion')
        data = {
            "pago_id": pago.id,
            "monto": 100.00,
            "referencia_externa": "TXN123456",
            "estado": "aprobado",
            "respuesta_gateway": {"status": "success"}
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Transaccion.objects.count(), 1)

    def test_metodos_pago_activos(self):
        """Test listing active payment methods"""
        # Create inactive method
        MetodoPago.objects.create(nombre="Método Inactivo", activo=False)
        
        self.client.force_authenticate(user=self.cliente)
        url = reverse('metodopago-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Should only return active methods
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nombre'], 'Tarjeta de Crédito')

    def test_pago_sin_autenticacion(self):
        """Test that unauthenticated users cannot create payments"""
        url = reverse('pago-list')
        data = {
            "pedido": self.pedido.id,
            "monto": 100.00,
            "estado": self.estado_pendiente.id,
            "metodo_pago": self.metodo_pago.id
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
