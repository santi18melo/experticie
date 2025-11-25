import os
import sys
import django
from django.db import transaction
from decimal import Decimal

# Add backend to path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")
django.setup()

from rest_framework.test import APIRequestFactory, force_authenticate
from productos.views import PedidoViewSet
from usuarios.models import Usuario
from productos.models import Tienda, Producto, Pedido, DetallePedido
from pagos.models import Pago, MetodoPago

def test_atomic_transaction():
    print("\n--- Testing Atomic Transaction for Order Creation ---")
    
    # Setup
    factory = APIRequestFactory()
    view = PedidoViewSet.as_view({'post': 'crear_pedido'})
    
    # Get or Create User
    user, _ = Usuario.objects.get_or_create(email="test_atomic@example.com", nombre="Atomic Tester", rol="cliente")
    
    # Get or Create Tienda & Producto
    admin_user, _ = Usuario.objects.get_or_create(email="admin_atomic@example.com", nombre="Admin Atomic", rol="admin")
    tienda, _ = Tienda.objects.get_or_create(nombre="Tienda Atomic", administrador=admin_user, defaults={"direccion": "Calle 123"})
    producto, _ = Producto.objects.get_or_create(
        nombre="Producto Atomic", 
        tienda=tienda, 
        defaults={"precio": Decimal("100.00"), "stock": 50, "proveedor": admin_user}
    )
    
    # Ensure MetodoPago exists
    metodo_pago, _ = MetodoPago.objects.get_or_create(nombre="Efectivo")

    print(f"Initial Stock: {producto.stock}")
    initial_order_count = Pedido.objects.count()
    initial_payment_count = Pago.objects.count()

    # ---------------------------------------------------------
    # TEST 1: SUCCESSFUL ORDER
    # ---------------------------------------------------------
    print("\n[TEST 1] Attempting SUCCESSFUL order creation...")
    data_success = {
        "tienda_id": tienda.id,
        "metodo_pago": "Efectivo",
        "monto_pago": 200.00, # 2 * 100.00
        "detalles": [
            {"producto": producto.id, "cantidad": 2}
        ]
    }
    
    request = factory.post('/api/crear_pedido/', data_success, format='json')
    force_authenticate(request, user=user)
    response = view(request)
    
    print(f"Response Status: {response.status_code}")
    if response.status_code == 201:
        print("SUCCESS: Order created.")
    else:
        print(f"FAILURE: {response.data}")

    # Verify DB
    if Pedido.objects.count() == initial_order_count + 1 and Pago.objects.count() == initial_payment_count + 1:
        print("VERIFIED: Order and Payment records created.")
    else:
        print("VERIFIED FAILURE: Records mismatch.")

    producto.refresh_from_db()
    print(f"Stock after success: {producto.stock} (Expected 48)")

    # ---------------------------------------------------------
    # TEST 2: FAILED ORDER (Invalid Payment Method) -> SHOULD ROLLBACK
    # ---------------------------------------------------------
    print("\n[TEST 2] Attempting FAILED order creation (Invalid Payment Method)...")
    data_fail = {
        "tienda_id": tienda.id,
        "metodo_pago": "INVALID_METHOD", # This should cause failure
        "monto_pago": 100.00,
        "detalles": [
            {"producto": producto.id, "cantidad": 1}
        ]
    }
    
    request = factory.post('/api/crear_pedido/', data_fail, format='json')
    force_authenticate(request, user=user)
    response = view(request)
    
    print(f"Response Status: {response.status_code}")
    print(f"Response Error: {response.data}")
    
    # Verify Rollback
    # Order count should be same as after Test 1 (no new order)
    current_order_count = Pedido.objects.count()
    current_payment_count = Pago.objects.count()
    
    if current_order_count == initial_order_count + 1:
        print("VERIFIED: No new order created (Rollback successful).")
    else:
        print(f"FAILURE: New order was created despite error! Count: {current_order_count}")

    producto.refresh_from_db()
    print(f"Stock after failure: {producto.stock} (Expected 48 - No change)")

if __name__ == "__main__":
    test_atomic_transaction()
