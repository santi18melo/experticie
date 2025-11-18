from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Usuario
from .serializers import UsuarioSerializer, LoginSerializer
from .permissions import IsAdmin
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView


# -----------------------------
# LOGIN SIN CSRF (CORRECTO)
# -----------------------------
@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------
# REGISTRO
# -----------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "message": "Usuario registrado con éxito",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "nombre": user.nombre,
                    "rol": user.rol,
                },
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
            },
            status=status.HTTP_201_CREATED,
        )
    return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------
# API ROOT
# -----------------------------
@api_view(["GET"])
def api_root(request):
    return Response(
        {
            "usuarios": request.build_absolute_uri("usuarios/"),
            "dashboard_admin": request.build_absolute_uri("dashboard/admin/"),
            "tienda_cliente": request.build_absolute_uri("cliente/tienda/"),
        }
    )


# -----------------------------
# USUARIO VIEWSET
# -----------------------------
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsAdmin()]


# -----------------------------
# DASHBOARD ADMIN
# -----------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdmin])
def dashboard_admin(request):
    from django.db.models import Count

    estadisticas = {
        "total_usuarios": Usuario.objects.count(),
        "usuarios_activos": Usuario.objects.filter(estado=True).count(),
        "rol_distribution": dict(
            Usuario.objects.values("rol").annotate(count=Count("id")).values_list("rol", "count")
        ),
    }

    usuarios = Usuario.objects.all()
    usuarios_data = UsuarioSerializer(usuarios, many=True).data

    return Response(
        {
            "message": "Bienvenido al panel de administrador",
            "estadisticas": estadisticas,
            "usuarios": usuarios_data,
        }
    )


# -----------------------------
# TIENDA CLIENTE
# -----------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def tienda_cliente(request):
    if request.user.rol not in ["cliente", "comprador"]:
        return Response({"error": "No autorizado"}, status=403)

    return Response(
        {
            "message": "Bienvenido a la tienda",
            "usuario": {
                "id": request.user.id,
                "nombre": request.user.nombre,
                "email": request.user.email,
                "rol": request.user.rol,
            },
        }
    )
