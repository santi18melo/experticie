# Backend - usuarios/views.py
# Add UserProfileView for /api/users/me/ endpoint

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UsuarioSerializer

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    """
    GET /api/users/me/ - Get current user profile
    PUT /api/users/me/ - Update current user profile
    """
    user = request.user
    
    if request.method == 'GET':
        serializer = UsuarioSerializer(user)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = UsuarioSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
