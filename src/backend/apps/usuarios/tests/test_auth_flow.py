# -*- coding: utf-8 -*-
"""Tests for authentication flow, rate limiting and basic user actions.
These tests cover:
1️⃣ Registro de usuario
2️⃣ Login con credenciales válidas y con cuenta desactivada
3️⃣ Rate‑limit en login (5 intentos por minuto)
4️⃣ Logout
5️⃣ Refresh token
"""

import time
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from apps.usuarios.models import Usuario

from django.test import override_settings

from django.core.cache import cache

@override_settings(SECURE_SSL_REDIRECT=False)
class AuthFlowTests(APITestCase):
    def setUp(self):
        cache.clear() # Clear cache before each test
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')
        self.refresh_url = reverse('token_refresh')
        self.user_data = {
            "email": "testuser@example.com",
            "nombre": "Test User",
            "password": "StrongPass123!",
            "rol": "cliente",
        }
        # Crear usuario activo
        self.user = Usuario.objects.create_user(
            email=self.user_data["email"],
            nombre=self.user_data["nombre"],
            password=self.user_data["password"],
            rol=self.user_data["rol"],
        )
        # Usuario desactivado para pruebas de bloqueo
        self.inactive_user = Usuario.objects.create_user(
            email="inactive@example.com",
            nombre="Inactive",
            password="StrongPass123!",
            rol="cliente",
        )
        self.inactive_user.estado = False
        self.inactive_user.save()

    def tearDown(self):
        cache.clear()

    def test_register_success(self):
        response = self.client.post(self.register_url, {
            "email": "newuser@example.com",
            "nombre": "New User",
            "password": "StrongPass123!",
            "rol": "cliente",
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("tokens", response.data)
        self.assertTrue(Usuario.objects.filter(email="newuser@example.com").exists())

    def test_login_success(self):
        response = self.client.post(self.login_url, {
            "email": self.user.email,
            "password": self.user_data["password"]
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertIn("user", response.data)
        # Guardar token para logout
        self.access_token = response.data["access"]
        self.refresh_token = response.data["refresh"]

    def test_login_inactive_user(self):
        response = self.client.post(self.login_url, {
            "email": self.inactive_user.email,
            "password": "StrongPass123!"
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn("error", response.data)

    def test_login_rate_limit(self):
        # Realizar 6 intentos fallidos para disparar el bloque
        for i in range(5):
            resp = self.client.post(self.login_url, {"email": "wrong@example.com", "password": "bad"})
            self.assertIn(resp.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_400_BAD_REQUEST])
        # 6º intento debe ser bloqueado (403 o 429)
        resp = self.client.post(self.login_url, {"email": "wrong@example.com", "password": "bad"})
        self.assertIn(resp.status_code, [403, 429])
        # Esperar 61 segundos para resetear el límite y probar login correcto
        # Para evitar esperar 61s en tests, podemos limpiar el cache
        cache.clear()
        resp = self.client.post(self.login_url, {
            "email": self.user.email,
            "password": self.user_data["password"]
        })
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_logout(self):
        # Primero login para obtener token
        login_resp = self.client.post(self.login_url, {
            "email": self.user.email,
            "password": self.user_data["password"]
        })
        token = login_resp.data["access"]
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        resp = client.post(self.logout_url, {"refresh": login_resp.data["refresh"]})
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)

    def test_refresh_token(self):
        login_resp = self.client.post(self.login_url, {
            "email": self.user.email,
            "password": self.user_data["password"]
        })
        refresh_token = login_resp.data["refresh"]
        resp = self.client.post(self.refresh_url, {"refresh": refresh_token})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertIn("access", resp.data)
