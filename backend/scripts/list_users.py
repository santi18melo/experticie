import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
sys.path.insert(0, os.path.dirname(__file__))
django.setup()

from apps.usuarios.models import Usuario

print("\n" + "="*80)
print("USUARIOS REGISTRADOS EN LA BASE DE DATOS")
print("="*80 + "\n")

usuarios = Usuario.objects.all()

if not usuarios.exists():
    print("⚠️  No hay usuarios en la base de datos.")
    print("   Ejecuta: python scripts/create_test_users.py")
else:
    print(f"Total de usuarios: {usuarios.count()}\n")
    for i, u in enumerate(usuarios, 1):
        print(f"{i}. Email: {u.email}")
        print(f"   Nombre: {u.nombre}")
        print(f"   Rol: {u.rol}")
        print(f"   Estado: {'Activo' if u.estado else 'Inactivo'}")
        print(f"   Hash: {u.password[:50]}...")
        print()

print("="*80)
print("\n✅ Para hacer login, usa estos usuarios con sus contraseñas:")
print("   - admin@prexcol.com / Prexcol123!")
print("   - personal1@prexcol.com / Personal123!")
print("   - demo@example.com / Password123!")
print("\n")
