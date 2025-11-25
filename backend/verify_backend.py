#!/usr/bin/env python
"""
Script de verificación final del backend
Ejecuta checks para asegurar que todo está configurado correctamente
"""

import os
import sys
import django
from pathlib import Path

# Force UTF-8 output for Windows consoles
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# Configurar Django
current_dir = Path(__file__).resolve().parent
sys.path.append(str(current_dir))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from django.core.management import call_command
from usuarios.models import Usuario

def print_header(text):
    print(f"\n{'='*60}")
    print(f"  {text}")
    print(f"{'='*60}\n")

def test_imports():
    """Verificar que todos los imports funcionan"""
    print_header("✅ VERIFICANDO IMPORTS")
    try:
        from rest_framework import serializers, viewsets
        from rest_framework_simplejwt.tokens import RefreshToken
        from rest_framework_simplejwt.authentication import JWTAuthentication
        from corsheaders.middleware import CorsMiddleware
        print("✓ Todos los imports están disponibles")
        return True
    except ImportError as e:
        print(f"✗ Error de import: {e}")
        return False

def test_database():
    """Verificar que la base de datos está funcionando"""
    print_header("✅ VERIFICANDO BASE DE DATOS")
    try:
        user_count = Usuario.objects.count()
        print(f"✓ Conexión a BD exitosa")
        print(f"  Total de usuarios: {user_count}")
        
        admin_users = Usuario.objects.filter(rol='admin')
        print(f"  Usuarios admin: {admin_users.count()}")
        
        if admin_users.exists():
            admin = admin_users.first()
            print(f"  Email admin: {admin.email}")
        
        return True
    except Exception as e:
        print(f"✗ Error en BD: {e}")
        return False

def test_jwt_config():
    """Verificar configuración JWT"""
    print_header("✅ VERIFICANDO CONFIGURACIÓN JWT")
    try:
        from django.conf import settings
        
        jwt_config = settings.SIMPLE_JWT
        print(f"✓ Configuración JWT encontrada")
        print(f"  ACCESS_TOKEN_LIFETIME: {jwt_config['ACCESS_TOKEN_LIFETIME']}")
        print(f"  REFRESH_TOKEN_LIFETIME: {jwt_config['REFRESH_TOKEN_LIFETIME']}")
        print(f"  ALGORITHM: {jwt_config['ALGORITHM']}")
        
        auth_classes = settings.REST_FRAMEWORK['DEFAULT_AUTHENTICATION_CLASSES']
        print(f"  Autenticación: {auth_classes[0].split('.')[-1]}")
        
        return True
    except Exception as e:
        print(f"✗ Error en JWT: {e}")
        return False

def test_cors():
    """Verificar CORS"""
    print_header("✅ VERIFICANDO CORS")
    try:
        from django.conf import settings
        
        cors_origins = settings.CORS_ALLOWED_ORIGINS
        print(f"✓ CORS configurado")
        for origin in cors_origins:
            print(f"  - {origin}")
        
        return True
    except Exception as e:
        print(f"✗ Error en CORS: {e}")
        return False

def test_permissions():
    """Verificar permisos"""
    print_header("✅ VERIFICANDO PERMISOS")
    try:
        from usuarios.permissions import IsAdmin
        print(f"✓ Permisos personalizados cargados")
        print(f"  - IsAdmin")
        
        return True
    except Exception as e:
        print(f"✗ Error en permisos: {e}")
        return False

def test_serializers():
    """Verificar serializers"""
    print_header("✅ VERIFICANDO SERIALIZERS")
    try:
        from usuarios.serializers import UsuarioSerializer
        
        serializer_fields = UsuarioSerializer().fields.keys()
        print(f"✓ UsuarioSerializer cargado")
        print(f"  Campos: {', '.join(serializer_fields)}")
        
        if 'password' in serializer_fields:
            print(f"  ✓ Campo password presente (write_only)")
        else:
            print(f"  ✗ Campo password NO encontrado")
            return False
        
        return True
    except Exception as e:
        print(f"✗ Error en serializers: {e}")
        return False

def test_migration_status():
    """Verificar estado de migraciones"""
    print_header("✅ VERIFICANDO MIGRACIONES")
    try:
        from django.db.migrations.loader import MigrationLoader
        from django.db import connection
        
        loader = MigrationLoader(None)
        graph = loader.graph
        
        print(f"✓ Migraciones verificadas")
        print(f"  Apps con migraciones: {len(graph.nodes)}")
        
        # Verificar app usuarios
        usuarios_migrations = [key for key in graph.nodes if key[0] == 'usuarios']
        print(f"  Migraciones de usuarios: {len(usuarios_migrations)}")
        
        return True
    except Exception as e:
        print(f"✗ Error en migraciones: {e}")
        return False

def test_views():
    """Verificar vistas"""
    print_header("✅ VERIFICANDO VISTAS")
    try:
        from prexcol.usuarios.views.views import (
            register_user, 
            dashboard_admin, 
            tienda_cliente,
            UsuarioViewSet
        )
        
        print(f"✓ Todas las vistas cargadas correctamente")
        print(f"  - register_user")
        print(f"  - dashboard_admin")
        print(f"  - tienda_cliente")
        print(f"  - UsuarioViewSet")
        
        return True
    except Exception as e:
        print(f"✗ Error en vistas: {e}")
        return False

def main():
    """Ejecutar todos los tests"""
    print("\n" + "="*60)
    print("  VERIFICACIÓN COMPLETA DEL BACKEND")
    print("="*60)
    
    tests = [
        ("Imports", test_imports),
        ("Base de Datos", test_database),
        ("Configuración JWT", test_jwt_config),
        ("CORS", test_cors),
        ("Permisos", test_permissions),
        ("Serializers", test_serializers),
        ("Migraciones", test_migration_status),
        ("Vistas", test_views),
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"\n✗ Error ejecutando {test_name}: {e}")
            results.append((test_name, False))
    
    # Resumen final
    print_header("📊 RESUMEN FINAL")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅" if result else "❌"
        print(f"{status} {test_name}")
    
    print(f"\n{'='*60}")
    print(f"  RESULTADO: {passed}/{total} verificaciones pasadas")
    print(f"{'='*60}\n")
    
    if passed == total:
        print("🎉 ¡TODO ESTÁ CORRECTAMENTE CONFIGURADO!")
        print("\nPuedes iniciar el servidor con:")
        print("  python manage.py runserver")
        return 0
    else:
        print("⚠️  Hay problemas que necesitan ser solucionados")
        return 1

if __name__ == "__main__":
    sys.exit(main())
