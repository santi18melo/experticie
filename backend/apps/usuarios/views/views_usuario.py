# prexcol/usuarios/views_usuario.py

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from ..serializers import UsuarioSerializer


User = get_user_model()
class UsuarioViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar usuarios: listar, crear, actualizar, eliminar.
    """
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]



    @action(detail=False, methods=['get'])
    def me(self, request):
        """
        Retorna los datos del usuario autenticado
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
