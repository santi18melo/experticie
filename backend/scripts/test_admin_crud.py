#!/usr/bin/env python
"""
Script para verificar todas las operaciones CRUD del Admin Dashboard
"""
import requests
import json

BASE_URL = "http://127.0.0.1:8000/api"

# Credenciales de admin
ADMIN_EMAIL = "admin@prexcol.com"
ADMIN_PASSWORD = "admin123"

def login():
    """Login y obtener token"""
    print("\n🔐 Iniciando sesión como admin...")
    response = requests.post(
        f"{BASE_URL}/auth/login/",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
    )
    if response.status_code == 200:
        data = response.json()
        token = data.get("access") or data.get("token")
        print(f"✅ Login exitoso. Token obtenido.")
        return token
    else:
        print(f"❌ Error en login: {response.status_code}")
        print(response.text)
        return None

def test_usuarios_crud(token):
    """Test CRUD de usuarios"""
    headers = {"Authorization": f"Bearer {token}"}
    print("\n" + "="*50)
    print("👥 TESTING USUARIOS CRUD")
    print("="*50)
    
    # CREATE
    print("\n1️⃣ Creando usuario...")
    new_user = {
        "nombre": "Usuario Test CRUD",
        "email": f"test_crud_{int(time.time())}@test.com",
        "password": "test123",
        "rol": "cliente"
    }
    response = requests.post(f"{BASE_URL}/usuarios/", json=new_user, headers=headers)
    if response.status_code == 201:
        user_id = response.json()["id"]
        print(f"✅ Usuario creado con ID: {user_id}")
    else:
        print(f"❌ Error creando usuario: {response.status_code}")
        print(response.text)
        return False
    
    # READ
    print("\n2️⃣ Listando usuarios...")
    response = requests.get(f"{BASE_URL}/usuarios/", headers=headers)
    if response.status_code == 200:
        users = response.json()
        users_list = users.get("results", users)
        print(f"✅ {len(users_list)} usuarios encontrados")
    else:
        print(f"❌ Error listando usuarios: {response.status_code}")
        return False
    
    # DELETE
    print(f"\n3️⃣ Eliminando usuario {user_id}...")
    response = requests.delete(f"{BASE_URL}/usuarios/{user_id}/", headers=headers)
    if response.status_code in [200, 204]:
        print(f"✅ Usuario eliminado correctamente")
    else:
        print(f"❌ Error eliminando usuario: {response.status_code}")
        print(response.text)
        return False
    
    return True

def test_tiendas_crud(token):
    """Test CRUD de tiendas"""
    headers = {"Authorization": f"Bearer {token}"}
    print("\n" + "="*50)
    print("🏪 TESTING TIENDAS CRUD")
    print("="*50)
    
    # Obtener ID del admin
    response = requests.get(f"{BASE_URL}/usuarios/", headers=headers)
    users = response.json()
    users_list = users.get("results", users)
    admin_user = next((u for u in users_list if u["rol"] == "admin"), None)
    if not admin_user:
        print("❌ No se encontró usuario admin")
        return False
    
    # CREATE
    print("\n1️⃣ Creando tienda...")
    new_tienda = {
        "nombre": "Tienda Test CRUD",
        "direccion": "Calle Test 123",
        "telefono": "1234567890",
        "administrador": admin_user["id"]
    }
    response = requests.post(f"{BASE_URL}/productos/tiendas/", json=new_tienda, headers=headers)
    if response.status_code == 201:
        tienda_id = response.json()["id"]
        print(f"✅ Tienda creada con ID: {tienda_id}")
    else:
        print(f"❌ Error creando tienda: {response.status_code}")
        print(response.text)
        return False
    
    # READ
    print("\n2️⃣ Listando tiendas...")
    response = requests.get(f"{BASE_URL}/productos/tiendas/", headers=headers)
    if response.status_code == 200:
        tiendas = response.json()
        tiendas_list = tiendas.get("results", tiendas)
        print(f"✅ {len(tiendas_list)} tiendas encontradas")
    else:
        print(f"❌ Error listando tiendas: {response.status_code}")
        return False
    
    # DELETE
    print(f"\n3️⃣ Eliminando tienda {tienda_id}...")
    response = requests.delete(f"{BASE_URL}/productos/tiendas/{tienda_id}/", headers=headers)
    if response.status_code in [200, 204]:
        print(f"✅ Tienda eliminada correctamente")
    else:
        print(f"❌ Error eliminando tienda: {response.status_code}")
        print(response.text)
        return False
    
    return True

