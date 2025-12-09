import os
import sys
import django

# Setup Django
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from usuarios.models import Usuario

# Create test users
test_users = [
    {
        'email': 'cliente1@example.com',
        'nombre': 'Cliente Uno',
        'password': 'cliente123',
        'rol': 'cliente'
    },
    {
        'email': 'vendedor1@example.com',
        'nombre': 'Vendedor Uno',
        'password': 'vendedor123',
        'rol': 'vendedor'
    },
    {
        'email': 'investigador1@example.com',
        'nombre': 'Investigador Uno',
        'password': 'investigador123',
        'rol': 'investigador'
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
            print(f"✅ Contraseña actualizada: {user.email}")
        else:
            print(f"❌ Error creando {user_data['email']}: {e}")

print("\n📊 Resumen de usuarios:")
for rol in ['admin', 'cliente', 'vendedor', 'investigador']:
    count = Usuario.objects.filter(rol=rol).count()
    print(f"  {rol.capitalize()}: {count}")
