"""
Script para cargar datos realistas de tiendas minoristas
Productos: necesidades básicas vs productos adicionales
"""

from usuarios.models import Usuario
from productos.models import Tienda, Producto, Pedido, DetallePedido
from decimal import Decimal

print("\n" + "="*70)
print("🧹 LIMPIANDO BASE DE DATOS...")
print("="*70)

Pedido.objects.all().delete()
Producto.objects.all().delete()
Tienda.objects.all().delete()
Usuario.objects.filter(email__contains='prexcol').exclude(email='admin@prexcol.com').delete()

print("✓ Datos anteriores eliminados")

print("\n" + "="*70)
print("👥 CREANDO USUARIOS...")
print("="*70)

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

proveedor = Usuario.objects.create_user(
    email='proveedor@prexcol.com',
    nombre='Distribuidora Alimentaria S.L.',
    password='prov123',
    rol='proveedor',
    telefono='+34 600 000 002',
    direccion='Calle Proveedores 10, Madrid'
)
print(f"✓ Proveedor 1: {proveedor.email}")

proveedor2 = Usuario.objects.create_user(
    email='proveedor2@prexcol.com',
    nombre='Minoristas & Accesorios S.A.',
    password='prov123',
    rol='proveedor',
    telefono='+34 600 000 002b',
    direccion='Calle Proveedores 20, Barcelona'
)
print(f"✓ Proveedor 2: {proveedor2.email}")

cliente = Usuario.objects.create_user(
    email='cliente@prexcol.com',
    nombre='Juan García López',
    password='cliente123',
    rol='cliente',
    telefono='+34 600 000 003',
    direccion='Calle Cliente 5, Madrid'
)
print(f"✓ Cliente 1: {cliente.email}")

cliente2 = Usuario.objects.create_user(
    email='cliente2@prexcol.com',
    nombre='María Rodríguez Pérez',
    password='cliente123',
    rol='cliente',
    telefono='+34 600 000 003b',
    direccion='Avenida Compras 15, Barcelona'
)
print(f"✓ Cliente 2: {cliente2.email}")

comprador = Usuario.objects.create_user(
    email='comprador@prexcol.com',
    nombre='Carlos Preparador',
    password='comprador123',
    rol='comprador',
    telefono='+34 600 000 004',
    direccion='Calle Compras 8, Madrid'
)
print(f"✓ Comprador: {comprador.email}")

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
    nombre='Supermercado Central Madrid',
    direccion='Calle Gran Vía 100, Madrid',
    telefono='+34 91 234 5678',
    administrador=admin,
    activa=True
)
print(f"✓ Tienda 1: {tienda1.nombre}")

tienda2 = Tienda.objects.create(
    nombre='Centro Comercial Barcelona',
    direccion='Paseo de Gracia 100, Barcelona',
    telefono='+34 93 876 5432',
    administrador=admin,
    activa=True
)
print(f"✓ Tienda 2: {tienda2.nombre}")

print("\n" + "="*70)
print("📦 CREANDO PRODUCTOS (NECESIDADES BÁSICAS)...")
print("="*70)

# TIENDA 1 - NECESIDADES BÁSICAS (Proveedor 1)
prod1 = Producto.objects.create(
    nombre='Leche Entera 1L',
    descripcion='Leche fresca de vaca, 1 litro. Necesidad básica diaria.',
    precio=Decimal('1.29'),
    stock=80,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True,
    es_basico=True
)
print(f"✓ {prod1.nombre} - Stock: {prod1.stock} (BÁSICO)")

prod2 = Producto.objects.create(
    nombre='Pan Blanco 500g',
    descripcion='Pan blanco tradicional, 500 gramos. Necesidad básica.',
    precio=Decimal('0.99'),
    stock=120,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True,
    es_basico=True
)
print(f"✓ {prod2.nombre} - Stock: {prod2.stock} (BÁSICO)")

prod3 = Producto.objects.create(
    nombre='Huevos (Docena)',
    descripcion='Docena de huevos de gallina. Proteína esencial.',
    precio=Decimal('2.49'),
    stock=150,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True,
    es_basico=True
)
print(f"✓ {prod3.nombre} - Stock: {prod3.stock} (BÁSICO)")

prod4 = Producto.objects.create(
    nombre='Arroz 1kg',
    descripcion='Arroz integral de excelente calidad, 1 kg.',
    precio=Decimal('1.79'),
    stock=100,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True,
    es_basico=True
)
print(f"✓ {prod4.nombre} - Stock: {prod4.stock} (BÁSICO)")

