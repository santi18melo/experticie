from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .models import Usuario


# ------------------------------------------------------------
#   SERIALIZER PARA MOSTRAR USUARIOS
# ------------------------------------------------------------
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "id",
            "email",
            "nombre",
            "rol",
            "telefono",
            "direccion",
            "estado",
            "imagen",
            "password",
            "fecha_creacion",
            "ultimo_ingreso",
            "is_staff",
            "is_superuser",
        ]
        extra_kwargs = {'password': {'write_only': True, 'required': False}}
        read_only_fields = ["id", "fecha_creacion", "ultimo_ingreso"]

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # create_user handles password hashing internally if passed as argument
        # but here we are passing it via kwargs or setting it later
        # Let's use the standard way:
        user = Usuario.objects.create_user(password=password, **validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


# ------------------------------------------------------------
#   SERIALIZER PARA REGISTRO
# ------------------------------------------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = Usuario
        fields = ["email", "nombre", "password", "rol"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = Usuario.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


# ------------------------------------------------------------
#   SERIALIZER PARA LOGIN
# ------------------------------------------------------------
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError("Credenciales inválidas")

        data["user"] = user
        return data


# ------------------------------------------------------------
#   SERIALIZER PARA DEVOLVER TOKEN + DATOS DEL USUARIO
# ------------------------------------------------------------
class UserTokenSerializer(serializers.ModelSerializer):
    access = serializers.CharField(source="token.access_token", read_only=True)
    refresh = serializers.CharField(source="token.refresh_token", read_only=True)

    class Meta:
        model = Usuario
        fields = ["id", "email", "nombre", "rol", "access", "refresh"]


def generate_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
