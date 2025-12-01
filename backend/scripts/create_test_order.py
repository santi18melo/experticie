import requests
import json

BASE_URL = "http://127.0.0.1:8000/api"
CLIENT_EMAIL = "cliente1@prexcol.com"
CLIENT_PASS = "PassCliente1*"

def login(email, password):
    url = f"{BASE_URL}/auth/login/"
    data = {"email": email, "password": password}
    try:
        response = requests.post(url, json=data)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Login failed: {e}")
        if 'response' in locals() and response:
            print(f"Response: {response.text}")
        return None

def get_products(token):
    url = f"{BASE_URL}/productos/productos/"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()['results']

def create_order(token, tienda_id, detalles, total):
    url = f"{BASE_URL}/productos/pedidos/crear_pedido/"
    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "tienda_id": tienda_id,
        "detalles": detalles,
        "notas": "Pedido de prueba script unificado",
        "metodo_pago": "Efectivo",
        "monto_pago": str(total)
    }
    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Create order failed: {e}")
        if 'response' in locals() and response:
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
        return None

def main():
    print("--- Creating Client Order ---")
    auth = login(CLIENT_EMAIL, CLIENT_PASS)
    if not auth: return

    token = auth['access']
    print("✅ Login successful")

    products = get_products(token)
    if not products:
        print("❌ No products found")
        return

    # Pick first product
    product = products[0]
    tienda_id = product['tienda']
    price = float(product['precio'])
    qty = 2
    total = price * qty
    
    detalles = [
        {"producto": product['id'], "cantidad": qty} # Changed producto_id to producto as per serializer likely
    ]

    print(f"🛒 Creating order for product {product['nombre']} (ID: {product['id']}) at Store {tienda_id}")
    print(f"   Total: {total}")
    
    order = create_order(token, tienda_id, detalles, total)
    if order:
        print(f"✅ Order Created Successfully! ID: {order['id']}")
        print(f"   Status: {order['estado']}")
        print(f"   Total: {order['total']}")
    else:
        print("❌ Failed to create order")

if __name__ == "__main__":
    main()
