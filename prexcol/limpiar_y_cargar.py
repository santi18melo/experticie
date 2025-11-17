"""
Script para limpiar la BD completamente y cargar datos de prueba válidos
Uso: python manage.py shell < limpiar_y_cargar.py
"""

from usuarios.models import Usuario
from productos.models import Tienda, Producto, Pedido, DetallePedido
from decimal import Decimal

print("\n" + "="*70)
print("🧹 LIMPIANDO BASE DE DATOS...")
print("="*70)

# Limpiar Pedidos
Pedido.objects.all().delete()
print("✓ Pedidos eliminados")

# Limpiar Productos
Producto.objects.all().delete()
print("✓ Productos eliminados")

# Limpiar Tiendas
Tienda.objects.all().delete()
print("✓ Tiendas eliminadas")

# Limpiar Usuarios de prueba
Usuario.objects.filter(email__contains='prexcol').exclude(email='admin@prexcol.com').delete()
print("✓ Usuarios de prueba eliminados")

print("\n" + "="*70)
print("👥 CREANDO USUARIOS...")
print("="*70)

# Admin
admin, created = Usuario.objects.get_or_create(
    email='admin@prexcol.com',
    defaults={
        'nombre': 'Administrador Sistema',
        'rol': 'admin',
        'telefono': '+34 600 000 001',
        'direccion': 'Calle Principal 1, Madrid',
        'estado': True,
        'is_staff': True,
        'is_superuser': True,
    }
)
if created:
    admin.set_password('admin123')
    admin.save()
print(f"✓ Admin: {admin.email}")

# Proveedor 1
proveedor = Usuario.objects.create_user(
    email='proveedor@prexcol.com',
    nombre='TechSupply S.L.',
    password='prov123',
    rol='proveedor',
    telefono='+34 600 000 002',
    direccion='Calle Proveedores 10, Madrid'
)
print(f"✓ Proveedor 1: {proveedor.email}")

# Proveedor 2
proveedor2 = Usuario.objects.create_user(
    email='proveedor2@prexcol.com',
    nombre='ElectroVenta S.A.',
    password='prov123',
    rol='proveedor',
    telefono='+34 600 000 002b',
    direccion='Calle Proveedores 20, Barcelona'
)
print(f"✓ Proveedor 2: {proveedor2.email}")

# Cliente 1
cliente = Usuario.objects.create_user(
    email='cliente@prexcol.com',
    nombre='Juan García López',
    password='cliente123',
    rol='cliente',
    telefono='+34 600 000 003',
    direccion='Calle Cliente 5, Madrid'
)
print(f"✓ Cliente 1: {cliente.email}")

# Cliente 2
cliente2 = Usuario.objects.create_user(
    email='cliente2@prexcol.com',
    nombre='María Rodríguez Pérez',
    password='cliente123',
    rol='cliente',
    telefono='+34 600 000 003b',
    direccion='Avenida Compras 15, Barcelona'
)
print(f"✓ Cliente 2: {cliente2.email}")

# Comprador
comprador = Usuario.objects.create_user(
    email='comprador@prexcol.com',
    nombre='Carlos Preparador',
    password='comprador123',
    rol='comprador',
    telefono='+34 600 000 004',
    direccion='Calle Compras 8, Madrid'
)
print(f"✓ Comprador: {comprador.email}")

# Logística
logistica = Usuario.objects.create_user(
    email='logistica@prexcol.com',
    nombre='Sofia Transportes',
    password='logistica123',
    rol='logistica',
    telefono='+34 600 000 005',
    direccion='Calle Almacén 15, Madrid'
)
print(f"✓ Logística: {logistica.email}")

print("\n" + "="*70)
print("🏪 CREANDO TIENDAS...")
print("="*70)

tienda1 = Tienda.objects.create(
    nombre='TechStore Madrid Centro',
    direccion='Plaza Mayor 1, Madrid',
    telefono='+34 91 234 5678',
    administrador=admin,
    activa=True
)
print(f"✓ Tienda 1: {tienda1.nombre}")

tienda2 = Tienda.objects.create(
    nombre='ElectroShop Barcelona',
    direccion='Paseo de Gracia 100, Barcelona',
    telefono='+34 93 876 5432',
    administrador=admin,
    activa=True
)
print(f"✓ Tienda 2: {tienda2.nombre}")

print("\n" + "="*70)
print("📦 CREANDO PRODUCTOS...")
print("="*70)

# Productos Tienda 1
prod1 = Producto.objects.create(
    nombre='Laptop Dell XPS 13',
    descripcion='Laptop ultradelgada 13 pulgadas, Intel i7, 16GB RAM, SSD 512GB',
    precio=Decimal('1299.99'),
    stock=12,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True
)
print(f"✓ {prod1.nombre} - Stock: {prod1.stock}")

prod2 = Producto.objects.create(
    nombre='Mouse Logitech MX Master 3',
    descripcion='Ratón inalámbrico profesional, rueda ilimitada, USB-C',
    precio=Decimal('99.99'),
    stock=45,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True
)
print(f"✓ {prod2.nombre} - Stock: {prod2.stock}")

