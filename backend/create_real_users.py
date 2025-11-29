import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")
django.setup()

from apps.usuarios.models import Usuario

def create_user_if_not_exists(email, password, nombre, rol, is_superuser=False):
    if not Usuario.objects.filter(email=email).exists():
        if is_superuser:
            Usuario.objects.create_superuser(email=email, password=password, nombre=nombre)
            print(f"✅ Superusuario creado: {email}")
        else:
            Usuario.objects.create_user(email=email, password=password, nombre=nombre, rol=rol)
            print(f"✅ Usuario {rol} creado: {email}")
    else:
        print(f"ℹ️ Usuario ya existe: {email}")

# Crear usuarios para la prueba
create_user_if_not_exists('admin@prexcol.com', 'Prexcol123!', 'Admin Principal', 'admin', is_superuser=True)
create_user_if_not_exists('proveedor@prexcol.com', 'Prexcol123!', 'Proveedor Test', 'proveedor')
create_user_if_not_exists('cliente@prexcol.com', 'Prexcol123!', 'Cliente Test', 'cliente')
create_user_if_not_exists('logistica@prexcol.com', 'Prexcol123!', 'Logistica Test', 'logistica')
