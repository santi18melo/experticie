import os
import sys
import django

# Setup Django
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from usuarios.models import Usuario
from django.contrib.auth import authenticate

print("="*60)
print("ADMIN USERS INVESTIGATION")
print("="*60)
print()

# Find all admin users
admin_users = Usuario.objects.filter(rol='admin')
print(f"Total admin users: {admin_users.count()}")
print()

for admin in admin_users:
    print(f"Email: {admin.email}")
    print(f"  Nombre: {admin.nombre}")
    print(f"  Rol: {admin.rol}")
    print(f"  Estado: {admin.estado}")
    print(f"  is_staff: {admin.is_staff}")
    print(f"  is_superuser: {admin.is_superuser}")
    print(f"  has_usable_password: {admin.has_usable_password()}")
    
    # Test authentication
    user = authenticate(username=admin.email, password='admin123')
    if user:
        print(f"  ✅ Authentication SUCCESS with 'admin123'")
    else:
        print(f"  ❌ Authentication FAILED with 'admin123'")
    
    print()

# Try to find admin@example.com specifically
print("="*60)
print("CHECKING admin@example.com SPECIFICALLY")
print("="*60)
try:
    admin = Usuario.objects.get(email='admin@example.com')
    print(f"✅ Found: {admin.email}")
    print(f"  Password hash: {admin.password[:50]}...")
    
    # Test with different passwords
    for pwd in ['admin123', 'Admin123', 'ADMIN123']:
        user = authenticate(username='admin@example.com', password=pwd)
        if user:
            print(f"  ✅ Works with: {pwd}")
        else:
            print(f"  ❌ Fails with: {pwd}")
            
except Usuario.DoesNotExist:
    print("❌ admin@example.com does NOT exist in database")
