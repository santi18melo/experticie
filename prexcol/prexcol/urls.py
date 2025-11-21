from django.urls import path, include 
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views.views_auth import login_user, register_user
from .views.view_password import ForgotPasswordView, ResetPasswordView   # ← IMPORTA LA VISTA
from .views.views_usuario import UsuarioViewSet

from django.contrib import admin
from core.views import server_info

router = DefaultRouter()
router.register(r"usuarios", UsuarioViewSet, basename="usuarios")

urlpatterns = [
    path('admin/', admin.site.urls),

    # SERVER INFO
    path('api/server-info/', server_info),

    # AUTH — TODAS con /api/auth/
    path('api/auth/register/', register_user, name='register'),
    path('api/auth/login/', login_user, name='login'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # PASSWORD RESET
    path("api/auth/forgot-password/", ForgotPasswordView.as_view(), name="forgot_password"),
    path('api/auth/reset-password/<uidb64>/<token>/', ResetPasswordView.as_view(), name='reset_password'),


    # CRUD USERS
    path('api/', include(router.urls)),
]
