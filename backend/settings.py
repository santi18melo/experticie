import os   
import sys
import django
from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-s$@eyh9rphi9t6--4z6k!s1!a-!@hj^xy64hl7zs_0mveew(fg"
DEBUG = True

ALLOWED_HOSTS = ["*", "testserver"]

INSTALLED_APPS = [
    "usuarios",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # CORS
    "corsheaders",

    # Django REST + JWT
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",

    # Apps internas
    "core",
    "productos",
    "ventas",
    "pagos",
    "notificaciones",
]

AUTH_USER_MODEL = "usuarios.Usuario"

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # IMPORTANTE: siempre primero
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "wsgi.application"
ASGI_APPLICATION = 'asgi.application'

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
}

# ---------------------------
# 🔥 CORS / CSRF CONFIGURACIÓN
# ---------------------------

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5175",
    "http://127.0.0.1:5175",
    "http://172.30.7.92:5175",
    "http://172.30.7.92:8000",
]

CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5175",
    "http://127.0.0.1:5175",
    "http://172.30.7.92:5175",
    "http://172.30.7.92:8000",
]

# Permitir todos los headers y métodos (evita errores OPTIONS)
CORS_ALLOW_HEADERS = ["*"]
CORS_ALLOW_METHODS = ["*"]

# ---------------------------
# 🔥 EMAIL CONFIG GMAIL
# ---------------------------
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "melosanchezsantiago@gmail.com"
EMAIL_HOST_PASSWORD = "pmnvdcvxpsydbrdl"
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

FRONTEND_URL = "http://172.30.7.92:5743"
