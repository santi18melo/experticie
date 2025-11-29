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
print("FIXING ADMIN PASSWORD")
print("="*60)
print()

# Get all admin users and fix their passwords
admin_users = Usuario.objects.filter(rol='admin')

for admin in admin_users:
    print(f"Fixing: {admin.email}")
    
    # Set password correctly
    admin.set_password('admin123')
    admin.is_staff = True
    admin.is_superuser = True
    admin.estado = True
    admin.save()
    
    # Test authentication
    user = authenticate(username=admin.email, password='admin123')
    if user:
        print(f"  ✅ Password reset SUCCESS - can now login with 'admin123'")
    else:
        print(f"  ❌ Password reset FAILED")
    print()

print("="*60)
print("VERIFICATION - Testing all users")
print("="*60)
print()

test_users = [
    ('admin@example.com', 'admin123', 'admin'),
    ('cliente1@example.com', 'cliente123', 'cliente'),
    ('comprador1@example.com', 'comprador123', 'comprador'),
    ('proveedor1@example.com', 'proveedor123', 'proveedor'),
    ('logistica1@example.com', 'logistica123', 'logistica'),
]

for email, password, expected_rol in test_users:
    user = authenticate(username=email, password=password)
    if user:
        print(f"✅ {email:30} | Rol: {user.rol:12} | Estado: {user.estado}")
    else:
        print(f"❌ {email:30} | AUTHENTICATION FAILED")

print()
print("="*60)
print("DONE")
print("="*60)
