from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.usuarios.serializers import (
    UsuarioSerializer, RegisterSerializer, LoginSerializer,
    generate_tokens_for_user
)

User = get_user_model()

class TestUsuarioSerializer(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            nombre="Test User",
            password="test123",
            rol="cliente",
            telefono="1234567890",
            direccion="Calle 123"
        )

    def test_usuario_serializer_representation(self):
        """Test UsuarioSerializer representation"""
        serializer = UsuarioSerializer(self.user)
        self.assertEqual(serializer.data['email'], "test@example.com")
        self.assertEqual(serializer.data['nombre'], "Test User")
        self.assertEqual(serializer.data['rol'], "cliente")
        self.assertEqual(serializer.data['telefono'], "1234567890")
        self.assertEqual(serializer.data['direccion'], "Calle 123")

    def test_usuario_serializer_read_only_fields(self):
        """Test that certain fields are read-only"""
        serializer = UsuarioSerializer(self.user)
        self.assertIn('id', serializer.data)
        self.assertIn('fecha_creacion', serializer.data)
        self.assertIn('ultimo_ingreso', serializer.data)


class TestRegisterSerializer(TestCase):
    def test_register_serializer_valid_data(self):
        """Test RegisterSerializer with valid data"""
        data = {
            "email": "newuser@example.com",
            "nombre": "New User",
            "password": "newpass123",
            "rol": "cliente"
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_register_serializer_creates_user(self):
        """Test that RegisterSerializer creates a user"""
        data = {
            "email": "newuser@example.com",
            "nombre": "New User",
            "password": "newpass123",
            "rol": "proveedor"
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        
        self.assertEqual(user.email, "newuser@example.com")
        self.assertEqual(user.nombre, "New User")
        self.assertEqual(user.rol, "proveedor")
        self.assertTrue(user.check_password("newpass123"))

    def test_register_serializer_password_min_length(self):
        """Test that password must be at least 6 characters"""
        data = {
            "email": "newuser@example.com",
            "nombre": "New User",
            "password": "12345",  # Too short
            "rol": "cliente"
        }
        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)

    def test_register_serializer_password_not_in_response(self):
        """Test that password is write-only"""
        data = {
            "email": "newuser@example.com",
            "nombre": "New User",
            "password": "newpass123",
            "rol": "cliente"
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        
        # Serialize the created user
        output_serializer = RegisterSerializer(user)
        self.assertNotIn('password', output_serializer.data)


class TestLoginSerializer(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            nombre="Test User",
            password="testpass123",
            rol="cliente"
        )

    def test_login_serializer_valid_credentials(self):
        """Test LoginSerializer with valid credentials"""
        data = {
            "email": "test@example.com",
            "password": "testpass123"
        }
        serializer = LoginSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data['user'], self.user)

    def test_login_serializer_invalid_password(self):
        """Test LoginSerializer with invalid password"""
        data = {
            "email": "test@example.com",
            "password": "wrongpassword"
        }
        serializer = LoginSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('non_field_errors', serializer.errors)

    def test_login_serializer_invalid_email(self):
        """Test LoginSerializer with invalid email"""
        data = {
            "email": "nonexistent@example.com",
            "password": "testpass123"
        }
        serializer = LoginSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    def test_login_serializer_missing_email(self):
        """Test LoginSerializer with missing email"""
        data = {
            "password": "testpass123"
        }
        serializer = LoginSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)

    def test_login_serializer_missing_password(self):
        """Test LoginSerializer with missing password"""
        data = {
            "email": "test@example.com"
        }
        serializer = LoginSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)


class TestGenerateTokensForUser(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            nombre="Test User",
            password="test123",
            rol="cliente"
        )

    def test_generate_tokens_for_user(self):
        """Test generating tokens for a user"""
        tokens = generate_tokens_for_user(self.user)
        
        self.assertIn('access', tokens)
        self.assertIn('refresh', tokens)
        self.assertIsInstance(tokens['access'], str)
        self.assertIsInstance(tokens['refresh'], str)
        self.assertTrue(len(tokens['access']) > 0)
        self.assertTrue(len(tokens['refresh']) > 0)

    def test_tokens_are_different(self):
        """Test that access and refresh tokens are different"""
        tokens = generate_tokens_for_user(self.user)
        self.assertNotEqual(tokens['access'], tokens['refresh'])
