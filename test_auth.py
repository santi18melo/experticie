#!/usr/bin/env python
import sys
sys.path.insert(0, 'backend')
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'
import django
django.setup()

from django.contrib.auth import authenticate
from usuarios.models import Usuario

print("=" * 60)
print("AUTHENTICATION TEST")
print("=" * 60)

# Get admin user
u = Usuario.objects.get(email='admin@prexcol.com')
print(f"User exists: {u.email}")
print(f"User role: {u.rol}")
print(f"User active: {u.estado}")
print(f"Password set: {bool(u.password)}")
print(f"Password check: {u.check_password('Prexcol123!')}")
print()

# Test authenticate
print("Testing authenticate()...")
auth_result = authenticate(username='admin@prexcol.com', password='Prexcol123!')
print(f"Authenticate result: {auth_result}")
print(f"Auth is None: {auth_result is None}")

if auth_result:
    print("✅ AUTHENTICATION SUCCESSFUL")
else:
    print("❌ AUTHENTICATION FAILED")
    print()
    print("Checking configuration...")
    from django.conf import settings
    print(f"AUTH_USER_MODEL: {settings.AUTH_USER_MODEL}")
    print(f"AUTHENTICATION_BACKENDS: {getattr(settings, 'AUTHENTICATION_BACKENDS', 'NOT SET')}")
