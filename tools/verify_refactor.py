import sys
import os

# Add src/backend to path
sys.path.append(os.path.join(os.getcwd(), 'src', 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')

import django
django.setup()

from src.services.database import DatabaseAdapter
from src.services.celery_service import task_service
from src.config.app_config import AppConfig

print("Verifying Services...")

# Check DB
if DatabaseAdapter.check_connection():
    print("Database connection: OK")
else:
    print("Database connection: FAILED")

# Check Celery
app = task_service.get_app()
print(f"Celery App: {app.main}")
print(f"Broker URL: {AppConfig.get('CELERY_BROKER_URL')}")

print("Verification Complete.")
