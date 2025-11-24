from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views.views import register_user, login_user, api_root
from .views.views_auth import LogoutView
from .views.view_password import forgot_password, reset_password
from .views.views_usuario import UsuarioViewSet

# -------------------------------
# ROUTER
# -------------------------------
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

# -------------------------------
# URLS
# -------------------------------
urlpatterns = [
    path('', api_root, name='api-root'),
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('forgot-password/', forgot_password, name='forgot-password'),
    path('reset-password/<uidb64>/<token>/', reset_password, name='reset-password'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),  # ViewSet routes
]
