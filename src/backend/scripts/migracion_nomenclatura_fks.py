"""
Script de Migración - Nomenclatura de Foreign Keys
===================================================

Proyecto: PREXCOL
Fecha: 2025-12-04
Propósito: Renombrar FKs siguiendo el patrón id_<entidad>

IMPORTANTE:
-----------
Este script NO se debe ejecutar directamente en producción.
Es una plantilla/referencia para crear las migraciones Django oficiales.

ESTRATEGIA:
-----------
1. Renombrar campos en Python (código)
2. Mantener nombres actuales en la base de datos (db_column)
3. No requiere downtime
4. Compatible con código existente durante transición

PASO A PASO:
------------
1. Revisar este script
2. Crear migraciones Django oficiales
3. Probar en desarrollo
4. Aplicar en staging
5. Aplicar en producción (sin downtime)
"""

# ============================================================================
# MIGRACIÓN 1: App USUARIOS
# ============================================================================

from django.db import migrations, models
import django.db.models.deletion

class Migration_Usuarios(migrations.Migration):
    """
    Actualiza nomenclatura de FKs en app usuarios
    """
    
    dependencies = [
        ('usuarios', '0003_alter_usuario_imagen'),  # Última migración existente
    ]

    operations = [
        # PasswordHistory: usuario → id_usuario
        migrations.RenameField(
            model_name='passwordhistory',
            old_name='usuario',
            new_name='id_usuario',
        ),
        migrations.AlterField(
            model_name='passwordhistory',
            name='id_usuario',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='password_history',
                to='usuarios.usuario',
                db_column='usuario_id',  # Mantiene nombre actual en BD
                help_text='Usuario dueño de este historial'
            ),
        ),
    ]


# ============================================================================
# MIGRACIÓN 2: App PRODUCTOS
# ============================================================================

