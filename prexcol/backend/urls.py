from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views.views import register_user, login_user, api_root
from .views.view_password import forgot_password, reset_password
from .views.views_usuario import UsuarioViewSet

router = DefaultRouter()
router.register(r"usuarios", UsuarioViewSet, basename="usuarios")

urlpatterns = [
    path("", api_root, name="api-root"),

    # AUTH INDEXADO DENTRO DE /api/
    path("auth/register/", register_user, name="register"),
    path("auth/login/", login_user, name="login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/forgot-password/", forgot_password, name="forgot_password"),
    path("auth/reset-password/<uidb64>/<token>/", reset_password, name="reset_password"),

    # API CRUD USERS
    path("", include(router.urls)),
]
