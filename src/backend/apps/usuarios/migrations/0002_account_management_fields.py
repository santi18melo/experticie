# Generated migration for account management fields

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0001_initial'),  # Ajustar según la última migración
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='self_deactivated',
            field=models.BooleanField(
                default=False,
                help_text='Usuario desactivó su cuenta voluntariamente (puede reactivarla)'
            ),
        ),
        migrations.AddField(
            model_name='usuario',
            name='admin_suspended',
            field=models.BooleanField(
                default=False,
                help_text='Cuenta suspendida por administrador (requiere contacto con soporte)'
            ),
        ),
        migrations.AddField(
            model_name='usuario',
            name='suspension_reason',
            field=models.TextField(
                blank=True,
                null=True,
                help_text='Razón de la suspensión por parte del administrador'
            ),
        ),
        migrations.AddField(
            model_name='usuario',
            name='suspension_date',
            field=models.DateTimeField(
                blank=True,
                null=True,
                help_text='Fecha de suspensión'
            ),
        ),
    ]