def test_productos_crud(token):
    """Test CRUD de productos"""
    headers = {"Authorization": f"Bearer {token}"}
    print("\n" + "="*50)
    print("📦 TESTING PRODUCTOS CRUD")
    print("="*50)
    
    # Obtener tienda y proveedor
    response = requests.get(f"{BASE_URL}/productos/tiendas/", headers=headers)
    tiendas = response.json()
    tiendas_list = tiendas.get("results", tiendas)
    if not tiendas_list:
        print("❌ No hay tiendas disponibles")
        return False
    tienda_id = tiendas_list[0]["id"]
    
    response = requests.get(f"{BASE_URL}/usuarios/", headers=headers)
    users = response.json()
    users_list = users.get("results", users)
    proveedor = next((u for u in users_list if u["rol"] == "proveedor"), None)
    if not proveedor:
        print("❌ No se encontró usuario proveedor")
        return False
    
    # CREATE
    print("\n1️⃣ Creando producto...")
    new_producto = {
        "nombre": "Producto Test CRUD",
        "descripcion": "Descripción de prueba",
        "precio": "99.99",
        "stock": 100,
        "tienda": tienda_id,
        "proveedor": proveedor["id"],
        "es_basico": True,
        "categoria": "test"
    }
    response = requests.post(f"{BASE_URL}/productos/productos/", json=new_producto, headers=headers)
    if response.status_code == 201:
        producto_id = response.json()["id"]
        print(f"✅ Producto creado con ID: {producto_id}")
    else:
        print(f"❌ Error creando producto: {response.status_code}")
        print(response.text)
        return False
    
    # READ
    print("\n2️⃣ Listando productos...")
    response = requests.get(f"{BASE_URL}/productos/productos/", headers=headers)
    if response.status_code == 200:
        productos = response.json()
        productos_list = productos.get("results", productos)
        print(f"✅ {len(productos_list)} productos encontrados")
    else:
        print(f"❌ Error listando productos: {response.status_code}")
        return False
    
    # DELETE
    print(f"\n3️⃣ Eliminando producto {producto_id}...")
    response = requests.delete(f"{BASE_URL}/productos/productos/{producto_id}/", headers=headers)
    if response.status_code in [200, 204]:
        print(f"✅ Producto eliminado correctamente")
    else:
        print(f"❌ Error eliminando producto: {response.status_code}")
        print(response.text)
        return False
    
    return True

def main():
    import time
    
    print("\n" + "="*60)
    print("🧪 VERIFICACIÓN COMPLETA DE CRUD - ADMIN DASHBOARD")
    print("="*60)
    
    # Login
    token = login()
    if not token:
        print("\n❌ No se pudo obtener token. Abortando pruebas.")
        return
    
    # Tests
    results = {
        "Usuarios": test_usuarios_crud(token),
        "Tiendas": test_tiendas_crud(token),
        "Productos": test_productos_crud(token),
    }
    
    # Resumen
    print("\n" + "="*60)
    print("📊 RESUMEN DE PRUEBAS")
    print("="*60)
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
    
    all_passed = all(results.values())
    print("\n" + "="*60)
    if all_passed:
        print("🎉 ¡TODAS LAS PRUEBAS PASARON EXITOSAMENTE!")
    else:
        print("⚠️ ALGUNAS PRUEBAS FALLARON")
    print("="*60)

if __name__ == "__main__":
    main()
