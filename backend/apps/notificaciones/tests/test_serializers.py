from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.notificaciones.models import TipoNotificacion, EstadoNotificacion, Notificacion
from apps.notificaciones.serializers import (
    NotificacionSerializer, TipoNotificacionSerializer, EstadoNotificacionSerializer
)

User = get_user_model()

class TestNotificacionSerializer(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="user@test.com",
            nombre="Test User",
            password="test123",
            rol="cliente"
        )
        self.tipo = TipoNotificacion.objects.create(
            nombre="Email",
            descripcion="Email notification"
        )
        self.estado = EstadoNotificacion.objects.create(
            nombre="Pendiente",
            descripcion="Pending notification"
        )

    def test_notificacion_serializer_valid_data(self):
        """Test NotificacionSerializer with valid data"""
        data = {
            "usuario": self.user.id,
            "tipo": self.tipo.id,
            "estado": self.estado.id,
            "mensaje": "Test notification message",
            "destino": "user@test.com"
        }
        serializer = NotificacionSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_notificacion_serializer_representation(self):
        """Test NotificacionSerializer representation"""
        notif = Notificacion.objects.create(
            usuario=self.user,
            tipo=self.tipo,
            estado=self.estado,
            mensaje="Test message",
            destino="user@test.com"
        )
        serializer = NotificacionSerializer(notif)
        self.assertEqual(serializer.data['mensaje'], "Test message")
        self.assertEqual(serializer.data['destino'], "user@test.com")
        self.assertFalse(serializer.data['leida'])

    def test_notificacion_serializer_read_only_fields(self):
        """Test that leida and fecha_lectura are read-only"""
        data = {
            "usuario": self.user.id,
            "tipo": self.tipo.id,
            "estado": self.estado.id,
            "mensaje": "Test message",
            "destino": "user@test.com",
            "leida": True  # This should be ignored
        }
        serializer = NotificacionSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        notif = serializer.save()
        # leida should still be False (default)
        self.assertFalse(notif.leida)


class TestTipoNotificacionSerializer(TestCase):
    def test_tipo_notificacion_serializer(self):
        """Test TipoNotificacionSerializer"""
        tipo = TipoNotificacion.objects.create(
            nombre="SMS",
            descripcion="SMS notification"
        )
        serializer = TipoNotificacionSerializer(tipo)
        self.assertEqual(serializer.data['nombre'], "SMS")
        self.assertEqual(serializer.data['descripcion'], "SMS notification")

    def test_tipo_notificacion_serializer_without_description(self):
        """Test TipoNotificacionSerializer without description"""
        tipo = TipoNotificacion.objects.create(nombre="Push")
        serializer = TipoNotificacionSerializer(tipo)
        self.assertEqual(serializer.data['nombre'], "Push")
        self.assertIsNone(serializer.data['descripcion'])

    def test_tipo_notificacion_serializer_list(self):
        """Test serializing multiple notification types"""
        TipoNotificacion.objects.create(nombre="Email")
        TipoNotificacion.objects.create(nombre="SMS")
        TipoNotificacion.objects.create(nombre="Push")
        
        tipos = TipoNotificacion.objects.all()
        serializer = TipoNotificacionSerializer(tipos, many=True)
        self.assertEqual(len(serializer.data), 3)


class TestEstadoNotificacionSerializer(TestCase):
    def test_estado_notificacion_serializer(self):
        """Test EstadoNotificacionSerializer"""
        estado = EstadoNotificacion.objects.create(
            nombre="Enviada",
            descripcion="Notification sent successfully"
        )
        serializer = EstadoNotificacionSerializer(estado)
        self.assertEqual(serializer.data['nombre'], "Enviada")
        self.assertEqual(serializer.data['descripcion'], "Notification sent successfully")

    def test_estado_notificacion_serializer_without_description(self):
        """Test EstadoNotificacionSerializer without description"""
        estado = EstadoNotificacion.objects.create(nombre="Fallida")
        serializer = EstadoNotificacionSerializer(estado)
        self.assertEqual(serializer.data['nombre'], "Fallida")
        self.assertIsNone(serializer.data['descripcion'])

    def test_estado_notificacion_serializer_list(self):
        """Test serializing multiple notification states"""
        EstadoNotificacion.objects.create(nombre="Pendiente")
        EstadoNotificacion.objects.create(nombre="Enviada")
        EstadoNotificacion.objects.create(nombre="Fallida")
        
        estados = EstadoNotificacion.objects.all()
        serializer = EstadoNotificacionSerializer(estados, many=True)
        self.assertEqual(len(serializer.data), 3)
