from django.urls import path
from .views.views import login_view, forgot_password, reset_password

urlpatterns = [
    path("login/", login_view),
    path("forgot-password/", forgot_password),
    path("reset-password/<uidb64>/<token>/", reset_password),
]
