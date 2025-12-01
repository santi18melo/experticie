import requests
import json

BASE_URL = "http://localhost:8000/api"
EMAIL = "comprador1@prexcol.com"
PASSWORD = "PassComprador1*"

def login():
    url = f"{BASE_URL}/auth/login/"
    data = {"email": EMAIL, "password": PASSWORD}
    try:
        response = requests.post(url, json=data)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Login failed: {e}")
        if 'response' in locals() and response:
            print(f"Response: {response.text}")
        return None

def verify_endpoint(token, endpoint, name):
    url = f"{BASE_URL}{endpoint}"
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        # Handle pagination results
        if isinstance(data, dict) and 'results' in data:
            count = len(data['results'])
            total = data.get('count', 'N/A')
        elif isinstance(data, list):
            count = len(data)
            total = count
        else:
            count = 1
            total = 1
            
        print(f"✅ {name}: Success (Items: {count}, Total: {total})")
        return True
    except Exception as e:
        print(f"❌ {name}: Failed - {e}")
        if 'response' in locals() and response:
            print(f"Response: {response.text}")
        return False

def main():
    print("--- Verifying Comprador Backend ---")
    auth_data = login()
    if not auth_data:
        return

    token = auth_data.get("access")
    if not token:
        print("❌ No access token received")
        return

    print("✅ Login Successful")

    endpoints = [
        ("/productos/pedidos/pendientes/", "Pedidos Pendientes"),
    ]

    all_passed = True
    for endpoint, name in endpoints:
        if not verify_endpoint(token, endpoint, name):
            all_passed = False

    if all_passed:
        print("\n🎉 All Comprador endpoints verified successfully!")
    else:
        print("\n⚠️ Some endpoints failed.")

if __name__ == "__main__":
    main()
