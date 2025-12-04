# 📋 GUÍA DE CONVENCIONES - NOMENCLATURA DE BASES DE DATOS

**Proyecto**: PREXCOL  
**Fecha**: 2025-12-04  
**Versión**: 1.0  
**Autor**: Equipo de Arquitectura

---

## 🎯 OBJETIVO

Establecer un estándar de nomenclatura consistente y claro para todos los campos de la base de datos, especialmente para **Foreign Keys**, mejorando la legibilidad del código y facilitando el mantenimiento.

---

## 📐 REGLAS DE NOMENCLATURA

### 1. **Claves Primarias**

```python
# ✅ CORRECTO
class Usuario(models.Model):
    id = models.BigAutoField(primary_key=True)  # Django lo crea automáticamente
```

**Regla**: Siempre usar `id` como clave primaria.

---

### 2. **Foreign Keys (Claves Foráneas)**

#### ❌ ANTES (Nomenclatura Ambigua)

```python
class Notificacion(models.Model):
    usuario = models.ForeignKey(Usuario, ...)      # ¿Campo o relación?
    tipo = models.ForeignKey(TipoNotificacion, ...)  # Ambiguo
    estado = models.ForeignKey(EstadoNotificacion, ...)  # ¿String o FK?
```

**Problemas:**
- No queda claro si `estado` es un string o una FK
- En SQL, el campo real se llama `usuario_id`, no `usuario`
- Confusión entre el campo BD y la relación ORM

#### ✅ AHORA (Nomenclatura Específica)

```python
class Notificacion(models.Model):
    id_usuario = models.ForeignKey(
        Usuario, 
        on_delete=models.CASCADE,
        db_column='id_usuario',  # Nombre explícito en BD
        related_name='notificaciones'
    )
    id_tipo_notificacion = models.ForeignKey(
        TipoNotificacion,
        on_delete=models.PROTECT,
        db_column='id_tipo_notificacion',
        related_name='notificaciones'
    )
    id_estado_notificacion = models.ForeignKey(
        EstadoNotificacion,
        on_delete=models.PROTECT,
        db_column='id_estado_notificacion',
        related_name='notificaciones'
    )
```

**Beneficios:**
- ✅ Claridad total: se ve inmediatamente que es una FK
- ✅ Coherencia con SQL: `id_usuario` en Python = `id_usuario` en BD
- ✅ Evita ambigüedades: `id_estado_notificacion` vs `estado` (string)
- ✅ Autodocumentado: se entiende sin ver documentación

---

### 3. **Patrón de Nomenclatura**

```
id_<entidad_relacionada>
```

**Ejemplos:**

| Relación | Campo FK | Descripción |
|----------|----------|-------------|
| Notificacion → Usuario | `id_usuario` | ID del usuario que recibe |
| Producto → Tienda | `id_tienda` | ID de la tienda |
| Producto → Proveedor | `id_proveedor` | ID del proveedor (Usuario) |
| Pago → Pedido | `id_pedido` | ID del pedido pagado |
| Pago → EstadoPago | `id_estado_pago` | ID del estado del pago |
| Pago → MetodoPago | `id_metodo_pago` | ID del método usado |
| DetallePedido → Producto | `id_producto` | ID del producto |
| DetallePedido → Pedido | `id_pedido` | ID del pedido |

---

### 4. **Casos Especiales**

#### Múltiples FKs a la misma tabla

```python
class HistorialRecarga(models.Model):
    id_producto = models.ForeignKey(
        Producto,
        on_delete=models.CASCADE,
        db_column='id_producto',
        related_name='recargas_historial'
    )
    id_usuario_ejecutor = models.ForeignKey(  # Descriptor específico
        Usuario,
        on_delete=models.SET_NULL,
        null=True,
        db_column='id_usuario_ejecutor',
        related_name='recargas_ejecutadas'
    )
```

**Regla**: Cuando hay múltiples FKs a la misma tabla, usar sufijo descriptivo:
- `id_usuario_ejecutor`
- `id_usuario_creador`
- `id_usuario_aprobador`

#### Self-referencing FKs

