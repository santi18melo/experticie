import os
import sys
import json

# Add src to path
sys.path.append(os.path.join(os.getcwd(), 'src'))
sys.path.append(os.path.join(os.getcwd(), 'src', 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
try:
    django.setup()
except Exception as e:
    print(f"Error setting up Django: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory, force_authenticate
from backend.views.maps import logistics_map_data

def verify_map_endpoint():
    print("Verifying Map Endpoint...")
    
    User = get_user_model()
    # Create a request
    factory = APIRequestFactory()
    request = factory.get('/api/maps/logistica/')
    
    # Create a user for authentication
    try:
        user, created = User.objects.get_or_create(username='test_map_user', defaults={'email': 'test@example.com', 'password': 'password'})
    except Exception:
        user = User.objects.first()
        if not user:
            print("No user found. Skipping.")
            return

    force_authenticate(request, user=user)
    
    # Call the view
    response = logistics_map_data(request)
    
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = json.loads(response.content)
        print("GeoJSON Data:")
        print(json.dumps(data, indent=2))
        
        if data.get('type') == 'FeatureCollection' and len(data.get('features')) > 0:
            print("Verification: SUCCESS")
        else:
            print("Verification: FAILED (Invalid GeoJSON structure)")
    else:
        print("Verification: FAILED (Status code not 200)")

if __name__ == "__main__":
    verify_map_endpoint()
