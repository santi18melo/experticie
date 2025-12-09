import os
import sys
from pathlib import Path
from django.core.wsgi import get_wsgi_application

# Add project root to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent.parent))
# Add src to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent))
# Add src/backend to sys.path
sys.path.append(str(Path(__file__).resolve().parent))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')

application = get_wsgi_application()
