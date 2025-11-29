import os
import django

import sys
from pathlib import Path

# Add project root to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(BASE_DIR))
sys.path.append(str(BASE_DIR / 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from apps.usuarios.models import Usuario

ROLES = [
    ("admin", "Administrador"),
    ("comprador", "Comprador"),
    ("proveedor", "Proveedor"),
    ("logistica", "Logística"),
    ("cliente", "Cliente"),
]

def create_users():
    created_users = []
    print("Creating demo users...")
    
    for role_code, role_name in ROLES:
        print(f"\nRole: {role_name} ({role_code})")
        for i in range(1, 4):
            email = f"{role_code}{i}@prexcol.com"
            password = f"Pass{role_code.capitalize()}{i}*"
            nombre = f"{role_name} {i}"
            
            user, created = Usuario.objects.get_or_create(
                email=email,
                defaults={
                    'nombre': nombre,
                    'rol': role_code,
                    'estado': True
                }
            )
            
            if created:
                user.set_password(password)
                user.save()
                action = "Created"
            else:
                # Reset password to ensure we know it
                user.set_password(password)
                user.save()
                action = "Updated"
                
            print(f"  - {action}: {email} / {password}")
            created_users.append({'email': email, 'password': password, 'role': role_name})

    print("\n" + "="*50)
    print("RESUMEN DE CREDENCIALES")
    print("="*50)
    for u in created_users:
        print(f"Rol: {u['role']:<15} | User: {u['email']:<25} | Pass: {u['password']}")

if __name__ == '__main__':
    create_users()
