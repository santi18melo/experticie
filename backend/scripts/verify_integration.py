import os
import sys
from pathlib import Path

def check_file(path, description):
    if os.path.exists(path):
        print(f"✅ {description} found: {path}")
        return True
    else:
        print(f"❌ {description} MISSING: {path}")
        return False

def check_content(path, content_snippet):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            if content_snippet in content:
                print(f"✅ Content check passed for {os.path.basename(path)}")
                return True
            else:
                print(f"❌ Content check FAILED for {os.path.basename(path)}. Missing: '{content_snippet}'")
                return False
    except Exception as e:
        print(f"❌ Error reading {path}: {e}")
        return False

def main():
    print("🚀 Starting Integration Verification for PREXCOL...\n")
    
    base_dir = Path(__file__).resolve().parent.parent.parent
    backend_dir = base_dir / 'backend'
    frontend_dir = base_dir / 'frontend'
    
    # 1. Check Backend Config
    print("--- Backend Checks ---")
    check_file(backend_dir / 'settings.py', "Django Settings")
    check_file(base_dir / 'Procfile', "Procfile (PaaS Deployment)")
    check_file(base_dir / 'requirements-prod.txt', "Production Requirements")
    check_content(backend_dir / 'settings.py', "whitenoise.middleware.WhiteNoiseMiddleware")
    check_content(backend_dir / 'settings.py', "SECURE_SSL_REDIRECT = True")
    
    # 2. Check Frontend Config
    print("\n--- Frontend Checks ---")
    check_file(base_dir / 'netlify.toml', "Netlify Configuration")
    check_file(frontend_dir / '.env.production', "Frontend Production Env")
    check_file(frontend_dir / 'public' / '_redirects', "Netlify Redirects Fallback")
    check_content(base_dir / 'netlify.toml', 'command = "npm install && npm run build"')
    
    # 3. Check Documentation
    print("\n--- Documentation Checks ---")
    check_file(base_dir / 'docs' / 'GUIA_DESPLIEGUE_NETLIFY.md', "Deployment Guide")
    
    print("\n✨ Verification Complete!")

if __name__ == "__main__":
    main()
