#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script para probar la API REST - Versión mejorada
"""
import requests
import json
import time
import sys

# Configurar encoding
if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

API_URL = "http://127.0.0.1:8000/api"

def print_test(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")

def print_response(response):
    try:
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except:
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")

def test_api_root():
    """Probar acceso a la raíz de la API"""
    print_test("PRUEBA 0: API ROOT")
    try:
        response = requests.get(f"{API_URL}/")
        print_response(response)
        return response.status_code == 200
    except Exception as e:
        print(f"ERROR: {e}")
        return False

def test_register():
    """Probar registro de usuario"""
    print_test("PRUEBA 1: REGISTRO")
    try:
        # Usar timestamp para evitar duplicados
        email = f"usuario{int(time.time())}@example.com"
        data = {
            "email": email,
            "nombre": "Usuario Prueba",
            "password": "password123",
            "rol": "cliente"
        }
        print(f"Enviando: {json.dumps(data, indent=2)}")
        response = requests.post(f"{API_URL}/auth/register/", json=data)
        print_response(response)
        
        if response.status_code == 201:
            print("[OK] Registro exitoso")
            return True
        else:
            print("[ERROR] Registro falló")
            return False
    except Exception as e:
        print(f"ERROR: {e}")
        return False

def test_login():
    """Probar login"""
    print_test("PRUEBA 2: LOGIN")
    try:
        data = {
            "email": "admin@example.com",
            "password": "admin123"
        }
        print(f"Enviando: {json.dumps(data, indent=2)}")
        response = requests.post(f"{API_URL}/auth/login/", json=data)
        print_response(response)
        
        if response.status_code == 200:
            result = response.json()
            token = result.get('access')
            if token:
                print(f"[OK] Token obtenido: {token[:50]}...")
                return token
            else:
                print("[ERROR] No se obtuvo token")
                return None
        else:
            print("[ERROR] Login falló")
            return None
    except Exception as e:
        print(f"ERROR: {e}")
        return None

def test_dashboard(token):
    """Probar acceso al dashboard admin"""
    print_test("PRUEBA 3: DASHBOARD ADMIN")
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{API_URL}/dashboard/admin/", headers=headers)
        print_response(response)
        
        if response.status_code == 200:
            print("[OK] Dashboard accesible")
            return True
        else:
            print("[ERROR] No se pudo acceder al dashboard")
            return False
    except Exception as e:
        print(f"ERROR: {e}")
        return False

def test_refresh_token():
    """Probar refresh de token"""
    print_test("PRUEBA 4: REFRESH TOKEN")
    try:
        # Primero hacer login
        login_data = {
            "email": "admin@example.com",
            "password": "admin123"
        }
        login_response = requests.post(f"{API_URL}/auth/login/", json=login_data)
        
        if login_response.status_code != 200:
            print("[ERROR] No se pudo hacer login para refresh")
            return False
        
        refresh_token = login_response.json().get('refresh')
        
        if not refresh_token:
            print("[ERROR] No se obtuvo refresh token")
            return False
        
        # Ahora usar el refresh token
        refresh_data = {"refresh": refresh_token}
        print(f"Enviando refresh token...")
        refresh_response = requests.post(f"{API_URL}/auth/refresh/", json=refresh_data)
        print_response(refresh_response)
        
        if refresh_response.status_code == 200:
            print("[OK] Token refrescado exitosamente")
            return True
        else:
            print("[ERROR] No se pudo refrescar el token")
            return False
    except Exception as e:
        print(f"ERROR: {e}")
        return False

def main():
    print("\n" + "="*60)
    print("  PRUEBAS DE API REST - PREXCOL")
    print("="*60)
    
    results = []
    
    # Prueba 0: API Root
    results.append(("API Root", test_api_root()))
    
    # Prueba 1: Registro
    results.append(("Registro", test_register()))
    
    # Prueba 2: Login
    token = test_login()
    results.append(("Login", token is not None))
    
    # Prueba 3: Dashboard (si obtuvimos token)
    if token:
        results.append(("Dashboard", test_dashboard(token)))
    else:
        print("\nWARNING: No se pudo acceder al dashboard sin token")
        results.append(("Dashboard", False))
    
    # Prueba 4: Refresh Token
    results.append(("Refresh Token", test_refresh_token()))
    
    # Resumen
    print_test("RESUMEN DE PRUEBAS")
    for test_name, passed in results:
        status = "[OK]" if passed else "[FAIL]"
        print(f"{status} {test_name}")
    
    passed_count = sum(1 for _, p in results if p)
    total_count = len(results)
    
    print(f"\nResultado: {passed_count}/{total_count} pruebas pasadas")
    
    if passed_count == total_count:
        print("\n[SUCCESS] Todas las pruebas pasaron!")
        return 0
    else:
        print(f"\n[WARNING] {total_count - passed_count} prueba(s) fallaron")
        return 1

if __name__ == "__main__":
    sys.exit(main())
