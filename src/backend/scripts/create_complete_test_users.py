"""
Script para crear usuarios de prueba para todos los roles del sistema PREXCOL.
Ejecutar: python src/backend/scripts/create_complete_test_users.py
"""
import os
import sys
import django

# Setup Django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from apps.usuarios.models import Usuario

def create_test_users():
    """Crea usuarios de prueba para cada rol si no existen."""
    
    test_users = [
        {
            'email': 'admin@prexcol.com',
            'nombre': 'Administrador Principal',
            'password': 'Admin123!',
            'rol': 'admin',
            'telefono': '+57 300 1234567',
            'direccion': 'Calle 100 #15-20, Bogotá',
            'is_staff': True,
            'is_superuser': True
        },
        {
            'email': 'proveedor@prexcol.com',
            'nombre': 'Proveedor Test',
            'password': 'Proveedor123!',
            'rol': 'proveedor',
            'telefono': '+57 310 2345678',
            'direccion': 'Carrera 7 #32-16, Bogotá'
        },
        {
            'email': 'logistica@prexcol.com',
            'nombre': 'Logística Test',
            'password': 'Logistica123!',
            'rol': 'logistica',
            'telefono': '+57 320 3456789',
            'direccion': 'Avenida 68 #45-23, Bogotá'
        },
        {
            'email': 'cliente@prexcol.com',
            'nombre': 'Cliente Test',
            'password': 'Cliente123!',
            'rol': 'cliente',
            'telefono': '+57 315 4567890',
            'direccion': 'Calle 85 #12-34, Bogotá'
        }
    ]
    
    created = []
    existing = []
    
    for user_data in test_users:
        email = user_data['email']
        
        if Usuario.objects.filter(email=email).exists():
            existing.append(email)
            print(f"⚠️  Usuario ya existe: {email}")
            continue
        
        try:
            user = Usuario.objects.create_user(
                email=user_data['email'],
                nombre=user_data['nombre'],
                password=user_data['password'],
                rol=user_data['rol'],
                telefono=user_data.get('telefono'),
                direccion=user_data.get('direccion')
            )
            
            if user_data.get('is_staff'):
                user.is_staff = True
            if user_data.get('is_superuser'):
                user.is_superuser = True
            
            user.save()
            created.append(email)
            print(f"✅ Usuario creado: {email} (Rol: {user_data['rol']})")
            
        except Exception as e:
            print(f"❌ Error creando {email}: {e}")
    
    print("\n" + "="*60)
    print(f"📊 RESUMEN:")
    print(f"   Creados: {len(created)}")
    print(f"   Ya existían: {len(existing)}")
    print("="*60)
    
    if created:
        print("\n🔑 CREDENCIALES DE ACCESO:")
        print("-" * 60)
        for user_data in test_users:
            if user_data['email'] in created:
                print(f"\n{user_data['rol'].upper()}:")
                print(f"  Email: {user_data['email']}")
                print(f"  Password: {user_data['password']}")
    
    return created, existing

if __name__ == '__main__':
    print("🚀 Creando usuarios de prueba para PREXCOL...\n")
    create_test_users()
