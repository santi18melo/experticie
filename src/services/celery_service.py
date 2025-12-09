from celery import Celery
from django.conf import settings
import os

class TaskQueueService:
    """
    Wrapper for Celery to ensure consistent task execution.
    """
    
    def __init__(self):
        self.app = Celery('backend')
        self.app.config_from_object('django.conf:settings', namespace='CELERY')
        self.app.autodiscover_tasks()
        
    def get_app(self):
        return self.app
        
    def send_task(self, task_name, args=None, kwargs=None):
        """
        Safely sends a task to the queue.
        """
        try:
            return self.app.send_task(task_name, args=args, kwargs=kwargs)
        except Exception as e:
            # Fallback or logging could go here
            print(f"Failed to send task {task_name}: {e}")
            raise e

# Singleton instance
task_service = TaskQueueService()
celery_app = task_service.get_app()