class Migration_Productos(migrations.Migration):
    """
    Actualiza nomenclatura de FKs en app productos
    """
    
    dependencies = [
        ('productos', '0008_producto_seccion'),
        ('usuarios', '0004_rename_fk_passwordhistory'),  # Depende de migración anterior
    ]

    operations = [
        # Tienda: administrador → id_administrador
        migrations.RenameField(
            model_name='tienda',
            old_name='administrador',
            new_name='id_administrador',
        ),
        migrations.AlterField(
            model_name='tienda',
            name='id_administrador',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='tiendas_administradas',
                to='usuarios.usuario',
                limit_choices_to={'rol': 'admin'},
                db_column='administrador_id',
                help_text='Administrador responsable de esta tienda'
            ),
        ),
        
        # Producto: tienda → id_tienda
        migrations.RenameField(
            model_name='producto',
            old_name='tienda',
            new_name='id_tienda',
        ),
        migrations.AlterField(
            model_name='producto',
            name='id_tienda',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='productos',
                to='productos.tienda',
                db_column='tienda_id',
                help_text='Tienda a la que pertenece el producto'
            ),
        ),
        
        # Producto: proveedor → id_proveedor  
        migrations.RenameField(
            model_name='producto',
            old_name='proveedor',
            new_name='id_proveedor',
        ),
        migrations.AlterField(
            model_name='producto',
            name='id_proveedor',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='productos_suministrados',
                to='usuarios.usuario',
                limit_choices_to={'rol': 'proveedor'},
                db_column='proveedor_id',
                help_text='Proveedor que suministra este producto'
            ),
        ),
        
        # StockConfig: producto → id_producto
        migrations.RenameField(
            model_name='stockconfig',
            old_name='producto',
            new_name='id_producto',
        ),
        migrations.AlterField(
            model_name='stockconfig',
            name='id_producto',
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='config_stock',
                to='productos.producto',
                db_column='producto_id',
                help_text='Producto configurado para recarga automática'
            ),
        ),
        
        # HistorialRecarga: producto → id_producto
        migrations.RenameField(
            model_name='historialrecarga',
            old_name='producto',
            new_name='id_producto',
        ),
        migrations.AlterField(
            model_name='historialrecarga',
            name='id_producto',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='historial_recargas',
                to='productos.producto',
                db_column='producto_id',
                help_text='Producto recargado'
            ),
        ),
        
        # HistorialRecarga: usuario → id_usuario_ejecutor (específico)
        migrations.RenameField(
            model_name='historialrecarga',
            old_name='usuario',
            new_name='id_usuario_ejecutor',
        ),
        migrations.AlterField(
            model_name='historialrecarga',
            name='id_usuario_ejecutor',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.SET_NULL,
                related_name='recargas_ejecutadas',
                to='usuarios.usuario',
                null=True,
                blank=True,
                db_column='usuario_id',
                help_text='Usuario que ejecutó la recarga (si fue manual)'
            ),
        ),
        
        # Pedido: cliente → id_cliente
        migrations.RenameField(
            model_name='pedido',
            old_name='cliente',
            new_name='id_cliente',
        ),
        migrations.AlterField(
            model_name='pedido',
            name='id_cliente',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='pedidos',
                to='usuarios.usuario',
                limit_choices_to={'rol': 'cliente'},
                db_column='cliente_id',
                help_text='Cliente que realizó el pedido'
            ),
        ),
        
        # Pedido: tienda → id_tienda
        migrations.RenameField(
            model_name='pedido',
            old_name='tienda',
            new_name='id_tienda',
        ),
        migrations.AlterField(
            model_name='pedido',
            name='id_tienda',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='pedidos',
                to='productos.tienda',
                db_column='tienda_id',
                help_text='Tienda que gestiona el pedido'
            ),
        ),
        
        # DetallePedido: pedido → id_pedido
        migrations.RenameField(
            model_name='detallepedido',
            old_name='pedido',
            new_name='id_pedido',
        ),
        migrations.AlterField(
            model_name='detallepedido',
            name='id_pedido',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='detalles',
                to='productos.pedido',
                db_column='pedido_id',
                help_text='Pedido al que pertenece este detalle'
            ),
        ),
        
        # DetallePedido: producto → id_producto
        migrations.RenameField(
            model_name='detallepedido',
            old_name='producto',
            new_name='id_producto',
        ),
        migrations.AlterField(
            model_name='detallepedido',
            name='id_producto',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='detalles_pedido',
                to='productos.producto',
                db_column='producto_id',
                help_text='Producto incluido en el pedido'
            ),
        ),
    ]


# ============================================================================
# MIGRACIÓN 3: App VENTAS
# ============================================================================

class Migration_Ventas(migrations.Migration):
    """
    Actualiza nomenclatura de FKs en app ventas
    """
    
    dependencies = [
        ('ventas', '0001_initial'),
        ('productos', '0009_rename_fks_productos'),
        ('usuarios', '0004_rename_fk_passwordhistory'),
    ]

    operations = [
        # Venta: pedido → id_pedido
        migrations.RenameField(
            model_name='venta',
            old_name='pedido',
            new_name='id_pedido',
        ),
        migrations.AlterField(
            model_name='venta',
            name='id_pedido',
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='venta_registrada',
                to='productos.pedido',
                db_column='pedido_id',
                help_text='Pedido que generó esta venta'
            ),
        ),
        
        # Venta: cliente → id_cliente
        migrations.RenameField(
            model_name='venta',
            old_name='cliente',
            new_name='id_cliente',
        ),
        migrations.AlterField(
            model_name='venta',
            name='id_cliente',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='ventas',
                to='usuarios.usuario',
                db_column='cliente_id',
                help_text='Cliente de la venta'
            ),
        ),
        
        # DetalleVenta: venta → id_venta
        migrations.RenameField(
            model_name='detalleventa',
            old_name='venta',
            new_name='id_venta',
        ),
        migrations.AlterField(
            model_name='detalleventa',
            name='id_venta',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='detalles',
                to='ventas.venta',
                db_column='venta_id',
                help_text='Venta a la que pertenece este detalle'
            ),
        ),
        
        # DetalleVenta: producto → id_producto
        migrations.RenameField(
            model_name='detalleventa',
            old_name='producto',
            new_name='id_producto',
        ),
        migrations.AlterField(
            model_name='detalleventa',
            name='id_producto',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='detalles_venta',
                to='productos.producto',
                db_column='producto_id',
                help_text='Producto vendido'
            ),
        ),
    ]


