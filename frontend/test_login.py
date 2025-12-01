"""
Automated Frontend Login Test Script
Runs through all demo users, logs in via API, and verifies access to a protected endpoint.
"""
import requests
import sys

BASE_URL = "http://127.0.0.1:8000/api"

# Update these credentials to match the demo users created in the system
users = [
    {"email": "admin1@prexcol.com", "password": "PassAdmin1*", "role": "admin"},
    {"email": "cliente1@prexcol.com", "password": "PassCliente1*", "role": "cliente"},
    {"email": "comprador1@prexcol.com", "password": "PassComprador1*", "role": "comprador"},
    {"email": "proveedor1@prexcol.com", "password": "PassProveedor1*", "role": "proveedor"},
    {"email": "logistica1@prexcol.com", "password": "PassLogistica1*", "role": "logistica"},
]

def login(user):
    try:
        resp = requests.post(f"{BASE_URL}/auth/login/", json={"email": user["email"], "password": user["password"]})
        if resp.status_code == 200:
            data = resp.json()
            return data.get("access"), data.get("refresh")
        else:
            print(f"[ERROR] Login failed for {user['email']}: {resp.status_code} {resp.text}")
            return None, None
    except Exception as e:
        print(f"[EXCEPTION] {e}")
        return None, None

def test_protected_endpoint(token, endpoint):
    headers = {"Authorization": f"Bearer {token}"}
    try:
        resp = requests.get(f"{BASE_URL}{endpoint}", headers=headers)
        return resp.status_code, resp.json() if resp.headers.get('Content-Type','').startswith('application/json') else resp.text
    except Exception as e:
        return None, str(e)

print("="*60)
print("FRONTEND LOGIN TEST - AUTOMATED")
print("="*60)

for user in users:
    print(f"\nTesting login for {user['email']} (role: {user['role']})")
    access, refresh = login(user)
    if not access:
        continue
    print("  ✅ Login successful. Access token obtained.")
    # Choose an endpoint based on role
    if user['role'] == 'admin':
        endpoint = "/usuarios/"  # admin can list users
    elif user['role'] == 'proveedor':
        endpoint = "/ventas/mis_ventas_proveedor/"
    else:
        endpoint = "/productos/productos/"  # generic endpoint for other roles
    status, data = test_protected_endpoint(access, endpoint)
    if status == 200:
        print(f"  ✅ Access to {endpoint} succeeded. Sample data keys: {list(data.keys()) if isinstance(data, dict) else 'N/A'}")
    else:
        print(f"  ❌ Access to {endpoint} failed: {status} {data}")

print("\nAll tests completed.")
