import requests
import sys

BASE_URL = "http://127.0.0.1:8000/api"

def get_token(email, password):
    resp = requests.post(f"{BASE_URL}/auth/login/", json={"email": email, "password": password})
    if resp.status_code == 200:
        return resp.json()['access']
    return None

def verify_admin_features():
    print("\n--- Verifying Admin Features ---")
    token = get_token("admin1@prexcol.com", "PassAdmin1*")
    if not token:
        print("Failed to login as Admin")
        return

    headers = {"Authorization": f"Bearer {token}"}

    # 1. Reporte Diario
    print("Testing /ventas/reporte_diario/...")
    resp = requests.get(f"{BASE_URL}/ventas/reporte_diario/", headers=headers)
    if resp.status_code == 200:
        print("✓ Reporte Diario OK:", resp.json().keys())
    else:
        print("✗ Reporte Diario Failed:", resp.status_code, resp.text)

    # 2. Stock Config List (via Products)
    print("Testing /productos/productos/...")
    resp = requests.get(f"{BASE_URL}/productos/productos/", headers=headers)
    if resp.status_code == 200:
        products = resp.json()['results']
        if products:
            pid = products[0]['id']
            print(f"Testing Stock Config for Product {pid}...")
            # Get Config
            resp_conf = requests.get(f"{BASE_URL}/productos/{pid}/config_stock/", headers=headers)
            print(f"Get Config: {resp_conf.status_code}") # Might be 404 if not set
            
            # Set Config
            print("Setting Stock Config...")
            resp_set = requests.post(f"{BASE_URL}/productos/{pid}/config_stock/", json={
                "stock_minimo": 15,
                "cantidad_recarga": 100,
                "recarga_automatica_activa": True
            }, headers=headers)
            if resp_set.status_code in [200, 201]:
                print("✓ Set Config OK")
            else:
                print("✗ Set Config Failed:", resp_set.status_code, resp_set.text)
        else:
            print("No products found to test config")
    else:
        print("✗ List Products Failed")

def verify_provider_features():
    print("\n--- Verifying Provider Features ---")
    token = get_token("proveedor1@prexcol.com", "PassProveedor1*")
    if not token:
        print("Failed to login as Provider")
        return

    headers = {"Authorization": f"Bearer {token}"}

    # 1. Mis Ventas
    print("Testing /ventas/mis_ventas_proveedor/...")
    resp = requests.get(f"{BASE_URL}/ventas/mis_ventas_proveedor/", headers=headers)
    if resp.status_code == 200:
        print("✓ Mis Ventas OK:", resp.json().keys())
    else:
        print("✗ Mis Ventas Failed:", resp.status_code, resp.text)

if __name__ == "__main__":
    verify_admin_features()
    verify_provider_features()
