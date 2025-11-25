import os
import sys
import django
import requests
import json

# Setup Django
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

# Test users
test_credentials = [
    {'email': 'admin@example.com', 'password': 'admin123', 'rol': 'Admin'},
    {'email': 'cliente1@example.com', 'password': 'cliente123', 'rol': 'Cliente'},
    {'email': 'vendedor1@example.com', 'password': 'vendedor123', 'rol': 'Vendedor'},
    {'email': 'investigador1@example.com', 'password': 'investigador123', 'rol': 'Investigador'},
]

print("🔐 Verificando login de todos los usuarios...\n")

api_url = "http://127.0.0.1:8000/api/auth/login/"

for cred in test_credentials:
    try:
        response = requests.post(
            api_url,
            json={'email': cred['email'], 'password': cred['password']},
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ {cred['rol']}: {cred['email']}")
            print(f"   Token: {data.get('access', 'N/A')[:50]}...")
        else:
            print(f"❌ {cred['rol']}: {cred['email']}")
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ {cred['rol']}: {cred['email']}")
        print(f"   Error: {e}")
    print()

print("\n✅ Verificación completada!")
