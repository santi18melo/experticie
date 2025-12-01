from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from apps.productos.models import Tienda, Producto, Pedido, DetallePedido

User = get_user_model()

class TestProductosAudit(APITestCase):
    def setUp(self):
        # Create users with different roles
        self.admin = User.objects.create_user(
            email="admin@test.com",
            nombre="Admin User",
            password="admin123",
            rol="admin"
        )
        self.proveedor = User.objects.create_user(
            email="proveedor@test.com",
            nombre="Proveedor User",
            password="prov123",
            rol="proveedor"
        )
        self.cliente = User.objects.create_user(
            email="cliente@test.com",
            nombre="Cliente User",
            password="client123",
            rol="cliente"
        )
        
        # Create a tienda
        self.tienda = Tienda.objects.create(
            nombre="Tienda Test",
            direccion="Calle 123",
            administrador=self.admin
        )
        
        # Create a producto
        self.producto = Producto.objects.create(
            nombre="Producto Test",
            descripcion="Descripción test",
            precio=10.00,
            stock=100,
            tienda=self.tienda,
            proveedor=self.proveedor
        )

    def test_list_productos_public(self):
        """Test that products can be listed without authentication"""
        url = reverse('producto-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_producto_admin(self):
        """Test that admin can create products"""
        self.client.force_authenticate(user=self.admin)
        url = reverse('producto-list')
        data = {
            "nombre": "Nuevo Producto",
            "descripcion": "Nueva descripción",
            "precio": 15.00,
            "stock": 50,
            "tienda": self.tienda.id,
            "proveedor": self.proveedor.id
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Producto.objects.count(), 2)

    def test_create_producto_cliente_forbidden(self):
        """Test that cliente cannot create products"""
        self.client.force_authenticate(user=self.cliente)
        url = reverse('producto-list')
        data = {
            "nombre": "Producto Ilegal",
            "descripcion": "No debería crearse",
            "precio": 10.00,
            "stock": 10,
            "tienda": self.tienda.id,
            "proveedor": self.proveedor.id
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_ajustar_stock_proveedor(self):
        """Test that proveedor can adjust stock"""
        self.client.force_authenticate(user=self.proveedor)
        url = reverse('producto-ajustar-stock', kwargs={'pk': self.producto.id})
        data = {"cantidad": 10, "operacion": "aumentar"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.producto.refresh_from_db()
        self.assertEqual(self.producto.stock, 110)

    def test_ajustar_stock_insuficiente(self):
        """Test that reducing stock beyond available fails"""
        self.client.force_authenticate(user=self.admin)
        url = reverse('producto-ajustar-stock', kwargs={'pk': self.producto.id})
        data = {"cantidad": 200, "operacion": "reducir"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TestPedidosAudit(APITestCase):
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
            precio=10.00,
            stock=100,
            tienda=self.tienda,
            proveedor=self.proveedor
        )

    def test_crear_pedido_cliente(self):
        """Test that cliente can create an order"""
        from apps.pagos.models import MetodoPago, EstadoPago
        
        # Create payment method and state
        metodo = MetodoPago.objects.create(nombre="Efectivo", activo=True)
        estado = EstadoPago.objects.create(nombre="Pendiente")
        
        self.client.force_authenticate(user=self.cliente)
        url = reverse('pedido-crear-pedido')
        data = {
            "tienda_id": self.tienda.id,
            "detalles": [
                {"producto": self.producto.id, "cantidad": 2}
            ],
            "notas": "Entrega rápida",
            "metodo_pago": "Efectivo",
            "monto_pago": 20.00
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Pedido.objects.count(), 1)
        
        # Verify stock was reduced
        self.producto.refresh_from_db()
        self.assertEqual(self.producto.stock, 98)

    def test_crear_pedido_sin_autenticacion(self):
        """Test that unauthenticated users cannot create orders"""
        url = reverse('pedido-crear-pedido')
        data = {
            "tienda_id": self.tienda.id,
            "detalles": [{"producto": self.producto.id, "cantidad": 1}],
            "metodo_pago": "Efectivo",
            "monto_pago": 10.00
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_cambiar_estado_pedido(self):
        """Test changing order status"""
        from apps.pagos.models import MetodoPago, EstadoPago
        
        metodo = MetodoPago.objects.create(nombre="Efectivo", activo=True)
        estado = EstadoPago.objects.create(nombre="Pendiente")
        
        pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda,
            estado="pendiente"
        )
        
        self.client.force_authenticate(user=self.admin)
        url = reverse('pedido-cambiar-estado', kwargs={'pk': pedido.id})
        data = {"estado": "preparando"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        pedido.refresh_from_db()
        self.assertEqual(pedido.estado, "preparando")


class TestTiendasAudit(APITestCase):
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

    def test_create_tienda_admin(self):
        """Test that admin can create stores"""
        self.client.force_authenticate(user=self.admin)
        url = reverse('tienda-list')
        data = {
            "nombre": "Nueva Tienda",
            "direccion": "Calle Nueva 456",
            "telefono": "1234567890",
            "administrador": self.admin.id
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Tienda.objects.count(), 1)

    def test_create_tienda_cliente_forbidden(self):
        """Test that cliente cannot create stores"""
        self.client.force_authenticate(user=self.cliente)
        url = reverse('tienda-list')
        data = {
            "nombre": "Tienda Ilegal",
            "direccion": "No debería existir",
            "administrador": self.admin.id
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_tiendas_authenticated(self):
        """Test that authenticated users can list stores"""
        Tienda.objects.create(
            nombre="Tienda Test",
            direccion="Calle 123",
            administrador=self.admin
        )
        
        self.client.force_authenticate(user=self.cliente)
        url = reverse('tienda-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
