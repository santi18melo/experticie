from django.db import connections
from django.db.utils import OperationalError
import logging

logger = logging.getLogger(__name__)

class DatabaseAdapter:
    """
    Facade for database interactions to ensure connection stability.
    """
    
    @staticmethod
    def check_connection(alias='default'):
        """
        Verifies if the database connection is active.
        """
        try:
            conn = connections[alias]
            conn.cursor()
            return True
        except OperationalError as e:
            logger.error(f"Database connection failed: {e}")
            return False
            
    @staticmethod
    def get_connection(alias='default'):
        """
        Returns the raw connection object.
        """
        return connections[alias]
