import logging
import json
import time
from collections import defaultdict
from pythonjsonlogger import jsonlogger

class MetricsCollector:
    """
    In-memory metrics collector for SLIs.
    """
    _metrics = defaultdict(lambda: {'count': 0, 'total_time': 0, 'errors': 0})

    @classmethod
    def record_request(cls, endpoint, method, duration, status_code):
        key = f"{method} {endpoint}"
        cls._metrics[key]['count'] += 1
        cls._metrics[key]['total_time'] += duration
        if status_code >= 500:
            cls._metrics[key]['errors'] += 1

    @classmethod
    def get_metrics(cls):
        results = {}
        for key, data in cls._metrics.items():
            count = data['count']
            avg_latency = data['total_time'] / count if count > 0 else 0
            error_rate = (data['errors'] / count) * 100 if count > 0 else 0
            results[key] = {
                'requests': count,
                'avg_latency_ms': round(avg_latency * 1000, 2),
                'error_rate_pct': round(error_rate, 2)
            }
        return results

class CustomJsonFormatter(jsonlogger.JsonFormatter):
    def add_fields(self, log_record, record, message_dict):
        super(CustomJsonFormatter, self).add_fields(log_record, record, message_dict)
        if not log_record.get('timestamp'):
            log_record['timestamp'] = time.strftime('%Y-%m-%dT%H:%M:%S%z')
        if log_record.get('level'):
            log_record['level'] = log_record['level'].upper()
        else:
            log_record['level'] = record.levelname
