from celery import shared_task
from django.utils import timezone
from .models import StockConfig, HistorialRecarga

@shared_task
def recargar_stock_automatico_task():
    """
    Ejecutado por Celery Beat: 
    1. Genera reporte de ventas del día anterior.
    2. Envía correo a administradores.
    3. Ejecuta recarga automática de stock.
    """
    from django.core.mail import send_mail
    from django.conf import settings
    from django.db.models import Sum
    from apps.ventas.models import DetalleVenta
    from datetime import timedelta
    
    # 1. Reporte de Ventas (Día anterior)
    ayer = timezone.now().date() - timedelta(days=1)
    detalles_ayer = DetalleVenta.objects.filter(venta__fecha_venta__date=ayer)
    
    ventas_por_producto = detalles_ayer.values('producto__nombre').annotate(
        total_vendido=Sum('cantidad'),
        total_ingresos=Sum('subtotal')
    ).order_by('-total_vendido')
    
    reporte_lines = [f"Reporte de Ventas del {ayer}:"]
    if ventas_por_producto:
        for v in ventas_por_producto:
            reporte_lines.append(f"- {v['producto__nombre']}: {v['total_vendido']} unidades (${v['total_ingresos']})")
    else:
        reporte_lines.append("No hubo ventas registradas ayer.")
    
    reporte_lines.append("\n-----------------------------------\n")
    reporte_lines.append("Ejecución de Recarga Automática de Stock:")
    
    # 2. Recarga Automática
    configs = StockConfig.objects.filter(recarga_automatica_activa=True).select_related('producto')
    recargas_count = 0
    
    for config in configs:
        if config.necesita_recarga():
            producto = config.producto
            stock_anterior = producto.stock
            
            # Aumentar stock
            producto.aumentar_stock(config.cantidad_recarga)
            
            # Registrar historial
            HistorialRecarga.objects.create(
                producto=producto,
                cantidad=config.cantidad_recarga,
                stock_anterior=stock_anterior,
                stock_nuevo=producto.stock,
                tipo='automatica',
                usuario=None,
                notas='Recarga automática programada por Celery Beat',
                fecha_creacion=timezone.now(),
            )
            
            # Actualizar metadatos de configuración
            config.ultima_recarga = timezone.now()
            config.total_recargas += 1
            config.save()
            
            reporte_lines.append(f"✅ {producto.nombre}: {stock_anterior} -> {producto.stock} (+{config.cantidad_recarga})")
            recargas_count += 1
    
    if recargas_count == 0:
        reporte_lines.append("No se requirieron recargas automáticas hoy.")
        
    # 3. Enviar Correo
    asunto = f"Reporte Diario de Ventas y Recarga de Stock - {ayer}"
    mensaje = "\n".join(reporte_lines)
    recipient_list = [settings.DEFAULT_FROM_EMAIL] # O lista de admins
    
    try:
        send_mail(
            subject=asunto,
            message=mensaje,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=recipient_list,
            fail_silently=False,
        )
        email_status = "Correo enviado exitosamente."
    except Exception as e:
        email_status = f"Error al enviar correo: {str(e)}"
        print(email_status)

    return f"Recarga: {recargas_count} productos. {email_status}"

