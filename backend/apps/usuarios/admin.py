from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Usuario


class UsuarioCreationForm(UserCreationForm):
    """Custom form for creating users with email instead of username"""
    class Meta:
        model = Usuario
        fields = ('email', 'nombre', 'rol')


class UsuarioChangeForm(UserChangeForm):
    """Custom form for changing users"""
    class Meta:
        model = Usuario
        fields = '__all__'


class UsuarioAdmin(UserAdmin):
    form = UsuarioChangeForm
    add_form = UsuarioCreationForm
    model = Usuario
    
    list_display = ('email', 'nombre', 'rol', 'estado', 'is_staff', 'fecha_creacion')
    list_filter = ('rol', 'estado', 'is_staff', 'is_superuser')
    search_fields = ('email', 'nombre')
    ordering = ('email',)
    readonly_fields = ('fecha_creacion', 'ultimo_ingreso', 'last_login')
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información Personal', {'fields': ('nombre', 'telefono', 'direccion')}),
        ('Permisos', {'fields': ('rol', 'estado', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Fechas Importantes', {'fields': ('last_login', 'fecha_creacion', 'ultimo_ingreso')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'nombre', 'rol', 'password1', 'password2', 'is_staff', 'is_superuser'),
        }),
    )
    
    filter_horizontal = ('groups', 'user_permissions',)


admin.site.register(Usuario, UsuarioAdmin)
