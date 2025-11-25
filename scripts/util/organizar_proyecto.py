import os
import shutil

# Definición de carpetas destino con sus archivos
folders = {
    "scripts/powershell": ["cargar_datos.ps1", "runserver.ps1"],
    "scripts/bash": ["cargar_datos.sh"],
    "scripts/util": ["gen_admin_token.py", "organizar_proyecto.py"],
    "scripts/debug": ["debug_token.py"],
    "scripts/validaciones": ["verify_ajustar_stock.py"],
    "scripts/sqlite": ["db.sqlite3"],  # opcional, si quieres moverlo
    "docs": [f for f in os.listdir() if f.endswith(".md")],
    "scripts/tests": [f for f in os.listdir() if f.startswith("test_") and f.endswith(".py")],
    "scripts/json": ["package.json", "package-lock.json"],
}

# Crear carpetas si no existen
for folder in folders:
    os.makedirs(folder, exist_ok=True)

# Mover archivos
for folder, files in folders.items():
    for file in files:
        if os.path.exists(file):
            shutil.move(file, os.path.join(folder, file))