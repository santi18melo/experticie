from django.contrib import admin
from .models import Pago, Transaccion, MetodoPago, EstadoPago

@admin.register(EstadoPago)
class EstadoPagoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'fecha_actualizacion')

@admin.register(MetodoPago)
class MetodoPagoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'activo', 'fecha_actualizacion')

class TransaccionInline(admin.TabularInline):
    model = Transaccion
    extra = 0

@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'monto', 'estado', 'metodo_pago', 'fecha_creacion')
    list_filter = ('estado', 'metodo_pago', 'fecha_creacion')
    search_fields = ('usuario__email', 'usuario__nombre')
    inlines = [TransaccionInline]
