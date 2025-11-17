#!/usr/bin/env python
"""
Generador de Token JWT para Admin
Ejecuta: python gen_admin_token.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from usuarios.models import Usuario
from rest_framework_simplejwt.tokens import AccessToken

print("\n" + "="*60)
print("🔐 GENERADOR DE TOKEN JWT PARA ADMIN")
print("="*60)

try:
    user = Usuario.objects.get(id=1, rol='admin')
    print(f"\n✓ Usuario encontrado: {user.email}")
    
    # Generar tokens
    access_token = AccessToken.for_user(user)
    refresh_token = str(access_token.token)  # El refresh viene en el payload
    
    print(f"\n📋 CREDENTIALS:")
    print(f"   Email: {user.email}")
    print(f"   Rol: {user.rol}")
    
    print(f"\n🔑 ACCESS TOKEN (1 hora válido):")
    print(f"   {str(access_token)}\n")
    
    print(f"📌 INSTRUCCIONES PARA USAR EN FRONTEND:")
    print(f"   1. Abre DevTools (F12)")
    print(f"   2. Ve a Console")
    print(f"   3. Pega esto:")
    print(f"   localStorage.setItem('token', '{str(access_token)}')")
    print(f"   4. Recarga la página")
    print(f"   5. El panel admin debería cargar sin errores\n")
    
    print(f"✅ Token generado exitosamente")
    print("="*60 + "\n")
    
except Usuario.DoesNotExist:
    print("\n❌ Error: Usuario admin no encontrado en BD")
    print("   Ejecuta: python manage.py createsuperuser\n")
except Exception as e:
    print(f"\n❌ Error: {e}\n")
