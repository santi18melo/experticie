from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import transaction
from apps.pagos.models import Pago
from apps.productos.models import Pedido
from .models import Venta, DetalleVenta

@receiver(post_save, sender=Pago)
def crear_venta_al_aprobar_pago(sender, instance, created, **kwargs):
    """
    Crea un registro de Venta cuando un Pago es aprobado (estado 'Aprobado' o similar).
    """
    # Asumimos que el estado aprobado tiene ID o nombre específico.
    # Ajustar según la implementación real de EstadoPago.
    if instance.estado.nombre.lower() in ['aprobado', 'completado', 'pagado']:
        pedido = instance.pedido
        
        # Verificar si ya existe venta para este pedido
        if hasattr(pedido, 'venta_registrada'):
            return

        with transaction.atomic():
            # Crear Venta
            venta = Venta.objects.create(
                pedido=pedido,
                cliente=pedido.cliente,
                total=pedido.total,
                cantidad_items=pedido.detalles.count() # O suma de cantidades
            )
            
            # Crear Detalles
            detalles_venta = []
            cantidad_total = 0
            for detalle_pedido in pedido.detalles.all():
                detalles_venta.append(DetalleVenta(
                    venta=venta,
                    producto=detalle_pedido.producto,
                    cantidad=detalle_pedido.cantidad,
                    precio_unitario=detalle_pedido.precio_unitario,
                    subtotal=detalle_pedido.subtotal
                ))
                cantidad_total += detalle_pedido.cantidad
            
            DetalleVenta.objects.bulk_create(detalles_venta)
            
            # Actualizar cantidad total real
            venta.cantidad_items = cantidad_total
            venta.save()
