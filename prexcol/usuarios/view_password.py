from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMultiAlternatives
import json

User = get_user_model()
token_generator = PasswordResetTokenGenerator()


@csrf_exempt
def forgot_password(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get("email")
    except Exception:
        return JsonResponse({"error": "JSON inválido"}, status=400)

    if not email:
        return JsonResponse({"error": "Email requerido"}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        # Por seguridad no revelamos si existe
        return JsonResponse({"message": "Si el correo existe, se enviará un mensaje."})

    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = token_generator.make_token(user)
    frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:5173")
    reset_link = f"{frontend_url}/reset-password/{uid}/{token}"

    try:
        send_mail(
            subject="Recuperación de contraseña",
            message=f"Para restablecer tu contraseña, visita: {reset_link}",
            from_email=getattr(settings, "DEFAULT_FROM_EMAIL", None),
            recipient_list=[email],
            fail_silently=False,
        )
    except Exception as e:
        return JsonResponse(
            {"error": "No se pudo enviar el correo", "detail": str(e)}, status=500
        )

    return JsonResponse({"message": "Si el correo existe, se enviará un mensaje."})


@csrf_exempt
def reset_password(request, uidb64, token):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        data = json.loads(request.body)
        new_password = data.get("password")
    except Exception:
        return JsonResponse({"error": "JSON inválido"}, status=400)

    if not new_password:
        return JsonResponse({"error": "Password requerido"}, status=400)

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except Exception:
        return JsonResponse({"error": "Enlace inválido"}, status=400)

    if not token_generator.check_token(user, token):
        return JsonResponse(
            {"error": "El enlace ha expirado o no es válido"}, status=400
        )

    user.set_password(new_password)
    user.save()

    return JsonResponse({"message": "Contraseña restablecida correctamente"})


@csrf_exempt
def forgot_password(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get("email")
    except Exception:
        return JsonResponse({"error": "JSON inválido"}, status=400)

    if not email:
        return JsonResponse({"error": "Email requerido"}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        # Seguridad: no revelar si existe o no
        return JsonResponse({"message": "Si el correo existe, enviaremos un mensaje."})

    # Generar uid y token
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = token_generator.make_token(user)

    frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:5173")
    reset_link = f"{frontend_url}/reset-password/{uid}/{token}"

    # -------------------------
    #     EMAIL PERSONALIZADO
    # -------------------------
    subject = "🔐 Recupera tu contraseña - PREXCOL"
    from_email = getattr(settings, "DEFAULT_FROM_EMAIL", None)
    to_email = [email]

    text_content = f"""
Hola,

Recibimos una solicitud para restablecer tu contraseña en PREXCOL.

Para continuar, ingresa al siguiente enlace:
{reset_link}

Si no solicitaste este cambio, puedes ignorar este mensaje.
"""

    html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">

    <table align="center" width="100%" style="max-width:600px;background:white;border-radius:10px;padding:20px;">
        <tr>
            <td style="text-align:center;padding-bottom:10px;">
                <h1 style="color:#1a1a1a;">PREXCOL</h1>
                <p style="color:#4CAF50;font-size:18px;margin:0;">Restablecimiento de contraseña</p>
            </td>
        </tr>

        <tr>
            <td style="padding:20px;font-size:15px;color:#333;">
                <p>Hola,</p>
                <p>Recibimos una solicitud para restablecer tu contraseña en <strong>PREXCOL</strong>.</p>
                <p>Haz clic en el siguiente botón para continuar:</p>

                <p style="text-align:center;margin:30px 0;">
                    <a href="{reset_link}"
                        style="background:#4CAF50;color:white;padding:15px 25px;text-decoration:none;
                        border-radius:6px;font-size:16px;display:inline-block;">
                        🔑 Restablecer Contraseña
                    </a>
                </p>

                <p>Si tú no enviaste esta solicitud, puedes ignorar este mensaje.</p>
                <p style="margin-top:30px;">Atentamente,<br>El equipo de PREXCOL ⚡</p>
            </td>
        </tr>

        <tr>
            <td style="text-align:center;font-size:12px;color:#777;padding-top:20px;">
                © PREXCOL — Plataforma de Logística Inteligente
            </td>
        </tr>
    </table>

</body>
</html>
"""

    email_msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
    email_msg.attach_alternative(html_content, "text/html")

    try:
        email_msg.send()
    except Exception as e:
        return JsonResponse(
            {"error": "No se pudo enviar el correo", "detail": str(e)}, status=500
        )

    return JsonResponse({"message": "Si el correo existe, enviaremos un mensaje."})
