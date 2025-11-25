# usuarios/management/commands/list_users_for_tests.py
from django.core.management.base import BaseCommand
from apps.usuarios.models import Usuario
import json

class Command(BaseCommand):
    help = 'List all users for testing purposes'

    def handle(self, *args, **options):
        users = Usuario.objects.all().order_by('id')
        user_list = []
        
        for user in users:
            user_list.append({
                'id': user.id,
                'email': user.email,
                'rol': user.rol,
                'nombre': user.nombre,
                'estado': user.estado,
                'has_usable_password': user.has_usable_password()
            })
        
        print(json.dumps(user_list, indent=2))
