from django.contrib import admin
from .models import Tienda, Producto, Pedido, DetallePedido


@admin.register(Tienda)
class TiendaAdmin(admin.ModelAdmin):
    """
    Administración de tiendas minoristas.
    """
    list_display = ('nombre', 'administrador', 'activa', 'fecha_creacion')
    list_filter = ('activa', 'fecha_creacion')
    search_fields = ('nombre', 'administrador__nombre', 'direccion')
    readonly_fields = ('fecha_creacion', 'fecha_actualizacion')
    fieldsets = (
        ('Información General', {
            'fields': ('nombre', 'direccion', 'telefono', 'administrador')
        }),
        ('Estado', {
            'fields': ('activa',)
        }),
        ('Auditoría', {
            'fields': ('fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    """
    Administración de productos.
    Incluye gestión de stock y proveedor.
    """
    list_display = ('nombre', 'tienda', 'proveedor', 'precio', 'stock', 'activo', 'fecha_creacion')
    list_filter = ('tienda', 'proveedor', 'activo', 'fecha_creacion')
    search_fields = ('nombre', 'descripcion', 'proveedor__nombre')
    readonly_fields = ('fecha_creacion', 'fecha_actualizacion')
    fieldsets = (
        ('Información del Producto', {
            'fields': ('nombre', 'descripcion', 'tienda', 'proveedor')
        }),
        ('Inventario', {
            'fields': ('precio', 'stock')
        }),
        ('Estado', {
            'fields': ('activo',)
        }),
        ('Auditoría', {
            'fields': ('fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )
    actions = ['marcar_como_activo', 'marcar_como_inactivo']

    def marcar_como_activo(self, request, queryset):
        queryset.update(activo=True)
        self.message_user(request, "Productos marcados como activos")

    def marcar_como_inactivo(self, request, queryset):
        queryset.update(activo=False)
        self.message_user(request, "Productos marcados como inactivos")

    marcar_como_activo.short_description = "Marcar seleccionados como activos"
    marcar_como_inactivo.short_description = "Marcar seleccionados como inactivos"


class DetallePedidoInline(admin.TabularInline):
    """
    Edición inline de detalles de pedidos.
    Permite editar los items del pedido desde el formulario de pedido.
    """
    model = DetallePedido
    extra = 0
    fields = ('producto', 'cantidad', 'precio_unitario', 'subtotal_display')
    readonly_fields = ('subtotal_display',)

    def subtotal_display(self, obj):
        return f"${obj.subtotal}"

    subtotal_display.short_description = 'Subtotal'


@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    """
    Administración de pedidos.
    Incluye detalles inline y seguimiento de estado.
    """
    list_display = ('id', 'cliente', 'tienda', 'estado', 'total', 'fecha_creacion')
    list_filter = ('estado', 'tienda', 'fecha_creacion')
    search_fields = ('cliente__nombre', 'cliente__email', 'id')
    readonly_fields = ('total', 'fecha_creacion', 'fecha_actualizacion', 'total_display')
    fieldsets = (
        ('Información del Pedido', {
            'fields': ('cliente', 'tienda', 'notas')
        }),
        ('Estado y Seguimiento', {
            'fields': ('estado',)
        }),
        ('Totales', {
            'fields': ('total', 'total_display'),
            'classes': ('collapse',)
        }),
        ('Auditoría', {
            'fields': ('fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )
    inlines = [DetallePedidoInline]
    actions = ['marcar_como_preparando', 'marcar_como_en_transito', 'marcar_como_entregado']

    def total_display(self, obj):
        return f"${obj.total}"

    def marcar_como_preparando(self, request, queryset):
        queryset.filter(estado='pendiente').update(estado='preparando')
        self.message_user(request, "Pedidos marcados como en preparación")

    def marcar_como_en_transito(self, request, queryset):
        queryset.filter(estado='preparando').update(estado='en_transito')
        self.message_user(request, "Pedidos marcados en tránsito")

    def marcar_como_entregado(self, request, queryset):
        queryset.filter(estado='en_transito').update(estado='entregado')
        self.message_user(request, "Pedidos marcados como entregados")

    marcar_como_preparando.short_description = "Marcar como preparando"
    marcar_como_en_transito.short_description = "Marcar como en tránsito"
    marcar_como_entregado.short_description = "Marcar como entregado"


@admin.register(DetallePedido)
class DetallePedidoAdmin(admin.ModelAdmin):
    """
    Administración de detalles de pedidos.
    Principalmente para consulta.
    """
    list_display = ('pedido', 'producto', 'cantidad', 'precio_unitario', 'subtotal')
    list_filter = ('pedido__fecha_creacion', 'producto')
    search_fields = ('pedido__id', 'producto__nombre')
    readonly_fields = ('pedido', 'subtotal_display')

    def subtotal_display(self, obj):
        return f"${obj.subtotal}"

    subtotal_display.short_description = 'Subtotal'

    def has_add_permission(self, request):
        """No permite agregar detalles directamente desde aquí."""
        return False

    def has_delete_permission(self, request, obj=None):
        """No permite eliminar detalles directamente desde aquí."""
        return False
