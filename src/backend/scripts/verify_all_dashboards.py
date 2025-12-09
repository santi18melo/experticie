import os
import sys
import django
from pathlib import Path
import requests
import json

# Setup Django environment (not strictly needed for API calls, but keep consistency)
BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(BASE_DIR))
sys.path.append(str(BASE_DIR / 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
# django.setup()  # Not needed for pure requests

API_BASE = 'http://127.0.0.1:8000/api'

USERS = [
    # (email, password, role, endpoint to test)
    ('admin1@prexcol.com', 'PassAdmin1*', 'admin', f'{API_BASE}/usuarios/'),
    ('admin2@prexcol.com', 'PassAdmin2*', 'admin', f'{API_BASE}/usuarios/'),
    ('admin3@prexcol.com', 'PassAdmin3*', 'admin', f'{API_BASE}/usuarios/'),
    ('comprador1@prexcol.com', 'PassComprador1*', 'comprador', f'{API_BASE}/pedidos/pendientes/'),
    ('comprador2@prexcol.com', 'PassComprador2*', 'comprador', f'{API_BASE}/pedidos/pendientes/'),
    ('comprador3@prexcol.com', 'PassComprador3*', 'comprador', f'{API_BASE}/pedidos/pendientes/'),
    ('proveedor1@prexcol.com', 'PassProveedor1*', 'proveedor', f'{API_BASE}/productos/mis_productos/'),
    ('proveedor2@prexcol.com', 'PassProveedor2*', 'proveedor', f'{API_BASE}/productos/mis_productos/'),
    ('proveedor3@prexcol.com', 'PassProveedor3*', 'proveedor', f'{API_BASE}/productos/mis_productos/'),
    ('logistica1@prexcol.com', 'PassLogistica1*', 'logistica', f'{API_BASE}/pedidos/en_preparacion/'),
    ('logistica2@prexcol.com', 'PassLogistica2*', 'logistica', f'{API_BASE}/pedidos/en_preparacion/'),
    ('logistica3@prexcol.com', 'PassLogistica3*', 'logistica', f'{API_BASE}/pedidos/en_preparacion/'),
    ('cliente1@prexcol.com', 'PassCliente1*', 'cliente', f'{API_BASE}/productos/'),
    ('cliente2@prexcol.com', 'PassCliente2*', 'cliente', f'{API_BASE}/productos/'),
    ('cliente3@prexcol.com', 'PassCliente3*', 'cliente', f'{API_BASE}/productos/'),
]

def login(email, password):
    url = f'{API_BASE}/auth/login/'
    try:
        resp = requests.post(url, json={'email': email, 'password': password}, timeout=5)
        if resp.status_code == 200:
            data = resp.json()
            return data.get('access')
        else:
            print(f'Login failed for {email}: {resp.status_code} {resp.text}')
            return None
    except Exception as e:
        print(f'Exception during login for {email}: {e}')
        return None

def test_endpoint(token, endpoint, role):
    headers = {'Authorization': f'Bearer {token}'}
    try:
        resp = requests.get(endpoint, headers=headers, timeout=5)
        if resp.status_code == 200:
            print(f'✅ [{role}] Endpoint {endpoint} OK, items: {len(resp.json())}')
        else:
            print(f'❌ [{role}] Endpoint {endpoint} FAILED: {resp.status_code} {resp.text}')
    except Exception as e:
        print(f'❌ [{role}] Exception calling {endpoint}: {e}')

if __name__ == '__main__':
    print('Starting full dashboard verification...')
    for email, pwd, role, endpoint in USERS:
        token = login(email, pwd)
        if token:
            test_endpoint(token, endpoint, role)
        else:
            print(f'⚠️ Could not obtain token for {email}')
    print('Verification completed.')
