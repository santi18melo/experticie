from django.db import models
from apps.usuarios.models import Usuario
from apps.productos.models import Producto

class Venta(models.Model):
    """
    Registro consolidado de una venta completada.
    Se genera cuando un pedido ha sido pagado y confirmado.
    """
    pedido = models.OneToOneField('productos.Pedido', on_delete=models.PROTECT, related_name='venta_registrada')
    cliente = models.ForeignKey(Usuario, on_delete=models.PROTECT, related_name='compras_realizadas')
    total = models.DecimalField(max_digits=12, decimal_places=2)
    fecha_venta = models.DateTimeField(auto_now_add=True)
    
    # Campos para facilitar reportes sin joins excesivos
    cantidad_items = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['-fecha_venta']
        verbose_name = "Venta"
        verbose_name_plural = "Ventas"
        indexes = [
            models.Index(fields=['fecha_venta']),
        ]

    def __str__(self):
        return f"Venta #{self.id} - {self.cliente.nombre} - ${self.total}"

class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, related_name='detalles')
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT, related_name='ventas_historico')
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)
    
    class Meta:
        verbose_name = "Detalle de Venta"
        verbose_name_plural = "Detalles de Venta"

    def __str__(self):
        return f"{self.producto.nombre} x {self.cantidad}"
