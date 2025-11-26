import os
import sys
import django

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from apps.usuarios.models import Usuario
from apps.productos.models import Producto, Tienda
from decimal import Decimal

print("🔧 CREANDO PRODUCTOS DE PRUEBA PARA PROVEEDORES")
print("=" * 70)

# Obtener o crear proveedor
proveedor = Usuario.objects.filter(rol='proveedor', estado=True).first()
if not proveedor:
    print("❌ No hay proveedores en el sistema. Creando uno...")
    proveedor = Usuario.objects.create_user(
        email='proveedor@test.com',
        nombre='Proveedor Test',
        password='test123',
        rol='proveedor'
    )
    print(f"✅ Proveedor creado: {proveedor.nombre}")
else:
    print(f"✅ Usando proveedor existente: {proveedor.nombre} ({proveedor.email})")

# Obtener o crear tienda
tienda = Tienda.objects.filter(activa=True).first()
if not tienda:
    admin = Usuario.objects.filter(rol='admin', estado=True).first()
    if not admin:
        print("❌ No hay admin para crear tienda")
        exit(1)
    tienda = Tienda.objects.create(
        nombre='Tienda Principal',
        direccion='Calle Principal 123',
        administrador=admin
    )
    print(f"✅ Tienda creada: {tienda.nombre}")
else:
    print(f"✅ Usando tienda existente: {tienda.nombre}")

# Crear productos de prueba
productos_prueba = [
    {
        'nombre': 'Arroz Diana 500g',
        'descripcion': 'Arroz de alta calidad',
        'precio': Decimal('2500.00'),
        'stock': 100,
        'es_basico': True,
        'categoria': 'alimentos'
    },
    {
        'nombre': 'Aceite Girasol 1L',
        'descripcion': 'Aceite vegetal premium',
        'precio': Decimal('8500.00'),
        'stock': 50,
        'es_basico': True,
        'categoria': 'alimentos'
    },
    {
        'nombre': 'Chocolate Jet 30g',
        'descripcion': 'Chocolate con leche',
        'precio': Decimal('1200.00'),
        'stock': 200,
        'es_basico': False,
        'categoria': 'dulces'
    },
    {
        'nombre': 'Jabón Protex 125g',
        'descripcion': 'Jabón antibacterial',
        'precio': Decimal('3500.00'),
        'stock': 75,
        'es_basico': True,
        'categoria': 'aseo'
    },
    {
        'nombre': 'Galletas Oreo 36g',
        'descripcion': 'Galletas con crema',
        'precio': Decimal('1800.00'),
        'stock': 150,
        'es_basico': False,
        'categoria': 'dulces'
    }
]

print(f"\n📦 Creando {len(productos_prueba)} productos...")
creados = 0
actualizados = 0

for prod_data in productos_prueba:
    producto, created = Producto.objects.get_or_create(
        nombre=prod_data['nombre'],
        tienda=tienda,
        defaults={
            **prod_data,
            'proveedor': proveedor
        }
    )
    
    if created:
        creados += 1
        print(f"   ✅ Creado: {producto.nombre}")
    else:
        # Actualizar proveedor si no lo tiene
        if not producto.proveedor:
            producto.proveedor = proveedor
            producto.save()
            actualizados += 1
            print(f"   🔄 Actualizado: {producto.nombre} (asignado a {proveedor.nombre})")
        else:
            print(f"   ℹ️  Ya existe: {producto.nombre} (proveedor: {producto.proveedor.nombre})")

print(f"\n📊 RESUMEN:")
print(f"   Productos creados: {creados}")
print(f"   Productos actualizados: {actualizados}")

# Verificar resultado final
total_productos = Producto.objects.filter(proveedor=proveedor, activo=True).count()
print(f"   Total productos del proveedor '{proveedor.nombre}': {total_productos}")

print("\n" + "=" * 70)
print("✅ PROCESO COMPLETADO")
