from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from apps.notificaciones.models import Notificacion, TipoNotificacion, EstadoNotificacion

User = get_user_model()

class TestNotificacionesAudit(APITestCase):
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
        
        # Create notification types and states
        self.tipo_email = TipoNotificacion.objects.create(
            nombre="Email",
            descripcion="Notificación por correo electrónico"
        )
        self.tipo_sms = TipoNotificacion.objects.create(
            nombre="SMS",
            descripcion="Notificación por SMS"
        )
        
        self.estado_pendiente = EstadoNotificacion.objects.create(
            nombre="Pendiente",
            descripcion="Notificación pendiente de envío"
        )
        self.estado_enviada = EstadoNotificacion.objects.create(
            nombre="Enviada",
            descripcion="Notificación enviada exitosamente"
        )

    def test_create_notificacion(self):
        """Test creating a notification"""
        self.client.force_authenticate(user=self.cliente)
        url = reverse('notificacion-list')
        data = {
            "tipo": self.tipo_email.id,
            "estado": self.estado_pendiente.id,
            "mensaje": "Test notification message",
            "destino": "cliente@test.com"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Notificacion.objects.count(), 1)
        
        # Verify usuario is automatically assigned
        notif = Notificacion.objects.first()
        self.assertEqual(notif.usuario, self.cliente)

    def test_list_notificaciones_usuario(self):
        """Test that users only see their own notifications"""
        # Create notification for cliente
        Notificacion.objects.create(
            usuario=self.cliente,
            tipo=self.tipo_email,
            estado=self.estado_pendiente,
            mensaje="Mensaje para cliente",
            destino="cliente@test.com"
        )
        
        # Create notification for admin
        Notificacion.objects.create(
            usuario=self.admin,
            tipo=self.tipo_email,
            estado=self.estado_pendiente,
            mensaje="Mensaje para admin",
            destino="admin@test.com"
        )
        
        # Cliente should only see their own notification
        self.client.force_authenticate(user=self.cliente)
        url = reverse('notificacion-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['mensaje'], 'Mensaje para cliente')

    def test_marcar_notificacion_leida(self):
        """Test marking a notification as read"""
        notif = Notificacion.objects.create(
            usuario=self.cliente,
            tipo=self.tipo_email,
            estado=self.estado_enviada,
            mensaje="Mensaje de prueba",
            destino="cliente@test.com",
            leida=False
        )
        
        self.client.force_authenticate(user=self.cliente)
        url = reverse('notificacion-marcar-leida', kwargs={'pk': notif.id})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        notif.refresh_from_db()
        self.assertTrue(notif.leida)
        self.assertIsNotNone(notif.fecha_lectura)

    def test_marcar_leida_idempotente(self):
        """Test that marking as read is idempotent"""
        fecha_original = timezone.now()
        notif = Notificacion.objects.create(
            usuario=self.cliente,
            tipo=self.tipo_email,
            estado=self.estado_enviada,
            mensaje="Mensaje de prueba",
            destino="cliente@test.com",
            leida=True,
            fecha_lectura=fecha_original
        )
        
        self.client.force_authenticate(user=self.cliente)
        url = reverse('notificacion-marcar-leida', kwargs={'pk': notif.id})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        notif.refresh_from_db()
        self.assertTrue(notif.leida)
        # Fecha should remain the same
        self.assertEqual(notif.fecha_lectura, fecha_original)

    def test_list_tipos_notificacion(self):
        """Test listing notification types"""
        self.client.force_authenticate(user=self.cliente)
        url = reverse('tiponotificacion-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_list_estados_notificacion(self):
        """Test listing notification states"""
        self.client.force_authenticate(user=self.cliente)
        url = reverse('estadonotificacion-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_notificacion_sin_autenticacion(self):
        """Test that unauthenticated users cannot access notifications"""
        url = reverse('notificacion-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_notificacion_ordering(self):
        """Test that notifications are ordered by creation date (newest first)"""
        # Create multiple notifications
        notif1 = Notificacion.objects.create(
            usuario=self.cliente,
            tipo=self.tipo_email,
            estado=self.estado_pendiente,
            mensaje="Primera notificación",
            destino="cliente@test.com"
        )
        notif2 = Notificacion.objects.create(
            usuario=self.cliente,
            tipo=self.tipo_sms,
            estado=self.estado_enviada,
            mensaje="Segunda notificación",
            destino="cliente@test.com"
        )
        
        self.client.force_authenticate(user=self.cliente)
        url = reverse('notificacion-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Newest should be first
        self.assertEqual(response.data[0]['mensaje'], 'Segunda notificación')
        self.assertEqual(response.data[1]['mensaje'], 'Primera notificación')
