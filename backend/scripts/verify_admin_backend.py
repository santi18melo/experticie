import requests
import json

BASE_URL = "http://localhost:8000/api"
EMAIL = "admin1@prexcol.com"
PASSWORD = "PassAdmin1*"

def login():
    url = f"{BASE_URL}/auth/login/"
    data = {"email": EMAIL, "password": PASSWORD}
    try:
        response = requests.post(url, json=data)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Login failed: {e}")
        if response:
            print(f"Response: {response.text}")
        return None

def verify_endpoint(token, endpoint, name):
    url = f"{BASE_URL}{endpoint}"
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        count = data.get('count', len(data) if isinstance(data, list) else 0)
        print(f"✅ {name}: Success (Count: {count})")
        return True
    except Exception as e:
        print(f"❌ {name}: Failed - {e}")
        if response:
            print(f"Response: {response.text}")
        return False

def main():
    print("--- Verifying Admin Backend ---")
    auth_data = login()
    if not auth_data:
        return

    token = auth_data.get("access")
    if not token:
        print("❌ No access token received")
        return

    print("✅ Login Successful")

    endpoints = [
        ("/usuarios/", "Usuarios"),
        ("/productos/tiendas/", "Tiendas"),
        ("/productos/productos/", "Productos"),
        ("/productos/pedidos/", "Pedidos"),
        ("/productos/secciones/", "Secciones"),
    ]

    all_passed = True
    for endpoint, name in endpoints:
        if not verify_endpoint(token, endpoint, name):
            all_passed = False

    if all_passed:
        print("\n🎉 All Admin endpoints verified successfully!")
    else:
        print("\n⚠️ Some endpoints failed.")

if __name__ == "__main__":
    main()
