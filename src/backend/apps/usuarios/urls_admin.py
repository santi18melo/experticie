from django.urls import path
from .views.views_admin import get_advanced_metrics

urlpatterns = [
    path('metrics/', get_advanced_metrics, name='admin-metrics'),
]
