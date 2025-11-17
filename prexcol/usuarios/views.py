from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Usuario
from .serializers import UsuarioSerializer, LoginSerializer
from .permissions import IsAdmin


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """Endpoint para login con email y password"""
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Endpoint para registrar nuevo usuario"""
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {
                "message": "Usuario registrado con éxito",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "nombre": user.nombre,
                    "rol": user.rol,
                }
            },
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def api_root(request):
    return Response({
        "usuarios": request.build_absolute_uri('usuarios/'),
        "dashboard_admin": request.build_absolute_uri('dashboard/admin/'),
        "tienda_cliente": request.build_absolute_uri('cliente/tienda/'),
    })


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    def get_permissions(self):
        """
        Permite GET (list/retrieve) a cualquier usuario autenticado.
        POST, PUT, PATCH, DELETE solo a admin.
        """
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        # Para POST, PUT, PATCH, DELETE: requiere IsAuthenticated e IsAdmin
        return [IsAuthenticated(), IsAdmin()]


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def dashboard_admin(request):
    # Obtener estadísticas del sistema
    from django.db.models import Count
    estadisticas = {
        "total_usuarios": Usuario.objects.count(),
        "usuarios_activos": Usuario.objects.filter(estado=True).count(),
        "rol_distribution": dict(
            Usuario.objects.values('rol').annotate(count=Count('id')).values_list('rol', 'count')
        )
    }
    # Incluir listado de usuarios (serializado) para consumo por el frontend
    from .serializers import UsuarioSerializer
    usuarios = Usuario.objects.all()
    usuarios_data = UsuarioSerializer(usuarios, many=True).data

    return Response({
        "message": "Bienvenido al panel de administrador",
        "estadisticas": estadisticas,
        "usuarios": usuarios_data,
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tienda_cliente(request):
    if request.user.rol not in ['cliente', 'comprador']:
        return Response({"error": "No autorizado"}, status=403)
    return Response({
        "message": "Bienvenido a la tienda",
        "usuario": {
            "id": request.user.id,
            "nombre": request.user.nombre,
            "email": request.user.email,
            "rol": request.user.rol
        }
    })
