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

    subject = "🔐 Recupera tu contraseña - PREXCOL"
    text = f"Restablece tu contraseña aquí: {link}"

    # Professional HTML Email Template
    html = f"""
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecer Contraseña</title>
    <style>
        body {{
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f4f7fa;
        }}
        .email-container {{
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }}
        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            text-align: center;
        }}
        .logo {{
            font-size: 48px;
            margin-bottom: 10px;
        }}
        .header h1 {{
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }}
        .content {{
            padding: 40px 30px;
        }}
        .greeting {{
            font-size: 18px;
            color: #2d3748;
            margin-bottom: 20px;
        }}
        .message {{
            font-size: 16px;
            color: #4a5568;
            line-height: 1.6;
            margin-bottom: 30px;
        }}
        .button-container {{
            text-align: center;
            margin: 40px 0;
        }}
        .reset-button {{
            display: inline-block;
            padding: 16px 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
        }}
        .reset-button:hover {{
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }}
        .alternative-link {{
            margin-top: 30px;
            padding: 20px;
            background-color: #f7fafc;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }}
        .alternative-link p {{
            margin: 0 0 10px 0;
            font-size: 14px;
            color: #4a5568;
        }}
        .alternative-link a {{
            color: #667eea;
            word-break: break-all;
            font-size: 13px;
        }}
        .security-notice {{
            margin-top: 30px;
            padding: 20px;
            background-color: #fffbeb;
            border-radius: 8px;
            border-left: 4px solid #f59e0b;
        }}
        .security-notice p {{
            margin: 0;
            font-size: 14px;
            color: #78350f;
            line-height: 1.5;
        }}
        .footer {{
            background-color: #2d3748;
            padding: 30px 20px;
            text-align: center;
        }}
        .footer p {{
            margin: 5px 0;
            font-size: 14px;
            color: #a0aec0;
        }}
        .footer a {{
            color: #667eea;
            text-decoration: none;
        }}
        
        /* Mobile Responsive */
        @media only screen and (max-width: 600px) {{
            .email-container {{
                width: 100% !important;
            }}
            .content {{
                padding: 30px 20px !important;
            }}
            .header {{
                padding: 30px 20px !important;
            }}
            .header h1 {{
                font-size: 24px !important;
            }}
            .logo {{
                font-size: 40px !important;
            }}
            .reset-button {{
                padding: 14px 30px !important;
                font-size: 15px !important;
            }}
            .greeting {{
                font-size: 16px !important;
            }}
            .message {{
                font-size: 15px !important;
            }}
        }}
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">🏪</div>
            <h1>PREXCOL</h1>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">
                ¡Hola!
            </div>
            
            <div class="message">
                Recibimos una solicitud para restablecer la contraseña de tu cuenta en PREXCOL. 
                Si fuiste tú quien lo solicitó, haz clic en el botón de abajo para crear una nueva contraseña.
            </div>
            
            <div class="button-container">
                <a href="{link}" class="reset-button">
                    🔐 Restablecer mi contraseña
                </a>
            </div>
            
            <div class="alternative-link">
                <p><strong>¿El botón no funciona?</strong></p>
                <p>Copia y pega este enlace en tu navegador:</p>
                <a href="{link}">{link}</a>
            </div>
            
            <div class="security-notice">
                <p>
                    <strong>⚠️ Importante:</strong> Este enlace expirará en 24 horas por seguridad. 
                    Si no solicitaste este cambio, ignora este correo y tu contraseña permanecerá sin cambios.
                </p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p><strong>PREXCOL</strong></p>
            <p>Tu plataforma de confianza</p>
            <p style="margin-top: 15px; font-size: 12px;">
                Este es un correo automático, por favor no respondas a este mensaje.
            </p>
        </div>
    </div>
</body>
</html>
"""

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

    # Validar requisitos de seguridad de la contraseña
    if len(password) < 8:
        return JsonResponse({
            "error": "La contraseña debe tener al menos 8 caracteres"
        }, status=400)
    
    if not any(char.isupper() for char in password):
        return JsonResponse({
            "error": "La contraseña debe contener al menos una letra mayúscula"
        }, status=400)
    
    if not any(char.isdigit() for char in password):
        return JsonResponse({
            "error": "La contraseña debe contener al menos un número"
        }, status=400)

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
