import requests
import sys

BASE_URL = "http://127.0.0.1:8000/api"

def test_login_and_access():
    # 1. Login
    print("Attempting login with admin1@prexcol.com...")
    login_url = f"{BASE_URL}/auth/login/"
    credentials = {
        "email": "admin1@prexcol.com",
        "password": "PassAdmin1*"
    }
    
    try:
        response = requests.post(login_url, json=credentials)
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to backend. Is it running?")
        return

    if response.status_code != 200:
        print(f"Login failed: {response.status_code} - {response.text}")
        return

    data = response.json()
    access_token = data.get("access")
    refresh_token = data.get("refresh")
    
    if not access_token:
        print("Error: No access token received")
        return

    print(f"Login successful. Token received (first 20 chars): {access_token[:20]}...")

    # 2. Access Protected Route
    print("\nAttempting to access protected route (mis_tiendas)...")
    protected_url = f"{BASE_URL}/productos/tiendas/mis_tiendas/"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    
    response = requests.get(protected_url, headers=headers)
    
    if response.status_code == 200:
        print("Success! Protected route accessed.")
        print("Data:", response.json())
    else:
        print(f"Failed to access protected route: {response.status_code}")
        print("Response:", response.text)

    # 3. Test Refresh Token
    print("\nAttempting to refresh token...")
    refresh_url = f"{BASE_URL}/auth/token/refresh/"
    response = requests.post(refresh_url, json={"refresh": refresh_token})
    
    if response.status_code == 200:
        print("Success! Token refreshed.")
        new_access = response.json().get("access")
        print(f"New token (first 20 chars): {new_access[:20]}...")
    else:
        print(f"Failed to refresh token: {response.status_code}")
        print("Response:", response.text)

if __name__ == "__main__":
    test_login_and_access()
