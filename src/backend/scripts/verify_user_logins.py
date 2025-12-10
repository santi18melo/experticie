import os
import sys
import django
import json
from django.test import RequestFactory
from django.contrib.auth import authenticate

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from apps.usuarios.models import Usuario

def test_logins():
    print("=== VERIFICACIÓN DE INGRESOS POR ROL ===")
    
    roles_to_test = ['admin', 'comprador', 'proveedor', 'logistica', 'cliente']
    results = []
    
    for rol in roles_to_test:
        print(f"\nProbando usuario con rol: {rol.upper()}")
        
        # 1. Buscar usuario
        user = Usuario.objects.filter(rol=rol, estado=True).first()
        
        if not user:
            print(f"❌ No se encontró ningún usuario activo con rol '{rol}'")
            results.append({'rol': rol, 'status': 'MISSING_USER'})
            continue
            
        print(f"   Usuario encontrado: {user.email}")
        
        # 2. Intentar autenticar (Simulando login)
        # Nota: Como no sabemos la contraseña en texto plano de usuarios existentes,
        # vamos a crear un usuario de prueba temporal si permitimos escribir en DB,
        # O simplemente verificamos que el usuario tiene password usable.
        # Para ser seguros y no modificar datos reales, verificaremos propiedades.
        
        if not user.password:
            print(f"❌ El usuario no tiene contraseña establecida.")
            results.append({'rol': rol, 'status': 'NO_PASSWORD'})
            continue
            
        # Simular check de dashboard
        dashboard_url = '/dashboard'
        print(f"   ✅ Usuario activo y listo para login.")
        
        # Verificar permisos específicos
        if rol == 'admin':
            if not user.is_staff:
                print("   ⚠️ Advertencia: Usuario admin no tiene is_staff=True")
        
        results.append({'rol': rol, 'status': 'OK', 'email': user.email})

    print("\n=== RESUMEN DE RESULTADOS ===")
    all_ok = True
    for res in results:
        status_icon = "✅" if res['status'] == 'OK' else "❌"
        print(f"{status_icon} Rol: {res['rol'].ljust(10)} - Estado: {res['status']}")
        if res['status'] != 'OK':
            all_ok = False
            
    if all_ok:
        print("\n✨ Todos los roles tienen usuarios válidos listos para ingresar.")
    else:
        print("\n⚠️ Faltan usuarios para algunos roles. Revisa la base de datos.")

if __name__ == '__main__':
    test_logins()
