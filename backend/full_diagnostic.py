import os
import sys
import django

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from apps.usuarios.models import Usuario
from apps.productos.models import Producto, Tienda

print("=" * 70)
print("DIAGNÓSTICO COMPLETO DEL SISTEMA")
print("=" * 70)

# 1. Usuarios
print("\n1️⃣  USUARIOS:")
for rol in ['admin', 'proveedor', 'cliente', 'comprador', 'logistica']:
    count = Usuario.objects.filter(rol=rol, estado=True).count()
    print(f"   {rol.capitalize()}: {count}")

# 2. Tiendas
tiendas = Tienda.objects.filter(activa=True)
print(f"\n2️⃣  TIENDAS ACTIVAS: {tiendas.count()}")
for tienda in tiendas[:3]:
    print(f"   - {tienda.nombre}")

# 3. Productos
productos = Producto.objects.filter(activo=True)
print(f"\n3️⃣  PRODUCTOS ACTIVOS: {productos.count()}")

if productos.exists():
    print("\n   Primeros 5 productos:")
    for prod in productos[:5]:
        proveedor_nombre = prod.proveedor.nombre if prod.proveedor else "SIN PROVEEDOR"
        print(f"   - {prod.nombre}")
        print(f"     Proveedor: {proveedor_nombre}")
        print(f"     Stock: {prod.stock}, Precio: ${prod.precio}")
else:
    print("   ⚠️  NO HAY PRODUCTOS EN LA BASE DE DATOS")

# 4. Verificar si hay productos sin proveedor
productos_sin_proveedor = Producto.objects.filter(activo=True, proveedor__isnull=True)
print(f"\n4️⃣  PRODUCTOS SIN PROVEEDOR: {productos_sin_proveedor.count()}")

print("\n" + "=" * 70)
