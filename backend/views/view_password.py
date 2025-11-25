# prexcol/views/view_password.py

from django.contrib.auth import get_user_model
User = get_user_model()

from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ForgotPasswordView(APIView):
    """Enviar correo con enlace de restablecimiento"""

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email requerido"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        # UID + TOKEN
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = PasswordResetTokenGenerator().make_token(user)

        # LINK QUE USARÁ REACT
        reset_url = f"http://localhost:5173/reset-password/{uid}/{token}"

        # CORREO
        send_mail(
            subject="Restablecer contraseña",
            message=f"Para restablecer tu contraseña, haz clic aquí:\n{reset_url}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False,
        )

        return Response({"message": "Correo enviado"}, status=status.HTTP_200_OK)


def reset_password(request, uidb64, token):
    """Validar token y cambiar contraseña"""
    if request.method != "POST":
        return Response({"error": "Método no permitido"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    try:
        user_id = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=user_id)
    except Exception:
        return Response({"error": "Enlace inválido"}, status=status.HTTP_400_BAD_REQUEST)

    if not PasswordResetTokenGenerator().check_token(user, token):
        return Response({"error": "Token inválido o expirado"}, status=status.HTTP_400_BAD_REQUEST)

    new_password = request.data.get("password")
    if not new_password:
        return Response({"error": "Password requerido"}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()

    return Response({"message": "Contraseña restablecida con éxito"}, status=status.HTTP_200_OK)

class ResetPasswordView(APIView):
    """Validar token y cambiar contraseña"""

    def post(self, request, uidb64, token):
        try:
            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=user_id)
        except Exception:
            return Response({"error": "Enlace inválido"}, status=status.HTTP_400_BAD_REQUEST)

        if not PasswordResetTokenGenerator().check_token(user, token):
            return Response({"error": "Token inválido o expirado"}, status=status.HTTP_400_BAD_REQUEST)

        new_password = request.data.get("password")
        if not new_password:
            return Response({"error": "Password requerido"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"message": "Contraseña restablecida con éxito"}, status=status.HTTP_200_OK)