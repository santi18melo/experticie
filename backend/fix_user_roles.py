import os
import sys
import django

# Setup Django
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from usuarios.models import Usuario

# Delete invalid users
print("🗑️ Eliminando usuarios con roles inválidos...")
Usuario.objects.filter(rol__in=['vendedor', 'investigador']).delete()

# Create test users with VALID roles
test_users = [
    {
        'email': 'cliente1@example.com',
        'nombre': 'Cliente Uno',
        'password': 'cliente123',
        'rol': 'cliente'
    },
    {
        'email': 'comprador1@example.com',
        'nombre': 'Comprador Uno',
        'password': 'comprador123',
        'rol': 'comprador'
    },
    {
        'email': 'proveedor1@example.com',
        'nombre': 'Proveedor Uno',
        'password': 'proveedor123',
        'rol': 'proveedor'
    },
    {
        'email': 'logistica1@example.com',
        'nombre': 'Logística Uno',
        'password': 'logistica123',
        'rol': 'logistica'
    }
]

for user_data in test_users:
    try:
        user = Usuario.objects.create_user(
            email=user_data['email'],
            nombre=user_data['nombre'],
            password=user_data['password'],
            rol=user_data['rol']
        )
        print(f"✅ Usuario creado: {user.email} (Rol: {user.rol})")
    except Exception as e:
        if 'UNIQUE constraint' in str(e):
            print(f"⚠️ Usuario ya existe: {user_data['email']}")
            user = Usuario.objects.get(email=user_data['email'])
            user.set_password(user_data['password'])
            user.rol = user_data['rol']
            user.save()
            print(f"✅ Contraseña y rol actualizados: {user.email}")
        else:
            print(f"❌ Error creando {user_data['email']}: {e}")

print("\n📊 Resumen de usuarios:")
for rol_code, rol_name in Usuario.ROLES:
    count = Usuario.objects.filter(rol=rol_code).count()
    print(f"  {rol_name}: {count}")
