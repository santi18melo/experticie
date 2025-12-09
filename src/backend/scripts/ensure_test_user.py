import os
import sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from apps.usuarios.models import Usuario

def create_test_user():
    email = "cliente@test.com"
    password = "Password123!"
    
    if not Usuario.objects.filter(email=email).exists():
        Usuario.objects.create_user(
            email=email,
            password=password,
            nombre="Cliente Test",
            rol="cliente",
            telefono="1234567890"
        )
        print(f"✅ User created: {email} / {password}")
    else:
        print(f"ℹ️ User already exists: {email}")

if __name__ == "__main__":
    create_test_user()
