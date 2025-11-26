import os
import sys
import django

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from apps.usuarios.models import Usuario
from apps.productos.models import Producto

print("=" * 60)
print("ASIGNANDO PRODUCTOS A PROVEEDORES")
print("=" * 60)

# Obtener todos los proveedores activos
proveedores = list(Usuario.objects.filter(rol='proveedor', estado=True))
if not proveedores:
    print("\n⚠️  No hay proveedores activos en el sistema")
    exit(1)

print(f"\n✓ Encontrados {len(proveedores)} proveedores activos")

# Obtener todos los productos activos
productos = Producto.objects.filter(activo=True)
if not productos:
    print("\n⚠️  No hay productos activos en el sistema")
    exit(1)

print(f"✓ Encontrados {productos.count()} productos activos")

# Distribuir productos entre proveedores
productos_actualizados = 0
for i, producto in enumerate(productos):
    # Asignar proveedor de forma circular
    proveedor = proveedores[i % len(proveedores)]
    producto.proveedor = proveedor
    producto.save()
    productos_actualizados += 1
    print(f"  • {producto.nombre} → {proveedor.nombre}")

print(f"\n✅ Se asignaron {productos_actualizados} productos a {len(proveedores)} proveedores")

# Mostrar resumen
print("\n" + "=" * 60)
print("RESUMEN POR PROVEEDOR:")
print("=" * 60)
for proveedor in proveedores:
    count = Producto.objects.filter(proveedor=proveedor, activo=True).count()
    print(f"  {proveedor.nombre}: {count} productos")

print("\n" + "=" * 60)
