from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.productos.models import Tienda, Producto, Pedido, DetallePedido
from decimal import Decimal

User = get_user_model()

class TestTiendaModel(TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            email="admin@test.com",
            nombre="Admin",
            password="admin123",
            rol="admin"
        )

    def test_create_tienda(self):
        """Test creating a tienda"""
        tienda = Tienda.objects.create(
            nombre="Mi Tienda",
            direccion="Calle 123",
            telefono="1234567890",
            administrador=self.admin
        )
        self.assertEqual(tienda.nombre, "Mi Tienda")
        self.assertTrue(tienda.activa)
        self.assertEqual(str(tienda), f"Mi Tienda - {self.admin.nombre}")

    def test_tienda_ordering(self):
        """Test that tiendas are ordered by creation date (newest first)"""
        tienda1 = Tienda.objects.create(
            nombre="Tienda 1",
            direccion="Calle 1",
            administrador=self.admin
        )
        tienda2 = Tienda.objects.create(
            nombre="Tienda 2",
            direccion="Calle 2",
            administrador=self.admin
        )
        
        tiendas = list(Tienda.objects.all())
        self.assertEqual(tiendas[0], tienda2)
        self.assertEqual(tiendas[1], tienda1)


class TestProductoModel(TestCase):
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

    def test_create_producto(self):
        """Test creating a producto"""
        producto = Producto.objects.create(
            nombre="Producto Test",
            descripcion="Descripción test",
            precio=Decimal("10.50"),
            stock=100,
            tienda=self.tienda,
            proveedor=self.proveedor,
            es_basico=True,
            categoria="alimentos"
        )
        self.assertEqual(producto.nombre, "Producto Test")
        self.assertEqual(producto.precio, Decimal("10.50"))
        self.assertTrue(producto.activo)
        self.assertEqual(str(producto), "Producto Test - $10.50")

    def test_reducir_stock(self):
        """Test reducing stock"""
        producto = Producto.objects.create(
            nombre="Producto Test",
            descripcion="Desc",
            precio=Decimal("10.00"),
            stock=100,
            tienda=self.tienda,
            proveedor=self.proveedor
        )
        
        nuevo_stock = producto.reducir_stock(20)
        self.assertEqual(nuevo_stock, 80)
        producto.refresh_from_db()
        self.assertEqual(producto.stock, 80)

    def test_reducir_stock_insuficiente(self):
        """Test reducing stock beyond available raises error"""
        producto = Producto.objects.create(
            nombre="Producto Test",
            descripcion="Desc",
            precio=Decimal("10.00"),
            stock=10,
            tienda=self.tienda,
            proveedor=self.proveedor
        )
        
        with self.assertRaises(ValueError) as context:
            producto.reducir_stock(20)
        
        self.assertIn("Stock insuficiente", str(context.exception))

    def test_aumentar_stock(self):
        """Test increasing stock"""
        producto = Producto.objects.create(
            nombre="Producto Test",
            descripcion="Desc",
            precio=Decimal("10.00"),
            stock=100,
            tienda=self.tienda,
            proveedor=self.proveedor
        )
        
        nuevo_stock = producto.aumentar_stock(50)
        self.assertEqual(nuevo_stock, 150)
        producto.refresh_from_db()
        self.assertEqual(producto.stock, 150)

    def test_producto_unique_together(self):
        """Test that productos with same name in same tienda are not allowed"""
        Producto.objects.create(
            nombre="Producto Duplicado",
            descripcion="Desc",
            precio=Decimal("10.00"),
            stock=100,
            tienda=self.tienda,
            proveedor=self.proveedor
        )
        
        with self.assertRaises(Exception):
            Producto.objects.create(
                nombre="Producto Duplicado",
                descripcion="Otra desc",
                precio=Decimal("15.00"),
                stock=50,
                tienda=self.tienda,
                proveedor=self.proveedor
            )


