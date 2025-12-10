from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

import random

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logistics_map_data(request):
    """
    Returns GeoJSON data for logistics map.
    Simulates data since we don't have real lat/lng in the DB yet.
    """
    # In a real app, we would query the DB for orders with addresses
    # and geocode them or use stored coordinates.
    # For now, we return mock data to demonstrate the map functionality.
    
    # Bogota Center
    center_lat = 4.6097
    center_lng = -74.0817
    
    features = []
    
    # Simulate some orders
    for i in range(5):
        # Random offset
        lat_offset = (random.random() - 0.5) * 0.1
        lng_offset = (random.random() - 0.5) * 0.1
        
        features.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [center_lng + lng_offset, center_lat + lat_offset]
            },
            "properties": {
                "id": i + 1,
                "title": f"Pedido #{i + 1}",
                "description": "En preparación"
            }
        })

    geojson = {
        "type": "FeatureCollection",
        "features": features
    }
    
    return JsonResponse(geojson)
