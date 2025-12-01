from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, status
from django.utils import timezone
from django_ratelimit.decorators import ratelimit
from ..models import Usuario
from ..serializers import (
    UsuarioSerializer, 
    LogoutSerializer, 
    RegisterSerializer, 
    LoginSerializer,
    generate_tokens_for_user
)

# ------------------------------------------------------------
#   REGISTRO DE USUARIO
# ------------------------------------------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = serializer.save()
    tokens = generate_tokens_for_user(user)

    return Response(
        {
            "message": "Usuario registrado correctamente",
            "user": UsuarioSerializer(user).data,
            "tokens": tokens,
        },
        status=status.HTTP_201_CREATED,
    )


# ------------------------------------------------------------
#   LOGIN
# ------------------------------------------------------------
@ratelimit(key='ip', rate='5/m', method='POST', block=True)
@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    serializer = LoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            {"error": "Credenciales inválidas"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    user = serializer.validated_data["user"]

    # Verificar que el usuario esté activo
    if not user.estado:
        return Response(
            {"error": "Tu cuenta ha sido desactivada. Contacta al administrador."},
            status=status.HTTP_403_FORBIDDEN,
        )

    # Actualizar último ingreso
    user.ultimo_ingreso = timezone.now()
    user.save()

    tokens = generate_tokens_for_user(user)

    return Response(
        {
            "access": tokens["access"],
            "refresh": tokens["refresh"],
            "user": UsuarioSerializer(user).data,
        },
        status=status.HTTP_200_OK,
    )


# ------------------------------------------------------------
#   LOGOUT
# ------------------------------------------------------------
class LogoutView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Sesión cerrada correctamente"}, status=status.HTTP_204_NO_CONTENT)
