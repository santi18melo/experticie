from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from ..prexcol.views import (
    register_user,
    login_user,
    api_root,
)
from .views.view_password import forgot_password, reset_password
from .views.views_usuario import UsuarioViewSet

# -------------------------------
# ROUTER
# -------------------------------
router = DefaultRouter()
router.register(r"usuarios", UsuarioViewSet, basename="usuarios")

# -------------------------------
# URLS
# -------------------------------
urlpatterns = [
    # API Root
    path("api/", api_root, name="api-root"),

    # AUTH (todo dentro de /api/auth/)
    path("api/auth/register/", register_user, name="register"),
    path("api/auth/login/", login_user, name="login"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/auth/forgot-password/", forgot_password, name="forgot_password"),
    path("api/auth/reset-password/<uidb64>/<token>/", reset_password, name="reset_password"),

    # ROUTER (CRUD usuarios)
    path("api/", include(router.urls)),
]