prod5 = Producto.objects.create(
    nombre='Aceite de Oliva 750ml',
    descripcion='Aceite de oliva virgen extra, 750 ml. Esencial para cocinar.',
    precio=Decimal('5.99'),
    stock=45,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True,
    es_basico=True
)
print(f"✓ {prod5.nombre} - Stock: {prod5.stock} (BÁSICO)")

print("\n" + "="*70)
print("🎁 CREANDO PRODUCTOS (NO BÁSICOS)...")
print("="*70)

# TIENDA 1 - NO BÁSICOS (Proveedor 1)
prod6 = Producto.objects.create(
    nombre='Chocolate Premium 100g',
    descripcion='Chocolate belga premium con 70% cacao. Lujo y placer.',
    precio=Decimal('3.99'),
    stock=60,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True,
    es_basico=False
)
print(f"✓ {prod6.nombre} - Stock: {prod6.stock} (NO BÁSICO)")

prod7 = Producto.objects.create(
    nombre='Café Gourmet 250g',
    descripcion='Café de especialidad tostado artesanalmente. Deleite matutino.',
    precio=Decimal('7.99'),
    stock=35,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True,
    es_basico=False
)
print(f"✓ {prod7.nombre} - Stock: {prod7.stock} (NO BÁSICO)")

prod8 = Producto.objects.create(
    nombre='Galletas Artesanales 400g',
    descripcion='Galletas caseras de mantequilla y almendra. Delicatessen.',
    precio=Decimal('4.49'),
    stock=50,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True,
    es_basico=False
)
print(f"✓ {prod8.nombre} - Stock: {prod8.stock} (NO BÁSICO)")

# TIENDA 2 - NECESIDADES BÁSICAS (Proveedor 2)
prod9 = Producto.objects.create(
    nombre='Jabón de Tocador 100g',
    descripcion='Jabón dermatológico neutro. Higiene personal básica.',
    precio=Decimal('1.49'),
    stock=200,
    tienda=tienda2,
    proveedor=proveedor2,
    activo=True,
    es_basico=True
)
print(f"✓ {prod9.nombre} - Stock: {prod9.stock} (BÁSICO)")

prod10 = Producto.objects.create(
    nombre='Detergente Ropa 2L',
    descripcion='Detergente multiusos para ropa. Limpieza del hogar.',
    precio=Decimal('2.99'),
    stock=80,
    tienda=tienda2,
    proveedor=proveedor2,
    activo=True,
    es_basico=True
)
print(f"✓ {prod10.nombre} - Stock: {prod10.stock} (BÁSICO)")

prod11 = Producto.objects.create(
    nombre='Papel Higiénico Pack 12',
    descripcion='Rolos de papel higiénico suave, pack de 12 unidades.',
    precio=Decimal('3.99'),
    stock=150,
    tienda=tienda2,
    proveedor=proveedor2,
    activo=True,
    es_basico=True
)
print(f"✓ {prod11.nombre} - Stock: {prod11.stock} (BÁSICO)")

# TIENDA 2 - NO BÁSICOS (Proveedor 2)
prod12 = Producto.objects.create(
    nombre='Perfume Corporal 100ml',
    descripcion='Colonia de marca premium, 100ml. Fragancia lujosa.',
    precio=Decimal('12.99'),
    stock=25,
    tienda=tienda2,
    proveedor=proveedor2,
    activo=True,
    es_basico=False
)
print(f"✓ {prod12.nombre} - Stock: {prod12.stock} (NO BÁSICO)")

prod13 = Producto.objects.create(
    nombre='Crema Facial Antienvejecimiento',
    descripcion='Crema de lujo con retinol y vitamina C. Cuidado premium.',
    precio=Decimal('14.99'),
    stock=30,
    tienda=tienda2,
    proveedor=proveedor2,
    activo=True,
    es_basico=False
)
print(f"✓ {prod13.nombre} - Stock: {prod13.stock} (NO BÁSICO)")

prod14 = Producto.objects.create(
    nombre='Espejo Decorativo 40x30cm',
    descripcion='Espejo con marco decorativo elegante. Accesorios del hogar.',
    precio=Decimal('19.99'),
    stock=15,
    tienda=tienda2,
    proveedor=proveedor2,
    activo=True,
    es_basico=False
)
print(f"✓ {prod14.nombre} - Stock: {prod14.stock} (NO BÁSICO)")

print("\n" + "="*70)
print("📋 CREANDO PEDIDOS DE EJEMPLO...")
print("="*70)

