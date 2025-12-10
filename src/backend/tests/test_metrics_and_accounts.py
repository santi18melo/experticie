"""
Tests para el endpoint de métricas en tiempo real.
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

Usuario = get_user_model()


class LiveMetricsTestCase(TestCase):
    """Tests para el endpoint de métricas en tiempo real."""
    
    def setUp(self):
        """Configuración inicial para los tests."""
        self.client = APIClient()
        
        # Crear usuario admin
        self.admin = Usuario.objects.create_user(
            email='admin@test.com',
            nombre='Admin Test',
            password='testpass123',
            rol='admin',
            is_staff=True
        )
        
        # Crear usuario no-admin
        self.user = Usuario.objects.create_user(
            email='user@test.com',
            nombre='User Test',
            password='testpass123',
            rol='cliente'
        )
    
    def test_metrics_requires_authentication(self):
        """El endpoint requiere autenticación."""
        response = self.client.get('/api/usuarios/admin/metrics/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_metrics_requires_admin(self):
        """El endpoint requiere permisos de administrador."""
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/usuarios/admin/metrics/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_metrics_success(self):
        """Admin puede acceder a las métricas."""
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/usuarios/admin/metrics/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('sales', response.data)
        self.assertIn('users', response.data)
        self.assertIn('platform', response.data)
    
    def test_metrics_sales_structure(self):
        """La estructura de ventas es correcta."""
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/usuarios/admin/metrics/')
        
        sales = response.data['sales']
        self.assertIn('total_orders', sales)
        self.assertIn('total_revenue', sales)
        self.assertIn('top_products', sales)
        self.assertIn('bottom_products', sales)
    
    def test_metrics_users_structure(self):
        """La estructura de usuarios es correcta."""
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/usuarios/admin/metrics/')
        
        users = response.data['users']
        self.assertIn('active', users)
        self.assertIn('inactive', users)
        self.assertIn('new_users', users)
    
    def test_metrics_platform_structure(self):
        """La estructura de plataforma es correcta."""
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/usuarios/admin/metrics/')
        
        platform = response.data['platform']
        self.assertIn('cpu_load', platform)
        self.assertIn('memory_usage', platform)
        self.assertIn('disk_usage', platform)
        self.assertIn('server_time', platform)
    
    def test_metrics_time_range_20s(self):
        """Filtro de 20 segundos funciona correctamente."""
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/usuarios/admin/metrics/?range=20s')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['range'], '20s')
    
    def test_metrics_time_range_1h(self):
        """Filtro de 1 hora funciona correctamente."""
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/usuarios/admin/metrics/?range=1h')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['range'], '1h')
    
    def test_metrics_time_range_1y(self):
        """Filtro de 1 año funciona correctamente."""
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/usuarios/admin/metrics/?range=1y')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['range'], '1y')
    
    def test_metrics_user_counts(self):
        """Los contadores de usuarios son correctos."""
        # Crear usuarios adicionales
        Usuario.objects.create_user(
            email='active@test.com',
            nombre='Active User',
            password='test123',
            rol='cliente',
            estado=True
        )
        
        Usuario.objects.create_user(
            email='inactive@test.com',
            nombre='Inactive User',
            password='test123',
            rol='cliente',
            estado=False
        )
        
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/usuarios/admin/metrics/')
        
        users = response.data['users']
        # admin + user + active = 3 activos
        self.assertGreaterEqual(users['active'], 3)
        # inactive = 1 inactivo
        self.assertGreaterEqual(users['inactive'], 1)
    
    def test_metrics_platform_values_are_numeric(self):
        """Los valores de plataforma son numéricos."""
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/usuarios/admin/metrics/')
        
        platform = response.data['platform']
        self.assertIsInstance(platform['cpu_load'], (int, float))
        self.assertIsInstance(platform['memory_usage'], (int, float))
        self.assertIsInstance(platform['disk_usage'], (int, float))
        self.assertIsInstance(platform['server_time'], str)


class AccountManagementTestCase(TestCase):
    """Tests para gestión de cuentas."""
    
    def setUp(self):
        """Configuración inicial."""
        self.client = APIClient()
        self.user = Usuario.objects.create_user(
            email='test@test.com',
            nombre='Test User',
            password='testpass123',
            rol='cliente'
        )
    
    def test_self_deactivate_account(self):
        """Usuario puede desactivar su propia cuenta."""
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/usuarios/deactivate/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verificar que el usuario fue desactivado
        self.user.refresh_from_db()
        self.assertFalse(self.user.estado)
        self.assertTrue(self.user.self_deactivated)
    
    def test_deactivate_requires_authentication(self):
        """Desactivación requiere autenticación."""
        response = self.client.post('/api/usuarios/deactivate/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_get_account_status(self):
        """Obtener estado de cuenta."""
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/usuarios/account-status/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('is_active', response.data)
        self.assertIn('self_deactivated', response.data)
        self.assertIn('admin_suspended', response.data)
