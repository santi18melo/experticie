import os
import sys
import django

# Agregar el directorio backend al path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from apps.usuarios.models import Usuario
from apps.productos.models import Producto

print("=" * 60)
print("DIAGNÓSTICO: Proveedores y Productos")
print("=" * 60)

# Verificar proveedores
proveedores = Usuario.objects.filter(rol='proveedor', estado=True)
print(f"\n📦 Total de proveedores activos: {proveedores.count()}")

for proveedor in proveedores:
    print(f"\n  - {proveedor.nombre} ({proveedor.email})")
    productos = Producto.objects.filter(proveedor=proveedor, activo=True)
    print(f"    Productos asignados: {productos.count()}")
    for prod in productos[:5]:  # Mostrar máximo 5
        print(f"      • {prod.nombre} - Stock: {prod.stock} - Precio: ${prod.precio}")

# Verificar productos sin proveedor
print(f"\n📊 Total de productos activos: {Producto.objects.filter(activo=True).count()}")

print("\n" + "=" * 60)