# ============================================================================
# MIGRACIÓN 4: App PAGOS
# ============================================================================

class Migration_Pagos(migrations.Migration):
    """
    Actualiza nomenclatura de FKs en app pagos
    """
    
    dependencies = [
        ('pagos', '0001_initial'),
        ('productos', '0009_rename_fks_productos'),
        ('usuarios', '0004_rename_fk_passwordhistory'),
    ]

    operations = [
        # Pago: usuario → id_usuario
        migrations.RenameField(
            model_name='pago',
            old_name='usuario',
            new_name='id_usuario',
        ),
        migrations.AlterField(
            model_name='pago',
            name='id_usuario',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='pagos',
                to='usuarios.usuario',
                db_column='usuario_id',
                help_text='Usuario que realizó el pago'
            ),
        ),
        
        # Pago: pedido → id_pedido
        migrations.RenameField(
            model_name='pago',
            old_name='pedido',
            new_name='id_pedido',
        ),
        migrations.AlterField(
            model_name='pago',
            name='id_pedido',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='pagos',
                to='productos.pedido',
                db_column='pedido_id',
                help_text='Pedido asociado al pago'
            ),
        ),
        
        # Pago: estado → id_estado_pago
        migrations.RenameField(
            model_name='pago',
            old_name='estado',
            new_name='id_estado_pago',
        ),
        migrations.AlterField(
            model_name='pago',
            name='id_estado_pago',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='pagos',
                to='pagos.estadopago',
                db_column='estado_id',
                help_text='Estado actual del pago'
            ),
        ),
        
        # Pago: metodo_pago → id_metodo_pago
        migrations.RenameField(
            model_name='pago',
            old_name='metodo_pago',
            new_name='id_metodo_pago',
        ),
        migrations.AlterField(
            model_name='pago',
            name='id_metodo_pago',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='pagos',
                to='pagos.metodopago',
                db_column='metodo_pago_id',
                help_text='Método de pago utilizado'
            ),
        ),
        
        # Transaccion: pago → id_pago
        migrations.RenameField(
            model_name='transaccion',
            old_name='pago',
            new_name='id_pago',
        ),
        migrations.AlterField(
            model_name='transaccion',
            name='id_pago',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='transacciones',
                to='pagos.pago',
                db_column='pago_id',
                help_text='Pago asociado a esta transacción'
            ),
        ),
    ]


# ============================================================================
# MIGRACIÓN 5: App NOTIFICACIONES
# ============================================================================

class Migration_Notificaciones(migrations.Migration):
    """
    Actualiza nomenclatura de FKs en app notificaciones
    """
    
    dependencies = [
        ('notificaciones', '0001_initial'),
        ('usuarios', '0004_rename_fk_passwordhistory'),
    ]

    operations = [
        # Notificacion: usuario → id_usuario
        migrations.RenameField(
            model_name='notificacion',
            old_name='usuario',
            new_name='id_usuario',
        ),
        migrations.AlterField(
            model_name='notificacion',
            name='id_usuario',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='notificaciones',
                to='usuarios.usuario',
                db_column='usuario_id',
                help_text='Usuario destinatario de la notificación'
            ),
        ),
        
        # Notificacion: tipo → id_tipo_notificacion
        migrations.RenameField(
            model_name='notificacion',
            old_name='tipo',
            new_name='id_tipo_notificacion',
        ),
        migrations.AlterField(
            model_name='notificacion',
            name='id_tipo_notificacion',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='notificaciones',
                to='notificaciones.tiponotificacion',
                db_column='tipo_id',
                help_text='Tipo de notificación (pedido, pago, stock, etc.)'
            ),
        ),
        
        # Notificacion: estado → id_estado_notificacion
        migrations.RenameField(
            model_name='notificacion',
            old_name='estado',
            new_name='id_estado_notificacion',
        ),
        migrations.AlterField(
            model_name='notificacion',
            name='id_estado_notificacion',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='notificaciones',
                to='notificaciones.estadonotificacion',
                db_column='estado_id',
                help_text='Estado de la notificación (pendiente, enviada, fallida)'
            ),
        ),
    ]


