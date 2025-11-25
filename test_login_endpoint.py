import requests
import json

# Test login endpoint
url = "http://127.0.0.1:8000/api/auth/login/"
data = {
    "email": "admin@prexcol.com",
    "password": "Prexcol123!"
}

print("Testing login endpoint...")
print(f"URL: {url}")
print(f"Data: {data}")

try:
    response = requests.post(url, json=data, headers={"Content-Type": "application/json"})
    print(f"\nStatus Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        print("\n✅ LOGIN SUCCESSFUL")
        resp_data = response.json()
        print(f"Has access token: {'access' in resp_data}")
        print(f"Has refresh token: {'refresh' in resp_data}")
        print(f"Has user data: {'user' in resp_data}")
    else:
        print("\n❌ LOGIN FAILED")
        
except Exception as e:
    print(f"\n❌ ERROR: {e}")
