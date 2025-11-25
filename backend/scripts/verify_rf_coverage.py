import os
import django
from django.conf import settings

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from rest_framework.test import APIClient
from rest_framework import status
from usuarios.models import Usuario
from productos.models import Tienda, Producto, Pedido, DetallePedido
from pagos.models import Pago, MetodoPago, EstadoPago
from notificaciones.models import Notificacion, TipoNotificacion, EstadoNotificacion
from django.contrib.auth import get_user_model

User = get_user_model()

def print_header(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}\n")

def verify_rf1_rf2_rf3():
    print_header("VERIFICANDO RF1, RF2, RF3 (AUTH)")
    client = APIClient()
    
    # RF1: Registro
    email = "test_rf@example.com"
    if User.objects.filter(email=email).exists():
        User.objects.get(email=email).delete()
        
    data = {
        "email": email,
        "password": "password123",
        "nombre": "Test User",
        "rol": "cliente"
    }
    response = client.post('/api/auth/register/', data)
    if response.status_code == 201:
        print("✅ RF1 (Registro): OK")
    else:
        print(f"❌ RF1 (Registro): FALLÓ - {response.data}")
        return None

    # RF2: Login
    login_data = {"email": email, "password": "password123"}
    response = client.post('/api/auth/login/', login_data)
    if response.status_code == 200 and ('access' in response.data or 'tokens' in response.data):
        print("✅ RF2 (Login): OK")
        # Handle both response formats
        if 'access' in response.data:
            token = response.data['access']
            refresh = response.data['refresh']
        else:
            token = response.data['tokens']['access']
            refresh = response.data['tokens']['refresh']
    else:
        print(f"❌ RF2 (Login): FALLÓ - {response.data}")
        return None

    # RF3: Logout
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
    logout_data = {"refresh": refresh}
    response = client.post('/api/auth/logout/', logout_data)
    if response.status_code == 204:
        print("✅ RF3 (Logout): OK")
    else:
        print(f"❌ RF3 (Logout): FALLÓ - {response.data}")

    return token # Retornamos token válido para siguientes tests (aunque hicimos logout, generamos uno nuevo si es necesario, pero mejor re-loguear)

def verify_rf4_rf5(token):
    print_header("VERIFICANDO RF4, RF5 (PRODUCTOS)")
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
    
    # Crear Tienda (necesario para producto)
    # Asumimos que el usuario es admin para crear tienda o tiene permisos. 
    # Para simplificar, usaremos un usuario admin creado al vuelo si falla.
    
    admin_email = "admin_test@example.com"
    if not User.objects.filter(email=admin_email).exists():
        User.objects.create_superuser(email=admin_email, password="password123", nombre="Admin")
    
    # Login como admin
    client.force_authenticate(user=User.objects.get(email=admin_email))
    
    # Cleanup old test data
    Tienda.objects.filter(nombre="Tienda Test").delete()
    
    tienda_data = {"nombre": "Tienda Test", "direccion": "Calle 123", "administrador": User.objects.get(email=admin_email).id}
    resp = client.post('/api/tiendas/', tienda_data)
    tienda_id = resp.data['id'] if resp.status_code == 201 else None

    if not tienda_id:
        print(f"⚠️ No se pudo crear tienda: {resp.data if hasattr(resp, 'data') else resp.status_code}")
        return None, None

    # RF4: Crear Producto
    # Necesitamos un proveedor
    prov_email = "prov_test@example.com"
    if not User.objects.filter(email=prov_email).exists():
        User.objects.create_user(email=prov_email, password="password123", nombre="Prov", rol="proveedor")
    prov = User.objects.get(email=prov_email)
    
    # Cleanup old productos
    Producto.objects.filter(nombre="Producto Test", tienda_id=tienda_id).delete()
    
    prod_data = {
        "nombre": "Producto Test",
        "descripcion": "Desc",
        "precio": "100.00",
        "stock": 10,
        "tienda": tienda_id,
        "proveedor": prov.id,
        "categoria": "general"
    }
    
    resp = client.post('/api/productos/', prod_data)
    if resp.status_code == 201:
        print("✅ RF4 (Gestión Productos): OK (Creación)")
        prod_id = resp.data['id']
    else:
        print(f"❌ RF4 (Gestión Productos): FALLÓ - {resp.data}")
        prod_id = None

    # RF5: Visualización (Pública)
    client.logout() # Sin auth
    client.credentials()  # Clear credentials
    resp = client.get('/api/productos/')
    if resp.status_code == 200:
        print("✅ RF5 (Visualización Pública): OK")
    else:
        print(f"❌ RF5 (Visualización Pública): FALLÓ - {resp.status_code}")
    
    return prod_id, tienda_id

