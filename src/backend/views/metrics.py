from django.http import JsonResponse
from src.services.observability import MetricsCollector
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser

@api_view(['GET'])
@permission_classes([IsAdminUser])
def metrics_view(request):
    """
    Exposes application metrics (SLIs).
    """
    metrics = MetricsCollector.get_metrics()
    return JsonResponse(metrics)
