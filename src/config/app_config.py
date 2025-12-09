from django.conf import settings
import os

class AppConfig:
    """
    Centralized configuration access.
    """
    
    @staticmethod
    def get(key, default=None):
        return getattr(settings, key, os.getenv(key, default))

    @staticmethod
    def is_production():
        return not settings.DEBUG
