from apps.usuarios.models import Usuario
from apps.productos.models import Producto, Pedido, DetallePedido, Tienda
from apps.pagos.models import Pago, EstadoPago, MetodoPago
from apps.ventas.models import Venta
from apps.productos.tasks import recargar_stock_automatico_task
from django.utils import timezone
import datetime

# 1. Setup
user = Usuario.objects.filter(rol='cliente').first() or Usuario.objects.first()
tienda = Tienda.objects.first()
producto = Producto.objects.first()
estado_aprobado, _ = EstadoPago.objects.get_or_create(nombre='Aprobado')
metodo = MetodoPago.objects.first()

if not metodo:
    metodo = MetodoPago.objects.create(nombre='Efectivo')

if not user or not tienda or not producto:
    print("Faltan datos base (usuario, tienda o producto)")
    exit()

# 2. Crear Pedido
pedido = Pedido.objects.create(cliente=user, tienda=tienda, total=0)
DetallePedido.objects.create(pedido=pedido, producto=producto, cantidad=5, precio_unitario=producto.precio)
pedido.calcular_total()

print(f"Pedido creado: {pedido} Total: {pedido.total}")

# 3. Crear Pago Aprobado (esto debería disparar la señal)
pago = Pago.objects.create(
    usuario=user,
    pedido=pedido,
    monto=pedido.total,
    estado=estado_aprobado,
    metodo_pago=metodo
)
print(f"Pago creado: {pago}")

# 4. Verificar Venta
try:
    venta = Venta.objects.get(pedido=pedido)
    print(f"✅ Venta creada automáticamente: {venta}")
    print(f"   Items: {venta.cantidad_items}")
    print(f"   Detalles: {venta.detalles.count()}")
except Venta.DoesNotExist:
    print("❌ Venta NO creada")

# 5. Ejecutar Tarea (simulada)
# Nota: La tarea busca ventas de AYER. Para probar, cambiaré temporalmente la fecha de la venta a ayer.
if 'venta' in locals():
    # Hack para cambiar fecha_venta (auto_now_add=True no deja cambiarlo fácil al crear, pero update sí)
    Venta.objects.filter(id=venta.id).update(fecha_venta=timezone.now() - datetime.timedelta(days=1))
    print("Fecha de venta ajustada a ayer para reporte.")

print("\nEjecutando tarea de reporte y recarga...")
resultado = recargar_stock_automatico_task()
print(f"Resultado tarea: {resultado}")
