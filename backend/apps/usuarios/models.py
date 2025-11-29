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
    imagen = models.ImageField(upload_to='perfiles/', null=True, blank=True)

    fecha_creacion = models.DateTimeField(auto_now_add=True)
    ultimo_ingreso = models.DateTimeField(null=True, blank=True)
    last_activity = models.DateTimeField(null=True, blank=True)

    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nombre"]

    def __str__(self):
        return f"{self.nombre} - {self.get_rol_display()}"

    def set_password(self, raw_password):
        from django.contrib.auth.hashers import check_password
        
        # Verificar si la contraseña ya existe en el historial
        if self.pk:
            for history in self.password_history.all():
                if check_password(raw_password, history.password_hash):
                    raise ValueError("Esta contraseña ya ha sido utilizada anteriormente. Por favor elija una diferente.")
        
        super().set_password(raw_password)

    def save(self, *args, **kwargs):
        is_new_password = False
        if self.pk:
            # Verificar si la contraseña ha cambiado
            try:
                old_user = Usuario.objects.get(pk=self.pk)
                if old_user.password != self.password:
                    is_new_password = True
            except Usuario.DoesNotExist:
                is_new_password = True
        else:
            is_new_password = True
            
        super().save(*args, **kwargs)
        
        # Guardar en historial si es nueva contraseña
        if is_new_password and self.password:
            PasswordHistory.objects.create(usuario=self, password_hash=self.password)


class PasswordHistory(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='password_history')
    password_hash = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-fecha_creacion']
        verbose_name = "Historial de Contraseña"
        verbose_name_plural = "Historial de Contraseñas"
