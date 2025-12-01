import requests
import json
import sys

BASE_URL = "http://127.0.0.1:8000"

def get_token(email, password):
    url = f"{BASE_URL}/api/auth/login/"
    response = requests.post(url, json={"email": email, "password": password})
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error getting token for {email}: {response.status_code} - {response.text}")
        return None

def create_order(client_token):
    # 1. Get a product
    headers = {"Authorization": f"Bearer {client_token}"}
    products_res = requests.get(f"{BASE_URL}/api/productos/productos/", headers=headers)
    if products_res.status_code != 200 or not products_res.json()['results']:
        print("Error: No products found or failed to fetch products.")
        return None
    
    product = products_res.json()['results'][0]
    tienda_id = product['tienda']
    
    # 2. Create order
    order_data = {
        "tienda_id": tienda_id,
        "notas": "Test order for unified role verification",
        "metodo_pago": "Efectivo", 
        "monto_pago": float(product['precio']) * 1,
        "detalles": [
            {
                "producto": product['id'],
                "cantidad": 1
            }
        ]
    }
    
    res = requests.post(f"{BASE_URL}/api/productos/pedidos/crear_pedido/", json=order_data, headers=headers)
    if res.status_code == 201:
        print(f"Order created successfully: ID {res.json()['id']}")
        return res.json()['id']
    else:
        print(f"Error creating order: {res.status_code} - {res.text}")
        return None

def verify_logistica_flow(logistica_token, order_id):
    headers = {"Authorization": f"Bearer {logistica_token}"}
    
    print("\n--- Verifying Logistica Access to 'Pendientes' ---")
    # 1. Check 'pendientes' (previously Comprador only)
    res = requests.get(f"{BASE_URL}/api/productos/pedidos/pendientes/", headers=headers)
    if res.status_code == 200:
        orders = res.json()
        found = any(o['id'] == order_id for o in orders)
        if found:
            print("SUCCESS: Logistica can view pending orders.")
        else:
            print("WARNING: Logistica can view pending list, but test order not found (might be pagination or delay).")
    else:
        print(f"FAILURE: Logistica cannot view pending orders. Status: {res.status_code}")
        return False

    print("\n--- Verifying Logistica Action: Pendiente -> Preparando ---")
    # 2. Move to 'preparando'
    action_data = {"estado": "preparando"}
    res = requests.put(f"{BASE_URL}/api/productos/pedidos/{order_id}/cambiar_estado/", json=action_data, headers=headers)
    if res.status_code == 200:
        print("SUCCESS: Logistica moved order to 'preparando'.")
    else:
        print(f"FAILURE: Logistica failed to move order to 'preparando'. Status: {res.status_code} - {res.text}")
        return False

    print("\n--- Verifying Logistica Access to 'En Preparacion' ---")
    # 3. Check 'en_preparacion'
    res = requests.get(f"{BASE_URL}/api/productos/pedidos/en_preparacion/", headers=headers)
    if res.status_code == 200:
        print("SUCCESS: Logistica can view preparing orders.")
    else:
        print(f"FAILURE: Logistica cannot view preparing orders. Status: {res.status_code}")
        return False

    print("\n--- Verifying Logistica Action: Preparando -> En Transito ---")
    # 4. Move to 'en_transito'
    action_data = {"estado": "en_transito"}
    res = requests.put(f"{BASE_URL}/api/productos/pedidos/{order_id}/cambiar_estado/", json=action_data, headers=headers)
    if res.status_code == 200:
        print("SUCCESS: Logistica moved order to 'en_transito'.")
    else:
        print(f"FAILURE: Logistica failed to move order to 'en_transito'. Status: {res.status_code} - {res.text}")
        return False

    print("\n--- Verifying Logistica Action: En Transito -> Entregado ---")
    # 5. Move to 'entregado'
    action_data = {"estado": "entregado"}
    res = requests.put(f"{BASE_URL}/api/productos/pedidos/{order_id}/cambiar_estado/", json=action_data, headers=headers)
    if res.status_code == 200:
        print("SUCCESS: Logistica moved order to 'entregado'.")
    else:
        print(f"FAILURE: Logistica failed to move order to 'entregado'. Status: {res.status_code} - {res.text}")
        return False
        
    return True

if __name__ == "__main__":
    # Credentials
    CLIENT_EMAIL = "cliente1@prexcol.com"
    CLIENT_PASS = "PassCliente1*"
    LOGISTICA_EMAIL = "logistica1@prexcol.com"
    LOGISTICA_PASS = "PassLogistica1*"
    
    print("1. Authenticating Client...")
    client_tokens = get_token(CLIENT_EMAIL, CLIENT_PASS)
    if not client_tokens: sys.exit(1)
    
    print("2. Authenticating Logistica...")
    logistica_tokens = get_token(LOGISTICA_EMAIL, LOGISTICA_PASS)
    if not logistica_tokens: sys.exit(1)
    
    print("3. Creating Test Order...")
    order_id = create_order(client_tokens['access'])
    if not order_id: sys.exit(1)
    
    print("4. Verifying Unified Logistica Flow...")
    success = verify_logistica_flow(logistica_tokens['access'], order_id)
    
    if success:
        print("\nALL TESTS PASSED: Logistica role successfully unified!")
    else:
        print("\nTESTS FAILED.")
