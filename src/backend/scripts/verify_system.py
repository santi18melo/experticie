"""
Script de verificación completa del sistema PREXCOL
Verifica que todos los componentes estén funcionando correctamente
"""
import os
import sys
import django
import requests
from datetime import datetime

# Setup Django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from apps.usuarios.models import Usuario

def print_section(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")

def check_database():
    """Verificar conexión a base de datos"""
    print_section("🗄️  VERIFICACIÓN DE BASE DE DATOS")
    
    try:
        total_users = Usuario.objects.count()
        active_users = Usuario.objects.filter(estado=True).count()
        
        print(f"✅ Conexión a BD exitosa")
        print(f"   Total usuarios: {total_users}")
        print(f"   Usuarios activos: {active_users}")
        
        # Verificar usuarios por rol
        roles = ['admin', 'proveedor', 'logistica', 'cliente']
        for rol in roles:
            count = Usuario.objects.filter(rol=rol, estado=True).count()
            status = "✅" if count > 0 else "⚠️"
            print(f"   {status} {rol.capitalize()}: {count}")
        
        return True
    except Exception as e:
        print(f"❌ Error en BD: {e}")
        return False

def check_backend_server():
    """Verificar que el servidor backend esté corriendo"""
    print_section("🔧 VERIFICACIÓN DE SERVIDOR BACKEND")
    
    try:
        response = requests.get('http://127.0.0.1:8000/api/', timeout=5)
        print(f"✅ Servidor backend respondiendo (Status: {response.status_code})")
        return True
    except requests.exceptions.ConnectionError:
        print("❌ Servidor backend NO está corriendo")
        print("   Ejecuta: python src/backend/manage.py runserver 8000")
        return False
    except Exception as e:
        print(f"❌ Error verificando backend: {e}")
        return False

def check_endpoints():
    """Verificar endpoints críticos"""
    print_section("🌐 VERIFICACIÓN DE ENDPOINTS")
    
    endpoints = [
        ('GET', '/api/usuarios/', 'Usuarios'),
        ('GET', '/api/productos/tiendas/', 'Tiendas'),
        ('GET', '/api/productos/productos/', 'Productos'),
    ]
    
    results = []
    for method, endpoint, name in endpoints:
        try:
            url = f'http://127.0.0.1:8000{endpoint}'
            response = requests.get(url, timeout=5)
            status = "✅" if response.status_code in [200, 401] else "⚠️"
            print(f"{status} {name}: {response.status_code}")
            results.append(response.status_code in [200, 401])
        except Exception as e:
            print(f"❌ {name}: Error - {e}")
            results.append(False)
    
    return all(results)

def check_files():
    """Verificar archivos críticos"""
    print_section("📁 VERIFICACIÓN DE ARCHIVOS")
    
    critical_files = [
        'src/frontend/src/components/common/LoadingSpinner.jsx',
        'src/frontend/src/components/common/Toast.jsx',
        'src/frontend/src/components/common/ConfirmDialog.jsx',
        'src/frontend/src/components/common/DataTable.jsx',
        'src/frontend/src/components/admin/LiveMetricsModal.jsx',
        'src/frontend/src/context/ThemeContext.jsx',
        'src/frontend/src/context/I18nContext.jsx',
        'src/backend/apps/usuarios/views/views_admin.py',
        'docs/RESUMEN_MEJORAS_COMPLETO.md',
    ]
    
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    results = []
    
    for file_path in critical_files:
        full_path = os.path.join(base_dir, file_path)
        exists = os.path.exists(full_path)
        status = "✅" if exists else "❌"
        file_name = os.path.basename(file_path)
        print(f"{status} {file_name}")
        results.append(exists)
    
    return all(results)

def check_frontend():
    """Verificar que el frontend esté corriendo"""
    print_section("⚛️  VERIFICACIÓN DE FRONTEND")
    
    try:
        response = requests.get('http://127.0.0.1:5175/', timeout=5)
        print(f"✅ Frontend respondiendo (Status: {response.status_code})")
        return True
    except requests.exceptions.ConnectionError:
        print("⚠️  Frontend NO está corriendo")
        print("   Ejecuta: cd src/frontend && npm run dev")
        return False
    except Exception as e:
        print(f"❌ Error verificando frontend: {e}")
        return False

def main():
    print("\n" + "🚀 " * 20)
    print("   VERIFICACIÓN COMPLETA DEL SISTEMA PREXCOL")
    print("🚀 " * 20)
    print(f"\nFecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    results = {
        'Base de Datos': check_database(),
        'Servidor Backend': check_backend_server(),
        'Endpoints API': check_endpoints(),
        'Archivos Críticos': check_files(),
        'Frontend': check_frontend(),
    }
    
    print_section("📊 RESUMEN FINAL")
    
    all_ok = True
    for component, status in results.items():
        icon = "✅" if status else "❌"
        print(f"{icon} {component}: {'OK' if status else 'FALLO'}")
        if not status:
            all_ok = False
    
    print("\n" + "="*60)
    if all_ok:
        print("🎉 ¡SISTEMA COMPLETAMENTE FUNCIONAL!")
    else:
        print("⚠️  Algunos componentes necesitan atención")
    print("="*60 + "\n")
    
    return all_ok

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)
