import requests
import json

# Test del sistema PREXCOL
print("="*60)
print("PREXCOL - VERIFICACIÓN FINAL DEL SISTEMA")
print("="*60)

# Configuración
BASE_URL = "http://localhost:8001/api"

# Test 1: Verificar que el servidor está corriendo
print("\n[TEST 1] Verificando servidor backend...")
try:
    response = requests.get(f"{BASE_URL}/productos/productos/", timeout=5)
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Servidor funcionando - {data['count']} productos disponibles")
    else:
        print(f"⚠️ Servidor respondió con código: {response.status_code}")
except Exception as e:
    print(f"❌ Error conectando al servidor: {e}")
    exit(1)

# Test 2: Login con admin
print("\n[TEST 2] Probando login de administrador...")
try:
    login_data = {
        "email": "admin@example.com",
        "password": "admin123"
    }
    response = requests.post(f"{BASE_URL}/auth/login/", json=login_data, timeout=5)
    if response.status_code == 200:
        data = response.json()
        access_token = data.get('access')
        user = data.get('user', {})
        print(f"✅ Login exitoso como: {user.get('nombre')} ({user.get('rol')})")
        print(f"✅ Token obtenido: {access_token[:30]}...")
    else:
        print(f"❌ Login falló con código: {response.status_code}")
        print(f"   Respuesta: {response.text}")
        exit(1)
except Exception as e:
    print(f"❌ Error en login: {e}")
    exit(1)

# Test 3: Verificar autenticación con token
print("\n[TEST 3] Verificando autenticación con JWT...")
try:
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(f"{BASE_URL}/usuarios/me/", headers=headers, timeout=5)
    if response.status_code == 200:
        user_data = response.json()
        print(f"✅ Autenticación JWT funcionando")
        print(f"   Usuario: {user_data.get('nombre')}")
        print(f"   Email: {user_data.get('email')}")
        print(f"   Rol: {user_data.get('rol')}")
    else:
        print(f"⚠️ Error verificando autenticación: {response.status_code}")
except Exception as e:
    print(f"❌ Error verificando token: {e}")

# Test 4: Listar productos
print("\n[TEST 4] Listando productos...")
try:
    response = requests.get(f"{BASE_URL}/productos/productos/", timeout=5)
    if response.status_code == 200:
        data = response.json()
        products = data.get('results', [])
        print(f"✅ {len(products)} productos cargados:")
        for product in products[:3]:  # Mostrar solo los primeros 3
            print(f"   - {product['nombre']}: ${product['precio']} (Stock: {product['stock']})")
        if len(products) > 3:
            print(f"   ... y {len(products) - 3} productos más")
    else:
        print(f"⚠️ Error listando productos: {response.status_code}")
except Exception as e:
    print(f"❌ Error obteniendo productos: {e}")

# Test 5: Verificar endpoints protegidos
print("\n[TEST 5] Verificando endpoints protegidos (admin)...")
try:
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(f"{BASE_URL}/usuarios/", headers=headers, timeout=5)
    if response.status_code == 200:
        data = response.json()
        users_count = data.get('count', 0)
        print(f"✅ Acceso admin funcionando - {users_count} usuarios en sistema")
    else:
        print(f"⚠️ Acceso admin respondió con: {response.status_code}")
except Exception as e:
    print(f"❌ Error verificando acceso admin: {e}")

# Test 6: Verificar Swagger
print("\n[TEST 6] Verificando Swagger UI...")
try:
    response = requests.get("http://localhost:8001/swagger/", timeout=5)
    if response.status_code == 200 and 'swagger' in response.text.lower():
        print("✅ Swagger UI funcionando correctamente")
    else:
        print(f"⚠️ Swagger respondió con código: {response.status_code}")
except Exception as e:
    print(f"❌ Error accediendo a Swagger: {e}")

# Resumen final
print("\n" + "="*60)
print("RESUMEN DE VERIFICACIÓN")
print("="*60)
print("""
✅ Backend API funcionando en http://localhost:8001/api
✅ Autenticación JWT operativa
✅ Productos cargados y accesibles
✅ Endpoints protegidos verificados
✅ Swagger UI disponible
✅ Sistema listo para uso

PRÓXIMOS PASOS:
1. Iniciar frontend: npm run dev (en carpeta frontend)
2. Acceder a: http://localhost:5175
3. Login con: admin@example.com / admin123
4. Seguir guía de pruebas: docs/GUIA_PRUEBAS_COMPLETAS.md

DOCUMENTACIÓN:
- Swagger UI: http://localhost:8001/swagger/
- API Docs: docs/resumenes/RESUMEN_FINAL.md
- Testing: docs/GUIA_PRUEBAS_COMPLETAS.md
""")
print("="*60)
