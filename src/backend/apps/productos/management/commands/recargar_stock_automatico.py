"""
Comando de gestión para ejecutar la recarga automática de stock.
Se puede ejecutar manualmente o programar con cron/celery.

Uso:
    python manage.py recargar_stock_automatico
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from apps.productos.models import StockConfig, HistorialRecarga


class Command(BaseCommand):
    help = 'Ejecuta la recarga automática de stock para productos con stock bajo'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Simula la ejecución sin hacer cambios reales',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        
        if dry_run:
            self.stdout.write(self.style.WARNING('🔍 Modo DRY RUN - No se harán cambios reales'))
        
        # Obtener todas las configuraciones activas
        configs = StockConfig.objects.filter(recarga_automatica_activa=True).select_related('producto')
        
        self.stdout.write(f'\n📦 Verificando {configs.count()} configuraciones de stock...\n')
        
        recargas_realizadas = 0
        productos_procesados = []
        
        for config in configs:
            producto = config.producto
            
            if config.necesita_recarga():
                stock_anterior = producto.stock
                
                if not dry_run:
                    # Registrar en historial antes de recargar
                    HistorialRecarga.objects.create(
                        producto=producto,
                        cantidad=config.cantidad_recarga,
                        stock_anterior=stock_anterior,
                        stock_nuevo=stock_anterior + config.cantidad_recarga,
                        tipo='automatica',
                        notas=f'Recarga automática. Stock mínimo: {config.stock_minimo}'
                    )
                    
                    # Ejecutar recarga
                    config.ejecutar_recarga()
                    producto.refresh_from_db()
                
                stock_nuevo = stock_anterior + config.cantidad_recarga if dry_run else producto.stock
                
                self.stdout.write(
                    self.style.SUCCESS(
                        f'✅ {producto.nombre}: {stock_anterior} → {stock_nuevo} '
                        f'(+{config.cantidad_recarga})'
                    )
                )
                
                recargas_realizadas += 1
                productos_procesados.append({
                    'nombre': producto.nombre,
                    'stock_anterior': stock_anterior,
                    'stock_nuevo': stock_nuevo,
                    'cantidad_agregada': config.cantidad_recarga
                })
        
        # Resumen
        self.stdout.write('\n' + '='*60)
        self.stdout.write(self.style.SUCCESS(f'\n✨ Proceso completado'))
        self.stdout.write(f'   • Configuraciones revisadas: {configs.count()}')
        self.stdout.write(f'   • Recargas realizadas: {recargas_realizadas}')
        self.stdout.write(f'   • Fecha: {timezone.now().strftime("%Y-%m-%d %H:%M:%S")}')
        
        if dry_run:
            self.stdout.write(self.style.WARNING('\n⚠️  Modo DRY RUN - Ningún cambio fue guardado'))
        
        self.stdout.write('='*60 + '\n')
        
        return f'Recargas realizadas: {recargas_realizadas}'
