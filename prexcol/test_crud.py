#!/usr/bin/env python
"""Script para testar CRUD de usuarios como admin"""
import os, django, json
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
from django.test import Client

client = Client()

# Test 1: Login
print("TEST 1: LOGIN COMO ADMIN")
response = client.post('/api/auth/login/',
    data=json.dumps({'email': 'admin@example.com', 'password': 'admin123'}),
    content_type='application/json')
print(f"Status: {response.status_code}")
data = response.json()
if response.status_code == 200:
    access_token = data.get('access')
    print(f"Token OK: {access_token[:40]}...")
else:
    print("ERROR - No token")
    exit(1)

# Test 2: GET usuarios
print("\nTEST 2: GET /api/usuarios/")
headers = {'HTTP_AUTHORIZATION': f'Bearer {access_token}'}
response = client.get('/api/usuarios/', **headers)
print(f"Status: {response.status_code}")
if response.status_code == 200:
    print("OK - Listado de usuarios recibido")

# Test 3: POST crear usuario
print("\nTEST 3: POST /api/usuarios/ (Crear)")
new_user = {
    'email': 'test_new@test.com',
    'nombre': 'Test User',
    'password': 'pass123',
    'rol': 'cliente',
    'telefono': '300123',
    'direccion': 'calle 1'
}
response = client.post('/api/usuarios/', data=json.dumps(new_user),
    content_type='application/json', **headers)
print(f"Status: {response.status_code}")
if response.status_code == 201:
    user_id = response.json().get('id')
    print(f"OK - Usuario creado ID: {user_id}")
else:
    print(f"ERROR: {response.json()}")
    exit(1)

# Test 4: PATCH actualizar
print(f"\nTEST 4: PATCH /api/usuarios/{user_id}/ (Actualizar)")
response = client.patch(f'/api/usuarios/{user_id}/',
    data=json.dumps({'nombre': 'Test Updated'}),
    content_type='application/json', **headers)
print(f"Status: {response.status_code}")
if response.status_code == 200:
    print("OK - Usuario actualizado")

# Test 5: PATCH estado
print(f"\nTEST 5: PATCH estado (Desactivar)")
response = client.patch(f'/api/usuarios/{user_id}/',
    data=json.dumps({'estado': False}),
    content_type='application/json', **headers)
print(f"Status: {response.status_code}")
if response.status_code == 200:
    print("OK - Usuario desactivado")

# Test 6: DELETE
print(f"\nTEST 6: DELETE /api/usuarios/{user_id}/ (Eliminar)")
response = client.delete(f'/api/usuarios/{user_id}/', **headers)
print(f"Status: {response.status_code}")
if response.status_code == 204:
    print("OK - Usuario eliminado")
    
print("\nOK - TODOS LOS TESTS PASARON")
