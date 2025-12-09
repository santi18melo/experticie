# backend/apps/usuarios/urls_account.py
from django.urls import path
from .views.view_account_management import (
    self_deactivate_account,
    self_reactivate_account,
    admin_suspend_user,
    admin_reactivate_user,
    get_account_status,
    request_support
)

urlpatterns = [
    # Auto-gestión de cuenta
    path('deactivate/', self_deactivate_account, name='self-deactivate'),
    path('reactivate/', self_reactivate_account, name='self-reactivate'),
    path('status/', get_account_status, name='account-status'),
    path('support/request/', request_support, name='request-support'),
    
    # Gestión por administrador
    path('<int:user_id>/suspend/', admin_suspend_user, name='admin-suspend'),
    path('<int:user_id>/reactivate/', admin_reactivate_user, name='admin-reactivate'),
]