```python
class Usuario(models.Model):
    id_usuario_supervisor = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        db_column='id_usuario_supervisor',
        related_name='usuarios_supervisados'
    )
```

---

### 5. **Campos Booleanos**

```python
# ✅ CORRECTO - Prefijo is_, tiene_, es_
class Usuario(models.Model):
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    self_deactivated = models.BooleanField(default=False)
    admin_suspended = models.BooleanField(default=False)

class Producto(models.Model):
    es_basico = models.BooleanField(default=False)
    activo = models.BooleanField(default=True)

class StockConfig(models.Model):
    recarga_automatica_activa = models.BooleanField(default=True)
```

---

### 6. **Campos de Fecha/Hora**

```python
# ✅ CORRECTO - Prefijo fecha_
class BaseModel(models.Model):
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True

class Pedido(models.Model):
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_entrega_estimada = models.DateField(null=True)
    fecha_entrega_real = models.DateTimeField(null=True)
```

---

### 7. **Campos Numéricos**

```python
# ✅ CORRECTO - Nombres descriptivos
class Producto(models.Model):
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    
class StockConfig(models.Model):
    stock_minimo = models.PositiveIntegerField(default=10)
    cantidad_recarga = models.PositiveIntegerField(default=50)
    total_recargas = models.PositiveIntegerField(default=0)
```

---

## 🗂️ ESTÁNDAR POR MODELO

### Usuario

```python
class Usuario(AbstractBaseUser, PermissionsMixin):
    id = models.BigAutoField(primary_key=True)
    # ... otros campos ...
    
    # Sin FKs (es la tabla raíz de autenticación)
```

### PasswordHistory

```python
class PasswordHistory(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, ...)  # ✅
    password_hash = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
```

### Tienda

```python
class Tienda(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_administrador = models.ForeignKey(Usuario, ...)  # ✅
    nombre = models.CharField(max_length=200)
    # ... otros campos ...
```

### Producto

```python
class Producto(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_tienda = models.ForeignKey(Tienda, ...)  # ✅
    id_proveedor = models.ForeignKey(Usuario, ...)  # ✅
    nombre = models.CharField(max_length=200)
    # ... otros campos ...
```

### StockConfig

```python
class StockConfig(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_producto = models.OneToOneField(Producto, ...)  # ✅
    stock_minimo = models.PositiveIntegerField(default=10)
    # ... otros campos ...
```

### HistorialRecarga

```python
class HistorialRecarga(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_producto = models.ForeignKey(Producto, ...)  # ✅
    id_usuario_ejecutor = models.ForeignKey(Usuario, ...)  # ✅ Específico
    cantidad = models.PositiveIntegerField()
    # ... otros campos ...
```

### Pedido

```python
class Pedido(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_cliente = models.ForeignKey(Usuario, ...)  # ✅
    id_tienda = models.ForeignKey(Tienda, ...)  # ✅
    estado = models.CharField(max_length=15, choices=ESTADOS_PEDIDO)
    # ... otros campos ...
```

### DetallePedido

```python
class DetallePedido(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_pedido = models.ForeignKey(Pedido, ...)  # ✅
    id_producto = models.ForeignKey(Producto, ...)  # ✅
    cantidad = models.PositiveIntegerField()
    # ... otros campos ...
```

### Pago

```python
class Pago(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, ...)  # ✅
    id_pedido = models.ForeignKey(Pedido, ...)  # ✅
    id_estado_pago = models.ForeignKey(EstadoPago, ...)  # ✅
    id_metodo_pago = models.ForeignKey(MetodoPago, ...)  # ✅
    monto = models.DecimalField(max_digits=12, decimal_places=2)
    # ... otros campos ...
```

### Transaccion

```python
class Transaccion(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_pago = models.ForeignKey(Pago, ...)  # ✅
    referencia_externa = models.CharField(max_length=255)
    # ... otros campos ...
```

### Venta

```python
class Venta(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_pedido = models.OneToOneField(Pedido, ...)  # ✅
    id_cliente = models.ForeignKey(Usuario, ...)  # ✅
    total = models.DecimalField(max_digits=12, decimal_places=2)
    # ... otros campos ...
```

### DetalleVenta

