import os
import sys
import django

# Setup Django
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from apps.usuarios.models import Usuario

# Create admin user
try:
    admin = Usuario.objects.create_superuser(
        email='admin@example.com',
        nombre='Administrador',
        password='admin123'
    )
    print(f"✅ Usuario admin creado exitosamente: {admin.email}")
except Exception as e:
    if 'UNIQUE constraint' in str(e):
        print("⚠️ El usuario admin ya existe. Actualizando contraseña...")
        admin = Usuario.objects.get(email='admin@example.com')
        admin.set_password('admin123')
        admin.is_staff = True
        admin.is_superuser = True
        admin.save()
        print(f"✅ Contraseña actualizada para: {admin.email}")
    else:
        print(f"❌ Error: {e}")
