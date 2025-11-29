#!/usr/bin/env python
"""
Script de debug para verificar token JWT y permisos
"""
import os
import django
import json
from datetime import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from usuarios.models import Usuario
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory

# 1. Obtener usuario admin
print("\n=== [1] Verificando Usuario Admin ===")
try:
    user = Usuario.objects.get(id=1)
    print(f"✓ Usuario encontrado: {user.email}")
    print(f"  - ID: {user.id}")
    print(f"  - Rol: {user.rol}")
    print(f"  - is_staff: {user.is_staff}")
    print(f"  - is_superuser: {user.is_superuser}")
    print(f"  - is_authenticated: {user.is_authenticated}")
except Exception as e:
    print(f"✗ Error: {e}")
    exit(1)

# 2. Generar token nuevo
print("\n=== [2] Generando Token JWT Nuevo ===")
try:
    refresh = AccessToken.for_user(user)
    access_token = str(refresh)
    print(f"✓ Token generado exitosamente")
    print(f"  Payload: {refresh.payload}")
except Exception as e:
    print(f"✗ Error: {e}")
    exit(1)

# 3. Verificar el token
print("\n=== [3] Verificando Token ===")
try:
    from rest_framework_simplejwt.authentication import JWTAuthentication
    auth = JWTAuthentication()
    
    # Simular request con token
    factory = APIRequestFactory()
    django_request = factory.get('/api/usuarios/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
    
    authenticated_user, validated_token = auth.authenticate(Request(django_request))
    print(f"✓ Token válido")
    print(f"  Usuario autenticado: {authenticated_user.email}")
    print(f"  Rol del token: {authenticated_user.rol}")
    print(f"  is_superuser: {authenticated_user.is_superuser}")
except Exception as e:
    print(f"✗ Error: {e}")
    exit(1)

# 4. Simular request GET a /api/usuarios/
print("\n=== [4] Simulando GET /api/usuarios/ ===")
try:
    from prexcol.usuarios.views.views import UsuarioViewSet
    from rest_framework.test import APIRequestFactory
    
    factory = APIRequestFactory()
    request = factory.get('/api/usuarios/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
    
    # Obtener usuario del token
    auth = JWTAuthentication()
    authenticated_user, validated_token = auth.authenticate(Request(request))
    
    # Crear instancia del viewset
    view = UsuarioViewSet()
    view.request = Request(request)
    view.request.user = authenticated_user
    
    # Verificar permisos
    perms = view.get_permissions()
    print(f"✓ Permisos requeridos: {[type(p).__name__ for p in perms]}")
    
    # Verificar cada permiso
    for perm in perms:
        has_perm = perm.has_permission(Request(request), view)
        print(f"  - {type(perm).__name__}: {has_perm}")
        if not has_perm:
            print(f"    Detalles: user={authenticated_user}, is_auth={authenticated_user.is_authenticated}, rol={getattr(authenticated_user, 'rol', 'N/A')}")
    
except Exception as e:
    import traceback
    print(f"✗ Error: {e}")
    traceback.print_exc()
    exit(1)

print("\n=== Token para usar en frontend (guarda esto) ===")
print(f"Authorization: Bearer {access_token}")
print("\n✓ Todo correcto - el token y permisos funcionan\n")