```python
class DetalleVenta(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_venta = models.ForeignKey(Venta, ...)  # ✅
    id_producto = models.ForeignKey(Producto, ...)  # ✅
    cantidad = models.PositiveIntegerField()
    # ... otros campos ...
```

### Notificacion

```python
class Notificacion(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, ...)  # ✅
    id_tipo_notificacion = models.ForeignKey(TipoNotificacion, ...)  # ✅
    id_estado_notificacion = models.ForeignKey(EstadoNotificacion, ...)  # ✅
    mensaje = models.TextField()
    # ... otros campos ...
```

---

## 📊 QUERIES SQL MÁS CLAROS

### Antes (Ambiguo)

```sql
-- ¿Qué campo es qué?
SELECT p.*, u.nombre
FROM pago p
JOIN usuario u ON p.usuario = u.id
JOIN estado_pago ep ON p.estado = ep.id
WHERE p.pedido = 1234;
```

### Ahora (Claro)

```sql
-- Totalmente explícito
SELECT p.*, u.nombre
FROM pago p
JOIN usuario u ON p.id_usuario = u.id
JOIN estado_pago ep ON p.id_estado_pago = ep.id
WHERE p.id_pedido = 1234;
```

---

## 🔧 ACCESO EN DJANGO ORM

### Forma Actual (Mantener compatibilidad)

```python
# Django ORM automáticamente convierte id_usuario a usuario
pago = Pago.objects.get(id=1)
print(pago.id_usuario)  # Acceso directo al ID
print(pago.id_usuario.email)  # Django sigue permitiendo navegación

# O usando el related_name
usuario = Usuario.objects.get(id=42)
pagos = usuario.pagos.all()  # Funciona igual
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Revisar todos los modelos existentes
- [ ] Renombrar FKs siguiendo el patrón `id_<entidad>`
- [ ] Actualizar `db_column` en cada FK
- [ ] Crear migraciones Django
- [ ] Actualizar queries en views.py
- [ ] Actualizar serializers
- [ ] Actualizar tests
- [ ] Actualizar documentación
- [ ] Revisar que todos los diagramas UML reflejen los cambios

---

## 🚀 MIGRACIÓN GRADUAL

### Fase 1: Nuevos Modelos
- Todos los modelos nuevos siguen la nueva convención

### Fase 2: Modelos Existentes (Opcional)
- Crear migración para renombrar campos
- Mantener `db_column` para evitar cambios en BD
- Actualizar código Python gradualmente

### Fase 3: Refactoring Completo (Futuro)
- Cuando sea conveniente, migrar la BD real
- Requiere downtime o migración en caliente

---

## 📝 EJEMPLO DE MIGRACIÓN

```python
# Ejemplo de cómo hacer la migración sin afectar la BD
from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('notificaciones', '0001_initial'),
    ]

    operations = [
        # Renombrar campo en Python, mantener nombre en BD
        migrations.RenameField(
            model_name='notificacion',
            old_name='usuario',
            new_name='id_usuario',
        ),
        # Asegurar que el nombre en BD no cambie
        migrations.AlterField(
            model_name='notificacion',
            name='id_usuario',
            field=models.ForeignKey(
                on_delete=models.CASCADE,
                related_name='notificaciones',
                to='usuarios.usuario',
                db_column='usuario_id',  # Mantiene nombre actual en BD
            ),
        ),
    ]
```

---

## 📚 BENEFICIOS A LARGO PLAZO

1. **Onboarding más rápido**: Nuevos devs entienden el esquema inmediatamente
2. **Menos bugs**: Menos confusión entre strings y FKs
3. **Queries más claras**: SQL más legible
4. **Mejor IDE support**: Autocomplete más preciso
5. **Documentación implícita**: El código se explica solo

---

## 🎓 RECURSOS ADICIONALES

- **Django Best Practices**: https://.djangoproject.com/en/stable/topics/db/models/
- **PEP 8**: https://pep8.org/
- **Database Naming Conventions**: Google "database naming conventions best practices"

---

**Documento creado**: 2025-12-04  
**Mantenedor**: Equipo de Arquitectura  
**Próxima revisión**: Al agregar nuevos modelos  
**Estado**: ✅ Vigente
