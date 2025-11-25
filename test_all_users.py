#!/usr/bin/env python
"""
Parallel User Login Test Script
Tests all users from the database via API calls
"""
import os
import sys
import django

# Setup Django
sys.path.insert(0, 'backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from usuarios.models import Usuario
import requests
import json
from datetime import datetime

API_BASE = "http://localhost:8000/api"
TEST_PASSWORD = "TestUser123!"
ADMIN_PASSWORD = "Prexcol123!"

def test_login(email, password):
    """Test login for a user"""
    try:
        response = requests.post(
            f"{API_BASE}/auth/login/",
            json={"email": email, "password": password},
            timeout=5
        )
        return {
            "status_code": response.status_code,
            "success": response.status_code == 200,
            "data": response.json() if response.status_code == 200 else None,
            "error": response.text if response.status_code != 200 else None
        }
    except Exception as e:
        return {
            "status_code": 0,
            "success": False,
            "data": None,
            "error": str(e)
        }

def main():
    print("=" * 60)
    print("PREXCOL - Parallel User Login Testing")
    print("=" * 60)
    print(f"Started at: {datetime.now()}")
    print()
    
    users = Usuario.objects.all().order_by('id')
    total = users.count()
    
    print(f"Found {total} users in database")
    print("-" * 60)
    
    results = []
    
    for idx, user in enumerate(users, 1):
        print(f"[{idx}/{total}] Testing: {user.email} (rol: {user.rol})")
        
        # Determine password to try
        if user.email == 'admin@prexcol.com':
            password = ADMIN_PASSWORD
        else:
            password = TEST_PASSWORD
        
        # Attempt login
        result = test_login(user.email, password)
        
        results.append({
            "id": user.id,
            "email": user.email,
            "rol": user.rol,
            "password_tried": password,
            "success": result["success"],
            "status_code": result["status_code"],
            "error": result["error"]
        })
        
        if result["success"]:
            print(f"  ✅ SUCCESS - Token received")
        else:
            print(f"  ❌ FAILED - {result['error'][:100] if result['error'] else 'Unknown error'}")
        print()
    
    # Summary
    print("=" * 60)
    print("SUMMARY")
    print("=" * 60)
    successful = sum(1 for r in results if r["success"])
    failed = total - successful
    
    print(f"Total Users:  {total}")
    print(f"Successful:   {successful} ({100*successful/total:.1f}%)")
    print(f"Failed:       {failed} ({100*failed/total:.1f}%)")
    print()
    
    if failed > 0:
        print("Failed Users:")
        for r in results:
            if not r["success"]:
                print(f"  - {r['email']} (rol: {r['rol']}): {r['error'][:80]}")
    
    # Save results
    with open('test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print()
    print(f"Finished at: {datetime.now()}")
    print("Results saved to: test_results.json")
    print("=" * 60)

if __name__ == "__main__":
    main()
