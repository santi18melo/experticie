from django.test import TestCase, RequestFactory
from django.contrib.auth import get_user_model
from apps.productos.permissions import (
    IsAdmin, IsCliente, IsProveedor, IsComprador, IsLogistica,
    IsAdminOrReadOnly, IsProductoOwnerOrAdmin, IsPedidoOwnerOrAdmin
)
from apps.productos.models import Producto, Pedido, Tienda

User = get_user_model()

class TestPermissions(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        
        # Create users with different roles
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
            email="proveedor@test.com",
            nombre="Proveedor",
            password="prov123",
            rol="proveedor"
        )
        self.comprador = User.objects.create_user(
            email="comprador@test.com",
            nombre="Comprador",
            password="comp123",
            rol="comprador"
        )
        self.logistica = User.objects.create_user(
            email="logistica@test.com",
            nombre="Logistica",
            password="log123",
            rol="logistica"
        )
        self.superuser = User.objects.create_superuser(
            email="super@test.com",
            nombre="Superuser",
            password="super123"
        )

    def test_is_admin_permission(self):
        """Test IsAdmin permission"""
        permission = IsAdmin()
        request = self.factory.get('/')
        
        # Admin should have permission
        request.user = self.admin
        self.assertTrue(permission.has_permission(request, None))
        
        # Superuser should have permission
        request.user = self.superuser
        self.assertTrue(permission.has_permission(request, None))
        
        # Cliente should not have permission
        request.user = self.cliente
        self.assertFalse(permission.has_permission(request, None))

    def test_is_cliente_permission(self):
        """Test IsCliente permission"""
        permission = IsCliente()
        request = self.factory.get('/')
        
        # Cliente should have permission
        request.user = self.cliente
        self.assertTrue(permission.has_permission(request, None))
        
        # Admin should not have permission
        request.user = self.admin
        self.assertFalse(permission.has_permission(request, None))

    def test_is_proveedor_permission(self):
        """Test IsProveedor permission"""
        permission = IsProveedor()
        request = self.factory.get('/')
        
        # Proveedor should have permission
        request.user = self.proveedor
        self.assertTrue(permission.has_permission(request, None))
        
        # Cliente should not have permission
        request.user = self.cliente
        self.assertFalse(permission.has_permission(request, None))

    def test_is_comprador_permission(self):
        """Test IsComprador permission"""
        permission = IsComprador()
        request = self.factory.get('/')
        
        # Comprador should have permission
        request.user = self.comprador
        self.assertTrue(permission.has_permission(request, None))
        
        # Cliente should not have permission
        request.user = self.cliente
        self.assertFalse(permission.has_permission(request, None))

    def test_is_logistica_permission(self):
        """Test IsLogistica permission"""
        permission = IsLogistica()
        request = self.factory.get('/')
        
        # Logistica should have permission
        request.user = self.logistica
        self.assertTrue(permission.has_permission(request, None))
        
        # Cliente should not have permission
        request.user = self.cliente
        self.assertFalse(permission.has_permission(request, None))

    def test_is_admin_or_read_only_permission(self):
        """Test IsAdminOrReadOnly permission"""
        permission = IsAdminOrReadOnly()
        
        # GET request - any authenticated user should have permission
        request = self.factory.get('/')
        request.user = self.cliente
        self.assertTrue(permission.has_permission(request, None))
        
        # POST request - only admin should have permission
        request = self.factory.post('/')
        request.user = self.cliente
        self.assertFalse(permission.has_permission(request, None))
        
        request.user = self.admin
        self.assertTrue(permission.has_permission(request, None))

    def test_is_producto_owner_or_admin_permission(self):
        """Test IsProductoOwnerOrAdmin permission"""
        permission = IsProductoOwnerOrAdmin()
        
        # Create tienda and producto
        tienda = Tienda.objects.create(
            nombre="Tienda Test",
            direccion="Calle 123",
            administrador=self.admin
        )
        producto = Producto.objects.create(
            nombre="Producto Test",
            descripcion="Desc",
            precio=10.00,
            stock=100,
            tienda=tienda,
            proveedor=self.proveedor
        )
        
        request = self.factory.get('/')
        
        # Proveedor owner should have permission
        request.user = self.proveedor
        self.assertTrue(permission.has_object_permission(request, None, producto))
        
        # Admin should have permission
        request.user = self.admin
        self.assertTrue(permission.has_object_permission(request, None, producto))
        
        # Other proveedor should not have permission
        otro_proveedor = User.objects.create_user(
            email="otro@test.com",
            nombre="Otro",
            password="otro123",
            rol="proveedor"
        )
        request.user = otro_proveedor
        self.assertFalse(permission.has_object_permission(request, None, producto))

    def test_is_pedido_owner_or_admin_permission(self):
        """Test IsPedidoOwnerOrAdmin permission"""
        permission = IsPedidoOwnerOrAdmin()
        
        # Create tienda and pedido
        tienda = Tienda.objects.create(
            nombre="Tienda Test",
            direccion="Calle 123",
            administrador=self.admin
        )
        pedido = Pedido.objects.create(
            cliente=self.cliente,
            tienda=tienda
        )
        
        request = self.factory.get('/')
        
        # Cliente owner should have permission
        request.user = self.cliente
        self.assertTrue(permission.has_object_permission(request, None, pedido))
        
        # Admin should have permission
        request.user = self.admin
        self.assertTrue(permission.has_object_permission(request, None, pedido))
        
        # Other cliente should not have permission
        otro_cliente = User.objects.create_user(
            email="otro@test.com",
            nombre="Otro",
            password="otro123",
            rol="cliente"
        )
        request.user = otro_cliente
        self.assertFalse(permission.has_object_permission(request, None, pedido))

    def test_unauthenticated_user_permissions(self):
        """Test that unauthenticated users are denied"""
        from django.contrib.auth.models import AnonymousUser
        
        permissions = [
            IsAdmin(), IsCliente(), IsProveedor(), 
            IsComprador(), IsLogistica(), IsAdminOrReadOnly()
        ]
        
        request = self.factory.get('/')
        request.user = AnonymousUser()
        
        for permission in permissions:
            self.assertFalse(permission.has_permission(request, None))
