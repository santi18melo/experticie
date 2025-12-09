import sys
import os
import json
from unittest.mock import MagicMock

# Add src to path
sys.path.append(os.path.join(os.getcwd(), 'src'))
# Add src/backend to path
sys.path.append(os.path.join(os.getcwd(), 'src', 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

from services.observability import MetricsCollector
from backend.middleware.observability import ObservabilityMiddleware

print("Verifying Observability...")

# Mock Request
request = MagicMock()
request.META = {}
request.path = '/api/test'
request.method = 'GET'

# Mock Response
def get_response(req):
    resp = MagicMock()
    resp.status_code = 200
    return resp

# Run Middleware
middleware = ObservabilityMiddleware(get_response)
response = middleware(request)

# Check Trace ID
trace_id = request.META.get('HTTP_X_REQUEST_ID')
print(f"Trace ID generated: {trace_id}")

# Check Metrics
metrics = MetricsCollector.get_metrics()
print("Metrics collected:")
print(json.dumps(metrics, indent=2))

if 'GET /api/test' in metrics:
    print("Verification: SUCCESS")
else:
    print("Verification: FAILED")
