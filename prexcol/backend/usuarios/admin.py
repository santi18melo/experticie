from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

class UsuarioAdmin(UserAdmin):
    model = Usuario
    list_display = ('email', 'nombre', 'rol', 'estado', 'is_staff')
    search_fields = ('email', 'nombre')
    list_filter = ('rol', 'estado')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información Personal', {'fields': ('nombre', 'telefono', 'direccion')}),
        ('Permisos', {'fields': ('rol', 'is_staff', 'is_superuser')}),
        ('Fechas', {'fields': ('last_login', 'fecha_creacion')}),
    )

admin.site.register(Usuario, UsuarioAdmin)
