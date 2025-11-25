from django.db import models
from apps.usuarios.models import Usuario


class Tienda(models.Model):
    """
    Modelo que representa una tienda minorista en el sistema.
    Cada tienda es gestionada por un administrador.
    """

    nombre = models.CharField(max_length=150)
    direccion = models.TextField()
    telefono = models.CharField(max_length=20, blank=True, null=True)
    administrador = models.ForeignKey(
        Usuario,
        on_delete=models.PROTECT,
        related_name="tiendas_administradas",
        limit_choices_to={"rol": "admin"},
        help_text="Administrador responsable de la tienda",
    )
    activa = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-fecha_creacion"]
        verbose_name = "Tienda"
        verbose_name_plural = "Tiendas"

    def __str__(self):
        return f"{self.nombre} - {self.administrador.nombre}"


class Producto(models.Model):
    """
    Modelo que representa un producto en el catálogo.
    - Cada producto pertenece a una tienda
    - Tiene un proveedor asignado (Usuario con rol 'proveedor')
    - Mantiene track del stock disponible
    """

    nombre = models.CharField(max_length=200, db_index=True)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    tienda = models.ForeignKey(
        Tienda, on_delete=models.CASCADE, related_name="productos"
    )
    proveedor = models.ForeignKey(
        Usuario,
        on_delete=models.PROTECT,
        related_name="productos_suministrados",
        limit_choices_to={"rol": "proveedor"},
        help_text="Proveedor responsable de este producto",
    )
    es_basico = models.BooleanField(
        default=True, help_text="¿Es un producto de necesidad básica?"
    )
    categoria = models.CharField(
        max_length=50,
        default="general",
        help_text="Categoría del producto (por ejemplo: alimentos, bebidas, aseo, dulces, ferretería, etc.)",
    )

    activo = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-fecha_creacion"]
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        unique_together = (
            "nombre",
            "tienda",
        )  # No hay productos duplicados en la misma tienda
        indexes = [
            models.Index(fields=["tienda", "activo"]),
            models.Index(fields=["proveedor", "activo"]),
        ]

    def __str__(self):
        return f"{self.nombre} - ${self.precio}"

    def reducir_stock(self, cantidad):
        """Reduce el stock del producto y retorna el nuevo valor."""
        if self.stock < cantidad:
            raise ValueError(
                f"Stock insuficiente. Disponible: {self.stock}, Solicitado: {cantidad}"
            )
        self.stock -= cantidad
        self.save()
        return self.stock

    def aumentar_stock(self, cantidad):
        """Aumenta el stock del producto."""
        self.stock += cantidad
        self.save()
        return self.stock


class Pedido(models.Model):
    """
    Modelo que representa un pedido realizado por un cliente.
    - Cliente es un Usuario con rol 'cliente'
    - Un pedido puede contener múltiples productos (M2M a través de DetallePedido)
    - El estado del pedido progresa: pendiente → preparando → en_transito → entregado
    """

    ESTADOS_PEDIDO = [
        ("pendiente", "Pendiente"),
        ("preparando", "Preparando"),
        ("en_transito", "En Tránsito"),
        ("entregado", "Entregado"),
        ("cancelado", "Cancelado"),
    ]

    cliente = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name="pedidos",
        limit_choices_to={"rol": "cliente"},
        help_text="Cliente que realiza el pedido",
    )
    tienda = models.ForeignKey(Tienda, on_delete=models.PROTECT, related_name="pedidos")
    estado = models.CharField(
        max_length=15, choices=ESTADOS_PEDIDO, default="pendiente", db_index=True
    )
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    fecha_creacion = models.DateTimeField(auto_now_add=True, db_index=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    notas = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ["-fecha_creacion"]
        verbose_name = "Pedido"
        verbose_name_plural = "Pedidos"
        indexes = [
            models.Index(fields=["cliente", "estado"]),
            models.Index(fields=["tienda", "estado"]),
            models.Index(fields=["estado", "-fecha_creacion"]),
        ]

    def __str__(self):
        return f"Pedido #{self.id} - {self.cliente.nombre} ({self.estado})"

    def calcular_total(self):
        """Calcula el total del pedido sumando todos los detalles."""
        total = sum(detalle.subtotal for detalle in self.detalles.all())
        self.total = total
        self.save()
        return self.total

    def puede_cambiar_a_preparando(self):
        """Verifica si el pedido puede pasar a estado 'preparando'."""
        return self.estado == "pendiente"

    def puede_cambiar_a_en_transito(self):
        """Verifica si el pedido puede pasar a estado 'en_transito'."""
        return self.estado == "preparando"

    def puede_cambiar_a_entregado(self):
        """Verifica si el pedido puede pasar a estado 'entregado'."""
        return self.estado == "en_transito"


class DetallePedido(models.Model):
    """
    Modelo que representa un item específico dentro de un pedido.
    Es la tabla M2M que conecta Pedidos con Productos.
    - Guarda la cantidad y el precio unitario en el momento de la compra
    - Calcula el subtotal (cantidad × precio_unitario)
    """

    pedido = models.ForeignKey(
        Pedido, on_delete=models.CASCADE, related_name="detalles"
    )
    producto = models.ForeignKey(
        Producto, on_delete=models.PROTECT, related_name="detalles_pedido"
    )
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = "Detalle de Pedido"
        verbose_name_plural = "Detalles de Pedido"
        unique_together = (
            "pedido",
            "producto",
        )  # No puede haber duplicados en el mismo pedido

    def __str__(self):
        return f"{self.pedido.id} - {self.producto.nombre} x{self.cantidad}"

    @property
    def subtotal(self):
        """Calcula el subtotal de este detalle del pedido."""
        return self.cantidad * self.precio_unitario

    def save(self, *args, **kwargs):
        """Sobrescribe save para actualizar el total del pedido."""
        super().save(*args, **kwargs)
        self.pedido.calcular_total()

    def delete(self, *args, **kwargs):
        """Sobrescribe delete para actualizar el total del pedido."""
        pedido = self.pedido
        super().delete(*args, **kwargs)
        pedido.calcular_total()
