import os
import sys
import django

# Setup Django
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from apps.usuarios.models import Usuario
from apps.productos.models import Producto, Tienda, Pedido

print("=" * 60)
print("VERIFICACIÓN DE DATOS POST-REORGANIZACIÓN")
print("=" * 60)

# Usuarios
total_usuarios = Usuario.objects.count()
usuarios_admin = Usuario.objects.filter(rol='admin').count()
usuarios_cliente = Usuario.objects.filter(rol='cliente').count()
usuarios_vendedor = Usuario.objects.filter(rol='vendedor').count()

print(f"\n📊 USUARIOS:")
print(f"  Total: {total_usuarios}")
print(f"  Admin: {usuarios_admin}")
print(f"  Cliente: {usuarios_cliente}")
print(f"  Vendedor: {usuarios_vendedor}")

# Productos
total_tiendas = Tienda.objects.count()
total_productos = Producto.objects.count()
total_pedidos = Pedido.objects.count()

print(f"\n📦 PRODUCTOS Y TIENDAS:")
print(f"  Tiendas: {total_tiendas}")
print(f"  Productos: {total_productos}")
print(f"  Pedidos: {total_pedidos}")

# Verificar que los modelos funcionan correctamente
print(f"\n✅ VERIFICACIÓN DE MODELOS:")
try:
    if total_usuarios > 0:
        primer_usuario = Usuario.objects.first()
        print(f"  ✓ Usuario model OK - Ejemplo: {primer_usuario.email}")
    else:
        print(f"  ⚠ No hay usuarios en la BD")
    
    if total_productos > 0:
        primer_producto = Producto.objects.first()
        print(f"  ✓ Producto model OK - Ejemplo: {primer_producto.nombre}")
    else:
        print(f"  ⚠ No hay productos en la BD")
    
    print(f"\n🎉 TODOS LOS MODELOS FUNCIONAN CORRECTAMENTE")
    
except Exception as e:
    print(f"\n❌ ERROR: {e}")

print("\n" + "=" * 60)
print("VERIFICACIÓN COMPLETADA")
print("=" * 60)
