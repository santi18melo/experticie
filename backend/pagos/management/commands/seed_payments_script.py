import os
import sys
import django

# Add backend to path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")
django.setup()

from pagos.models import EstadoPago, MetodoPago

def seed_data():
    print("Seeding Payment Data...")
    
    # Estados
    estados = ["Pendiente", "Aprobado", "Rechazado", "Reembolsado"]
    for nombre in estados:
        est, created = EstadoPago.objects.get_or_create(nombre=nombre)
        if created:
            print(f"Created EstadoPago: {nombre}")
        else:
            print(f"EstadoPago exists: {nombre}")

    # Metodos
    metodos = ["Efectivo", "Tarjeta de Crédito", "Transferencia", "Nequi", "DaviPlata"]
    for nombre in metodos:
        met, created = MetodoPago.objects.get_or_create(nombre=nombre)
        if created:
            print(f"Created MetodoPago: {nombre}")
        else:
            print(f"MetodoPago exists: {nombre}")

if __name__ == "__main__":
    seed_data()
