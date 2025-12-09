import os
import re

# Files that need fixing
files_to_fix = [
    r"c:\experticie-2\backend\apps\usuarios\views\view_password.py",
    r"c:\experticie-2\backend\apps\usuarios\tests\test_serializers.py",
    r"c:\experticie-2\backend\apps\usuarios\tests\test_models.py",
    r"c:\experticie-2\backend\apps\usuarios\tests\test_backends.py",
    r"c:\experticie-2\backend\apps\usuarios\management\commands\test_auth.py",
    r"c:\experticie-2\backend\apps\usuarios\management\commands\list_users_for_tests.py",
    r"c:\experticie-2\backend\apps\pagos\models.py",
    r"c:\experticie-2\backend\apps\productos\tests.py",
    r"c:\experticie-2\backend\apps\productos\serializers.py",
    r"c:\experticie-2\backend\apps\notificaciones\models.py",
]

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} - not found")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Determine if this is within usuarios app or cross-app
    is_usuarios_app = r'\apps\usuarios\\' in filepath
    
    if is_usuarios_app:
        # Use relative imports within the same app
        new_content = re.sub(r'from usuarios\.models', 'from ..models', content)
        new_content = re.sub(r'from usuarios\.serializers', 'from ..serializers', new_content)
        new_content = re.sub(r'from usuarios\.backends', 'from ..backends', new_content)
        new_content = re.sub(r'from usuarios\.permissions', 'from ..permissions', new_content)
    else:
        # Use full path for cross-app imports
        new_content = re.sub(r'from usuarios\.', 'from apps.usuarios.', content)
        new_content = re.sub(r'import usuarios', 'import apps.usuarios', new_content)
    
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {filepath}")
    else:
        print(f"No changes needed for {filepath}")

print("Done!")