prod3 = Producto.objects.create(
    nombre='Teclado Mecánico Corsair K95',
    descripcion='Teclado mecánico RGB, 18 teclas macro, Cherry MX switches',
    precio=Decimal('199.99'),
    stock=20,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True
)
print(f"✓ {prod3.nombre} - Stock: {prod3.stock}")

# Productos Tienda 2
prod4 = Producto.objects.create(
    nombre='Monitor Samsung 4K 32"',
    descripcion='Monitor 4K 32 pulgadas, 60Hz, USB-C, HDR',
    precio=Decimal('599.99'),
    stock=8,
    tienda=tienda2,
    proveedor=proveedor2,
    activo=True
)
print(f"✓ {prod4.nombre} - Stock: {prod4.stock}")

prod5 = Producto.objects.create(
    nombre='Webcam Logitech 4K',
    descripcion='Webcam 4K, micrófono estéreo, autofocus automático',
    precio=Decimal('149.99'),
    stock=30,
    tienda=tienda2,
    proveedor=proveedor2,
    activo=True
)
print(f"✓ {prod5.nombre} - Stock: {prod5.stock}")

prod6 = Producto.objects.create(
    nombre='Auriculares Sony WH-1000XM5',
    descripcion='Auriculares inalámbricos con cancelación de ruido, 30h batería',
    precio=Decimal('379.99'),
    stock=15,
    tienda=tienda2,
    proveedor=proveedor2,
    activo=True
)
print(f"✓ {prod6.nombre} - Stock: {prod6.stock}")

print("\n" + "="*70)
print("📋 CREANDO PEDIDOS DE EJEMPLO...")
print("="*70)

# Pedido 1: Pendiente
pedido1 = Pedido.objects.create(
    cliente=cliente,
    tienda=tienda1,
    estado='pendiente',
    notas='Pedido urgente para oficina'
)
prod1.reducir_stock(2)
prod2.reducir_stock(1)
DetallePedido.objects.create(pedido=pedido1, producto=prod1, cantidad=2, precio_unitario=prod1.precio)
DetallePedido.objects.create(pedido=pedido1, producto=prod2, cantidad=1, precio_unitario=prod2.precio)
pedido1.calcular_total()
print(f"✓ Pedido #{pedido1.id}: PENDIENTE | Cliente: {cliente.nombre} | Total: ${pedido1.total}")

# Pedido 2: Preparando
pedido2 = Pedido.objects.create(
    cliente=cliente,
    tienda=tienda1,
    estado='preparando',
    notas='En proceso de preparación'
)
prod3.reducir_stock(1)
DetallePedido.objects.create(pedido=pedido2, producto=prod3, cantidad=1, precio_unitario=prod3.precio)
pedido2.calcular_total()
print(f"✓ Pedido #{pedido2.id}: PREPARANDO | Cliente: {cliente.nombre} | Total: ${pedido2.total}")

# Pedido 3: En tránsito
pedido3 = Pedido.objects.create(
    cliente=cliente2,
    tienda=tienda2,
    estado='en_transito',
    notas='En camino a Barcelona'
)
prod4.reducir_stock(1)
prod5.reducir_stock(2)
DetallePedido.objects.create(pedido=pedido3, producto=prod4, cantidad=1, precio_unitario=prod4.precio)
DetallePedido.objects.create(pedido=pedido3, producto=prod5, cantidad=2, precio_unitario=prod5.precio)
pedido3.calcular_total()
print(f"✓ Pedido #{pedido3.id}: EN_TRANSITO | Cliente: {cliente2.nombre} | Total: ${pedido3.total}")

# Pedido 4: Entregado
pedido4 = Pedido.objects.create(
    cliente=cliente,
    tienda=tienda2,
    estado='entregado',
    notas='Entregado correctamente'
)
prod6.reducir_stock(1)
DetallePedido.objects.create(pedido=pedido4, producto=prod6, cantidad=1, precio_unitario=prod6.precio)
pedido4.calcular_total()
print(f"✓ Pedido #{pedido4.id}: ENTREGADO | Cliente: {cliente.nombre} | Total: ${pedido4.total}")

# Pedido 5: Pendiente
pedido5 = Pedido.objects.create(
    cliente=cliente2,
    tienda=tienda1,
    estado='pendiente',
    notas='Nuevo pedido de cliente'
)
prod1.reducir_stock(1)
DetallePedido.objects.create(pedido=pedido5, producto=prod1, cantidad=1, precio_unitario=prod1.precio)
pedido5.calcular_total()
print(f"✓ Pedido #{pedido5.id}: PENDIENTE | Cliente: {cliente2.nombre} | Total: ${pedido5.total}")

print("\n" + "="*70)
print("✅ DATOS DE PRUEBA CARGADOS EXITOSAMENTE")
print("="*70)

print("\n📝 USUARIOS DE PRUEBA:")
print("  Admin:        admin@prexcol.com / admin123")
print("  Proveedor 1:  proveedor@prexcol.com / prov123")
print("  Proveedor 2:  proveedor2@prexcol.com / prov123")
print("  Cliente 1:    cliente@prexcol.com / cliente123")
print("  Cliente 2:    cliente2@prexcol.com / cliente123")
print("  Comprador:    comprador@prexcol.com / comprador123")
print("  Logística:    logistica@prexcol.com / logistica123")

print("\n" + "="*70)
