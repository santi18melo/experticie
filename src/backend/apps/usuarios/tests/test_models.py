from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.usuarios.models import Usuario

User = get_user_model()

class TestUsuarioModel(TestCase):
    def test_create_user(self):
        """Test creating a regular user"""
        user = User.objects.create_user(
            email="test@example.com",
            nombre="Test User",
            password="testpass123",
            rol="cliente"
        )
        self.assertEqual(user.email, "test@example.com")
        self.assertEqual(user.nombre, "Test User")
        self.assertEqual(user.rol, "cliente")
        self.assertTrue(user.estado)
        self.assertFalse(user.is_staff)
        self.assertTrue(user.check_password("testpass123"))

    def test_create_superuser(self):
        """Test creating a superuser"""
        user = User.objects.create_superuser(
            email="admin@example.com",
            nombre="Admin User",
            password="admin123"
        )
        self.assertEqual(user.email, "admin@example.com")
        self.assertEqual(user.rol, "admin")
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

    def test_usuario_str_representation(self):
        """Test Usuario string representation"""
        user = User.objects.create_user(
            email="test@example.com",
            nombre="Test User",
            password="test123",
            rol="cliente"
        )
        expected = "Test User - Cliente"
        self.assertEqual(str(user), expected)

    def test_usuario_roles(self):
        """Test all available user roles"""
        roles = ["admin", "comprador", "proveedor", "logistica", "cliente"]
        
        for rol in roles:
            user = User.objects.create_user(
                email=f"{rol}@test.com",
                nombre=f"{rol.capitalize()} User",
                password="test123",
                rol=rol
            )
            self.assertEqual(user.rol, rol)

    def test_usuario_email_unique(self):
        """Test that email must be unique"""
        User.objects.create_user(
            email="duplicate@test.com",
            nombre="User 1",
            password="test123"
        )
        
        with self.assertRaises(Exception):
            User.objects.create_user(
                email="duplicate@test.com",
                nombre="User 2",
                password="test123"
            )

    def test_usuario_email_required(self):
        """Test that email is required"""
        with self.assertRaises(ValueError):
            User.objects.create_user(
                email="",
                nombre="Test User",
                password="test123"
            )

    def test_usuario_nombre_required(self):
        """Test that nombre is required"""
        with self.assertRaises(ValueError):
            User.objects.create_user(
                email="test@test.com",
                nombre="",
                password="test123"
            )

    def test_usuario_default_rol(self):
        """Test that default rol is cliente"""
        user = User.objects.create_user(
            email="test@test.com",
            nombre="Test User",
            password="test123"
        )
        self.assertEqual(user.rol, "cliente")

    def test_usuario_optional_fields(self):
        """Test optional fields (telefono, direccion)"""
        user = User.objects.create_user(
            email="test@test.com",
            nombre="Test User",
            password="test123",
            telefono="1234567890",
            direccion="Calle 123"
        )
        self.assertEqual(user.telefono, "1234567890")
        self.assertEqual(user.direccion, "Calle 123")

    def test_usuario_timestamps(self):
        """Test automatic timestamp fields"""
        user = User.objects.create_user(
            email="test@test.com",
            nombre="Test User",
            password="test123"
        )
        self.assertIsNotNone(user.fecha_creacion)
        self.assertIsNone(user.ultimo_ingreso)

    def test_usuario_estado_default_true(self):
        """Test that estado defaults to True"""
        user = User.objects.create_user(
            email="test@test.com",
            nombre="Test User",
            password="test123"
        )
        self.assertTrue(user.estado)

    def test_usuario_password_hashing(self):
        """Test that password is properly hashed"""
        user = User.objects.create_user(
            email="test@test.com",
            nombre="Test User",
            password="plaintext123"
        )
        # Password should not be stored in plain text
        self.assertNotEqual(user.password, "plaintext123")
        # But should validate correctly
        self.assertTrue(user.check_password("plaintext123"))
        self.assertFalse(user.check_password("wrongpassword"))
