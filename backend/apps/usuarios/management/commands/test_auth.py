# usuarios/management/commands/test_auth.py
from django.core.management.base import BaseCommand
from django.contrib.auth import authenticate
from apps.usuarios.models import Usuario

class Command(BaseCommand):
    help = 'Test authentication for a user'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str, help='User email')
        parser.add_argument('password', type=str, help='User password')

    def handle(self, *args, **options):
        email = options['email']
        password = options['password']
        
        self.stdout.write("=" * 60)
        self.stdout.write(f"Testing authentication for: {email}")
        self.stdout.write("=" * 60)
        
        # Check if user exists
        try:
            user = Usuario.objects.get(email=email)
            self.stdout.write(f"✓ User found: {user.nombre}")
            self.stdout.write(f"  - Role: {user.rol}")
            self.stdout.write(f"  - Active: {user.estado}")
            self.stdout.write(f"  - Has password: {bool(user.password)}")
            self.stdout.write(f"  - Password check: {user.check_password(password)}")
        except Usuario.DoesNotExist:
            self.stdout.write(self.style.ERROR(f"✗ User not found: {email}"))
            return
        
        # Test authenticate
        self.stdout.write("\nTesting authenticate()...")
        auth_result = authenticate(username=email, password=password)
        
        if auth_result:
            self.stdout.write(self.style.SUCCESS("✓ AUTHENTICATION SUCCESSFUL"))
            self.stdout.write(f"  Authenticated user: {auth_result.email}")
        else:
            self.stdout.write(self.style.ERROR("✗ AUTHENTICATION FAILED"))
            self.stdout.write("  authenticate() returned None")