# Pedido 1: Cliente 1, Tienda 1, PENDIENTE (básicos + no-básicos)
pedido1 = Pedido.objects.create(
    cliente=cliente,
    tienda=tienda1,
    estado='pendiente',
    notas='Compra semanal de productos básicos'
)
prod1.reducir_stock(3)
prod6.reducir_stock(1)
DetallePedido.objects.create(pedido=pedido1, producto=prod1, cantidad=3, precio_unitario=prod1.precio)
DetallePedido.objects.create(pedido=pedido1, producto=prod6, cantidad=1, precio_unitario=prod6.precio)
pedido1.calcular_total()
print(f"✓ Pedido #{pedido1.id}: PENDIENTE | Cliente: {cliente.nombre} | Total: ${pedido1.total}")

# Pedido 2: Cliente 1, Tienda 1, PREPARANDO (básicos)
pedido2 = Pedido.objects.create(
    cliente=cliente,
    tienda=tienda1,
    estado='preparando',
    notas='Entrega urgente de artículos básicos'
)
prod2.reducir_stock(2)
prod4.reducir_stock(1)
DetallePedido.objects.create(pedido=pedido2, producto=prod2, cantidad=2, precio_unitario=prod2.precio)
DetallePedido.objects.create(pedido=pedido2, producto=prod4, cantidad=1, precio_unitario=prod4.precio)
pedido2.calcular_total()
print(f"✓ Pedido #{pedido2.id}: PREPARANDO | Cliente: {cliente.nombre} | Total: ${pedido2.total}")

# Pedido 3: Cliente 2, Tienda 2, EN_TRANSITO (no-básicos)
pedido3 = Pedido.objects.create(
    cliente=cliente2,
    tienda=tienda2,
    estado='en_transito',
    notas='Envío de productos de cuidado personal'
)
prod12.reducir_stock(1)
prod13.reducir_stock(1)
DetallePedido.objects.create(pedido=pedido3, producto=prod12, cantidad=1, precio_unitario=prod12.precio)
DetallePedido.objects.create(pedido=pedido3, producto=prod13, cantidad=1, precio_unitario=prod13.precio)
pedido3.calcular_total()
print(f"✓ Pedido #{pedido3.id}: EN_TRANSITO | Cliente: {cliente2.nombre} | Total: ${pedido3.total}")

# Pedido 4: Cliente 1, Tienda 2, ENTREGADO (básicos)
pedido4 = Pedido.objects.create(
    cliente=cliente,
    tienda=tienda2,
    estado='entregado',
    notas='Pedido completado'
)
prod9.reducir_stock(2)
prod10.reducir_stock(1)
DetallePedido.objects.create(pedido=pedido4, producto=prod9, cantidad=2, precio_unitario=prod9.precio)
DetallePedido.objects.create(pedido=pedido4, producto=prod10, cantidad=1, precio_unitario=prod10.precio)
pedido4.calcular_total()
print(f"✓ Pedido #{pedido4.id}: ENTREGADO | Cliente: {cliente.nombre} | Total: ${pedido4.total}")

# Pedido 5: Cliente 2, Tienda 1, PENDIENTE (mezcla)
pedido5 = Pedido.objects.create(
    cliente=cliente2,
    tienda=tienda1,
    estado='pendiente',
    notas='Primer pedido de cliente'
)
prod3.reducir_stock(1)
prod7.reducir_stock(1)
DetallePedido.objects.create(pedido=pedido5, producto=prod3, cantidad=1, precio_unitario=prod3.precio)
DetallePedido.objects.create(pedido=pedido5, producto=prod7, cantidad=1, precio_unitario=prod7.precio)
pedido5.calcular_total()
print(f"✓ Pedido #{pedido5.id}: PENDIENTE | Cliente: {cliente2.nombre} | Total: ${pedido5.total}")

print("\n" + "="*70)
print("✅ DATOS DE PRUEBA CARGADOS EXITOSAMENTE")
print("="*70)

print("\n📊 RESUMEN:")
print("  TIENDA 1: Supermercado (alimentos básicos + gourmet)")
print("  TIENDA 2: Centro Comercial (artículos del hogar + lujo)")
print(f"  Total Productos: 14 (8 básicos, 6 no-básicos)")
print(f"  Total Pedidos: 5")
print(f"  Básicos en stock: {prod1.stock+prod2.stock+prod3.stock+prod4.stock+prod5.stock+prod9.stock+prod10.stock+prod11.stock} unidades")

print("\n" + "="*70)
