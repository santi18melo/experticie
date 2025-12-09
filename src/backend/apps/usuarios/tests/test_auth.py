import json
from django.test import TestCase
from rest_framework.test import APIClient
from apps.usuarios.models import Usuario

class AuthRolesLoginTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.token_url = '/api/auth/login/'
        self.password = 'TestPass123!'

        # 1. Crear Superadmin (is_superuser=True)
        self.superadmin = Usuario.objects.create_superuser(
            email='superadmin@test.com',
            nombre='Super Admin User',
            password=self.password
        )

        # 2. Crear Usuario Admin (rol='admin')
        self.admin_user = Usuario.objects.create_user(
            email='admin@test.com',
            nombre='Admin User',
            password=self.password,
            rol='admin'
        )

        # 3. Crear Usuario Proveedor (rol='proveedor')
        self.proveedor_user = Usuario.objects.create_user(
            email='proveedor@test.com',
            nombre='Proveedor User',
            password=self.password,
            rol='proveedor'
        )

        # 4. Crear Usuario Cliente (rol='cliente')
        self.cliente_user = Usuario.objects.create_user(
            email='cliente@test.com',
            nombre='Cliente User',
            password=self.password,
            rol='cliente'
        )

    def verify_login(self, email, password, role_name):
        """Helper para verificar login y retorno de tokens"""
        response = self.client.post(self.token_url, {
            'email': email,
            'password': password,
        }, format='json')
        
        self.assertEqual(response.status_code, 200, f"Fallo login para {role_name}")
        data = response.json()
        
        # Verificar tokens
        self.assertIn('access', data, f"No access token for {role_name}")
        self.assertIn('refresh', data, f"No refresh token for {role_name}")
        
        # Verificar datos del usuario en la respuesta
        self.assertEqual(data['user']['email'], email)
        print(f"✅ Login exitoso para: {role_name} ({email})")

    def test_login_superadmin(self):
        self.verify_login('superadmin@test.com', self.password, "SUPERADMIN")

    def test_login_admin(self):
        self.verify_login('admin@test.com', self.password, "ADMIN")

    def test_login_proveedor(self):
        self.verify_login('proveedor@test.com', self.password, "PROVEEDOR")

    def test_login_cliente(self):
        self.verify_login('cliente@test.com', self.password, "CLIENTE")
