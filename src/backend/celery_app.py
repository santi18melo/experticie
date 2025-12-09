import os
import sys
from pathlib import Path
from celery import Celery

# Add project root to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent.parent))
# Add src to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent))
# Add src/backend to sys.path
sys.path.append(str(Path(__file__).resolve().parent))

# Set default Django settings module for 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')

app = Celery('backend')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
