#!/usr/bin/env python
"""
Script para probar la API REST
"""
import requests
import json

API_URL = "http://127.0.0.1:8000/api"

def test_register():
    """Probar registro de usuario"""
    print("\n=== PRUEBA 1: REGISTRO ===")
    data = {
        "email": "usuario@example.com",
        "nombre": "Usuario Prueba",
        "password": "password123",
        "rol": "cliente"
    }
    response = requests.post(f"{API_URL}/auth/register/", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 201

def test_login():
    """Probar login"""
    print("\n=== PRUEBA 2: LOGIN ===")
    data = {
        "email": "admin@example.com",
        "password": "admin123"
    }
    response = requests.post(f"{API_URL}/auth/login/", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        return response.json().get('access')
    return None

def test_dashboard(token):
    """Probar acceso al dashboard admin"""
    print("\n=== PRUEBA 3: DASHBOARD ADMIN ===")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{API_URL}/dashboard/admin/", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    print("Iniciando pruebas de API...")
    
    # Prueba 1: Registro
    test_register()
    
    # Prueba 2: Login
    token = test_login()
    
    # Prueba 3: Dashboard (si obtuvimos token)
    if token:
        test_dashboard(token)
    else:
        print("\n❌ No se pudo obtener token para las pruebas siguientes")
