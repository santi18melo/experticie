"""
Create Test Users for PREXCOL Authentication Testing
Creates one user for each role with known credentials
"""
import os
import sys
import django

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from apps.usuarios.models import Usuario

def create_test_users():
    """Create test users for all roles"""
    
    users_data = [
        {
            'email': 'admin@prexcol.com',
            'nombre': 'Admin User',
            'password': 'Prexcol123!',
            'rol': 'admin',
            'telefono': '+57 300 1234567',
            'direccion': 'Calle 1 # 2-3, Bogotá'
        },
        {
            'email': 'cliente1@prexcol.com',
            'nombre': 'Cliente One',
            'password': 'Cliente123!',
            'rol': 'cliente',
            'telefono': '+57 300 2345678',
            'direccion': 'Calle 2 # 3-4, Medellín'
        },
        {
            'email': 'comprador1@prexcol.com',
            'nombre': 'Comprador One',
            'password': 'Comprador123!',
            'rol': 'comprador',
            'telefono': '+57 300 3456789',
            'direccion': 'Calle 3 # 4-5, Cali'
        },
        {
            'email': 'proveedor1@prexcol.com',
            'nombre': 'Proveedor One',
            'password': 'Proveedor123!',
            'rol': 'proveedor',
            'telefono': '+57 300 4567890',
            'direccion': 'Calle 4 # 5-6, Barranquilla'
        },
        {
            'email': 'logistica1@prexcol.com',
            'nombre': 'Logistica One',
            'password': 'Logistica123!',
            'rol': 'logistica',
            'telefono': '+57 300 5678901',
            'direccion': 'Calle 5 # 6-7, Cartagena'
        },
    ]
    
    print("="*80)
    print("CREATING TEST USERS FOR PREXCOL")
    print("="*80)
    print()
    
    created = 0
    skipped = 0
    
    for user_data in users_data:
        email = user_data['email']
        
        # Check if user already exists
        if Usuario.objects.filter(email=email).exists():
            print(f"⚠️  SKIPPED: {email} (already exists)")
            skipped += 1
            continue
        
        # Create user
        try:
            password = user_data.pop('password')
            user = Usuario.objects.create_user(**user_data)
            user.set_password(password)
            user.save()
            
            print(f"✅ CREATED: {email}")
            print(f"   - Nombre: {user.nombre}")
            print(f"   - Rol: {user.rol}")
            print(f"   - Password: {password}")
            print()
            
            created += 1
            
        except Exception as e:
            print(f"❌ ERROR creating {email}: {e}")
            print()
    
    print("="*80)
    print(f"SUMMARY: Created {created} users, Skipped {skipped} users")
    print("="*80)
    print()
    
    # Print credentials summary
    print("="*80)
    print("TEST CREDENTIALS SUMMARY")
    print("="*80)
    print()
    print("Admin:")
    print("  Email: admin@prexcol.com")
    print("  Password: Prexcol123!")
    print()
    print("Cliente:")
    print("  Email: cliente1@prexcol.com")
    print("  Password: Cliente123!")
    print()
    print("Comprador:")
    print("  Email: comprador1@prexcol.com")
    print("  Password: Comprador123!")
    print()
    print("Proveedor:")
    print("  Email: proveedor1@prexcol.com")
    print("  Password: Proveedor123!")
    print()
    print("Logistica:")
    print("  Email: logistica1@prexcol.com")
    print("  Password: Logistica123!")
    print()
    print("="*80)
    
    return created, skipped

if __name__ == '__main__':
    create_test_users()
