import os
import sys
from pathlib import Path
import django
from django.utils import timezone
from datetime import timedelta

# Setup Django environment
BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(BASE_DIR))
sys.path.append(str(BASE_DIR / 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from apps.usuarios.models import Usuario
from apps.productos.models import Tienda, Producto, Pedido, DetallePedido

def create_tiendas():
    tiendas = []
    admin_user = Usuario.objects.filter(rol='admin').first()
    if not admin_user:
        print("No admin user found! Creating one...")
        admin_user = Usuario.objects.create_superuser('admin_demo@prexcol.com', 'PassAdminDemo1*')

    for i in range(1, 4):
        # Check if store exists to avoid duplicates or errors if partial data exists
        tienda = Tienda.objects.filter(nombre=f"Tienda {i}").first()
        if not tienda:
            tienda = Tienda.objects.create(
                nombre=f"Tienda {i}",
                direccion=f"Calle {i} 123",
                activa=True,
                administrador=admin_user
            )
        tiendas.append(tienda)
    return tiendas

def create_productos(tiendas):
    productos = []
    proveedores = list(Usuario.objects.filter(rol='proveedor'))
    for i in range(1, 7):
        tienda = tiendas[i % len(tiendas)]
        proveedor = proveedores[i % len(proveedores)]
        producto, _ = Producto.objects.get_or_create(
            nombre=f"Producto {i}",
            descripcion=f"Descripción del producto {i}",
            precio=10.0 * i,
            stock=20 * i,
            tienda=tienda,
            proveedor=proveedor,
            activo=True,
        )
        productos.append(producto)
    return productos

def create_pedidos(clientes, productos):
    estados = ['pendiente', 'preparando', 'en_transito', 'entregado']
    for idx, cliente in enumerate(clientes):
        pedido = Pedido.objects.create(
            cliente=cliente,
            tienda=productos[idx % len(productos)].tienda,
            estado=estados[idx % len(estados)],
            total=0,
            fecha_creacion=timezone.now() - timedelta(days=idx),
        )
        total = 0
        for p in productos[:2]:
            cantidad = 1 + idx
            subtotal = p.precio * cantidad
            DetallePedido.objects.create(
                pedido=pedido,
                producto=p,
                cantidad=cantidad,
                precio_unitario=p.precio,
            )
            total += subtotal
        pedido.total = total
        pedido.save()

def main():
    print('Creating demo data...')
    tiendas = create_tiendas()
    productos = create_productos(tiendas)
    clientes = list(Usuario.objects.filter(rol='cliente'))
    create_pedidos(clientes, productos)
    print('Demo data created successfully.')

if __name__ == '__main__':
    main()
