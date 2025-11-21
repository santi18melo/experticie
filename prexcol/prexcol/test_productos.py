"""
Script de ejemplo para poblar la base de datos con datos de prueba.
Uso: python manage.py shell < test_productos.py
"""

from usuarios.models import Usuario
from productos.models import Tienda, Producto, Pedido, DetallePedido
from django.contrib.auth.hashers import make_password
from decimal import Decimal

# Crear usuarios de prueba
print("=== Creando usuarios de prueba ===")

# Admin
admin = Usuario.objects.create_user(
    email='admin@prexcol.com',
    nombre='Administrador',
    password='admin123',
    rol='admin',
    telefono='+34 600 000 001',
    direccion='Calle Principal 1'
)
print(f"✓ Admin creado: {admin}")

# Proveedor
proveedor = Usuario.objects.create_user(
    email='proveedor@prexcol.com',
    nombre='Proveedor Electrónica',
    password='prov123',
    rol='proveedor',
    telefono='+34 600 000 002',
    direccion='Calle Proveedores 10'
)
print(f"✓ Proveedor creado: {proveedor}")

# Cliente
cliente = Usuario.objects.create_user(
    email='cliente@prexcol.com',
    nombre='Juan Cliente',
    password='cliente123',
    rol='cliente',
    telefono='+34 600 000 003',
    direccion='Calle Cliente 5'
)
print(f"✓ Cliente creado: {cliente}")

# Comprador
comprador = Usuario.objects.create_user(
    email='comprador@prexcol.com',
    nombre='María Compradora',
    password='comprador123',
    rol='comprador',
    telefono='+34 600 000 004',
    direccion='Calle Compras 8'
)
print(f"✓ Comprador creado: {comprador}")

# Logística
logistica = Usuario.objects.create_user(
    email='logistica@prexcol.com',
    nombre='Carlos Logística',
    password='logistica123',
    rol='logistica',
    telefono='+34 600 000 005',
    direccion='Calle Almacén 15'
)
print(f"✓ Logística creado: {logistica}")

# Crear tiendas
print("\n=== Creando tiendas ===")

tienda1 = Tienda.objects.create(
    nombre='Tienda Centro',
    direccion='Plaza Mayor 1, Madrid',
    telefono='+34 91 234 5678',
    administrador=admin,
    activa=True
)
print(f"✓ Tienda creada: {tienda1}")

tienda2 = Tienda.objects.create(
    nombre='Tienda Salitre',
    direccion='Centro Comercial Salitre, Madrid',
    telefono='+34 91 876 5432',
    administrador=admin,
    activa=True
)
print(f"✓ Tienda creada: {tienda2}")

# Crear productos
print("\n=== Creando productos ===")

producto1 = Producto.objects.create(
    nombre='Laptop Dell XPS 13',
    descripcion='Laptop ultradelgada de 13 pulgadas, procesador i7, 16GB RAM',
    precio=Decimal('1299.99'),
    stock=15,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True
)
print(f"✓ Producto creado: {producto1}")

producto2 = Producto.objects.create(
    nombre='Mouse Logitech MX Master',
    descripcion='Ratón inalámbrico profesional con rueda ilimitada',
    precio=Decimal('99.99'),
    stock=50,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True
)
print(f"✓ Producto creado: {producto2}")

producto3 = Producto.objects.create(
    nombre='Teclado Mecánico Corsair K95',
    descripcion='Teclado mecánico RGB con 18 teclas macro',
    precio=Decimal('199.99'),
    stock=25,
    tienda=tienda1,
    proveedor=proveedor,
    activo=True
)
print(f"✓ Producto creado: {producto3}")

producto4 = Producto.objects.create(
    nombre='Monitor Samsung 4K',
    descripcion='Monitor 4K de 32 pulgadas, 60Hz, USB-C',
    precio=Decimal('599.99'),
    stock=10,
    tienda=tienda2,
    proveedor=proveedor,
    activo=True
)
print(f"✓ Producto creado: {producto4}")

# Crear pedidos de ejemplo
print("\n=== Creando pedidos de ejemplo ===")

# Pedido 1: pendiente
pedido1 = Pedido.objects.create(
    cliente=cliente,
    tienda=tienda1,
    estado='pendiente',
    notas='Pedido de prueba 1'
)

# Reducir stock
producto1.reducir_stock(2)
producto2.reducir_stock(1)

# Agregar detalles
detalle1 = DetallePedido.objects.create(
    pedido=pedido1,
    producto=producto1,
    cantidad=2,
    precio_unitario=producto1.precio
)

detalle2 = DetallePedido.objects.create(
    pedido=pedido1,
    producto=producto2,
    cantidad=1,
    precio_unitario=producto2.precio
)

pedido1.calcular_total()
print(f"✓ Pedido creado: {pedido1} - Total: ${pedido1.total}")

# Pedido 2: en preparación
pedido2 = Pedido.objects.create(
    cliente=cliente,
    tienda=tienda2,
    estado='preparando',
    notas='Pedido de prueba 2'
)

producto4.reducir_stock(1)

detalle3 = DetallePedido.objects.create(
    pedido=pedido2,
    producto=producto4,
    cantidad=1,
    precio_unitario=producto4.precio
)

pedido2.calcular_total()
print(f"✓ Pedido creado: {pedido2} - Total: ${pedido2.total}")

# Pedido 3: en tránsito
pedido3 = Pedido.objects.create(
    cliente=cliente,
    tienda=tienda1,
    estado='en_transito',
    notas='Pedido de prueba 3'
)

producto3.reducir_stock(3)

detalle4 = DetallePedido.objects.create(
    pedido=pedido3,
    producto=producto3,
    cantidad=3,
    precio_unitario=producto3.precio
)

pedido3.calcular_total()
print(f"✓ Pedido creado: {pedido3} - Total: ${pedido3.total}")

print("\n=== ✓ Datos de prueba creados exitosamente ===")
print("\n📝 Usuarios de prueba:")
print(f"  Admin: admin@prexcol.com / admin123")
print(f"  Proveedor: proveedor@prexcol.com / prov123")
print(f"  Cliente: cliente@prexcol.com / cliente123")
print(f"  Comprador: comprador@prexcol.com / comprador123")
print(f"  Logística: logistica@prexcol.com / logistica123")

print("\n📊 Stock después de pedidos:")
print(f"  Laptop Dell: {Producto.objects.get(id=producto1.id).stock} unidades")
print(f"  Mouse Logitech: {Producto.objects.get(id=producto2.id).stock} unidades")
print(f"  Teclado Corsair: {Producto.objects.get(id=producto3.id).stock} unidades")
print(f"  Monitor Samsung: {Producto.objects.get(id=producto4.id).stock} unidades")

print("\n💰 Pedidos creados:")
print(f"  Pedido #{pedido1.id}: ${pedido1.total} ({pedido1.estado})")
print(f"  Pedido #{pedido2.id}: ${pedido2.total} ({pedido2.estado})")
print(f"  Pedido #{pedido3.id}: ${pedido3.total} ({pedido3.estado})")