class TestPedidoModel(TestCase):
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

    def test_create_pedido(self):
        """Test creating a pedido"""
        pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda,
            notas="Entrega rápida"
        )
        self.assertEqual(pedido.estado, "pendiente")
        self.assertEqual(pedido.total, Decimal("0"))
        self.assertEqual(str(pedido), f"Pedido #{pedido.id} - {self.cliente.nombre} (pendiente)")

    def test_calcular_total(self):
        """Test calculating pedido total"""
        pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda
        )
        
        producto2 = Producto.objects.create(
            nombre="Producto Test 2",
            descripcion="Desc 2",
            precio=Decimal("20.00"),
            stock=100,
            tienda=self.tienda,
            proveedor=self.proveedor
        )
        
        DetallePedido.objects.create(
            pedido=pedido,
            producto=self.producto,
            cantidad=2,
            precio_unitario=Decimal("10.00")
        )
        DetallePedido.objects.create(
            pedido=pedido,
            producto=producto2,
            cantidad=3,
            precio_unitario=Decimal("20.00")
        )
        
        total = pedido.calcular_total()
        self.assertEqual(total, Decimal("80.00"))

    def test_puede_cambiar_a_preparando(self):
        """Test state transition to preparando"""
        pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda,
            estado="pendiente"
        )
        self.assertTrue(pedido.puede_cambiar_a_preparando())
        
        pedido.estado = "preparando"
        pedido.save()
        self.assertFalse(pedido.puede_cambiar_a_preparando())

    def test_puede_cambiar_a_en_transito(self):
        """Test state transition to en_transito"""
        pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda,
            estado="preparando"
        )
        self.assertTrue(pedido.puede_cambiar_a_en_transito())
        
        pedido.estado = "pendiente"
        pedido.save()
        self.assertFalse(pedido.puede_cambiar_a_en_transito())

    def test_puede_cambiar_a_entregado(self):
        """Test state transition to entregado"""
        pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=self.tienda,
            estado="en_transito"
        )
        self.assertTrue(pedido.puede_cambiar_a_entregado())
        
        pedido.estado = "preparando"
        pedido.save()
        self.assertFalse(pedido.puede_cambiar_a_entregado())


class TestDetallePedidoModel(TestCase):
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

    def test_create_detalle_pedido(self):
        """Test creating a detalle pedido"""
        detalle = DetallePedido.objects.create(
            pedido=self.pedido,
            producto=self.producto,
            cantidad=5,
            precio_unitario=Decimal("10.00")
        )
        self.assertEqual(detalle.cantidad, 5)
        self.assertEqual(detalle.subtotal, Decimal("50.00"))

    def test_detalle_pedido_updates_total(self):
        """Test that creating detalle updates pedido total"""
        DetallePedido.objects.create(
            pedido=self.pedido,
            producto=self.producto,
            cantidad=3,
            precio_unitario=Decimal("10.00")
        )
        
        self.pedido.refresh_from_db()
        self.assertEqual(self.pedido.total, Decimal("30.00"))

    def test_delete_detalle_updates_total(self):
        """Test that deleting detalle updates pedido total"""
        detalle = DetallePedido.objects.create(
            pedido=self.pedido,
            producto=self.producto,
            cantidad=5,
            precio_unitario=Decimal("10.00")
        )
        
        self.pedido.refresh_from_db()
        self.assertEqual(self.pedido.total, Decimal("50.00"))
        
        detalle.delete()
        
        self.pedido.refresh_from_db()
        self.assertEqual(self.pedido.total, Decimal("0.00"))

    def test_detalle_pedido_unique_together(self):
        """Test that duplicate producto in same pedido is not allowed"""
        DetallePedido.objects.create(
            pedido=self.pedido,
            producto=self.producto,
            cantidad=2,
            precio_unitario=Decimal("10.00")
        )
        
        with self.assertRaises(Exception):
            DetallePedido.objects.create(
                pedido=self.pedido,
                producto=self.producto,
                cantidad=3,
                precio_unitario=Decimal("10.00")
            )
