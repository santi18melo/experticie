from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from ..serializers import (
    RegisterSerializer,
    LoginSerializer,
    UsuarioSerializer,
    generate_tokens_for_user,
)

# ------------------------------------------------------------
#   API ROOT
# ------------------------------------------------------------
@api_view(["GET"])
def api_root(request):
    return Response({"message": "API funcionando"})


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

    # Actualizar último ingreso
    user.ultimo_ingreso = timezone.now()
    user.save()

    tokens = generate_tokens_for_user(user)

    # CRITICAL: Frontend expects 'access' and 'refresh' keys, not 'tokens'
    return Response(
        {
            "access": tokens["access"],
            "refresh": tokens["refresh"],
            "user": UsuarioSerializer(user).data,
        },
        status=status.HTTP_200_OK,
    )
