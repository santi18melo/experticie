import os, json, sys
import requests
from urllib.parse import urljoin

BASE_URL = os.getenv('BACKEND_URL', 'http://127.0.0.1:8000/')

# Ensure trailing slash
if not BASE_URL.endswith('/'):
    BASE_URL += '/'

# Endpoints
REGISTER_URL = urljoin(BASE_URL, 'register/')
LOGIN_URL = urljoin(BASE_URL, 'login/')
FORGOT_URL = urljoin(BASE_URL, 'forgot-password/')
RESET_URL_TEMPLATE = urljoin(BASE_URL, 'reset-password/{uid}/{token}/')

users = [
    {"email": "admin@example.com", "nombre": "Admin User", "password": "admin123", "rol": "admin"},
    {"email": "cliente1@example.com", "nombre": "Cliente Uno", "password": "cliente123", "rol": "cliente"},
    {"email": "comprador1@example.com", "nombre": "Comprador Uno", "password": "comprador123", "rol": "comprador"},
    {"email": "proveedor1@example.com", "nombre": "Proveedor Uno", "password": "proveedor123", "rol": "proveedor"},
    {"email": "logistica1@example.com", "nombre": "Logistica Uno", "password": "logistica123", "rol": "logistica"},
]

def print_section(title):
    print('\n' + '='*10 + f' {title} ' + '='*10)

# Register users
print_section('Registration')
for u in users:
    resp = requests.post(REGISTER_URL, json=u)
    print(f"Register {u['email']}: {resp.status_code}")
    if resp.status_code != 201:
        print('  Response:', resp.text)

# Login users
print_section('Login')
tokens = {}
for u in users:
    resp = requests.post(LOGIN_URL, json={"email": u['email'], "password": u['password']})
    print(f"Login {u['email']}: {resp.status_code}")
    if resp.status_code == 200:
        data = resp.json()
        tokens[u['email']] = data.get('access')
        print('  Access token length:', len(tokens[u['email']]) if tokens[u['email']] else 'None')
    else:
        print('  Response:', resp.text)

# Reset password
new_password = 'newpass123'
resp = requests.post(reset_url, json={"password": new_password})
print(f"Reset password response: {resp.status_code}")
if resp.status_code == 200:
    # Try login with new password
    resp = requests.post(LOGIN_URL, json={"email": first['email'], "password": new_password})
    print('Login with new password:', resp.status_code)
else:
    print('Response:', resp.text)

print('\nAll done.')
