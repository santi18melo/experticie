# backend/pagination.py
from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
    """
    Paginación personalizada que permite al cliente especificar el tamaño de página
    """
    page_size = 10  # Tamaño por defecto
    page_size_query_param = 'page_size'  # Permite ?page_size=10000
    max_page_size = 10000  # Máximo permitido (10,000 registros)
