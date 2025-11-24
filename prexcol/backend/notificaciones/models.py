from django.db import models
from core.models import TimeStampedModel
from usuarios.models import Usuario

class TipoNotificacion(TimeStampedModel):
    nombre = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class EstadoNotificacion(TimeStampedModel):
    nombre = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Notificacion(TimeStampedModel):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='notificaciones')
    tipo = models.ForeignKey(TipoNotificacion, on_delete=models.PROTECT, related_name='notificaciones')
    estado = models.ForeignKey(EstadoNotificacion, on_delete=models.PROTECT, related_name='notificaciones')
    mensaje = models.TextField()
    destino = models.CharField(max_length=255, help_text="Correo o ID de usuario destino")
    leida = models.BooleanField(default=False)
    fecha_lectura = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-fecha_creacion']

    def __str__(self):
        return f"Notificación {self.id} - {self.usuario.email} - {self.tipo.nombre}"
