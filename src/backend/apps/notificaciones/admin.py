from django.contrib import admin
from .models import Notificacion, TipoNotificacion, EstadoNotificacion

@admin.register(TipoNotificacion)
class TipoNotificacionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'fecha_actualizacion')

@admin.register(EstadoNotificacion)
class EstadoNotificacionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'fecha_actualizacion')

@admin.register(Notificacion)
class NotificacionAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'tipo', 'estado', 'leida', 'fecha_creacion')
    list_filter = ('tipo', 'estado', 'leida', 'fecha_creacion')
    search_fields = ('usuario__email', 'mensaje', 'destino')
