import json
from django.http import JsonResponse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from apps.usuarios.models import Usuario  # Use custom Usuario model

token_generator = PasswordResetTokenGenerator()


@csrf_exempt
def forgot_password(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    data = json.loads(request.body.decode('utf-8'))
    email = data.get("email")

    try:
        user = Usuario.objects.get(email=email)
    except Usuario.DoesNotExist:
        return JsonResponse({"message": "Si el correo existe, enviaremos un mensaje."})

    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = token_generator.make_token(user)

    frontend = getattr(settings, "FRONTEND_URL", "http://localhost:5173")
    link = f"{frontend}/reset-password/{uid}/{token}"

    subject = " Recupera tu contraseña - PREXCOL"
    text = f"Restablece tu contraseña aquí: {link}"

    html = f"""<html><body><a href="{link}">Restablecer contraseña</a></body></html>"""

    email_msg = EmailMultiAlternatives(subject, text, settings.DEFAULT_FROM_EMAIL, [email])
    email_msg.attach_alternative(html, "text/html")
    email_msg.send()

    return JsonResponse({"message": "Si el correo existe, enviaremos un mensaje."})


@csrf_exempt
def reset_password(request, uidb64, token):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    data = json.loads(request.body)
    password = data.get("password")

    if not password:
        return JsonResponse({"error": "Password requerido"}, status=400)

    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = Usuario.objects.get(pk=uid)
    except Exception:
        return JsonResponse({"error": "Token inválido"}, status=400)

    if not token_generator.check_token(user, token):
        return JsonResponse({"error": "Token inválido o expirado"}, status=400)

    user.set_password(password)
    user.save()

    return JsonResponse({"message": "Contraseña actualizada correctamente"})
