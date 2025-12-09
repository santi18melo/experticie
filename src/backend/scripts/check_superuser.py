import os
import sys
import django

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from apps.usuarios.models import Usuario

print("=" * 70)
print("VERIFICANDO SUPERUSUARIO")
print("=" * 70)

superusuarios = Usuario.objects.filter(is_superuser=True)

if superusuarios.exists():
    print(f"\n✅ Superusuarios encontrados: {superusuarios.count()}")
    for su in superusuarios:
        print(f"\n   Email: {su.email}")
        print(f"   Nombre: {su.nombre}")
        print(f"   Rol: {su.rol}")
        print(f"   Activo: {su.estado}")
else:
    print("\n❌ NO HAY SUPERUSUARIOS")
    print("\n🔧 Creando superusuario único...")
    
    superuser = Usuario.objects.create_superuser(
        email='admin@prexcol.com',
        nombre='Administrador PREXCOL',
        password='Admin2024!Prexcol'
    )
    
    print(f"\n✅ Superusuario creado exitosamente:")
    print(f"   Email: {superuser.email}")
    print(f"   Nombre: {superuser.nombre}")
    print(f"   Password: Admin2024!Prexcol")
    print(f"\n⚠️  IMPORTANTE: Guarda estas credenciales de forma segura")

print("\n" + "=" * 70)
