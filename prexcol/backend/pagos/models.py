from django.db import models
from core.models import TimeStampedModel
from usuarios.models import Usuario
from productos.models import Pedido

class EstadoPago(TimeStampedModel):
    nombre = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class MetodoPago(TimeStampedModel):
    nombre = models.CharField(max_length=50, unique=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class Pago(TimeStampedModel):
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT, related_name='pagos')
    pedido = models.ForeignKey(Pedido, on_delete=models.PROTECT, related_name='pagos')
    monto = models.DecimalField(max_digits=12, decimal_places=2)
    estado = models.ForeignKey(EstadoPago, on_delete=models.PROTECT, related_name='pagos')
    metodo_pago = models.ForeignKey(MetodoPago, on_delete=models.PROTECT, related_name='pagos')
    
    # Campo opcional para comprobante si es transferencia
    comprobante = models.FileField(upload_to='comprobantes/', null=True, blank=True)

    def __str__(self):
        return f"Pago {self.id} - {self.usuario.email} - {self.monto}"

class Transaccion(TimeStampedModel):
    pago = models.ForeignKey(Pago, on_delete=models.CASCADE, related_name='transacciones')
    referencia_externa = models.CharField(max_length=100, blank=True, null=True)
    monto = models.DecimalField(max_digits=12, decimal_places=2)
    estado = models.CharField(max_length=50) # Estado de la transacción en la pasarela
    respuesta_gateway = models.JSONField(blank=True, null=True) # Respuesta completa del gateway

    def __str__(self):
        return f"Transacción {self.id} - Pago {self.pago.id}"