def verify_rf6_rf7(token, prod_id, tienda_id):
    print_header("VERIFICANDO RF6, RF7 (PEDIDOS)")
    if not prod_id or not tienda_id:
        print("⚠️ Saltando RF6/RF7 por falta de datos previos.")
        return None

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}') # Token de cliente normal
    
    # RF6: Crear Pedido usando el endpoint correcto
    # Note: The crear_pedido endpoint expects tienda_id and detalles in the request
    # The cliente is assigned automatically from request.user
    
    pedido_data = {
        "tienda_id": tienda_id,
        "detalles": [
            {"producto": prod_id, "cantidad": 2}
        ],
        "notas": "Test Order"
    }
    
    resp = client.post('/api/pedidos/crear_pedido/', pedido_data, format='json')
    if resp.status_code == 201 and 'id' in resp.data:
        pedido_id = resp.data['id']
        print("✅ RF6 (Creación Pedidos): OK")
    else:
        print(f"❌ RF6 (Creación Pedidos): FALLÓ - {resp.data if hasattr(resp, 'data') else resp.status_code}")
        return None

    # RF7: Consulta
    resp = client.get(f'/api/pedidos/{pedido_id}/')
    if resp.status_code == 200:
        print("✅ RF7 (Consulta Pedidos): OK")
    else:
        print(f"❌ RF7 (Consulta Pedidos): FALLÓ")

    return pedido_id

def verify_rf8(token, pedido_id):
    print_header("VERIFICANDO RF8 (PAGOS)")
    if not pedido_id:
        print("⚠️ Saltando RF8 por falta de pedido.")
        return

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
    
    # Crear metadatos
    estado, _ = EstadoPago.objects.get_or_create(nombre="Pendiente")
    metodo, _ = MetodoPago.objects.get_or_create(nombre="Tarjeta")
    
    pago_data = {
        "pedido": pedido_id,
        "monto": "200.00",
        "estado": estado.id,
        "metodo_pago": metodo.id
    }
    
    resp = client.post('/api/pagos/', pago_data)
    if resp.status_code == 201:
        print("✅ RF8 (Gestión Pagos): OK")
        pago_id = resp.data['id']
        
        # Transacción
        trans_data = {
            "pago_id": pago_id,
            "monto": "200.00",
            "referencia_externa": "REF123",
            "estado": "APROBADO"
        }
        resp_t = client.post('/api/pagos/transaccion/', trans_data)
        if resp_t.status_code == 201:
            print("✅ RF8 (Transacción): OK")
        else:
            print(f"❌ RF8 (Transacción): FALLÓ - {resp_t.data}")
            
    else:
        print(f"❌ RF8 (Gestión Pagos): FALLÓ - {resp.data}")

def verify_rf9(token):
    print_header("VERIFICANDO RF9 (NOTIFICACIONES)")
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
    
    # Metadatos
    tipo, _ = TipoNotificacion.objects.get_or_create(nombre="EMAIL")
    estado, _ = EstadoNotificacion.objects.get_or_create(nombre="ENVIADA")
    
    # Crear Notificación
    notif_data = {
        "tipo": tipo.id,
        "estado": estado.id,
        "mensaje": "Hola mundo",
        "destino": "test@test.com"
    }
    
    resp = client.post('/api/notificaciones/', notif_data)
    if resp.status_code == 201:
        print("✅ RF9 (Crear Notificación): OK")
        notif_id = resp.data['id']
        
        # Marcar leída
        resp_l = client.post(f'/api/notificaciones/{notif_id}/marcar_leida/')
        if resp_l.status_code == 200 and resp_l.data['leida'] == True:
            print("✅ RF9 (Marcar Leída): OK")
        else:
            print(f"❌ RF9 (Marcar Leída): FALLÓ")
    else:
        print(f"❌ RF9 (Crear Notificación): FALLÓ - {resp.data}")

def verify_rf10():
    print_header("VERIFICANDO RF10 (SEGURIDAD)")
    client = APIClient()
    # Acceso sin token - debe retornar 401
    client.credentials()  # Clear any credentials
    resp = client.get('/api/pagos/')
    if resp.status_code == 401:
        print("✅ RF10 (Protección Rutas): OK (401 recibido)")
    else:
        print(f"❌ RF10 (Protección Rutas): FALLÓ - Recibido {resp.status_code}")

def main():
    print_header("INICIANDO VERIFICACIÓN INTEGRAL PREXCOL")
    
    # 1. Auth Flow
    token = verify_rf1_rf2_rf3()
    
    if token:
        # Re-login for tener token válido (el anterior se usó para logout)
        client = APIClient()
        login_data = {"email": "test_rf@example.com", "password": "password123"}
        resp = client.post('/api/auth/login/', login_data)
        if 'access' in resp.data:
            token = resp.data['access']
        else:
            token = resp.data['tokens']['access']
        
        # 2. Productos
        prod_id, tienda_id = verify_rf4_rf5(token)
        
        # 3. Pedidos
        pedido_id = verify_rf6_rf7(token, prod_id, tienda_id)
        
        # 4. Pagos
        verify_rf8(token, pedido_id)
        
        # 5. Notificaciones
        verify_rf9(token)
        
        # 6. Seguridad
        verify_rf10()
    
    print_header("VERIFICACIÓN COMPLETADA")

if __name__ == "__main__":
    main()
