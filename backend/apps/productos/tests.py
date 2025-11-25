from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from decimal import Decimal
from apps.usuarios.models import Usuario
from .models import Tienda, Producto, Pedido, DetallePedido


class TiendaTestCase(TestCase):
    """Tests para el modelo y API de Tienda."""

    def setUp(self):
        """Configuración inicial para cada test."""
        self.client = APIClient()
        self.admin = Usuario.objects.create_user(
            email='admin@test.com',
            nombre='Admin Test',
            password='admin123',
            rol='admin'
        )
        self.tienda = Tienda.objects.create(
            nombre='Tienda Test',
            direccion='Calle Test 123',
            administrador=self.admin
        )

    def test_crear_tienda(self):
        """Test: Crear una tienda."""
        self.assertEqual(self.tienda.nombre, 'Tienda Test')
        self.assertEqual(self.tienda.administrador, self.admin)

    def test_listar_tiendas(self):
        """Test: Listar tiendas (requiere autenticación)."""
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/tiendas/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)


class ProductoTestCase(TestCase):
    """Tests para el modelo y API de Producto."""

    def setUp(self):
        """Configuración inicial para cada test."""
        self.client = APIClient()
        self.admin = Usuario.objects.create_user(
            email='admin@test.com',
            nombre='Admin Test',
            password='admin123',
            rol='admin'
        )
        self.proveedor = Usuario.objects.create_user(
            email='proveedor@test.com',
            nombre='Proveedor Test',
            password='prov123',
            rol='proveedor'
        )
        self.tienda = Tienda.objects.create(
            nombre='Tienda Test',
            direccion='Calle Test 123',
            administrador=self.admin
        )
        self.producto = Producto.objects.create(
            nombre='Laptop Test',
            descripcion='Laptop de prueba',
            precio=Decimal('999.99'),
            stock=10,
            tienda=self.tienda,
            proveedor=self.proveedor
        )

    def test_crear_producto(self):
        """Test: Crear un producto."""
        self.assertEqual(self.producto.nombre, 'Laptop Test')
        self.assertEqual(self.producto.stock, 10)
        self.assertEqual(str(self.producto.precio), '999.99')

    def test_reducir_stock(self):
        """Test: Reducir stock de un producto."""
        nuevo_stock = self.producto.reducir_stock(3)
        self.assertEqual(nuevo_stock, 7)
        self.producto.refresh_from_db()
        self.assertEqual(self.producto.stock, 7)

    def test_reducir_stock_insuficiente(self):
        """Test: No se puede reducir stock más de lo disponible."""
        with self.assertRaises(ValueError):
            self.producto.reducir_stock(20)

    def test_aumentar_stock(self):
        """Test: Aumentar stock de un producto."""
        nuevo_stock = self.producto.aumentar_stock(5)
        self.assertEqual(nuevo_stock, 15)

    def test_listar_productos_cliente(self):
        """Test: Cliente puede ver catálogo de productos."""
        cliente = Usuario.objects.create_user(
            email='cliente@test.com',
            nombre='Cliente Test',
            password='cliente123',
            rol='cliente'
        )
        self.client.force_authenticate(user=cliente)
        response = self.client.get('/api/productos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_listar_productos_proveedor(self):
        """Test: Proveedor solo ve sus propios productos."""
        self.client.force_authenticate(user=self.proveedor)
        response = self.client.get('/api/productos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Debe tener al menos el producto que creó
        self.assertGreaterEqual(len(response.data), 1)


class PedidoTestCase(TestCase):
    """Tests para el modelo y API de Pedido."""

    def setUp(self):
        """Configuración inicial para cada test."""
        self.client = APIClient()
        self.admin = Usuario.objects.create_user(
            email='admin@test.com',
            nombre='Admin Test',
            password='admin123',
            rol='admin'
        )
        self.proveedor = Usuario.objects.create_user(
            email='proveedor@test.com',
            nombre='Proveedor Test',
            password='prov123',
            rol='proveedor'
        )
        self.cliente = Usuario.objects.create_user(
            email='cliente@test.com',
            nombre='Cliente Test',
            password='cliente123',
            rol='cliente'
        )
        self.comprador = Usuario.objects.create_user(
            email='comprador@test.com',
            nombre='Comprador Test',
            password='comprador123',
            rol='comprador'
        )
        self.tienda = Tienda.objects.create(
            nombre='Tienda Test',
            direccion='Calle Test 123',
            administrador=self.admin
        )
        self.producto = Producto.objects.create(
            nombre='Laptop Test',
            descripcion='Laptop de prueba',
            precio=Decimal('999.99'),
            stock=10,
            tienda=self.tienda,
            proveedor=self.proveedor
        )

    def test_crear_pedido(self):
        """Test: Crear un pedido (cliente autenticado)."""
        self.client.force_authenticate(user=self.cliente)
        response = self.client.post('/api/pedidos/crear_pedido/', {
            'tienda_id': self.tienda.id,
            'detalles': [
                {'producto': self.producto.id, 'cantidad': 2}
            ],
            'notas': 'Test pedido'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['estado'], 'pendiente')
        self.assertEqual(response.data['total'], '1999.98')

    def test_crear_pedido_stock_insuficiente(self):
        """Test: No crear pedido si no hay stock suficiente."""
        self.client.force_authenticate(user=self.cliente)
        response = self.client.post('/api/pedidos/crear_pedido/', {
            'tienda_id': self.tienda.id,
            'detalles': [
                {'producto': self.producto.id, 'cantidad': 20}
            ]
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_stock_se_reduce_al_crear_pedido(self):
        """Test: Stock se reduce automáticamente al crear pedido."""
        stock_inicial = self.producto.stock
        self.client.force_authenticate(user=self.cliente)
        self.client.post('/api/pedidos/crear_pedido/', {
            'tienda_id': self.tienda.id,
            'detalles': [
                {'producto': self.producto.id, 'cantidad': 3}
            ]
        }, format='json')
        self.producto.refresh_from_db()
        self.assertEqual(self.producto.stock, stock_inicial - 3)

    def test_cambiar_estado_pedido_comprador(self):
        """Test: Comprador puede cambiar a 'preparando'."""
        pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda,
            estado='pendiente'
        )
        DetallePedido.objects.create(
            pedido=pedido,
            producto=self.producto,
            cantidad=1,
            precio_unitario=self.producto.precio
        )

        self.client.force_authenticate(user=self.comprador)
        response = self.client.post(f'/api/pedidos/{pedido.id}/cambiar_estado/', {
            'estado': 'preparando'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        pedido.refresh_from_db()
        self.assertEqual(pedido.estado, 'preparando')

    def test_cancelar_pedido_restaura_stock(self):
        """Test: Cancelar pedido restaura el stock."""
        pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda,
            estado='pendiente'
        )
        self.producto.reducir_stock(2)
        DetallePedido.objects.create(
            pedido=pedido,
            producto=self.producto,
            cantidad=2,
            precio_unitario=self.producto.precio
        )

        stock_inicial = self.producto.stock

        self.client.force_authenticate(user=self.admin)
        response = self.client.post(f'/api/pedidos/{pedido.id}/cambiar_estado/', {
            'estado': 'cancelado'
        }, format='json')

        self.producto.refresh_from_db()
        self.assertEqual(self.producto.stock, stock_inicial + 2)

    def test_cliente_solo_ve_sus_pedidos(self):
        """Test: Cliente solo puede ver sus propios pedidos."""
        # Limpiar pedidos previos
        Pedido.objects.filter(cliente=self.cliente).delete()
        
        otro_cliente = Usuario.objects.create_user(
            email='otro@test.com',
            nombre='Otro Cliente',
            password='otro123',
            rol='cliente'
        )
        
        # Crear pedido para cliente 1
        pedido1 = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda,
            estado='pendiente'
        )
        
        # Crear pedido para cliente 2
        pedido2 = Pedido.objects.create(
            cliente=otro_cliente,
            tienda=self.tienda,
            estado='pendiente'
        )

        # Cliente 1 ve solo su pedido
        self.client.force_authenticate(user=self.cliente)
        response = self.client.get('/api/pedidos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # La respuesta puede estar paginada (results) o ser una lista
        data = response.data if isinstance(response.data, list) else response.data.get('results', response.data)
        pedidos_ids = [p['id'] for p in data]
        self.assertIn(pedido1.id, pedidos_ids)

        # Cliente 2 ve solo su pedido, no el de cliente 1
        self.client.force_authenticate(user=otro_cliente)
        response = self.client.get('/api/pedidos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data if isinstance(response.data, list) else response.data.get('results', response.data)
        pedidos_ids = [p['id'] for p in data]
        self.assertIn(pedido2.id, pedidos_ids)
        self.assertNotIn(pedido1.id, pedidos_ids)


class DetallePedidoTestCase(TestCase):
    """Tests para el modelo DetallePedido."""

    def setUp(self):
        """Configuración inicial para cada test."""
        self.admin = Usuario.objects.create_user(
            email='admin@test.com',
            nombre='Admin Test',
            password='admin123',
            rol='admin'
        )
        self.proveedor = Usuario.objects.create_user(
            email='proveedor@test.com',
            nombre='Proveedor Test',
            password='prov123',
            rol='proveedor'
        )
        self.cliente = Usuario.objects.create_user(
            email='cliente@test.com',
            nombre='Cliente Test',
            password='cliente123',
            rol='cliente'
        )
        self.tienda = Tienda.objects.create(
            nombre='Tienda Test',
            direccion='Calle Test 123',
            administrador=self.admin
        )
        self.producto = Producto.objects.create(
            nombre='Laptop Test',
            descripcion='Laptop de prueba',
            precio=Decimal('999.99'),
            stock=10,
            tienda=self.tienda,
            proveedor=self.proveedor
        )
        self.pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda,
            estado='pendiente'
        )

    def test_crear_detalle_pedido(self):
        """Test: Crear un detalle de pedido."""
        detalle = DetallePedido.objects.create(
            pedido=self.pedido,
            producto=self.producto,
            cantidad=2,
            precio_unitario=self.producto.precio
        )
        self.assertEqual(detalle.cantidad, 2)
        self.assertEqual(detalle.subtotal, Decimal('1999.98'))

    def test_subtotal_calculado(self):
        """Test: Subtotal se calcula correctamente."""
        detalle = DetallePedido.objects.create(
            pedido=self.pedido,
            producto=self.producto,
            cantidad=3,
            precio_unitario=Decimal('100.00')
        )
        self.assertEqual(detalle.subtotal, Decimal('300.00'))

    def test_detalle_actualiza_total_pedido(self):
        """Test: Agregar detalle actualiza el total del pedido."""
        DetallePedido.objects.create(
            pedido=self.pedido,
            producto=self.producto,
            cantidad=2,
            precio_unitario=self.producto.precio
        )
        self.pedido.refresh_from_db()
        self.assertEqual(self.pedido.total, Decimal('1999.98'))


class PermisoTestCase(TestCase):
    """Tests para permisos y autenticación."""

    def setUp(self):
        """Configuración inicial para cada test."""
        self.client = APIClient()
        self.usuario_no_autenticado = None

    def test_no_autenticado_no_puede_ver_productos(self):
        """Test: Usuario no autenticado no puede ver productos."""
        response = self.client.get('/api/productos/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_no_autenticado_no_puede_crear_pedido(self):
        """Test: Usuario no autenticado no puede crear pedidos."""
        response = self.client.post('/api/pedidos/crear_pedido/', {})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
