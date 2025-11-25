from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


# =======================
#   MANAGER PERSONALIZADO
# =======================
class UsuarioManager(BaseUserManager):
    def create_user(self, email, nombre, password=None, **extra_fields):
        if not email:
            raise ValueError("El usuario debe tener un correo electrónico.")
        if not nombre:
            raise ValueError("El usuario debe tener un nombre.")

        email = self.normalize_email(email)
        user = self.model(email=email, nombre=nombre, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nombre, password=None, **extra_fields):
        extra_fields.setdefault("rol", "admin")
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, nombre, password, **extra_fields)


# =======================
#       MODELO USUARIO
# =======================
class Usuario(AbstractBaseUser, PermissionsMixin):
    ROLES = [
        ("admin", "Administrador"),
        ("comprador", "Comprador"),
        ("proveedor", "Proveedor"),
        ("logistica", "Logística"),
        ("cliente", "Cliente"),
    ]

    email = models.EmailField(unique=True, max_length=255)
    nombre = models.CharField(max_length=100)
    rol = models.CharField(max_length=20, choices=ROLES, default="cliente")
    telefono = models.CharField(max_length=20, blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)
    estado = models.BooleanField(default=True)

    fecha_creacion = models.DateTimeField(auto_now_add=True)
    ultimo_ingreso = models.DateTimeField(null=True, blank=True)

    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nombre"]

    def __str__(self):
        return f"{self.nombre} - {self.get_rol_display()}"
