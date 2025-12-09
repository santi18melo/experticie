import time
import uuid
import logging
from services.observability import MetricsCollector

logger = logging.getLogger(__name__)

class ObservabilityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Generate Trace ID
        trace_id = str(uuid.uuid4())
        request.META['HTTP_X_REQUEST_ID'] = trace_id
        
        # Start Timer
        start_time = time.time()
        
        # Log Request Start
        logger.info("Request started", extra={
            'trace_id': trace_id,
            'method': request.method,
            'path': request.path,
            'user': str(request.user) if hasattr(request, 'user') else 'anonymous'
        })

        try:
            response = self.get_response(request)
            status_code = response.status_code
        except Exception as e:
            status_code = 500
            logger.error("Request failed with exception", extra={
                'trace_id': trace_id,
                'error': str(e)
            })
            raise e
        finally:
            # Calculate Duration
            duration = time.time() - start_time
            
            # Record Metrics
            MetricsCollector.record_request(
                request.path, 
                request.method, 
                duration, 
                status_code
            )
            
            # Log Request End
            logger.info("Request finished", extra={
                'trace_id': trace_id,
                'status_code': status_code,
                'duration_ms': round(duration * 1000, 2)
            })
            
            # Add Trace ID to Response Header
            if 'response' in locals():
                response['X-Request-ID'] = trace_id

        return response
