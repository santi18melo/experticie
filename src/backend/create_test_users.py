import os
import sys
import django

# Setup Django
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from apps.usuarios.models import Usuario

if __name__ == "__main__":
    # Create test users
    test_users = [
        {
            'email': 'admin1@example.com',
            'nombre': 'Admin Uno',
            'password': 'admin123',
            'rol': 'admin'
        },
        {
            'email': 'cliente1@example.com',
            'nombre': 'Cliente Uno',
            'password': 'cliente123',
            'rol': 'cliente'
        },
        {
            'email': 'proveedor1@example.com',
            'nombre': 'Proveedor Uno',
            'password': 'proveedor123',
            'rol': 'proveedor'
        },
        {
            'email': 'logistica1@example.com',
            'nombre': 'Logistica Uno',
            'password': 'logistica123',
            'rol': 'logistica'
        }
    ]

    for user_data in test_users:
        try:
            if user_data['rol'] == 'admin':
                 # Check if exists to avoid error or duplicate logic handled below, 
                 # but create_superuser is specific so let's try create_superuser
                 if not Usuario.objects.filter(email=user_data['email']).exists():
                     user = Usuario.objects.create_superuser(
                        email=user_data['email'],
                        nombre=user_data['nombre'],
                        password=user_data['password']
                     )
                     print(f"✅ Superusuario creado: {user.email}")
                 else:
                     print(f"⚠️ Usuario ya existe: {user_data['email']}")
                     # Update if needed? Admin usually stays admin.
                     user = Usuario.objects.get(email=user_data['email'])
                     # Ensure is admin
                     if user.rol != 'admin':
                         user.rol = 'admin'
                         user.is_superuser = True
                         user.is_staff = True
                         user.save()
                         print(f"✅ Rol actualizado a admin: {user.email}")
            else:
                user = Usuario.objects.create_user(
                    email=user_data['email'],
                    nombre=user_data['nombre'],
                    password=user_data['password'],
                    rol=user_data['rol']
                )
                print(f"✅ Usuario creado: {user.email} (Rol: {user.rol})")
        except Exception as e:
            if 'UNIQUE constraint' in str(e) or 'already exists' in str(e):
                print(f"⚠️ Usuario ya existe: {user_data['email']}")
                try:
                    user = Usuario.objects.get(email=user_data['email'])
                    user.set_password(user_data['password'])
                    user.rol = user_data['rol']
                    if user.rol == 'admin':
                        user.is_staff = True
                        user.is_superuser = True
                    user.save()
                    print(f"✅ Datos actualizados: {user.email}")
                except Exception as update_error:
                     print(f"❌ Error actualizando {user_data['email']}: {update_error}")
            else:
                print(f"❌ Error creando {user_data['email']}: {e}")

    print("\n📊 Resumen de usuarios:")
    for rol in ['admin', 'cliente', 'proveedor', 'logistica']:
        count = Usuario.objects.filter(rol=rol).count()
        print(f"  {rol.capitalize()}: {count}")
