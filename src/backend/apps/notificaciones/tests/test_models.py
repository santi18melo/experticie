from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.notificaciones.models import TipoNotificacion, EstadoNotificacion, Notificacion
from django.utils import timezone

User = get_user_model()

class TestTipoNotificacionModel(TestCase):
    def test_create_tipo_notificacion(self):
        """Test creating a notification type"""
        tipo = TipoNotificacion.objects.create(
            nombre="Email",
            descripcion="Notificación por correo electrónico"
        )
        self.assertEqual(tipo.nombre, "Email")
        self.assertEqual(tipo.descripcion, "Notificación por correo electrónico")
        self.assertEqual(str(tipo), "Email")

    def test_tipo_notificacion_without_description(self):
        """Test creating notification type without description"""
        tipo = TipoNotificacion.objects.create(nombre="SMS")
        self.assertIsNone(tipo.descripcion)

    def test_tipo_notificacion_unique_nombre(self):
        """Test that notification type names are unique"""
        TipoNotificacion.objects.create(nombre="Push")
        
        with self.assertRaises(Exception):
            TipoNotificacion.objects.create(nombre="Push")

    def test_tipo_notificacion_timestamps(self):
        """Test that notification type has automatic timestamps"""
        tipo = TipoNotificacion.objects.create(nombre="WhatsApp")
        self.assertIsNotNone(tipo.fecha_creacion)
        self.assertIsNotNone(tipo.fecha_actualizacion)


class TestEstadoNotificacionModel(TestCase):
    def test_create_estado_notificacion(self):
        """Test creating a notification state"""
        estado = EstadoNotificacion.objects.create(
            nombre="Enviada",
            descripcion="Notificación enviada exitosamente"
        )
        self.assertEqual(estado.nombre, "Enviada")
        self.assertEqual(estado.descripcion, "Notificación enviada exitosamente")
        self.assertEqual(str(estado), "Enviada")

    def test_estado_notificacion_without_description(self):
        """Test creating notification state without description"""
        estado = EstadoNotificacion.objects.create(nombre="Pendiente")
        self.assertIsNone(estado.descripcion)

    def test_estado_notificacion_unique_nombre(self):
        """Test that notification state names are unique"""
        EstadoNotificacion.objects.create(nombre="Fallida")
        
        with self.assertRaises(Exception):
            EstadoNotificacion.objects.create(nombre="Fallida")


class TestNotificacionModel(TestCase):
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

    def test_create_notificacion(self):
        """Test creating a notification"""
        notif = Notificacion.objects.create(
            usuario=self.user,
            tipo=self.tipo,
            estado=self.estado,
            mensaje="Test notification message",
            destino="user@test.com"
        )
        self.assertEqual(notif.mensaje, "Test notification message")
        self.assertEqual(notif.destino, "user@test.com")
        self.assertFalse(notif.leida)
        self.assertIsNone(notif.fecha_lectura)

    def test_notificacion_str_representation(self):
        """Test Notificacion string representation"""
        notif = Notificacion.objects.create(
            usuario=self.user,
            tipo=self.tipo,
            estado=self.estado,
            mensaje="Test message",
            destino="user@test.com"
        )
        expected = f"Notificación {notif.id} - {self.user.email} - {self.tipo.nombre}"
        self.assertEqual(str(notif), expected)

    def test_notificacion_ordering(self):
        """Test that notifications are ordered by creation date (newest first)"""
        notif1 = Notificacion.objects.create(
            usuario=self.user,
            tipo=self.tipo,
            estado=self.estado,
            mensaje="First notification",
            destino="user@test.com"
        )
        notif2 = Notificacion.objects.create(
            usuario=self.user,
            tipo=self.tipo,
            estado=self.estado,
            mensaje="Second notification",
            destino="user@test.com"
        )
        
        notificaciones = list(Notificacion.objects.all())
        self.assertEqual(notificaciones[0], notif2)
        self.assertEqual(notificaciones[1], notif1)

    def test_notificacion_mark_as_read(self):
        """Test marking notification as read"""
        notif = Notificacion.objects.create(
            usuario=self.user,
            tipo=self.tipo,
            estado=self.estado,
            mensaje="Test message",
            destino="user@test.com",
            leida=False
        )
        
        # Mark as read
        notif.leida = True
        notif.fecha_lectura = timezone.now()
        notif.save()
        
        notif.refresh_from_db()
        self.assertTrue(notif.leida)
        self.assertIsNotNone(notif.fecha_lectura)

    def test_notificacion_timestamps(self):
        """Test that notification has automatic timestamps"""
        notif = Notificacion.objects.create(
            usuario=self.user,
            tipo=self.tipo,
            estado=self.estado,
            mensaje="Test message",
            destino="user@test.com"
        )
        self.assertIsNotNone(notif.fecha_creacion)
        self.assertIsNotNone(notif.fecha_actualizacion)

    def test_notificacion_default_leida_false(self):
        """Test that notification is not read by default"""
        notif = Notificacion.objects.create(
            usuario=self.user,
            tipo=self.tipo,
            estado=self.estado,
            mensaje="Test message",
            destino="user@test.com"
        )
        self.assertFalse(notif.leida)

    def test_notificacion_fecha_lectura_null_by_default(self):
        """Test that fecha_lectura is null by default"""
        notif = Notificacion.objects.create(
            usuario=self.user,
            tipo=self.tipo,
            estado=self.estado,
            mensaje="Test message",
            destino="user@test.com"
        )
        self.assertIsNone(notif.fecha_lectura)