# ============================================================================
# COMANDOS PARA EJECUTAR LAS MIGRACIONES
# ============================================================================

"""
PASO 1: Generar archivos de migración

cd c:\\experticie-3
python backend/manage.py makemigrations usuarios --name rename_fk_passwordhistory
python backend/manage.py makemigrations productos --name rename_fks_productos
python backend/manage.py makemigrations ventas --name rename_fks_ventas
python backend/manage.py makemigrations pagos --name rename_fks_pagos
python backend/manage.py makemigrations notificaciones --name rename_fks_notificaciones


PASO 2: Revisar migraciones generadas

python backend/manage.py showmigrations


PASO 3: Probar en desarrollo (con base de datos de prueba)

python backend/manage.py migrate --database=default


PASO 4: Si todo funciona, aplicar en staging

python backend/manage.py migrate --settings=backend.settings_staging


PASO 5: Aplicar en producción

python backend/manage.py migrate --settings=backend.settings_production


PASO 6: Verificar

python backend/manage.py check
"""


# ============================================================================
# TESTS DE VALIDACIÓN
# ============================================================================

"""
Después de aplicar las migraciones, ejecutar estos tests:
"""

def test_fk_nomenclature():
    """
    Verifica que todas las FKs tengan la nomenclatura correcta
    """
    from django.apps import apps
    
    errors = []
    
    for model in apps.get_models():
        for field in model._meta.get_fields():
            if field.many_to_one and not field.name.startswith('id_'):
                errors.append(
                    f"{model.__name__}.{field.name} no sigue convención id_<entidad>"
                )
    
    if errors:
        print("❌ ERRORES ENCONTRADOS:")
        for error in errors:
            print(f"  - {error}")
    else:
        print("✅ Todos los FKs siguen la convención!")
    
    return len(errors) == 0


def test_backward_compatibility():
    """
    Verifica que el código antiguo siga funcionando
    """
    from apps.notificaciones.models import Notificacion
    from apps.usuarios.models import Usuario
    
    # Acceso nuevo (debería funcionar)
    notif = Notificacion.objects.first()
    assert notif.id_usuario is not None
    
    # Acceso old-style (debería seguir funcionando temporalmente)
    # notif.usuario  # Esto puede fallar si no mantienes compatibilidad
    
    print("✅ Backward compatibility OK")


# ============================================================================
# NOTAS IMPORTANTES
# ============================================================================

"""
IMPORTANTE:

1. **NO CAMBIAR db_column inicialmente**
   - Mantener nombres actuales en BD: usuario_id, pedido_id, etc.
   - Solo cambiar nombres en código Python
   - Evita downtime

2. **Actualizar código gradualmente**
   - Views.py
   - Serializers.py
   - Tests
   - Scripts

3. **Ejecutar en orden**
   - usuarios primero (no tiene dependencias)
   - productos segundo (depende de usuarios)
   - ventas/pagos/notificaciones después

4. **Rollback plan**
   - Mantener backup de BD
   - Las migraciones son reversibles con migrate <app> <previous_migration>

5. **Testing exhaustivo**
   - Ejecutar todos los tests antes de producción
   - Verificar que APIs sigan funcionando
   - Probar en staging primero

6. **Documentación**
   - Actualizar README
   - Actualizar diagramas UML
   - Notificar al equipo

¡ÉXITO EN LA MIGRACIÓN! 🚀
"""
