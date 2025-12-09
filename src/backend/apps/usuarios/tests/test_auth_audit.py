from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class TestAuthAudit(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.refresh_url = reverse('token_refresh')
        self.logout_url = reverse('logout')
        
        self.user_data = {
            "email": "test@example.com",
            "nombre": "Test User",
            "password": "password123",
            "rol": "cliente"
        }

    def test_register_user(self):
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("tokens", response.data)
        self.assertIn("user", response.data)
        self.assertEqual(User.objects.count(), 1)

    def test_login_user(self):
        User.objects.create_user(**self.user_data)
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        }
        response = self.client.post(self.login_url, login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_refresh_token(self):
        User.objects.create_user(**self.user_data)
        # Login to get a valid refresh token
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        }
        login_resp = self.client.post(self.login_url, login_data)
        refresh_token = login_resp.data["refresh"]
        
        response = self.client.post(self.refresh_url, {"refresh": refresh_token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_protected_view_without_token(self):
        # Using logout as a protected view
        response = self.client.post(self.logout_url, {"refresh": "dummy"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout(self):
        User.objects.create_user(**self.user_data)
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        }
        login_resp = self.client.post(self.login_url, login_data)
        access_token = login_resp.data["access"]
        refresh_token = login_resp.data["refresh"]
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        response = self.client.post(self.logout_url, {"refresh": refresh_token})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
