import os
import sys
import django
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(BASE_DIR))
sys.path.append(str(BASE_DIR / 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from apps.usuarios.models import Usuario

try:
    u = Usuario.objects.get(email='admin1@prexcol.com')
    print(f"User found: {u.email}, PK: {u.pk}")
except Usuario.DoesNotExist:
    print("User not found")
