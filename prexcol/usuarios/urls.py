from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    register_user,
    login_user,
    api_root,
    dashboard_admin,
    tienda_cliente,
    UsuarioViewSet,
)
from .view_password import forgot_password, reset_password

router = DefaultRouter()
router.register(r"usuarios", UsuarioViewSet, basename="usuario")

urlpatterns = [
    # API ROOT
    path("", api_root, name="api-root"),

    # ====== AUTH ======
    path("auth/register/", register_user, name="register"),
    path("auth/login/", login_user, name="login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/forgot-password/", forgot_password, name="forgot_password"),
    path(
        "auth/reset-password/<uidb64>/<token>/",
        reset_password,
        name="reset_password"
    ),

    # ====== ADMIN ======
    path("dashboard/admin/", dashboard_admin, name="dashboard_admin"),

    # ====== CLIENTE ======
    path("cliente/tienda/", tienda_cliente, name="tienda_cliente"),

    # ====== CRUD Usuarios ======
    path("", include(router.urls)),
]
