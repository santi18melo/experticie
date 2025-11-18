# usuarios/serializers.py
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=False, allow_blank=False, min_length=6
    )

    class Meta:
        model = Usuario
        fields = [
            "id",
            "email",
            "nombre",
            "password",
            "rol",
            "telefono",
            "direccion",
            "estado",
            "fecha_creacion",
            "ultimo_ingreso",
        ]
        read_only_fields = [
            "id",
            "fecha_creacion",
            "ultimo_ingreso",
        ]  # NO incluir 'email' aquí

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        # Usar el manager para crear usuario (normaliza email, maneja password)
        user = Usuario.objects.create_user(
            email=validated_data.get("email"),
            nombre=validated_data.get("nombre"),
            password=password,
            **{k: v for k, v in validated_data.items() if k not in ("email", "nombre")},
        )
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        # Evitar actualizar email por seguridad si quieres; si lo permites, quítalo de validated_data o valídalo
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        # No usamos Usuario.objects.get + check_password directamente; usamos authenticate
        from django.contrib.auth import authenticate

        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError("Email o contraseña incorrectos")

        if not user.is_active:
            raise serializers.ValidationError("Cuenta inactiva")

        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "email": user.email,
                "nombre": user.nombre,
                "rol": user.rol,
            },
        }
