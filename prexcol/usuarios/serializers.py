from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    
    class Meta:
        model = Usuario
        fields = [
            'id', 'email', 'nombre', 'password', 'rol', 'telefono',
            'direccion', 'estado', 'fecha_creacion', 'ultimo_ingreso'
        ]
        read_only_fields = ['id', 'fecha_creacion', 'ultimo_ingreso', 'email']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = Usuario(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        # Manejar actualización parcial y cambio de contraseña
        # Email es read-only, no se puede actualizar
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        try:
            user = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError('Email o contraseña incorrectos')
        
        if not user.check_password(password):
            raise serializers.ValidationError('Email o contraseña incorrectos')
        
        # Generar tokens
        refresh = RefreshToken.for_user(user)
        
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'email': user.email,
                'nombre': user.nombre,
                'rol': user.rol,
            }
        }
