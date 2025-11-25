from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.usuarios.backends import EmailBackend

User = get_user_model()

class TestEmailBackend(TestCase):
    def setUp(self):
        self.backend = EmailBackend()
        self.user = User.objects.create_user(
            email="test@example.com",
            nombre="Test User",
            password="testpass123",
            rol="cliente"
        )

    def test_authenticate_with_email_success(self):
        """Test successful authentication with email"""
        user = self.backend.authenticate(
            request=None,
            username="test@example.com",
            password="testpass123"
        )
        self.assertIsNotNone(user)
        self.assertEqual(user.email, "test@example.com")

    def test_authenticate_with_wrong_password(self):
        """Test authentication fails with wrong password"""
        user = self.backend.authenticate(
            request=None,
            username="test@example.com",
            password="wrongpassword"
        )
        self.assertIsNone(user)

    def test_authenticate_with_nonexistent_email(self):
        """Test authentication fails with nonexistent email"""
        user = self.backend.authenticate(
            request=None,
            username="nonexistent@example.com",
            password="testpass123"
        )
        self.assertIsNone(user)

    def test_authenticate_with_none_username(self):
        """Test authentication fails with None username"""
        user = self.backend.authenticate(
            request=None,
            username=None,
            password="testpass123"
        )
        self.assertIsNone(user)

    def test_authenticate_with_none_password(self):
        """Test authentication fails with None password"""
        user = self.backend.authenticate(
            request=None,
            username="test@example.com",
            password=None
        )
        self.assertIsNone(user)

    def test_authenticate_inactive_user(self):
        """Test authentication fails for inactive user"""
        self.user.is_active = False
        self.user.save()
        
        user = self.backend.authenticate(
            request=None,
            username="test@example.com",
            password="testpass123"
        )
        self.assertIsNone(user)

    def test_authenticate_with_kwargs(self):
        """Test authentication using kwargs for email"""
        user = self.backend.authenticate(
            request=None,
            email="test@example.com",
            password="testpass123"
        )
        self.assertIsNotNone(user)
        self.assertEqual(user.email, "test@example.com")
