from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views.views_auth import LogoutView, register_user, login_user
from .views.view_password import forgot_password, reset_password

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('forgot-password/', forgot_password, name='forgot-password'),
    path('reset-password/<uidb64>/<token>/', reset_password, name='reset-password'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
