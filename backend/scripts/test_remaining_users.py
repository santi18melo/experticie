import os
import sys
import django
from pathlib import Path
import requests

# Add project root to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(BASE_DIR))
sys.path.append(str(BASE_DIR / 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import authenticate
from apps.usuarios.models import Usuario

# Remaining users to test
REMAINING_USERS = [
    ("logistica2@prexcol.com", "PassLogistica2*", "Logística"),
    ("logistica3@prexcol.com", "PassLogistica3*", "Logística"),
    ("cliente2@prexcol.com", "PassCliente2*", "Cliente"),
    ("cliente3@prexcol.com", "PassCliente3*", "Cliente"),
]

print("Testing remaining users authentication...")
print(f"{'Email':<30} | {'Password':<20} | {'Role':<15} | {'Auth Result'}")
print("-" * 90)

for email, password, role in REMAINING_USERS:
    try:
        user = Usuario.objects.get(email=email)
        auth_user = authenticate(email=email, password=password)
        
        auth_result = "SUCCESS" if auth_user else "FAILED"
        
        if auth_user is None:
            if not user.check_password(password):
                auth_result = "WRONG PASS"
            elif not user.is_active:
                auth_result = "INACTIVE"
        
        print(f"{email:<30} | {password:<20} | {role:<15} | {auth_result}")
        
    except Usuario.DoesNotExist:
        print(f"{email:<30} | {password:<20} | {role:<15} | {'USER NOT FOUND'}")

print("\nTesting API login endpoint...")
api_url = "http://127.0.0.1:8000/api/auth/login/"

for email, password, role in REMAINING_USERS:
    try:
        response = requests.post(
            api_url,
            json={'email': email, 'password': password},
            headers={'Content-Type': 'application/json'},
            timeout=5
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ {role}: {email} - Token received")
        else:
            print(f"❌ {role}: {email} - Status: {response.status_code}")
    except Exception as e:
        print(f"❌ {role}: {email} - Error: {str(e)[:50]}")
